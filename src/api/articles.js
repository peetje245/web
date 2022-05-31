/**
 * Mocking client-server processing
 */

import axios from 'axios';

export default {
    getArticles () {
        let url = 'api/articles'

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