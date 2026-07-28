const express = require("express");
const router = express.Router();

const {
  shortenUrl,
  redirectUrl,
} = require("../controllers/urlController");

// Create Short URL
router.post("/shorten", shortenUrl);

// Redirect to Original URL
router.get("/:shortCode", redirectUrl);

module.exports = router;