<template>
  <v-container>
    <h2 class="text-h5 mb-4">{{ editMode ? 'Edit Transaction' : 'Transaction Details' }}</h2>

    <v-card class="form-card" elevation="6">
      <v-card-text>
        <div v-if="!editMode" class="d-flex flex-column gap-3">
          <div>
            <div class="text-subtitle-1 label-light">Book</div>
            <div class="text-h6 value-strong">{{ transaction.book?.title || 'N/A' }}</div>
          </div>
          <div>
            <div class="text-subtitle-1 label-light">Borrower</div>
            <div class="text-body-1 value-strong">{{ transaction.borrower?.name || 'N/A' }}</div>
          </div>
          <div>
            <div class="text-subtitle-1 label-light">Date</div>
            <div class="text-body-1 value-strong">{{ transaction.transaction_date }}</div>
          </div>
          <div class="d-flex align-center gap-2">
            <div class="text-subtitle-1 label-light">Status</div>
            <v-chip :color="transaction.transaction_status === 'returned' ? 'green' : 'orange'" variant="flat" class="text-white chip-label" size="small">
              {{ transaction.transaction_status }}
            </v-chip>
          </div>
          <div class="d-flex gap-3 mt-2">
            <v-btn color="primary" variant="flat" @click="editMode = true">Edit</v-btn>
            <v-btn variant="tonal" color="grey" @click="$router.back()">Back</v-btn>
          </div>
        </div>

        <v-form v-else @submit.prevent="update" class="d-flex flex-column gap-4">
          <v-select
            label="Book"
            :items="books"
            item-title="title"
            item-value="id"
            v-model="transaction.book"
          />

          <v-select
            label="Borrower"
            :items="borrowers"
            item-title="name"
            item-value="id"
            v-model="transaction.borrower"
          />

          <v-text-field
            label="Transaction Date"
            type="date"
            v-model="transaction.transaction_date"
          />

          <v-select
            label="Status"
            :items="['borrowed', 'returned']"
            v-model="transaction.transaction_status"
          />

          <div class="d-flex gap-3 mt-2">
            <v-btn type="submit" color="primary" variant="flat">Update</v-btn>
            <v-btn variant="tonal" color="grey" @click="editMode = false">Cancel</v-btn>
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
        <span class="text-body-2 text-white">Transaction updated successfully!</span>
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
  padding: 12px;
  background: linear-gradient(180deg, #0b1021 0%, #0f172a 50%, #111827 100%);
  color: #e2e8f0;
  max-width: 780px;
  margin: 0 auto;
}

.form-card :deep(.v-field) {
  background: #0b1224;
  border-radius: 12px;
}

.text-white {
  color: #fff;
}

.label-light {
  color: #cbd5f5;
}

.value-strong {
  color: #f8fafc;
  font-weight: 600;
}

.chip-label {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.1;
  padding: 0 10px;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const editMode = ref(!!route.query.edit)
const snackbar = ref(false)
const transaction = ref({})
const books = ref([])
const borrowers = ref([])

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

const getTransaction = async () => {
  const res = await $fetch(`http://localhost:1337/api/transactions/${route.params.id}?populate=*`)
  transaction.value = res.data || res
  console.log('Loaded transaction:', transaction.value)
}

const update = async () => {
  try {
    // Extract IDs from relationship objects if needed
    const dataToSend = {
      book: typeof transaction.value.book === 'object' ? transaction.value.book.id : transaction.value.book,
      borrower: typeof transaction.value.borrower === 'object' ? transaction.value.borrower.id : transaction.value.borrower,
      transaction_date: transaction.value.transaction_date,
      transaction_status: transaction.value.transaction_status
    }
    
    console.log('Updating transaction with documentId:', route.params.id, 'Data:', dataToSend)
    
    await $fetch(`http://localhost:1337/api/transactions/${route.params.id}`, {
      method: 'PUT',
      body: {
        data: dataToSend
      }
    })

    snackbar.value = true
    editMode.value = false
  } catch (error) {
    console.error('Error updating transaction:', error)
    alert('Error updating transaction: ' + error.message)
  }
}

onMounted(async () => {
  await loadData()
  await getTransaction()
})
</script>