// ---- Trip controller (standardized names) ----
const mongoose = require('mongoose');
const Trip = require('../models/trip'); // adjust path/name if your model differs

// GET /api/trips
exports.tripsList = async (_req, res) => {
  try {
    const trips = await Trip.find().sort({ startDate: 1 }).lean();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('tripsList error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/trips/:tripId
exports.tripsReadOne = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(trip);
  } catch (err) {
    console.error('tripsReadOne error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/trips
exports.tripsCreate = async (req, res) => {
  try {
    const created = await Trip.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    console.error('tripsCreate error:', err);
    return res.status(400).json({ message: err.message });
  }
};

// PUT /api/trips/:tripId
exports.tripsUpdateOne = async (req, res) => {
  try {
    const updated = await Trip.findByIdAndUpdate(
      req.params.tripId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(updated);
  } catch (err) {
    console.error('tripsUpdateOne error:', err);
    return res.status(400).json({ message: err.message });
  }
};

// DELETE /api/trips/:tripId
exports.tripsDeleteOne = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.tripId);
    if (!deleted) return res.status(404).json({ message: 'Trip not found' });
    return res.status(204).send();
  } catch (err) {
    console.error('tripsDeleteOne error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
