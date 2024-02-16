const { YoutubeTranscript } = require('youtube-transcript');

const fetchTranscriptMiddleware = async (req, res, next) => {
    try {
      const videoUrl = req.query.videoUrl; // Access query parameter
  
      if (!videoUrl) {
        return res.status(400).json({ error: 'Missing videoUrl parameter' });
      }
  
      // Fetch transcript for the provided video URL
      const Transcript = await YoutubeTranscript.fetchTranscript(videoUrl)
  

    




      req.transcript = Transcript; // Attach transcript summary to request object
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the transcript' });
    }
  };

module.exports = fetchTranscriptMiddleware;
