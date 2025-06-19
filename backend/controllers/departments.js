const { fetchDepartments } = require('../models/departments');

const getDepartments = async (req, res) => {
    try {
        const departments = await fetchDepartments();
        res.json(departments);
    } catch (err) {
        console.error('Error fetching departments:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    getDepartments,
};
