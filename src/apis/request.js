import axios from 'axios'
import { BASE_URL } from '../constants'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 10
});

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

const credential = {
    token: '',
    getToken() {
        this.token = localStorage.getItem('token');
        if (this.token === '')
            return null;
        return this.token;
    }
}

axiosInstance.interceptors.request.use(config => {
    const token = credential.getToken();
    config.headers.Authorization = "Bearer " + token;
    return config;
}, err => {
    console.log(err)
})

// axiosInstance.interceptors.response.use(response => {
//   return response;
// }, err => {
//   return Promise.reject(err)
// })
export { credential }
export default axiosInstance;
