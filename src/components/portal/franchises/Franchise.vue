<template>
    <q-page>
        <div class="flex flex-center" v-if="!franchises">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="franchises"
                :columns="columns"
                row-key="name"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
                :filter="filter"
                :pagination="pagination"
            >
                <template v-slot:top>
                    <q-btn color="primary" @click="openAddModal" icon="fa-solid fa-plus"></q-btn>
                    <q-space></q-space>
                    <q-input v-model="filter" filled type="search">
                        <template v-slot:append>
                            <q-icon name="search"></q-icon>
                        </template>
                    </q-input>
                </template>

                <!-- header -->
                <template v-slot:header-cell-title="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-publisher="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-release_year="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>


                <!-- body -->
                <template v-slot:body-cell-publisher="props">
                    <q-td :props="props">
                        {{props.row.publisher.name}}
                    </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn-group>
                            <q-btn @click="openUpdateModal(props.row)" size="sm" color="primary" icon="fa-solid fa-eye"></q-btn>
                            <q-btn @click="openRemoveModal(props.row)" size="sm" color="negative" icon="fa-solid fa-trash"></q-btn>
                        </q-btn-group>
                    </q-td>
                </template>
            </q-table>
        </div>

        <div v-if="addModal">
            <franchise-add-modal
                @close="addModal = false"
            ></franchise-add-modal> 
        </div>

        <div v-if="updateModal">
            <franchise-update-modal
                @close="updateModal = false"
                :franchise="selectedFranchise"
            ></franchise-update-modal> 
        </div>

        <div v-if="removeModal">
            <franchise-remove-modal
                @close="removeModal = false"
                :franchise="selectedFranchise"
            ></franchise-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import FranchiseAddModal from './modals/FranchiseAddModal.vue'
import FranchiseUpdateModal from './modals/FranchiseUpdateModal.vue'
import FranchiseRemoveModal from './modals/FranchiseRemoveModal.vue'

import Franchise from '../../../store/models/Franchise'
import Publisher from '../../../store/models/Publisher'

export default {
    name: 'Franchise',
    components: { 
        FranchiseAddModal,
        FranchiseUpdateModal,
        FranchiseRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: 'franchise.title',
                    field: 'title',
                    name: 'title',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'franchise.publisher',
                    field: 'publisher',
                    name: 'publisher',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'franchise.release_year',
                    field: 'release_year',
                    name: 'release_year',
                    align: 'left',
                    sortable: true
                },
                {
                    label: '',
                    field: 'actions',
                    name: 'actions',
                    align: 'left',
                }
            ],
            selected: [],
            filter: '',
            pagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10
            },
            selectedFranchise: null
        }
    },
    computed:{
        franchises(){
            return Franchise.query().with('publisher').get();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.franchises.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(franchise){
            this.selectedFranchise = franchise;
            this.updateModal = true;
        },
        openRemoveModal(franchise){
            this.selectedFranchise = franchise;
            this.removeModal = true;
        }
    },
    mounted(){
        Franchise.dispatch('getAllFranchises');
        Publisher.dispatch('getAllPublishers');
    }
}

</script>
