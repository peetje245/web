/**
 * Mocking client-server processing
 */

import axios from 'axios';

const articles = [
    { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
    { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
    { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
]

export default {
    getArticles () {
        console.log('api', articles)

        let info = null;
        let url = 'articles'

        // let test = `${Config.get('API_URL')}${url}`;

        axios
        .get('api/articles')
        .then((response) => {
            console.log('response', response);

            info = response
        })
        .catch((error) => {
            console.log(error)
        })

        return info;
    },
}