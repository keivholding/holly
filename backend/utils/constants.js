const JOB_LIMIT = 10;
// MongoDB recommends using a ratio of 10 to 20. Using 15 as a multiplier to balance between accuracy and performance, ensuring a sufficient pool of candidates for better search results while managing latency
const JOB_NUM_CANDIDATES = JOB_LIMIT * 15;

export { JOB_NUM_CANDIDATES, JOB_LIMIT };
