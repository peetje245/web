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
    add(data){
        let url = 'api/game'

        let formData = new FormData();
        const imagefile = data.image;
        
        formData.append("image", imagefile);
        formData.append("data", JSON.stringify(data.data));

        return new Promise((resolve, reject) => {
            axios
                .post(url, formData, {
                    header : {
                        'Content-Type' : 'multipart/form-data'
                      }
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(error)
                    console.log('response', error.response)
                })
        })
    },
    update(data){
        let url = 'api/game/' + data.id;

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
        let url = 'api/game/' + id;

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