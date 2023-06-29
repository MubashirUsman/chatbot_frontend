const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Handle POST request to /api/message
app.post('/api/message', (req, res) => {
  const message = req.body.message;
  
  // Process the message or perform any necessary actions
  
  // Send a response back to the frontend
  res.json({ success: true, message: 'Message received successfully' });
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
