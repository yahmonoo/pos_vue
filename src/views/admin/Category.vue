<template>
  <div class="category-container">
    <div class="category-header">
      <h1>Category Management</h1>
      <p class="subtitle">Set Product Categories for Glow Skin Cosmetics</p>
    </div>

    <!-- 1. Create & Update Form -->
    <div class="form-card">
      <h2>{{ isEditing ? 'New Category' : 'New Category' }}</h2>
      <form @submit.prevent="handleSubmit" class="category-form">
        <div class="form-group flex-1">
          <label>Category Name</label>
          <input 
            type="text" 
            v-model="categoryForm.name" 
            placeholder="Eg - Skincare, Makeup" 
            required 
          />
        </div>
        <div class="form-group flex-2">
          <label>Description</label>
          <input 
            type="text" 
            v-model="categoryForm.description" 
            placeholder="Eg -Facial and Skincare Products" 
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">
            {{ isEditing ? 'Submit' : 'Submit' }}
          </button>
          <button 
            type="button" 
            v-if="isEditing" 
            @click="resetForm" 
            class="btn-cancel"
          >
            Delete
          </button>
        </div>
      </form>
    </div>

    <!-- 2. Read, Update, Delete Table -->
    <div class="table-card">
      <h2>Category List</h2>
      <div class="table-responsive">
        <table class="category-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Category Name</th>
              <th>Description</th>
              <th class="text-center">Update & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id">
              <td>{{ index + 1 }}</td>
              <td class="font-bold">{{ category.name }}</td>
              <td class="text-muted">{{ category.description || '-' }}</td>
              <td class="text-left py-2 px-4">
                <button @click="editCategory(category)" class="btn-action edit">📝 </button>
                <button @click="deleteCategory(category.id)" class="btn-action delete">🗑️ </button>
              </td>
            </tr>
            <tr v-if="categories.length === 0">
              <td colspan="4" class="text-center no-data">No Category List</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryManagement',
  data() {
    return {
      
      categories: [
        { id: 1, name: 'Skincare', description: 'Facial and Skincare Products' },
        { id: 2, name: 'Makeup', description: 'Lipsticks, makeup, and cosmetics' },
        { id: 3, name: 'Haircare', description: 'Shampoo and hair care treatments' }
      ],
      categoryForm: {
        id: null,
        name: '',
        description: ''
      },
      isEditing: false
    };
  },
  methods: {
    handleSubmit() {
      if (this.isEditing) {
        // --- UPDATE ---
        const index = this.categories.findIndex(c => c.id === this.categoryForm.id);
        if (index !== -1) {
          this.categories[index] = { ...this.categoryForm };
          // alert('အမျိုးအစားကို ပြင်ဆင်ပြီးပါပြီ။');
        }
      } else {
        // --- CREATE ---
        const newCategory = {
          id: Date.now(),
          name: this.categoryForm.name,
          description: this.categoryForm.description
        };
        this.categories.push(newCategory);
        // alert('အမျိုးအစားအသစ်ကို ထည့်သွင်းပြီးပါပြီ။');
      }
      this.resetForm();
    },
    editCategory(category) {
      this.isEditing = true;
      this.categoryForm = { ...category };
    },
    deleteCategory(id) {
      if (confirm('ဤအမျိုးအစားကို ဖျက်လိုက်ပါက ၎င်းအောက်ရှိ ပစ္စည်းများစာရင်းပါ ထိခိုက်နိုင်ပါသည်။ အပြီးဖျက်လိုပါသလား?')) {
        this.categories = this.categories.filter(c => c.id !== id);
        // alert('ပယ်ဖျက်ပြီးပါပြီ။');
        if (this.categoryForm.id === id) this.resetForm();
      }
    },
    resetForm() {
      this.categoryForm = { id: null, name: '', description: '' };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.category-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}
.category-header h1 {
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
.category-form {
  display: flex;
  gap: 16px;
  align-items: flex-end;
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
  min-width: 300px; 
}

.form-group label {
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}
.form-group input {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
}
.form-group input:focus { 
  border-color: pink; 
}

/* Buttons */
.form-actions { 
  display: flex; 
  gap: 8px; 
}
.btn-submit {
  padding: 10px 20px;
  background-color: rgb(248, 126, 146);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.btn-cancel {
  padding: 10px 16px;
  background-color: rgb(248, 126, 146);
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
.table-responsive { 
  overflow-x: auto; 
}
.category-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.category-table th {
  background-color: #f9fafb;
  color: #4b5563;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
}
.category-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}
.category-table tr:hover { 
  background-color: #f9fafb; 
}
.font-bold { 
  font-weight: 600; 
  color: #111827; 
}
.text-muted { 
  color: #6b7280; 
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