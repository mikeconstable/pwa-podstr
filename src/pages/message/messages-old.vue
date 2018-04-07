<template>
  <div>
    <div class="window-height">
      <q-list
        v-for="message in messages"
        :key="message.id"
        @click.native="$router.push('/compose/')">
        <q-item class="front">
          <img class="avatar on-left" :src="message.image" />
          <div class="q-title text-weight-regular text-white">{{ message.messenger }}</div>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages () {
      return this.$store.getters.messages
    }
  }
}
</script>
