<template>
  <div class="column flex">

    <q-field
      class="q-py-md"
      icon="face"
    >
      <q-input
        v-model="problem.who"
        float-label="Who has a problem?"
      />
    </q-field>
    <q-field
      class="q-py-md"
      icon="aspect_ratio"
    >
      <q-input
        v-model="problem.what"
        float-label="What is the problem?"
      />
    </q-field>
    <q-field
      class="q-py-md"
      icon="report_problem"
    >
      <q-input
        v-model="problem.why"
        float-label="Reasons why it happens?"
      />
    </q-field>
    <q-field
      class="q-py-md"
      icon="call_split"
    >
      <q-input
        v-model="problem.how"
        float-label="How does it happen?"
      />
    </q-field>
    <q-field
      class="q-py-md"
      icon="schedule"
    >
      <q-input
        v-model="problem.when"
        float-label="When does it normally happen?"
      />
    </q-field>
    <q-field
      class="q-py-md"
      icon="near_me"
    >
      <q-input
        v-model="problem.where"
        float-label="Where does it normally happen?"
      />
    </q-field>
    <q-field
      class="q-py-md"
      icon="gavel"
    >
      <q-input
        v-model="problem.impact"
        float-label="What is the impact of this?"
      />
    </q-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      problem: [
        {who: ''},
        {what: ''},
        {when: ''},
        {why: ''},
        {how: ''},
        {where: ''},
        {impact: ''}
      ]
    }
  }
}
</script>
