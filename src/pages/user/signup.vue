<template>
  <div id="signup" class="row">
    <q-card flat class="centered col-xs-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <q-card-media class="bg-white">
        <img width="30px" class="q-pa-lg" src="~assets/eslogo.svg">
      </q-card-media>
      <q-card-title class="bg-white">Sign-up</q-card-title>
      <q-card-main class="bg-white">
        <form @submit.prevent="onSubmit">
          <q-field
            class="q-py-sm"
            name="email"
            type="email"
            id="email"
            :error="$v.email.$error"
            error-label="Provide a valid email address"
            :after="[{icon: 'warning', error: true}]"
            required>
            <q-input
              float-label="Email"
              placeholder="email"
              @blur="$v.email.$touch()"
              v-model="email"
            />
          </q-field>
          <q-field
            class="q-py-sm"
            name="age"
            type="number"
            id="age"
            :error="$v.age.$error"
            required>
            <q-input
              float-label="Your Age"
              placeholder="your age"
              @blur="$v.age.$touch()"
              v-model.number="age"
            />
          </q-field>
          <q-field
            class="q-py-sm"
            name="password"
            type="password"
            id="password"
            :error="$v.password.$error"
            required>
            <q-input
              float-label="Password"
              placeholder="password"
              @blur="$v.password.$touch()"
              v-model="password"
            />
          </q-field>
          <q-field
            class="q-py-sm"
            name="confirmpassword"
            type="password"
            id="confirm-password"
            :error="$v.confirmPassword.$error"
            required>
            <q-input
              float-label="Confirm password"
              placeholder="confirm password"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            />
          </q-field>
          <q-field
            class="q-py-sm"
            name="country"
            label="Select your country"
            id="country"
            required>
            <q-select
              v-model="country"
              :options="selectOptions"
            />
          </q-field>
          <q-field
            class="q-py-sm"
            label="Accept Terms of Use"
            id="terms"
            :error="$v.terms.$error"
            required>
            <q-checkbox
              @change="$v.terms.$touch()"
              v-model="terms"
            />
          </q-field>
          <q-card-actions class="relative-position submit-button">
            <div class="submit absolute-center">
              <q-btn loader icon="input" color="primary" type="submit" :disabled="loading || $v.$invalid" :loading="loading">Submit</q-btn>
            </div>
          </q-card-actions>
        </form>
      </q-card-main>
    </q-card>
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

export default {
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
  computed: {
    loading () {
      return this.$store.getters.loading
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

  .centered {
    margin: auto;
  }
</style>
