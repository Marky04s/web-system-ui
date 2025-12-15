<!-- <template>
  <v-container>
    <h2 class="text-h5 mb-4">Transactions</h2>
    <v-btn color="green" class="mb-4" to="/transactions/create">Add Transaction</v-btn>

    <v-data-table :headers="headers" :items="transactions">
      <template #["item.actions"]="{ item }">
        <v-btn size="small" @click="view(item.id)">View</v-btn>
        <v-btn size="small" color="blue" @click="edit(item.id)">Edit</v-btn>
        <v-btn size="small" color="red" @click="remove(item.id)">Delete</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const baseUrl = useRuntimeConfig().public.strapiBaseUrl
const token = useRuntimeConfig().public.strapiToken

const transactions = ref([])
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Borrower', key: 'borrower' },
  { title: 'Book', key: 'book' },
  { title: 'Transaction Date', key: 'transaction_date' },
  { title: 'Status', key: 'transaction_status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const fetchTransactions = async () => {
  const res = await $fetch(`${baseUrl}/api/transactions`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  transactions.value = res.data.map(t => ({ id: t.id, ...t.attributes }))
}

const view = id => navigateTo(`/transactions/${id}`)
const edit = id => navigateTo(`/transactions/${id}?edit=true`)
const remove = async id => {
  if (!confirm('Delete this transaction?')) return
  await $fetch(`${baseUrl}/api/transactions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  fetchTransactions()
}

onMounted(fetchTransactions)
</script> -->

<template>
  <div>
    <h1>Transaction</h1>

    <v-data-table 
    :headers="headers"
    :items="transactions"
    ></v-data-table>


  </div>
</template>

<script setup>

const headers = [

  { title : "Transaction Date", value: "transaction_date" },
  { title : "Transaction_Status", value: "transaction_status" },
  { title : "Created At", value: "createdAt" },
];

const transactions = ref ([]);

const getTransactions = async () => {
  const res = await $fetch('http://localhost:1337/api/transactions', {
   
  }).catch((err) => {
    console.log(err);
    return null;
  });

  if (res) {
    transactions.value = res.data
    console.log(res);
  } else {

    console.log("error loading suppliers")
  }
}


onMounted(async () => {
  await getTransactions()
})
</script>

<style>

</style>