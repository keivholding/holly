import { useQuery } from '@tanstack/react-query';
import { getJob } from './api';

const useJob = jobId => {
  const { data: job, isLoading: isLoadingJob } = useQuery({
    queryFn: () => getJob(jobId),
    queryKey: ['job', jobId],
    staleTime: Infinity,
  });

  return { job, isLoadingJob };
};

export default useJob;
