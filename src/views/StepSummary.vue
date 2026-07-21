<template>
  <div class="summary-wrapper">
    <v-card outlined class="pa-4 invoice-card" style="border-radius: 12px; background-color: #fafafa;">
      
      <div class="text-center font-weight-bold subtitle-1 mb-4 pink--text text--darken-1">
        📋 Order Details Summary
      </div>

      <div class="info-section mb-4">
        <div class="caption grey--text font-weight-bold">CUSTOMER INFO</div>
        <div class="text-body-2 mt-1"><strong>Phone:</strong> {{ formData.phone || '-' }}</div>
        <div class="text-body-2"><strong>Address:</strong> {{ formData.address || '-' }}</div>
        <div class="text-body-2"><strong>Location:</strong> {{ formData.regionName ||  '-' }}, {{ formData.townshipName  || '-' }}</div>
        <div class="text-body-2"><strong>Payment Method:</strong> <v-chip small color="pink" dark class="font-weight-bold">{{ formData.paymentMethod || 'KPay' }}</v-chip></div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="products-section mb-4">
        <div class="caption grey--text font-weight-bold mb-2">PURCHASED ITEMS</div>
        
        <div v-if="cartItems && cartItems.length > 0">
          <div 
            v-for="item in cartItems" 
            :key="item.id" 
            class="d-flex justify-space-between align-center mb-2 item-row"
          >
            <div class="text-body-2 grey--text text--darken-3">
              • {{ item.title }} 
              <span class="grey--text text--darken-1 font-weight-bold ml-1">x{{ item.buyQuantity || 1 }}</span>
            </div>
            
            <div class="text-body-2 font-weight-bold">
              {{ (Number(item.price) ||  0) * Number(item.buyQuantity ||  1).toLocaleString() }} MMK
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-2 caption grey--text italic">
          ခြင်းတောင်းထဲတွင် ပစ္စည်းမရှိသေးပါ
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="pricing-section">
        <div class="d-flex justify-space-between mb-1 text-body-2 grey--text text--darken-2">
          <span>Subtotal (ပစ္စည်းဖိုးစုစုပေါင်း):</span>
          <span class="font-weight-bold">{{ subTotal.toLocaleString() }} MMK</span>
        </div>
        
        <div class="d-flex justify-space-between mb-2 text-body-2 grey--text text--darken-2">
          <span>Shipping Fee (ပို့ဆောင်ခ):</span>
          <span class="pink--text font-weight-bold">+ {{ currentShippingFee.toLocaleString() }} MMK</span>
        </div>
        
        <v-divider class="my-2 dashed-divider"></v-divider>

        <div class="d-flex justify-space-between subtitle-1 font-weight-bold pink--text text--darken-1 mt-1">
          <span>Total Amount:</span>
          <span>{{ finalTotalAmount.toLocaleString() }} MMK</span>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({ phone: '', address: '', city: '', township: '', paymentMethod: 'KPay', shippingFee: 0 })
    }
  },
  
  computed: {
    cartItems() {
      try {
        const localCart = localStorage.getItem('cart') || localStorage.getItem('cartItems');
        return localCart ? JSON.parse(localCart) : [];
      } catch (e) {
        return [];
      }
    },

    subTotal() {
      if (!this.cartItems || this.cartItems.length === 0) return 0;
      return this.cartItems.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const qty = Number(item.buyQuantity) || 1; 
        return sum + (price * qty);
      }, 0);
    },

    currentShippingFee() {
      if (this.formData && this.formData.shippingFee) {
        return Number(this.formData.shippingFee) || 0;
      }
      
      const savedFee = localStorage.getItem('selected_shipping_fee');
      if (savedFee) return Number(savedFee);
      
      return 3000; 
    },

    finalTotalAmount() {
      return this.subTotal + this.currentShippingFee;
    }
  }
}
</script>

<style scoped>
.summary-wrapper {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}
.invoice-card {
  border: 1px solid #e2e8f0 !important;
}
.info-section div {
  margin-bottom: 3px;
  color: #334155;
}
.item-row {
  padding: 4px 0;
}
.dashed-divider {
  border-style: dashed !important;
  border-top-width: 1px !important;
}
</style>