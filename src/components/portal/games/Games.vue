<template>
    <q-page>
        <div class="flex flex-center" v-if="!games">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="games"
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

                <template v-slot:header-cell-ean="props">
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

                <template v-slot:header-cell-serie="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-date="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <!-- body -->
                <template v-slot:body-cell-image="props">
                    <q-td :props="props">
                        <q-img
                            v-if="props.row.image"
                            :src="url  + props.row.image.name"
                            spinner-color="white"
                            style="height: 40px; max-width: 150px"
                        ></q-img>

                        <div v-else>
                            
                        </div>
                    </q-td>
                </template>

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

                <template v-slot:body-cell-serie="props">
                    <q-td :props="props" v-if="props.row.serie">
                        {{props.row.serie.name}}
                    </q-td>
                    <q-td v-else>

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
            <game-add-modal
                @close="addModal = false"
            ></game-add-modal> 
        </div>

        <div v-if="updateModal">
            <game-update-modal
                @close="updateModal = false"
                :game="this.selectedGame"
            ></game-update-modal> 
        </div>

        <div v-if="removeModal">
            <game-remove-modal
                @close="removeModal = false"
                :game="this.selectedGame"
            ></game-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import GameAddModal from './modals/GameAddModal.vue'
import GameUpdateModal from './modals/GameUpdateModal.vue'
import GameRemoveModal from './modals/GameRemoveModal.vue'

import Game from '../../../store/models/Game'
import Publisher from '../../../store/models/Publisher'
import Developer from '../../../store/models/Developer'
import Serie from '../../../store/models/Serie'


export default {
    name: 'Games',
    components: { 
        GameAddModal,
        GameUpdateModal,
        GameRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: '',
                    field: 'image',
                    name: 'image',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'game.title',
                    field: 'title',
                    name: 'title',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'game.ean',
                    field: 'ean',
                    name: 'ean',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'game.publisher',
                    field: 'publisher',
                    name: 'publisher',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'game.developer',
                    field: 'developer',
                    name: 'developer',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'game.serie',
                    field: 'serie',
                    name: 'serie',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'game.date',
                    field: 'date',
                    name: 'date',
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
            selectedGame: null,
            url: process.env.IMAGE_PATH
        }
    },
    computed:{
        games(){
            return Game.query().with('publisher').with('developer').with('serie').with('image').get();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.games.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(game){
            this.selectedGame = game;
            this.updateModal = true;
        },
        openRemoveModal(game){
            this.selectedGame = game;
            this.removeModal = true;
        }
    },
    mounted(){
        Game.dispatch('getAllGames');
        Publisher.dispatch('getAllPublishers');
        Developer.dispatch('getAllDevelopers');
        Serie.dispatch('getAllSeries');
    }
}

</script>
