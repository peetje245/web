import store from '..';
import api from '../../api/roles'
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
        api.all()
            .then((data) => { 
                Role.insert({data: data})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}