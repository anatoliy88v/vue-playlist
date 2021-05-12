<template>
  <form @submit.prevent="handleSignUp">
    <h3>Sign up</h3>
    <input
      v-model="displayName"
      type="text"
      placeholder="Display name"
    >
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
    <button v-else>Sign up</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  name: 'Signup',

  setup() {
    const { error, signup, isPending } = useSignup()
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const router = useRouter()

    const handleSignUp = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        router.push({ name: 'Home' })
      }
    }

    return { email, password, displayName, handleSignUp, error, isPending }
  }
}
</script>
