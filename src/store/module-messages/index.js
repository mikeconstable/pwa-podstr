import messages from './../../data/messages.js'

const state = {
  messages: []
}

const mutations = {
  'MESSAGES' (state, ideas) {
    state.messages = messages
  }
}

const actions = {
  initIdeas: ({commit}) => {
    commit('MESSAGES', messages)
  }
}

const getters = {
  messages: state => {
    return state.messages
  }
}

export default {
  state, mutations, actions, getters
}
