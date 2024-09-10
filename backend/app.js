const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/profile-post', (req, res) => {
  const profileData = req.body;
  console.log('Received data:', profileData);
  res.status(200).json({ message: 'Data received and logged' });
});

app.post('/focus-post', (req, res) => {
  const focusData = req.body;
  console.log('Received data:', focusData);
  res.status(200).json({ message: 'Data received and logged' });
});

app.post('/voice-post', (req, res) => {
  const voiceData = req.body;
  console.log('Received data:', voiceData);
  res.status(200).json({ message: 'Data received and logged' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
