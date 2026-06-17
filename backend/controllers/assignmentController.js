const Assignment = require("../models/Assignment");

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file received",
      });
    }

    const { title, description } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
    });

    res.status(201).json({
      message: "Assignment uploaded successfully",
      assignment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
