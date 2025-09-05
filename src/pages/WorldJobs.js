import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';

const ITEMS_PER_PAGE = 3;

const WorldJobs = () => {
  const worldJobs = jobsData.filter(job => job.type === "World");

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, worldJobs.length));
  };

  return (
    <>
      <h1>World Jobs</h1>
      {worldJobs.slice(0, visibleCount).map(job => (
        <JobCard key={job.id} job={job} />
      ))}
      {visibleCount < worldJobs.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </>
  );
};

export default WorldJobs;
