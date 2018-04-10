<template>
  <div class="q-py-md min-height bg-white column justify-between">
    <div class="chat-height items-start">
      <div class="q-title text-blue q-ml-md">{{ channelName }}</div>
      <div>
        <div>
          <!--  Single message -->
          <transition-group tag="div" name="list">
            <single-message
              v-for='message in messages'
              :message='message'
              :key='message.id'>
            </single-message>
          </transition-group>
        </div>
      </div>
    </div>

    <!--  Message Form-->
    <message-form></message-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageForm from './MessageForm'
import SingleMessage from './SingleMessage'
import Firebase from 'firebase'

export default {
  name: 'messages',
  components: { MessageForm, SingleMessage },
  data () {
    return {
      messagesRef: Firebase.database().ref('messages'),
      privateMessagesRef: Firebase.database().ref('privateMessages'),
      messages: [],
      channel: null,
      listeners: []
    }
  },
  computed: {
    ...mapGetters(['currentChannel', 'isPrivate']),
    currentUser () {
      return this.$store.getters.getUser
    },
    channelName () {
      if (this.channel !== null) {
        return this.isPrivate
          ? '@' + this.channel.name
          : '#' + this.channel.name
      }
      return 'unknown'
    }
  },
  mounted () {
    this.addListeners()
  },
  watch: {
    currentChannel () {
      this.detachListeners()
      this.addListeners()

      this.channel = this.currentChannel
    }
  },
  methods: {
    addListeners () {
      const ref = this.getMessageRef()
      if (this.currentChannel != null) {
        ref.child(this.currentChannel.id).on('child_added', snap => {
          const message = snap.val()
          message.id = snap.key
          this.messages.push(message)

          this.$nextTick(() => {
            /* global $ */
            /* eslint no-undef: 'error' */
            $('html, body').scrollTop($(document).height())
          })
        })

        this.addToListeners(this.currentChannel.id, ref, 'child_added')
      }
    },
    addToListeners (id, ref, event) {
      const index = this.listeners.findIndex(
        el => el.id === id && el.ref === ref && el.event === event
      )
      if (index === -1) {
        this.listeners.push({
          id,
          ref,
          event
        })
      }
    },
    detachListeners () {
      this.listeners.forEach(listener => {
        listener.ref.child(listener.id).off(listener.event)
      })

      this.listeners = []
      this.messages = []
      const ref = this.getMessageRef()
      if (this.channel !== null) {
        ref.child(this.channel.id).off('child_added')
      }
    },
    getMessageRef () {
      if (this.isPrivate) {
        return this.privateMessagesRef
      }
      return this.messagesRef
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>

<style lang='css' scoped>
.min-height {
  min-height: 75%;
}
.list-enter-active {
  transition: all 0.3s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.chat-height {
  margin-bottom: 35%;
}
</style>
