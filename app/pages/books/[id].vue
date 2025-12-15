<template>
  <v-container>
    <h2 class="text-h5 mb-4">{{ editMode ? 'Edit Book' : 'Book Details' }}</h2>

    <v-card class="form-card" elevation="6">
      <v-card-text>
        <div v-if="!editMode" class="d-flex flex-column gap-3">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-subtitle-1 label-light">Title</div>
              <div class="text-h6 value-strong">{{ book.title }}</div>
            </div>
            <v-chip :color="book.book_status === 'available' ? 'green' : 'orange'" variant="flat" class="text-white chip-label" size="small">
              {{ book.book_status }}
            </v-chip>
          </div>
          <div>
            <div class="text-subtitle-1 label-light">Author</div>
            <div class="text-body-1 value-strong">{{ book.author }}</div>
          </div>
          <div>
            <div class="text-subtitle-1 label-light">Published</div>
            <div class="text-body-1 value-strong">{{ book.published_date || 'N/A' }}</div>
          </div>
          <div class="d-flex gap-3 mt-2">
            <v-btn color="primary" variant="flat" @click="editMode = true">Edit</v-btn>
            <v-btn variant="tonal" color="grey" @click="$router.back()">Back</v-btn>
          </div>
        </div>

        <v-form v-else @submit.prevent="update" class="d-flex flex-column gap-4">
          <v-text-field label="Title" v-model="book.title" />
          <v-text-field label="Author" v-model="book.author" />

          <v-text-field
            label="Published Date"
            type="date"
            v-model="book.published_date"
          />

          <v-select
            label="Book Status"
            :items="['available', 'borrowed']"
            v-model="book.book_status"
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
        <span class="text-body-2 text-white">Book updated successfully!</span>
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
const book = ref({})

const getBook = async () => {
  const res = await $fetch(`http://localhost:1337/api/books/${route.params.id}`)
  // Strapi v4+ returns data directly, not in attributes
  book.value = res.data || res
  console.log('Loaded book:', book.value)
}

const update = async () => {
  try {
    // Only send the specific fields we want to update
    const dataToSend = {
      title: book.value.title,
      author: book.value.author,
      published_date: book.value.published_date,
      book_status: book.value.book_status
    }
    
    console.log('Updating book with documentId:', route.params.id, 'Data:', dataToSend)
    
    await $fetch(`http://localhost:1337/api/books/${route.params.id}`, {
      method: 'PUT',
      body: {
        data: dataToSend
      }
    })

    snackbar.value = true
    editMode.value = false
  } catch (error) {
    console.error('Error updating book:', error)
    alert('Error updating book: ' + error.message)
  }
}

onMounted(getBook)
</script>