/**
 * Mocking client-server processing
 */

 import axios from 'axios';

 export default {
    register (email, password, name, password_confirmation) {
        let url = 'api/register'

        let data = {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            name: name,
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