/**
 * Mocking client-server processing
 */

import axios from 'axios';

export default {
    getPublishers () {
        let url = 'api/publishers'

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
        let url = 'api/publisher'

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
        let url = 'api/publisher/' + data.id;

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
        let url = 'api/publisher/' + id;

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