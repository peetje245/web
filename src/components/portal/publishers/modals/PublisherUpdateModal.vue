<template>
   <q-page v-if="publisher">
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('publisher.update')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="nameError" inline-actions class="text-white bg-red">
                            {{$t('required.name')}}
                        </q-banner>
                        <q-input filled v-model="name" :label="$t('publisher.name')"></q-input>

                        <q-banner v-if="headquarterError" inline-actions class="text-white bg-red">
                            {{$t('required.headquarter')}}
                        </q-banner>
                        <q-input filled v-model="headquarter" :label="$t('publisher.headquarter')"></q-input>

                        <q-banner v-if="establishedError" inline-actions class="text-white bg-red">
                            {{$t('required.established')}}
                        </q-banner>
                        <q-input filled v-model="established" :label="$t('publisher.established')"></q-input>
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

export default {
    name: 'PublisherUpdateModal',
    props: {
        publisher: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            confirm: true,

            name: this.publisher.name,
            headquarter: this.publisher.headquarter,
            established: this.publisher.established,

            nameError: false,
            headquarterError: false,
            establishedError: false,
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        save(){
            if(!this.name.length){
                this.nameError = true;
            }
            else{
                this.nameError = false;
            }

            if(!this.headquarter.length){
                this.headquarterError = true;
            }
            else{
                this.headquarterError = false;
            }

            if(!this.established.length){
                this.establishedError = true;
            }
            else{
                this.establishedError = false;
            }

            if(!this.nameError && !this.headquarterError && !this.establishedError){
                let data = {
                    id: this.publisher.id,
                    name: this.name,
                    headquarter: this.headquarter,
                    established: this.established,
                }
                
                this.$store.dispatch('publishers/updatePublisher', data);
                this.$emit('close');
            }
        }
    }
}
</script>
