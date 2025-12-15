<template>
  <v-container>
    <h2 class="text-h5 mb-4">Books</h2>

    <v-btn color="blue" class="mb-4" @click="goCreate">
      <b>+</b>Add Book
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="books"
      item-key="id"
      class="modern-table"
      density="comfortable"
      hover
    >
      <template #item.title="{ item }">
        {{ item.title }}
      </template>
      <template #item.author="{ item }">
        {{ item.author }}
      </template>
      <template #item.published_date="{ item }">
        {{ item.published_date }}
      </template>
      <template #item.book_status="{ item }">
        {{ item.book_status }}
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

const books = ref([])
const snackbar = ref(false)
const message = ref('')

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Author', key: 'author' },
  { title: 'Published Date', key: 'published_date' },
  { title: 'Status', key: 'book_status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const getBooks = async () => {
  const res = await $fetch('http://localhost:1337/api/books')

  books.value = res.data.map(b => ({
    id: b.id,
    documentId: b.documentId,
    title: b.title,
    author: b.author,
    published_date: b.published_date,
    book_status: b.book_status
  }))
}

const goCreate = () => navigateTo('/books/create')
const view = item => navigateTo(`/books/${item.documentId}`)
const edit = item => navigateTo(`/books/${item.documentId}?edit=true`)

const remove = async id => {
  if (!confirm('Delete this book?')) return

  try {
    console.log('Deleting book with ID:', id)
    await $fetch(`http://localhost:1337/api/books/${id}`, {
      method: 'DELETE'
    })
    
    message.value = 'Book deleted successfully'
    snackbar.value = true
    await getBooks()
  } catch (error) {
    console.error('Error deleting book:', error)
    alert('Error deleting book: ' + error.message)
  }
}

onMounted(() => {
  getBooks()
})

onActivated(() => {
  getBooks()
})
</script>