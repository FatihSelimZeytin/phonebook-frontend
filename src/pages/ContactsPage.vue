<template>
  <div>
    <h2>Contacts</h2>
    <button @click="logout">Logout</button>

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="margin: 0;">Contacts</h2>
      <input
          v-model="searchQuery"
          @input="searchContacts"
          type="text"
          placeholder="Search contacts..."
          class="border rounded px-3 py-1"
      />
      <button type="button" class="right"><a href="/addcontact">Add</a></button>
    </div>

    <table>
      <thead>
      <tr>
        <th>Full Name</th>
        <th>Company</th>
        <th>Phones</th>
        <th>Options</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(contact, index) in contacts" :key="index">
        <td>{{ contact.firstName }} {{ contact.surname }}</td>
        <td>{{ contact.company || '-' }}</td>
        <td>{{ contact.phones.map(p => p.number).join(', ') }}</td>
        <td>
          <div class="flex gap-2 justify-center">
            <button @click="goToEdit(contact.id)" class="edit-icon">
              <img :src="editIcon" alt="Edit" class="w-5 h-5" />
            </button>
            <button @click="openModal(contact)" class="delete-icon">
              <img :src="deleteIcon" alt="Delete" class="w-5 h-5" />
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete <strong>{{ selectedContact?.firstName }} {{ selectedContact?.surname }}</strong>?

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Yes, Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import * as bootstrap from 'bootstrap'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../store/auth'
import api from '../services/api'

const router = useRouter()
const auth = useAuthStore()

const editIcon = new URL('../assets/editIcon.svg', import.meta.url).href
const deleteIcon = new URL('../assets/deleteIcon.svg', import.meta.url).href

// Interfaces
interface Phone {
  number: string
}

interface Contact {
  id: number
  firstName: string
  surname: string
  company?: string
  phones: Phone[]
}

const contacts = ref<Contact[]>([])
const selectedContact = ref<Contact | null>(null)
const modalRef = ref<HTMLDivElement | null>(null)

let bootstrapModal: bootstrap.Modal | null = null

// Handle logout
const logout = () => {
  auth.logout()
  router.push('/login')
}

// Load contacts and setup modal
onMounted(async () => {
  if (modalRef.value) {
    bootstrapModal = new bootstrap.Modal(modalRef.value)
  }

  try {
    const res = await api.get('/contacts', {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    contacts.value = await res.data
  } catch (err) {
    console.error('Error loading contacts:', err)
  }
})

// Modal handlers
function openModal(contact: Contact) {
  selectedContact.value = contact
  bootstrapModal?.show()
}

function closeModal() {
  bootstrapModal?.hide()
}

async function confirmDelete() {
  if (!selectedContact.value) return;

  try {
    const res = await api.delete(`/contacts/${selectedContact.value.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    console.log(res.data)
    // Remove from local contacts list
    contacts.value = contacts.value.filter(c => c.id !== selectedContact.value?.id);

    closeModal();
  } catch (err) {
    console.error('Delete failed:', err);
  }
}

function goToEdit(id: number) {
  router.push(`/editcontact/${id}`)
}

const searchQuery = ref('')

const searchContacts = async () => {
  try {
    let url = '/contacts'
    if (searchQuery.value.trim() !== '') {
      url += `/search?q=${encodeURIComponent(searchQuery.value.trim())}`
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    if (!res.ok) throw new Error('Failed to fetch contacts')

    contacts.value = await res.json()
  } catch (err) {
    console.error('Error searching contacts:', err)
  }
}

</script>