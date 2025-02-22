import { useQuery } from '@tanstack/react-query';
import { getTop10Similar } from './api';

const useSimilarity = jobId => {
  const { data: topSimilar, isLoading: isLoadingSimilar } = useQuery({
    queryFn: () => getTop10Similar(jobId),
    queryKey: ['similarJobs', jobId],
    staleTime: Infinity,
  });

  return { topSimilar, isLoadingSimilar };
};

export default useSimilarity;
