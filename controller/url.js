const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortID = shortid.generate(); // ✅ correct usage
    await URL.create({
        shortUrl: shortID,
        longUrl: body.url,
        visithistory: []
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;
    const urlData = await URL.findOne({ shortUrl: shortID });

    if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({
        totalClicks: urlData.visithistory ? urlData.visithistory.length : 0,
        analytics: urlData.visithistory || []
    });
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics
};
