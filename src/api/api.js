import axios from 'axios';


//该文件用来与接口交互
let base = '';

export const requestLogin = params => { return axios.post(`/user/login`, params).then(res => res.data); };

export const requestRegister = params => { return axios.post(`user/register`, params).then(res => res.data); };