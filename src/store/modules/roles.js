import Role from '../../store/models/Role'

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {}

// actions
const actions = {
    getAllRoles({commit}){
        Role.api().get('/api/roles')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}