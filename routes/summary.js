const express = require('express');
const router = express.Router();
const fetchTranscriptMiddleware = require('../middlewares/Transcript.js');
const cleanData = require('../middlewares/cleanData.js');




// Define the home page route
router.get('/', fetchTranscriptMiddleware, cleanData, (req, res) => {
  try {
    const transcript = req.transcript;
    const transcriptText = transcript.text;
    res.json({transcriptText});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the transcript' });
  }
});

module.exports = router;
