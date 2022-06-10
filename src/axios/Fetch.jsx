import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACK_HOST
const axiosFetchInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('pinterestAccessToken')
            ? `Bearer ${localStorage.getItem('pinterestAccessToken')}`
            : null,
        'content-type': 'application/json',
        accept: 'application/json'
    }
});

export default axiosFetchInstance