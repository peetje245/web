<template>
    <q-page>
        <div class="flex flex-center" v-if="!articles">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else>
            <q-table
                :data="articles"
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

                <template v-slot:header-cell-description="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-author="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-serie="props">
                    <q-th :props="props">
                        {{$t(props.col.label)}}
                    </q-th>
                </template>

                <template v-slot:header-cell-active="props">
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
                <template v-slot:body-cell-banner="props">
                    <q-td :props="props">
                        <div>
                            <q-badge color="purple" :label="props.value"></q-badge>
                        </div>
                    </q-td>
                </template>

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
            <!-- <user-add-modal
                @close="addModal = false"
            ></user-add-modal>  -->
        </div>

        <div v-if="updateModal">
            <!-- <user-update-modal
                @close="updateModal = false"
                :user="this.selectedUser"
            ></user-update-modal>  -->
        </div>

        <div v-if="removeModal">
            <!-- <user-remove-modal
                @close="removeModal = false"
                :user="this.selectedUser"
            ></user-remove-modal>  -->
        </div>
    </q-page>
</template>

<script>

import Article from '../../../store/models/Article'

export default {
    name: 'Articles',
    data(){
        return{
            addModal: false,
            updateModal: false,
            removeModal: false,
            columns: [
                {
                    label: '',
                    field: 'avatar',
                    name: 'avatar',
                    align: 'left',
                },
                {
                    label: 'article.title',
                    field: 'title',
                    name: 'title',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'article.description',
                    field: 'description',
                    name: 'description',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'article.author',
                    field: 'author',
                    name: 'author',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'article.serie',
                    field: 'serie',
                    name: 'serie',
                    align: 'left',
                    sortable: true
                },
                {
                    label: 'article.active',
                    field: 'active',
                    name: 'active',
                    align: 'left',
                },
                {
                    label: 'article.created',
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
            selectedArticle: null,
        }
    },
    computed:{
        articles(){
            return Article.all();
        }
    },
    methods: {
        getSelectedString () {
            return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.articles.length}`
        },
        openAddModal(){
            this.addModal = true;
        },
        openUpdateModal(article){
            this.selectedArticle = article;
            this.updateModal = true;
        },
        openRemoveModal(article){
            this.selectedArticle = article;
            this.removeModal = true;
        }
    },
    mounted(){
        Article.dispatch('getAllArticles');
    }
}

</script>
