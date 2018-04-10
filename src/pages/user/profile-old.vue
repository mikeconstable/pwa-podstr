<template>
  <div id="signup" class="row">
    <q-card flat class="centered col-xs-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <q-card-media>
        <!-- <img height="150px" src="~assets/podstr-logo2-fullc.svg"> -->
      </q-card-media>
      <!-- <q-card-title>Sign-up</q-card-title> -->
      <q-card-main>
        <form @submit.prevent="onSubmit">
          <div class="text-left">
            <q-input
              name="email"
              float-label="Email"
              type="email"
              id="email"
              placeholder="email"
              @blur="$v.email.$touch()"
              v-model="user.email"
              :error="$v.email.$error"
              error-label="Provide a valid email address"
              :after="[{icon: 'warning', error: true}]"
              required />
          </div>
          <div class="text-left">
            <q-input
              name="age"
              float-label="Your Age"
              type="number"
              id="age"
              placeholder="your age"
              @blur="$v.age.$touch()"
              :error="$v.age.$error"
              v-model.number="userProfile.age"
              required />
          </div>
          <div class="text-left">
            <q-input
              name="password"
              float-label="Password"
              type="password"
              id="password"
              placeholder="password"
              @blur="$v.password.$touch()"
              :error="$v.password.$error"
              v-model="password"
              required />
          </div>
          <div class="text-left">
            <q-input
              name="confirmpassword"
              float-label="Confirm password"
              type="password"
              id="confirm-password"
              placeholder="confirm password"
              @blur="$v.confirmPassword.$touch()"
              :error="$v.confirmPassword.$error"
              v-model="confirmPassword"
              required />
          </div>
          <div class="text-left">
            <q-select
              name="country"
              float-label="Select your country"
              id="country"
              v-model="userProfile.country"
              :options="selectOptions"
              required />
          </div>
          <div class="text-left">
            <q-checkbox
              label="Accept Terms of Use"
              id="terms"
              @change="$v.terms.$touch()"
              :error="$v.terms.$error"
              v-model="userProfile.terms" />
          </div>
          <q-card-actions class="relative-position submit-button">
            <div class="submit absolute-center">
              <q-btn loader icon="input" color="primary" type="submit" :disabled="loading || $v.$invalid" :loading="loading">Update</q-btn>
            </div>
          </q-card-actions>
        </form>
      </q-card-main>
    </q-card>
    <div class="bg-light fixed-bottom">
      <p>You are logged in as {{ user.email }}</p>
      <small>Auth Id: {{ user.uid }}</small>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  numeric,
  minValue,
  minLength,
  sameAs,
  requiredUnless }
  from 'vuelidate/lib/validators'
// import axios from 'axios'

export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    userProfile () {
      return this.$store.getters.getUserProfile
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
      email: '',
      age: null,
      password: '',
      confirmPassword: '',
      country: 'UK',
      terms: false,
      selectOptions: [
        {label: 'UK', value: 'UK'},
        {label: 'USA', value: 'USA'},
        {label: 'Germany', value: 'Germany'},
        {label: 'France', value: 'France'}
      ]
    }
  },
  validations: {
    email: {
      required,
      email
    },
    age: {
      required,
      numeric,
      minVal: minValue(18)
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      samesAs: sameAs('password')
    },
    terms: {
      required: requiredUnless(vm => {
        return vm.country === 'Germany'
      })
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        age: this.age,
        password: this.password,
        confirmPassword: this.confirmPassword,
        country: this.country,
        terms: this.terms
      }
      console.log(formData)
      this.$store.dispatch('signUserUp', formData)
    }
  }
}
</script>

<style scoped>
  .submit-button {
    margin-top: 25px;
  }
</style>
