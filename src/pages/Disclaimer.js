import React from "react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F9FBF7, #E6F0FA)",
        padding: "0",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #124170, #26667F)",
          color: "#fff",
          textAlign: "center",
          padding: "70px 20px 50px",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "10px" }}>
          Disclaimer
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>
          Last updated: September 2025
        </p>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: "50px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <section
          style={{
            marginBottom: "30px",
            background: "#fff",
            padding: "25px",
            borderRadius: "14px",
            boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <p style={{ color: "#124170", lineHeight: "1.8", fontSize: "16px" }}>
            ⚡ The job listings and other content on this website are provided
            for general informational purposes only. While we strive to keep the
            information accurate and up-to-date, we make no guarantees regarding
            its completeness, reliability, or accuracy.
          </p>
        </section>

        {/* Sections with Icons */}
        {[
          {
            icon: "🛡️",
            title: "1. No Guarantees",
            text: "We do not guarantee that the job postings, company information, or other details provided will always be accurate, updated, or suitable for your career decisions.",
          },
          {
            icon: "⚖️",
            title: "2. Limitation of Liability",
            text: "We are not liable for any direct, indirect, or consequential losses or damages that may result from using the information provided on this website.",
          },
          {
            icon: "🔗",
            title: "3. External Links",
            text: "This site may contain links to third-party websites. We are not responsible for the content, accuracy, or reliability of these external sites.",
          },
          {
            icon: "👤",
            title: "4. User Responsibility",
            text: "Any reliance you place on the information found on this website is strictly at your own risk. We encourage users to verify details before making career or financial decisions.",
          },
        ].map((section, index) => (
          <section
            key={index}
            style={{
              marginBottom: "25px",
              padding: "25px",
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "flex-start",
              gap: "15px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)")}
          >
            <div style={{ fontSize: "28px" }}>{section.icon}</div>
            <div>
              <h3 style={{ color: "#26667F", marginBottom: "10px", fontSize: "20px", fontWeight: "600" }}>
                {section.title}
              </h3>
              <p style={{ color: "#124170", lineHeight: "1.7", fontSize: "15px" }}>
                {section.text}
              </p>
            </div>
          </section>
        ))}

        {/* Back button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(135deg, #67C090, #3B8D6C)",
              color: "#fff",
              padding: "14px 36px",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
            }}
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
