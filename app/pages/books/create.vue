<template>
  <v-container>
    <h2>Create Book</h2>
    <v-form @submit.prevent="save">
      <v-text-field label="Title" v-model="form.title" required />
      <v-text-field label="Author" v-model="form.author" required />
      <v-btn type="submit" color="green">Save</v-btn>
      <v-btn @click="$router.back()">Cancel</v-btn>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
        {{ snackbar.message }}
        <template #actions>
          <v-btn text @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'

const config = useRuntimeConfig()
const baseUrl = config.public.strapiBaseUrl
const token = config.public.strapiToken

const form = reactive({ title: '', author: '' })
const snackbar = ref({ show: false, message: '', color: 'success' })

const save = async () => {
  try {
    await $fetch(`${baseUrl}/api/books`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: { data: form }
    })
    snackbar.value = { show: true, message: 'Book added successfully!', color: 'green' }
    navigateTo('/books')
  } catch (err) {
    snackbar.value = { show: true, message: 'Error adding book', color: 'red' }
    console.error(err)
  }
}
</script>