const express = require('express');
const router = express.Router();

const employeeRoutes = require('./employees');
const statisticsRoutes = require('./statistics');
const departmentRoutes = require('./departments')

router.use('/employees', employeeRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/departments', departmentRoutes);

module.exports = router;