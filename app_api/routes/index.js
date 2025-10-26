const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const { requireAuth } = require('../middleware/requireAuth');

// Trips
router
  .route('/trips')
  .get(ctrlTrips.tripsList)                     // public GET
  .post(requireAuth, ctrlTrips.tripsCreate);    // protected

router
  .route('/trips/:tripId')
  .get(ctrlTrips.tripsReadOne)                 // public GET
  .put(requireAuth, ctrlTrips.tripsUpdateOne)  // protected
  .delete(requireAuth, ctrlTrips.tripsDeleteOne); // protected

module.exports = router;
