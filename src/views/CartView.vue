<template>
  <v-container class="py-10">
    <h2 class="text-h5 font-weight-bold mb-6 text-grey-darken-3">🛒 Your Shopping Cart</h2>

    <v-row>
      <v-col cols="12" md="8">
        <v-card v-if="cartStore.cart.length === 0" class="pa-10 text-center rounded-xl" elevation="1">
          <v-icon icon="mdi-cart-outline" size="64" color="grey-lighten-1" class="mb-4" />
          <p class="text-body-1 text-grey-darken-1 mb-4">Your cart is currently empty.</p>
          <v-btn to="/product" color="#d78f99" class="text-white">Go to Shop</v-btn>
        </v-card>

        <v-card v-else class="pa-4 rounded-xl" elevation="1">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-center">Quantity</th>
                <th class="text-right">Price</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.cart" :key="item.id">
                <td class="d-flex align-center py-2">
                  <v-avatar size="50" rounded class="mr-3">
                    <v-img :src="item.image" />
                  </v-avatar>
                  <div>
                    <div class="font-weight-bold text-body-2">{{ item.name }}</div>
                    <div class="text-caption text-grey">{{ item.brand }}</div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex align-center justify-center">
                    <v-btn icon="mdi-minus" size="x-small" variant="text" @click="cartStore.updateQuantity(item.id, item.quantity - 1)" />
                    <span class="mx-3 text-body-2">{{ item.quantity }}</span>
                    <v-btn icon="mdi-plus" size="x-small" variant="text" @click="cartStore.updateQuantity(item.id, item.quantity + 1)" />
                  </div>
                </td>
                <td class="text-right font-weight-bold text-body-2">Ks {{ (item.price * item.quantity).toLocaleString() }}</td>
                <td class="text-center">
                  <v-btn icon="mdi-delete-outline" color="red-lighten-1" size="small" variant="text" @click="cartStore.updateQuantity(item.id, 0)" />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" v-if="cartStore.cart.length > 0">
        <v-card class="pa-5 rounded-xl border-rose" elevation="1">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Order Summary</h3>
          <div class="d-flex justify-space-between text-body-2 mb-2">
            <span>Total Items:</span>
            <span class="font-weight-bold">{{ cartStore.cartTotalItems }} items</span>
          </div>
          <div class="d-flex justify-space-between text-subtitle-1 font-weight-black text-pink-darken-1 mb-6 pt-2 border-top">
            <span>Total Amount:</span>
            <span>Ks {{ cartStore.totalAmount.toLocaleString() }}</span>
          </div>

          <v-btn block to="/checkout" color="#d78f99" class="text-white font-weight-bold mb-3 rounded-lg" @click="handleCheckout">
            Proceed to Checkout
          </v-btn>
          <v-btn block to="/product" variant="outlined" color="#d78f99" class="font-weight-bold rounded-lg">
            Continue Shopping 
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <LoginModal v-if="cartStore.showLoginModal" @login-success="handleLoginSuccess" @close="cartStore.showLoginModal = false" />
  </v-container>
</template>

<script setup>
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const handleCheckout = () => {
  if (!cartStore.isLoggedIn) {
    cartStore.showLoginModal = true;
  } else {
    alert('ငွေချေမှု အောင်မြင်ပါသည်။ ကျေးဇူးတင်ပါတယ်ဗျာ!');
    cartStore.clearCart();
    router.push('/');
  }
};

const handleLoginSuccess = (user) => {
  cartStore.isLoggedIn = true;
  cartStore.currentUser = user;
  cartStore.showLoginModal = false;
  handleCheckout(); 
};
</script>

<style scoped>
.border-rose { border: 1px solid #ffe4e1 !important; }
</style>