const express = require('express');
const router = express.Router();
const fetchTranscriptMiddleware = require('../middlewares/Transcript.js');
const cleanData = require('../middlewares/cleanData.js');
const splitDocument = require('../services/TextSplitter.js');
const textEmbeddings = require('../services/Textembeddings.js');
const supabaseController = require('../controllers/embeddingsSupabase.js');
const openaiServices = require('../services/openaiServices.js');




// Define the home page route
router.get('/', fetchTranscriptMiddleware, cleanData, async (req, res) => {
  const  query = "what is this video about"

  try {

    const transcript = req.transcript;
    const transcriptText = transcript.text;
    // console.log(transcriptText)
    // const splittedText = await splitDocument(transcriptText)
    // const embeddedText = await openaiServices.textEmbeddings(splittedText)

    // await supabaseController.insertEmbeddings(embeddedText)

    // const queryVector = await openaiServices.textEmbeddings(query)
    


    // const simmilarEmbeddings = await supabaseController.getEmbeddings(queryVector)
    // console.log(simmilarEmbeddings)
   

    // const openAIresponse = await openaiServices.chat(query,simmilarEmbeddings)

    // const                                        

    



  

    // res.json({openAIresponse});
    res.send("ok")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the converting' });
  }
});

module.exports = router;


