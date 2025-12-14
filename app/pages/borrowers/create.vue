<template>
  <v-container>
    <h2>Create Borrower</h2>
    <v-form @submit.prevent="save">
      <v-text-field label="Name" v-model="form.name" required />
      <v-text-field label="Contact" v-model="form.contact" required />
      <v-btn type="submit" color="green">Save</v-btn>
      <v-btn @click="$router.back()">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'
const baseUrl = useRuntimeConfig().public.strapiBaseUrl
const token = useRuntimeConfig().public.strapiToken

const form = reactive({ name: '', contact: '' })

const save = async () => {
  await $fetch(`${baseUrl}/api/borrowers`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: { data: form }
  })
  navigateTo('/borrowers')
}
</script>