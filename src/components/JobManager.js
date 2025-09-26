import React, { useState, useEffect } from "react";
import { db } from "../Config/FirebaseConfig"; // Import your Firebase Firestore setup
import { collection, getDocs, addDoc } from "firebase/firestore"; // Firestore functions

export default function JobManager() {
  const [jobs, setJobs] = useState([]); 
  const [input, setInput] = useState(""); // JSON input
  const [error, setError] = useState(""); // Validation error
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [toastMessage, setToastMessage] = useState(""); // State to show toast

  const jobsPerPage = 1; // Number of jobs to show per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // ✅ Validation function
  const validateJobFormat = (job) => {
    const requiredMainKeys = [
      "id",
      "title",
      "company",
      "type",
      "image",
      "date",
      "applyLink",
      "details",
    ];

    const requiredDetailKeys = [
      "overview",
      "responsibilities",
      "qualifications",
      "workLocation",
      "note",
      "howToApply",
    ];

    // 1️⃣ Check if all main keys exist
    for (let key of requiredMainKeys) {
      if (!(key in job)) {
        return `Missing key: "${key}"`;
      }
    }

    // 2️⃣ Check if details is an object
    if (typeof job.details !== "object") {
      return `"details" must be an object`;
    }

    // 3️⃣ Check if all details keys exist
    for (let key of requiredDetailKeys) {
      if (!(key in job.details)) {
        return `Missing key in details: "${key}"`;
      }
    }

    // 4️⃣ Check if responsibilities and qualifications are arrays
    if (!Array.isArray(job.details.responsibilities)) {
      return `"responsibilities" must be an array`;
    }
    if (!Array.isArray(job.details.qualifications)) {
      return `"qualifications" must be an array`;
    }

    return null; // ✅ All good
  };

  // Fetch jobs from Firestore when the component mounts or when pagination changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const jobsData = snapshot.docs.map((doc) => doc.data());
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []); // Fetch jobs on initial load

  // 🚀 Add job handler (add job to Firestore)
  const handleAddJob = async () => {
    try {
      const parsed = JSON.parse(input);

      // Support array or single object
      const jobsToAdd = Array.isArray(parsed) ? parsed : [parsed];

      for (let job of jobsToAdd) {
        const validationError = validateJobFormat(job);
        if (validationError) {
          setError(`❌ Invalid format: ${validationError}`);
          return;
        }
      }

      // ✅ All jobs valid
      for (let job of jobsToAdd) {
        await addDoc(collection(db, "jobs"), job); // Adds job to Firestore
      }

      // Fetch updated jobs list from Firestore
      const snapshot = await getDocs(collection(db, "jobs"));
      const updatedJobs = snapshot.docs.map((doc) => doc.data());
      setJobs(updatedJobs);

      setInput("");
      setError("");
      alert("✅ Job added successfully!");
    } catch (e) {
      setError("❌ Invalid JSON. Please check the syntax.");
    }
  };

  // Sample JSON data
  const sampleJobJSON = `{
    "id": "1",
    "title": "Software Engineer",
    "company": "Tech Corp",
    "type": "Full-time",
    "image": "https://www.example.com/logo.png",
    "date": "2025-09-30",
    "applyLink": "https://www.example.com/jobs/1",
    "details": {
      "overview": "Develop and maintain software applications.",
      "responsibilities": [
        "Write clean, maintainable code.",
        "Collaborate with the team to design new features."
      ],
      "qualifications": [
        "Bachelor's degree in Computer Science.",
        "Experience with JavaScript and React."
      ],
      "workLocation": "Remote",
      "note": "Must be self-motivated and able to work independently.",
      "howToApply": "Click the 'Apply Now' link to submit your application."
    }
  }`;

  // Show the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Copy to clipboard handler
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sampleJobJSON)
      .then(() => {
        setToastMessage("Copied Successfully!");
        setTimeout(() => {
          setToastMessage(""); // Clear the toast after 3 seconds
        }, 3000);
      })
      .catch((err) => {
        console.error("Error copying to clipboard", err);
        setToastMessage("Failed to copy!");
        setTimeout(() => {
          setToastMessage(""); // Clear the toast after 3 seconds
        }, 3000);
      });
  };

  // Calculate the current page's jobs to display
  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Go to the next page
  const handleNextPage = () => {
    if (currentPage * jobsPerPage < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h2>📁 Job Manager Interface</h2>
      <p>Paste your job JSON below. It must match the required structure.</p>

      {/* JSON Input */}
      <textarea
        rows="14"
        style={{ width: "100%", marginBottom: "10px", fontFamily: "monospace", padding: "10px" }}
        placeholder={`Paste job JSON here...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Error message */}
      {error && (
        <div style={{ background: "#ffe6e6", color: "#b30000", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <button
        onClick={handleAddJob}
        style={{
          padding: "10px 20px",
          background: "#124170",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ➕ Add Job
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* Jobs List */}
      <h3>📋 Current Jobs ({jobs.length})</h3>
      {currentJobs.length === 0 && <p>No jobs added yet.</p>}

      {currentJobs.map((job, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h4>{job.title} @ {job.company}</h4>
          <p><strong>Location:</strong> {job.details.workLocation}</p>
          <p><strong>Date:</strong> {job.date}</p>
          <p><strong>Overview:</strong> {job.details.overview}</p>
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * jobsPerPage >= jobs.length}
        >
          Next
        </button>
      </div>

      {/* Last Job ID */}
      {jobs.length > 0 && (
        <div style={{ marginTop: "20px", fontSize: "16px", color: "#4CAF50" }}>
          <strong>Last Job ID: {jobs[jobs.length - 1].id}</strong>
        </div>
      )}

      {/* Show Sample JSON Button */}
      <button
        onClick={handleShowModal}
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Show Sample JSON Data
      </button>

      {/* Modal for Sample JSON */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Sample Job JSON</h3>
            <pre style={modalStyles.pre}>{sampleJobJSON}</pre>
            <button
              onClick={handleCopyToClipboard}
              style={modalStyles.copyButton}
            >
              Copy to Clipboard
            </button>
            <button onClick={handleCloseModal} style={modalStyles.closeButton}>Close</button>
          </div>
        </div>
      )}

      {/* Toast message */}
      {toastMessage && (
        <div style={toastStyles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

// Modal Styles
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.3s ease-in-out",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "6px",
    width: "80%",
    maxWidth: "600px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    animation: "slideUp 0.3s ease-in-out",
  },
  pre: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "4px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "14px",
    height: "200px",
    overflowY: "auto",
  },
  closeButton: {
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
    marginTop: "20px",
  },
  copyButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
    marginTop: "20px",
  },
};

// Toast Styles
const toastStyles = {
  toast: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  }
};
