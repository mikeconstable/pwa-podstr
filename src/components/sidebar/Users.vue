<template lang='html'>
    <div class="users__container">
        <h2 class="listings_header">Users</h2>
        <div class="ui feed" v-for="user in users"
            :key="user.uid"
            :class="{'is_active': isActive(user), 'has_unread': getNotification(user) > 0}"
            @click.prevent='changeChannel(user)'>
            <div class="event">
                <div class="label">
                    <img :src='user.avatar' alt='avatar'>
                </div>
                <div class='content'>
                    <span class="ui empty circular label connection__label"
                    :class="{'olive': isOnline(user), 'red': !isOnline(user)}">
                    </span>
                    {{ user.name }}
                    <div class="ui label unread channel__count" v-if="getNotification(user ) >= 1">
                        {{ getNotification(user)  }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Firebase from 'firebase'
import mixin from '../mixins'

export default {
  name: 'users',
  data () {
    return {
      users: [],
      usersRef: Firebase.database().ref('users'),
      conntectedRef: Firebase.database().ref('.info/connected'),
      presenceRef: Firebase.database().ref('presence'),
      privateMessagesRef: Firebase.database().ref('privateMessages'),
      notifCount: [],
      channel: null
    }
  },
  mixins: [mixin],
  computed: {
    ...mapGetters(['currentUser', 'currentChannel', 'isPrivate'])
  },
  watch: {
    isPrivate () {
      if (!this.isPrivate) {
        this.resetNotification()
      }
    }
  },
  mounted () {
    this.addListeners()
  },
  methods: {
    addListeners () {
      this.usersRef.on('child_added', snap => {
        if (this.currentUser.uid !== snap.key) {
          const user = snap.val()
          user.uid = snap.key
          user.status = 'offline'
          this.users.push(user)
        }
      })

      this.presenceRef.on('child_added', snap => {
        if (this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key)
          const channelId = this.getChannelId(snap.key)

          this.privateMessagesRef.child(channelId).on('value', snap => {
            this.handleNotifications(
              channelId,
              this.currentChannel.id,
              this.notifCount,
              snap
            )
          })
        }
      })

      this.presenceRef.on('child_removed', snap => {
        if (this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key, false)

          this.privateMessagesRef.child(this.getChannelId(snap.key)).off()
        }
      })

      this.conntectedRef.on('value', snap => {
        if (snap.val() === true) {
          const ref = this.presenceRef.child(this.currentUser.uid)
          ref.set(true)
          ref.onDisconnect().remove(err => {
            if (err !== null) {
              // console.log(err)
            }
          })
        }
      })
    },
    addStatusToUser (userId, connected = true) {
      const index = this.users.findIndex(user => user.uid === userId)
      if (index !== -1) {
        if (connected === true) {
          this.users[index].status = 'online'
        }
        else {
          this.users[index].status = 'offline'
        }
      }
    },
    detachListeners () {
      this.usersRef.off()
      this.presenceRef.off()
      this.conntectedRef.off()
    },
    isOnline (user) {
      return user.status === 'online'
    },
    changeChannel (user) {
      if (this.channel === null) {
        this.resetNotification(user)
      }
      else {
        this.resetNotification()
      }
      const channelId = this.getChannelId(user.uid)
      const channel = { id: channelId, name: user.name }

      this.channel = channel
      this.$store.dispatch('setPrivate', true)
      this.$store.dispatch('setCurrentChannel', channel)
    },
    isActive (user) {
      const channelId = this.getChannelId(user.uid)
      return this.currentChannel.id === channelId
    },
    getChannelId (userId) {
      return userId < this.currentUser.uid
        ? userId + '/' + this.currentUser.uid
        : this.currentUser.uid + '/' + userId
    },
    getNotification (user) {
      const channelId = this.getChannelId(user.uid)
      let notif = 0
      this.notifCount.forEach(el => {
        if (el.id === channelId) {
          notif = el.notif
        }
      })
      return notif
    },
    resetNotification (user = null) {
      let channelId = null
      if (user !== null) {
        channelId = this.getChannelId(user.uid)
      }
      else {
        channelId = this.channel.id
      }
      const index = this.notifCount.findIndex(el => el.id === channelId)
      if (index !== -1) {
        this.notifCount[index].total = this.notifCount[index].lastKnowTotal
        this.notifCount[index].notif = 0
      }
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>

<style lang='css' scoped>

.users__container {
  overflow-y: auto;
  color: grey;
}

.users__container .feed {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.users__container .feed:hover {
  background: #654439;
}

.connection__label {
  float: left !important;
  margin-right: 12px !important;
  margin-top: 5px;
}
.channel__count {
  float: right;
}
</style>
