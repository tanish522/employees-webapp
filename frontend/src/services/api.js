import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // update if backend is deployed elsewhere
});

export const fetchEmployees = () => API.get(`/employees`);

export const addEmployee = (data) => API.post('/employees', data);


export default API;
