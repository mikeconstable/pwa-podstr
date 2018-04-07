<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Firebase from 'firebase'
import { config } from './plugins/firebase'

export default {
  name: 'App',
  created () {
    this.$router.push('/')
    this.$store.dispatch('initPods')
    this.$store.dispatch('initIdeas')
    Firebase.initializeApp(config)
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}
</script>

<style>
</style>
