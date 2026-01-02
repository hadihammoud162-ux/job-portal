import { useEffect, useState } from "react";
import API from "../api/api";

export default function Jobs() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Load user ONCE when page loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);


  
  // ✅ Fetch jobs for students
  useEffect(() => {
    if (user?.role === "student") {
      API.get("/jobs")
        .then((res) => setJobs(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // ✅ Company submits job
  const submitJob = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", { title, description });
      setMessage("Job posted successfully ✅");
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };
const applyForJob = async (jobId) => {
  try {
    await API.post(`/applications/apply/${jobId}`);
    alert("Applied successfully ✅");
  } catch (err) {
    alert(err.response?.data?.message || "Apply failed");
  }
};

  // 🟥 Not logged in
  if (!user) {
    return <p className="p-6">Please login</p>;
  }

  // 🟦 COMPANY VIEW
  if (user.role === "company") {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

        {message && <p className="mb-3 text-green-600">{message}</p>}

        <form onSubmit={submitJob}>
          <input
            className="border w-full p-2 mb-3"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border w-full p-2 mb-3"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="bg-blue-600 text-white w-full p-2">
            Publish Job
          </button>
        </form>
      </div>
    );
  }

  // 🟩 STUDENT VIEW
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>

      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded mb-3">
          <h2 className="font-semibold text-lg">{job.title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            Company: {job.company_name}
          </p>
          <p className="mb-2">{job.description}</p>

          <button
  onClick={() => applyForJob(job.id)}
  className="bg-green-600 text-white px-3 py-1 rounded"
>
  Apply
</button>

        </div>
      ))}
    </div>
  );
}
