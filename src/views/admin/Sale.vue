<template>
  <div class="sale-container">
   
    <div class="products-section">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="🔍 Search by product name or SKU..." />
      </div>

      
      <div class="products-grid">
        <div 
          v-for="prod in filteredProducts" 
          :key="prod.id" 
          class="product-card"
          @click="addToCart(prod)"
        >
          <div class="prod-badge">{{ prod.category }}</div>
          <div class="prod-avatar">🧴</div>
          <div class="prod-info">
            <h3 class="prod-name">{{ prod.name }}</h3>
            <p class="prod-sku">{{ prod.sku }}</p>
            <p class="prod-price">{{ prod.price.toLocaleString() }} MMK</p>
            <p :class="['prod-stock', prod.stock <= 5 ? 'low' : '']">Stock: {{ prod.stock }} pcs</p>
          </div>
        </div>
        <div v-if="filteredProducts.length === 0" class="no-products">
         No items found.
        </div>
      </div>
    </div>

   
    <div class="cart-section">
      <h2>🛒 Shopping Cart</h2>

      
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ (item.price * item.quantity).toLocaleString() }} MMK</span>
          </div>
          <div class="item-actions">
            <div class="qty-controls">
              <button @click="updateQty(item, -1)">-</button>
              <span class="qty-number">{{ item.quantity }}</span>
              <button @click="updateQty(item, 1)">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="btn-remove">🗑️</button>
          </div>
        </div>
        <div v-if="cart.length === 0" class="empty-cart">
          🛒 Click on items to add to cart
        </div>
      </div>

      <div class="cart-summary">
        
        <div class="summary-row">
          <label>Delivery Township:</label>
          <select v-model="selectedTownshipId" @change="updateDeliveryFee">
            <option :value="null">Shop Pickup (0 MMK)</option>
            <option v-for="town in townships" :key="town.id" :value="town.id">
              {{ town.nameMm }} (+{{ town.deliveryFee.toLocaleString() }} MMK)
            </option>
          </select>
        </div>

        <hr class="divider" />

        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{ subtotal.toLocaleString() }} MMK</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee:</span>
          <span>{{ deliveryFee.toLocaleString() }} MMK</span>
        </div>
        <div class="summary-row total">
          <span>Total Amount:</span>
          <span>{{ grandTotal.toLocaleString() }} MMK</span>
        </div>

        <button 
          @click="checkout" 
          class="btn-checkout" 
          :disabled="cart.length === 0"
        >
          🧾 Print Voucher
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalePage',
  data() {
    return {
      searchQuery: '',
      selectedTownshipId: null,
      deliveryFee: 0,
      
      
      townships: [
        { id: 101, nameMm: 'Kamayut', deliveryFee: 3000 },
        { id: 102, nameMm: 'Hlaing', deliveryFee: 3000 },
        { id: 103, nameMm: 'Chanayethazan', deliveryFee: 2500 }
      ],
      products: [
        { id: 1, name: 'Glow Serum', category: 'Skincare', sku: 'GSC-001', price: 35000, stock: 24 },
        { id: 2, name: 'Sunscreen SPF50', category: 'Skincare', sku: 'GSC-002', price: 28000, stock: 3 },
        { id: 3, name: 'Matte Lipstick', category: 'Makeup', sku: 'GSC-003', price: 15000, stock: 15 }
      ],
      
      // လက်ရှိ ရောင်းချနေတဲ့ ခြင်းတောင်းစာရင်း
      cart: []
    };
  },
  computed: {
    
    filteredProducts() {
      return this.products.filter(p => {
        return p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               p.sku.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    // ပစ္စည်းဖိုး သီးသန့် စုစုပေါင်းတွက်ရန်
    subtotal() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    // ပစ္စည်းဖိုး + Delivery ခ စုစုပေါင်း ကျသင့်ငွေတွက်ရန်
    grandTotal() {
      return this.subtotal + this.deliveryFee;
    }
  },
  methods: {
    addToCart(product) {
      if (product.stock <= 0) {
        // alert('ဤပစ္စည်းသည် လက်ကျန်ပြတ်လပ်နေပါသည်။');
        return;
      }
      const existingItem = this.cart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity++;
        } else {
          // alert('ဆိုင်ရှိလက်ကျန်ထက် ပိုရောင်း၍မရပါ။');
        }
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    updateQty(item, change) {
      const product = this.products.find(p => p.id === item.id);
      const newQty = item.quantity + change;
      if (newQty <= 0) {
        this.removeFromCart(item.id);
      } else if (newQty > product.stock) {
        // alert('ဆိုင်ရှိလက်ကျန်ထက် ပိုရောင်း၍မရပါ။');
      } else {
        item.quantity = newQty;
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id);
    },
    updateDeliveryFee() {
      const town = this.townships.find(t => t.id === this.selectedTownshipId);
      this.deliveryFee = town ? town.deliveryFee : 0;
    },
    checkout() {
      // alert(`ဘောက်ချာ ဖွင့်လှစ်ခြင်း အောင်မြင်ပါသည်။\nစုစုပေါင်းကျသင့်ငွေ: ${this.grandTotal.toLocaleString()} ကျပ်\n(မှတ်ချက် - ဤအဆင့်တွင် Stock အရေအတွက်များ လျှော့ချပြီး နေ့စဉ်စာရင်းထဲ သိမ်းဆည်းသွားမည် ဖြစ်သည်)`);
      
      // Stock နှုတ်ခြင်း (နမူနာ)
      this.cart.forEach(item => {
        const prod = this.products.find(p => p.id === item.id);
        if (prod) prod.stock -= item.quantity;
      });
      
      // Cart ရှင်းလင်းခြင်း
      this.cart = [];
      this.selectedTownshipId = null;
      this.deliveryFee = 0;
    }
  }
};
</script>

<style scoped>
.sale-container {
  display: flex;
  height: calc(100vh - 60px);
  background-color: #f3f4f6;
  font-family: sans-serif;
}

/* ဘယ်ဘက်ခြမ်း - ပစ္စည်းများပြသရန်နေရာ */
.products-section {
  flex: 7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
.search-box input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.product-card {
  background-color: white;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s;
}
.product-card:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
}
.prod-badge { 
  position: absolute; 
  top: 8px; right: 8px; 
  background: #f3f4f6; 
  font-size: 11px; 
  padding: 2px 6px; 
  border-radius: 4px; 
}
.prod-avatar { 
  font-size: 32px; 
  text-align: center; 
  margin-bottom: 8px; 
}
.prod-name { 
  font-size: 15px; 
  margin: 0 0 4px 0; 
  color: #111827; 
}
.prod-sku { 
  font-size: 12px; 
  color: #6b7280; 
  font-family: monospace; 
  margin: 0 0 8px 0; 
}
.prod-price { 
  font-size: 14px; 
  font-weight: bold; 
  color: #2563eb; 
  margin: 0 0 4px 0; 
}
.prod-stock { 
  font-size: 12px; 
  color: #10b981; 
  margin: 0; 
}
.prod-stock.low { 
  color: #ef4444; 
  font-weight: bold; 
}

/* ညာဘက်ခြမ်း - ခြင်းတောင်း */
.cart-section {
  flex: 3;
  background-color: white;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.cart-section h2 { 
  font-size: 16px; 
  margin: 0 0 16px 0; 
  padding-bottom: 10px; 
  border-bottom: 1px solid #f3f4f6; 
}
.cart-items { 
  flex: 1; 
  overflow-y: auto; 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}
.cart-item { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 10px; 
  background: #f9fafb; 
  border-radius: 6px; 
}
.item-details { 
  display: flex; 
  flex-direction: column; 
  gap: 2px; 
}
.item-name { 
  font-size: 14px; 
  font-weight: 500; 
}
.item-price { 
  font-size: 13px; 
  color: #2563eb; 
  font-weight: 600; 
}
.item-actions { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
}
.qty-controls { 
  display: flex; 
  align-items: center; 
  background: #e5e7eb; 
  border-radius: 4px; 
}
.qty-controls button { 
  border: none; 
  background: transparent; 
  padding: 4px 10px; 
  cursor: pointer; 
  font-weight: bold; 
}
.qty-number { 
  font-size: 13px; 
  min-width: 20px; 
  text-align: center; 
}
.btn-remove { 
  background: transparent; 
  border: none; 
  cursor: pointer; 
}

/* Summary */
.cart-summary { 
  margin-top: auto; 
  padding-top: 16px; 
  border-top: 1px solid #e5e7eb; 
}
.summary-row { 
  display: flex; 
  justify-content: space-between; 
  margin-bottom: 10px; 
  font-size: 14px; 
  align-items: center; 
}
.summary-row select { 
  padding: 6px; 
  border-radius: 6px; 
  border: 1px solid #d1d5db; 
  outline: none; 
}
.divider { 
  border: 0; 
  border-top: 1px solid #f3f4f6; 
  margin: 12px 0; 
}
.total { 
  font-size: 16px; 
  font-weight: bold; 
  color: #111827; 
}
.btn-checkout { 
  width: 100%; 
  padding: 14px; 
  background: #10b981; 
  color: white; 
  border: none; 
  border-radius: 8px; 
  font-size: 15px; 
  font-weight: bold; 
  cursor: pointer; 
  margin-top: 12px; 
}
.btn-checkout:disabled { 
  background: #9ca3af; 
  cursor: not-allowed; 
}
.empty-cart, 
.no-products { 
  text-align: center; 
  color: #9ca3af; 
  font-size: 14px; 
  padding: 40px 0; 
}
</style>