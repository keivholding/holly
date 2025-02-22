import { useParams } from 'react-router';

import Loader from '../../_components/Loader';
import SimilarJob from './SimilarJob';
import useSimilarity from './useSimilarity';

const SimilarJobs = () => {
  const { jobId } = useParams();

  const { topSimilar, isLoadingSimilar } = useSimilarity(jobId);

  return (
    <ul className="relative grid min-h-80 grid-cols-1 gap-8">
      {isLoadingSimilar && <Loader />}

      {!isLoadingSimilar &&
        topSimilar.map((similarJob, index) => (
          <SimilarJob key={index} similarJob={similarJob} />
        ))}
    </ul>
  );
};

export default SimilarJobs;
