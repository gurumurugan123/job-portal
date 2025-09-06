import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobsData from "../Json/LatestItjob.json";

// Decode Base64 ID
const decodeId = (encodedId) => {
  try {
    return parseInt(atob(encodedId));
  } catch (error) {
    return null;
  }
};

// Ad Component (insert your AdSense snippet here)
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

const JobDetails = () => {
  const { id } = useParams(); // Encrypted ID from URL
  const decryptedId = decodeId(id);
  const navigate = useNavigate();

  // State for related job pagination
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  // State for loaded images of related jobs
  const [loadedImages, setLoadedImages] = useState({});

  // Find the job matching the decrypted ID
  const job = jobsData.find((j) => j.id === decryptedId);

  if (!job) {
    return (
      <div className="container text-center mt-5">
        <h2>Job not found</h2>
      </div>
    );
  }

  // Destructure details with defaults
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
    applyLink = "#",
  } = job;

  // Related jobs excluding current
  const relatedJobs = jobsData.filter((j) => j.id !== decryptedId);
  const endIndex = startIndex + itemsPerPage;
  const visibleJobs = relatedJobs.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex(Math.min(startIndex + itemsPerPage, relatedJobs.length - itemsPerPage));
  };

  // Navigate to related job on click
  const handleRelatedJobClick = (jobId) => {
    const encodedId = btoa(jobId.toString());
    navigate(`/job/${encodedId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handler to set an image as loaded
  const handleImageLoad = (jobId) => {
    setLoadedImages((prev) => ({ ...prev, [jobId]: true }));
  };

  return (
    <div
      className="container my-5"
      style={{ backgroundColor: "#F5FAE1", minHeight: "100vh", padding: "40px" }}
    >
      {/* Job Title */}
      <h1 style={{ color: "#124170", marginBottom: "30px", textAlign: "center" }}>{title}</h1>

      {/* Job Image */}
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

      {/* Overview */}
      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Overview</h4>
        <p style={{ color: "#124170", lineHeight: "1.6" }}>{overview}</p>
      </section>

      {/* Ad after Overview */}
      <AdComponent />

      {/* Responsibilities */}
      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Responsibilities</h4>
        <ul style={{ color: "#124170", lineHeight: "1.6" }}>
          {responsibilities.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Ad after Responsibilities */}
      <AdComponent />

      {/* Qualifications */}
      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Qualifications</h4>
        <ul style={{ color: "#124170", lineHeight: "1.6" }}>
          {qualifications.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Work Location */}
      <section style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Work Location</h4>
        <p style={{ color: "#124170", lineHeight: "1.6" }}>{workLocation}</p>
      </section>

      {/* Note */}
      <section style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#26667F", marginBottom: "10px" }}>Note</h4>
        <p style={{ color: "#124170", lineHeight: "1.6" }}>{note}</p>
      </section>

      {/* Apply Now Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <a
          href={applyLink}
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

      {/* Ad after Apply Button */}
      <AdComponent />

      {/* Related Jobs */}
      <section style={{ marginTop: "50px" }}>
        <h3 style={{ color: "#124170", marginBottom: "20px" }}>Related Jobs</h3>

        <div
          style={{
            display: "flex",
            gap: "70px",
            overflowX: "auto",
            paddingBottom: "10px",
          }}
        >
          {visibleJobs.map((relJob) => (
            <div
              key={relJob.id}
              style={{
                minWidth: "250px",
                background: "#fff",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 4px 12px rgba(38,102,127,0.1)",
                cursor: "pointer",
              }}
              onClick={() => handleRelatedJobClick(relJob.id)}
            >
              {!loadedImages[relJob.id] && (
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    backgroundColor: "#e0e0e0",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              )}
              <img
                src={relJob.image}
                alt={relJob.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  display: loadedImages[relJob.id] ? "block" : "none",
                }}
                onLoad={() => handleImageLoad(relJob.id)}
              />
              <h5 style={{ color: "#26667F" }}>{relJob.title}</h5>
              <p style={{ fontSize: "14px", color: "#124170" }}>
                {relJob.details?.workLocation}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              background: "#67C090",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: startIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= relatedJobs.length}
            style={{
              padding: "8px 16px",
              background: "#67C090",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor:
                startIndex + itemsPerPage >= relatedJobs.length
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Next
          </button>
        </div>

        <style>
          {`
            @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.4; }
              100% { opacity: 1; }
            }
          `}
        </style>
      </section>
    </div>
  );
};

export default JobDetails;
