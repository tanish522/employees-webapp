import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDepartments, getEmployeeById, updateEmployee } from '../services/api';
import axios from 'axios';
import { Container, Alert } from 'react-bootstrap';
import EmployeeForm from '../components/EmployeeForm';

const EditEmployee = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, deptRes] = await Promise.all([
          getEmployeeById(id),
          getDepartments()
        ]);
        const empData = empRes.data;
        setForm({
          ...empData,
          dob: empData.dob ? empData.dob.split('T')[0] : '',
        });
        setDepartments(deptRes.data);
      } catch (err) {
        setError('Failed to load employee or departments');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateEmployee(id, form);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(`Failed to add employee: ${err.response?.data?.error || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <Container><p>Loading...</p></Container>;

  return (
    <Container>
      <h2>Edit Employee</h2>
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

export default EditEmployee;
