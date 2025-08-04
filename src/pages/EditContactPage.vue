<template>
  <div class="bg-gray-50 py-10 px-6">
    <div class="max-w-xl w-full mx-auto">
      <h2 class="text-2xl font-bold mb-6">Edit Contact</h2>

      <button type="button" class="right">
        <router-link to="/dashboard">Back</router-link>
      </button>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <input
              v-model="firstName"
              type="text"
              required
              placeholder="First Name"
              class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <input
              v-model="surname"
              type="text"
              required
              placeholder="Surname"
              class="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <div class="space-y-4">
            <div
                v-for="(phone, index) in phones"
                :key="index"
                class="flex items-center gap-4"
            >
              <input
                  v-model="phones[index].number"
                  type="text"
                  required
                  placeholder="Phone Number"
                  class="flex-grow border border-gray-300 rounded px-3 py-2"
              />
              <button
                  type="button"
                  @click="removePhone(index)"
                  class="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>

          <button
              type="button"
              @click="addPhone"
              class="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add another phone
          </button>
        </div>

        <button
            type="submit"
            class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const contactId = route.params.id
const firstName = ref('')
const surname = ref('')
const phones = ref([{ number: '' }])

const addPhone = () => {
  phones.value.push({ number: '' })
}

const removePhone = (index: number) => {
  phones.value.splice(index, 1)
}

// Fetch existing contact
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    if (!res.ok) throw new Error('Failed to load contact')

    const data = await res.json()
    firstName.value = data.firstName
    surname.value = data.surname
    phones.value = data.phones.length ? data.phones : [{ number: '' }]
  } catch (err) {
    alert('Error loading contact: ' + err.message)
    await router.push('/dashboard')
  }
})

const handleSubmit = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        firstName: firstName.value,
        surname: surname.value,
        phones: phones.value,
      }),
    })

    if (!res.ok) throw new Error('Failed to update contact')

    alert('Contact updated successfully!')
    await router.push('/dashboard')
  } catch (err) {
    alert('Error: ' + err.message)
  }
}
</script>