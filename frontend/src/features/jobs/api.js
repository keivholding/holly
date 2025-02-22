import { API_URL } from '../../utils/constants';
import { getJSON } from '../../utils/requests';

const getAllJobs = async () => {
  const url = `${API_URL}/jobs`;
  const data = await getJSON(url);
  return data.data.jobs;
};

const getJob = async jobId => {
  const url = `${API_URL}/jobs/${jobId}`;
  const data = await getJSON(url);
  return data.data.job;
};

export { getAllJobs, getJob };
