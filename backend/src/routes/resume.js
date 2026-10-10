const express = require("express");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");

const router = express.Router();

// Store uploaded files temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// POST /api/resume/upload
router.post("/upload", upload.single("resume"), async (req, res) => {
  let parser;

  try {
    // Check whether a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Check file type
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are supported.",
      });
    }

    // Create PDF parser
    parser = new PDFParse({
      data: req.file.buffer,
    });

    // Extract text
    const result = await parser.getText();

    const resumeText = result.text.trim();

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF.",
      });
    }

    // Return extracted resume information
    res.status(200).json({
      success: true,
      message: "Resume uploaded and parsed successfully.",
      fileName: req.file.originalname,
      fileSize: req.file.size,
      textLength: resumeText.length,
      resumeText,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process the resume.",
      error: error.message,
    });
  } finally {
    // Clean up the parser
    if (parser) {
      await parser.destroy();
    }
  }
});

module.exports = router;