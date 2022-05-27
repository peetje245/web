<template>
    <q-page class="flex flex-center">
        artikelen

        <ul>
            <li
                v-for="article in articles"
                :key="article.id"
            >
                {{article.title}}
            </li>
        </ul>
    </q-page>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Articles',
    computed: {
        ...mapState('articles', {
            articles: 'all'
        })
    },
    watch: {
        articles() {
            console.log(this.$store)
        }
    },
    methods:{
        ...mapMutations('articles', {
            add: 'test' // map `this.add()` to `this.$store.commit('increment')`
        })
    },
    mounted(){
        console.log('articles', this.articles)

        console.log('???', this.add())

        // this.$store.dispatch('articles/test').then(() => {
        //     console.log('????')
        // }).catch((e) => {
        //     console.log("company cannot be loaded", e)
        // })

        this.$store.dispatch('articles/setAllArticles')
    }
}
</script>
