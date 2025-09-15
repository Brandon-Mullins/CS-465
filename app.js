const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// ----- VIEW ENGINE (HBS) -----
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register partials (header, footer, etc.)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// ----- STATIC ASSETS -----
app.use(express.static(path.join(__dirname, 'public')));

// ----- ROUTES -----
const routes = require('./app_server/routes/index');
app.use('/', routes);

// ----- HEALTH CHECK (still works) -----
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Travlr server with HBS running at http://localhost:${PORT}`);
});
