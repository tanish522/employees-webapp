const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/employees?page=1&limit=10
router.get('/', (req, res) => {
  db.query(
    `
    SELECT e.id, e.name, e.email, e.salary, e.dob, e.phone, e.photo, e.status, d.name AS department
    FROM employee e
    JOIN department d ON e.department_id = d.id
    ORDER BY e.id DESC
    `,
    (err, rows) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ data: rows });
    }
  );
});

// POST /api/employees
router.post('/', (req, res) => {
  const { department_id, name, dob, phone, photo, email, salary, status } = req.body;

  db.query(
    `
    INSERT INTO employee (department_id, name, dob, phone, photo, email, salary, status, created, modified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
    [department_id, name, dob, phone, photo, email, salary, status ?? 1],
    (err, result) => {
      if (err) {
        console.error('Error adding employee:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
    }
  );
});

module.exports = router;