import Job from './Job';
import useJobs from './useJobs';
import Loader from '../../_components/Loader';

const JobsList = ({ searchJobTitle }) => {
  const { allJobs, isLoadingAllJobs } = useJobs();

  return (
    <ul className="relative grid min-h-80 grid-cols-3 gap-8">
      {isLoadingAllJobs && <Loader />}

      {!isLoadingAllJobs &&
        allJobs.map((job, i) => (
          <Job job={job} searchJobTitle={searchJobTitle} key={i} />
        ))}
    </ul>
  );
};

export default JobsList;
