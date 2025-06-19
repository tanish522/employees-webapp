const express = require('express');
const router = express.Router();
const db = require('../db');
const { getEmployees, addEmployees, updateEmployee, deleteEmployee } = require('../controllers/employees');

router.get('/', getEmployees);

router.post('/', addEmployees);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;