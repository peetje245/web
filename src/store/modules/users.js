import api from '../../api/login'
import apiRegister from '../../api/register'
import User from '../models/User';

const state = () => ({
    currentUser: [],
    token: null,
})

// getters
const getters = {
    token (state) {
        return state.currentUser.token;
    }
}

// mutations
const mutations = {
    setCurrentUser(state, user){
        state.currentUser = user
    },
    setToken(state, token){
        state.token = token
    }
}

// actions
const actions = {
    login({commit}, data){
        api.login(data.email, data.password)
            .then((data) => { 
                commit('setCurrentUser', data.user)
                commit('setToken', data.token)

                this.$router.push('/portal/dashboard')
            })
            .catch((err) => { 
                console.log('err', err) 
            });
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
        User.api().get('/api/users')
    },
    addUser ({commit}, data) {
        User.api().post('/api/user', data)
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