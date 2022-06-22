import store from '..';
import api from '../../api/games'
import Game from '../models/Game';

const state = () => ({
    all: []
})

// getters
const getters = {}

// mutations
const mutations = {}

// actions
const actions = {
    getAllGames({commit}){
        api.getGames()
            .then((response) => { 
                Game.insert({data: response})
            })
            .catch((err) => { 
                console.log('err', err) 
            });
    },
    addGame ({commit}, data) {
        api.add(data)
            .then((response) => {
                Game.insert({data: response}) 
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    updateGame ({commit}, data) {
        api.update(data)
            .then((response) => {
                Game.update({
                    where: response.id,
                    data: response
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    },
    destroyGame({commit}, id){
        api.destroy(id)
            .then((response) => {
                Game.delete(id)
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