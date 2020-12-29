import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const API = axios.create({
    baseURL: 'http://localhost:3001'
})

export const login = data => API.get(`/api/login?username=${data.username}&password=${data.password}`);
export const getImages = () => API.get(`/api/images`);
export const search = data => API.get(`/api/search?user_id=${data.userId}&content=${data.content}`);
export const register = data => API.get(`/api/register?username=${data.username}&password=${data.password}`);