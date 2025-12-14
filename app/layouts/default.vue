<template>
  <v-app>
    <v-layout>
      <!-- Sidebar -->
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent>
        <v-list>
          <v-list-item
            prepend-avatar="https://media.tenor.com/n15TsLOvpRcAAAAe/alden-richards-alden-dila.png"
            title="Admin"
          >
            <template #append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              />
            </template>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            to="/"
          />

          <v-list-item
            prepend-icon="mdi-book"
            title="Books"
            to="/books"
          />

          <v-list-item
            prepend-icon="mdi-account-group"
            title="Borrowers"
            to="/borrowers"
          />

          <v-list-item
            prepend-icon="mdi-swap-horizontal"
            title="Transactions"
            to="/transactions"
          />
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-app-bar color="white" elevation="1">
          <v-app-bar-nav-icon @click="rail = !rail" />
          <v-app-bar-title>Library Management System</v-app-bar-title>
        </v-app-bar>

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