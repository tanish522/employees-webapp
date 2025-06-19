const db = require('../db');

const getHighestSalariesByDepartment = () => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT d.name AS department, MAX(e.salary) AS highest_salary
            FROM employee e
            JOIN department d ON e.department_id = d.id
            GROUP BY d.name
        `, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getSalaryRangeCounts = async () => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT
                SUM(IF(salary BETWEEN 0 AND 50000, 1, 0)) AS '0-50000',
                SUM(IF(salary BETWEEN 50001 AND 100000, 1, 0)) AS '50001-100000',
                SUM(IF(salary > 100000, 1, 0)) AS '100000+'
            FROM employee
        `, (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const getYoungestEmployeesPerDepartment = () => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT d.name AS department, e.name AS employee_name, TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) AS age
            FROM employee e
            JOIN department d ON e.department_id = d.id
            WHERE (e.dob, e.department_id) IN (
              SELECT MIN(dob), department_id
              FROM employee
              GROUP BY department_id
            )
        `, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = {
    getHighestSalariesByDepartment,
    getSalaryRangeCounts,
    getYoungestEmployeesPerDepartment
};