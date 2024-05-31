import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '@/entities/user';

export const $api = axios.create({
    baseURL: 'http://localhost:8000',
});

$api.interceptors.request.use((req) => {
    req.headers.set('Authorization', localStorage.getItem(LOCAL_STORAGE_TOKEN));
    return req;
});
