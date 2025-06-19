import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table, Row, Col } from 'react-bootstrap';
import { getStatistics } from '../services/api';

const Statistics = () => {
  const [data, setData] = useState({
    highestSalary: [],
    salaryRanges: [],
    youngestEmployees: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching statistics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Statistics</h2>

      {/* Department-wise Highest Salary */}
      <Card className="mb-4">
        <Card.Header>Department-wise Highest Salary</Card.Header>
        <Card.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Department</th>
                <th>Highest Salary</th>
              </tr>
            </thead>
            <tbody>
              {data.highestSalary.map((item, index) => (
                <tr key={index}>
                  <td>{item.department}</td>
                  <td>{item.highest_salary}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Salary Range-wise Employee Count */}
      <Card className="mb-4">
        <Card.Header>Salary Range-wise Employee Count</Card.Header>
        <Card.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Salary Range</th>
                <th>Employee Count</th>
              </tr>
            </thead>
            <tbody>
              {data.salaryRanges.map((item, index) => (
                <tr key={index}>
                  <td>{item.salary_range}</td>
                  <td>{item.employee_count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Youngest Employee Per Department */}
      <Card>
        <Card.Header>Youngest Employee Per Department</Card.Header>
        <Card.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Department</th>
                <th>Employee Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.youngestEmployees.map((item, index) => (
                <tr key={index}>
                  <td>{item.department}</td>
                  <td>{item.employee_name}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Statistics;
