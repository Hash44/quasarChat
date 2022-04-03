<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-green-8">
        <q-btn
          v-show="$route.fullPath.includes('/chat')"
          to="/"
          icon="arrow_back"
          flat
          dense
          label="Back"
        
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right  q-pr-md"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
        
        />
          <q-btn
          vv-else
          to="/auth"
          class="absolute-right  q-pr-md"
          icon="account_circle"
          no-caps
          flat
          dense>
          Logout<br>
          {{ userDetails.name }}
          </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapActions, mapState } from "vuex"

export default{
  name: 'MainLayout',
  computed: {
    ...mapState('chatStore', ['userDetails']),
    title() {
      console.log(this.$route)
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return ('Welcome to the chat')
      else if (currentPath == '/chat') return ('Chat')
      else if (currentPath == '/auth') return ('Login')

    }
  },

  





}
</script>
