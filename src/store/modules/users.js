import api from '../../api/login'
import apiRegister from '../../api/register'
import User from '../models/User';

const state = () => ({
    currentUser: []
})

// getters
const getters = {
    getCurrentUser: (state,) => {
        return state.currentUser;
    }
}

// mutations
const mutations = {
    setCurrentUser(state, user){
        state.currentUser = user
    },
}

// actions
const actions = {
    login({commit, dispatch}, data){
        api.login(data.email, data.password)
            .then((data) => { 
                dispatch('getUser')
                this.$router.push('/portal/dashboard')
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },

    getUser(){
        User.api().get('/api/user',
            {
                dataTransformer: ({ data, headers }) => {
                    commit('setCurrentUser', data.data)

                    return data.data
                }
            })
    },

    register({commit}, data){
        apiRegister.register(data)
            .then((data) => { 
                this.$router.push('/login')
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },

    getAllUsers(){
        User.api().get('/api/users',
            {
                dataTransformer: ({ data, headers }) => {
                    User.deleteAll();
                    return data.data
                }
            })
    },

    addUser ({commit}, data) {
        User.api().get(
            '/api/user',
            data,
            {
                dataTransformer: ({ data, headers }) => {
                    return data.data
                }
            })
    },

    updateUser ({commit}, data) {
        // todo error response toevoegen
        User.api().post('/api/user/' + data.id, data)
    },

    destroyUser({commit}, id){
        User.api().delete('/api/user/' + id, {
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