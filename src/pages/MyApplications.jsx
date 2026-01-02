import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/applications/my").then(res => setApps(res.data));
  }, []);

  return (
    <div className="p-6">
      {apps.map(a => (
        <div key={a.id} className="border p-3 mb-2">
          <h2>{a.title}</h2>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}
