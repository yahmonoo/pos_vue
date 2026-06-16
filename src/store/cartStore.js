import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // 1. States (ခြင်းတောင်းထဲက အခြေအနေများ)
  const cart = ref([]);
  const isLoggedIn = ref(false);
  const currentUser = ref(null);
  const showLoginModal = ref(false);

  // 2. Getters (ခြင်းတောင်းထဲက ပစ္စည်းအရေအတွက်နှင့် စုစုပေါင်းငွေ တွက်ချက်မှု)
  const cartTotalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalAmount = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  // 3. Actions (ခြင်းတောင်းထဲ ပစ္စည်းထည့်ခြင်း၊ နှုတ်ခြင်း၊ ဖျက်ခြင်းလုပ်ငန်းစဉ်များ)
  function addToCart(product) {
    const existingItem = cart.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        quantity: 1
      });
    }
  }

  function updateQuantity(productId, newQty) {
    const item = cart.value.find(item => item.id === productId);
    if (item) {
      if (newQty <= 0) {
        // အရေအတွက် ၀ ဖြစ်သွားရင် ခြင်းတောင်းထဲက ဖျက်ပစ်မယ်
        cart.value = cart.value.filter(i => i.id !== productId);
      } else {
        item.quantity = newQty;
      }
    }
  }

  function clearCart() {
    cart.value = [];
  }

  return {
    cart,
    isLoggedIn,
    currentUser,
    showLoginModal,
    cartTotalItems,
    totalAmount,
    addToCart,
    updateQuantity,
    clearCart
  };
});