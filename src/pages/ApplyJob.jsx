import { useParams } from "react-router-dom";
import API from "../api/api";

export default function ApplyJob() {
  const { jobId } = useParams();

  const apply = async () => {
    await API.post(`/applications/apply/${jobId}`, { resume: "resume.pdf" });
    alert("Applied successfully");
  };

  return (
    <div className="p-6">
      <button onClick={apply} className="bg-green-600 text-white p-2">
        Apply Now
      </button>
    </div>
  );
}
