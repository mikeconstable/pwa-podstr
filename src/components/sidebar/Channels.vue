<template>
  <div class="flex">
    <!-- <div class="q-title"> Channels <i class="add icon add_channel" @click="openChannelModal"></i></div> -->
    <q-list
      no-border
      link
      inset-separator
      class="full-width"
    >
      <q-list-header>Channels</q-list-header>
      <q-item
        v-for="channel in channels"
        :key="channel.id"
        :class="{'is_active': setChannelActive(channel), 'has_unread': getNotification(channel) > 0}"
        @click.native="changeChannel(channel)"
      >
        <q-item-side icon="label_outline"/>
        <q-item-main># {{ channel.name }}</q-item-main>
        <div v-if="getNotification(channel) > 0 && (channel.id !== currentChannel.id)">
          {{ getNotification(channel) }}
        </div>
      </q-item>
      <q-btn class="q-ma-md" color="secondary" @click.native="opened = true">
        <q-icon name="add_circle" class="on-left"/>
        Add Channel
      </q-btn>
    </q-list>

    <!-- Modal -->
    <q-modal minimized id="channelModal" v-model="opened">
      <form class="q-pa-md">
        <div class="q-title q-pa-sm">
          Add new channel
        </div>

        <div class="row q-pa-sm">
          <div class="" :class="{'error': hasErrors}">
            <q-input
              id="new_channel"
              v-model="new_channel"
              float-label="Channel Name"
              placeholder="Channel Name"
            />
          </div>

          <div class="q-body-2" v-if="hasErrors">
            <p v-for="error in errors" :key="error">
              {{ error }}
            </p>
          </div>
        </div>

        <div class="row">
          <q-btn class="q-ma-sm" color="negative">
            <q-icon name="close" class="on-left"/>
            Cancel
          </q-btn>
          <q-btn class="q-ma-sm" color="positive" @click.native="addChannel">
            <q-icon name="check" class="on-left"/>
            Add
          </q-btn>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Firebase from 'firebase'
import mixin from '../mixins'

export default {
  name: 'channels',
  data () {
    return {
      new_channel: '',
      errors: [],
      channelsRef: Firebase.database().ref('channels'),
      messagesRef: Firebase.database().ref('messages'),
      channels: [],
      firstLoad: true,
      notifCount: [],
      channel: null,
      opened: false
    }
  },
  mixins: [mixin],
  watch: {
    isPrivate () {
      if (this.isPrivate) {
        this.resetNotification()
      }
    }
  },
  computed: {
    ...mapGetters(['currentChannel', 'isPrivate']),
    hasErrors () {
      return this.errors.length > 0
    }
  },
  mounted () {
    this.addListeners()
  },
  methods: {
    addListeners () {
      this.channelsRef.on('child_added', snap => {
        this.channels.push(snap.val())

        if (this.firstLoad && this.channels.length > 0) {
          this.$store.dispatch('setCurrentChannel', this.channels[0])
          this.channel = this.channels[0]
        }

        this.firstLoad = false

        // get notification count
        this.addCountListener(snap.key)
      })
    },
    addCountListener (channelId) {
      this.messagesRef.child(channelId).on('value', snap => {
        this.handleNotifications(
          channelId,
          this.currentChannel.id,
          this.notifCount,
          snap
        )
      })
    },
    getNotification (channel) {
      let notif = 0
      this.notifCount.forEach(el => {
        if (el.id === channel.id) {
          notif = el.notif
        }
      })
      return notif
    },
    openChannelModal () {
      /* global $ */
      /* eslint no-undef: "error" */
      $('#channelModal').modal('show')
    },
    addChannel () {
      const key = this.channelsRef.push().key

      const newChannel = { id: key, name: this.new_channel }
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.new_channel = ''
          /* global $ */
          /* eslint no-undef: "error" */
          this.opened = false
        })
        .catch(error => {
          this.errors.push(error.message)
        })
    },
    changeChannel (channel) {
      this.resetNotification()
      this.$store.dispatch('setPrivate', false)
      this.$store.dispatch('setCurrentChannel', channel)
      this.channel = channel
    },
    resetNotification () {
      const index = this.notifCount.findIndex(el => el.id === this.channel.id)
      if (index !== -1) {
        this.notifCount[index].total = this.notifCount[index].lastKnowTotal
        this.notifCount[index].notif = 0
      }
    },
    detachListeners () {
      this.channelsRef.off()
      this.channels.forEach(el => {
        this.messagesRef.child(el.id).off()
      })
    },
    setChannelActive (channel) {
      return channel.id === this.currentChannel.id
    }
  },
  beforeDestroy () {
    this.detachListeners()
  }
}
</script>

<style lang="css" scoped>
/* @import "../../main.scss" */
.has_unread {
    color: green;
    font-weight: bold;
}

.is_active {
    background-color: lightblue;
    color: white;
}

.channels__list {
  min-height: 100px;
  max-height: 300px !important;
  overflow-y: auto !important;
  color: grey;
}

.channels__container ul {
  margin: 0;
  padding: 0;
}

.channels__item {
  list-style: none;
  cursor: pointer;
  line-height: 30px;
  border-radius: 2px;
  padding-left: 12px;
  font-size: 1.1em;
  margin: 1px 0;
}

.channel__count {
  float: right;
}

.channels__item:hover {
  background-color: blue;
}

.add_channel {
  cursor: pointer;
  color: white;
  position: absolute;
  right: -65%;
  opacity: 0.6;
  top: 5%;
  display: inline-block;
}
.add_channel:hover {
  color: white;
}
</style>
