<template>
  <div class="window-height q-pa-md">
    <div class="q-title">Profile</div>
    <div class="q-subtitle q-pt-md">{{ user.displayName }}</div>
    <img
      :src="user.photoURL"
      class="avatar q-my-md"
      alt="avatar"
    >
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped>
  .avatar {
    height: 70px;
    width: 70px;
  }
</style>
