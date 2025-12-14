<template>
  <v-container>
    <h2 v-if="!editMode">Transaction Details</h2>
    <h2 v-else>Edit Transaction</h2>

    <div v-if="!editMode">
      <p><strong>Borrower:</strong> {{ transaction.borrower }}</p>
      <p><strong>Book:</strong> {{ transaction.book }}</p>
      <p><strong>Date:</strong> {{ transaction.transaction_date }}</p>
      <p><strong>Status:</strong> {{ transaction.transaction_status }}</p>
      <v-btn @click="editMode = true">Edit</v-btn>
    </div>

    <v-form v-else @submit.prevent="update">
      <v-text-field label="Borrower Name" v-model="transaction.borrower" />
      <v-text-field label="Book Title" v-model="transaction.book" />
      <v-text-field label="Transaction Date" type="date" v-model="transaction.transaction_date" />
      <v-select label="Status" :items="['Borrowed','Returned']" v-model="transaction.transaction_status" />
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
const transaction = ref({})

const fetchTransaction = async () => {
  const res = await $fetch(`${baseUrl}/api/transactions/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  transaction.value = res.data.attributes
}

const update = async () => {
  await $fetch(`${baseUrl}/api/transactions/${route.params.id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: { data: transaction.value }
  })
  editMode.value = false
}

onMounted(fetchTransaction)
</script>