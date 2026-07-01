<template>
  <div class="township-container">
    <div class="township-header">
      <h1>Township Management</h1>
      <p class="subtitle">Glow Skin Cosmetics Delivery Fees by Township</p>
    </div>

    <!-- 1. Create & Update Form -->
    <div class="form-card">
      <h2>{{ isEditing ? 'New Township' : 'New Township' }}</h2>
      <form @submit.prevent="handleSubmit" class="township-form">
        
        <!-- 🔴 City ရွေးချယ်ရန် Dropdown (Backend ကလာမယ့် City List နဲ့ ချိတ်ရပါမယ်) -->
        <div class="form-group">
          <label>City</label>
          <select v-model="townshipForm.cityId" required>
            <option value="" disabled>--- City ---</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.nameMm }} ({{ city.nameEn }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Township (Myanmar)*</label>
          <input type="text" v-model="townshipForm.nameMm" placeholder="eg - ကမာရွတ်" required />
        </div>

        <div class="form-group">
          <label>Township (English)*</label>
          <input type="text" v-model="townshipForm.nameEn" placeholder="eg - Kamayut" required />
        </div>

        <div class="form-group">
          <label>Delivery Fee</label>
          <input type="number" v-model.number="townshipForm.deliveryFee" placeholder="eg - 3000" required />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">
            {{ isEditing ? 'Submit' : 'Submit' }}
          </button>
          <button type="button" v-if="isEditing" @click="resetForm" class="btn-cancel">Delete</button>
        </div>
      </form>
    </div>

    <!-- 2. Read, Update, Delete Table -->
    <div class="table-card">
      <h2>Township List</h2>
      <div class="table-responsive">
        <table class="township-table">
          <thead>
            <tr>
              <th>No</th>
              <th>City</th>
              <th>Township (Myanmar)</th>
              <th>Township (English)</th>
              <th>Delivery Fee</th>
              <th class="text-center">Update & Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(town, index) in townships" :key="town.id">
              <td>{{ index + 1 }}</td>
              <!-- ID အစား မြို့အမည်ကို လှမ်းပြခြင်း -->
              <td class="city-badge">{{ getCityName(town.cityId) }}</td>
              <td class="font-bold">{{ town.nameMm }}</td>
              <td>{{ town.nameEn }}</td>
              <td class="fee">{{ town.deliveryFee.toLocaleString() }} MMK</td>
              <td class="text-left py-2 px-4">
                <button @click="editTownship(town)" class="btn-action edit">📝 </button>
                <button @click="deleteTownship(town.id)" class="btn-action delete">🗑️ </button>
              </td>
            </tr>
            <tr v-if="townships.length === 0">
              <td colspan="6" class="text-center no-data">No Township List</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TownshipManagement',
  data() {
    return {
      // Dropdown မှာ ပြဖို့အတွက် City List (ဒါတွေကလည်း Backend ကလာမှာပါ)
      cities: [
        { id: 1, nameMm: 'ရန်ကုန်', nameEn: 'Yangon' },
        { id: 2, nameMm: 'မန္တလေး', nameEn: 'Mandalay' }
      ],
      // နမူနာ မြို့နယ်ဒေတာများ
      townships: [
        { id: 101, cityId: 1, nameMm: 'ကမာရွတ်', nameEn: 'Kamayut', deliveryFee: 3000 },
        { id: 102, cityId: 1, nameMm: 'လှိုင်', nameEn: 'Hlaing', deliveryFee: 3000 },
        { id: 103, cityId: 2, nameMm: 'ချမ်းအေးသာစံ', nameEn: 'Chanayethazan', deliveryFee: 2500 }
      ],
      townshipForm: {
        id: null,
        cityId: '',
        nameMm: '',
        nameEn: '',
        deliveryFee: null
      },
      isEditing: false
    };
  },
  methods: {
    // City ID ကိုကြည့်ပြီး မြို့အမည် ပြပေးမယ့် helper function
    getCityName(cityId) {
      const city = this.cities.find(c => c.id === cityId);
      return city ? city.nameMm : 'Unknown';
    },
    handleSubmit() {
      if (this.isEditing) {
        const index = this.townships.findIndex(t => t.id === this.townshipForm.id);
        if (index !== -1) {
          this.townships[index] = { ...this.townshipForm };
          // alert('မြို့နယ်အချက်အလက် ပြင်ဆင်ပြီးပါပြီ။');
        }
      } else {
        const newTownship = {
          id: Date.now(),
          ...this.townshipForm
        };
        this.townships.push(newTownship);
        // alert('မြို့နယ်အသစ်ကို ထည့်သွင်းပြီးပါပြီ။');
      }
      this.resetForm();
    },
    editTownship(town) {
      this.isEditing = true;
      this.townshipForm = { ...town };
    },
    deleteTownship(id) {
      if (confirm('Are you sure want to delete?')) {
        this.townships = this.townships.filter(t => t.id !== id);
        // alert('ပယ်ဖျက်ပြီးပါပြီ။');
        if (this.townshipForm.id === id) this.resetForm();
      }
    },
    resetForm() {
      this.townshipForm = { id: null, cityId: '', nameMm: '', nameEn: '', deliveryFee: null };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.township-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}
.township-header h1 {
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
.township-form {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 180px;
}
.form-group label {
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
}
.form-group input, 
.form-group select {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  background-color: #fff;
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
.township-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.township-table th {
  background-color: #f9fafb;
  color: #4b5563;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
}
.township-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f3f4f6;
}
.city-badge {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}
.fee { 
  font-weight: bold; 
  color: #10b981; 
}
.font-bold { 
  font-weight: 600; 
}
.text-center { 
  text-align: center; 
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