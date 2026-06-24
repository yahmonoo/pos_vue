<template>
  <div class="text-center">
    <div class="grey--text text--darken-2 font-weight-bold mb-5" style="font-size: 14px;">
      Select Payment Method
    </div>

    <div class="d-flex justify-center align-center flex-wrap gap-4">
      
      <div 
        class="payment-box" 
        :class="{'selected': formData.paymentMethod === 'cod'}"
        @click="selectPayment('cod')"
      >
        <v-icon size="32" color="blue-grey darken-1" class="mb-1">mdi-truck-delivery-outline</v-icon>
        <div class="payment-title">Cash on Deli</div>
      </div>

      <div 
        class="payment-box" 
        :class="{'selected': formData.paymentMethod === 'kpay'}"
        @click="selectPayment('kpay')"
      >
        <v-avatar size="32" class="mb-1" tile>
          <v-icon color="blue darken-3" size="32">mdi-alpha-k-box</v-icon>
        </v-avatar>
        <div class="payment-title font-weight-bold">KBZ Pay</div>
      </div>

      <div 
        class="payment-box" 
        :class="{'selected': formData.paymentMethod === 'wave'}"
        @click="selectPayment('wave')"
      >
        <v-avatar size="32" class="mb-1" tile>
          <v-icon color="orange darken-3" size="32">mdi-alpha-w-box</v-icon>
        </v-avatar>
        <div class="payment-title font-weight-bold">Wave Pay</div>
      </div>

    </div>

    <v-expand-transition>
      <div v-if="formData.paymentMethod === 'kpay' || formData.paymentMethod === 'wave'" class="qr-container mt-6 mx-auto pa-4 rounded-lg grey lighten-4">
        
        <p v-if="formData.paymentMethod === 'kpay'" class="font-weight-bold blue--text text--darken-3 mb-2">
          📲 KBZ Pay QR Code အား Scan ဖတ်၍ ငွေချေနိုင်ပါသည်
        </p>
        <p v-if="formData.paymentMethod === 'wave'" class="font-weight-bold orange--text text--darken-4 mb-2">
          📲 Wave Pay QR Code အား Scan ဖတ်၍ ငွေချေနိုင်ပါသည်
        </p>

        <v-img
          :src="getPaymentQR(formData.paymentMethod)"
          max-width="200"
          class="mx-auto my-3 elevation-2 rounded-lg bg-white"
          alt="Payment QR"
        ></v-img>

        <div class="caption grey--text text--darken-3 mt-2 font-weight-medium">
          <div v-if="formData.paymentMethod === 'kpay'">
            <p class="mb-1"><strong>Kpay name:</strong> Daw Ti</p>
            <p class="mb-0"><strong>Phno:</strong> 09 123456789</p>
          </div>
          <div v-if="formData.paymentMethod === 'wave'">
            <p class="mb-1"><strong>Wave name:</strong> U TI TI</p>
            <p class="mb-0"><strong>phno:</strong> 09 123456789</p>
          </div>
        </div>

      </div>
    </v-expand-transition>
    </div>
</template>

<script>
export default {
  props: ['formData'],
  methods: {
    selectPayment(method) {
      this.formData.paymentMethod = method;
    },
    getPaymentQR(method) {
      try {
        if (method === 'kpay') {
          return new URL('../assets/images/kpay-qr.png', import.meta.url).href;
        } else if (method === 'wave') {
          return new URL('../assets/images/wave-qr.png', import.meta.url).href;
        }
        return '';
      } catch (e) {
        return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${method}-payment`;
      }
    }
  }
}
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
.payment-box {
  width: 95px;
  height: 90px;
  background-color: #f1f5f9;
  border: 2px solid transparent;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
}
.payment-box:hover {
  background-color: #e2e8f0;
}
.payment-box.selected {
  background-color: #ffffff !important;
  border-color: #2563eb !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.payment-title {
  font-size: 11px;
  color: #334155;
  margin-top: 4px;
  text-align: center;
  white-space: nowrap;
}
.qr-container {
  max-width: 320px;
  border: 1px dashed #cbd5e1;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}
</style>