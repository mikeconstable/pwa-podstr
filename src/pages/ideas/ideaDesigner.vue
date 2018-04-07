<template>
  <div>
    <q-stepper color="primary" ref="stepper" contractable alternative-labels>
      <q-step default name="first" title="Idea" icon="explore">
        <div>Generate Idea</div>
        <idea></idea>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()">Next</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="second" title="Empathy" icon="hearing">
        <div v-for="n in 1" :key="n">Empathise</div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()">Next</q-btn>
          <q-btn color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="third" title="Define" icon="speaker_notes">
        <div v-for="n in 1" :key="n">Define</div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()">Next</q-btn>
          <q-btn color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="forth" title="Ideate" icon="open_with">
        <div v-for="n in 1" :key="n">Ideate</div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()">Next</q-btn>
          <q-btn color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="fifth" title="Prototype" icon="build">
        <div v-for="n in 1" :key="n">Prototype</div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.next()">Next</q-btn>
          <q-btn color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="sixth" title="Test" icon="people_outline">
        <div v-for="n in 1" :key="n">Test</div>
        <q-stepper-navigation>
          <q-btn color="primary" @click="$refs.stepper.goToStep('first')">Restart</q-btn>
          <q-btn color="primary" flat @click="$refs.stepper.previous()">Back</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import Idea from './../../components/idea.vue'

export default {
  components: {
    Idea
  }
}
</script>
