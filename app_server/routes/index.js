const express = require('express');
const router = express.Router();

const traveler = require('../controllers/traveler');   // home page controller (from Module 2)
const travelCtrl = require('../controllers/travel');   // new controller that reads trips.json

// homepage
router.get('/', traveler.home);

// travel list (now loads data from app_server/data/trips.json)
router.get('/travel', travelCtrl.travelList);

module.exports = router;
