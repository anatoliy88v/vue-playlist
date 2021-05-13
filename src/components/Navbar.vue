<template>
  <nav class="navbar">
    <div class="navbar--wrapper">
      <router-link
        :to="{ name: 'Home' }"
        class="navbar--wrapper--logo"
      >
        <img src="@/assets/img/logo.png" alt="logo">
        <h1>Awesome mix #1</h1>
      </router-link>
      <div class="navbar--wrapper--links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
          <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
          <span class="navbar--wrapper--links--user-name">Hi there, {{ user.email }}</span>
          <button class="navbar--wrapper--links--logout" @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link
            class="btn"
            :to="{ name: 'Signup' }"
          >Sign up</router-link>
          <router-link
            class="btn"
            :to="{ name: 'Login' }"
          >Log in</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup() {
    const { user } = getUser()
    const { logout } = useLogout()
    const router = useRouter()
    const handleLogout = async () => {
      await logout()
      router.push({ name: 'Login' })
    }
    return { handleLogout, user }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: #fff;

  &--wrapper {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;

    &--logo {
      display: flex;
      align-items: center;
    }

    img {
      max-height: 60px;
    }

    h1 {
      margin-left: 20px;
    }

    &--links {
      margin-left: auto;

      &--user-name {
        font-size: 14px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #eee;
      }

      a, button {
        margin-left: 16px;
        font-size: 14px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .navbar {
    &--wrapper {
      flex-direction: column;

      &--logo {
        margin-bottom: 20px;
      }

      &--links {
        margin-left: 0;
      }
    }
  }
}

@media screen and (max-width: 460px) {
  .navbar--wrapper--links--logout {
    margin-top: 20px
  }
}
</style>