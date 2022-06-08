import axios from 'axios';

const baseUrl = 'https://pinterest-mamume.herokuapp.com'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosInstance