import Firebase from 'firebase'
import router from './../../router/index'
import axios from 'axios'
import { Notify } from 'quasar'

export default {
  state: {
    currentUser: null
  },
  getters: {
    getUser (state) {
      return state.currentUser
    }
  },
  mutations: {
    setUser (state) {
      state.currentUser = Firebase.auth().currentUser
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }
          commit('setUser', newUser)
          router.replace('Profile')
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            alert(error.message)
            console.log(error)
          }
        )
      axios.post('https://podstr-vue-q-pwa.firebaseio.com/users.json', payload)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            router.replace('/')
            const welcome = 'Welcome back ' + payload.email
            Notify.create(welcome)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            alert(error.message)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      })
    },
    logout ({commit}) {
      Firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          router.replace('/')
        })
    }
  }
}
