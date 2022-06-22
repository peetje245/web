/**
 * Mocking client-server processing
 */

import axios from 'axios';

export default {
    getGenres () {
        let url = 'api/genres'

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
    add(data){
        let url = 'api/genre'

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
    },
    update(data){
        let url = 'api/genre/' + data.id;

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
    },
    destroy(id){
        let url = 'api/genre/' + id;

        return new Promise((resolve, reject) => {
            axios
                .delete(url)
                .then((response) => {
                    resolve()
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }
}