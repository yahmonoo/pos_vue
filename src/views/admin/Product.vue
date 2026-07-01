<template>
  <div class="product-container">
    <div class="product-header">
      <h1>Products Management</h1>
      <p class="subtitle">Add and edit product lists for Glow Skin Cosmetics</p>
    </div>

    <!-- 1. Create & Update Form -->
    <div class="form-card">
      <h2>{{ isEditing ? 'Add New Product' : 'Add New Product' }}</h2>
      <form @submit.prevent="handleSubmit" class="product-form">
        
        <div class="form-row">
          <div class="form-group flex-1">
            <label>Product Name</label>
            <input type="text" v-model="productForm.name" placeholder="e.g., Glow Serum" required />
          </div>

          <!-- 🔴 Category Dropdown (အရှေ့က Category List နဲ့ ချိတ်ဆက်ရန်) -->
          <div class="form-group flex-1">
            <label>Category</label>
            <select v-model="productForm.category" required>
              <option value="" disabled>--- Select ---</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-group flex-1">
            <label>SKU / Barcode</label>
            <input type="text" v-model="productForm.sku" placeholder="e.g., GSC-001" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group flex-1">
            <label>Cost</label>
            <input type="number" v-model.number="productForm.cost" placeholder="e.g., 25,000" required />
          </div>

          <div class="form-group flex-1">
            <label>Price</label>
            <input type="number" v-model.number="productForm.price" placeholder="e.g., 35,000" required />
          </div>

          <div class="form-group flex-1">
            <label>Stock</label>
            <input type="number" v-model.number="productForm.stock" placeholder="e.g., 50" required />
          </div>
        </div>

        <!-- 📸 Image Upload (နမူနာအနေဖြင့် Link သုံးထားပါသည်) -->
        <div class="form-row">
          <div class="form-group flex-2">
            <label>Product Image URL</label>
            <input type="text" v-model="productForm.image" placeholder="https://example.com/image.jpg" />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">
            {{ isEditing ? 'Save Product' : 'Save Product' }}
          </button>
          <button type="button" v-if="isEditing" @click="resetForm" class="btn-cancel">Delete</button>
        </div>
      </form>
    </div>

    <!-- 2. Read, Update, Delete Table -->
    <div class="table-card">
      <h2>Product List</h2>
      <div class="table-responsive">
        <table class="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Stock</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in products" :key="prod.id">
              <td>
                <!-- ပုံမရှိရင် နမူနာ Emoji ပြရန် -->
                <span v-if="!prod.image" class="img-placeholder">🧴</span>
                <img v-else :src="prod.image" alt="product" class="prod-img" />
              </td>
              <td class="font-bold">{{ prod.name }}</td>
              <td class="sku-text">{{ prod.sku }}</td>
              <td><span class="cat-badge">{{ prod.category }}</span></td>
              <td>{{ prod.cost.toLocaleString() }} MMK</td>
              <td class="price-text">{{ prod.price.toLocaleString() }} MMK</td>
              <td>
                <!-- Stock နည်းနေရင် အနီရောင်ပြောင်းရန် -->
                <span :class="['stock-text', prod.stock <= 5 ? 'low-stock' : '']">
                  {{ prod.stock }} pcs {{ prod.stock <= 5 ? '(Low Stock)' : '' }}
                </span>
              </td>
              <td class="text-left py-2 px-4">
                <button @click="editProduct(prod)" class="btn-action edit">📝 </button>
                <button @click="deleteProduct(prod.id)" class="btn-action delete">🗑️ </button>
              </td>
            </tr>
            <tr v-if="products.length === 0">
              <td colspan="8" class="text-center no-data">No Product List</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductManagement',
  data() {
    return {
      
      categories: [
        { id: 1, name: 'Skincare' },
        { id: 2, name: 'Makeup' },
        { id: 3, name: 'Haircare' }
      ],
     
      products: [
        { id: 1, name: 'Glow Serum', category: 'Skincare', sku: 'GSC-001', cost: 25000, price: 35000, stock: 24, image: '' },
        { id: 2, name: 'Sunscreen SPF50', category: 'Skincare', sku: 'GSC-002', cost: 18000, price: 28000, stock: 3, image: '' },
        { id: 3, name: 'Matte Lipstick', category: 'Makeup', sku: 'GSC-003', cost: 10000, price: 15000, stock: 15, image: '' }
      ],
      productForm: {
        id: null,
        name: '',
        category: '',
        sku: '',
        cost: null,
        price: null,
        stock: null,
        image: ''
      },
      isEditing: false
    };
  },
  methods: {
    handleSubmit() {
      if (this.isEditing) {
        const index = this.products.findIndex(p => p.id === this.productForm.id);
        if (index !== -1) {
          this.products[index] = { ...this.productForm };
          // alert('ပစ္စည်းအချက်အလက်ကို ပြင်ဆင်ပြီးပါပြီ။');
        }
      } else {
        const newProduct = {
          id: Date.now(),
          ...this.productForm
        };
        this.products.push(newProduct);
        // alert('ပစ္စည်းအသစ်ကို စာရင်းထဲ ထည့်သွင်းပြီးပါပြီ။');
      }
      this.resetForm();
    },
    editProduct(product) {
      this.isEditing = true;
      this.productForm = { ...product };
    },
    deleteProduct(id) {
      if (confirm('Are you sure want to delete?')) {
        this.products = this.products.filter(p => p.id !== id);
        // alert('ပယ်ဖျက်ပြီးပါပြီ။');
        if (this.productForm.id === id) this.resetForm();
      }
    },
    resetForm() {
      this.productForm = { id: null, name: '', category: '', sku: '', cost: null, price: null, stock: null, image: '' };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.product-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}
.product-header h1 {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 4px 0;
}
.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

/* Form Styles */
.form-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}
.form-card h2, .table-card h2 {
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 10px;
}
.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.flex-1 { 
  flex: 1; 
  min-width: 200px; 
}
.flex-2 { 
  flex: 2; 
  min-width: 400px; 
}

