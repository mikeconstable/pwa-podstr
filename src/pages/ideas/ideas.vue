<template>
  <div>
    <div class="">
      <q-list
        v-for="idea in ideas"
        :key="idea.id"
        @click.native="$router.push('/ideas/' + idea.id)">
        <q-item class="">
          <img class="avatar on-left" :src="idea.image" />
          <div class="q-title text-weight-regular text-grey-8">{{ idea.ideaName }}</div>
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
