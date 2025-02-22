import { Link } from 'react-router';

const SimilarJob = ({ similarJob }) => {
  const {
    similar_job_id,
    similar_job_title,
    similarity_score,
    similarity_score_explanation,
  } = similarJob;

  return (
    <li className="w-full rounded-lg bg-white p-5 shadow-md transition-all hover:-translate-y-2 hover:shadow-lg">
      <Link className="space-y-5" to={`/similarity/${similar_job_id}`}>
        <div className="flex justify-between">
          <h4>{similar_job_title}</h4>
          <span className="bg-primary/20 text-primary rounded-full px-4 py-1">
            {similarity_score.toFixed(2) * 100}%
          </span>
        </div>

        <p className="text-subtle/80 text-sm">ID: {similar_job_id}</p>

        <p className="text-subtle">{similarity_score_explanation}</p>
      </Link>
    </li>
  );
};

export default SimilarJob;
