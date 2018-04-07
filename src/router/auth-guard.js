import store from './../store/index'

export default (to, from, next) => {
  if (store.getters.getUser) {
    next()
  }
  else {
    next('/signin')
  }
}
