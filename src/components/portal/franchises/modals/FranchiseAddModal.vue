<template>
    <q-page>
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('franchise.add')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="titleError" inline-actions class="text-white bg-red">
                            {{$t('required.name')}}
                        </q-banner>
                        <q-input filled v-model="title" :label="$t('franchise.title')"></q-input>

                        <q-banner v-if="publisherError" inline-actions class="text-white bg-red">
                            {{$t('required.publisher')}}
                        </q-banner>
                        <q-select
                            filled
                            v-model="selectedPublisher"
                            :options="publishers"
                            :label="$t('franchise.publisher')"
                            options-selected-class="text-deep-orange"
                            option-value="id"
                            option-label='name'
                        >
                        </q-select>

                        <q-banner v-if="releaseYearError" inline-actions class="text-white bg-red">
                            {{$t('required.release_year')}}
                        </q-banner>
                        <q-input filled :label="$t('franchise.release_year')" v-model="release_year">
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

import Franchise from '../../../../store/models/Franchise'
import Publisher from '../../../../store/models/Publisher'

export default {
    name: 'FranchiseAddModal',
    data(){
        return{
            confirm: true,

            title: '',
            selectedPublisher: null,
            release_year: null,

            titleError: false,
            publisherError: false,
            releaseYearError: false,
        }
    },
    computed: {
        publishers () {
            return Publisher.all();
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

            if(!this.selectedPublisher){
                this.publisherError = true;
            }
            else{
                this.publisherError = false;
            }

            if(!this.release_year){
                this.releaseYearError = true;
            }
            else{
                this.releaseYearError = false;
            }

            if(!this.nameError && !this.publisherError && !this.releaseYearError){
                let data = {
                    title: this.title,
                    publisher_id: this.selectedPublisher.id,
                    release_year: this.release_year,
                }
                
                Franchise.dispatch('addFranchise', data);
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
