<template>
  <div class="create-playlist">
    <form @submit.prevent="handleCreatePlaylist">
      <h4>Create a New Playlist</h4>
      <input
        v-model="title"
        type="text"
        required
        placeholder="Playlist title"
      >
      <textarea
        v-model="description"
        required
        placeholder="Playlist description..."
      ></textarea>
      <label>Upload Playlist Cover Image*</label>
      <input
        type="file"
        @change="handleFileChange"
      >
      <textarea
        v-model="iframeCode"
        placeholder="Iframe code"
      ></textarea>
      <div class="error"></div>
      <button v-if="isPending" disabled>Saving...</button>
      <button v-else>Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  name: 'CreatePlaylist',

  setup() {
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const router = useRouter()
    const title = ref('')
    const description = ref('')
    const iframeCode = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const fileTypes = ['image/png', 'image/jpeg']
    const isPending = ref(false)
    
    const handleFileChange = (e) => {
      let selected = e.target.files[0]
      if (selected && fileTypes.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
      }
    }

    const handleCreatePlaylist = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          iframeCode: iframeCode.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })
        isPending.value = false
        if (!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id }})
        }
      }
    }
    
    return { title, description, iframeCode, handleCreatePlaylist, fileError, handleFileChange, isPending }
  }
}
</script>

<style lang="scss" scoped>
.create-playlist {
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
}
</style>