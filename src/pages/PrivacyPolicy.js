import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F9FBF7, #E6F0FA)",
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>
          Last updated: September 2025
        </p>
      </div>

      {/* Content */}
      <div
        className="container"
        style={{
          padding: "50px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Intro */}
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
            🔒 We take your privacy seriously. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website.
          </p>
        </section>

        {/* Sections */}
        {[
          {
            icon: "📑",
            title: "1. Information We Collect",
            content: (
              <ul style={{ color: "#124170", lineHeight: "1.7", margin: 0, paddingLeft: "18px" }}>
                <li>Personal information you provide (name, email, etc.).</li>
                <li>Usage data such as pages visited and interactions.</li>
                <li>Technical details including browser type, IP address, and cookies.</li>
              </ul>
            ),
          },
          {
            icon: "⚙️",
            title: "2. How We Use Your Information",
            content: (
              <p style={{ color: "#124170", lineHeight: "1.7" }}>
                The data we collect is used solely to improve our services, provide
                relevant job updates, and ensure a better user experience. We never
                sell your data to third parties.
              </p>
            ),
          },
          {
            icon: "✅",
            title: "3. Your Consent",
            content: (
              <p style={{ color: "#124170", lineHeight: "1.7" }}>
                By using our site, you agree to our collection and use of information
                in accordance with this policy.
              </p>
            ),
          },
          {
            icon: "🛡️",
            title: "4. Data Security",
            content: (
              <p style={{ color: "#124170", lineHeight: "1.7" }}>
                We implement industry-standard security measures to protect your data
                from unauthorized access, alteration, or disclosure.
              </p>
            ),
          },
          {
            icon: "📧",
            title: "5. Contact Us",
            content: (
              <p style={{ color: "#124170", lineHeight: "1.7" }}>
                If you have any questions about this Privacy Policy, please reach out
                to us at{" "}
                <a
                  href="mailto:support@example.com"
                  style={{ color: "#67C090", fontWeight: "600" }}
                >
                  support@example.com
                </a>
                .
              </p>
            ),
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
              <h3
                style={{
                  color: "#26667F",
                  marginBottom: "10px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {section.title}
              </h3>
              {section.content}
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
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
