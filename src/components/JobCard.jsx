import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h2 className="font-semibold text-lg">{job.title}</h2>
      <p className="text-sm">{job.company_name}</p>
      <p className="text-sm">{job.location}</p>

      <Link
        to={`/apply/${job.id}`}
        className="text-blue-600 text-sm mt-2 inline-block"
      >
        Apply
      </Link>
    </div>
  );
}
