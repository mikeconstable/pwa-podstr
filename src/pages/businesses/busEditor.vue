  <template>
    <div class="flex flex-center">
      <q-card flat inline class="col-xs-11 col-sm-8 col-md-8 col-lg-10 col-xl-10">
        <q-card-media>
          <img width="auto" :src="pod.image">
          <q-input type="text" v-model="pod.podName" />
        </q-card-media>
        <q-card-title>
          <q-rating slot="subtitle" v-model="pod.rating" :max="5" />
          <p slot="right">{{ pod.podOwner }}</p>
        </q-card-title>
        <q-card-main>
          <q-input type="text" v-model="pod.podDescription" />
        </q-card-main>
      </q-card>
    </div>
</template>

<script>
export default {
  // props: ['pod']
  computed: {
    pod () {
      const id = parseInt(this.$route.params.id)
      return this.$store.getters.pods.filter(function (c) {
        return c.id === id
      })[0]
    }
  }
}
</script>
