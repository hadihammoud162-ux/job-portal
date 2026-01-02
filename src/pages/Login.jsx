import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
const navigate = useNavigate();

 const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
 navigate("/"); 


  } catch (err) {
    // ✅ FRIENDLY ALERT
    alert(err.response?.data?.message || "Login failed");
  }
};


    return (
        <form onSubmit={submit} className="max-w-sm mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <input className="border w-full p-2 mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="border w-full p-2 mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button className="bg-blue-600 text-white w-full p-2">Login</button>
        </form>
    );
}
