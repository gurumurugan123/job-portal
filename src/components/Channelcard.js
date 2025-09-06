import React from 'react';

const ChannelCard = ({ icon, title, description, buttonText, link, gradient }) => {
  return (
    <div
      style={{
        borderRadius: '15px',
        padding: '1.5rem',
        background: gradient || '#fff',
        color: '#fff',
        boxShadow: '0 8px 25px rgba(38, 102, 127, 0.15)',
        transition: 'all 0.3s ease',
        textAlign: 'center',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(38, 102, 127, 0.3)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(38, 102, 127, 0.15)';
      }}
    >
      {/* Icon at the top */}
      {icon && <img src={icon} alt={title} style={{ width: '50px', marginBottom: '1rem' }} />}

      <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: '#fff' }}>{title}</h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1rem' }}>{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.5rem',
          borderRadius: '50px',
          fontWeight: '600',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #67C090, #26667F)',
          color: '#fff',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #26667F, #124170)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #67C090, #26667F)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default ChannelCard;
