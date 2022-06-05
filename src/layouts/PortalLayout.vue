<template>
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
            <q-toolbar-title>
                Sacred gaming
            </q-toolbar-title>
          <q-btn flat round dense icon="gamepad">
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>Account</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>Uitloggen</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" >
              <q-item :key="index" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator"></q-separator>
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>

export default {
    name: 'PortalLayout',
    data () {
        return {
            drawer: false,
            menuList: [
                {
                    label: 'Gebruikers',
                    separator: false
                },
                {
                    label: 'Artikelen',
                    separator: false
                },
                {
                    label: 'Games',
                    separator: false
                },
                {
                    label: 'Platforms',
                    separator: false
                },
                {
                    label: `Genre's`,
                    separator: false
                },
                {
                    label: 'Series',
                    separator: false
                },
                {
                    label: 'Uitgeverij',
                    separator: false
                },
                {
                    label: 'Ontwikkelaars',
                    separator: false
                }
            ]
        }
    },
    methods:{}
}
</script>
