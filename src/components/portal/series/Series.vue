<template>
    <q-page>
        <div class="flex flex-center" v-if="!series">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="series"
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
                <template v-slot:header-cell-name="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-publisher="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-developer="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-franchise="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-first_game_release="props">
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

                <template v-slot:body-cell-developer="props">
                    <q-td :props="props">
                        {{props.row.developer.name}}
                    </q-td>
                </template>

                <template v-slot:body-cell-franchise="props">
                    <q-td :props="props">
                        {{props.row.franchise.title}}
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
            <serie-add-modal
                @close="addModal = false"
            ></serie-add-modal> 
        </div>

        <div v-if="updateModal">
            <serie-update-modal
                @close="updateModal = false"
                :serie="this.selectedSerie"
            ></serie-update-modal> 
        </div>

        <div v-if="removeModal">
            <serie-remove-modal
                @close="removeModal = false"
                :serie="this.selectedSerie"
            ></serie-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import SerieAddModal from './modals/SerieAddModal.vue'
import SerieUpdateModal from './modals/SerieUpdateModal.vue'
import SerieRemoveModal from './modals/SerieRemoveModal.vue'

import Serie from '../../../store/models/Serie'
import Publisher from '../../../store/models/Publisher'
import Developer from '../../../store/models/Developer'
import Franchise from '../../../store/models/Franchise'

export default {
    name: 'Series',
    components: { 
        SerieAddModal,
        SerieUpdateModal,
        SerieRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: 'serie.name',
                    field: 'name',
                    name: 'name',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'serie.publisher',
                    field: 'publisher',
                    name: 'publisher',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'serie.developer',
                    field: 'developer',
                    name: 'developer',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'serie.franchise',
                    field: 'franchise',
                    name: 'franchise',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'serie.first_game_release',
                    field: 'first_game_release',
                    name: 'first_game_release',
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
            selectedSerie: null
        }
    },
    computed:{
        series(){
            return Serie.query().with('publisher').with('developer').with('franchise').get();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.series.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(serie){
            this.selectedSerie = serie;
            this.updateModal = true;
        },
        openRemoveModal(serie){
            this.selectedSerie = serie;
            this.removeModal = true;
        }
    },
    mounted(){
        Serie.dispatch('getAllSeries');

        Publisher.dispatch('getAllPublishers');
        Developer.dispatch('getAllDevelopers');
        Franchise.dispatch('getAllFranchises');
    }
}

</script>
