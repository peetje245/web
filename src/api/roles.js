/**
 * Mocking client-server processing
 */

 import axios from 'axios';

 export default {
    all () {
        let url = 'api/roles'

        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
 }