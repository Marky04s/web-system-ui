<template>
  <v-container fluid class="pa-0" style="height: 100vh;">
    <v-row no-gutters style="height: 100%;">
      <!-- Left Panel - Login Form -->
      <v-col cols="12" md="6" class="login-panel">
        <div class="login-content pa-8">
          <h1 class="title mb-2">Welcome back</h1>
          <p class="subtitle mb-8">Please enter your credentials to sign in</p>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              dark
              required
            />

            <v-text-field
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              class="mb-2"
              dark
              required
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
            />

            <div class="d-flex justify-space-between align-center mb-6">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                density="compact"
                hide-details
                dark
              />
              <a href="#" class="forgot">Forgot password?</a>
            </div>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="login-btn mb-6"
              :loading="loading"
            >
              Sign in
            </v-btn>
          </v-form>

          <div class="divider mb-6">
            <span>OR</span>
          </div>

          <div class="socials mb-8">
            <v-btn variant="outlined" size="large" block>
              <v-icon start>mdi-google</v-icon>
              Google
            </v-btn>
          </div>

          <p class="signup text-center">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </v-col>

      <!-- Right Panel - Image -->
      <v-col cols="12" md="6" class="image-panel d-none d-md-flex">
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: false
})

import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  
  try {
    // Simple validation
    if (!email.value || !password.value) {
      alert('Please enter both email and password')
      loading.value = false
      return
    }

    // Validate Gmail email
    if (!email.value.endsWith('@gmail.com')) {
      alert('Please use a Gmail address (@gmail.com)')
      loading.value = false
      return
    }

    // For demo purposes, accept any credentials
    // In production, you'd authenticate against your backend
    console.log('Login attempt:', { email: email.value })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Store authentication state
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', email.value)
    
    // Redirect to dashboard
    navigateTo('/')
  } catch (error) {
    console.error('Login error:', error)
    alert('Login failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-panel {
  background: #0b0b0b;
  color: #fff;
  display: flex;
  align-items: center;
}

.login-content {
  width: 100%;
  max-width: 420px;
  margin: auto;
}

.title {
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  color: #b5b5b5;
  font-size: 14px;
}

.forgot {
  color: #3fa9f5;
  font-size: 13px;
  text-decoration: none;
}

.login-btn {
  text-transform: none;
  font-weight: 500;
}

.divider {
  display: flex;
  align-items: center;
  color: #8a8a8a;
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #2a2a2a;
}

.divider span {
  margin: 0 12px;
}

.socials {
  display: flex;
  gap: 16px;
}

.socials .v-btn {
  border-color: #2a2a2a;
  color: #fff;
}

.signup {
  font-size: 13px;
  color: #b5b5b5;
}

.signup a {
  color: #3fa9f5;
  text-decoration: none;
}

.image-panel {
  background-image: url('./assets/front-view-hardback-books-library.jpg');
  background-size: cover;
  background-position: center;
}
</style>