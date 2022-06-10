import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACK_HOST

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosInstance