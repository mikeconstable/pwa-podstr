<template>
  <div>
    <div class="">
      <q-list
        v-for="idea in ideas"
        :key="idea.id"
        @click.native="$router.push('/ideas/' + idea.id)"
        class="q-pa-none q-ma-none"
      >
        <q-item class="q-pa-none q-ma-sm bg-grey-1">
          <img class="idea-img on-left" :src="idea.image" />
          <div class="q-title text-weight-regular text-grey-9 q-ml-md">{{ idea.ideaName }}</div>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ideas () {
      return this.$store.getters.ideas
    }
  }
}
</script>

<style scoped>
  .idea-img {
    height: 90px;
    width: 90px;
    margin: 0;
    padding: 0;
  }
</style>
