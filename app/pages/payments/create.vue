        <template>
        <v-container>
            <h2 class="text-h5 mb-4">Add Payment</h2>
            <v-card class="pa-4">
            <v-form>
                <v-text-field v-model="form.name" label="Payment Name" />
                <v-text-field v-model="form.amount" label="Amount" type="number" />
                <v-text-field v-model="form.method" label="Method" />
                <v-text-field v-model="form.date" label="Date" type="date" />
                <v-btn color="primary" class="mt-4" @click="save">Save</v-btn>
            </v-form>
            </v-card>
        </v-container>
        </template>

        <script setup>
        import { reactive } from 'vue'
        import { usePayments } from '~/composables/usePayments'

        const { createPayment } = usePayments()

        const form = reactive({ name: "", amount: "", method: "", date: "" })

        const save = async () => {
        await createPayment(form)
        navigateTo("/payments")
        }
        </script>   