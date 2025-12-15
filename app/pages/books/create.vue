<template>
  <v-container>
    <h2 class="text-h5 mb-4">Create Book</h2>

    <v-card class="form-card" elevation="6">
      <v-card-text>
        <v-form @submit.prevent="save" class="d-flex flex-column gap-4">
          <v-text-field label="Title" v-model="form.title" required />
          <v-text-field label="Author" v-model="form.author" required />

          <v-text-field
            label="Published Date"
            type="date"
            v-model="form.published_date"
          />

          <v-select
            label="Book Status"
            :items="['available', 'borrowed']"
            v-model="form.book_status"
          />

          <div class="d-flex gap-3 mt-2">
            <v-btn type="submit" color="primary" variant="flat">Save</v-btn>
            <v-btn variant="tonal" color="grey" @click="$router.back()">Cancel</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

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
        <span class="text-body-2 text-white">Book added successfully!</span>
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
.form-card {
  border-radius: 16px;
  padding: 8px;
  background: linear-gradient(180deg, #0b1021 0%, #0f172a 50%, #111827 100%);
  color: #e2e8f0;
}

.form-card :deep(.v-field) {
  background: #0b1224;
  border-radius: 12px;
}

.text-white {
  color: #fff;
}
</style>

<script setup>
import { reactive, ref } from 'vue'

const snackbar = ref(false)

const form = reactive({
  title: '',
  author: '',
  published_date: '',
  book_status: 'available'
})

const save = async () => {
  try {
    // Don't send empty published_date
    const dataToSend = { ...form }
    if (!dataToSend.published_date) {
      delete dataToSend.published_date
    }
    
    console.log('Sending data:', JSON.stringify({ data: dataToSend }))
    
    const response = await $fetch('http://localhost:1337/api/books', {
      method: 'POST',
      body: {
        data: dataToSend
      }
    })
    
    console.log('Book saved:', response)
    snackbar.value = true
    
    // Wait for snackbar to be visible, then navigate back
    await new Promise(resolve => setTimeout(resolve, 2000))
    await navigateTo('/books')
  } catch (error) {
    console.error('Error saving book:', error)
    console.error('Full error object:', JSON.stringify(error, null, 2))
    console.error('Error data:', error.data)
    console.error('Error message:', error.message)
    
    let errorMsg = error.message
    if (error.data?.error?.message) {
      errorMsg += ' - ' + error.data.error.message
    }
    if (error.data?.error?.details?.errors) {
      errorMsg += ' - ' + JSON.stringify(error.data.error.details.errors)
    }
    
    alert('Error saving book: ' + errorMsg)
  }
}
</script>