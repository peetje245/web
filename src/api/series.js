/**
 * Mocking client-server processing
 */

import axios from 'axios';

export default {
    getSeries () {
        let url = 'api/series'

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
        let url = 'api/serie'

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
        let url = 'api/serie/' + data.id;

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
        let url = 'api/serie/' + id;

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