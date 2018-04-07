import Vue from 'vue'
import Vuex from 'vuex'

import user from './module-user'
import pods from './module-pods'
import ideas from './module-ideas'
import messages from './module-messages'
import chat from './module-chat'
import shared from './module-shared'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    pods,
    ideas,
    messages,
    chat,
    shared
  }
})

export default store
