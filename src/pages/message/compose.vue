<template>
  <div padding class="row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <div class="q-display-1 q-mb-md text-grey">Charge Card</div>
      <q-chat-message
        v-for="(msg, index) in messages"
        :key="`reg-${index}`"
        :label="msg.label"
        :sent="msg.sent"
        :text-color="msg.textColor"
        :bg-color="msg.bgColor"
        :name="msg.name"
        :avatar="msg.avatar"
        :text="msg.text"
        :stamp="msg.stamp"
      />
      <q-chat-message
        name="John"
        avatar="/assets/member1.png"
      >
        <q-spinner-dots size="2rem" />
      </q-chat-message>

      <q-field class="bg-dark text-white self-stretch">
        <q-input placeholder="Chat" v-model="response"/>
      </q-field>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      response: '',
      message: '',
      messages: [
        {
          label: 'Friday, 18th'
        },
        {
          name: 'John',
          text: ['How are you?'],
          avatar: 'assets/member1.png',
          stamp: 'Yesterday 13:34'
        },
        {
          name: 'Mike',
          text: ['I\'m good, thank you!', 'And you?'],
          sent: true,
          textColor: 'white',
          bgColor: 'black',
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:50'
        },
        {
          name: 'Mike',
          text: ['And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:51'
        },
        {
          label: 'Saturday, 19th'
        },
        {
          name: 'John',
          bgColor: 'amber',
          textColor: 'white',
          text: ['Fine. Nice weather today, right?', 'Hmm...'],
          avatar: 'assets/member1.png',
          stamp: '13:55'
        },
        {
          label: 'Sunday, 20th'
        },
        {
          name: 'John',
          text: ['How are you?'],
          avatar: 'assets/member1.png',
          stamp: 'Yesterday 13:34'
        },
        {
          name: 'Mike',
          text: ['I\'m good, thank you!', 'And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:50'
        },
        {
          name: 'Mike',
          text: ['And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:51'
        },
        {
          label: 'Monday, 20th'
        },
        {
          name: 'John',
          text: ['Fine. Nice weather today, right?', 'Hmm...'],
          avatar: 'assets/member1.png',
          stamp: '13:55'
        },
        {
          label: 'Tuesday, 21th'
        },
        {
          name: 'John',
          text: ['How are you?'],
          avatar: 'assets/member1.png',
          stamp: 'Yesterday 13:34'
        },
        {
          name: 'Mike',
          text: ['I\'m good, thank you!', 'And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:50'
        },
        {
          name: 'Mike',
          text: ['And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:51'
        },
        {
          label: 'Sunday, 19th'
        },
        {
          name: 'John',
          text: ['Fine. Nice weather today, right?', 'Hmm...'],
          avatar: 'assets/member1.png',
          stamp: '13:55'
        },
        {
          label: 'Wednesday, 22th'
        },
        {
          name: 'John',
          text: ['How are you?'],
          avatar: 'assets/member1.png',
          stamp: 'Yesterday 13:34'
        },
        {
          name: 'Mike',
          text: ['I\'m good, thank you!', 'And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:50'
        },
        {
          name: 'Mike',
          text: ['And you?'],
          sent: true,
          avatar: 'assets/avatar.png',
          stamp: 'Yesterday at 13:51'
        },
        {
          label: 'Thursday, 23th'
        },
        {
          name: 'John',
          text: ['Fine. Nice weather today, right?', 'Hmm...'],
          avatar: 'assets/member1.png',
          stamp: '13:55'
        }
      ]
    }
  }
}
</script>
