<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-green-8">
          <q-btn
            v-if="$route.fullPath.includes('/chat')" 
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
          type="button"
        
        />
          <q-btn
          v-else
          @click.prevent="logoutUser"
          class="absolute-right  q-pr-md"
          icon="account_circle"
          no-caps
          flat
          type="button"
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
import mixinOtherUserDetails from 'src/mixins/mixinOtherUserDetails.js'

export default{
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState('chatStore', ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return ('Welcome to the chat')
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath == '/auth') return ('Login')
    },
  },
  methods: {
    ...mapActions('chatStore', ['logoutUser'])
  }

}
</script>


<style lang="stylus">

  .q-toolbar
    .q-btn
      line-height: 1.2

</style>