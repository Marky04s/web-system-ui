<template>
  <v-container>
    <h2 class="text-h5 font-weight-medium mb-4">Inventory Details</h2>
    <p><strong>Item ID:</strong> {{ id }}</p>
    <p><strong>Status:</strong> Unknown</p>

    <v-btn color="green" @click="$router.back()">Back</v-btn>
  </v-container>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
</script>
