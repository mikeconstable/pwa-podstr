<template>
  <div class="flex column window-height">
    <div class="row justify-between">
      <div class="q-ma-lg">
        <div class="q-subheading"><q-icon name="thumb_up" class="on-left" />Entrepreneur</div>
        <div class="q-subheading text-grey-4"><q-icon name="thumb_down" class="on-left text-grey-4" />Investor</div>
        <div class="q-subheading text-grey-4"><q-icon name="thumb_down" class="on-left text-grey-4" />Collaborator</div>
      </div>
      <div class="q-ma-lg">
        <div class="q-title flex row justify-end">{{ user.displayName }}</div>
        <div class="q-subheading flex row justify-end">Chester</div>
        <div class="q-subheading flex row justify-end">UK</div>
      </div>
    </div>
    <div class="row justify-center">
      <q-card class="float-right dashcard" @click.native="$router.push('/ideas/')">
        <q-card-title class="bg-blue-8 text-white">
          <q-icon class="on-left" name="lightbulb_outline" />
          Ideas
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          1 active, 7 draft
          <!-- <img src="assets/dthink.png" class="float-right" width="50px" /> -->
        </q-card-main>
      </q-card>
      <q-card class="float-right dashcard" @click.native="$router.push('/businesses/')">
        <q-card-title class="bg-blue-8 text-white"><q-icon class="on-left" name="business_center" />Businesses</q-card-title>
        <q-card-separator />
        <q-card-main>2 active, 3 draft</q-card-main>
      </q-card>
      <q-card class="dashcard" @click.native="$router.push('/chat/')">
        <q-card-title class="bg-blue-8 text-white"><q-icon class="on-left" name="message" />Messaging</q-card-title>
        <q-card-separator />
        <q-card-main>3 channels</q-card-main>
      </q-card>
      <q-card class="dashcard" @click.native="$router.push('/funding/')">
        <q-card-title class="bg-blue-8 text-white"><q-icon class="on-left" name="account_balance_wallet" />Funding</q-card-title>
        <q-card-separator />
        <q-card-main>£10k raised</q-card-main>
      </q-card>
      <q-card class="dashcard" @click.native="$router.push('/investments/')">
        <q-card-title class="bg-blue-8 text-white"><q-icon class="on-left" name="attach_money" />Investments</q-card-title>
        <q-card-separator />
        <q-card-main>£3k over 4 businesses</q-card-main>
      </q-card>
      <!-- <q-card class="float-right dashcard" @click.native="$router.push('/agreements/')">
        <q-card-title class="bg-blue-8 text-white"><q-icon class="on-left" name="content_paste" />Agreements</q-card-title>
        <q-card-separator />
        <q-card-main>8 active agreements</q-card-main>
      </q-card> -->
      <q-card class="dashcard" @click.native="$router.push('/jobs/')">
        <q-card-title class="bg-blue-8 text-white"><q-icon class="on-left" name="play_for_work" />Jobs</q-card-title>
        <q-card-separator />
        <q-card-main>3 jobs posted, 4 jobs applied for</q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  data () {
    return {
      channelsRef: Firebase.database().ref('channels')
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped>
  .dashcard {
    background-color: whitesmoke;
    opacity: 0.97;
    /* background-color: grey; */
    color: black;
    width: 49%;
    margin: 1px;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .background {
    filter: blur(3ma);  z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    /* top: 0;
    left: 0; */
  }
</style>
