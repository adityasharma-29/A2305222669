const Url = require("../models/url");
const generateShortId = require("../utils/generateShortId");

// Controller to create a shortened URL
const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  try {
    // Check if original URL already exists in DB (optional)
    let existing = await Url.findOne({ originalUrl });
    if (existing) {
      return res.status(200).json({
        shortUrl: `${process.env.BASE_URL}/${existing.shortId}`,
        originalUrl: existing.originalUrl,
      });
    }

    // Generate a new short ID
    const shortId = generateShortId();

    // Save to DB
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      originalUrl,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Controller to redirect based on short URL
const redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createShortUrl, redirectToOriginalUrl };
