<template>
  <div class="user-container">
    <div class="user-header">
      <h1>User Account Management </h1>
      <p class="subtitle">Manage staff accounts for Glow Skin Cosmetics POS system</p>
    </div>

    <!-- 1. Create & Update Form (အကောင့်အသစ်ဖွင့်ရန်နှင့် ပြင်ရန်) -->
    <div class="form-card">
      <h2>{{ isEditing ? 'Create New Account' : 'Create New Account' }}</h2>
      <form @submit.prevent="handleSubmit" class="user-form">
        
        <div class="form-row">
          <div class="form-group flex-1">
            <label>Staff Name</label>
            <input type="text" v-model="userForm.name" placeholder="e.g., Mya Mya" required />
          </div>

          <div class="form-group flex-1">
            <label>Username / Email</label>
            <input type="text" v-model="userForm.username" placeholder="e.g., myamya@gmail.com" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group flex-1">
            <label>Password</label>
            <!-- Edit လုပ်နေချိန် Password ကို ချန်ထားနိုင်ရန် required ကို dynamic လုပ်ထားပါသည် -->
            <input 
              type="password" 
              v-model="userForm.password" 
              placeholder="••••••••" 
              :required="!isEditing" 
            />
          </div>

          <div class="form-group flex-1">
            <label>Role</label>
            <select v-model="userForm.role" required>
              <option value="" disabled>--- Select Role---</option>
              <option value="Admin">Admin (Manager / Owner)</option>
              <option value="Cashier">Cashier (Sales Staff)</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">
            {{ isEditing ? 'Save New Account' : 'Save New Account' }}
          </button>
          <button type="button" v-if="isEditing" @click="resetForm" class="btn-cancel">Delete</button>
        </div>
      </form>
    </div>

    <!-- 2. Read, Update, Delete Table (အကောင့်စာရင်းပြ ဇယား) -->
    <div class="table-card">
      <h2>Staff Account List</h2>
      <div class="table-responsive">
        <table class="user-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Staff Name</th>
              <th>Username / Email</th>
              <th>Role</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td class="font-bold">{{ user.name }}</td>
              <td class="username-text">{{ user.username }}</td>
              <td>
                <span :class="['role-badge', user.role.toLowerCase()]">
                  {{ user.role }}
                </span>
              </td>
              <td class="text-left py-2 px-4">
                <button @click="editUser(user)" class="btn-action edit">📝 </button>
                <button @click="deleteUser(user.id)" class="btn-action delete">🗑️ </button>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="5" class="text-center no-data">No Staff Account</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAccountManagement',
  data() {
    return {
      // နမူနာ စတင်သတ်မှတ်ထားသော ဝန်ထမ်းစာရင်းများ
      users: [
        { id: 1, name: 'Snowy', username: 'snowy@glowskin.com', role: 'Admin' },
        { id: 2, name: 'မမေသူ', username: 'maythu@glowskin.com', role: 'Cashier' },
        { id: 3, name: 'ကိုထက်', username: 'kohtet@glowskin.com', role: 'Cashier' }
      ],
      userForm: {
        id: null,
        name: '',
        username: '',
        password: '',
        role: ''
      },
      isEditing: false
    };
  },
  methods: {
    handleSubmit() {
      if (this.isEditing) {
        // --- UPDATE ---
        const index = this.users.findIndex(u => u.id === this.userForm.id);
        if (index !== -1) {
          // Password ကို လုံခြုံရေးအရ Update Object ထဲ ထည့်မပြထားပါ (Real system တွင် API က ကိုင်တွယ်ပါမည်)
          this.users[index] = { 
            id: this.userForm.id,
            name: this.userForm.name,
            username: this.userForm.username,
            role: this.userForm.role
          };
          // alert('ဝန်ထမ်းအကောင့်ကို ပြင်ဆင်ပြီးပါပြီ။');
        }
      } else {
        // --- CREATE ---
        const newUser = {
          id: Date.now(),
          name: this.userForm.name,
          username: this.userForm.username,
          role: this.userForm.role
        };
        this.users.push(newUser);
        // alert('ဝန်ထမ်းအကောင့်အသစ်ကို အောင်မြင်စွာ ဖွင့်လှစ်ပြီးပါပြီ။');
      }
      this.resetForm();
    },
    editUser(user) {
      this.isEditing = true;
      // Form ထဲသို့ လက်ရှိအချက်အလက်များ ထည့်သွင်းခြင်း (လုံခြုံရေးအရ password ကို ကွက်လပ်ချန်ထားပါမည်)
      this.userForm = { ...user, password: '' };
    },
    deleteUser(id) {
      if (confirm('ဤဝန်ထမ်းအကောင့်ကို စနစ်ထဲမှ အပြီးဖျက်လိုပါသလား?')) {
        this.users = this.users.filter(u => u.id !== id);
        // alert('ပယ်ဖျက်ပြီးပါပြီ။');
        if (this.userForm.id === id) this.resetForm();
      }
    },
    resetForm() {
      this.userForm = { id: null, name: '', username: '', password: '', role: '' };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.user-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}
.user-header h1 {
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
.user-form {
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
.flex-1 { flex: 1; min-width: 200px; }

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
  background-color: rgb(243, 131, 150);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.btn-cancel {
  padding: 10px 16px;
  background-color: rgb(243,131,150);
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
.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.user-table th {
  background-color: #f9fafb;
  color: #4b5563;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
}
.user-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}
.user-table tr:hover { 
  background-color: #f9fafb; 
}

.font-bold { 
  font-weight: 600; 
  color: #111827; 
}
.username-text { 
  color: #4b5563; 
}

/* Role Badges */
.role-badge {
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}
.role-badge.admin { 
  background-color: #fee2e2; 
  color: #ef4444; 
}
.role-badge.cashier { 
  background-color: #e0f2fe; 
  color: #0369a1; 
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