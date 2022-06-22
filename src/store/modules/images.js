import store from '..';
import api from '../../api/images'
import Image from '../models/Image';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllImages({commit}){
        api.getImages()
            .then((response) => { 
                Image.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}