import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../services/api';
import { Table, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);


  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetchEmployees(page);
      setEmployees(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadEmployees();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination>
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page <= 1} />
        {items}
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page >= totalPages} />
      </Pagination>
    );
  };

  return (
    <Container>
      <h2 className="mt-4">Employee List</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Status</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center">Loading...</td>
            </tr>
          ) : employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.dob ? emp.dob.split('T')[0] : ''}</td>
                <td>
                  <span className={`badge ${emp.status ? 'bg-success' : 'bg-secondary'}`}>
                    {emp.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{emp.salary}</td>
                <td>{emp.department}</td>
                <td>
                  {emp.photo ? (
                    <a href={emp.photo} target="_blank" rel="noopener noreferrer">
                      <img src={emp.photo} alt="emp" width="40" height="40" style={{ borderRadius: '50%' }} />
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => navigate(`/edit/${emp.id}`)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>

      </Table>

      <Row className="justify-content-center">
        <Col md="auto">
          {renderPagination()}
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeList;
