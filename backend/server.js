const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employees');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
