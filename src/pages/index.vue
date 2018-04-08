<template>
  <q-page class="flex flex-center background">
    <div class="column flex-center home group q-pt-xl">
      <!-- <div class="q-title text-blue">What will you achieve today?</div> -->
      <!-- <img class="q-mt-xl" src="assets/esoutline2.svg" width="60%"/> -->
      <!-- <q-btn color="primary" @click="mypods">Create</q-btn>
      <q-btn color="primary" @click="searchinvest">Invest</q-btn>
      <q-btn color="primary" @click="browsepods">Assess</q-btn> -->
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'home',
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    mypods () {
      this.$router.push('/mypods')
    },
    searchinvest () {
      this.$router.push('/search_pods')
    },
    browsepods () {
      this.$router.push('/browse_pods')
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.home
  margin-top 15%
  a
    color #35495E

.background
  // height 100%
  background-image url('~assets/es-splash-min.jpg')
  background-size auto 115%
  background-position-x center
  background-repeat no-repeat

</style>
