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
            prepend-avatar="https://media.tenor.com/n15TsLOvpRcAAAAe/alden-richards-alden-dila.png"
            title="Mark Casilang"
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

        <!-- Sidebar Menu -->
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard-edit"
            title="Dashboard"
            to="/"
            value="Dashboard"
          />
          <v-list-item
            prepend-icon="mdi-clipboard-list"
            title="Inventory"
            value="shared"
            to="/inventory"
          />
          <v-list-item
            prepend-icon="mdi-shape"
            title="Categories"
            to="/categories"
            value="Categories"
          />
          <v-list-item
            prepend-icon="mdi-truck-delivery"
            title="Suppliers"
            to="/suppliers"
            value="Suppliers"
          />
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <!-- App Bar -->
        <v-app-bar color="white" elevation="1" height="72">
          <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>
          <v-app-bar-title class="text-black">Application Bar</v-app-bar-title>

          <v-spacer></v-spacer>

        </v-app-bar>

        <!-- Dynamic Page Content -->
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