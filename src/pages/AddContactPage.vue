<template>
  <div class="bg-gray-50 py-10 px-6">
    <div class="max-w-xl w-full mx-auto">
      <h2 class="text-2xl font-bold mb-6">Add Contact</h2>

      <button type="button" class="right"><a href="/dashboard">Back</a></button>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- First Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"></label>
          <input
              v-model="firstName"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required placeholder="First Name"
          />
        </div>

        <!-- Surname -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"></label>
          <input
              v-model="surname"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required placeholder="Surname"
          />
        </div>

        <!-- Phone Numbers -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"></label>

          <div class="space-y-4">
            <div
                v-for="(phone, index) in phones"
                :key="index"
                class="flex items-center gap-4"
            >
              <input
                  v-model="phones[index].number"
                  type="text"
                  placeholder="Phone Number"
                  class="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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

        <!-- Submit -->
        <button
            type="submit"
            class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Contact
        </button>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const firstName = ref('')
const surname = ref('')
const phones = ref([{ number: '' }])

const addPhone = () => {
  phones.value.push({ number: '' })
}

const removePhone = (index: number) => {
  phones.value.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    const token = auth.token

    const res = await fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstName.value,
        surname: surname.value,
        phones: phones.value,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to create contact')
    }

    alert('Contact added successfully!')
    // Optionally reset form:
    firstName.value = ''
    surname.value = ''
    phones.value = [{ number: '' }]
  } catch (err) {
    alert('Error: ' + err.message)
  }
}
</script>
