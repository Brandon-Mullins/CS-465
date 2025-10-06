// ----- ENV & DB -----
require('dotenv').config();
require('./app_api/models/db'); // <-- moved to app_api

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies for API routes
app.use(express.json());

// ----- VIEW ENGINE (HBS) -----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// ----- STATIC ASSETS -----
app.use(express.static(path.join(__dirname, 'public')));

// ----- API ROUTES (now under /api) -----
app.use('/api', require('./app_api/routes'));

// ----- SITE ROUTES (HBS) -----
const routes = require('./app_server/routes/index');
app.use('/', routes);

// ----- HEALTH CHECK -----
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Travlr server with HBS running at http://localhost:${PORT}`);
});
