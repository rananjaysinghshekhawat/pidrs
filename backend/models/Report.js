const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Pothole", "Streetlight", "Water Leak", "Damaged Footpath", "Open Drain", "Other"],
      required: true,
    },
    description: { type: String, required: true },
    imageUrl: { type: String },
    location: {
      address: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
