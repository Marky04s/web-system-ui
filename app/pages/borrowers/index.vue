<template>
  <v-container>
    <h2 class="text-h5 mb-4">Borrowers</h2>

    <v-btn color="blue" class="mb-4" @click="goCreate">
      <b>+</b>Add Borrower
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="borrowers"
      item-key="id"
      class="modern-table"
      density="comfortable"
      hover
    >
      <template #item.name="{ item }">
        {{ item.name }}
      </template>
      <template #item.email="{ item }">
        {{ item.email }}
      </template>
      <template #item.contact="{ item }">
        {{ item.contact }}
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex gap-3">
          <v-btn 
            size="small" 
            variant="tonal" 
            color="primary"
            icon="mdi-eye"
            @click="view(item)"
          >
            <v-icon>mdi-eye</v-icon>
            <v-tooltip activator="parent" location="top">View</v-tooltip>
          </v-btn>
          <v-btn 
            size="small" 
            variant="tonal" 
            color="blue"
            icon="mdi-pencil"
            @click="edit(item)"
          >
            <v-icon>mdi-pencil</v-icon>
            <v-tooltip activator="parent" location="top">Edit</v-tooltip>
          </v-btn>
          <v-btn 
            size="small" 
            variant="tonal" 
            color="red"
            icon="mdi-delete"
            @click="remove(item.documentId)"
          >
            <v-icon>mdi-delete</v-icon>
            <v-tooltip activator="parent" location="top">Delete</v-tooltip>
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snackbar"
      color="primary"
      variant="flat"
      location="top end"
      elevation="10"
      rounded="lg"
      timeout="2800"
    >
      <div class="d-flex align-center gap-2">
        <v-icon color="white" size="20">mdi-check-circle</v-icon>
        <span class="text-body-2 text-white">{{ message }}</span>
      </div>
      <template #actions>
        <v-btn icon variant="text" density="comfortable" @click="snackbar = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.modern-table {
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.modern-table :deep(thead th) {
  background: linear-gradient(120deg, #0f172a, #111827);
  color: #e2e8f0;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.modern-table :deep(tbody tr:hover) {
  background-color: #f8fafc;
}

.modern-table :deep(tbody td) {
  border-bottom: 1px solid #e2e8f0;
}

.modern-table :deep(.v-table__wrapper) {
  background: #fff;
}

.text-white {
  color: #fff;
}
</style>

<script setup>
import { ref, onMounted, onActivated } from 'vue'

const borrowers = ref([])
const snackbar = ref(false)
const message = ref('')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Contact', key: 'contact' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const getBorrowers = async () => {
  const res = await $fetch('http://localhost:1337/api/borrowers')

  borrowers.value = res.data.map(b => ({
    id: b.id,
    documentId: b.documentId,
    name: b.name,
    email: b.email,
    contact: b.contact
  }))
}

const goCreate = () => navigateTo('/borrowers/create')
const view = item => navigateTo(`/borrowers/${item.documentId}`)
const edit = item => navigateTo(`/borrowers/${item.documentId}?edit=true`)

const remove = async id => {
  if (!confirm('Delete this borrower?')) return

  try {
    console.log('Deleting borrower with ID:', id)
    await $fetch(`http://localhost:1337/api/borrowers/${id}`, {
      method: 'DELETE'
    })
    
    message.value = 'Borrower deleted successfully'
    snackbar.value = true
    await getBorrowers()
  } catch (error) {
    console.error('Error deleting borrower:', error)
    alert('Error deleting borrower: ' + error.message)
  }
}

onMounted(() => {
  getBorrowers()
})

onActivated(() => {
  getBorrowers()
})
</script>