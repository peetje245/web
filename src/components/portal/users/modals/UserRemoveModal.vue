<template>
    <q-page>
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('user.delete')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <div class="text">{{$t('user.removeConfirmText')}}</div>
                    </div>
                    
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="$t('cancel')" color="primary" @click="close" v-close-popup></q-btn>
                    <q-btn :label="$t('delete')" color="primary" @click="destroy"></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>

export default {
    name: 'UserRemoveModal',
    props: {
        user: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            confirm: true,
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        destroy(){
            this.$store.dispatch('users/destroyUser', this.user.id);
            this.$emit('close');
        }
    },
}
</script>
