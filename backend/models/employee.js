const db = require('../db');

const fetchEmployees = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT e.id, e.name, e.email, e.salary, e.dob, e.phone, e.photo, e.status, d.name AS department
             FROM employee e
             JOIN department d ON e.department_id = d.id
             ORDER BY e.id DESC
             LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, rows) => err ? reject(err) : resolve(rows)
        );
    });
};

const fetchEmployeeCount = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS total FROM employee`, (err, rows) =>
            err ? reject(err) : resolve(rows[0].total)
        );
    });
};

const insertEmployee = (data) => {
    const { department_id, name, dob, phone, photo, email, salary, status } = data;
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO employee (department_id, name, dob, phone, photo, email, salary, status, created, modified)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [department_id, name, dob, phone, photo, email, salary, status ?? 1],
            (err, result) => err ? reject(err) : resolve(result.insertId)
        );
    });
};

const updateEmployeeById = (id, data) => {
    const { department_id, name, dob, phone, photo, email, salary, status } = data;
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE employee
             SET department_id = ?, name = ?, dob = ?, phone = ?, photo = ?, email = ?, salary = ?, status = ?, modified = NOW()
             WHERE id = ?`,
            [department_id, name, dob, phone, photo, email, salary, status ?? 1, id],
            (err) => err ? reject(err) : resolve()
        );
    });
};

const deleteEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM employee WHERE id = ?`, [id], (err, result) =>
            err ? reject(err) : resolve(result.affectedRows)
        );
    });
};

module.exports = {
    fetchEmployees,
    fetchEmployeeCount,
    insertEmployee,
    updateEmployeeById,
    deleteEmployeeById,
};
