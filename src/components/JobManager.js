import React, { useState, useEffect } from "react";
import { db } from "../Config/FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function JobManager() {
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ Modal toggle
  const [toastMessage, setToastMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const jobsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const jobsRef = collection(db, "jobs");

  // ✅ Sample JSON
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

    for (let key of requiredMainKeys) {
      if (!(key in job)) return `Missing key: "${key}"`;
    }
    if (typeof job.details !== "object") return `"details" must be an object`;
    for (let key of requiredDetailKeys) {
      if (!(key in job.details)) return `Missing key in details: "${key}"`;
    }
    if (!Array.isArray(job.details.responsibilities))
      return `"responsibilities" must be an array`;
    if (!Array.isArray(job.details.qualifications))
      return `"qualifications" must be an array`;
    return null;
  };

  // 🔄 Fetch jobs
  const fetchJobs = async () => {
    const snapshot = await getDocs(jobsRef);
    const jobsData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🆕 Auto-increment ID
  const getNextId = () => {
    if (jobs.length === 0) return 1;
    const maxId = Math.max(...jobs.map((j) => parseInt(j.id, 10)));
    return maxId + 1;
  };

  // ➕ Add or ✏️ Update Job
  const handleSaveJob = async () => {
    try {
      const parsed = JSON.parse(input);
      const jobsToProcess = Array.isArray(parsed) ? parsed : [parsed];

      for (let job of jobsToProcess) {
        if (!job.id || job.id === "") {
          job.id = getNextId().toString();
        }
        const validationError = validateJobFormat(job);
        if (validationError) {
          setError(`❌ Invalid format: ${validationError}`);
          return;
        }
      }

      for (let job of jobsToProcess) {
        if (editId) {
          const jobDoc = doc(db, "jobs", editId);
          await updateDoc(jobDoc, job);
        } else {
          await addDoc(jobsRef, job);
        }
      }

      await fetchJobs();
      setInput("");
      setError("");
      setEditId(null);
      alert(editId ? "✅ Job updated successfully!" : "✅ Job added successfully!");
    } catch (e) {
      setError("❌ Invalid JSON. Please check the syntax.");
    }
  };

  // ✏️ Edit
  const handleEdit = (job) => {
    setInput(JSON.stringify(job, null, 2));
    setEditId(job.docId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑️ Delete
  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const jobDoc = doc(db, "jobs", jobId);
      await deleteDoc(jobDoc);
      await fetchJobs();
      alert("🗑️ Job deleted successfully!");
    }
  };

  // 📋 Copy Sample JSON
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sampleJobJSON).then(() => {
      setToastMessage("📋 Sample JSON copied!");
      setTimeout(() => setToastMessage(""), 3000);
    });
  };

  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h2>📁 Job Manager (CRUD + Auto ID)</h2>
      <p>Paste your job JSON below. It will auto-add `id` if missing.</p>

      <textarea
        rows="14"
        style={{ width: "100%", marginBottom: "10px", fontFamily: "monospace", padding: "10px" }}
        placeholder={`Paste job JSON here...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {error && (
        <div style={{ background: "#ffe6e6", color: "#b30000", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSaveJob}
        style={{
          padding: "10px 20px",
          background: editId ? "#ff9800" : "#124170",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {editId ? "✏️ Update Job" : "➕ Add Job"}
      </button>

      {editId && (
        <button
          onClick={() => {
            setEditId(null);
            setInput("");
          }}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            background: "#9e9e9e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ❌ Cancel Edit
        </button>
      )}

      {/* ✅ Show Sample JSON Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📄 Show Sample JSON
      </button>

      <hr style={{ margin: "20px 0" }} />

      <h3>📋 Current Jobs ({jobs.length})</h3>
      {currentJobs.length === 0 && <p>No jobs added yet.</p>}

      {currentJobs.map((job, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
          <h4>{job.title} @ {job.company}</h4>
          <p><strong>ID:</strong> {job.id}</p>
          <p><strong>Location:</strong> {job.details.workLocation}</p>
          <p><strong>Date:</strong> {job.date}</p>
          <p><strong>Overview:</strong> {job.details.overview}</p>
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleEdit(job)} style={{ marginRight: "10px", padding: "6px 14px", background: "#ff9800", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              ✏️ Edit
            </button>
            <button onClick={() => handleDelete(job.docId)} style={{ padding: "6px 14px", background: "#d9534f", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * jobsPerPage >= jobs.length}>
          Next
        </button>
      </div>

      {/* ✅ Sample JSON Modal */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>📄 Sample Job JSON</h3>
            <pre style={modalStyles.pre}>{sampleJobJSON}</pre>
            <button onClick={handleCopyToClipboard} style={modalStyles.copyButton}>
              📋 Copy JSON
            </button>
            <button onClick={() => setShowModal(false)} style={modalStyles.closeButton}>
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Toast */}
      {toastMessage && <div style={toastStyles.toast}>{toastMessage}</div>}
    </div>
  );
}

// 🎨 Modal Styles
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
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "600px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  },
  pre: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "4px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "300px",
    overflowY: "auto",
  },
  copyButton: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginRight: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  closeButton: {
    background: "#d9534f",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// ✅ Toast Styles
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
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 2000,
  },
};
