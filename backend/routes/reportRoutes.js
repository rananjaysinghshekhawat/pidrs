const express = require("express");
const router = express.Router();
const { protect, authorityOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createReport,
  getMyReports,
  getAllReports,
  updateReportStatus,
  deleteReport,
} = require("../controllers/reportController");

router.post("/", protect, upload.single("image"), createReport);
router.get("/my-reports", protect, getMyReports);
router.get("/", protect, authorityOnly, getAllReports);
router.put("/:id/status", protect, authorityOnly, updateReportStatus);
router.delete("/:id", protect, deleteReport);

module.exports = router;
