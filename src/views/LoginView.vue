<template>
  <v-container fluid class="d-flex align-center justify-center" style="background-color: #f3eae8; min-height: 100vh;">
    <v-card class="pa-6" width="100%" max-width="420" elevation="3" style="border-radius: 16px; background-color: white;">
      
      <div v-if="isLoginMode">
        <div class="text-center mb-6">
          <v-avatar color="pink lighten-4" size="64" class="mb-2">
            <v-icon size="36" color="pink">mdi-account-lock-outline</v-icon>
          </v-avatar>
          <h2 class="headline font-weight-bold grey--text text--darken-3">Welcome Back</h2>
          <p class="caption grey--text">Please login to continue shopping</p>
        </div>

        <v-form ref="loginForm" v-model="isLoginFormValid" lazy-validation @submit.prevent="handleLogin">
          <span class="subtitle-2 font-weight-medium grey--text text--darken-2">Profile Name</span>
          <v-text-field
            v-model="loginData.profileName"
            :rules="[v => !!v || 'Profile Name ဖြည့်ရန် လိုအပ်ပါသည်ဗျာ']"
            placeholder="Enter your profile name"
            dense
            outlined
            prepend-inner-icon="mdi-account"
            class="mt-1 mb-2"
            color="pink"
            required
          ></v-text-field>

          <span class="subtitle-2 font-weight-medium grey--text text--darken-2">Password</span>
          <v-text-field
            v-model="loginData.password"
            :rules="[v => !!v || 'Password ဖြည့်ရန် လိုအပ်ပါသည်ဗျာ']"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            dense
            outlined
            prepend-inner-icon="mdi-lock"
            class="mt-1"
            color="pink"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <v-btn
            :disabled="!isLoginFormValid"
            :loading="loading"
            color="#d78f99"
            dark
            block
            large
            depressed
            type="submit"
            class="text-none mt-4"
            style="border-radius: 8px; font-size: 16px;"
          >
            Sign In
          </v-btn>
        </v-form>

        <div class="text-center mt-6 caption grey--text">
          Don't have an account? 
          <span class="pink--text font-weight-bold" style="cursor: pointer;" @click="toggleMode">Register</span>
        </div>
      </div>

      <div v-else>
        <div class="text-center mb-6">
          <v-avatar color="pink lighten-4" size="64" class="mb-2">
            <v-icon size="36" color="pink">mdi-account-plus-outline</v-icon>
          </v-avatar>
          <h2 class="headline font-weight-bold grey--text text--darken-3">Create Account</h2>
          <p class="caption grey--text">Sign up to get started</p>
        </div>

        <v-form ref="registerForm" v-model="isRegisterFormValid" lazy-validation @submit.prevent="handleRegister">
          <span class="subtitle-2 font-weight-medium grey--text text--darken-2">Profile Name</span>
          <v-text-field
            v-model="registerData.profileName"
            :rules="[v => !!v || 'Profile Name ဆောက်ရန် လိုအပ်ပါသည်ဗျာ']"
            placeholder="Choose a profile name"
            dense
            outlined
            prepend-inner-icon="mdi-account"
            class="mt-1 mb-2"
            color="pink"
            required
          ></v-text-field>

          <span class="subtitle-2 font-weight-medium grey--text text--darken-2">Password</span>
          <v-text-field
            v-model="registerData.password"
            :rules="[v => !!v  ||'Password သတ်မှတ်ရန် လိုအပ်ပါသည်ဗျာ', v => v.length >= 4  || 'Password အနည်းဆုံး ၄ လုံး ရှိရပါမယ်']"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Create a password"
            dense
            outlined
            prepend-inner-icon="mdi-lock"
            class="mt-1"
            color="pink"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <v-btn
            :disabled="!isRegisterFormValid"
            :loading="loading"
            color="#d78f99"
            dark
            block
            large
            depressed
            type="submit"
            class="text-none mt-4"
            style="border-radius: 8px; font-size: 16px;"
          >
            Sign Up
          </v-btn>
        </v-form>

        <div class="text-center mt-6 caption grey--text">
          Already have an account? 
          <span class="pink--text font-weight-bold" style="cursor: pointer;" @click="toggleMode">Login</span>
        </div>
      </div>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      isLoginMode: true, 
      isLoginFormValid: true,
      isRegisterFormValid: true,
      loading: false,
      showPassword: false,
      loginData: {
        profileName: '',
        password: ''
      },
      registerData: {
        profileName: '',
        phone: '',
        password: ''
      },
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.showPassword = false;
      if (this.$refs.loginForm) this.$refs.loginForm.resetValidation();
      if (this.$refs.registerForm) this.$refs.registerForm.resetValidation();
    },
    handleLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          
          localStorage.setItem('user-token', 'mock-jwt-token-12345');
          localStorage.setItem('user-info', JSON.stringify({ name: this.loginData.profileName }));

          this.navigateUser();
        }, 1000);
      }
    },
    handleRegister() {
      if (this.$refs.registerForm.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          
          alert('အကောင့်အသစ် ဖွင့်လှစ်ခြင်း အောင်မြင်ပါပြီဗျာ!');
          
          localStorage.setItem('user-token', 'mock-jwt-token-12345');
          localStorage.setItem('user-info', JSON.stringify({ name: this.registerData.profileName }));

          this.navigateUser();
        }, 1000);
      }
    },
    navigateUser() {
  if (this.$route.query.fromCart) {
    this.$router.push('/checkOut');
  } else {
    this.$router.push('/product');
  }
  
  window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
}
  }
};
</script>

<style scoped>
::v-deep .v-text-field--outlined fieldset {
  border-color: #cbd5e1 !important;
}
::v-deep .v-text-field--outlined:hover fieldset {
  border-color: #d78f99 !important;
}
</style>