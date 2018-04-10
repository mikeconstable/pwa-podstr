<template lang="html">
  <div class="flex">
    <div class="full-width">
      <div class="row q-pa-sm justify-between items-center">
        <div>
          <img class="avatar" :src="currentUser.photoURL" alt="avatar">
        </div>
        <div class="">
          <div class="">
            <div class="q-title">
              {{ currentUser.displayName }}
            </div>
          </div>
        </div>
        <div>
          <q-btn fab-mini color="secondary" class="" @click.native="logout">
              <q-icon name="exit_to_app"/>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'connected-user',
  data () {
    return {
      presenceRef: Firebase.database().ref('presence')
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    logout () {
      this.presenceRef.child(this.currentUser.uid).remove()
      Firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css" scoped>

.connectedUser__container {
  position: absolute;
  background-color: red;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 90px;
  padding: 8px;
  box-shadow: -4px 1px 8px 3px black;
}

.user_component {
  padding-top: 10px;
}
.avatar {
  height: 37px;
  width: 37px;
}
</style>
