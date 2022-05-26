import apiArticles from '../../api/articles'

// initial state
// shape: [{ id, quantity }]
const state = {
  all: [],
  count: 0
}

// getters
const getters = {
    allArticles()  {
        return 'testen';
    }
}

// mutations
const mutations = {
    setAllArticles(articles){

        state.all = articles;

    }
}

// actions
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}