const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/traveler');

// homepage
router.get('/', ctrl.home);

// travel list
router.get('/travel', ctrl.travel);

module.exports = router;
