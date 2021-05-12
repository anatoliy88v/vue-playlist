<template>
  <div
    v-if="error"
    class="error"
  >
    {{ error }}
  </div>
  <div
    v-if="playlist"
    class="playlist-details"
  >
    <div class="playlist-details--info">
      <img
        :src="playlist.coverUrl"
        class="playlist-details--info--img"
      >
      <h2 class="playlist-details--info--title">{{ playlist.title }}</h2>
      <p class="playlist-details--info--username">Created by {{ playlist.userName }}</p>
      <p class="playlist-details--info--description">{{ playlist.description }}</p>

      <iframe
        v-if="playlist.iframeCode"
        :srcdoc="playlist.iframeCode"
        class="playlist-details--info--iframe"
      ></iframe>

      <button
        v-if="ownership"
        @click="handleDeletePlaylist"
        class="playlist-details--info--delete-btn"
      >Delete Playlist</button>
    </div>

    <div class="playlist-details--song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
      <div
        v-for="song in playlist.songs"
        :key="song.id"
        class="playlist-details--song-list--item"
      >
        <div class="playlist-details--song-list--item--details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button
          v-if="ownership"
          @click="handleDeleteSong(song.id)"
        >delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from '@/components/AddSong.vue'
import useStorage from '@/composables/useStorage'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import useDocument from '@/composables/useDocument'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    const ownership = computed(() => {
      return playlist.value 
        && user.value 
        && user.value.uid === playlist.value.userId
    })

    const handleDeletePlaylist = async () => {
      await deleteImage(playlist.value.filePath)
      await deleteDoc()
      router.push({ name: 'Home' })
    }

    const handleDeleteSong = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id !== id)
      await updateDoc({ songs })
    }

    return { error, playlist, ownership, handleDeletePlaylist, handleDeleteSong }
  }
}
</script>

<style lang="scss" scoped>
.playlist-details {
  display: flex;
  margin-bottom: 50px;

  &--info {
    text-align: center;
    margin-right: 10%;
    display: flex;
    flex-direction: column;
    max-width: 40%;

    &--img {
      border-radius: 20px;
      width: 100%;
    }

    &--title {
      text-transform: capitalize;
      font-size: 28px;
      margin-top: 20px;
    }

    &--username,
    &--description {
      margin-bottom: 20px;
    }

    &--username {
      color: #999;
    }

    &--description {
      text-align: left;
    }

    &--iframe {
      border: none;
      max-width: 320px;
      width: 100%;
      min-height: 400px;
      margin: 0 auto 20px;
    }

    &--delete-btn {
      max-width: 130px;
      margin: 0 auto;
    }
  }

  &--song-list {
    width: 45%;

    &--item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dashed var(--secondary);
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 768px) {
  .playlist-details {
    flex-wrap: wrap;

    &--song-list,
    &--info {
      max-width: 100%;
      width: 100%;
      margin-right: 0;
    }

    &--info {
      justify-content: center;
      align-items: center;

      &--img {
        max-width: 400px;
      }
    }

  }
}
</style>