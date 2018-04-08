<template>
  <div class="fixed-bottom full-width q-mb-lg q-pa-sm bg-grey-3">
    <div class="justify-start q-mb-sm">
      <form class="row justify-between" @submit.prevent="sendMessage">
        <q-field class="col-9">
          <q-input
            @keyup.enter.native="sendMessage"
            v-model.trim="message"
            type="textarea"
            placeholder="Enter message"
            :max-height="40"
            rows="2"
          />
        </q-field>

        <div class="col-3 q-py-xs q-pl-lg">
          <q-btn
            class="bg-secondary text-white"
            @click.prevent="openFileModal"
            :class="{'disabled': uploadState == 'uploading'}">
            <q-icon name="file_upload" />
            <span slot="loading">Uploading...</span>
          </q-btn>
          <q-btn
            type="submit"
            class="bg-primary text-white q-my-xs"
            @click.prevent="sendMessage"
          >
            <q-icon name="send" />
          </q-btn>
        </div>
      </form>
    </div>

    <!--  Process bar upload file -->
    <div class="fixed-center" data-total="100" id="uploadedFile" v-if="uploadState != null">
      <!-- <div class="bar">
        <div class="progress">

        </div>
      </div> -->
      <div class="label">
        {{ uploadLabel }}
      </div>
    </div>
    <!-- <file-modal ref='file_modal'></file-modal> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuidV4 from 'uuid'
import Firebase from 'firebase'
import FileModal from './FileModal'

export default {
  name: 'message-form',
  components: {
    FileModal
  },
  data () {
    return {
      message: '',
      errors: [],
      storageRef: Firebase.storage().ref(),
      uploadtask: null,
      uploadState: null
    }
  },
  computed: {
    ...mapGetters(['currentChannel', 'isPrivate']),
    uploadLabel () {
      switch (this.uploadState) {
        case 'uploading':
          return 'Uploading...'
        case 'error':
          return 'Error...'
        case 'done':
          return 'Upload successfully'
        default:
          return ''
      }
    },
    currentUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    sendMessage () {
      if (this.currentChannel !== null) {
        if (this.message.length > 0) {
          this.$parent
            .getMessageRef()
            .child(this.currentChannel.id)
            .push()
            .set(this.createMessage())
            .then(() => {
              this.message = ''
            })
            .catch(error => {
              this.errors.push(error.message)
            })
        }
      }
    },
    createMessage (fileUrl = null) {
      const message = {
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      }
      if (fileUrl === null) {
        message.content = this.message
      }
      else {
        message.image = fileUrl
      }
      return message
    },
    uploadFile (file, metadata) {
      if (file === null) return false
      const pathToUpload = this.currentChannel.id
      const ref = this.$parent.getMessageRef()
      const filePath = this.getPath() + '/' + uuidV4() + '.jpg'

      // upload to Firebase storegae
      this.uploadTask = this.storageRef.child(filePath).put(file, metadata)
      this.uploadState = 'uploading'

      this.uploadTask.on(
        'state_changed',
        snap => {
          // status
          const percent = snap.bytesTransferred / snap.totalBytes * 100
          $('#uploadedFile').progress('set percent', percent)
        },
        error => {
          this.errors.push(error.message)
          this.uploadState = 'error'
          this.uploadTask = null
          // error
        },
        () => {
          // finish
          this.uploadState = 'done'
          this.$refs.file_modal.resetForm()

          const fileUrl = this.uploadTask.snapshot.downloadURL
          this.sendFileMessage(fileUrl, ref, pathToUpload)
        }
      )
      return true
    },
    sendFileMessage (fileUrl, ref, pathToUpload) {
      ref
        .child(pathToUpload)
        .push()
        .set(this.createMessage(fileUrl))
        .then(() => {
          this.$nextTick(() => {
            /* global $ */
            /* eslint no-undef: "error" */
            $('html, body').scrollTop($(document).height())
          })
        })
        .catch(error => {
          this.errors.push(error.message)
        })
    },
    openFileModal () {
      /* global $ */
      /* eslint no-undef: "error" */
      $('#fileModal').modal('show')
    },
    getPath () {
      if (this.isPrivate) {
        return 'tchat/private/' + this.currentChannel.id
      }
      return 'tchat/public'
    }
  },
  beforeDestroy () {
    if (this.uploadTask !== null) {
      this.uploadTask.cancel()
      this.uploadTask = null
    }
  }
}
</script>

<style lang="css" scoped>
.shortcut {
  color: white;
}
</style>
