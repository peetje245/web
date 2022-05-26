<template>
    <q-page class="flex flex-center">
        artikelen
    </q-page>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'Articles',
    computed: {
        ...mapGetters('articles', [
            'allArticles',
        ])
    },
    mounted(){
        this.$store.commit('articles/increment')
        console.log(this.$store.state.articles.count);
        console.log('this.allArticles', this.allArticles)
    }
}
</script>
