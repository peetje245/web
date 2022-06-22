<template>
    <q-page>
        <div class="flex flex-center" v-if="!publishers">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="publishers"
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
            <publisher-add-modal
                @close="addModal = false"
            ></publisher-add-modal> 
        </div>

        <div v-if="updateModal">
            <publisher-update-modal
                @close="updateModal = false"
                :publisher="selectedPublisher"
            ></publisher-update-modal> 
        </div>

        <div v-if="removeModal">
            <publisher-remove-modal
                @close="removeModal = false"
                :publisher="selectedPublisher"
            ></publisher-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import PublisherAddModal from './modals/PublisherAddModal.vue'
import PublisherUpdateModal from './modals/PublisherUpdateModal.vue'
import PublisherRemoveModal from './modals/PublisherRemoveModal.vue'


import Publisher from '../../../store/models/Publisher'

export default {
    name: 'Publishers',
    components: { 
        PublisherAddModal,
        PublisherUpdateModal,
        PublisherRemoveModal
    },
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: 'publisher.name',
                    field: 'name',
                    name: 'name',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'publisher.headquarter',
                    field: 'headquarter',
                    name: 'headquarter',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'publisher.established',
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
            selectedPublisher: null
        }
    },
    computed:{
        publishers(){
            return Publisher.all();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.publishers.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(publisher){
            this.selectedPublisher = publisher;
            this.updateModal = true;
        },
        openRemoveModal(publisher){
            this.selectedPublisher = publisher;
            this.removeModal = true;
        }
    },
    mounted(){
        Publisher.dispatch('getAllPublishers');
    }
}

</script>
