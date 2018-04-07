import pods from './../../data/pods.js'

const state = {
  pods: []
}

const mutations = {
  'SET_PODS' (state, pods) {
    state.pods = pods
  }
}

const actions = {
  initPods: ({commit}) => {
    commit('SET_PODS', pods)
  }
}

const getters = {
  pods: state => {
    return state.pods
  }
}

export default {
  state, mutations, actions, getters
}
