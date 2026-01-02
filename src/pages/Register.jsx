import { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      window.location.href = "/login";
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <input
        className="border w-full p-2 mb-2"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border w-full p-2 mb-2"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="border w-full p-2 mb-2"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="border w-full p-2 mb-4"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="">Select role</option>
        <option value="student">Student</option>
        <option value="company">Company</option>
      </select>

      <button className="bg-blue-600 text-white w-full p-2">
        Register
      </button>
    </form>
  );
}
