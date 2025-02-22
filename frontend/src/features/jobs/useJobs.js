import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from './api';

const useJobs = () => {
  const { data: allJobs, isLoading: isLoadingAllJobs } = useQuery({
    queryFn: getAllJobs,
    queryKey: ['jobs'],
    staleTime: Infinity,
  });

  return { allJobs, isLoadingAllJobs };
};

export default useJobs;
