
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 
import userAccountService from '../service/UserAccountService.js'

const router = useRouter() 
const profilename = ref('')
const userName = ref('')
const phone = ref('')
const address = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = () => {
 
  const phoneRegex = /^09\d{7,9}$/
  if (!phoneRegex.test(phone.value)) {
    alert('Phone Number Format is incorrect(eg- 09123456789 start 09 and at least 9/10 numbers)')
    return
  }

  if (password.value.length < 8) {
    alert('Password at least 8 letters')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Password are not the same. Please check ')
    return
  }

  let obj = {
    profileName: profilename.value,
    townshipId: 1,
    userName: userName.value,
    password: password.value,
    userType: "CUSTOMER",
    phone: phone.value,
    address: address.value
  }

  userAccountService
    .addUseraccount(obj)
    .then(() => {
      alert('Account ဖန်တီးခြင်း အောင်မြင်ပါသည်။')
      router.push('/login')
    })
    .catch((error) => {
      alert(error.response?.data?.message || 'Register ပြုလုပ်၍ မရပါရှင်။')
    })
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
          >Profile Name</span>
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
          >User Name</span>
        <v-text-field
          v-model="userName"
          prepend-inner-icon="mdi-email-outline"
          placeholder="user name"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-3 rounded-lg"
          required
        ></v-text-field>
        <!-- Phone Number -->
        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1">Phone Number</span>
        <v-text-field
          v-model="phone"
          prepend-inner-icon="mdi-phone-outline"
          placeholder="09xxxxxxxxx"
          type="tel"
          variant="outlined"
          density="comfortable"
          color="#4a154b"
          class="mb-3 rounded-lg"
          required
        ></v-text-field>

       <!-- Address -->
<span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1">Address</span>
<v-text-field
  v-model="address"
  prepend-inner-icon="mdi-map-marker-outline"
  placeholder="Enter your address"
  variant="outlined"
  density="comfortable"
  color="#4a154b"
  class="mb-3 rounded-lg"
  required
></v-text-field>

        <span class="text-caption font-weight-medium text-grey-darken-1 d-block mb-1"
          >Password</span>
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
          >Confirm Password</span>
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
