import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({ newPassword:"", confirmPassword:"" });
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if(form.newPassword !== form.confirmPassword){
      return setMsg("Passwords do not match");
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        newPassword: form.newPassword
      });
      setMsg(res.data.message);
      setSubmitted(true);
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {!submitted && (
        <form onSubmit={handleSubmit}>
          <input placeholder="New Password" name="newPassword" type="password" onChange={handleChange} />
          <input placeholder="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      )}
      <p>{msg}</p>
    </div>
  );
}
