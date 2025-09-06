import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobsData from '../Json/LatestItjob.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const ITEMS_PER_PAGE = 6;

// Utility functions to encode/decode ID
const encodeId = (id) => btoa(id); // Base64 encode
const decodeId = (encoded) => atob(encoded); // Base64 decode

// Individual JobCard component
const JobCard = ({ job, goToJobDetails }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="col-md-4">
      <div
        className="card h-100 shadow-sm"
        style={{
          backgroundColor: '#DDF4E7',
          cursor: 'pointer',
          transition: 'transform 0.3s',
          border: 'none',
          borderRadius: '12px',
        }}
      >
        {/* Job Title */}
        <div className="card-body text-center">
          <h5 className="card-title mb-3" style={{ color: '#124170' }}>{job.title}</h5>
        </div>

        {/* Job Image with loader */}
        {job.image && (
          <div className="image-container" style={{ overflow: 'hidden', borderRadius: '12px 12px 0 0', position: 'relative' }}>
            {loading && (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <img
              src={job.image}
              alt={job.title}
              className="card-img-top job-image"
              style={{
                objectFit: 'cover',
                height: '250px',
                width: '100%',
                transition: 'transform 0.5s ease',
                display: loading ? 'none' : 'block'
              }}
              onLoad={() => setLoading(false)}
            />
          </div>
        )}

        {/* View Details Button */}
        <div className="card-body text-center">
          <button
            className="btn px-4 py-2"
            style={{ backgroundColor: '#67C090', color: '#FFFFFF' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#26667F'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#67C090'}
            onClick={() => goToJobDetails(job.id)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const LatestITJobs = () => {
  const navigate = useNavigate();

  // Sort jobs by date; newest first
  const itJobs = [...jobsData.filter(job => job.type === "IT")].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(itJobs.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToJobDetails = (jobId) => {
    const encryptedId = encodeId(jobId); // Encrypt ID
    navigate(`/job/${encryptedId}`);
  };

  const currentJobs = itJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container my-5" style={{ backgroundColor: '#F5FAE1', minHeight: '100vh' }}>
      <h1 className="mb-4 text-center" style={{ color: '#124170' }}>Latest IT Jobs</h1>
      <div className="row g-4">
        {currentJobs.map(job => (
          <JobCard key={job.id} job={job} goToJobDetails={goToJobDetails} />
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
              style={{ cursor: 'pointer' }}
            >
              <span
                className="page-link"
                style={{
                  backgroundColor: currentPage === index + 1 ? '#000000' : '#FFFFFF',
                  color: currentPage === index + 1 ? '#FFFFFF' : '#000000',
                  border: '1px solid #000000',
                  outline: 'none',
                }}
              >
                {index + 1}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Inline CSS for hover zoom */}
      <style>
        {`
          .job-image:hover {
            transform: scale(1.3);
          }
        `}
      </style>
    </div>
  );
};

export default LatestITJobs;
