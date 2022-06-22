import store from '..';
import api from '../../api/platforms'
import Platform from '../models/Platform';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllPlatforms({commit}){
        api.getPlatforms()
            .then((response) => { 
                Platform.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addPlatform ({commit}, data) {
        api.add(data)
            .then((response) => {
                Platform.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updatePlatform ({commit}, data) {
        api.update(data)
            .then((response) => {
                Platform.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyPlatform({commit}, id){
        api.destroy(id)
            .then((response) => {
                Platform.delete(id)
            })
            .catch((err) => {
                console.log('err', err)
            })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}