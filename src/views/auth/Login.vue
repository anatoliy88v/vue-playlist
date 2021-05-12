<template>
  <form @submit.prevent="handleLogin">
    <h3>Login</h3>
    <input
      v-model="email"
      type="email"
      placeholder="Email"
    >
    <input
      v-model="password"
      type="password"
      placeholder="Password"
    >
    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>
    <button
      v-if="isPending"
      disable
    >Loading</button>
    <button v-else>Log in</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',

  setup() {
    const { error, login, isPending } = useLogin()
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleLogin = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: 'Home' })
      }
    }
    return { email, password, handleLogin, error, isPending }
  }
}
</script>
