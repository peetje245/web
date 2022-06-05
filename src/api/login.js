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
            axios
            .post(url, data)
            .then((response) => {
                console.log('response', response.data)
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        })
    }
 }