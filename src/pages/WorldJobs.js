import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobsData from '../Json/Worldsjob.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const ITEMS_PER_PAGE = 6;

const WorldJobs = () => {
  const navigate = useNavigate();
  
  // Sort IT jobs by date (newest first)
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
    navigate(`/world-jobs/${btoa(jobId)}`); // encode ID in Base64
  };

  const currentJobs = itJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container my-5" style={{ backgroundColor: '#F5FAE1', minHeight: '100vh' }}>
      <h1 className="mb-4 text-center" style={{ color: '#124170' }}>Latest IT Jobs</h1>

      <div className="row g-4">
        {currentJobs.map((job) => (
          <div key={job.id} className="col-md-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                backgroundColor: '#DDF4E7',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                border: 'none',
                borderRadius: '12px'
              }}
              onClick={() => goToJobDetails(job.id)}
            >
              {/* Job Image */}
              {job.image && (
                <img
                  src={job.image}
                  className="card-img-top"
                  alt={job.title}
                  style={{
                    objectFit: 'cover',
                    height: '200px',
                    borderRadius: '12px 12px 0 0'
                  }}
                />
              )}

              {/* Job Title */}
              <div className="card-body text-center">
                <h5 className="card-title mb-3" style={{ color: '#124170' }}>{job.title}</h5>
              </div>

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
                  backgroundColor: currentPage === index + 1 ? '#124170' : '#FFFFFF',
                  color: currentPage === index + 1 ? '#FFFFFF' : '#124170',
                  border: '1px solid #124170',
                  outline: 'none',
                }}
              >
                {index + 1}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default WorldJobs;
