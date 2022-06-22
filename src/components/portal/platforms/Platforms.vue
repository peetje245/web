<template>
    <q-page>
        <div class="flex flex-center" v-if="!platforms">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="platforms"
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

                <template v-slot:header-cell-release_year="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-active="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <!-- body -->

                <template v-slot:body-cell-active="props">
                    <q-td :props="props">
                        <q-checkbox v-model="props.row.active"></q-checkbox>
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
            <platform-add-modal
                @close="addModal = false"
            ></platform-add-modal> 
        </div>

        <div v-if="updateModal">
            <platform-update-modal
                @close="updateModal = false"
                :platform="selectedPlatform"
            ></platform-update-modal> 
        </div>

        <div v-if="removeModal">
            <platform-remove-modal
                @close="removeModal = false"
                :platform="selectedPlatform"
            ></platform-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import PlatformAddModal from './modals/PlatformAddModal.vue'
import PlatformUpdateModal from './modals/PlatformUpdateModal.vue'
import PlatformRemoveModal from './modals/PlatformRemoveModal.vue'

import Platform from '../../../store/models/Platform'

export default {
    name: 'Platforms',
    components: { 
        PlatformAddModal,
        PlatformUpdateModal,
        PlatformRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: 'platform.title',
                    field: 'title',
                    name: 'title',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'platform.release_year',
                    field: 'release_year',
                    name: 'release_year',
                    align: 'left',
                    sortable: true
                },

                {
                    label: 'platform.active',
                    field: 'active',
                    name: 'active',
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
            selectedPlatform: null
        }
    },
    computed:{
        platforms(){
            return Platform.all();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.platforms.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(platform){
            this.selectedPlatform = platform;
            this.updateModal = true;
        },
        openRemoveModal(platform){
            this.selectedPlatform = platform;
            this.removeModal = true;
        }
    },
    mounted(){
        Platform.dispatch('getAllPlatforms');
    }
}

</script>
