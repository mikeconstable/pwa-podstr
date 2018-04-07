import Firebase from 'firebase'

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.use(Firebase)
}

export const config = {
  apiKey: 'AIzaSyALyriKMjLduCWNDtNModpu3qSYIIMUBWk',
  authDomain: 'podstr-vue-q-pwa.firebaseapp.com',
  databaseURL: 'https://podstr-vue-q-pwa.firebaseio.com',
  projectId: 'podstr-vue-q-pwa',
  storageBucket: 'podstr-vue-q-pwa.appspot.com',
  messagingSenderId: '987128417904'
}
