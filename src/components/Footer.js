import React, { useState } from 'react';
import { FaLinkedinIn, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [showModal, setShowModal] = useState(false); // Track the visibility of the modal
  const [adminCode, setAdminCode] = useState(''); // Track the inputted code
  const navigate = useNavigate();

  const handleAdminButtonClick = () => {
    setShowModal(true); // Show the modal when the Admin button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleCodeSubmit = () => {
    const correctCode = "admin123"; // The correct admin code
    if (adminCode === correctCode) {
      navigate('/jobManager'); // Navigate to JobManager route
      handleCloseModal(); // Close the modal after successful code entry
    } else {
      alert('Incorrect Code! Please try again.');
    }
  };

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

      {/* Admin Button */}
      <button
        onClick={handleAdminButtonClick}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#67C090',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Admin
      </button>

      {/* Modal for Admin Code */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Enter Admin Code</h3>
            <input
              type="text"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              style={modalStyles.input}
              placeholder="Enter admin code"
            />
            <button
              onClick={handleCodeSubmit}
              style={modalStyles.submitButton}
            >
              Submit
            </button>
            <button
              onClick={handleCloseModal}
              style={modalStyles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '6px',
    width: '300px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#67C090',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  closeButton: {
    backgroundColor: '#d9534f',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Footer;
