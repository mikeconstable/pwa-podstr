<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar class="flex" color="primary" glossy>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="user"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="flex flex-center">
          EntreStar
          <!-- <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
        </q-toolbar-title>

        <img
          src="~/assets/avatar.png"
          class="float-right avatar"
          alt="avatar"
          @click="rightDrawerOpen = !rightDrawerOpen"
        >

      </q-toolbar>
    </q-layout-header>

    <q-layout-footer v-if="user">
      <q-tabs>
        <q-route-tab
          icon="dashboard"
          to="/dashboard"
          exact
          slot="title"
        />

        <q-route-tab
          icon="message"
          to="/chat"
          exact
          slot="title"
        />

        <q-route-tab
          icon="lightbulb_outline"
          to="/ideas"
          exact
          slot="title"
        />

        <q-route-tab
          icon="business_center"
          to="/businesses"
          exact
          slot="title"
        />

        <q-route-tab
          icon="attach_money"
          to="/investments"
          exact
          slot="title"
        />

        <q-route-tab
          icon="play_for_work"
          to="/jobs"
          exact
          slot="title"
        />
      </q-tabs>
    </q-layout-footer>

    <q-layout-drawer v-model="leftDrawerOpen" content-class="bg-white">
      <q-list
        no-border
        link
        striped
        inset-separator
      >
        <q-list-header>Menu</q-list-header>

        <!-- *** HOME *** -->
        <q-item to="/">
          <q-item-side icon="home" />
          <q-item-main label="Home" />
        </q-item>
        <q-item to="/dashboard" v-if="user">
          <q-item-side icon="dashboard" />
          <q-item-main label="Dashboard" />
        </q-item>
        <connected-user></connected-user>
        <channels></channels>
        <div class="ui divider"></div>
        <users></users>
      </q-list>
    </q-layout-drawer>

    <q-layout-drawer side="right" v-model="rightDrawerOpen" content-class="bg-white">
      <q-list
        no-border
        link
        inset-separator
      >
        <q-list-header>Profile</q-list-header>

        <!-- *** ACCOUNT *** -->

          <q-item to="/profile" v-if="user">
            <q-item-side icon="person" />
            <q-item-main label="Profile" />
          </q-item>

          <q-item to="/settings" v-if="user">
            <q-item-side icon="settings" />
            <q-item-main label="Settings" />
          </q-item>

          <q-item to="/signin" v-if="!user">
            <q-item-side icon="lock" />
            <q-item-main label="Sign-in" />
          </q-item>

          <q-item to="/signup" v-if="!user">
            <q-item-side icon="face" />
            <q-item-main label="Sign-up" />
          </q-item>

          <q-item link @click.native="actionsheet = true" v-if="user">
            <q-item-side icon="lock_open" />
            <q-item-main label="Sign-out" />
          </q-item>

      </q-list>
    </q-layout-drawer>

    <q-action-sheet
      v-model="actionsheet"
      title= "Confirm Signout"
      message= "You are about to signout"
      :actions="[
        {
          label: 'Cancel',
          handler: () => {
          }
        },
        {
          label: 'Confirm',
          handler: () => {
            this.$store.dispatch('logout')
            this.$q.notify('You safely signed out')
          }
        }
      ]"
    />

    <q-page-container>
      <div class="layoutbg">
        <router-view />
        <q-ajax-bar />
      </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import ConnectedUser from '../components/sidebar/ConnectedUser'
import Channels from '../components/sidebar/Channels'
import Users from '../components/sidebar/Users'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.desktop,
      leftDrawerOpen: false,
      // rightDrawerOpen: this.$q.platform.desktop,
      rightDrawerOpen: false,
      iconColor: 'white',
      actionsheet: false
    }
  },
  components: { ConnectedUser, Channels, Users },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    // openURL,
  }
}
</script>

<style scoped>
  .tabposition {
    justify-content: center;
  }
  .layoutbg {
    background-image: url('~assets/trianglify.svg');
    background-size: cover;
    background-repeat: no-repeat;
    /* background-attachment: fixed; */
    background-position: center;
    z-index: -1;
  }
</style>
