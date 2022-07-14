<template>
  <q-page>
        <div class="flex flex-center" v-if="!game">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else class="row" style="padding-top: 25px; padding-bottom: 25px;">
            <q-card class="col-10 offset-1">
                <q-carousel
                    v-model="image"
                    swipeable
                    animated
                    control-type="flat"
                    control-color="purple"
                    navigation
                    padding
                    arrows
                    class="text-purple rounded-borders"
                >
                    <q-carousel-slide 
                        v-for="image in game.images"
                        :key="image.id"
                        :name="image.name" 
                        :img-src="url + image.name"
                    ></q-carousel-slide>
                </q-carousel>

                <q-card-section class="row">
                    <div class="col-9">
                        <q-card-section class="text-h6">
                            {{ game.title }}
                        </q-card-section>

                        <q-card-section class="text-body1">
                            {{game.description}}
                        </q-card-section>
                    </div>

                    <div class="col-3">
                        <div v-if="game.developer">
                            {{$t('game.developer')}}:

                            <q-btn
                                padding="none"
                                color="primary"
                                :label='game.developer.name'
                                flat
                            ></q-btn>
                            
                        </div>

                        <div v-if="game.publisher">
                            {{$t('game.publisher')}}:

                            <q-btn
                                padding="none"
                                color="primary"
                                :label='game.publisher.name'
                                flat
                            ></q-btn>
                        </div>

                        <div v-if="game.franchise">
                            {{$t('game.franchise')}}:

                            <q-btn
                                padding="none"
                                color="primary"
                                :label='game.franchise.title'
                                flat
                            ></q-btn>
                        </div>

                        <div v-if="game.serie">
                            {{$t('game.serie')}}:

                            <q-btn
                                padding="none"
                                color="primary"
                                :label='game.serie.name'
                                flat
                            ></q-btn>
                        </div>

                        <div class="row" v-if="game.genres && game.genres.length">
                            {{$t('game.genres')}}: 
                            <q-btn
                                rounded
                                color="primary"
                                size="sm"
                                :label="genre.title"
                                v-for="genre in game.genres" :key='genre.id'
                            ></q-btn>
                        </div>

                        <div class="row" v-if="game.platforms && game.platforms.length">
                            {{$t('game.platforms')}}: 
                            <q-btn
                                rounded
                                color="primary"
                                size="sm"
                                :label="platform.title"
                                v-for="platform in game.platforms" :key='platform.id'
                            ></q-btn>
                        </div>
                    </div>
                    
                </q-card-section>

                <q-carousel
                    v-model="video"
                    swipeable
                    animated
                    control-type="flat"
                    control-color="purple"
                    navigation
                    padding
                    arrows
                    class="text-purple rounded-borders"
                    v-if="game.videos && game.videos.length"
                    >
                    <q-carousel-slide v-for="video in game.videos" :name="video.name" :key='video.id'>
                        <q-video
                            class="absolute-full"
                            :src="video.link"
                        ></q-video>
                    </q-carousel-slide>
                </q-carousel>
            </q-card>

            <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 68]">
                <q-btn fab icon="keyboard_arrow_up" color="accent"></q-btn>
            </q-page-scroller>
        </div>
    </q-page>
</template>

<script>

import Game from '../../../store/models/Game'

export default {
    name: 'Game',
    data(){
        return{
            url: process.env.IMAGE_PATH,
            image: null,
            video: null,
            game: null,
        }
    },
    watch:{
        game(){
            this.image = this.game.images && this.game.images.length ? this.game.images[0].name : '';
            this.video = this.game.videos && this.game.videos.length ? this.game.videos[0].name : '';
        }
    },
    mounted(){
        Game.dispatch('gameById', this.$route.params.id).then((response) => {
            this.game = response;
        });
    }
}
</script>
