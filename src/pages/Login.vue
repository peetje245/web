<template>
    <q-page class="flex flex-center row">
        <q-card dark bordered class="bg-grey-9 my-card col-4">
            <q-card-section>
                <div class="text-h6">Inloggen</div>
            </q-card-section>

            <q-separator dark inset></q-separator>

            <q-card-section>
                <q-form
                    @submit="login({email, password})"
                    class="q-gutter-md"
                >

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

                <!-- <div class="row justify-end">
                    <q-btn
                        type="submit"
                        label="Save"
                        class="q-mt-md"
                        color="primary"
                        @click="login({email, password})"
                    >
                        <template v-slot:loading>
                        <q-spinner-facebook></q-spinner-facebook>
                        </template>
                    </q-btn>
                </div> -->

                <div>
                    <q-btn label="Submit" type="submit" color="primary"></q-btn>
                </div>

                </q-form>
                <p>
                    Heb je nog geen account? Maak er dan <q-btn flat color="primary" label="hier" @click="redirectRegister"></q-btn> een aan!
                </p>
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
            email: '',
        }
    },
    methods:{
        ...mapActions({
            login: 'users/login',
        }),
        redirectRegister(){
            this.$router.push('/register')
        }
    }
}
</script>
