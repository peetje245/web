<template>
    <q-page class="flex flex-center row">
        <q-card dark bordered class="bg-grey-9 my-card col-4">
            <q-card-section>
                <div class="text-h6">Registreren</div>
            </q-card-section>

            <q-separator dark inset></q-separator>

            <q-card-section>
                <q-input filled v-model="name" label="Naam"></q-input>

                <q-input v-model="email" filled type="email" label="Email"></q-input>

                <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Wachtwoord">
                    <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    ></q-icon>
                    </template>
                </q-input>

                <q-input v-model="password_confirmation" filled :type="is_password_confirmation ? 'password' : 'text'" label="Wachtwoord bevestigen">
                    <template v-slot:append>
                    <q-icon
                        :name="is_password_confirmation ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="is_password_confirmation = !is_password_confirmation"
                    ></q-icon>
                    </template>
                </q-input>

                <div class="row justify-end">
                    <q-btn
                        type="submit"
                        label="Save"
                        class="q-mt-md"
                        color="primary"
                        @click="register({email, password, name, password_confirmation})"
                    >
                        <template v-slot:loading>
                        <q-spinner-facebook></q-spinner-facebook>
                        </template>
                    </q-btn>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data(){
        return{
            password: '',
            isPwd: true,
            is_password_confirmation: true,
            email: '',
            name: '',
            password_confirmation: ''
        }
    },
    methods:{
        ...mapActions({
            register: 'users/register',
        }),
    }
}
</script>
