import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      setMsg("Login successful!");
      console.log("JWT Token:", res.data.token);
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" name="email" onChange={handleChange} />
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
