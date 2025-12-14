<template>
  <v-container>
    <h2 v-if="!editMode">Borrower Details</h2>
    <h2 v-else>Edit Borrower</h2>

    <div v-if="!editMode">
      <p><strong>Name:</strong> {{ borrower.name }}</p>
      <p><strong>Contact:</strong> {{ borrower.contact }}</p>
      <v-btn @click="editMode = true">Edit</v-btn>
    </div>

    <v-form v-else @submit.prevent="update">
      <v-text-field label="Name" v-model="borrower.name" />
      <v-text-field label="Contact" v-model="borrower.contact" />
      <v-btn type="submit" color="blue">Update</v-btn>
    </v-form>

    <v-btn class="mt-4" @click="$router.back()">Back</v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const route = useRoute()
const baseUrl = useRuntimeConfig().public.strapiBaseUrl
const token = useRuntimeConfig().public.strapiToken

const editMode = ref(!!route.query.edit)
const borrower = ref({})

const fetchBorrower = async () => {
  const res = await $fetch(`${baseUrl}/api/borrowers/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  borrower.value = res.data.attributes
}

const update = async () => {
  await $fetch(`${baseUrl}/api/borrowers/${route.params.id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: { data: borrower.value }
  })
  editMode.value = false
}

onMounted(fetchBorrower)
</script>