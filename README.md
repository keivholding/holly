# Holly Engineering Take-Home Challenge: Role Similarity Analysis

## Objective

Design and implement a system to identify the 10 most similar roles to the Plan Checker - Fire Prevention position among Long Beach's 300+ roles.

## Solution Overview

### Approach

- **Data Collection**: Scraped job descriptions from Long Beach's website and stored them in a MongoDB database. You can run the script by running: `node dev/loadData.js` from the `/backend` directory.
- **Text Processing**: Parsed text from job description PDFs and created vector embeddings.
- **Similarity Analysis**: Utilized MongoDB's cosine similarity feature to perform [vector searches](https://www.mongodb.com/docs/atlas/atlas-vector-search/tutorials/vector-search-quick-start/?tck=ai_as_web) and identify relevant documents.
- **Similarity Reason**: The relevant documents, along with the base document, are then sent to OpenAI to generate explanations for the similarity between roles.

### Tech Stack

- **Frontend**: Developed with React for its ease of use and scalability. The frontend is deployed to Cloudflare [here](https://holly-6uz.pages.dev/).
- **Backend**: Implemented using Express.js for its scalability, lightweight nature, and extendability. The backend is hosted on Render.
- **Database**: Chose MongoDB over Supabase to ensure continuous availability without downtime, as the free version of Supabase spins down after some time. The implementation using Supabase would be very similar. MongoDB was chosen solely for its availability.

### Key Design Decisions

- **Architecture**: Adopted an MVC architecture to ensure the solution is extendable and maintainable, making it easy for any developer to pick up where I left off.
- **Caching**: The frontend uses [TanStack Query](https://tanstack.com/query/latest) to cache fetch results. If you navigate to one job, go back, then return to the same job, you'll notice that it loads instantly as we read the data from the cache.
- **Vector Search**: Opted for vector search instead of manual parameters due to its nuanced and scalable approach. It efficiently identifies similar roles without relying on subjective criteria and adapts well to changes in job descriptions.

### Extensibility

- **Data Ingestion**: The current scraping script is specific to Long Beach. Future enhancements could include allowing districts to upload PDFs directly to the database for a more user-friendly experience. This would be preferred over uploading PDF endpoints, which may be too technical.
- **Dynamic Code**: Besides the ingestion of data specific to Long Beach, everything else is completely dynamic and ready for future features.

### Assumptions

- No specific assumptions were made. I opted to scrape the data directly from Long Beach to avoid making assumptions.

### Output

- The output format matches the suggested format in the task description. You can view this in the [documentation](https://documenter.getpostman.com/view/33618537/2sAYdcqs4G#1233915a-cec2-4785-8a01-62e06e77761e) in the example response sections.

### Considerations for Improvement

- **Authentication**: Implement user accounts and authentication to manage document uploads by different districts.
- **Performance**: Introduce pagination for job listings to improve loading times. Currently, all 300+ jobs are fetched at once on the homepage.
- **Prompt Optimization**: Adjust the wordiness of the OpenAI similarity reason. It's currently quite long. We can do this by fine-tuning and adjusting the prompt.
- **Vector Search Tuning**: Modify the number of candidates and limit in the vector search for better results.
- **Title Accuracy**: Some PDFs don't have accurate titles based on metadata. A more robust implementation for title extraction would be beneficial.
- **Error Handling**: While fairly robust, error handling could be improved.
- **Stale Data**: The program scrapes job descriptions from PDFs on the website, missing updates, changes, and new job descriptions unless manually tracked. This leans towards users uploading PDFs in bulk to ensure we have the most relevant data. There are potential workarounds to this though.
- **Responsive Design**: Ensure the site is responsive to provide a seamless experience across all devices.

## Running the Program Locally

To run the program locally, you will need to set up the following environment variables:

```
# env

DB_USERNAME=<your_mongodb_username>
DB_PASSWORD=<your_mongodb_password>

OPENAI_API_KEY=<your_openai_api_key>
OPENAI_MODEL=<your_openai_model>

SIMILARITY_PROMPT:<This is the prompt used by /backend/openai/similarityReason.js to generate a similarity reason between roles>
```

Then run the following commands in the root directory:

```
cd backend && npm i && npm run dev

<!-- Open a new terminal -->

cd frontend && npm i && npm run dev
```

For transparency, although this should ideally be stored in a `.env` file, the `SIMILARITY_PROMPT` is as follows:

```
SIMILARITY_PROMPT="
You are an expert at comparing two chunks of text from job descriptions and analyzing their similarities. Point out the similarities. Don't make a list of numbers, please write a paragraph.

Inputs:
- jobA: The text content of job A.
- jobB: The text content of job B.
- Score: The similarity score calculated using the cosine similarity metric in MongoDB's vector search. The score is on a scale of 0 to 1.

Requirements:
- Avoid technical jargon.
- Provide a user-friendly explanation.
- Be concise and specific. Do not make your response long. It's key to keep it short so it's useful.
- Don't mention jobA and jobB. Mention their titles if applicable.
- Just give a text output. No special styling or special characters like *.
- Don't mention the structure of both documents.
- Don't mention how both are for Long beach.
"
```

## Helpful Links

- **Documentation**: [View Documentation](https://documenter.getpostman.com/view/33618537/2sAYdcqs4G)
- **Frontend Deployment**: [Visit Frontend](https://holly-6uz.pages.dev/)
- **TanStack Query**: [Learn More](https://tanstack.com/query/latest)
- **MongoDB Vector Search**: [Quick Start Guide](https://www.mongodb.com/docs/atlas/atlas-vector-search/tutorials/vector-search-quick-start/?tck=ai_as_web)
