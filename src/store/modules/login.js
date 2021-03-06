import store from '..';
import apiGames from '../../api/games'

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
    login({commit}){
        apiGames.getGames()
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