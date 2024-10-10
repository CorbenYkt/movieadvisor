import axios from 'axios';

const api = axios.create({
    baseURL: 'https://corbenykt.ru:4444',
});

export default api;
