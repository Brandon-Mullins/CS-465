const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route (optional)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simple test endpoint
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Travlr server running at http://localhost:${PORT}`);
});
