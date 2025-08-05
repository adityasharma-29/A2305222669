const validUrl = require("valid-url");

const validateUrl = (req, res, next) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  next(); // continue to the route handler
};

module.exports = validateUrl;
