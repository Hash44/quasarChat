<template>
  <router-view />
</template>

<script>
  import { mapActions } from "vuex"
  export default{
    methods: {
      ...mapActions('chatStore', ['handleAuthStateChanged'])
    },
    mounted(){
      this.handleAuthStateChanged()
    }
  }
</script>
