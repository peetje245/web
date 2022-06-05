import store from '..';
import api from '../../api/games'

const state = () => ({
    all: []
})

// getters
const getters = {}

// mutations
const mutations = {
    mutateAllGames(state, games){
        state.all = games
    },
}

// actions
const actions = {
    getAllGames({commit}){
        api.getGames()
            .then((value) => { 
                commit('mutateAllGames', value)
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