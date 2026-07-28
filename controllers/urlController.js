const { nanoid } = require("nanoid");
const Url = require("../models/Url");

// Create Short URL
const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }

    const shortCode = nanoid(6);

    const url = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json({
      success: true,
      data: url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Redirect to Original URL
const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "Short URL not found",
      });
    }

    // Increase click count
    url.clicks += 1;
    await url.save();

    // Redirect user
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};