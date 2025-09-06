  import React from 'react';
  import { FaLinkedinIn, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';


  const Footer = () => {
    return (
      <footer
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #124170, #26667F)', // navy → teal gradient
          color: '#fff',
          textAlign: 'center',
          borderRadius: '15px',
          marginTop: '3rem',
        }}
      >
        <p style={{ marginBottom: '1rem' }}>© 2025 Job Portal Company. All rights reserved.</p>
        <p style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Follow us:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '1.2rem' }}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#DDF4E7', transition: '0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#67C090')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#DDF4E7')}
          >
           
            <FaLinkedinIn />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#DDF4E7', transition: '0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#67C090')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#DDF4E7')}
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://t.me/yourtelegram"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#DDF4E7', transition: '0.3s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#67C090')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#DDF4E7')}
          >
            <FaTelegramPlane />
          </a>
        </div>
      </footer>
    );
  };

  export default Footer;
