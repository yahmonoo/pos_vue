<script>
import userAccountService from '../service/UserAccountService.js'

export default {

  data() {
    return {
      name: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      errorMessage: ''
    }
  },

  
  methods: {
    handleLogin() {
      userAccountService
        .getLogin(this.name, this.password) 
        .then((response) => {
          console.log("Backend Response Data:", response);
          if (response.userAccountId == 0) {
            this.errorMessage = 'နာမည် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည် (သို့မဟုတ်) အကောင့်မရှိသေးပါ။'
          } else {
            localStorage.setItem("loginUser", JSON.stringify(response));
            localStorage.setItem('user-token', 'true');
            localStorage.setItem('user_role', response.userType || response.usertype);
            window.dispatchEvent(new CustomEvent('login-state-changed'));

           
            if (response.userType === 'ADMIN') {
              this.$router.push('/admin'); 
            } else {
              const redirectTo = this.$route.query.redirect || '/'; 
              this.$router.push(redirectTo);
            }
          }
        })
        .catch((error) => {
          
          if (this.$swal) {
            this.$swal('Fail!', error.response?.data?.message || 'Error occurred', 'error')
          } else {
            console.error(error)
          }
        })
    }
  }
  };
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
          >Name</span>
        <v-text-field
          v-model="name"
          prepend-inner-icon="mdi-account-outline"
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
            >Forgot Password?</a>

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
