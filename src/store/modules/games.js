import Game from '../models/Game';

const state = () => ({
    meta: null
})

// getters
const getters = {
    getMeta: (state,) => {
        return state.meta;
    }
}

// mutations
const mutations = {
    setMeta (state, meta) {
        state.meta = meta;
    }
}

// actions
const actions = {
    search({commit}, payload){
        const p = new Promise((resolve, reject) => {
            Game.api()
                .post(
                    '/api/games/search',
                    payload.data,
                    {
                        dataTransformer: ({ data, headers }) => {
                            commit('setMeta', data.meta)
                            Game.deleteAll();
                            resolve(data.data)

                            return data.data
                        },
                        params: payload.params
                    }
                )
        })

        return p
    },

    gameById({commit}, payload){
        const p = new Promise((resolve, reject) => {
            Game.api()
                .get(
                    '/api/game/' + payload,
                    {
                        dataTransformer: ({ data, headers }) => {
                            resolve(data.data)

                            return data.data
                        },
                    }
                )
        })

        return p
    },

    addGame ({commit}, data) {
        let formData = new FormData();
        const imagefile = data.image;
        
        formData.append("image", imagefile);
        formData.append("data", JSON.stringify(data.data));

        Game.api().post('/api/game', formData, {
            headers: { 'Content-Type' : 'multipart/form-data'},
        })
    },

    updateGame ({commit}, data) {
        Game.api().post('/api/game/' + data.id, data)
    },

    destroyGame({commit}, id){
        Game.api().delete('/api/game/' + id, {
            delete: id
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