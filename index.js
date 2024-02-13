// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const summary = require('./routes/summary');
var cors = require('cors')

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(cors())

app.use("/summary",summary);
 
app.get('/', (req, res) => {
    res.send('Hello, World!');
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
