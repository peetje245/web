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
        Developer.api().get('/api/developers')
    },
    addDeveloper ({commit}, data) {
        Developer.api().post('/api/developer', data)
    },
    updateDeveloper ({commit}, data) {
        Developer.api().post('/api/developer/' + data.id, data)
    },
    destroyDeveloper({commit}, id){
        Developer.api().delete('/api/developer/' + id, {
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