import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ReportForm = () => {
  const [form, setForm] = useState({ title: "", category: "Pothole", description: "", address: "" });
  const [image, setImage] = useState(null);
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError("Couldn't fetch your location — type the address manually instead.")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("lat", coords.lat);
      formData.append("lng", coords.lng);
      if (image) formData.append("image", image);

      await api.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Report filed. Redirecting to My Reports…");
      setTimeout(() => navigate("/my-reports"), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-14 px-6">
      <p className="text-xs text-ink/50 mb-2">Work order · New</p>
      <h2 className="font-display font-700 text-3xl text-ink mb-6">Report an issue</h2>

      <div className="ticket p-6">
        {error && <p className="text-signal text-sm mb-4 border-l-2 border-signal pl-3">{error}</p>}
        {success && <p className="text-civic text-sm mb-4 border-l-2 border-civic pl-3">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Title</span>
            <input
              name="title" placeholder="Deep pothole on MG Road"
              value={form.title} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring" required
            />
          </label>

          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Category</span>
            <select
              name="category" value={form.category} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring"
            >
              <option>Pothole</option>
              <option>Streetlight</option>
              <option>Water Leak</option>
              <option>Damaged Footpath</option>
              <option>Open Drain</option>
              <option>Other</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Description</span>
            <textarea
              name="description" placeholder="What's wrong, and how bad is it?"
              value={form.description} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring" rows="4" required
            />
          </label>

          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Address / landmark</span>
            <input
              name="address" value={form.address} onChange={handleChange}
              className="w-full border border-ink/20 rounded-sm px-3 py-2 bg-white focus-ring"
            />
          </label>

          <button
            type="button" onClick={getLocation}
            className="text-sm text-steel text-left hover:underline w-fit"
          >
            Use my current location {coords.lat && "— captured"}
          </button>

          <label className="text-sm">
            <span className="block text-ink/60 mb-1">Photo proof</span>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="text-sm" />
          </label>

          <button className="bg-asphalt text-paper rounded-sm py-2.5 font-medium hover:bg-ink/80 focus-ring mt-2">
            Submit report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
