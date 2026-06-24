<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const errorMessage = ref('') // 📍 ၁။ Error စာသားသိမ်းရန် Variable အသစ်တိုးလိုက်ပါသည်

// Login.vue ရဲ့ handleLogin function ထဲတွင် ပြင်ရန်
const handleLogin = () => {
  // 📍 LocalStorage ထဲက Sign Up တုန်းက သိမ်းခဲ့တဲ့ အချက်အလက်ကို ပြန်ထုတ်ယူခြင်း
  const savedName = localStorage.getItem('user_name')
  const savedPassword = localStorage.getItem('user_password')
  const savedRole = localStorage.getItem('user_role')

  // Sign Up လုပ်ထားတာ ရှိ၊ မရှိ အရင်စစ်ပြီးမှ Password တိုက်စစ်မည်
  if (name.value === savedName && password.value === savedPassword) {
    errorMessage.value = ''
    localStorage.setItem('user_role', savedRole)
    // alert('Login အောင်မြင်ပါတယ်ရှင်!')
    if (savedRole == 'CUSTOMER') {
     window.location.href = '/' // Home Page သို့ သွားမည်
    } else {
      window.location.href = '/‌admin'
    }
  } else {
    errorMessage.value =
      'နာမည် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည် (သို့မဟုတ်) အကောင့်မရှိသေးပါ။'
  }
}
</script>

<template>
  <v-container fluid class="login-bg fill-height d-flex align-center justify-center">
    <v-card width="100%" max-width="450" class="pa-8 elevation-4 rounded-xl" color="white">
      <div class="text-center mb-6">
        <h1 class="text-h4 font-weight-bold primary-title mb-2">Glow Skin</h1>
        <p class="text-subtitle-2 text-muted">Welcome back! Please login to your account.</p>
        <v-divider class="mt-4 mx-auto" width="60" color="#FFC0CB" thickness="3"></v-divider>
      </div>

      <v-form @submit.prevent="handleLogin" >
        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1"
          >Name</span
        >
        <v-text-field
          v-model="name"
          prepend-inner-icon="mdi-name-outline"
          placeholder="Enter your name"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-3 rounded-lg"
          required
        ></v-text-field>

        <div class="d-flex justify-space-between align-center mb-1">
          <span class="text-caption font-weight-medium text-grey-darken-1">Password</span>
          <a
            href="#"
            class="text-caption text-purple-darken-2 font-weight-bold text-decoration-none"
            >Forgot Password?</a
          >
        </div>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="showPassword = !showPassword"
          placeholder="Enter your password"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-2"
          required
        ></v-text-field>

        <v-checkbox
          v-model="rememberMe"
          label="Remember me"
          color="#4a154b"
          hide-details
          class="mt-n2 mb-4"
          density="compact"
        ></v-checkbox>

        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          density="compact"
          class="mb-4 text-caption rounded-lg"
        >
          {{ errorMessage }}
        </v-alert>

        <v-btn
          type="submit"
          block
          size="large"
          class="text-none font-weight-bold rounded-lg text-white login-btn"
          elevation="2"
          
        >
          Sign In
        </v-btn>
      </v-form>

      <div class="text-center mt-6 text-body-2 text-muted">
        Don't have an account?
        <router-link to="/reg" class="text-purple-darken-2 font-weight-bold text-decoration-none">
          Create an account
        </router-link>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.login-bg {
  background-color: #fff0f2;
  min-height: 100vh;
}

.primary-title {
  color: black;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.text-muted {
  color: #6c757d;
}

.login-btn {
  background: linear-gradient(135deg,rgb(228, 132, 148) 0%) !important;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.login-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

:deep(.v-field__control) {
  border-radius: 12px !important;
}
</style>
