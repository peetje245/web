<template>
   <q-page v-if="serie">
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('serie.update')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="nameError" inline-actions class="text-white bg-red">
                            {{$t('required.name')}}
                        </q-banner>
                        <q-input filled v-model="name" :label="$t('serie.name')"></q-input>

                        <q-banner v-if="publisherError" inline-actions class="text-white bg-red">
                            {{$t('required.publisher')}}
                        </q-banner>
                        <q-select
                            filled
                            v-model="selectedPublisher"
                            :options="publishers"
                            :label="$t('serie.publisher')"
                            options-selected-class="text-deep-orange"
                            option-value="id"
                            option-label='name'
                        >
                        </q-select>

                        <q-banner v-if="developerError" inline-actions class="text-white bg-red">
                            {{$t('required.developer')}}
                        </q-banner>
                        <q-select
                            filled
                            v-model="selectedDeveloper"
                            :options="developers"
                            :label="$t('serie.developer')"
                            options-selected-class="text-deep-orange"
                            option-value="id"
                            option-label='name'
                        >
                        </q-select>

                        <q-select
                            filled
                            v-model="selectedFranchise"
                            :options="franchises"
                            :label="$t('serie.franchise')"
                            options-selected-class="text-deep-orange"
                            option-value="id"
                            option-label='title'
                        >
                        </q-select>

                        <q-input filled :label="$t('serie.first_game_release')" v-model="first_game_release">
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
                                        v-model="first_game_release"
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

import Publisher from '../../../../store/models/Publisher'
import Developer from '../../../../store/models/Developer'
import Franchise from '../../../../store/models/Franchise'

export default {
    name: 'SerieUpdateModal',
    props: {
        serie: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            confirm: true,

            name: this.serie.name,
            selectedPublisher: this.serie.publisher,
            selectedDeveloper: this.serie.developer,
            selectedFranchise: this.serie.franchise,
            first_game_release: this.serie.first_game_release,

            nameError: false,
            publisherError: false,
            developerError: false,
        }
    },
    computed: {
        publishers () {
            return Publisher.all();
        },
        developers () {
            return Developer.all();
        },
        franchises () {
            return Franchise.all();
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        save(){
            if(!this.name.length){
                this.nameError = true;
            }
            else{
                this.nameError = false;
            }

            if(!this.selectedPublisher){
                this.publisherError = true;
            }
            else{
                this.publisherError = false;
            }

            if(!this.selectedDeveloper){
                this.developerError = true;
            }
            else{
                this.developerError = false;
            }


            if(!this.nameError && !this.publisherError && !this.developerError){
                let data = {
                    id: this.serie.id,
                    name: this.name,
                    publisher_id: this.selectedPublisher.id,
                    developer_id: this.selectedDeveloper.id
                }

                if(this.selectedFranchise){
                    data.franchise_id = this.selectedFranchise.id
                }

                if(this.first_game_release){
                    data.first_game_release = this.first_game_release
                }
                
                this.$store.dispatch('series/updateSerie', data);
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
