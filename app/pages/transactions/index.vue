<template>
  <v-container>
    <h2 class="text-h5 mb-4">Transactions</h2>

    <v-btn color="blue" class="mb-4" @click="goCreate">
      <b>+</b> Add Transaction
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="transactions"
      item-key="id"
      class="modern-table"
      density="comfortable"
      hover
    >
      <template #item.book="{ item }">
        {{ item.book?.title || 'N/A' }}
      </template>
      <template #item.borrower="{ item }">
        {{ item.borrower?.name || 'N/A' }}
      </template>
      <template #item.transaction_date="{ item }">
        {{ item.transaction_date }}
      </template>
      <template #item.transaction_status="{ item }">
        {{ item.transaction_status }}
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex gap-3">
          <v-btn 
            size="small" 
            variant="tonal" 
            color="primary"
            icon="mdi-eye"
            @click="view(item)"
          >
            <v-icon>mdi-eye</v-icon>
            <v-tooltip activator="parent" location="top">View</v-tooltip>
          </v-btn>
          <v-btn 
            size="small" 
            variant="tonal" 
            color="blue"
            icon="mdi-pencil"
            @click="edit(item)"
          >
            <v-icon>mdi-pencil</v-icon>
            <v-tooltip activator="parent" location="top">Edit</v-tooltip>
          </v-btn>
          <v-btn 
            size="small" 
            variant="tonal" 
            color="red"
            icon="mdi-delete"
            @click="remove(item.documentId)"
          >
            <v-icon>mdi-delete</v-icon>
            <v-tooltip activator="parent" location="top">Delete</v-tooltip>
          </v-btn>
        </div>
      </template>
    </v-data-table>

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
        <span class="text-body-2 text-white">{{ message }}</span>
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
.modern-table {
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.modern-table :deep(thead th) {
  background: linear-gradient(120deg, #0f172a, #111827);
  color: #e2e8f0;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.modern-table :deep(tbody tr:hover) {
  background-color: #f8fafc;
}

.modern-table :deep(tbody td) {
  border-bottom: 1px solid #e2e8f0;
}

.modern-table :deep(.v-table__wrapper) {
  background: #fff;
}

.text-white {
  color: #fff;
}
</style>

<script setup>
import { ref, onMounted, onActivated } from 'vue'

const transactions = ref([])
const snackbar = ref(false)
const message = ref('')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Book', key: 'book' },
  { title: 'Borrower', key: 'borrower' },
  { title: 'Transaction Date', key: 'transaction_date' },
  { title: 'Status', key: 'transaction_status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const getTransactions = async () => {
  const res = await $fetch('http://localhost:1337/api/transactions?populate=*')

  transactions.value = res.data.map(t => ({
    id: t.id,
    documentId: t.documentId,
    book: t.book,
    borrower: t.borrower,
    transaction_date: t.transaction_date,
    transaction_status: t.transaction_status
  }))
}

const goCreate = () => navigateTo('/transactions/create')
const view = item => navigateTo(`/transactions/${item.documentId}`)
const edit = item => navigateTo(`/transactions/${item.documentId}?edit=true`)

const remove = async id => {
  if (!confirm('Delete this transaction?')) return

  try {
    console.log('Deleting transaction with ID:', id)
    await $fetch(`http://localhost:1337/api/transactions/${id}`, {
      method: 'DELETE'
    })
    
    message.value = 'Transaction deleted successfully'
    snackbar.value = true
    await getTransactions()
  } catch (error) {
    console.error('Error deleting transaction:', error)
    alert('Error deleting transaction: ' + error.message)
  }
}

onMounted(() => {
  getTransactions()
})

onActivated(() => {
  getTransactions()
})
</script>