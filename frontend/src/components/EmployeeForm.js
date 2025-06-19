import React from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

const EmployeeForm = ({ form, departments, onChange, onSubmit, loading }) => {
    return (
        <Form onSubmit={onSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                            name="department_id"
                            value={form.department_id}
                            onChange={onChange}
                            required
                        >
                            <option value="">-- Select Department --</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            name="phone"
                            type="number"
                            value={form.phone}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Photo URL</Form.Label>
                        <Form.Control
                            name="photo"
                            value={form.photo}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            name="salary"
                            value={form.salary}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={form.status}
                            onChange={onChange}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : 'Save'}
            </Button>
        </Form>
    );
};

export default EmployeeForm;
