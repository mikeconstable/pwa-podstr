<template>
  <div>
    <div class="flex flex-center">
      <pod-card
        v-for="pod in pods"
        :key="pod.id"
        :pod="pod"
        @click.native="$router.push('/mypods/' + pod.id)">
      </pod-card>
    </div>
  </div>
</template>

<script>
import PodCard from './../../components/PodCard.vue'

export default {
  components: {
    PodCard
  },
  computed: {
    pods () {
      return this.$store.getters.pods
    }
  }
}
</script>

<style scoped>
</style>
