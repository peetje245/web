import store from '..';
import api from '../../api/developers'
import Developer from '../models/Developer';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllDevelopers({commit}){
        api.getDevelopers()
            .then((response) => { 
                Developer.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addDeveloper ({commit}, data) {
        api.add(data)
            .then((response) => {
                Developer.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updateDeveloper ({commit}, data) {
        api.update(data)
            .then((response) => {
                Developer.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyDeveloper({commit}, id){
        api.destroy(id)
            .then((response) => {
                Developer.delete(id)
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