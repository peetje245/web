<template>
    <q-page class="flex flex-center row">
        <q-card dark bordered class="bg-grey-9 my-card col-4">
            <q-card-section>
                <div class="text-h6">Inloggen</div>
            </q-card-section>

            <q-separator dark inset></q-separator>

            <q-card-section>
                <q-input v-model="text" filled label="Standard"></q-input>

                <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password">
                    <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    ></q-icon>
                    </template>
                </q-input>

                <div class="row justify-end">
                    <q-btn
                        type="submit"
                        label="Save"
                        class="q-mt-md"
                        color="primary"
                    >
                        <template v-slot:loading>
                        <q-spinner-facebook></q-spinner-facebook>
                        </template>
                    </q-btn>
                </div>
                <p>
                    Heb je nog geen account? Maak er dan <a href="#">hier</a> een aan!
                </p>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>

export default {
    name: 'Login',
    data(){
        return{
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            password: '',
            isPwd: true,
            text: ''
        }
    },
    computed: {
    },
    mounted(){
    }
}
</script>
