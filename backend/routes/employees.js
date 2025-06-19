const express = require('express');
const router = express.Router();
const db = require('../db');
const validateEmployee = require('../middlewares/validateEmployee');
const { getEmployees, getEmployeeById, addEmployees, updateEmployee, deleteEmployee } = require('../controllers/employees');

router.get('/', getEmployees);

router.get('/:id', getEmployeeById);

router.post('/', validateEmployee, addEmployees);

router.put('/:id', validateEmployee, updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;