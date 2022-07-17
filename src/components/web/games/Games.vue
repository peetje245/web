<template>
    <q-page>
        <div class="flex flex-center" v-if="!games">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else class="col-12 row">
            <div class="col-2">
                <q-toolbar dense class="bg-grey-10 text-white shadow-2">
                    <q-toolbar-title>{{$t('filter.filters')}}</q-toolbar-title>
                </q-toolbar>

                <q-list class="q-pa-md bg-grey-10 text-white" dark style="max-width: 318px; height: 100%; min-height:100vh">
                    <q-expansion-item
                        expand-separator
                        default-opened
                        v-if="genres.length"
                    >
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-checkbox v-model="genresChecked" @input="changeGenres()"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                {{$t('filter.genres')}}
                            </q-item-section>
                        </template>

                        <q-item v-for="genre in genres" :key="genre.id" class="q-my-sm" dense>
                            <q-item-section side top>
                                <q-checkbox v-model="genre.checked" @input="changeGenre(genre)"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>{{ genre.title }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>

                    <q-separator dark></q-separator>
                    
                    <q-expansion-item
                        expand-separator
                        default-opened
                        v-if="platforms.length"
                    >
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-checkbox v-model="platformsChecked" @input="changePlatforms()"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                {{$t('filter.platforms')}}
                            </q-item-section>
                        </template>

                        <q-item v-for="platform in platforms" :key="platform.id" class="q-my-sm" dense>
                            <q-item-section side top>
                                <q-checkbox v-model="platform.checked" @input="changePlatform(platform)"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>{{ platform.title }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>

                    <q-separator dark></q-separator>

                    <q-expansion-item
                        expand-separator
                        default-opened
                        v-if="series.length"
                    >
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-checkbox v-model="seriesChecked" @input="changeSeries()"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                {{$t('filter.series')}}
                            </q-item-section>
                        </template>

                        <q-item v-for="serie in series" :key="serie.id" class="q-my-sm" dense>
                            <q-item-section side top>
                                <q-checkbox v-model="serie.checked" @input="changeSerie(serie)"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>{{ serie.name }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>

                    <q-separator dark></q-separator>

                    <q-expansion-item
                        expand-separator
                        default-opened
                        v-if="franchises.length"
                    >
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-checkbox v-model="franchisesChecked" @input="changeFranchises()"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                {{$t('filter.franchises')}}
                            </q-item-section>
                        </template>

                        <q-item v-for="franchise in franchises" :key="franchise.id" class="q-my-sm" dense>
                            <q-item-section side top>
                                <q-checkbox v-model="franchise.checked" @input="changeFranchise(franchise)"></q-checkbox>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>{{ franchise.title }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>

            <div v-if="games.length" class="col-8 offset-1">
                <div class="row justify-end" style="padding-top: 25px; padding-bottom: 25px;">
                    <q-input dense v-model="search" filled type="search">
                        <template v-slot:append>
                            <q-btn dense icon="search" flat @click="loadGames()"></q-btn>
                        </template>
                    </q-input>
                </div>
                
                <div class="row">
                    <q-card v-for="game in games" :key="game.id" class="col-12" style="margin-bottom: 25px;" @click="redirectGame(game.id)">
                        <q-card-section class="text-h6 col-12">
                            {{ game.title }}
                        </q-card-section>

                        <q-card-section horizontal>
                            <q-img
                                class="col-4"
                                v-if="game.image"
                                :src="url  + game.image.name"
                                style="height: 200px"
                            ></q-img>
                            <q-img
                                class="col-4"
                                v-else
                                :src="url  + 'No_image_available.jpg'"
                                style="height: 200px"
                            ></q-img>

                            <q-card-section class="col-8 text-body1">
                                {{game.description}}
                            </q-card-section>
                        </q-card-section>

                        <q-card-actions>
                            {{game.date}}
                        </q-card-actions>
                    </q-card>
                </div>

                <div class="row justify-center" v-if="meta.last_page !== 1">
                    <q-pagination
                        v-model="meta.current_page"
                        :max="meta.last_page"
                        direction-links
                        boundary-links
                        icon-first="skip_previous"
                        icon-last="skip_next"
                        icon-prev="fast_rewind"
                        icon-next="fast_forward"
                        style="padding-bottom: 25px;"
                        @input="loadGames()"
                    ></q-pagination>
                </div>
            </div>

            <div v-else class="col-8 offset-1">
                <div class="row justify-end" style="padding-top: 25px; padding-bottom: 25px;">
                    <q-input dense v-model="search" filled type="search">
                        <template v-slot:append>
                            <q-icon name="search"></q-icon>
                        </template>
                    </q-input>
                </div>

                <div class="row">
                    niks gevonden
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>

import Game from '../../../store/models/Game'
import Genre from '../../../store/models/Genre'
import Platform from '../../../store/models/Platform'
import Serie from '../../../store/models/Serie'
import Franchise from '../../../store/models/Franchise'

export default {
    name: 'Games',
    data(){
        return{
            search: '',
            url: process.env.IMAGE_PATH,
            meta: {
                current_page: 1,
                per_page: 15,
                last_page: 1,
            },
            selectedGenres: [],
            selectedPlatforms: [],
            selectedSeries: [],
            selectedFranchises: [],
            genresChecked: true,
            platformsChecked: true,
            seriesChecked: true,
            franchisesChecked: true,
        }
    },
    computed:{
        games(){
            return Game
                .query()
                .with('developer')
                .with('publisher')
                .with('serie')
                .with('franchise')
                .with('genres')
                .with('platforms')
                .with('image')
                .with('videos')
                .get();
        },
        genres(){
            return Genre.query().orderBy('title').get();
        },
        platforms(){
            return Platform.query().where('active', true).orderBy('title').get()
        },
        series(){
            return Serie.query().orderBy('name').get()
        },
        franchises(){
            return Franchise.query().orderBy('title').get()
        }
    },
    watch:{
        genres(){
            Genre.dispatch('allCheckedIds').then((checked) => {
                this.selectedGenres = checked ;
            })
        },
        platforms(){
            Platform.dispatch('allCheckedIds').then((checked) => {
                this.selectedPlatforms = checked ;
            })
        },
        series(){
            Serie.dispatch('allCheckedIds').then((checked) => {
                this.selectedSeries = checked ;
            })
        },
        franchises(){
            Franchise.dispatch('allCheckedIds').then((checked) => {
                this.selectedFranchises = checked ;
            })
        }
    },
    methods: {
        redirectGame(id){
            this.$router.push('/game/' + id);
        },
        loadGames(all = false){
            let params = {
                page: this.meta.current_page
            }

            let data = {}

            if(!all){
                data.genres = this.selectedGenres
                data.platforms = this.selectedPlatforms
                data.series = this.selectedSeries
                data.franchises = this.selectedFranchises,
                data.all = true
            }

            if(this.search.length){
                data.search = this.search
            }

            Game.dispatch('search', {data, params})
                .then(() => {
                    this.meta = { ...this.$store.getters['entities/games/getMeta'] } 
                });
        },

        changeGenres(){
            if(!this.genresChecked)
            {
                this.genres.forEach(genre => {
                    Genre.update({
                        where: genre.id,
                        data: {
                            checked: false
                        }
                    })
                });

            }
            else{
                this.genres.forEach(genre => {
                    Genre.update({
                        where: genre.id,
                        data: {
                            checked: true
                        }
                    })
                });
            }

            Genre.dispatch('allCheckedIds').then((checked) => {
                this.selectedGenres = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        changeGenre(genre){
            Genre.update({
                where: genre.id,
                data: {
                    checked: genre.checked
                }
            })

            Genre.dispatch('allCheckedIds').then((checked) => {
                this.selectedGenres = checked ;
            })

            Genre.dispatch('checkIfAllChecked').then((checked) => {
                this.genresChecked = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        loadGenres(){
            Genre.dispatch('allGenres');
        },

        changePlatforms(){
            if(!this.platformsChecked)
            {
                this.platforms.forEach(platform => {
                    Platform.update({
                        where: platform.id,
                        data: {
                            checked: false
                        }
                    })
                });

            }
            else{
                this.platforms.forEach(platform => {
                    Platform.update({
                        where: platform.id,
                        data: {
                            checked: true
                        }
                    })
                });
            }

            Platform.dispatch('allCheckedIds').then((checked) => {
                this.selectedPlatforms = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        changePlatform(platform){
            Platform.update({
                where: platform.id,
                data: {
                    checked: platform.checked
                }
            })

            Platform.dispatch('allCheckedIds').then((checked) => {
                this.selectedPlatforms = checked ;
            })

            Platform.dispatch('checkIfAllChecked').then((checked) => {
                this.platformsChecked = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        loadPlatforms(){
            Platform.dispatch('allPlatforms');
        },

        changeSeries(){
            if(!this.seriesChecked)
            {
                this.series.forEach(serie => {
                    Serie.update({
                        where: serie.id,
                        data: {
                            checked: false
                        }
                    })
                });

            }
            else{
                this.series.forEach(serie => {
                    Serie.update({
                        where: serie.id,
                        data: {
                            checked: true
                        }
                    })
                });
            }

            Serie.dispatch('allCheckedIds').then((checked) => {
                this.selectedSeries = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        changeSerie(serie){
            Serie.update({
                where: serie.id,
                data: {
                    checked: serie.checked
                }
            })

            Serie.dispatch('allCheckedIds').then((checked) => {
                this.selectedSeries = checked ;
            })

            Serie.dispatch('checkIfAllChecked').then((checked) => {
                this.seriesChecked = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        loadSeries(){
            Serie.dispatch('allSeries');
        },

        changeFranchises(){
            if(!this.franchisesChecked)
            {
                this.franchises.forEach(franchise => {
                    Franchise.update({
                        where: franchise.id,
                        data: {
                            checked: false
                        }
                    })
                });

            }
            else{
                this.franchises.forEach(franchise => {
                    Franchise.update({
                        where: franchise.id,
                        data: {
                            checked: true
                        }
                    })
                });
            }

            Franchise.dispatch('allCheckedIds').then((checked) => {
                this.selectedFranchises = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        changeFranchise(franchise){
            Franchise.update({
                where: franchise.id,
                data: {
                    checked: franchise.checked
                }
            })

            Franchise.dispatch('allCheckedIds').then((checked) => {
                this.selectedFranchises = checked ;
            })

            Franchise.dispatch('checkIfAllChecked').then((checked) => {
                this.franchisesChecked = checked ;
            })
            .finally(() => {
                this.loadGames();
            })
        },
        loadFranchises(){
            Franchise.dispatch('allFranchises');
        }
    },
    mounted(){
        this.loadGenres();
        this.loadPlatforms();
        this.loadSeries();
        this.loadFranchises();
        this.loadGames(true);
    }
}
</script>
