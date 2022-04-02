<template>
  <router-view />
</template>

<script>
  import { mapActions } from "vuex"
  export default{
    methods: {
      ...mapActions('actions', ['handleAuthStateChanged'])
    },
    mounted(){
      this.handleAuthStateChanged()
    }
  }
</script>
