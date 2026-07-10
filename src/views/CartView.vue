<template>
  <v-container fluid class="pa-6" style="background-color: #f3eae8; min-height: 100vh;">
    <h1 class="headline font-weight-bold grey--text text--darken-3 mb-4">
      <v-icon color="pink" class="mr-2">mdi-cart</v-icon> Shopping Cart
    </h1>

    <v-row v-if="cartItems.length > 0">
      <v-col cols="12" md="8">
        <v-card v-for="(item, index) in cartItems" :key="index" class="pa-4 mb-3" elevation="1" style="border-radius: 8px;">
          <v-row align="center">
            <v-col cols="3" sm="2" class="d-flex align-center justify-center">
              <div style="width: 80px; height: 70px; overflow:hidden; border-radius:4px;display:flex;align-items:center;justify-content:center;">
              <v-img :src="getProductImage(item.imageName)" height="100%"width="100%" cover @error="handleImageError"></v-img>
              </div>
            </v-col>
            
            <v-col cols="5" sm="5">
              <div class="subtitle-2 font-weight-bold grey--text text--darken-3 text-truncate">{{ item.name }}</div>
              <div class="caption pink--text font-weight-bold">Variant: {{ item.chosenVariant }}</div>
              <div class="body-2 grey--text">Ks {{ item.price}}</div>
            </v-col>

            <v-col cols="4" sm="3" class="text-center">
              <div class="d-flex align-center justify-center">
                <v-btn icon small outlined @click="updateQuantity(index, -1)"><v-icon small>mdi-minus</v-icon></v-btn>
                <span class="mx-3 font-weight-bold">{{ item.buyQuantity }}</span>
                <v-btn icon small outlined @click="updateQuantity(index, 1)"><v-icon small>mdi-plus</v-icon></v-btn>
              </div>
            </v-col>

            <v-col cols="12" sm="2" class="text-right">
              <v-btn icon color="red lighten-1" @click="removeItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-5 shadow-sm white" style="border-radius: 12px;">
          <h3 class="title font-weight-bold mb-4 grey--text text--darken-3">Order Summary</h3>
          <v-divider class="mb-3"></v-divider>
          
          <div class="d-flex justify-space-between mb-2 grey--text">
            <span>Total Items:</span>
            <span class="font-weight-bold">{{ totalItemsCount }} pcs</span>
          </div>
          
          <div class="d-flex justify-space-between mb-4 subtitle-1 font-weight-black pink--text">
            <span>Total Price:</span>
            <span>Ks {{ totalPrice.toLocaleString() }}</span>
          </div>

          <v-btn color="#d78f99" dark block large depressed style="border-radius: 6px;" class="text-none mt-4" @click="goToCheckout">
            Proceed to Checkout
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-card v-else class="pa-12 text-center" elevation="0" style="background: transparent;">
      <v-icon size="80" color="grey lighten-1">mdi-cart-outline</v-icon>
      <p class="grey--text mt-4 subtitle-1">သင့် Cart ထဲမှာ ပစ္စည်းမရှိသေးပါဘူးဗျာ။</p>
      <v-btn color="#d78f99" dark depressed to="/product" class="mt-2 text-none">
        Go Shopping
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CartView',
  data() {
    return {
      cartItems: []
    };
  },

  computed: {
  totalItemsCount() {
    if (!this.cartItems) return 0;
    return this.cartItems.reduce((total, item) => {
      const qty = parseInt(item.buyQuantity) || 1;
      return total + qty;
    }, 0);
  },
  
  totalPrice() {
    if (!this.cartItems) return 0;
    return this.cartItems.reduce((total, item) => {
      let rawPrice = item.price || item.variantPrice  || (item.product ? item.product.price : 0);
      
      if (typeof rawPrice === 'string' && (rawPrice.includes('ml') || rawPrice.includes('g') || rawPrice.toLowerCase().includes('Default'))) {
        rawPrice = item.product ? item.product.price : 32000; 
      }

      let price = 0;
      if (rawPrice) {
        price = typeof rawPrice === 'string'
          ? Number(rawPrice.replace(/[^0-9]/g, ''))
          : Number(rawPrice);
      }
      
      if (!price || price === 0) {
        price = item.product ? item.product.price : 32000; 
      }
      
      const qty = parseInt(item.buyQuantity) || 1;
      return total + (price * qty);
    }, 0);
  }
},
  
  mounted() {
    this.loadCart();
  },
  methods: {
    goToCheckout() {
      const token=localStorage.getItem('user-token');
      if(!token){
        
      this.$router.push({path:'/login', query:{ redirect: '/checkOut'}});
    }
    else{
      this.$router.push('/checkOut');
    }
  },
    loadCart() {
      const items = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartItems = items.map(item => ({
        ...item,
        buyQuantity: item.buyQuantity ? parseInt(item.buyQuantity) : 1
      }));
    },
    getProductImage(name) {
  if (!name) return '';

  if (name.startsWith('http') || name.startsWith('data:') || name.startsWith('blob:')) {
    return name;
  }

  try {
    return new URL(`../assets/products/${name}`, import.meta.url).href;
  } catch (e) {
    try {
      return new URL(`../assets/images/${name}`, import.meta.url).href;
    } catch (err) {
      return 'https://placehold.co/300x300?text=Product';
    }
  }
},
    
    updateQuantity(index, change) {
      let currentQty = parseInt(this.cartItems[index].buyQuantity) || 1;
      let newQty = currentQty + change;
      
      if (newQty > 0) {
        this.cartItems[index] = {
          ...this.cartItems[index],
          buyQuantity: newQty
        };
        this.cartItems = [...this.cartItems];
        this.saveCart();
      } else {
        if (confirm("ဒီပစ္စည်းကို Cart ထဲကနေ ဖယ်ထုတ်ချင်တာ သေချာပါသလား?")) {
          this.removeItem(index);
        }
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
    },
    handleImageError(event) {
      if (event && event.target) {
        event.target.src = 'https://placehold.co/300x300?text=Product';
      }
    }
  }
};
</script>