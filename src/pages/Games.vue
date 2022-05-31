<template>
  <q-page>
        <div class="flex flex-center" v-if="!games.length">
            <q-circular-progress
                indeterminate
                size="50px"
                color="lime"
                class="q-ma-md"
            ></q-circular-progress>
        </div>

        <div v-else class="col-12 row">
            <div class="col-2">
                <q-toolbar class="bg-grey-10 text-white shadow-2">
                    <q-toolbar-title>Filters</q-toolbar-title>
                </q-toolbar>

                <q-list class="q-pa-md bg-grey-10 text-white" dark style="max-width: 318px">

                    <q-item-label header>Authors</q-item-label>

                    <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                        <q-item-section side top>
                            <q-checkbox v-model="check1"></q-checkbox>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ contact.name }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator dark></q-separator>
                    <q-item-label header>Tags</q-item-label>

                    <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                        <q-item-section side top>
                            <q-checkbox v-model="check1"></q-checkbox>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ contact.name }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator dark></q-separator>
                    <q-item-label header>Platforms</q-item-label>

                    <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                        <q-item-section side top>
                            <q-checkbox v-model="check1"></q-checkbox>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ contact.name }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator dark></q-separator>
                    <q-item-label header>Series</q-item-label>

                    <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
                        <q-item-section side top>
                            <q-checkbox v-model="check1"></q-checkbox>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>{{ contact.name }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>

            <div class="col-9 offset-1">
                <div class="row">
                    <q-breadcrumbs class="col-8">
                        <q-breadcrumbs-el label="Home" icon="home"></q-breadcrumbs-el>
                        <q-breadcrumbs-el label="Components"></q-breadcrumbs-el>
                        <q-breadcrumbs-el label="Breadcrumbs"></q-breadcrumbs-el>
                    </q-breadcrumbs>

                     <q-input v-model="search" filled type="search" class="col-3">
                        <template v-slot:append>
                        <q-icon name="search"></q-icon>
                        </template>
                    </q-input>
                </div>
                

                <div class="row">
                    <q-card v-for="game in games" :key="game.id" class="col-11">
                        <q-card-section horizontal>
                            <q-img
                                class="col-5"
                                src="https://cdn.quasar.dev/img/parallax1.jpg"
                            ></q-img>

                            <q-card-section>
                            {{ game.title }}
                            </q-card-section>
                        </q-card-section>

                        <q-separator></q-separator>

                        <q-card-actions>
                            <q-btn flat round icon="event"></q-btn>
                            <q-btn flat>
                                5:30PM
                            </q-btn>
                            <q-btn flat>
                                7:00PM
                            </q-btn>
                            <q-btn flat color="primary">
                                Reserve
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                </div>

                <q-pagination
                    v-model="current"
                    color="purple"
                    :max="10"
                    :max-pages="6"
                    boundary-numbers
                ></q-pagination>
            </div>
        </div>
    </q-page>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'Games',
    data(){
        return{
            contacts: [ 
            {
                id: 1,
                name: 'Ruddy Jedrzej',
                email: 'rjedrzej0@discuz.net',
                letter: 'R'
            }, {
                id: 2,
                name: 'Mallorie Alessandrini',
                email: 'malessandrini1@marketwatch.com',
                letter: 'M'
            }, {
                id: 3,
                name: 'Elisabetta Wicklen',
                email: 'ewicklen2@microsoft.com',
                letter: 'E'
            }, {
                id: 4,
                name: 'Seka Fawdrey',
                email: 'sfawdrey3@wired.com',
                letter: 'S'
            } ],
            check1: false,
            current: 6,
            search: ''
        }
    },
    computed: {
        ...mapState('games', {
            games: 'all'
        })
    },
    mounted(){
        this.$store.dispatch('games/getAllGames');
    }
}
</script>
