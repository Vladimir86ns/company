import axios from 'axios';

export default axios.create({
        baseURL: 'http://localhost:8000/api/',
        timeout: 2000,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    });