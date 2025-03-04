import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.headers['Content-Type'] = 'application/json';
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
            toast.error('Unauthorized event access. Please enter your access code.');
            console.error('Unauthorized access - redirecting to login...');
            sessionStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios;
