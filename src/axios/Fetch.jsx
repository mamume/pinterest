import axios from 'axios';

const baseUrl = 'http://localhost:8000'
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

axiosFetchInstance.interceptors.response.use(
    (response) => {
        return response
    },

    async function (error) {
        const originalRequest = error.config;

        if (typeof error.response == 'undefined') {
            alert(
                `A server/network error 
                looks like cors may be the problem
                sorry about this, we will get it fixed shortly`
            );
            return Promise.reject(error);
        };

        if (
            error.response.status === 401 &&
            originalRequest.url === baseUrl + '/account/auth/refresh'
        ) {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'unauthorized'
        ) {
            const refresh_token = localStorage.getItem('pinterestRefreshToken');
            if (refresh_token) {
                return axiosFetchInstance
                    .post('/account/auth/refresh', { refresh: refresh_token })
                    .then((res) => {
                        localStorage.setItem('pinterestAccessToken', res.data.access_token);
                        localStorage.setItem('pinterestRefreshToken', res.data.refresh_token);

                        axiosFetchInstance.defaults.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                        originalRequest.defaults.headers['Authorization'] = `Bearer ${res.data.access_token}`;

                        return axiosFetchInstance(originalRequest);

                    }).catch((err) => {
                        // console.log(err)
                    })
            } else {
                // console.log('refresh token not available')
                window.location.href = '/'
            }
        }


    }
)

export default axiosFetchInstance