import Serie from '../models/Serie';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    allSeries({commit}){
        Serie.api().get('/api/series',
            {
                dataTransformer: ({ data, headers }) => {
                    Serie.deleteAll();
                    
                    return data.data
                }
            })
    },

    addSerie({commit}, data) {
        Serie.api().post('/api/serie', data)
    },

    updateSerie({commit}, data) {
        Serie.api().post('/api/serie/' + data.id, data)
    },

    destroySerie({commit}, id){
        Serie.api().delete('/api/serie/' + id, {
            delete: id
        })
    },

    checkIfAllChecked(){
        const series = Serie.query().where('checked', false).get()

        if(!series.length){
            return true;
        }

        return false;
    },

    allCheckedIds(){
        const series = Serie.query().where('checked', true).get()

        return series.map((serie) => serie.id);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}