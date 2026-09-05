const Report = require("../models/Report");

// @desc Create new report
// @route POST /api/reports
const createReport = async (req, res) => {
  try {
    const { title, category, description, address, lat, lng } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const report = await Report.create({
      title,
      category,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      location: { address, lat, lng },
      reportedBy: req.user.id,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get logged-in citizen's own reports
// @route GET /api/reports/my-reports
const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all reports (Authority dashboard)
// @route GET /api/reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update report status (Authority only)
// @route PUT /api/reports/:id/status
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a report (owner only)
// @route DELETE /api/reports/:id
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    if (report.reportedBy.toString() !== req.user.id && req.user.role !== "authority") {
      return res.status(403).json({ message: "Not authorized" });
    }
    await report.deleteOne();
    res.json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReport,
  getMyReports,
  getAllReports,
  updateReportStatus,
  deleteReport,
};
