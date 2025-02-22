import { useState } from 'react';
import Search from '../_components/Search';
import JobsList from '../features/jobs/JobsList';
import Hero from '../features/landing/Hero';

const Landing = () => {
  const [searchJobTitle, setSearchJobTitle] = useState('');

  return (
    <main className="space-y-10">
      <Hero />
      <Search handler={setSearchJobTitle} />
      <JobsList searchJobTitle={searchJobTitle} />
    </main>
  );
};

export default Landing;
