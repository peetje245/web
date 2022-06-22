<template>
    <q-page>
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('platform.add')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="titleError" inline-actions class="text-white bg-red">
                            {{$t('required.title')}}
                        </q-banner>
                        <q-input filled v-model="title" :label="$t('platform.title')"></q-input>

                        <q-banner v-if="releaseYearError" inline-actions class="text-white bg-red">
                            {{$t('required.release_year')}}
                        </q-banner>
                        <q-input filled :label="$t('platform.release_year')" v-model="release_year">
                            <template v-slot:append>
                            <q-icon
                                name="event"
                                class="cursor-pointer">
                                <q-popup-proxy 
                                    ref="qDateProxy"
                                    transition-show="scale"
                                    transition-hide="scale"
                                >
                                    <q-date 
                                    v-model="release_year"
                                    @input="input"
                                    default-view="Years"
                                    mask="YYYY"
                                    :emit-immediately="true"
                                    >
                                    </q-date>
                                </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-checkbox v-model="active" :label="$t('platform.active')"></q-checkbox>
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

import Platform from '../../../../store/models/Platform'

export default {
    name: 'PlatformAddModal',
    data(){
        return{
            confirm: true,

            title: '',
            release_year: null,
            active: false,

            titleError: false,
            releaseYearError: false,
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

            if(!this.release_year){
                this.releaseYearError = true;
            }
            else{
                this.releaseYearError = false;
            }

            if(!this.titleError && !this.releaseYearError){
                let data = {
                    title: this.title,
                    release_year: this.release_year,
                    active: this.active
                }
                
                Platform.dispatch('addPlatform', data);
                this.$emit('close');
            }
        },
        input(value, reason, details){
            if(reason === 'year' && value){
                this.$refs.qDateProxy.hide()
            }
        }
    }
}
</script>
