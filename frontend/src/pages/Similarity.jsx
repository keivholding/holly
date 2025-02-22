import { Link, useParams } from 'react-router';

import SimilarityHeader from '../features/similarity/SimilarityHeader';
import SimilarJobs from '../features/similarity/SimilarJobs';
import useJob from '../features/jobs/useJob';
import Loader from '../_components/Loader';

const Similarity = () => {
  const { jobId } = useParams();
  const { job, isLoadingJob } = useJob(jobId);

  if (isLoadingJob) return <Loader />;

  const { title, pdf_link } = job;

  return (
    <div className="space-y-10">
      <Link
        className="text-primary block w-full text-center font-semibold"
        to={'/'}
      >
        ← Back to Jobs
      </Link>

      <SimilarityHeader jobTitle={title} pdfLink={pdf_link} />

      <SimilarJobs />
    </div>
  );
};

export default Similarity;
