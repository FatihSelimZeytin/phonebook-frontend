<template>
  <div class="register">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div class="mb-3">
        <label for="username" class="block font-medium"></label>
        <input
            v-model="username"
            id="username"
            type="text"
            required
            class="border rounded px-3 py-2 w-full"
            placeholder="Username"
        />
      </div>

      <div class="mb-3">
        <label for="email" class="block font-medium"></label>
        <input
            v-model="email"
            id="email"
            type="email"
            required
            class="border rounded px-3 py-2 w-full"
            placeholder="Email Address"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="block font-medium"></label>
        <input
            v-model="password"
            id="password"
            type="password"
            required
            class="border rounded px-3 py-2 w-full"
            placeholder="Password"
        />
      </div>
      <button type="button">
        <a href="/login">Login</a>
      </button>
      <button type="submit" class="btn btn-primary w-100">
        Register
      </button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const username = ref('')
const email = ref('')
const password = ref('')

const auth = useAuthStore()

const handleRegister = async () => {
  try {
    await auth.register(username.value, email.value, password.value)
  } catch (err) {
    alert('Registration failed. Please check your input.')
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 50px auto;
}
</style>
