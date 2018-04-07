<template>
  <div class="column justify-center items-center window-height">
    <q-card flat class="col-xs-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 q-ma-md">
      <q-card-media class="bg-white">
        <img width="30px" class="q-pa-lg" src="~assets/eslogo.svg">
      </q-card-media>
      <q-card-title class="bg-white">Sign-in</q-card-title>
      <q-card-main class="bg-white">
        <div>
          <form @submit.prevent="onSignin">
            <q-field
              class="q-py-sm"
              id="email"
              :error="$v.email.$error"
              error-label="Provide a valid email address"
              :after="[{icon: 'warning', error: true}]"
              required>
              <q-input
                float-label="Email"
                type="email"
                placeholder="email"
                @blur="$v.email.$touch()"
                v-model="email"
              />
            </q-field>
            <q-field
              class="q-py-sm"
              id="password"
              :error="$v.password.$error"
              required>
              <q-input
                label="Password"
                type="password"
                placeholder="password"
                @blur="$v.password.$touch()"
                v-model="password"
              />
            </q-field>
            <div class="q-pa-md">
              <q-btn
                loader
                icon="lock_open"
                color="primary"
                type="submit"
                :disabled="loading"
                :loading="loading">
                Sign in
              </q-btn>
            </div>
          </form>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  // watch: {
  //   user (value) {
  //     if (value !== null && value !== undefined) {
  //       this.$router.push('/profile')
  //     }
  //   }
  // },
  methods: {
    onSignin () {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      this.$store.dispatch('signUserIn', formData)
    }
  }
}
</script>

<style scoped>
</style>
