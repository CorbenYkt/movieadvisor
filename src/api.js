import axios from 'axios';

const api = axios.create({
    baseURL: 'https://corbenykt.ru:4444',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
