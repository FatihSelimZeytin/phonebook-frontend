<template>
  <div class="login">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-row">
        <label for="email">Email</label>
        <input
            v-model="email"
            type="email"
            id="email"
            required
            class="input-field"
            placeholder="Email Address"
        />
      </div>

      <div class="form-row">
        <label for="password">Password</label>
        <input
            v-model="password"
            type="password"
            id="password"
            required
            class="input-field"
            placeholder="Password"
        />
      </div>

      <div v-if="error" class="alert alert-danger mb-3">{{ error }}</div>

      <div class="buttons">
        <button type="button">
          <a href="/register">Register</a>
        </button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    await auth.login(email.value, password.value)
    await router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
