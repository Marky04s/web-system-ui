<template>
  <v-container>
    <h2 class="text-h5 mb-4">{{ editMode ? 'Edit Borrower' : 'Borrower Details' }}</h2>

    <v-card class="form-card" elevation="6">
      <v-card-text>
        <div v-if="!editMode" class="d-flex flex-column gap-3">
          <div>
            <div class="text-subtitle-1 label-light">Name</div>
            <div class="text-h6 value-strong">{{ borrower.name }}</div>
          </div>
          <div>
            <div class="text-subtitle-1 label-light">Email</div>
            <div class="text-body-1 value-strong">{{ borrower.email || 'N/A' }}</div>
          </div>
          <div>
            <div class="text-subtitle-1 label-light">Contact</div>
            <div class="text-body-1 value-strong">{{ borrower.contact }}</div>
          </div>
          <div class="d-flex gap-3 mt-2">
            <v-btn color="primary" variant="flat" @click="editMode = true">Edit</v-btn>
            <v-btn variant="tonal" color="grey" @click="$router.back()">Back</v-btn>
          </div>
        </div>

        <v-form v-else @submit.prevent="update" class="d-flex flex-column gap-4">
          <v-text-field label="Name" v-model="borrower.name" />
          <v-text-field label="Email" v-model="borrower.email" type="email" />
          <v-text-field label="Contact" v-model="borrower.contact" />

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
        <span class="text-body-2 text-white">Borrower updated successfully!</span>
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
</style>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const editMode = ref(!!route.query.edit)
const snackbar = ref(false)
const borrower = ref({})

const getBorrower = async () => {
  const res = await $fetch(`http://localhost:1337/api/borrowers/${route.params.id}`)
  // Strapi v4+ returns data directly, not in attributes
  borrower.value = res.data || res
  console.log('Loaded borrower:', borrower.value)
}

const update = async () => {
  try {
    // Only send the specific fields we want to update
    const dataToSend = {
      name: borrower.value.name,
      email: borrower.value.email,
      contact: borrower.value.contact
    }
    
    console.log('Updating borrower with documentId:', route.params.id, 'Data:', dataToSend)
    
    await $fetch(`http://localhost:1337/api/borrowers/${route.params.id}`, {
      method: 'PUT',
      body: {
        data: dataToSend
      }
    })

    snackbar.value = true
    editMode.value = false
  } catch (error) {
    console.error('Error updating borrower:', error)
    alert('Error updating borrower: ' + error.message)
  }
}

onMounted(getBorrower)
</script>