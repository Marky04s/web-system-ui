<template>
  <v-container fluid>
    <!-- Welcome Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-700 mb-2">Dashboard</h1>
      <p class="text-subtitle-1 text-medium-emphasis">Welcome back! Here's your library overview.</p>
    </div>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="4">
        <v-card class="stats-card pa-6" elevation="0">
          <v-row align="center" class="h-100">
            <v-col cols="auto">
              <v-avatar size="64" class="bg-blue-lighten-1">
                <v-icon icon="mdi-book" size="32" color="blue" />
              </v-avatar>
            </v-col>
            <v-col>
              <p class="text-caption text-medium-emphasis font-weight-600 mb-1">TOTAL BOOKS</p>
              <h2 class="text-h4 font-weight-700">{{ stats.books }}</h2>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="stats-card pa-6" elevation="0">
          <v-row align="center" class="h-100">
            <v-col cols="auto">
              <v-avatar size="64" class="bg-green-lighten-1">
                <v-icon icon="mdi-account-group" size="32" color="green" />
              </v-avatar>
            </v-col>
            <v-col>
              <p class="text-caption text-medium-emphasis font-weight-600 mb-1">TOTAL BORROWERS</p>
              <h2 class="text-h4 font-weight-700">{{ stats.borrowers }}</h2>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="stats-card pa-6" elevation="0">
          <v-row align="center" class="h-100">
            <v-col cols="auto">
              <v-avatar size="64" class="bg-purple-lighten-1">
                <v-icon icon="mdi-swap-horizontal" size="32" color="purple" />
              </v-avatar>
            </v-col>
            <v-col>
              <p class="text-caption text-medium-emphasis font-weight-600 mb-1">TOTAL TRANSACTIONS</p>
              <h2 class="text-h4 font-weight-700">{{ stats.transactions }}</h2>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Activity Charts -->
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <v-card class="pa-6" elevation="0">
          <h3 class="text-h6 font-weight-600 mb-4">Transaction Trends</h3>
          <div class="chart-container">
            <v-row>
              <v-col v-for="(bar, index) in chartData" :key="index" class="d-flex flex-column align-center">
                <div class="chart-bar-container">
                  <div class="chart-bar" :style="{ height: bar.height + '%', backgroundColor: bar.color }"></div>
                </div>
                <p class="text-caption mt-2">{{ bar.label }}</p>
                <p class="text-caption font-weight-600">{{ bar.value }}</p>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-6" elevation="0">
          <h3 class="text-h6 font-weight-600 mb-4">System Activity</h3>
          <v-list density="compact">
            <v-list-item v-for="(log, index) in activityLogs" :key="index" class="px-0">
              <template #prepend>
                <v-icon :icon="log.icon" :color="log.color" size="20" class="mr-3"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">{{ log.message }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">{{ log.time }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Activity -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-6" elevation="0">
          <h3 class="text-h6 font-weight-600 mb-4">Recent Transactions</h3>
          <v-table>
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Book</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in recentTransactions" :key="transaction.id">
                <td>{{ transaction.borrower }}</td>
                <td>{{ transaction.book }}</td>
                <td>
                  <v-chip :color="getStatusColor(transaction.status)" size="small" variant="flat">
                    {{ transaction.status }}
                  </v-chip>
                </td>
                <td>{{ transaction.date }}</td>
                <td>
                  <v-btn size="small" variant="text" :to="`/transactions/${transaction.id}`">View</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions -->
    <v-row>
      <v-col cols="12">
        <h3 class="text-h6 font-weight-600 mb-4">Quick Actions</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="action-card pa-6" elevation="0" to="/books/create">
          <v-icon icon="mdi-plus-circle-outline" size="40" color="blue" class="mb-3" />
          <h4 class="text-subtitle-1 font-weight-600">Add Book</h4>
          <p class="text-caption text-medium-emphasis">Add a new book to your library</p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="action-card pa-6" elevation="0" to="/borrowers/create">
          <v-icon icon="mdi-plus-circle-outline" size="40" color="green" class="mb-3" />
          <h4 class="text-subtitle-1 font-weight-600">Add Borrower</h4>
          <p class="text-caption text-medium-emphasis">Register a new borrower</p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="action-card pa-6" elevation="0" to="/transactions/create">
          <v-icon icon="mdi-plus-circle-outline" size="40" color="purple" class="mb-3" />
          <h4 class="text-subtitle-1 font-weight-600">New Transaction</h4>
          <p class="text-caption text-medium-emphasis">Record a book transaction</p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="action-card pa-6" elevation="0" to="/books">
          <v-icon icon="mdi-view-list-outline" size="40" color="orange" class="mb-3" />
          <h4 class="text-subtitle-1 font-weight-600">View All</h4>
          <p class="text-caption text-medium-emphasis">Browse all records</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = ref({
  books: 0,
  borrowers: 0,
  transactions: 0
})

const recentTransactions = ref([])

const activityLogs = ref([
  { icon: 'mdi-book-plus', color: 'blue', message: 'New book added to library', time: '2 hours ago' },
  { icon: 'mdi-account-plus', color: 'green', message: 'New borrower registered', time: '3 hours ago' },
  { icon: 'mdi-swap-horizontal', color: 'purple', message: 'Book borrowed successfully', time: '5 hours ago' },
  { icon: 'mdi-book-check', color: 'orange', message: 'Book returned on time', time: '1 day ago' },
  { icon: 'mdi-alert-circle', color: 'red', message: 'Overdue book reminder sent', time: '2 days ago' },
])

const chartData = ref([
  { label: 'Mon', value: 5, height: 50, color: '#2196F3' },
  { label: 'Tue', value: 8, height: 80, color: '#2196F3' },
  { label: 'Wed', value: 3, height: 30, color: '#2196F3' },
  { label: 'Thu', value: 10, height: 100, color: '#2196F3' },
  { label: 'Fri', value: 7, height: 70, color: '#2196F3' },
  { label: 'Sat', value: 4, height: 40, color: '#2196F3' },
  { label: 'Sun', value: 2, height: 20, color: '#2196F3' },
])

const getStatusColor = (status) => {
  const colors = {
    'borrowed': 'blue',
    'returned': 'green',
    'overdue': 'red',
    'pending': 'orange'
  }
  return colors[status.toLowerCase()] || 'grey'
}

const loadStats = async () => {
  try {
    const [booksRes, borrowersRes, transactionsRes] = await Promise.all([
      $fetch('http://localhost:1337/api/books'),
      $fetch('http://localhost:1337/api/borrowers'),
      $fetch('http://localhost:1337/api/transactions')
    ])

    stats.value = {
      books: booksRes.data.length,
      borrowers: borrowersRes.data.length,
      transactions: transactionsRes.data.length
    }

    // Get recent transactions (last 5)
    const recent = transactionsRes.data.slice(0, 5).map(t => ({
      id: t.id,
      borrower: t.attributes.borrower || 'N/A',
      book: t.attributes.book || 'N/A',
      status: t.attributes.transaction_status || 'pending',
      date: new Date(t.attributes.transaction_date).toLocaleDateString()
    }))
    recentTransactions.value = recent
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

onMounted(loadStats)
</script>

<style scoped>
.stats-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stats-card:hover {
  elevation: 2;
  transform: translateY(-4px);
}

.action-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.action-card:hover {
  elevation: 2;
  transform: translateY(-4px);
  border-color: rgba(0, 0, 0, 0.12);
}

.chart-container {
  height: 200px;
  padding: 20px 0;
}

.chart-bar-container {
  height: 150px;
  width: 40px;
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.chart-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

v-table {
  border: none;
}

v-table thead tr th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}
</style>