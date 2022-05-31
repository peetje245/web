/**
 * Mocking client-server processing
 */

 import axios from 'axios';

 export default {
    getGames () {
        let url = 'api/games'

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
    },
 }