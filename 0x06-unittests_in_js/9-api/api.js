// 9-api/api.js
const express = require('express');
const app = express();
const port = 7865;

// Reuse root route if needed
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the payment system');
});

// ✅ New endpoint with numeric ID validation using regex
app.get('/cart/:id([0-9]+)', (req, res) => {
  const id = req.params.id;
  res.send(`Payment methods for cart ${id}`);
});

// Start server
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

module.exports = app;

