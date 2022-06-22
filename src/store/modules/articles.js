import store from '..';
import api from '../../api/articles'
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
        api.getArticles()
            .then((response) => { 
                Article.insert({data: response})
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