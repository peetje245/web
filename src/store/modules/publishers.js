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
        Publisher.api().get('/api/publishers')
    },
    addPublisher ({commit}, data) {
        Publisher.api().post('/api/publisher', data)
    },
    updatePublisher ({commit}, data) {
        Publisher.api().post('/api/publisher/' + data.id, data)
    },
    destroyPublisher({commit}, id){
        Publisher.api().delete('/api/publisher/' + id, {
            delete: id
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