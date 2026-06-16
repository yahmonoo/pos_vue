<template>
  <v-container class="py-8" fluid style="background-color: #fcf6f5; min-height: 100vh">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card v-if="!isLoggedIn" class="mx-auto pa-6 elevation-8" max-width="450" rounded="xl">
          <v-card-item class="text-center">
            <v-avatar color="#d78f99" size="64" class="mb-4">
              <v-icon icon="mdi-lock" size="32" color="white"></v-icon>
            </v-avatar>
            <v-card-title class="text-h5 font-weight-bold" style="color: #4a4a4a"
              >Account Login</v-card-title
            >
            <v-card-subtitle class="mt-1"
              >Please login to your account to proceed with payment</v-card-subtitle
            >
          </v-card-item>

          <v-card-text class="mt-4">
            <v-form ref="loginFormRef" v-model="isFormValid" @submit.prevent="handleLogin">
              <v-text-field
                v-model="loginForm.email"
                label="Email Address"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                color="#d78f99"
                class="mb-3"
                :rules="emailRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="loginForm.password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                type="password"
                variant="outlined"
                color="#d78f99"
                class="mb-4"
                :rules="passwordRules"
                required
              ></v-text-field>

              <v-btn
                type="submit"
                color="#d78f99"
                size="large"
                block
                class="text-white font-weight-bold"
                rounded="lg"
                elevation="2"
              >
                LOGIN
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card v-else-if="!isPaid" class="pa-6 elevation-8" rounded="xl">
          <v-card-title
            class="text-h5 font-weight-bold d-flex align-center mb-4"
            style="color: #4a4a4a"
          >
            <v-icon icon="mdi-credit-card-outline" class="mr-2" color="#d78f99"></v-icon>
            Checkout Process
          </v-card-title>

          <v-divider class="mb-6"></v-divider>

          <div class="mb-6">
            <p class="text-subtitle-1 font-weight-medium mb-3" style="color: #555">
              Select Payment Method
            </p>

            <v-radio-group v-model="paymentMethod" column-mandatory class="payment-group">
              <v-card
                :style="
                  paymentMethod === 'cash'
                    ? 'border: 2px solid #d78f99; background: #fdf2f4'
                    : 'border: 1px solid #e0e0e0'
                "
                class="pa-4 mb-2 cursor-pointer"
                rounded="lg"
                @click="paymentMethod = 'cash'"
              >
                <div class="d-flex align-center">
                  <v-icon icon="mdi-cash-multiple" size="28" color="success" class="mr-3"></v-icon>
                  <div>
                    <div class="font-weight-bold text-body-1">Cash On Delivery</div>
                    <div class="text-caption text-grey">Pay with cash upon product delivery</div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-radio value="cash" color="#d78f99"></v-radio>
                </div>
              </v-card>

              <v-card
                :style="
                  paymentMethod === 'kpay'
                    ? 'border: 2px solid #1061ab; background: #edf4fa'
                    : 'border: 1px solid #e0e0e0'
                "
                class="pa-4 mb-2 cursor-pointer"
                rounded="lg"
                @click="paymentMethod = 'kpay'"
              >
                <div class="d-flex align-center">
                  <v-avatar size="32" class="mr-3" rounded="0">
                    <v-img
                      src="https://img.icons8.com/color/48/kbz-pay.png"
                      fallback-icon="mdi-wallet"
                    ></v-img>
                  </v-avatar>
                  <div>
                    <div class="font-weight-bold text-body-1" style="color: #1061ab">KBZ Pay</div>
                    <div class="text-caption text-grey">Pre-payment via KBZ Pay transfer</div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-radio value="kpay" color="#1061ab"></v-radio>
                </div>
              </v-card>

              <v-card
                :style="
                  paymentMethod === 'wave'
                    ? 'border: 2px solid #f0a818; background: #fefaf0'
                    : 'border: 1px solid #e0e0e0'
                "
                class="pa-4 mb-2 cursor-pointer"
                rounded="lg"
                @click="paymentMethod = 'wave'"
              >
                <div class="d-flex align-center">
                  <v-icon icon="mdi-waves" size="28" color="#f0a818" class="mr-3"></v-icon>
                  <div>
                    <div class="font-weight-bold text-body-1" style="color: #e69500">
                      Wave Money
                    </div>
                    <div class="text-caption text-grey">Pre-payment via Wave Pay transfer</div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-radio value="wave" color="#f0a818"></v-radio>
                </div>
              </v-card>

              <v-card
                :style="
                  paymentMethod === 'scan'
                    ? 'border: 2px solid #9c27b0; background: #faf2fc'
                    : 'border: 1px solid #e0e0e0'
                "
                class="pa-4 mb-2 cursor-pointer"
                rounded="lg"
                @click="paymentMethod = 'scan'"
              >
                <div class="d-flex align-center">
                  <v-icon icon="mdi-qrcode-scan" size="28" color="purple" class="mr-3"></v-icon>
                  <div>
                    <div class="font-weight-bold text-body-1" style="color: #9c27b0">
                      QR Scan to Pay
                    </div>
                    <div class="text-caption text-grey">Scan QR Code to pay instantly</div>
                  </div>
                  <v-spacer></v-spacer>
                  <v-radio value="scan" color="purple"></v-radio>
                </div>
              </v-card>
            </v-radio-group>
          </div>

          <v-expand-transition>
            <div v-if="paymentMethod !== 'cash'" class="mb-6">
              <v-card
                variant="flat"
                :color="getDetailsBgColor()"
                class="pa-4 text-center"
                rounded="lg"
                style="border: 1px dashed #ccc"
              >
                <div class="font-weight-bold text-subtitle-1 mb-2 text-black">
                  Transfer Details for {{ paymentMethod.toUpperCase() }}
                </div>

                <div
                  v-if="paymentMethod === 'scan' || paymentMethod === 'kpay'"
                  class="d-flex justify-center my-3"
                >
                  <v-card
                    class="pa-2"
                    variant="outlined"
                    color="grey-lighten-2"
                    style="background: white"
                  >
                    <v-img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GlowSkinCosmetics"
                      width="150"
                      height="150"
                    ></v-img>
                  </v-card>
                </div>

                <div
                  class="d-flex align-center justify-center text-body-1 font-weight-black my-2 text-black"
                >
                  <span>Phone: 09-791957484</span>
                  <v-btn
                    icon="mdi-content-copy"
                    size="x-small"
                    variant="text"
                    color="primary"
                    class="ml-2"
                    @click="copyText('09-777888999')"
                  >
                    <v-tooltip activator="parent" location="top">Copy Number</v-tooltip>
                  </v-btn>
                </div>
                <div class="text-caption text-grey-darken-2">Account Name: Mg Mg (Glow Skin)</div>
                <div class="text-caption text-error font-weight-bold mt-2">
                  ⚠️ Please keep the transaction screenshot after payment.
                </div>
              </v-card>
            </div>
          </v-expand-transition>

          <v-card
            variant="outlined"
            color="#eee"
            class="pa-4 mb-6"
            style="background-color: #fafafa; border-radius: 12px"
          >
            <div class="text-subtitle-1 font-weight-bold mb-3" style="color: #4a4a4a">
              Order Summary
            </div>
            <div
              v-for="item in cartStore.cartItems"
              :key="item.id"
              class="d-flex justify-between align-center mb-2 text-body-2 text-black"
            >
              <span class="flex-grow-1"
                >{{ item.name }} <b style="color: #d78f99">x {{ item.quantity }}</b></span
              >
              <span class="font-weight-medium"
                >{{ (item.price * item.quantity).toLocaleString() }} Ks</span
              >
            </div>
            <v-divider class="my-3"></v-divider>
            <div class="d-flex justify-space-between text-subtitle-1 font-weight-bold text-black">
              <span>Total Amount:</span>
              <span style="color: #d78f99; font-size: 1.2rem"
                >{{ cartStore.cartTotalAmount?.toLocaleString() || '75,000' }} Ks</span
              >
            </div>
          </v-card>

          <v-row dense>
            <v-col cols="6">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                block
                size="large"
                rounded="lg"
                to="/cart"
                >Back to Cart</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                color="#d78f99"
                class="text-white font-weight-bold"
                block
                size="large"
                rounded="lg"
                elevation="2"
                @click="processPayment"
              >
                Confirm Order
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          v-else
          class="pa-8 elevation-10 mx-auto"
          max-width="500"
          rounded="xl"
          style="background-color: #ffffff; border-top: 8px solid #d78f99"
        >
          <div class="text-center mb-6">
            <h2 class="font-weight-black" style="color: #d78f99; letter-spacing: 1px">GLOW SKIN</h2>
            <div class="text-caption text-grey-darken-1 font-weight-medium">
              Cosmetics & Beauty Supply
            </div>
            <div class="text-caption text-grey">Mandalay, Phone: 09-XXXXXXX</div>
          </div>

          <div class="d-flex justify-space-between text-caption text-grey-darken-2 mb-2">
            <span>Invoice No: #GS-{{ Math.floor(Math.random() * 90000) + 10000 }}</span>
            <span>Date: {{ currentDate }}</span>
          </div>
          <div class="text-caption text-grey-darken-2 mb-4">
            Customer: {{ loginForm.email.split('@')[0] }} (Snowy)
          </div>

          <v-divider style="border-style: dashed"></v-divider>

          <div class="py-4">
            <v-row class="text-caption font-weight-bold text-grey-darken-3 mb-2" dense>
              <v-col cols="6">Item Name</v-col>
              <v-col cols="2" class="text-center">Price</v-col>
              <v-col cols="1" class="text-center">Qty</v-col>
              <v-col cols="3" class="text-right">Amount</v-col>
            </v-row>
            <v-divider class="mb-2"></v-divider>

            <v-row
              v-for="item in receiptItems"
              :key="item.id"
              class="text-body-2 text-black mb-2 align-center"
              dense
            >
              <v-col cols="6" class="text-truncate font-weight-medium">{{ item.name }}</v-col>
              <v-col cols="2" class="text-center text-caption">{{
                item.price.toLocaleString()
              }}</v-col>
              <v-col cols="1" class="text-center">{{ item.quantity }}</v-col>
              <v-col cols="3" class="text-right font-weight-medium">{{
                (item.price * item.quantity).toLocaleString()
              }}</v-col>
            </v-row>
          </div>

          <v-divider style="border-style: dashed" class="mb-4"></v-divider>

          <div class="text-body-2 text-grey-darken-3">
            <div class="d-flex justify-space-between mb-1">
              <span>Total Items:</span>
              <span class="font-weight-bold text-black">{{ totalReceiptQuantity }} pcs</span>
            </div>
            <div class="d-flex justify-space-between mb-1">
              <span>Subtotal:</span>
              <span class="font-weight-medium text-black"
                >{{ totalReceiptAmount.toLocaleString() }} Ks</span
              >
            </div>
            <div class="d-flex justify-space-between mb-1">
              <span>Delivery Fee:</span>
              <span class="text-success font-weight-medium">0 Ks (Free)</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between text-subtitle-1 font-weight-black text-black">
              <span>Total Amount:</span>
              <span style="color: #d78f99; font-size: 1.3rem"
                >{{ totalReceiptAmount.toLocaleString() }} Ks</span
              >
            </div>
            <div class="d-flex justify-space-between text-caption text-grey-darken-1 mt-2">
              <span>Payment Method:</span>
              <span class="font-weight-bold text-success text-uppercase">{{
                paymentMethodName
              }}</span>
            </div>
          </div>
          <div class="text-center mt-8">
            <v-icon icon="mdi-heart" color="pink" size="small" class="mb-1"></v-icon>
            <div class="text-caption font-weight-bold" style="color: #4a4a4a">
              Thank you for shopping with us!
            </div>
            <div class="text-caption text-grey mt-1">
              Defective items can be exchanged within 3 days.
            </div>

            <v-btn
              color="#d78f99"
              variant="flat"
              class="text-white mt-6 font-weight-bold"
              rounded="pill"
              block
              to="/"
            >
              <v-icon icon="mdi-home" class="mr-1"></v-icon> Back to Home
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" timeout="2000" color="success" rounded="pill">
      Phone number copied to clipboard!
    </v-snackbar>
  </v-container>
