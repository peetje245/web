<template>
    <q-page>
        <div class="flex flex-center" v-if="!developers">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="developers"
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

                <template v-slot:header-cell-headquarter="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-established="props">
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
            <developer-add-modal
                @close="addModal = false"
            ></developer-add-modal> 
        </div>

        <div v-if="updateModal">
            <developer-update-modal
                @close="updateModal = false"
                :developer="this.selectedDeveloper"
            ></developer-update-modal> 
        </div>

        <div v-if="removeModal">
            <developer-remove-modal
                @close="removeModal = false"
                :developer="this.selectedDeveloper"
            ></developer-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import DeveloperAddModal from './modals/DeveloperAddModal.vue'
import DeveloperUpdateModal from './modals/DeveloperUpdateModal.vue'
import DeveloperRemoveModal from './modals/DeveloperRemoveModal.vue'


import Developer from '../../../store/models/Developer'

export default {
    name: 'Developers',
    components: { 
        DeveloperAddModal,
        DeveloperUpdateModal,
        DeveloperRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: 'developer.name',
                    field: 'name',
                    name: 'name',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'developer.headquarter',
                    field: 'headquarter',
                    name: 'headquarter',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'developer.established',
                    field: 'established',
                    name: 'established',
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
            selectedDeveloper: null
        }
    },
    computed:{
        developers(){
            return Developer.all();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.developers.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(developer){
            this.selectedDeveloper = developer;
            this.updateModal = true;
        },
        openRemoveModal(developer){
            this.selectedDeveloper = developer;
            this.removeModal = true;
        }
    },
    mounted(){
        Developer.dispatch('getAllDevelopers');
    }
}

</script>
