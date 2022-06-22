import store from '..';
import api from '../../api/login'
import apiRegister from '../../api/register'
import apiUser from '../../api/users';
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
        apiRegister.register(data.email, data.password, data.name, data.password_confirmation)
            .then((data) => { 
                this.$router.push('/login')
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    getAllUsers(){
        apiUser.getUsers()
            .then((data) => {
                User.insert({data: data}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    addUser ({commit}, data) {
        apiUser.add(data)
            .then((response) => {
                User.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updateUser ({commit}, data) {
        apiUser.update(data)
            .then((response) => {
                User.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyUser({commit}, id){
        apiUser.destroy(id)
            .then((response) => {
                User.delete(id)
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