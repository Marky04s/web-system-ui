<template>
  <v-app>
    <v-layout>
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
          >
            <template #append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" />
          <v-list-item prepend-icon="mdi-list-box" title="Inventory" value="inventory" />
          <v-list-item prepend-icon="mdi-shape" title="Categories" value="categories" />
          <v-list-item prepend-icon="mdi-truck  " title="Suppliers" value="suppliers" />
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <!-- Top App Bar -->
        <v-app-bar flat color="white" elevation="1" height="72">
          <v-app-bar-title class="text-black">Application Bar</v-app-bar-title>
        </v-app-bar>

        <!-- Page Content -->
        <v-container class="mt-4">
          <NuxtPage />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)
</script>