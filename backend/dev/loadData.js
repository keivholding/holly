import 'dotenv/config';
import PdfParse from 'pdf-parse/lib/pdf-parse.js';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import pLimit from 'p-limit';

import generateEmbedding from '../openai/generateEmbedding.js';
import Job from '../models/jobModel.js';

const { DB_USERNAME, DB_PASSWORD } = process.env;

const log = message => console.log(`INFO: ${message}`);
const errorLog = message => console.error(`ERROR: ${message}`);

const fetchLongBeachPDFLinks = async () => {
  const res = await fetch(
    'https://www.longbeach.gov/hr/jobs/descriptions-and-compensation/'
  );

  if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.statusText}`);

  const siteText = await res.text();

  const $ = cheerio.load(siteText);

  const pattern =
    /^\/globalassets\/hr\/media-library\/documents\/jobs\/job-descriptions-and-compensation\/[a-z]\/.+/;

  const pdfLinks = [];

  $('a').each((i, element) => {
    const href = $(element).attr('href');
    if (pattern.test(href)) pdfLinks.push('https://www.longbeach.gov' + href);
  });

  return pdfLinks;
};

const extractPDFContent = async links => {
  const pdfDetails = await Promise.all(
    links.map(async link => {
      const res = await fetch(link);
      const arrayBuffer = await res.arrayBuffer();
      const pdfBuffer = Buffer.from(arrayBuffer);
      const pdfContent = await PdfParse(pdfBuffer);
      return { pdfContent, link };
    })
  );

  return pdfDetails;
};

const saveJobsToDatabase = async pdfDetails => {
  // Implement concurrency control to manage database load and prevent connection saturation
  const limit = pLimit(5);

  const saveJobPromises = pdfDetails.map(pdf =>
    limit(async () => {
      const {
        numpages: num_pages,
        info: { Author: author, Title: title },
        text,
      } = pdf.pdfContent;

      const pdf_link = pdf.link;

      const embedding = await generateEmbedding(text);

      await Job.create({
        title,
        author,
        text: text.trim().replaceAll('\n', ' '),
        num_pages,
        pdf_link,
        embedding,
      });
    })
  );

  const createdJobs = await Promise.all(saveJobPromises);

  return createdJobs;
};

(async () => {
  try {
    log('Connecting to the database');
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zqlss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    log('Connected to the database');

    log('Deleting all pre-existing data from the database');
    await Job.deleteMany();
    log('Finished deleting all pre-existing data');

    log('Fetching the PDF links from Long Beach');
    const pdfLinks = await fetchLongBeachPDFLinks();
    log(`Found ${pdfLinks.length} PDF links`);

    log('Extracting the data from the PDFs');
    const extractedPDFContent = await extractPDFContent(pdfLinks);
    log('Finished extracting the data');

    log('Storing the PDF data in the database');
    const createdJobs = await saveJobsToDatabase(extractedPDFContent);
    log(`Finished creating ${createdJobs.length} jobs in the database`);

    await mongoose.connection.close();
    log('Closed the database connection');

    process.exit(0);
  } catch (err) {
    errorLog(`Error: ${err.message}`);
    process.exit(1);
  }
})();
