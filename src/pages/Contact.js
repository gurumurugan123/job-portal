import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Valid email is required";
    if (!form.message.trim()) errs.message = "Message cannot be empty";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess("Your message has been sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setSuccess(""), 4000);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div
      className="container my-5"
      style={{
        backgroundColor: "#F5FAE1",
        minHeight: "100vh",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: "#124170",
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Contact Us
      </h1>

      {/* Success message */}
      {success && (
        <p
          style={{
            textAlign: "center",
            color: "green",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          {success}
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#124170" }}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#124170" }}>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#124170" }}>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows="5"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          {errors.message && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#67C090",
            color: "#fff",
            padding: "12px 28px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#26667F")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#67C090")}
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <section
        style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#124170",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Get in Touch</h2>
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Mail size={18} color="#26667F" /> contact@jobportal.com
        </p>
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <Phone size={18} color="#26667F" /> +1 234 567 890
        </p>
        <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <MapPin size={18} color="#26667F" /> 123 Job Street, Tech City, World
        </p>
      </section>
    </div>
  );
};

export default Contact;
