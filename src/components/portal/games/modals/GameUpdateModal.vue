<template>
   <q-page v-if="game">
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('game.update')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="titleError" inline-actions class="text-white bg-red">
                            {{$t('required.title')}}
                        </q-banner>
                        <q-input filled v-model="title" :label="$t('game.title')"></q-input>

                        <q-input filled v-model="ean" :label="$t('game.ean')"></q-input>

                        <q-banner v-if="publisherError" inline-actions class="text-white bg-red">
                            {{$t('required.developer')}}
                        </q-banner>
                        <q-select
                            filled
                            v-model="selectedPublisher"
                            :options="publishers"
                            :label="$t('game.publisher')"
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
                            :label="$t('game.developer')"
                            options-selected-class="text-deep-orange"
                            option-value="id"
                            option-label='name'
                        >
                        </q-select>

                        <q-select
                            filled
                            v-model="selectedSerie"
                            :options="series"
                            :label="$t('game.serie')"
                            options-selected-class="text-deep-orange"
                            option-value="id"
                            option-label='name'
                        >
                        </q-select>

                        <q-file
                            v-model="image"
                            filled
                            :label="$t('game.image')"
                            accept=".jpg, image/*"
                            @rejected="onRejected"
                        ></q-file>

                        <q-banner v-if="dateError" inline-actions class="text-white bg-red">
                            {{$t('required.date')}}
                        </q-banner>
                        <q-expansion-item
                            expand-separator
                            :label="$t('game.date')"
                        >
                            <q-card>
                                <q-card-section>
                                    <div>
                                        <q-checkbox v-model="tbd" :label="$t('game.tbd')"></q-checkbox>
                                    </div>

                                    <div>
                                        <q-checkbox v-model="tba" :label="$t('game.tba')"></q-checkbox>
                                    </div>

                                    <div>
                                        <q-checkbox v-model="q1" :label="$t('game.q1')"></q-checkbox>
                                        <q-checkbox v-model="q2" :label="$t('game.q2')"></q-checkbox>
                                        <q-checkbox v-model="q3" :label="$t('game.q3')"></q-checkbox>
                                        <q-checkbox v-model="q4" :label="$t('game.q4')"></q-checkbox>
                                    </div>

                                    <div class="row justify-between">
                                        <q-input class="col-3" filled :label="$t('game.release_year')" v-model="release_year">
                                            <template v-slot:append>
                                            <q-icon
                                                name="event"
                                                class="cursor-pointer">
                                                <q-popup-proxy 
                                                    ref="year"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-date 
                                                    v-model="release_year"
                                                    @input="inputYear"
                                                    default-view="Years"
                                                    mask="YYYY"
                                                    :emit-immediately="true"
                                                    >
                                                    </q-date>
                                                </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>

                                        <q-input class="col-3" filled :label="$t('game.release_month')" v-model="release_month">
                                            <template v-slot:append>
                                            <q-icon
                                                name="event"
                                                class="cursor-pointer">
                                                <q-popup-proxy 
                                                    ref="month"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-date 
                                                    v-model="release_month"
                                                    @input="inputMonth"
                                                    default-view="Months"
                                                    mask="MMMM"
                                                    :emit-immediately="true"
                                                    >
                                                    </q-date>
                                                </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>

                                        <q-input class="col-3" filled :label="$t('game.release_day')" v-model="release_day">
                                            <template v-slot:append>
                                            <q-icon
                                                name="event"
                                                class="cursor-pointer">
                                                <q-popup-proxy 
                                                    ref="day"
                                                    transition-show="scale"
                                                    transition-hide="scale"
                                                >
                                                    <q-date 
                                                    v-model="release_day"
                                                    @input="inputDay"
                                                    default-view="Calendar"
                                                    mask="DD"
                                                    :emit-immediately="true"
                                                    >
                                                    </q-date>
                                                </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
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

import Game from '../../../../store/models/Game'
import Serie from '../../../../store/models/Serie'
import Publisher from '../../../../store/models/Publisher'
import Developer from '../../../../store/models/Developer'

export default {
    name: 'GameUpdateModal',
    props: {
        game: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            confirm: true,

            title: this.game.title,
            ean: this.game.ean,
            selectedPublisher: this.game.publisher,
            selectedDeveloper: this.game.developer,
            selectedSerie: this.game.serie,
            image: this.game.image,
            tbd: this.game.tbd,
            tba: this.game.tba,
            q1: this.game.q1,
            q2: this.game.q2,
            q3: this.game.q3,
            q4: this.game.q4,
            release_day: this.game.release_day,
            release_month: this.game.month,
            release_year: this.game.release_year,

            titleError: false,
            publisherError: false,
            developerError: false,
            dateError: false,
        }
    },
    computed: {
        publishers () {
            return Publisher.all();
        },
        developers () {
            return Developer.all();
        },
        series () {
            return Serie.all();
        },
        checkErrorDate(){
            if(this.tbd){
                return true;
            }

            if(this.tba){
                return true;
            }

            if((this.q1 || this.q2 || this.q3 || this.q4) && this.release_year){
                return true
            }

            if(this.release_day && this.release_month && this.release_year){
                return true;
            }

            if(this.release_day && (!this.release_month || !this.release_year)){
                return false;
            }

            if(this.release_month && this.release_year){
                return true;
            }

            if(this.release_month && !this.release_year){
                return false;
            }

            if(this.release_year){
                return true;
            }

            return false;
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

            if(!this.selectedDeveloper){
                this.developerError = true;
            }
            else{
                this.developerError = false;
            }

            if(!this.checkErrorDate){
                this.dateError = true;
            }
            else{
                this.dateError = false;
            }

            if(!this.titleError && !this.publisherError && !this.developerError && !this.dateError){
                let data = Game.find(this.game.id);
                
                data.title = this.title
                data.publisher_id  = this.selectedPublisher.id
                data.developer_id = this.selectedDeveloper.id
                data.ean = this.ean
                data.serie_id = this.selectedSerie ? this.selectedSerie.id : null
                data.banner = this.banner
                data.tbd = this.tbd
                data.tba = this.tba
                data.q1 = this.q1
                data.q2 = this.q2
                data.q3 = this.q3
                data.q4 = this.q4
                data.release_day = parseInt(this.release_day)
                data.release_month = this.release_month
                data.release_year = parseInt(this.release_year)

                this.$store.dispatch('games/updateGame', data);
                this.$emit('close');
            }
        },
        onRejected (rejectedEntries) {
            this.$q.notify({
                type: 'negative',
                message: `${rejectedEntries.length} file(s) did not pass validation constraints`
            })
        },
        inputMonth(value, reason, details){
            if(reason === 'month' && value){
                this.$refs.month.hide()
            }
        },
        inputYear(value, reason, details){
            if(reason === 'year' && value){
                this.$refs.year.hide()
            }
        },
        inputDay(value, reason, details){
            if(reason === 'add-day' && value){
                this.$refs.day.hide()
            }
        }
    }
}
</script>
