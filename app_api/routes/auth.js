const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auth');

router.get('/create-admin', ctrl.createAdmin);
router.post('/login', ctrl.login);

module.exports = router;
