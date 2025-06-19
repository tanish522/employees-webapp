const db = require('../db');

const fetchDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department ORDER BY name ASC', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = { fetchDepartments };