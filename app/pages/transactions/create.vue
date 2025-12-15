<template>
  <v-container>
    <h2 class="text-h5 mb-4">Create Transaction</h2>

    <v-card class="form-card" elevation="6">
      <v-card-text>
        <v-form @submit.prevent="save" class="d-flex flex-column gap-4">
          <v-select
            label="Book"
            :items="books"
            item-title="title"
            item-value="id"
            v-model="form.book"
            required
          />

          <v-select
            label="Borrower"
            :items="borrowers"
            item-title="name"
            item-value="id"
            v-model="form.borrower"
            required
          />

          <v-text-field
            label="Transaction Date"
            type="date"
            v-model="form.transaction_date"
            required
          />

          <v-select
            label="Status"
            :items="['borrowed', 'returned']"
            v-model="form.transaction_status"
            required
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
        <span class="text-body-2 text-white">Transaction added successfully!</span>
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
import { reactive, ref, onMounted } from 'vue'

const snackbar = ref(false)
const books = ref([])
const borrowers = ref([])

const form = reactive({
  book: null,
  borrower: null,
  transaction_date: '',
  transaction_status: 'borrowed'
})

const loadData = async () => {
  try {
    const booksRes = await $fetch('http://localhost:1337/api/books')
    books.value = booksRes.data
    
    const borrowersRes = await $fetch('http://localhost:1337/api/borrowers')
    borrowers.value = borrowersRes.data
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

const save = async () => {
  try {
    console.log('Sending data:', JSON.stringify({ data: form }))
    
    const response = await $fetch('http://localhost:1337/api/transactions', {
      method: 'POST',
      body: {
        data: form
      }
    })
    
    console.log('Transaction saved:', response)
    snackbar.value = true
    
    // Wait for snackbar to be visible, then navigate back
    await new Promise(resolve => setTimeout(resolve, 2000))
    await navigateTo('/transactions')
  } catch (error) {
    console.error('Error saving transaction:', error)
    
    let errorMsg = error.message
    if (error.data?.error?.message) {
      errorMsg = error.data.error.message
    } else if (error.data?.message) {
      errorMsg = error.data.message
    }
    
    alert('Error saving transaction: ' + errorMsg)
  }
}

onMounted(loadData)
</script>