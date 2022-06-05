import store from '..';
import api from '../../api/login'
import apiRegister from '../../api/register'

const state = () => ({
    currentUser: [],
    token: null,
})

// getters
const getters = {}

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

                localStorage.setItem('token', data.token);

                this.$router.push('/dashboard')
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    register({commit}, data){
        apiRegister.register(data.email, data.password, data.name, data.password_confirmation)
            .then((data) => { 
                commit('setCurrentUser', data.user)
                commit('setToken', data.token)

                localStorage.setItem('token', data.token);

                this.$router.push('/dashboard');
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