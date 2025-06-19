import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { addEmployee, getDepartments } from '../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    department_id: '',
    name: '',
    dob: '',
    phone: '',
    photo: '',
    email: '',
    salary: '',
    status: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getDepartments()
      .then((res) => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching statistics:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addEmployee(form);
      navigate('/');
    } catch (err) {
      console.error(err.response.data.error);
      setError(`Failed to add employee: ${err.response?.data?.error || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Add Employee</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <EmployeeForm
        form={form}
        departments={departments}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default AddEmployee;
