<template>
  <form @submit.prevent="submit">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../store/auth.ts'

const email = ref('')
const password = ref('')
const auth = useAuthStore()

const submit = () => {
  auth.login(email.value, password.value)
}
</script>
