const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createDesignRequest,
  getDesignRequests,
  getDesignRequestById,
  updateDesignRequestStatus,
  deleteDesignRequest,
} = require("../controllers/designController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".pdf",
    ".ai",
    ".eps",
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Allowed: JPG, JPEG, PNG, WEBP, GIF, PDF, AI, EPS"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/", upload.single("design"), createDesignRequest);

router.get("/", getDesignRequests);

router.get("/:id", getDesignRequestById);

router.patch("/:id/status", updateDesignRequestStatus);

router.delete("/:id", deleteDesignRequest);

module.exports = router;
