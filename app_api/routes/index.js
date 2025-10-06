// app_api/routes/index.js
const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

// /api/trips      -> list all
router.get('/trips', ctrlTrips.tripsList);

// /api/trips/:id  -> get one
router.get('/trips/:tripId', ctrlTrips.tripsReadOne);

module.exports = router;
