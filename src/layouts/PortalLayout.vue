<template>
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
        <q-header elevated class="bg-black">
            <q-toolbar>
                <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
                    <q-toolbar-title>
                        Sacred gaming
                    </q-toolbar-title>
                    <q-btn flat round dense icon="gamepad">
                        <q-menu>
                            <q-list style="min-width: 100px">
                                <q-item clickable v-close-popup>
                                    <q-item-section>{{$t('menuItem.account')}}</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section>{{$t('menuItem.signOut')}}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="drawer"
            show-if-above
            :width="200"
            :breakpoint="500"
            bordered
            class="bg-grey-3"
        >
            <q-scroll-area class="fit">
            <q-list>

                <template v-for="(menuItem, index) in menuList" >
                <q-item 
                    :key="index" 
                    clickable 
                    :active="getActive(menuItem.label)" 
                    v-ripple
                    @click="redirect(menuItem.label)"
                    active-class="my-menu-link"
                >
                    <q-item-section>
                        {{$t('menuItem.' + menuItem.label)}}
                    </q-item-section>
                </q-item>
                <q-separator :key="'sep' + index"  v-if="menuItem.separator"></q-separator>
                </template>

            </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>

import router from '../router'

export default {
    name: 'PortalLayout',
    data () {
        return {
            drawer: false,
            menuList: [
                {
                    label: 'dashboard',
                    separator: false
                },
                {
                    label: 'users',
                    separator: false
                },
                {
                    label: 'articles',
                    separator: false
                },
                {
                    label: 'games',
                    separator: false
                },
                {
                    label: 'platforms',
                    separator: false
                },
                {
                    label: `genres`,
                    separator: false
                },
                {
                    label: 'series',
                    separator: false
                },
                {
                    label: 'publishers',
                    separator: false
                },
                {
                    label: 'developers',
                    separator: false
                },
                {
                    label: 'franchises',
                    separator: false
                },
            ]
        }
    },
    methods:{
        getActive(link){
            const currentRoute = this.$router.currentRoute.fullPath;

            if(currentRoute === '/portal/' + link){
                return true;
            }
            
            return false;
        },
        redirect(link){
            this.$router.push('/portal/' + link);
        }
    }
}
</script>

<style scoped>
    .my-menu-link{
        color: white;
        background: #F2C037;
    }
</style>
