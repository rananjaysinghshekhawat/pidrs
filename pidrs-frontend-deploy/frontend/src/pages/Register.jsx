import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "citizen" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 px-6">
      <p className="text-xs text-ink/50 mb-2">New account</p>
      <h2 className="font-display font-700 text-3xl text-ink mb-6">Register</h2>

      <div className="ticket p-6">
        {error && (
          <p className="text-signal text-sm mb-4 border-l-2 border-signal pl-3">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Full name</span>
            <input
              name="name" value={form.name} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring" required
            />
          </label>
          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Email</span>
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring" required
            />
          </label>
          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Password</span>
            <input
              name="password" type="password" value={form.password} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring" required
            />
          </label>
          <label className="text-sm">
            <span className="block text-ink/60 mb-1">I am registering as</span>
            <select
              name="role" value={form.role} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring"
            >
              <option value="citizen">Citizen — I want to report issues</option>
              <option value="authority">Authority — I manage repairs</option>
            </select>
          </label>
          <button className="bg-asphalt text-paper rounded-sm py-2.5 font-medium hover:bg-ink/80 focus-ring mt-2">
            Create account
          </button>
        </form>
      </div>
      <p className="text-sm mt-4 text-ink/60">
        Already registered? <Link to="/login" className="text-steel underline">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
