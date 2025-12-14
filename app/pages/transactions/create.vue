<template>
  <v-container>
    <h2>Create Transaction</h2>
    <v-form @submit.prevent="save">
      <v-text-field label="Borrower Name" v-model="form.borrower" required />
      <v-text-field label="Book Title" v-model="form.book" required />
      <v-text-field label="Transaction Date" type="date" v-model="form.transaction_date" required />
      <v-select label="Status" :items="['Borrowed','Returned']" v-model="form.transaction_status" required />
      <v-btn type="submit" color="green">Save</v-btn>
      <v-btn @click="$router.back()">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'
const baseUrl = useRuntimeConfig().public.strapiBaseUrl
const token = useRuntimeConfig().public.strapiToken

const form = reactive({
  borrower: '',
  book: '',
  transaction_date: '',
  transaction_status: 'Borrowed'
})

const save = async () => {
  await $fetch(`${baseUrl}/api/transactions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { data: form }
  })
  navigateTo('/transactions')
}
</script>