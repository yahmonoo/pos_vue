<template>
  <v-container fluid class="pa-6" style="background-color: #f3eae8; min-height: 100vh;">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mx-auto my-6 pa-6" max-width="580" elevation="2" style="border-radius: 16px; background-color: white; height: auto !important;">
          
          <div class="text-center font-weight-bold grey--text text--darken-3 mb-6" style="font-size: 18px;">
            {{ stepTitles[currentStep - 1] }}
          </div>

          <div class="stepper-wrapper mb-6">
            <div v-for="n in 4" :key="n" class="stepper-item" :class="{'active': currentStep >= n}">
              <div class="step-counter">{{ n }}</div>
              <div class="step-name">{{ stepTitles[n-1] }}</div>
            </div>
          </div>

          <div class="step-content-body" style="min-height: 250px;">
            <step-address v-if="currentStep === 1" :formData="checkoutForm" />
            <step-payment v-if="currentStep === 2" :formData="checkoutForm" />
            <step-shipping v-if="currentStep === 3" :formData="checkoutForm" />
            <step-summary v-if="currentStep === 4" :formData="checkoutForm" :cartItems="cartItems" :subTotal="subTotal" :totalAmount="totalAmount" />
          </div>

          <div class="d-flex justify-center mt-6">
            <v-btn color="#e48494" dark depressed class="text-white px-6 mr-4 action-btn" @click="handleBack">
              <v-icon left small>mdi-chevron-left</v-icon> Back
            </v-btn>

            <v-btn color="#e48494" dark depressed class="text-white px-6 action-btn" @click="handleNext">
              {{ currentStep === 4 ? 'Confirm Order' : 'Next' }}
              <v-icon right small v-if="currentStep < 4">mdi-chevron-right</v-icon>
            </v-btn>
          </div>

        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="invoiceDialog" max-width="450px" persistent>
      <v-card class="pa-5" style="border-radius: 16px; font-family: monospace;">
        
        <div class="text-center font-weight-bold title mb-1">Glow Skin Cosmetics</div>
        <div class="text-center caption grey--text text--darken-2 mb-4">
        Thank you for your order!
        </div>

        <div class="body-2 mb-4">
          <div class="d-flex justify-space-between">
            <span>Invoice No:</span>
            <strong>#ZM-442121</strong>
          </div>
          <div class="d-flex justify-space-between">
            <span>Date:</span>
            <span>{{ new Date().toLocaleDateString() }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Payment:</span>
            <strong class="text-uppercase">{{ checkoutForm.paymentMethod || 'KPAY' }}</strong>
          </div>
          <div class="d-flex justify-space-between">
            <span>Deliver To:</span>
            <span>{{ checkoutForm.address || '-' }}, {{ checkoutForm.township  ||'-' }}</span>
          </div>
        </div>

        <v-divider class="my-3" style="border-style: dashed;"></v-divider>

        <div class="mb-3">
          <div class="caption font-weight-bold grey--text mb-2">Item Description</div>
          
          <div 
            v-for="item in cartItems" 
            :key="item.id" 
            class="d-flex justify-space-between text-body-2 mb-1"
          >
            <span>{{ item.name }} x {{ item.quantity || 1 }}</span>
            <span>Ks {{ (Number(item.price  || 0) * Number(item.quantity  || 1)).toLocaleString() }}</span>
          </div>

          <div class="d-flex justify-space-between text-body-2 mt-2">
            <span>Delivery Fee</span>
            <span>Ks {{ (Number(checkoutForm.shippingFee) || 3000).toLocaleString() }}</span>
          </div>
        </div>

        <v-divider class="my-3" style="border-style: dashed;"></v-divider>

        <div class="d-flex justify-space-between subtitle-1 font-weight-bold py-1">
          <span>Grand Total:</span>
          <span class="pink--text text--darken-1">Ks {{ totalAmount.toLocaleString() }}</span>
          </div>

        <v-card-actions class="justify-center mt-4">
          <v-btn 
            color="pink" 
            dark 
            class="px-6" 
            style="border-radius: 8px;"
            @click="closeInvoice"
          >
            <v-icon left>mdi-check-circle-outline</v-icon>
            Done & Close
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import StepAddress from './StepAddress.vue';
import StepPayment from './StepPayment.vue';
import StepShipping from './StepShipping.vue';
import StepSummary from './StepSummary.vue';

export default {
  name: 'CheckoutView',
  components: { StepAddress, StepPayment, StepShipping, StepSummary },
  data() {
    return {
      currentStep: 1,
      stepTitles: ['Address', 'Payment Method', 'Shipping Fee', 'Order Summary'],
      invoiceDialog: false, 
      checkoutForm: {
        address: '',
        city: null,
        township: null,
        paymentMethod: 'kpay',
        shippingFee: 3000 
      }
    };
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
        return sum + (Number(item.price  || 0) * Number(item.quantity ||  1));
      }, 0);
    },
    totalAmount() {
      const deli = Number(this.checkoutForm.shippingFee) || 3000;
      return this.subTotal + deli;
    }
  },
  methods: {
    handleBack() {
      if (this.currentStep > 1) {
        this.currentStep--;
      } else {
        this.$router.push('/product');
      }
    },
    handleNext() {
      if (this.currentStep === 1) {
        if (!this.checkoutForm.address.trim() ||  !this.checkoutForm.city ||  !this.checkoutForm.township) {
          alert('ကျေးဇူးပြု၍ လိပ်စာနှင့် မြို့/မြို့နယ်များကို ပြည့်စုံအောင် ဖြည့်ပေးပါဗျာ။');
          return;
        }
      }
      
      if (this.currentStep < 4) {
        this.currentStep++;
      } else {
        alert('🎉 မှာယူမှု အောင်မြင်ပါပြီ!');
        
        
        this.invoiceDialog = true; 
      }
    },
    closeInvoice() {
      this.invoiceDialog = false; 
      localStorage.removeItem('cart');
      localStorage.removeItem('cartItems');
      
      this.$router.push('/product');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }
};
</script>

<style scoped>
.stepper-wrapper {
 display: flex; 
 justify-content: 
 space-between; 
 position: relative; 
 }
.stepper-wrapper::before { 
 content: ''; 
 position: absolute; 
 top: 15px; left: 30px; 
 right: 30px; 
 height: 2px; 
 background-color: #cbd5e1; 
 z-index: 0; 
}
.stepper-item { 
  position: relative; 
  z-index: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  flex: 1; 
}
.step-counter { 
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  background-color: #94a3b8; 
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 13px; 
  font-weight: bold; 
}
.step-name { 
  font-size: 10px; 
  color: #64748b; 
  margin-top: 6px; 
  text-align: center; 
}
.stepper-item.active .step-counter { 
  background-color: #e48494 ; 
  box-shadow: 0 0 0 4px rgba(242, 82, 170, 0.2); 
}
.stepper-item.active .step-name { 
  color: #e48494; 
  font-weight: bold; 
}
.action-btn { 
  border-radius: 6px !important; 
  font-size: 13px !important; 
  height: 36px !important; 
}

.receipt-card {
  border-radius: 16px !important;
  background-color: #ffffff !important; 
  font-family: monospace, sans-serif; 
}
.dashed-line {
  border-style: dashed !important;
  border-color: #cbd5e1 !important;
  border-width: 1px 0 0 0 !important;
}
.receipt-details {
  font-size: 12px;
}
</style>