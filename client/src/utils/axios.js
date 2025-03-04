import axios from 'axios';

const baseURL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://your-production-url.com/api';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            console.error('Unauthorized access - redirecting to login');
            sessionStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios;
