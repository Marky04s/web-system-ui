<template>
  <v-container>
    <h2 class="text-h5 font-weight-medium mb-4">Supppliers</h2>

    <v-data-table
      :headers="headers"
      :items="animals"
      :items-per-page="5"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn color="green" @click="viewItem(item)">
          VIEW
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Species', key: 'species' },
  { title: 'Diet', key: 'diet' },
  { title: 'Habitat', key: 'habitat' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const animals = ref([
  { id: 1, name: 'African Elephant', species: 'Loxodonta africana', diet: 'Herbivore', habitat: 'Savanna, Forests' },
  { id: 2, name: 'African Elephant 2', species: 'Loxodonta africana 2', diet: 'Herbivore 2', habitat: 'Savanna, Forests 2' },
  { id: 3, name: 'African Elephant 3', species: 'Loxodonta africana 3', diet: 'Herbivore 3', habitat: 'Savanna, Forests 3' },
  { id: 4, name: 'African Elephant 4', species: 'Loxodonta africana 4', diet: 'Herbivore 4', habitat: 'Savanna, Forests 4' },
  { id: 5, name: 'African Elephant 5', species: 'Loxodonta africana 5', diet: 'Herbivore 5', habitat: 'Savanna, Forests 5' },
])

function viewItem(item) {
  router.push(`/inventory/${item.id}`)
}
</script>
