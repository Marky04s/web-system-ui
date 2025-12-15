<template>
  <v-container>
    <h2 class="text-h5 mb-4">Create Borrower</h2>

    <v-card class="form-card" elevation="6">
      <v-card-text>
        <v-form @submit.prevent="save" class="d-flex flex-column gap-4">
          <v-text-field label="Name" v-model="form.name" required />
          <v-text-field label="Email" v-model="form.email" type="email" />
          <v-text-field label="Contact" v-model="form.contact" required />

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
        <span class="text-body-2 text-white">Borrower added successfully!</span>
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
  name: '',
  email: '',
  contact: ''
})

const save = async () => {
  try {
    console.log('Sending data:', JSON.stringify({ data: form }))
    
    const response = await $fetch('http://localhost:1337/api/borrowers', {
      method: 'POST',
      body: {
        data: form
      }
    })
    
    console.log('Borrower saved:', response)
    snackbar.value = true
    
    // Wait for snackbar to be visible, then navigate back
    await new Promise(resolve => setTimeout(resolve, 2000))
    await navigateTo('/borrowers')
  } catch (error) {
    console.error('Error saving borrower:', error)
    console.error('Error status:', error.status)
    console.error('Error statusCode:', error.statusCode)
    console.error('Error data type:', typeof error.data)
    console.error('Full error.data:', error.data)
    
    if (error.data) {
      console.error('Error.data stringified:', JSON.stringify(error.data))
    }
    
    let errorMsg = error.message
    
    // Try multiple ways to get the error details
    if (error.data?.error?.message) {
      errorMsg = error.data.error.message
    } else if (error.data?.message) {
      errorMsg = error.data.message
    } else if (typeof error.data === 'string') {
      errorMsg = error.data
    }
    
    alert('Error saving borrower: ' + errorMsg)
  }
}
</script>