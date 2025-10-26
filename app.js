require('dotenv').config();
require('./app_api/models/db');

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HBS - public site
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// API
app.use('/api/auth', require('./app_api/routes/auth'));
app.use('/api', require('./app_api/routes'));

// public site (HBS)
app.use('/', require('./app_server/routes/index'));

// health
app.get('/api/ping', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Travlr server at http://localhost:${PORT}`);
});


