const express = require('express');
const router = express.Router();
const db = require('../db');
const { getStatistics } = require('../controllers/statastics');

router.get('/', getStatistics);

module.exports = router;