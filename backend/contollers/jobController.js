import { Types } from 'mongoose';

import Job from '../models/jobModel.js';
import similarityReason from '../openai/similarityReason.js';
import catchAsync from '../utils/catchAsync.js';
import { JOB_NUM_CANDIDATES, JOB_LIMIT } from '../utils/constants.js';

const getTop10Similar = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId).select('embedding title _id text');

  if (!job)
    res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Couldn't find a job with ID: ${jobId}`,
    });

  const { embedding } = job;

  const relevantDocs = await Job.aggregate([
    {
      $vectorSearch: {
        index: 'job_vector_index',
        path: 'embedding',
        numCandidates: JOB_NUM_CANDIDATES,
        limit: JOB_LIMIT,
        queryVector: embedding,
        filter: {
          _id: { $ne: new Types.ObjectId(job._id) },
        },
      },
    },
    {
      $project: {
        embedding: 0,
        score: {
          $meta: 'vectorSearchScore',
        },
      },
    },
  ]);

  const structuredOutput = await Promise.all(
    relevantDocs.map(async doc => {
      const { _id, title, author, text, num_pages, pdf_link, score } = doc;

      const similarity_score_explanation = await similarityReason(
        job.text,
        text,
        score
      );

      return {
        reference_job_id: job._id,
        reference_job_title: job.title,
        similar_job_id: _id,
        similar_job_title: title,
        similarity_score: score,
        similarity_score_explanation,
        similarity_job_metadata: {
          author,
          num_pages,
          pdf_link,
        },
      };
    })
  );

  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: {
      structuredOutput,
    },
  });
});

const getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();

  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    count: jobs.length,
    data: {
      jobs,
    },
  });
});

const getJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId).select('-embedding');

  if (!job)
    res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Couldn't find a job with ID: ${jobId}`,
    });

  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: {
      job,
    },
  });
});

export default { getTop10Similar, getAllJobs, getJob };
