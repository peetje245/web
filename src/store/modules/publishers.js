import store from '..';
import api from '../../api/publishers'
import Publisher from '../models/Publisher';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllPublishers({commit}){
        api.getPublishers()
            .then((response) => { 
                Publisher.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addPublisher ({commit}, data) {
        api.add(data)
            .then((response) => {
                Publisher.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updatePublisher ({commit}, data) {
        api.update(data)
            .then((response) => {
                Publisher.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyPublisher({commit}, id){
        api.destroy(id)
            .then((response) => {
                Publisher.delete(id)
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