.form-group label {
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}
.form-group input, .form-group select {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  background-color: #fff;
}
.form-group input:focus, 
.form-group select:focus { 
  border-color: pink; 
}

/* Buttons */
.form-actions { 
  display: flex; 
  gap: 8px; 
  margin-top: 8px; 
}
.btn-submit {
  padding: 10px 20px;
  background-color: rgb(225, 131, 147);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.btn-cancel {
  padding: 10px 16px;
  background-color: #9ca3af;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

/* Table Styles */
.table-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}
.table-responsive { overflow-x: auto; }
.product-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.product-table th {
  background-color: #f9fafb;
  color: #4b5563;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
}
.product-table td {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}
.product-table tr:hover { 
  background-color: #f9fafb; 
}

/* Product Image & Badges */
.prod-img { 
  width: 40px; 
  height: 40px; 
  border-radius: 6px; 
  object-fit: cover; 
}
.img-placeholder { 
  font-size: 24px; 
  display: inline-block; 
  width: 40px; 
  text-align: 
  center; 
}
.font-bold { 
  font-weight: 600; 
  color: #111827; 
}
.sku-text { 
  font-family: monospace; 
  color: #4b5563; 
  font-weight: 600; 
}
.cat-badge { 
  background-color: #f3f4f6; 
  padding: 2px 8px; 
  border-radius: 4px; 
  font-size: 12px; 
}
.price-text { 
  font-weight: bold; 
  color: #2563eb; 
}
.stock-text { 
  font-weight: 500; 
}
.low-stock { 
  color: #ef4444; 
  font-weight: bold; 
}
.text-center { 
  text-align: center; 
}
.no-data { 
  color: #9ca3af; 
  padding: 24px; 
}

/* Action Buttons */
.btn-action { 
  padding: 6px 12px; 
  border: none; 
  border-radius: 4px; 
  font-size: 12px; 
  cursor: pointer; 
  margin: 0 4px; 
}
.edit { 
  background-color: #fef3c7; 
  color: #d97706; 
}
.delete { 
  background-color: #fee2e2; 
  color: #ef4444; 
}
</style>