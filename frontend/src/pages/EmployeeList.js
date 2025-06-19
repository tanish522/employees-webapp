import React, { useEffect, useState } from 'react';
import { fetchEmployees, deleteEmployee } from '../services/api';
import { Table, Button, Container, Row, Col, Pagination } from 'react-bootstrap';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadEmployees = async () => {
    try {
      const res = await fetchEmployees(page);
      setEmployees(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
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
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.salary}</td>
                <td>{emp.department}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>{' '}
                  {/* Edit button can be added later */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No employees found.</td>
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
