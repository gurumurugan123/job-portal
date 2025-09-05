import React from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';

const featuredJobs = jobsData.filter(job => job.type === 'IT').slice(0, 3);

const Home = () => {
  return (
    <>
      <section className="hero" style={{padding: '2rem 0', textAlign: 'center'}}>
        <h1>Welcome to Job Portal</h1>
        <p>Your one-stop portal for IT jobs, world jobs, company news and blogs.</p>
        <button onClick={() => window.location.href = '/jobs'}>Browse Latest IT Jobs</button>
      </section>

      <section>
        <h2>Featured Jobs</h2>
        {featuredJobs.map(job => <JobCard key={job.id} job={job} />)}
      </section>
    </>
  );
};

export default Home;
