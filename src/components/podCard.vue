<template>
  <q-card inline class="flex flex-center col-xs-11 q-ma-md bg-grey-1">
    <q-card-media class="row justify-center">
      <div class="podimg" v-bind:style="{
        'background-image': 'url(' + pod.image + ')',
        'background-position': 'center',
        'background-size': '100%',
        'background-repeat': 'no-repeat'
      }">
      </div>
    </q-card-media>
    <q-card-title>
      <div class="q-headline">{{ pod.podName }}</div>
      <q-rating slot="subtitle" icon="bubble_chart" color="green" v-model="pod.rating" :max="5" />
    </q-card-title>
    <q-card-main>
      <div class="q-title text-weight-light">{{ pod.podOwner }}</div>
      <p class="text-faded">{{ pod.podDescription }}</p>
    </q-card-main>
  </q-card>
</template>

<script>
export default {
  props: ['pod']
}
</script>

<style lang="stylus" scoped>
  .podtitle {
    color white
  }
  .podimg {
    height 150px
    width 100%
  }
</style>
