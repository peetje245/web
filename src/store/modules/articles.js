import store from '..';
import apiArticles from '../../api/articles'

const state = () => ({
    all: []
})

// getters
const getters = {
    allArticles(state)  {
        return state.all;
    }
}

// mutations
const mutations = {
    mutateAllArticles(state, articles){
        state.all = articles
    },
    
    test(state){
        apiArticles.getArticles((state, articles) => {
            state.all = articles;
        })
    }
}

// actions
const actions = {
    setAllArticles({commit}){
        apiArticles.getArticles(articles => {
            commit('mutateAllArticles', articles)
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