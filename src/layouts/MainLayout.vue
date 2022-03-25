<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-green-8">
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',
  computed: {
    title() {
      console.log(this.$route)
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return ('Welcome to the chat')
      else if (currentPath == '/chat') return ('Chat')
      else if (currentPath == '/auth') return ('Login')

    }
  },

  





})
</script>
