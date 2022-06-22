import store from '..';
import api from '../../api/genres'
import Genre from '../models/Genre';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllGenres({commit}){
        api.getGenres()
            .then((response) => { 
                Genre.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addGenre ({commit}, data) {
        api.add(data)
            .then((response) => {
                Genre.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updateGenre ({commit}, data) {
        api.update(data)
            .then((response) => {
                Genre.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyGenre({commit}, id){
        api.destroy(id)
            .then((response) => {
                Genre.delete(id)
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