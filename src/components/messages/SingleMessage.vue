<template>
    <q-chat-message
      :avatar="message.user.avatar"
      :sent="userCheck"
      :bg-color="bgCheck"
      :text-color="textCheck"
      :stamp="message.timestamp | fromNow"
      :name="message.user.name"
      class="q-px-sm"
    >
      <div v-if="!isFile(message)">
        {{ message.content }}
      </div>
      <img
        class=""
        :src="message.image"
        alt="image"
        v-else
      >
    </q-chat-message>
</template>

<script>
import moment from 'moment'

export default {
  name: 'single-message',
  props: ['message'],
  computed: {
    currentUser () {
      return this.$store.getters.getUser
    },
    userCheck () {
      if (this.$q.platform.is.mobile) {
        return this.selfMessage(this.message.user)
      }
    },
    bgCheck () {
      if (this.selfMessage(this.message.user)) {
        return 'blue'
      }
      else {
        return 'green'
      }
    },
    textCheck () {
      if (this.selfMessage(this.message.user)) {
        return 'white'
      }
      else {
        return 'black'
      }
    }
    // commentSelfClass () {
    //   if (this.selfMessage(this.message.user)) {
    //     return 'comment__self'
    //   }
    // }
  },
  methods: {
    selfMessage (user) {
      return user.id === this.currentUser.uid
    },
    isFile (message) {
      return message.content == null && message.image != null
    }
  },
  filters: {
    fromNow (value) {
      return moment(value).fromNow()
    }
  }
}
</script>

<style lang="css">
.comment__container pre {
  font-size: 0.9em;
  background: #232323;
  box-shadow: 3px 6px 9px 0px #a2a2a2;
}

.comment__self {
  border-left: 10px solid orange;
  padding-left: 8px;
}

.comment__image {
  min-height: 100px;
  margin-top: 16px;
}

.comment__date {
  color: #767676;
}
</style>
