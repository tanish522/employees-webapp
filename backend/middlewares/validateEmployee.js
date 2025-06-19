const validateEmployee = (req, res, next) => {
  const { department_id, name, dob, phone, email, salary } = req.body;

  if (!department_id || !name || !dob || !phone || !email || !salary) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (isNaN(phone) || Number(phone) <= 0) {
    return res.status(400).json({ error: 'Phone must be a positive number' });
  }
  if (isNaN(phone) || phone.length < 10) {
    return res.status(400).json({ error: 'Phone must have at least 10 digits' });
  }

  if (isNaN(salary) || Number(salary) <= 0) {
    return res.status(400).json({ error: 'Salary must be a positive number' });
  }

  next();
};

module.exports = validateEmployee;
