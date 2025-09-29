const express = require('express');
const router = express.Router();
const Trip = require('../../models/trip'); // Mongoose model

// GET /api/trips -> return all trips as JSON
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ start: 1 }).lean();
    return res.json(trips);
  } catch (err) {
    console.error('GET /api/trips error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
