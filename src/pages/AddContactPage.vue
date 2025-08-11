<template>
  <div class="add-contact">
    <h2 class="text-2xl font-bold mb-4">Add Contact</h2>

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
          <a href="/dashboard">Back</a>
        </button>
        <button
            type="submit"
            class="btn btn-primary"
        >
          Save Contact
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()

const firstName = ref('')
const surname = ref('')
const company = ref('') // Added company field
const phones = ref([{ number: '' }])

const addPhone = () => {
  phones.value.push({ number: '' })
}

const removePhone = (index: number) => {
  phones.value.splice(index, 1)
}

const handleSubmit = async () => {
  console.log(phones.value)

  if (phones.value.length === 0) {
    alert('Please add at least one phone number.')
    return
  }

  if (phones.value.some(p => !p.number.trim())) {
    alert('Please fill in all phone numbers before submitting.')
    return
  }

  try {
    const token = auth.token

    const res = await fetch('http://localhost:8090/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstName.value,
        surname: surname.value,
        company: company.value,
        phones: phones.value,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to create contact')
    }

    alert('Contact added successfully!')

    firstName.value = ''
    surname.value = ''
    company.value = ''
    phones.value = [{ number: '' }]
  } catch (err: any) {
    alert('Error: ' + err.message)
  }
}
</script>
