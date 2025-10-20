<template>
  <v-container>
    <h2 class="text-h5 font-weight-medium mb-4">Inventory</h2>

    <v-card class="pa-4">
      <!-- Toolbar -->
      <v-toolbar flat color="transparent">
        <v-spacer></v-spacer>
        <v-btn
          prepend-icon="mdi-plus"
          color="green"
          class="text-capitalize"
          variant="flat"
          @click="createDialog = true"
        >
          Create
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>

      <!-- Data Table -->
       <v-data-table :headers="headers" :items="categories"    >
       </v-data-table>

      <v-data-table :headers="headers" :items="categories"    >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            :to="` /inventory/${item.documentID} `"
          >
            View</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog for Adding New Item -->
    <v-dialog v-model="createDialog" width="400" persistent>
      <v-card>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Add Inventory Item</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form ref="createForm" v-model="formValid">
            <v-text-field
              label="Item Name"
              v-model="itemName"
              :rules="[v => !!v || 'Item name is required']"
              clearable
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="createDialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            :disabled="!formValid"
            @click="saveItem"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const baseUrl = useRuntimeConfig().public.strapiBaseUrl;
const createDialog = ref(false);
const router = useRouter()

const headers = [
  { title: "ID", value: "id" },
  { title: "Name", value: "name" },
  { title: "Created AT", value: "createdAt" },
  { title: "", value: "actions" },
]
const categoryName = ref('');

const formValid = ref(true);
const createCategroyForm = ref(null);
const categories = ref([]);


const inventory = ref([
 { id: 1, name: 'African Elephant', createdAt: 'Loxodonta africana', actions: 'Herbivore',},
  { id: 2, name: 'African Elephant 2', createdAt: 'Loxodonta africana 2', actions: 'Herbivore 2',},
  { id: 3, name: 'African Elephant 3', createdAt: 'Loxodonta africana 3', actions: 'Herbivore 3',},
  { id: 4, name: 'African Elephant 4', createdAt: 'Loxodonta africana 4', actions: 'Herbivore 4',},
  { id: 5, name: 'African Elephant 5', createdAt: 'Loxodonta africana 5', actions: 'Herbivore 5',},
])

const rules = {
  required: (v) => !!value || 'Required.',
  numeric: (v) => !isNaN(Number(v)) || 'Must be a number.',
  positive: (v) => Number(v) > 0 || 'Must be greater than 0',
}

//get categories from strapi
const fetchCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categories`);
    if (res) {
      categories.value = res.data;
      console.log(res.data);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


const getCategory = async () => {
  try {
    const res = await $fetch(`http://localhost:1337/api/categories`);
    if (res) {
      categories.value = res.data;
      console.log('Successfully fetched!' , res.data);
    }
  } catch (error) {
    console.error( err);
  }
}


const getCategories = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/categories`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.error( err);
  }
}


onMounted(async () => {
  getCategory();
  await getCategory();
});
</script>

