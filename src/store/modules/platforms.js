import Platform from '../models/Platform';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    allPlatforms({commit}){
        Platform.api().get('/api/platforms',
            {
                dataTransformer: ({ data, headers }) => {
                    Platform.deleteAll();
                    
                    return data.data
                }
            })
    },

    addPlatform ({commit}, data) {
        Platform.post().get('/api/platform', data)
    },

    updatePlatform ({commit}, data) {
        Platform.post().get('/api/platform/' + data.id, data)
    },

    destroyPlatform({commit}, id){
        Platform.api().delete('/api/platform/' + id, {
            delete: id
        })
    },

    checkIfAllChecked(){
        const platforms = Platform.query().where('active', true).where('checked', false).get()

        if(!platforms.length){
            return true;
        }

        return false;
    },

    allCheckedIds(){
        const platforms = Platform.query().where('active', true).where('checked', true).get()

        return platforms.map((platform) => platform.id);
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}