import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newsData from '../Json/News.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const ITEMS_PER_PAGE = 3;

const NewsCard = ({ news }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Encode ID to Base64
  const encodeId = (id) => btoa(id.toString());

  return (
    <div className="col-md-4">
      <div
        className="card h-100 shadow-lg unique-card"
        style={{
          background: 'rgba(221, 244, 231, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(103,192,144,0.3)',
          cursor: 'default',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
      >
        {news.image && (
          <div
            className="image-container"
            style={{
              overflow: 'hidden',
              borderRadius: '20px 20px 0 0',
              position: 'relative',
              height: '250px',
            }}
          >
            {loading && (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <img
              src={news.image}
              alt={news.title}
              className="card-img-top news-image"
              style={{
                objectFit: 'cover',
                height: '100%',
                width: '100%',
                display: loading ? 'none' : 'block',
                transition: 'transform 0.5s ease, filter 0.5s ease',
              }}
              onLoad={() => setLoading(false)}
            />
          </div>
        )}

        <div className="card-body text-center">
          <h5
            className="card-title mb-3"
            style={{
              color: '#124170',
              fontWeight: '700',
              textShadow: '1px 1px 2px rgba(38,102,127,0.5)',
            }}
          >
            {news.title}
          </h5>
          <p className="card-text" style={{ fontSize: '0.9rem', color: '#26667F' }}>
            {news.details?.overview || ''}
          </p>
        </div>

        <div className="card-body text-center">
          <span
            className="btn gradient-btn px-4 py-2"
            style={{
              background: 'linear-gradient(135deg, #DDF4E7, #67C090, #124170)',
              color: '#fff',
              borderRadius: '30px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={() => navigate(`/news/${encodeId(news.id)}`)}
          >
            View Details
          </span>
        </div>
      </div>
    </div>
  );
};

const LatestNews = () => {
  const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedNews.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentNews = sortedNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container my-5" style={{ minHeight: '100vh', backgroundColor: 'rgb(221, 244, 231)' }}>
      <h1
        className="mb-5 text-center"
        style={{
          background: 'linear-gradient(90deg, #DDF4E7, #67C090, #124170)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900',
          fontSize: '3rem',
        }}
      >
        Latest News
      </h1>

      <div className="row g-4">
        {currentNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-5">
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
                }}
              >
                {index + 1}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .news-image:hover {
          transform: scale(1.1);
          filter: brightness(1.1);
        }
        .unique-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .gradient-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default LatestNews;
