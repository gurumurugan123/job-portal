import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Target, Eye } from "lucide-react"; // professional icons

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        padding: "50px 20px",
      }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#124170",
            marginBottom: "15px",
          }}
        >
          About Us
        </h1>
        <p style={{ color: "#6B7280", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          We are redefining the way job seekers and companies connect globally,
          with a focus on efficiency, transparency, and trust.
        </p>
      </div>

      {/* Mission, Vision, Team Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Mission */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <Target size={40} color="#26667F" style={{ marginBottom: "15px" }} />
          <h2 style={{ color: "#26667F", marginBottom: "12px" }}>Our Mission</h2>
          <p style={{ color: "#374151", lineHeight: "1.7" }}>
            To connect job seekers with companies worldwide efficiently and transparently.
          </p>
        </div>

        {/* Vision */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <Eye size={40} color="#26667F" style={{ marginBottom: "15px" }} />
          <h2 style={{ color: "#26667F", marginBottom: "12px" }}>Our Vision</h2>
          <p style={{ color: "#374151", lineHeight: "1.7" }}>
            To be the most trusted global job portal focused on quality IT and worldwide job listings.
          </p>
        </div>

        {/* Team */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <Users size={40} color="#26667F" style={{ marginBottom: "15px" }} />
          <h2 style={{ color: "#26667F", marginBottom: "12px" }}>Our Team</h2>
          <p style={{ color: "#374151", lineHeight: "1.7" }}>
            A dedicated group of professionals passionate about employment and technology.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#67C090",
            color: "#fff",
            padding: "14px 34px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "17px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#26667F")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#67C090")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default About;
