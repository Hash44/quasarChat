export default {
    computed: {
        otherUserDetails() {
            if ( this.$store.state.chatStore.users[this.$route.params.otherUserId]){
                return  this.$store.state.chatStore.users[this.$route.params.otherUserId]
            }
            else {
                return {}
            }
        }
    }
}