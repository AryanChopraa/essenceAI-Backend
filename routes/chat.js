const express = require('express');
const router = express.Router();
const fetchTranscriptMiddleware = require('../middlewares/Transcript.js');
const cleanData = require('../middlewares/cleanData.js');
const splitDocument = require('../services/TextSplitter.js');
const supabaseController = require('../controllers/embeddingsSupabase.js');
const openaiServices = require('../services/openaiServices.js');




router.post('/', async (req, res) => {
    try{
        query = req.body.messages[req.body.messages.length-1].content
        const queryVector = await openaiServices.textEmbeddings(query)
        const simmilarEmbeddings = await supabaseController.getEmbeddings(queryVector)
        const openAIresponse = await openaiServices.chat(req.body.messages,simmilarEmbeddings)
        res.json({openAIresponse}).status(200)
    }
    catch(error){
        console.log(error)
        res.send(error).status(500)
    }

  
    
})





module.exports = router;

