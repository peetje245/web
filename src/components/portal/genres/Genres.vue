<template>
    <q-page>
        <div class="flex flex-center" v-if="!genres">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="genres"
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

                <!-- body -->

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
            <genre-add-modal
                @close="addModal = false"
            ></genre-add-modal> 
        </div>

        <div v-if="updateModal">
            <genre-update-modal
                @close="updateModal = false"
                :genre="selectedGenre"
            ></genre-update-modal> 
        </div>

        <div v-if="removeModal">
            <genre-remove-modal
                @close="removeModal = false"
                :genre="selectedGenre"
            ></genre-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import GenreAddModal from './modals/GenreAddModal.vue'
import GenreUpdateModal from './modals/GenreUpdateModal.vue'
import GenreRemoveModal from './modals/GenreRemoveModal.vue'

import Genre from '../../../store/models/Genre'

export default {
    name: 'Genres',
    components: { 
        GenreAddModal,
        GenreUpdateModal,
        GenreRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: 'genre.title',
                    field: 'title',
                    name: 'title',
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
            selectedGenre: null
        }
    },
    computed:{
        genres(){
            return Genre.all();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.genres.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(genre){
            this.selectedGenre = genre;
            this.updateModal = true;
        },
        openRemoveModal(genre){
            this.selectedGenre = genre;
            this.removeModal = true;
        }
    },
    mounted(){
        Genre.dispatch('getAllGenres');
    }
}

</script>
