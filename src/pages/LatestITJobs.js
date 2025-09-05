import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';

const ITEMS_PER_PAGE = 3;

const LatestITJobs = () => {
  const itJobs = jobsData.filter(job => job.type === "IT");

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, itJobs.length));
  };

  return (
    <>
      <h1>Latest IT Jobs</h1>
      {itJobs.slice(0, visibleCount).map(job => (
        <JobCard key={job.id} job={job} />
      ))}
      {visibleCount < itJobs.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </>
  );
};

export default LatestITJobs;
