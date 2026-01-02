import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function CompanyApplicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = async () => {
    const res = await API.get(`/applications/job/${jobId}`);
    setApplicants(res.data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (applicationId, status) => {
    await API.put(`/applications/${applicationId}/status`, { status });
    fetchApplicants(); // refresh list
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Applicants</h1>

      {applicants.length === 0 && (
        <p className="text-gray-500">No applications yet</p>
      )}

      {applicants.map(app => (
        <div
          key={app.id}
          className="border rounded p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">{app.name}</h2>
            <p className="text-sm text-gray-600">{app.email}</p>
            <p className="text-sm">Status: <b>{app.status}</b></p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => updateStatus(app.id, "accepted")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(app.id, "rejected")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
