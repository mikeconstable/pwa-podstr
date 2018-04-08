<template>
  <div id="signup" class="flex flex-center window-height">
    <q-card flat class="items-center col-xs-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <q-card-media class="bg-white">
        <img class="q-pa-xl" src="~assets/eslogo.svg">
      </q-card-media>
      <!-- <q-card-title class="bg-white">Sign-in</q-card-title> -->
      <q-card-main class="bg-white">
        <div class="q-pb-lg" id="firebaseui-auth-container"></div>
        <!-- <div id="loader">Loading...</div> -->
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'signup',
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/dashboard',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style scoped>
</style>
