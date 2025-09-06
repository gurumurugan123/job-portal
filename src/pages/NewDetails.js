import React from 'react';
import { useParams } from 'react-router-dom';
import newsData from '../Json/News.json';

// Decode Base64
const decodeId = (encodedId) => {
  try {
    return parseInt(atob(encodedId));
  } catch {
    return null;
  }
};

const NewsDetails = () => {
  const { id } = useParams();
  const newsId = decodeId(id);
  const news = newsData.find((n) => n.id === newsId);

  if (!news) {
    return (
      <div className="container text-center mt-5">
        <h2>News not found</h2>
      </div>
    );
  }

  const { title, image, details = {} } = news;
  const { overview, responsibilities, workLocation, note } = details;

  return (
    <div className="container my-5" style={{ minHeight: '100vh', backgroundColor: '#F5FAE1', padding: '40px' }}>
      <h1 style={{ color: '#124170', textAlign: 'center', marginBottom: '30px' }}>{title}</h1>

      {image && (
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src={image}
            alt={title}
            style={{
              maxWidth: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      )}

      {overview && (
        <section style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#26667F', marginBottom: '10px' }}>Overview</h4>
          <p style={{ color: '#124170', lineHeight: '1.6' }}>{overview}</p>
        </section>
      )}

      {responsibilities && (
        <section style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#26667F', marginBottom: '10px' }}>Key Points</h4>
          <ul style={{ color: '#124170', lineHeight: '1.6' }}>
            {responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {workLocation && (
        <section style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#26667F', marginBottom: '10px' }}>Location</h4>
          <p style={{ color: '#124170', lineHeight: '1.6' }}>{workLocation}</p>
        </section>
      )}

      {note && (
        <section style={{ marginBottom: '30px' }}>
          <h4 style={{ color: '#26667F', marginBottom: '10px' }}>Note</h4>
          <p style={{ color: '#124170', lineHeight: '1.6' }}>{note}</p>
        </section>
      )}
    </div>
  );
};

export default NewsDetails;
