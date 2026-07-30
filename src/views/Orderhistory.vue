<template>
  <v-container>
    <div class="text-h5 font-weight-bold mb-4">My Order History</div>

    <!-- Data Loading ပြနေစဉ် -->
    <v-progress-linear v-if="loading" indeterminate color="#e48494"></v-progress-linear>

    <!-- Order မရှိသေးပါက -->
    <v-alert v-else-if="orders.length === 0" type="info" variant="tonal" class="mt-4">
      ဝယ်ယူထားသော Order မရှိသေးပါ။
    </v-alert>

    <!-- Order History List Card များ -->
    <v-row v-else>
      <v-col cols="12" v-for="(order, index) in orders" :key="order.saleId || index">
        <v-card class="pa-4" rounded="lg" elevation="1">
          
          <!-- Card Header (Voucher Code & Received Date) -->
          <div class="d-flex justify-space-between align-center mb-2">
            <div>
              <span class="text-subtitle-1 font-weight-bold">Voucher: {{ order.voucherCode }}</span>
              <div class="text-caption text-grey">{{ order.receivedDate || order.date }}</div>
            </div>
            <v-chip :color="getStatusColor(order.status)" size="small" variant="flat">
              {{ order.status || 'Success' }}
            </v-chip>
          </div>

          <v-divider class="my-2"></v-divider>

          <!-- Order Items (မှာယူထားသော ပစ္စည်းများ) -->
          <div class="my-2">
            <div 
              v-for="(item, i) in order.items" 
              :key="i" 
              class="d-flex justify-space-between text-body-2 py-1"
            >
              <span>• {{ item.productName }} <strong class="text-grey-darken-1">x{{ item.quantity }}</strong></span>
              <span>{{ item.price }} MMK</span>
            </div>
          </div>

          <v-divider class="my-2"></v-divider>

          <!-- Transaction Summary -->
          <div class="d-flex justify-space-between text-caption text-grey-darken-1">
            <span>Payment Type:</span>
            <span class="font-weight-bold">{{ order.transaction?.paymentType || 'KPay' }}</span>
          </div>

          <div class="d-flex justify-space-between text-caption text-grey-darken-1 mt-1">
            <span>Shipping Fee (ပို့ဆောင်ခ):</span>
            <span>+ {{ order.transaction?.deliFee || 0 }} MMK</span>
          </div>

          <div class="d-flex justify-space-between font-weight-bold text-subtitle-2 mt-2">
            <span>Total Amount (စုစုပေါင်း):</span>
            <span style="color: #d66182;">{{ order.transaction?.payment || order.transaction?.amount }} MMK</span>
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import saleService from '../service/SaleService.js'

export default {
  name: 'OrderHistory',
  
  // 1. Data State
  data() {
    return {
      loading: false,
      orders: [],
      userId: null
    }
  },

  // 2. Lifecycle Hook
  mounted() {
    // LocalStorage သို့မဟုတ် Session မှ User ID ယူခြင်း
    this.userId = localStorage.getItem('userId') || 1 
    this.fetchOrderHistory()
  },

  // 3. Methods (Options API)
  methods: {
    // Customer ရဲ့ Order History API ခေါ်ယူခြင်း
    fetchOrderHistory() {
      this.loading = true
      
      // မိမိ Backend API ရဲ့ Service Method ကို ခေါ်သုံးပါ
      saleService.getSaleListByUserId(this.userId)
        .then((response) => {
          this.orders = response.data || response
        })
        .catch((error) => {
          console.error("Error fetching order history:", error)
          if (this.$swal) {
            this.$swal('Error!', 'Order history ဆွဲယူရာတွင် အမှားအယွင်းရှိနေပါသည်။', 'error')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    // Order Status အလိုက် Chip Color ပြောင်းလဲပေးသည့် Method
    getStatusColor(status) {
      if (!status) return 'success'
      
      switch (status.toLowerCase()) {
        case 'delivered':
        case 'completed':
        case 'success':
          return 'green'
        case 'pending':
          return 'warning'
        case 'cancelled':
          return 'red'
        default:
          return 'grey'
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  border: 1px solid #f4d7de;
}
</style>