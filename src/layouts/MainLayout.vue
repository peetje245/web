<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="bg-black text-white">
                <!-- <q-btn @click="redirectArticles" :color="getActive('articles')" flat :label="$t('menuItem.articles')"></q-btn>
                <q-separator dark vertical inset></q-separator> -->

                <q-btn @click="redirectGames" :color="getActive('games')" flat :label="$t('menuItem.games')"></q-btn>
                <q-separator dark vertical inset></q-separator>

                <q-btn @click="redirectCalendar" :color="getActive('calendar')" flat :label="$t('menuItem.calendar')"></q-btn>

                <q-space></q-space>

                <q-toolbar-title>
                    Sacred gaming
                </q-toolbar-title>

                <q-space></q-space>

                <q-btn @click="redirectLogin" :color="getActive('login')" flat :label="$t('menuItem.signIn')"></q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>

export default {
    name: 'MainLayout',
    data () {
        return {}
    },
    methods:{
        getActive(link){
            const currentRoute = this.$router.currentRoute.fullPath;
            
            // if(currentRoute === '/' && link === 'articles'){
            //     return 'primary'
            // }

            // if(currentRoute === '/games' && link === 'games'){
            //     return 'primary'
            // }

            if(currentRoute === '/' && link === 'games'){
                return 'primary'
            }

            if(currentRoute === '/calendar' && link === 'calendar'){
                return 'primary'
            }

            return 'white';
        },
        // redirectArticles(){
        //     this.$router.push('/');
        // },
        redirectGames(){
            this.$router.push('/');
            // this.$router.push('/games');
        },
        redirectCalendar(){
            this.$router.push('/calendar');
        },
        redirectLogin(){
            this.$router.push('/login');
        }
    }
}
</script>
