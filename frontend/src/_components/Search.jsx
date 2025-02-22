import { useState } from 'react';

const Search = ({ handler }) => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
    handler(e.target.value);
  };

  return (
    <input
      type="search"
      placeholder="Search for a position"
      className="border-subtle/30 placeholder:text-subtle focus:border-primary w-full rounded-lg border-2 bg-white px-4 py-3 outline-0"
      value={input}
      onChange={handleChange}
    />
  );
};

export default Search;
