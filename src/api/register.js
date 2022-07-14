/**
 * Mocking client-server processing
 */

 import axios from 'axios';

 export default {
    register (data) {
        let url = 'api/register'

        return new Promise((resolve, reject) => {
            axios
            .post(url, data)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        })
    }
 }