import ideas from './../../data/ideas.js'

const state = {
  ideas: []
}

const mutations = {
  'SET_IDEAS' (state, ideas) {
    state.ideas = ideas
  }
}

const actions = {
  initIdeas: ({commit}) => {
    commit('SET_IDEAS', ideas)
  }
}

const getters = {
  ideas: state => {
    return state.ideas
  }
}

export default {
  state, mutations, actions, getters
}
