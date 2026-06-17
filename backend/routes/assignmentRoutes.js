const express = require("express");
const multer = require("multer");

const {
  uploadAssignment,
  getAssignments,
} = require("../controllers/assignmentController");

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Assignment
router.post(
  "/upload",
  upload.single("file"),
  (req, res, next) => {
    console.log("FILE RECEIVED:", req.file);
    next();
  },
  uploadAssignment
);

// Get Assignments
router.get("/", getAssignments);

module.exports = router;