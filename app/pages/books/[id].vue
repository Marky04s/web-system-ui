<template>
  <v-container>
    <h2 v-if="!editMode">Book Details</h2>
    <h2 v-else>Edit Book</h2>

    <div v-if="!editMode">
      <p><strong>Title:</strong> {{ book.title }}</p>
      <p><strong>Author:</strong> {{ book.author }}</p>
      <v-btn @click="editMode = true">Edit</v-btn>
    </div>

    <v-form v-else @submit.prevent="update">
      <v-text-field label="Title" v-model="book.title" />
      <v-text-field label="Author" v-model="book.author" />
      <v-btn type="submit" color="blue">Update</v-btn>
    </v-form>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
      <template #actions>
        <v-btn text @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-btn class="mt-4" @click="$router.back()">Back</v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.strapiBaseUrl
const token = config.public.strapiToken

const editMode = ref(!!route.query.edit)
const book = ref({})
const snackbar = ref({ show: false, message: '', color: 'success' })

const fetchBook = async () => {
  const res = await $fetch(`${baseUrl}/api/books/${route.params.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  book.value = res.data.attributes
}

const update = async () => {
  try {
    await $fetch(`${baseUrl}/api/books/${route.params.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: { data: book.value }
    })
    snackbar.value = { show: true, message: 'Book updated successfully!', color: 'green' }
    editMode.value = false
  } catch (err) {
    snackbar.value = { show: true, message: 'Error updating book', color: 'red' }
    console.error(err)
  }
}

onMounted(fetchBook)
</script>