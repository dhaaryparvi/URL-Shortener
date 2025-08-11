const express = require('express');
const { handleGenerateShortURL , handleGetAnalytics  } = require('../controller/url');
const router = express.Router();

router.post('/', handleGenerateShortURL);
router.get('/analytics/:shortID', handleGetAnalytics);
module.exports = router;