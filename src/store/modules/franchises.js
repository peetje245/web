import Franchise from '../models/Franchise';

const state = () => ({
})

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    allFranchises({commit}){
        Franchise.api().get('/api/franchises',
            {
                dataTransformer: ({ data, headers }) => {
                    Franchise.deleteAll();
                    
                    return data.data
                }
            })
    },

    addFranchise ({commit}, data) {
        Franchise.api().post('/api/franchise', data)
    },

    updateFranchise ({commit}, data) {
        Franchise.api().post('/api/franchise/' + data.id, data)
    },

    destroyFranchise({commit}, id){
        Franchise.api().delete('/api/franchise/' + id, {
            delete: id
        })
    },

    checkIfAllChecked(){
        const franchises = Franchise.query().where('checked', false).get()

        if(!franchises.length){
            return true;
        }

        return false;
    },

    allCheckedIds(){
        const franchises = Franchise.query().where('checked', true).get()

        return franchises.map((franchise) => franchise.id);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}