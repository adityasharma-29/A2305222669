const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlcontroller');

// Define routes
router.post('/shorten', createShortUrl);
router.get('/:shortId', redirectToOriginalUrl);

module.exports = router;
