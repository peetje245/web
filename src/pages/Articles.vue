<template>
    <q-page class="flex flex-center">
        artikelen
    </q-page>
</template>

<script>
export default {
    name: 'Articles',
    mounted(){
        this.$store.commit('increment')
        console.log(this.$store.state.count) // -> 1
        console.log('???');
    }
}
</script>
