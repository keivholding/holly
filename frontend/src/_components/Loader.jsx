const Loader = () => {
  return (
    <div className="loader">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="4"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          strokeDasharray="31.4 31.4"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

export default Loader;
