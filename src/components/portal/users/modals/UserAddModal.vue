<template>
    <q-page>
        <q-dialog v-model="confirm" persistent>
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{$t('user.add')}}</div>
                    <q-space></q-space>
                    <q-btn icon="close" flat round dense @click="close" v-close-popup></q-btn>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div class="col-12 q-gutter-md">
                        <q-banner v-if="nameError" inline-actions class="text-white bg-red">
                            {{$t('required.name')}}
                        </q-banner>
                        <q-input filled v-model="name" :label="$t('user.name')"></q-input>

                        <q-input filled v-model="username" :label="$t('user.username')"></q-input>

                        <q-banner v-if="emailError" inline-actions class="text-white bg-red">
                            {{$t('required.email')}}
                        </q-banner>
                        <q-input v-model="email" filled type="email" :label="$t('user.email')"></q-input>

                        <q-banner v-if="roleError" inline-actions class="text-white bg-red">
                            {{$t('required.role')}}
                        </q-banner>

                        <q-select
                            filled
                            v-model="selectedRole"
                            :options="roles"
                            :label="$t('user.role')"
                            options-selected-class="text-deep-orange"
                            option-label='title'
                        >
                            <template v-slot:option="scope">
                                <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                >
                                    <q-item-section>
                                    <q-item-label>{{$t('role.'+ scope.opt.title.toLowerCase())}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>

                            <template v-slot:selected>
                                <div v-if="selectedRole">
                                    {{$t('role.'+ selectedRole.title.toLowerCase())}}
                                </div>
                            </template>
                        </q-select>
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

import User from '../../../../store/models/User'
import Role from '../../../../store/models/Role'

export default {
    name: 'UserAddModal',
    data(){
        return{
            confirm: true,

            name: '',
            username: '',
            email: '',
            selectedRole: null,

            nameError: false,
            emailError: false,
            roleError: false,
        }
    },
    computed: {
        roles () {
            return Role.all();
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

            if(!this.email.length){
                this.emailError = true;
            }
            else{
                this.emailError = false;
            }

            if(!this.selectedRole){
                this.roleError = true;
            }
            else{
                this.roleError = false;
            }

            if(!this.nameError && !this.emailError && !this.roleError){
                let data = {
                    name: this.name,
                    email: this.email,
                    role_id: this.selectedRole.id
                }

                if(this.username.length){
                    data.username = this.username
                }
                
                User.dispatch('addUser', data);
                this.$emit('close');
            }
        }
    }
}
</script>
