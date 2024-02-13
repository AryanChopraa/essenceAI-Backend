const cleanData = async (req, res, next) => {
    try {
        const summary = req.transcript;
        
        // Initialize variables for total duration and concatenated text
        let totalDuration = 0;
        let concatenatedText = '';

        // Iterate through each transcript object
        summary.forEach((item) => {
            // Concatenate the text of each transcript object
            concatenatedText += item.text + ' ';

            // Sum up the durations of each transcript object
            totalDuration += item.duration;
        });

        // Convert total duration from milliseconds to minutes
        const totalDurationMinutes = totalDuration / (1000 * 60);

        // Create a single object with the concatenated text and total duration in minutes
        const singleObject = {
            text: concatenatedText.trim(), // Remove trailing space
            durationMinutes: totalDurationMinutes.toFixed(2)/2 // Convert to 2 decimal places
        };

        // Attach the single object to the request object
        req.transcript = singleObject;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while cleaning the data' });
    }
};

module.exports = cleanData;
