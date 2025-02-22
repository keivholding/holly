import { API_URL } from '../../utils/constants';
import { getJSON } from '../../utils/requests';

const getTop10Similar = async jobId => {
  const url = `${API_URL}/jobs/similar/${jobId}`;
  const data = await getJSON(url);
  return data.data.structuredOutput;
};

export { getTop10Similar };
