<template>
  <div class="edit-contact">
    <h2 class="text-2xl font-bold mb-4">Edit Contact</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="form-row">
        <label for="firstName">First Name</label>
        <input
            v-model="firstName"
            type="text"
            id="firstName"
            required
            class="input-field"
            placeholder="First Name"
        />
      </div>

      <div class="form-row">
        <label for="surname">Surname</label>
        <input
            v-model="surname"
            type="text"
            id="surname"
            required
            class="input-field"
            placeholder="Surname"
        />
      </div>

      <div class="form-row">
        <label for="company">Company</label>
        <input
            v-model="company"
            type="text"
            id="company"
            class="input-field"
            placeholder="Company"
        />
      </div>

      <div class="form-row">
        <label>Phone Numbers</label>
        <div class="space-y-2">
          <div
              v-for="(phone, index) in phones"
              :key="index"
              class="flex items-center gap-3"
          >
            <input
                v-model="phone.number"
                type="text"
                placeholder="Phone Number"
                class="flex-grow input-field"
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
          <button
              type="button"
              @click="addPhone"
              class="text-blue-600 hover:underline text-sm mt-1"
          >
            + Add another phone
          </button>
        </div>
      </div>

      <div class="buttons">
        <button type="button">
          <router-link to="/dashboard">Back</router-link>
        </button>
        <button
            type="submit"
            class="btn btn-primary"
        >
          Save Changes
        </button>
      </div>
    </form>
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
const company = ref('')
const phones = ref([{ number: '' }])

const addPhone = () => {
  phones.value.push({ number: '' })
}

const removePhone = (index: number) => {
  phones.value.splice(index, 1)
}

// Load existing contact
onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:8090/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    if (!res.ok) throw new Error('Failed to load contact')

    const data = await res.json()
    firstName.value = data.firstName
    surname.value = data.surname
    company.value = data.company || ''
    phones.value = data.phones && data.phones.length ? data.phones : [{ number: '' }]
  } catch (err) {
    if (err instanceof Error) {
      alert('Error loading contact: ' + err.message)
    } else {
      alert('Unknown error occurred')
    }
  }
})

const handleSubmit = async () => {
  console.log(phones.value)

  try {
    const res = await fetch(`http://localhost:8090/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        firstName: firstName.value,
        surname: surname.value,
        company: company.value,
        phones: phones.value,
      }),
    })

    if (!res.ok) throw new Error('Failed to update contact')

    alert('Contact updated successfully!')
    await router.push('/dashboard')
  } catch (err: any) {
    alert('Error: ' + err.message)
  }
}
</script>