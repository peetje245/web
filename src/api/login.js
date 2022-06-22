/**
 * Mocking client-server processing
 */

 import axios from 'axios';

 export default {
    login (email, password) {
        let url = 'api/login'

        let data = {
            email: email,
            password: password,
            type: 'web'
        }

        return new Promise((resolve, reject) => {
            axios.get('api/sanctum/csrf-cookie').then(response => {
                axios
                .post(url, data)
                .then((response) => {
                    localStorage.setItem('auth_token', response.data.token);

                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            });
        })
    },
 }