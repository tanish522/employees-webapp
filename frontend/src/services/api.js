import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const fetchEmployees = (page = 1, limit = 10) => API.get(`/employees?page=${page}&limit=${limit}`);

export const getEmployeeById = (id) => API.get(`/employees/${id}`);

export const addEmployee = (data) => API.post('/employees', data);

export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);

export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const getDepartments = () => API.get(`/departments`);

export const getStatistics = () => API.get(`/statistics`);

export default API;
