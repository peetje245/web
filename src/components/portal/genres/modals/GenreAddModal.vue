<template>
    <q-page>
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('genre.add')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="titleError" inline-actions class="text-white bg-red">
                            {{$t('required.title')}}
                        </q-banner>
                        <q-input filled v-model="title" :label="$t('genre.title')"></q-input>
                    </div>
                    
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="$t('cancel')" color="primary" @click="close" v-close-popup></q-btn>
                    <q-btn :label="$t('save')" color="primary" @click="save"></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>

import Genre from '../../../../store/models/Genre'

export default {
    name: 'GenreAddModal',
    data(){
        return{
            confirm: true,

            title: '',

            titleError: false,
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        save(){
            if(!this.title.length){
                this.titleError = true;
            }
            else{
                this.titleError = false;
            }

            if(!this.titleError){
                let data = {
                    title: this.title,
                }
                
                Genre.dispatch('addGenre', data);
                this.$emit('close');
            }
        }
    }
}
</script>
