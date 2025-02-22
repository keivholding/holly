import { Link } from 'react-router';

const SimilarityHeader = ({ jobTitle, pdfLink }) => {
  return (
    <div className="space-y-3 text-center">
      <h1>Similar Roles</h1>
      <p className="text-subtle">
        Top 10 similar position to{' '}
        <Link
          to={pdfLink}
          target="_blank"
          className="text-primary font-semibold"
        >
          {jobTitle}
        </Link>
      </p>
    </div>
  );
};

export default SimilarityHeader;
