import Genre from '../models/Genre';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    allGenres({commit}){
        Genre.api().get('/api/genres',
            {
                dataTransformer: ({ data, headers }) => {
                    Genre.deleteAll();
                    
                    return data.data
                }
            })
    },

    addGenre ({commit}, data) {
        Genre.api().post('/api/genre', data)
    },

    updateGenre ({commit}, data) {
        Genre.api().post('/api/genre/' + data.id, data)
    },

    destroyGenre({commit}, id){
        Genre.api().delete('/api/genre/' + id, {
            delete: id
        })
    },

    checkIfAllChecked(){
        const genres = Genre.query().where('checked', false).get()

        if(!genres.length){
            return true;
        }

        return false;
    },

    allCheckedIds(){
        const genres = Genre.query().where('checked', true).get()

        return genres.map((genre) => genre.id);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}