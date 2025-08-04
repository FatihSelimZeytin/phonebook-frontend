<template>
  <form @submit.prevent="submit">
    <input v-model="username" type="text" placeholder="Username" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../store/auth.ts'

const username = ref('')
const email = ref('')
const password = ref('')
const auth = useAuthStore()

const submit = () => {
  auth.register(username.value, email.value, password.value)
}
</script>
