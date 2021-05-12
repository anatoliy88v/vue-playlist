<template>
  <div class="add-song">
    <form
      v-if="showForm"
      @submit.prevent="handleSubmit"
      class="add-song--form"
    >
      <h4>Add a New Song</h4>
      <input
        v-model="title"
        type="text"
        placeholder="Song title"
        required
      >
      <input
        v-model="artist"
        type="text"
        placeholder="Artist"
        required
      >
      <div class="add-song--form--buttons-wrapper">
        <button>Add</button>
        <button @click="handleShowForm">Cancel</button>
      </div>
    </form>
    <button
      v-else
      @click="handleShowForm"
    >Add Songs</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'

export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('playlists', props.playlist.id)

    const handleShowForm = () => {
      showForm.value = !showForm.value
    }

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
      }
      const res = await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      title.value = ''
      artist.value = ''
    }

    return { title, artist, showForm, handleShowForm, handleSubmit }
  }
}
</script>

<style lang="scss" scoped>
.add-song {
  text-align: center;
  margin-top: 40px;

  &--form {
    max-width: 100%;
    text-align: left;

    &--buttons-wrapper {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>