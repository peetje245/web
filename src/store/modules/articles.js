import Article from '../models/Article';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    getAllArticles({commit}){
        Article.api().get('/api/articles')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}