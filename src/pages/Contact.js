import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!form.message.trim()) errs.message = 'Message cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully.');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name:</label><br />
          <input name="name" value={form.name} onChange={onChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label><br />
          <input name="email" value={form.email} onChange={onChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Message:</label><br />
          <textarea name="message" value={form.message} onChange={onChange} />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </div>
        <button type="submit" style={{marginTop: '1rem'}}>Send</button>
      </form>

      <section style={{marginTop: '2rem'}}>
        <h2>Contact Info</h2>
        <p>Email: contact@jobportal.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Job Street, Tech City, World</p>
      </section>
    </>
  );
};

export default Contact;
