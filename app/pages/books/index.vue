<!-- <template>
  <v-container>
    <h2 class="text-h5 mb-4">Books</h2>
    <v-btn color="green" class="mb-4" to="/books/create">Add Book</v-btn>

    <v-data-table :headers="headers" :items="books">
      <template #["item.actions"]="{ item }">
        <v-btn size="small" @click="view(item.id)">View</v-btn>
        <v-btn size="small" color="blue" @click="edit(item.id)">Edit</v-btn>
        <v-btn size="small" color="red" @click="remove(item.id)">Delete</v-btn>
      </template>
    </v-data-table>
    

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
      <template #actions>
        <v-btn text @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template> -->

<!-- <script setup>
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const baseUrl = config.public.strapiBaseUrl
const token = config.public.strapiToken

const books = ref([])
const snackbar = ref({ show: false, message: '', color: 'success' })

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Author', key: 'author' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchBooks = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/books`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    books.value = res.data.map(b => ({ id: b.id, ...b.attributes }))
  } catch (err) {
    console.error('Fetch books error:', err)
  }
}

const view = id => navigateTo(`/books/${id}`)
const edit = id => navigateTo(`/books/${id}?edit=true`)

const remove = async id => {
  if (!confirm('Delete this book?')) return
  try {
    await $fetch(`${baseUrl}/api/books/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    snackbar.value = { show: true, message: 'Book deleted successfully', color: 'red' }
    await fetchBooks()
  } catch (err) {
    snackbar.value = { show: true, message: 'Error deleting book', color: 'red' }
  }
}

onMounted(fetchBooks)
</script> -->

<template>
  <div>
    <h1>Books</h1>

    <v-data-table 
    :headers="headers"
    :items="books"
    ></v-data-table>


  </div>
</template>

<script setup>

const headers = [

  { title : "ID", value: "id" },
  { title : "Title", value: "title" },
  { title : "Author", value: "author" },
  { title : "Publisher Date", value: "publisher_date" },
  { title : "Book Status", value: "book_status" },
  { title : "Created At", value: "createdAt" },
];

const books = ref ([]);

const getBooks = async () => {
  const res = await $fetch('http://localhost:1337/api/books', {
   
  }).catch((err) => {
    console.log(err);
    return null;
  });

  if (res) {
    books.value = res.data
    console.log(res);
  } else {

    console.log("error loading suppliers")
  }
}


onMounted(async () => {
  await getBooks()
})
</script>

<style>

</style>