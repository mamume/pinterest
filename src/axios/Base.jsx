import axios from 'axios';

const baseUrl = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosInstance