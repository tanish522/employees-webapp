const {
    fetchEmployees,
    fetchEmployeeCount,
    insertEmployee,
    updateEmployeeById,
    deleteEmployeeById
} = require('../models/employee');

const getEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [data, total] = await Promise.all([
            fetchEmployees(limit, offset),
            fetchEmployeeCount()
        ]);

        res.json({
            data,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addEmployees = async (req, res) => {
    try {
        const id = await insertEmployee(req.body);
        res.status(201).json({ message: 'Employee added successfully', id });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateEmployee = async (req, res) => {
    try {
        await updateEmployeeById(req.params.id, req.body);
        res.json({ message: 'Employee updated successfully' });
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const affectedRows = await deleteEmployeeById(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getEmployees,
    addEmployees,
    updateEmployee,
    deleteEmployee,
};
