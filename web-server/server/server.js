const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8438;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('plz work');
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});