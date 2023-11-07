import axios from 'axios';

const BASE_URL = 'http://localhost:80/finance-flow/back/routes/';
const API = axios.create({
    baseURL: BASE_URL,
});

export {BASE_URL, API};