<template>
    <div class="login">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="block font-medium"></label>
          <input v-model="email"
                 type="email"
                 id="email"
                 required
                 class="border rounded px-3 py-2 w-full"
                 placeholder="Email Address"/>
        </div>

        <div class="mb-3">
          <label for="password" class="block font-medium"></label>
          <input v-model="password"
                 type="password"
                 id="password"
                 required
                 class="border rounded px-3 py-2 w-full"
                 placeholder="Password"
          />
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <button type="button">
          <a href="/register">Register</a>
        </button>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
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
