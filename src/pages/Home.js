import React from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';

const featuredJobs = jobsData.filter(job => job.type === 'IT').slice(0, 3);

const Home = () => {
  return (
    <div style={{ backgroundColor: '#E8F5F1', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
     <section
  className="hero text-center"
  style={{
    padding: '4rem 2rem',
    background: 'linear-gradient(120deg, #67C090, #DDF4E7)',
    color: '#124170',
    borderRadius: '20px',
    margin: '2rem auto',
    maxWidth: '900px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  }}
>
  <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
    Find Your Dream IT Job Today
  </h1>
  <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
    Browse the latest IT jobs, discover global opportunities, and stay ahead in your career.
  </p>
  <button
    onClick={() => window.location.href = '/jobs'}
    style={{
      padding: '0.8rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#fff',
      backgroundColor: '#38A169',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    Browse Latest IT Jobs
  </button>
</section>


      {/* Featured Jobs Section */}
  <section
  style={{
    padding: '3rem 2rem',
    background: 'linear-gradient(135deg, #DDF4E7 0%, #67C090 100%)', // soft mint → teal gradient
    borderRadius: '20px',
  }}
>
  <h2
    className="text-center mb-5"
    style={{
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#124170', // deep navy for contrast
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    }}
  >
    Featured Jobs
  </h2>

  <div className="row g-4 justify-content-center">
    {featuredJobs.map(job => (
      <div className="col-md-4" key={job.id}>
        <div
          style={{
            borderRadius: '20px',
            background: '#fff', // white card for readability
            padding: '2rem',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 20px rgba(38, 102, 127, 0.15)',
            borderTop: '5px solid #67C090', // teal accent on top
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow =
              '0 15px 35px rgba(38, 102, 127, 0.3)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 8px 20px rgba(38, 102, 127, 0.15)';
          }}
        >
          {/* Job content */}
          <JobCard job={job} />

        
        </div>
      </div>
    ))}
  </div>
</section>




      {/* Call-to-Action Section */}
      <section
        style={{
          marginTop: '4rem',
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: '#124170',
          color: '#fff',
          borderRadius: '15px',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
          Ready to find your dream job?
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Browse the latest IT jobs and apply today!
        </p>
        <button
          onClick={() => window.location.href = '/jobs'}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#124170',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Explore Jobs
        </button>
      </section>
    </div>
  );
};

export default Home;
