// app_api/controllers/trips.js
const Trip = require('../models/trip');

// GET /api/trips
const tripsList = async (_req, res) => {
  try {
    const trips = await Trip.find().sort({ startDate: 1 }).lean();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('tripsList error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/trips/:tripId
const tripsReadOne = async (req, res) => {
  const { tripId } = req.params;
  if (!tripId) return res.status(400).json({ message: 'tripId is required' });

  try {
    const trip = await Trip.findById(tripId).lean();
    if (!trip) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(trip);
  } catch (err) {
    console.error('tripsReadOne error:', err);
    return res.status(400).json({ message: 'Bad id' });
  }
};

module.exports = { tripsList, tripsReadOne };
