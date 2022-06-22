import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.defaults.baseURL= "http://localhost:8080/";
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Accept'] ='application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? 'Bearer ${}':'';
    return config;
});