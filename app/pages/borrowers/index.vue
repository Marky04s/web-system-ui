<template>
  <v-container>
    <h2 class="text-h5 mb-4">Borrowers</h2>
    <v-btn color="green" class="mb-4" to="/borrowers/create">Add Borrower</v-btn>

    <v-data-table :headers="headers" :items="borrowers">
      <template #["item.actions"]="{ item }">
        <v-btn size="small" @click="view(item.id)">View</v-btn>
        <v-btn size="small" color="blue" @click="edit(item.id)">Edit</v-btn>
        <v-btn size="small" color="red" @click="remove(item.id)">Delete</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const baseUrl = useRuntimeConfig().public.strapiBaseUrl
const token = useRuntimeConfig().public.strapiToken

const borrowers = ref([])
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Contact', key: 'contact' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchBorrowers = async () => {
  const res = await $fetch(`${baseUrl}/api/borrowers`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  borrowers.value = res.data.map(b => ({ id: b.id, ...b.attributes }))
}

const view = id => navigateTo(`/borrowers/${id}`)
const edit = id => navigateTo(`/borrowers/${id}?edit=true`)
const remove = async id => {
  if (!confirm('Delete this borrower?')) return
  await $fetch(`${baseUrl}/api/borrowers/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  fetchBorrowers()
}

onMounted(fetchBorrowers)
</script>