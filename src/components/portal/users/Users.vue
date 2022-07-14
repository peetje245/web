<template>
    <q-page>
        <div class="flex flex-center" v-if="!users">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="users"
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

                <template v-slot:header-cell-username="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-email="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-email_verified_at="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-role="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-banned="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-created_at="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <!-- body -->
                <template v-slot:body-cell-avatar="props">
                    <q-td :props="props">
                        <div>
                            <q-badge color="purple" :label="props.value"></q-badge>
                        </div>
                    </q-td>
                </template>

                <template v-slot:body-cell-role="props">
                    <q-td :props="props">
                        {{$t(`role.` + props.row.role.title.toLowerCase())}}
                    </q-td>
                </template>

                <template v-slot:body-cell-banned="props">
                    <q-td :props="props">
                        <q-checkbox v-model="props.row.banned"></q-checkbox>
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
            <user-add-modal
                @close="addModal = false"
            ></user-add-modal> 
        </div>

        <div v-if="updateModal">
            <user-update-modal
                @close="updateModal = false"
                :user="selectedUser"
            ></user-update-modal> 
        </div>

        <div v-if="removeModal">
            <user-remove-modal
                @close="removeModal = false"
                :user="selectedUser"
            ></user-remove-modal> 
        </div>
    </q-page>
</template>

<script>

import UserAddModal from './modals/UserAddModal.vue'
import UserUpdateModal from './modals/UserUpdateModal.vue'
import UserRemoveModal from './modals/UserRemoveModal.vue'
import User from '../../../store/models/User'
import Role from '../../../store/models/Role'

export default {
    name: 'Users',
    components: { 
        UserAddModal,
        UserUpdateModal,
        UserRemoveModal
    },
    data(){
        return{
            columns: [
                {
                    label: '',
                    field: 'avatar',
                    name: 'avatar',
                    align: 'left',
                },
                {
                    label: 'user.name',
                    field: 'name',
                    name: 'name',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'user.username',
                    field: 'username',
                    name: 'username',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'user.email',
                    field: 'email',
                    name: 'email',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'user.verified',
                    field: 'email_verified_at',
                    name: 'email_verified_at',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'user.role',
                    field: 'role',
                    name: 'role',
                    align: 'left',
                },
                {
                    label: 'user.banned',
                    field: 'banned',
                    name: 'banned',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'user.created',
                    field: 'created_at',
                    name: 'created_at',
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
            addModal: false,
            updateModal: false,
            removeModal: false,
            selectedUser: null,
        }
    },
    computed: {
        users () {
            return User.query().with('role').orderBy('name').get();
        }
    },
    methods: {
        getSelectedString () {
            // todo functionaliteit en ook op de andere pagina's
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.users.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(user){
            this.selectedUser = user;
            this.updateModal = true;
        },
        openRemoveModal(user){
            this.selectedUser = user;
            this.removeModal = true;
        }
    },
    mounted(){
        User.dispatch('getAllUsers');
        Role.dispatch('getAllRoles')
    }
}
</script>

<style scoped>
    .my-table-details {
    font-size: 0.85em;
    font-style: italic;
    max-width: 200px;
    white-space: normal;
    color: #555;
    margin-top: 4px;
    }
</style>
