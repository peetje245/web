import store from '..';
import apiArticles from '../../api/articles'

const state = () => ({
    all: []
})

// getters
const getters = {}

// mutations
const mutations = {
    mutateAllArticles(state, articles){
        state.all = articles
    },
}

// actions
const actions = {
    getAllArticles({commit}){
        apiArticles.getArticles()
            .then((value) => { 
                commit('mutateAllArticles', value)
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