import store from '..';
import api from '../../api/series'
import Serie from '../models/Serie';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllSeries({commit}){
        api.getSeries()
            .then((response) => { 
                Serie.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addSerie ({commit}, data) {
        api.add(data)
            .then((response) => {
                Serie.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updateSerie ({commit}, data) {
        api.update(data)
            .then((response) => {
                Serie.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroySerie({commit}, id){
        api.destroy(id)
            .then((response) => {
                Serie.delete(id)
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