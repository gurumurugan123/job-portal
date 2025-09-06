import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import jobsData from "../Json/Worldsjob.json";

// Decode Base64 ID
const decodeId = (encodedId) => {
  try {
    return parseInt(atob(encodedId));
  } catch (error) {
    return null;
  }
};

// Ad Component
const AdComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", margin: "20px 0" }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

const WorldJobDetails = () => {
  const { id } = useParams(); // Encrypted ID
  const decryptedId = decodeId(id);
  const job = jobsData.find((j) => j.id === decryptedId);

  if (!job) {
    return (
      <div className="container text-center mt-5">
        <h2>Job not found</h2>
      </div>
    );
  }

  const {
    title,
    image,
    details: {
      overview = "No overview provided.",
      responsibilities = ["Not specified."],
      qualifications = ["Not specified."],
      workLocation = "Not specified.",
      note = "No notes.",
      howToApply = "#",
    } = {},
  } = job;

  return (
    <div className="container my-5" style={{ backgroundColor: "#F5FAE1", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ color: "#124170", marginBottom: "30px", textAlign: "center" }}>{title}</h1>

      {image && (
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img
            src={image}
            alt={title}
            style={{
              maxWidth: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}

      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Overview</h4>
        <p style={{ color: "#124170", lineHeight: "1.6" }}>{overview}</p>
      </section>

      <AdComponent />

      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Responsibilities</h4>
        <ul style={{ color: "#124170", lineHeight: "1.6" }}>
          {responsibilities.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <AdComponent />

      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Qualifications</h4>
        <ul style={{ color: "#124170", lineHeight: "1.6" }}>
          {qualifications.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Work Location</h4>
        <p style={{ color: "#124170", lineHeight: "1.6" }}>{workLocation}</p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Note</h4>
        <p style={{ color: "#124170", lineHeight: "1.6" }}>{note}</p>
      </section>

      <div style={{ textAlign: "center" }}>
        <a
  href={job.applyLink}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    backgroundColor: "#67C090",
    color: "#FFFFFF",
    padding: "12px 30px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s",
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#26667F")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#67C090")}
>
  Apply Now
</a>

      </div>

      <AdComponent />
    </div>
  );
};

export default WorldJobDetails;
