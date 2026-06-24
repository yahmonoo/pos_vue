<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 📍 ၁။ Router ကို ဆွဲသွင်းရန် (မေ့နေခဲ့သော အချက်)

const router = useRouter() // 📍 ၂။ Router ကို စတင်အသုံးပြုရန် ကြေညာရန် (မေ့နေခဲ့သော အချက်)

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Register.vue ရဲ့ handleRegister function ထဲတွင် ပြင်ရန်
const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Password များ တူညီမှု မရှိပါရှင်။ ပြန်လည်စစ်ဆေးပေးပါ။')
    return
  }

  // 📍 LocalStorage ထဲတွင် အကောင့်အချက်အလက်ကို သိမ်းဆည်းခြင်း
  localStorage.setItem('user_name', name.value)
  localStorage.setItem('user_password', password.value)
  localStorage.setItem('user_role', 'CUSTOMER')

  // alert('အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါတယ်ရှင်။ Sign In အရင်ဝင်ပေးပါဦးနော်။')
  router.push('/login')
}
</script>
<template>
  <v-container fluid class="register-bg fill-height d-flex align-center justify-center py-10">
    <v-card width="100%" max-width="480" class="pa-8 elevation-4 rounded-xl" color="white">
      <div class="text-center mb-6">
        <h1 class="text-h4 font-weight-bold primary-title mb-2">Create Account</h1>
        <p class="text-subtitle-2 text-muted">Sign up to start shopping your favorite cosmetics.</p>
        <v-divider class="mt-4 mx-auto" width="60" color="#FFC0CB" thickness="3"></v-divider>
      </div>

      <v-form @submit.prevent="handleRegister">
        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1"
          >Full Name</span
        >
        <v-text-field
          v-model="name"
          prepend-inner-icon="mdi-account-outline"
          placeholder="Your full name"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-3 rounded-lg"
          required
        ></v-text-field>

        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1"
          >Email Address</span
        >
        <v-text-field
          v-model="email"
          prepend-inner-icon="mdi-email-outline"
          placeholder="example@gmail.com"
          type="email"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-3 rounded-lg"
          required
        ></v-text-field>

        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1"
          >Password</span
        >
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="showPassword = !showPassword"
          placeholder="Create password"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-3"
          required
        ></v-text-field>

        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1"
          >Confirm Password</span
        >
        <v-text-field
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-check-outline"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
          placeholder="Confirm password"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-6"
          required
        ></v-text-field>

        <v-btn
          type="submit"
          block
          size="large"
          class="text-none font-weight-bold rounded-lg text-white register-btn"
          elevation="2"
        >
          Sign Up
        </v-btn>
      </v-form>

      <div class="text-center mt-6 text-body-2 text-muted">
        Already have an account?
        <router-link to="/login" class="text-purple-darken-2 font-weight-bold text-decoration-none">
          Sign In instead
        </router-link>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.register-bg {
  background-color: #fff0f2;
  min-height: 100vh;
}

.primary-title {
  color: #4a154b;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.text-muted {
  color: #6c757d;
}

.register-btn {
  background: linear-gradient(135deg,rgb(228, 132, 148) 0%) !important;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.register-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

:deep(.v-field__control) {
  border-radius: 12px !important;
}
</style>
