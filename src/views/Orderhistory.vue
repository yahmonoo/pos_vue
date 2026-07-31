<template>
  <v-container class="py-6">
    <div class="text-h5 font-weight-bold mb-4" style="color: #d66182;">
      📋 Order History
    </div>

    <!-- Data Loading State -->
    <v-progress-linear v-if="loading" indeterminate color="#e48494"></v-progress-linear>

    <!-- Order မရှိသေးပါက -->
    <v-alert v-else-if="orders.length === 0" type="info" variant="tonal" class="mt-4">
      ဝယ်ယူထားသော Order မရှိသေးပါ။
    </v-alert>

    <!-- Order List Card များ -->
    <v-row v-else>
      <v-col cols="12" md="8" class="mx-auto" v-for="(order, index) in orders" :key="order.saleId || index">
        <v-card class="pa-5 mb-4" rounded="xl" elevation="2" style="border: 1px solid #f4d7de;">
          
          <!-- Card Header (Voucher Code & Date) -->
          <div class="d-flex justify-space-between align-center mb-3">
            <div>
              <span class="text-subtitle-1 font-weight-bold">Voucher: #{{ order.voucherCode || order.saleId }}</span>
              <div class="text-caption text-grey">{{ order.receivedDate || order.date }}</div>
            </div>
            <v-chip color="pink-lighten-4" class="text-pink-darken-2 font-weight-bold" size="small" variant="flat">
              {{ order.transaction?.paymentType || 'kpay' }}
            </v-chip>
          </div>

          <v-divider class="my-3" style="border-style: dashed;"></v-divider>

          <!-- 1. PURCHASED ITEMS (မှာယူထားသော ပစ္စည်းများ) -->
          <div class="font-weight-bold text-caption text-grey-darken-2 mb-2">
            PURCHASED ITEMS
          </div>

          <div class="my-2">
            <div 
              v-for="(item, i) in (order.itemList || order.items)" 
              :key="i" 
              class="d-flex justify-space-between align-center py-1 text-body-2"
            >
              <span>• {{ item.title || item.productName }} <strong class="text-grey-darken-1">x{{ item.qty || item.quantity || 1 }}</strong></span>
              <span class="font-weight-bold">{{ (item.Price || item.priceOne || 0).toLocaleString() }} MMK</span>
            </div>
          </div>

          <v-divider class="my-3"></v-divider>

          <!-- 2. PAYMENT SUMMARY (ကျသင့်ငွေ စာရင်း) -->
          <div class="d-flex justify-space-between text-body-2 text-grey-darken-2 py-1">
            <span>Subtotal (ပစ္စည်းဖိုးစုစုပေါင်း):</span>
            <span class="font-weight-medium">{{ (order.transaction?.amount || getSubtotal(order)).toLocaleString() }} MMK</span>
          </div>

          <div class="d-flex justify-space-between text-body-2 text-grey-darken-2 py-1">
            <span>Shipping Fee (ပို့ဆောင်ခ):</span>
            <span class="font-weight-medium">+ {{ (order.transaction?.deliFee || 3000).toLocaleString() }} MMK</span>
          </div>

          <v-divider class="my-2" style="border-style: dashed;"></v-divider>

          <!-- Total Amount -->
          <div class="d-flex justify-space-between font-weight-bold text-subtitle-1 mt-2">
            <span>Total Amount:</span>
            <span style="color: #d66182;">{{ (order.transaction?.payment || (getSubtotal(order)+3000)).toLocaleString() }} MMK</span>
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

  
  mounted() {
    
    this.userId = localStorage.getItem('userId') || 1 
    this.fetchOrderHistory()
  },

 
  methods: {
   
    getSubtotal(order) {
    const list = order.itemList || order.items || order.productList || []
    return list.reduce((sum, item) => {
      const price = item.price || item.priceOne || item.unitPrice || 0
      const qty = item.buyQuantity || item.qty || item.count || 1
      return sum + (price * qty)
    }, 0)
  },
  
    
    fetchOrderHistory() {
      this.loading = true
      
      
      saleService.getSaleListByUserId(this.userId)
        .then((response) => {
          console.log("Backend Response:", response)
          this.orders = response || []
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