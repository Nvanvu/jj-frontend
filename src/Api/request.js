import axios from "axios";

const ins = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

ins.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');

    if (!token) return config;

    config.headers['authToken'] = `JoinJapan ${token}`
    return config;
});

ins.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    return Promise.reject(error);
});

export default ins;