<template>
  <div class="city-container">
    <div class="city-header">
      <h1>City Management</h1>
      <p class="subtitle">List of Delivery Cities for Glow Skin Cosmetics</p>
    </div>

    <!-- 1. Create & Update Form (မြို့အသစ်ထည့်ရန်နှင့် ပြင်ရန် Form) -->
    <div class="form-card">
      <h2>{{ isEditing ? 'Add New City' : 'New City' }}</h2>
      <form @submit.prevent="handleSubmit" class="city-form">
        <div class="form-group">
          <label>City Name(Myanmar)*</label>
          <input 
            type="text" 
            v-model="cityForm.nameMm" 
            placeholder="Eg- မန္တလေး" 
            required 
          />
        </div>
        <div class="form-group">
          <label>City Name(English)*</label>
          <input 
            type="text" 
            v-model="cityForm.nameEn" 
            placeholder="Eg - Mandalay" 
            required 
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

    <!-- 2. Read, Update, Delete Table (မြို့စာရင်းပြ ဇယား) -->
    <div class="table-card">
      <h2>City List</h2>
      <div class="table-responsive">
        <table class="city-table">
          <thead>
           <!-- <tr>
              <th>စဉ်</th>
              <th>မြို့အမည် (မြန်မာ)</th>
              <th>မြို့အမည် (English)</th>
              <th class="text-center">လုပ်ဆောင်ချက်များ (Update / Delete)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(city, index) in cities" :key="city.id">
              <td>{{ index + 1 }}</td>
              <td class="font-bold">{{ city.nameMm }}</td>
              <td>{{ city.nameEn }}</td>
              <td class="text-center">
                <button @click="editCity(city)" >📝 </button>
                <button @click="deleteCity(city.id)" >🗑️ </button>
              </td> 
              <td class="text-center">
              <v-btn density="compact" icon="mdi-pencil" @click="editCity(item)"></v-btn>
              <v-btn density="compact" icon="mdi-delete" @click="deletCity(item)"></v-btn>
            </td>
            </tr>
            <tr v-if="cities.length === 0">
              <td colspan="4" class="text-center no-data">မြို့စာရင်း မရှိသေးပါ။</td>
            </tr>  -->
             <tr>
              <th>No</th>
              <th>City Name (Myanmar)</th>
              <th>City Name (English)</th>
              <th class="text-center">Update / Delete</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(city, index) in cities" :key="city.id">
  <td>{{ index + 1 }}</td>
  <td class="font-bold">{{ city.nameMm }}</td>
  <td>{{ city.nameEn }}</td>
  
  <td class="text-center">
    <!-- editCity(item) မှ editCity(city) သို့ ပြောင်းလဲထားပါသည် -->
    <v-btn 
      density="compact" 
      icon="mdi-pencil" 
      class="edit mr-2" 
      @click="editCity(city)"
    ></v-btn>

    <!-- deletCity(item) မှ deleteCity(city.id) သို့ ပြောင်းလဲထားပါသည် -->
    <v-btn 
      density="compact" 
      prepend-icon="mdi-delete" 
      class="delete" 
      @click="deleteCity(city.id)"
    >
    </v-btn>
  </td>
</tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityManagement',
  data() {
    return {
   
      cities: [
        { id: 1, nameMm: 'ရန်ကုန်', nameEn: 'Yangon' },
        { id: 2, nameMm: 'မန္တလေး', nameEn: 'Mandalay' },
        { id: 3, nameMm: 'နေပြည်တော်', nameEn: 'Naypyitaw' }
      ],
      
      cityForm: {
        id: null,
        nameMm: '',
        nameEn: ''
      },
      isEditing: false 
    };
  },
  methods: {
    // 1. Create & Update Handle
    handleSubmit() {
      if (this.isEditing) {
        // UPDATE 
        const index = this.cities.findIndex(c => c.id === this.cityForm.id);
        if (index !== -1) {
          this.cities[index] = { ...this.cityForm };
          // alert('မြို့အချက်အလက်ကို ပြင်ဆင်ပြီးပါပြီ။');
        }
      } else {
        
        const newCity = {
          id: Date.now(), 
          nameMm: this.cityForm.nameMm,
          nameEn: this.cityForm.nameEn
        };
        this.cities.push(newCity);
        // alert('မြို့အသစ်ကို အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ။');
      }
      this.resetForm();
    },

    
    editCity(city) {
      this.isEditing = true;
      this.cityForm = { ...city }; 
    },

    
    deleteCity(id) {
      if (confirm('ဤမြို့ကို စာရင်းထဲမှ အပြီးဖျက်လိုပါသလား?')) {
        this.cities = this.cities.filter(city => city.id !== id);
        // alert('ပယ်ဖျက်ပြီးပါပြီ။');
        if (this.cityForm.id === id) this.resetForm();
      }
    },

   
    resetForm() {
      this.cityForm = { id: null, nameMm: '', nameEn: '' };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.city-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}

.city-header {
  margin-bottom: 24px;
}
.city-header h1 {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 4px 0;
}
.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Form Card Styling */
.form-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.form-card h2, .table-card h2 {
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 10px;
}
.city-form {
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
  min-width: 200px;
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
  border-color: rgb(222, 135, 150);
}

/* Form Buttons */
.form-actions {
  display: flex;
  gap: 8px;
}
.btn-submit {
  padding: 10px 20px;
  background-color: rgb(244, 138, 156);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.btn-submit:hover { 
  background-color: rgb(162, 61, 78); 
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
.btn-cancel:hover { 
  background-color: #7b808a; 
}

/* Table Card Styling */
.table-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.table-responsive { 
  overflow-x: auto; 
}
.city-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}
.city-table th {
  background-color: #f9fafb;
  color: #4b5563;
  padding: 12px;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
}
.city-table td {
  padding: 14px 12px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}
.city-table tr:hover { 
background-color: #f9fafb; 
}
.font-bold { 
font-weight: 600; 
}
.text-center { 
text-align: center; 
}
.no-data { 
color: #9ca3af; 
padding: 24px; 
}

/* Action Buttons (Edit / Delete) */
.btn-action {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin: 0 4px;
  font-weight: 500;
}
.edit { 
background-color: #fef3c7; 
color: #d97706; 
}
.edit:hover { 
background-color: #fde68a; 
}
.delete { 
background-color: #fee2e2; 
color: #ef4444; 
}
.delete:hover { 
background-color: #fecaca; 
}
</style>