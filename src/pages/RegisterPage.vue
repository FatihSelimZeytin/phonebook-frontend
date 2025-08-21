<template>
  <div class="register">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div class="form-row">
        <label for="username">Username</label>
        <input
            v-model="username"
            id="username"
            type="text"
            required
            class="input-field"
            placeholder="Username"
        />
      </div>

      <div class="form-row">
        <label for="email">Email</label>
        <input
            v-model="email"
            id="email"
            type="email"
            required
            class="input-field"
            placeholder="Email Address"
        />
      </div>

      <div class="form-row">
        <label for="password">Password</label>
        <input
            v-model="password"
            id="password"
            type="password"
            required
            class="input-field"
            placeholder="Password"
        />
      </div>

      <div class="buttons">
        <button type="button">
          <a href="/login">Login</a>
        </button>
        <button type="submit" class="btn btn-primary">
          Register
        </button>
      </div>
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
