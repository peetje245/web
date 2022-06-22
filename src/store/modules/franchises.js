import store from '..';
import api from '../../api/franchises'
import Franchise from '../models/Franchise';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllFranchises({commit}){
        api.getFranchises()
            .then((response) => { 
                Franchise.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addFranchise ({commit}, data) {
        api.add(data)
            .then((response) => {
                Franchise.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updateFranchise ({commit}, data) {
        api.update(data)
            .then((response) => {
                Franchise.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyFranchise({commit}, id){
        api.destroy(id)
            .then((response) => {
                Franchise.delete(id)
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