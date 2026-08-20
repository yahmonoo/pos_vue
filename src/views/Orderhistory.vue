<template>
  <v-container class="py-6">
    <v-row class="mb-4">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold grey--text text--darken-3">
          ဝယ်ယူခဲ့သော ပစ္စည်းများ စာရင်း
        </h2>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10">
      <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
      <p class="mt-3 grey--text">ခဏစောင့်ပါ...</p>
    </div>

    <!-- Empty State -->
    <v-card v-else-if="!orders || orders.length === 0" class="text-center py-10 elevation-1 rounded-lg">
      <v-icon size="64" color="grey lighten-1">mdi-cart-off</v-icon>
      <h3 class="mt-3 grey--text text--darken-1">ဝယ်ယူထားသော ပစ္စည်းစာရင်း မရှိသေးပါ။</h3>
    </v-card>

    <!-- Order Items List Table (Vuetify 3 Ready) -->
    <v-card v-else class="elevation-1 rounded-lg style-card">
      <v-table class="w-100">
        <thead>
          <tr>
            <th class="text-left font-weight-bold">Order ID</th>
            <th class="text-left font-weight-bold">ပစ္စည်းအမည်</th>
            <th class="text-center font-weight-bold">အရေအတွက်</th>
            <th class="text-right font-weight-bold">တစ်လုံးဈေး</th>
            <th class="text-right font-weight-bold">လျှော့ဈေး</th>
            <th class="text-right font-weight-bold">စုစုပေါင်း ကျသင့်ငွေ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.itemTransactionId || item.productId">
            <td>#{{ item.saleId || item.id }}</td>
            <td class="font-weight-medium">
              <div class="d-flex align-center py-2">
                <v-avatar size="40" class="mr-3 grey lighten-3">
                  <v-img 
                    v-if="item.productImage" 
                    :src="getImageUrl(item.productImage)" 
                    :alt="item.productName"
                    cover
                  ></v-img>
                  <v-icon v-else color="grey">mdi-package-variant</v-icon>
                </v-avatar>
                <span>{{ item.productName || 'Product #' + item.productId }}</span>
              </div>
            </td>
            <td class="text-center">{{ item.qty }}</td>
            <td class="text-right">{{ formatPrice(item.unitPrice) }} Ks</td>
            <td class="text-right red--text text--accent-4">
              {{ item.discount > 0 ? '-' + formatPrice(item.discount) + ' Ks' : '-' }}
            </td>
            <td class="text-right primary--text font-weight-bold">
              {{ formatPrice(item.amount) }} Ks
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "CustomerOrderHistory",
  data() {
    return {
      orders: [],
      loading: false,
      baseUrl: "http://localhost:8088/api/v1/productphoto/"
    }
  },
  mounted() {
    this.fetchOrderHistory()
  },
  methods: {
    fetchOrderHistory() {
      this.loading = true
      const userId = localStorage.getItem("userId") || 1 

      // Backend API URL ကို အပြည့်အစုံ ရေးပေးထားပါသည်
      axios
        .get(`http://localhost:8088/api/user-orders/${userId}`)
        .then((response) => {
          console.log("Response Data:", response.data)
          this.orders = response.data || []
        })
        .catch((error) => {
          console.error("Error fetching order history:", error)
          if (this.$swal) {
            this.$swal({
              icon: 'error',
              title: 'Error!',
              text: 'Order history ဆွဲယူရာတွင် အမှားအယွင်းရှိနေပါသည်။',
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    getImageUrl(imageName) {
      if (!imageName) return ''
      if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
        return imageName
      }
      return `${this.baseUrl}${imageName}`
    },

    formatPrice(value) {
      if (value === null || value === undefined) return '0'
      return Number(value).toLocaleString()
    }
  }
}
</script>

<style scoped>
.style-card {
  border: 1px solid #f4d7de;
}
</style>