</template>

<script>
import { useCartStore } from '@/store/cartStore'

export default {
  data: () => ({
    isLoggedIn: false,
    isPaid: false,
    paymentMethod: 'cash',
    snackbar: false,
    isFormValid: false,
    currentDate: new Date().toLocaleDateString('en-GB'),
    loginForm: {
      email: '',
      password: '',
    },

    // Validation Rules
    emailRules: [
      (v) => !!v || 'Email is required',
      (v) => v.includes('@') || 'Email must contain "@" symbol',
      (v) => /.+@.+\..+/.test(v) || 'Invalid email format',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 4) || 'Password must be at least 4 characters',
    ],

    receiptItems: [],
    totalReceiptAmount: 0,
    totalReceiptQuantity: 0,
    paymentMethodName: 'Cash On Delivery',
  }),

  computed: {
    cartStore() {
      return useCartStore()
    },
  },

  methods: {
    async handleLogin() {
      const { valid } = await this.$refs.loginFormRef.validate()
      if (valid) {
        this.isLoggedIn = true
      }
    },

    getDetailsBgColor() {
      if (this.paymentMethod === 'kpay') return '#edf4fa'
      if (this.paymentMethod === 'wave') return '#fefaf0'
      if (this.paymentMethod === 'scan') return '#faf2fc'
      return '#fafafa'
    },

    copyText(text) {
      navigator.clipboard.writeText(text)
      this.snackbar = true
    },

    processPayment() {
      console.log(this.cartStore)
      this.receiptItems = [...this.cartStore.cart]
      this.totalReceiptAmount = this.cartStore.totalAmount || 75000
      this.totalReceiptQuantity = this.cartStore.cartTotalItems

      if (this.paymentMethod === 'cash') this.paymentMethodName = 'Cash On Delivery'
      if (this.paymentMethod === 'kpay') this.paymentMethodName = 'KBZ Pay (Online)'
      if (this.paymentMethod === 'wave') this.paymentMethodName = 'Wave Money (Online)'
      if (this.paymentMethod === 'scan') this.paymentMethodName = 'QR Scan to Pay'

      this.isPaid = true

      if (this.cartStore.clearCart) {
        this.cartStore.clearCart()
      }
    },
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.justify-between {
  justify-content: space-between;
}
</style>
