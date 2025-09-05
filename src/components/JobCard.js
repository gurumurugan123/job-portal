import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p style={{ color: '#0073e6', fontWeight: 'bold' }}>{job.salary}</p>
      <button onClick={() => alert('Apply functionality coming soon!')}>Apply Now</button>
    </div>
  );
};

export default JobCard;
