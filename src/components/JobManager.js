import React, { useState, useEffect } from "react";
import { db } from "../Config/FirebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function JobManager() {
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [editId, setEditId] = useState(null); // 🆕 Track which job is being edited

  const jobsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const jobsRef = collection(db, "jobs");

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
      if (!(key in job)) {
        return `Missing key: "${key}"`;
      }
    }
    if (typeof job.details !== "object") return `"details" must be an object`;

    for (let key of requiredDetailKeys) {
      if (!(key in job.details)) {
        return `Missing key in details: "${key}"`;
      }
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
    const jobsData = snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🆕 Get next ID (auto-increment)
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
          job.id = getNextId().toString(); // 🆕 Auto ID if missing
        }
        const validationError = validateJobFormat(job);
        if (validationError) {
          setError(`❌ Invalid format: ${validationError}`);
          return;
        }
      }

      for (let job of jobsToProcess) {
        if (editId) {
          // 🆕 Update existing
          const jobDoc = doc(db, "jobs", editId);
          await updateDoc(jobDoc, job);
        } else {
          // 🆕 Add new
          await addDoc(jobsRef, job);
        }
      }

      await fetchJobs();
      setInput("");
      setError("");
      setEditId(null); // Reset edit mode
      alert(editId ? "✅ Job updated successfully!" : "✅ Job added successfully!");
    } catch (e) {
      setError("❌ Invalid JSON. Please check the syntax.");
    }
  };

  // 🆕 Edit button handler
  const handleEdit = (job) => {
    setInput(JSON.stringify(job, null, 2));
    setEditId(job.docId);
    setShowModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑️ Delete job
  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const jobDoc = doc(db, "jobs", jobId);
      await deleteDoc(jobDoc);
      await fetchJobs();
      alert("🗑️ Job deleted successfully!");
    }
  };

  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleNextPage = () => {
    if (currentPage * jobsPerPage < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

      <hr style={{ margin: "20px 0" }} />

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
          <p><strong>ID:</strong> {job.id}</p>
          <p><strong>Location:</strong> {job.details.workLocation}</p>
          <p><strong>Date:</strong> {job.date}</p>
          <p><strong>Overview:</strong> {job.details.overview}</p>
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => handleEdit(job)}
              style={{
                marginRight: "10px",
                padding: "6px 14px",
                background: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(job.docId)}
              style={{
                padding: "6px 14px",
                background: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}

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
    </div>
  );
}
