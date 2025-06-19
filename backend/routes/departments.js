const express = require('express');
const { getDepartments } = require('../controllers/departments');
const router = express.Router();

router.get('/', getDepartments)

module.exports = router;
