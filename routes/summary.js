const express = require('express');
const router = express.Router();
const fetchTranscriptMiddleware = require('../middlewares/Transcript.js');
const cleanData = require('../middlewares/cleanData.js');
const splitDocument = require('../services/TextSplitter.js');
const supabaseController = require('../controllers/embeddingsSupabase.js');
const openaiServices = require('../services/openaiServices.js');




// Define the home page route
router.get('/', fetchTranscriptMiddleware, cleanData, async (req, res) => {

  try {

    const transcript = req.transcript;
    const transcriptText = transcript.text;
    const splittedText = await splitDocument(transcriptText)
    console.log(splittedText.length)
    const embeddedText = await openaiServices.textEmbeddings(splittedText)
    console.log(embeddedText.length)
    await supabaseController.insertEmbeddings(embeddedText)

    res.status(200).json({
       message: "Success", 
      });

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the converting' });
  }
});

module.exports = router;


