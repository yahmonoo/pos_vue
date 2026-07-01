<template>
  <div class="salelist-container">
    <div class="salelist-header">
      <h1>Sale List</h1>
      <p class="subtitle">To view all daily vouchers sold by Glow Skin Cosmetics</p>
    </div>

    <!-- 🔍 စစ်ထုတ်ရန်နေရာ (Filters) -->
    <div class="filter-card">
      <div class="filter-group">
        <label>Search by Date:</label>
        <input type="date" v-model="filterDate" @change="applyFilters" />
      </div>
      <div class="filter-group">
        <label>Voucher No./Staff:</label>
        <input type="text" v-model="searchQuery" placeholder="e.g., V-1001 or Ma May Thu" @input="applyFilters" />
      </div>
      <button @click="resetFilters" class="btn-reset">🔄 Clear</button>
    </div>

   
    <div class="table-card">
      <h2>Vouchers List</h2>
      <div class="table-responsive">
        <table class="salelist-table">
          <thead>
            <tr>
              <th>Voucher No.</th>
              <th>Date & Time</th>
              <th>Staff (Cashier)</th>
              <th>Township (Delivery)</th>
              <th>Item Price</th>
              <th>Delivery Fee</th>
              <th>Total Amount</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in filteredSales" :key="sale.id">
              <td class="v-num">{{ sale.voucherNo }}</td>
              <td>{{ sale.dateTime }}</td>
              <td class="font-bold">{{ sale.cashier }}</td>
              <td>
                <span :class="['town-badge', sale.township ? '' : 'pickup']">
                  {{ sale.township || 'Shop Pickup' }}
                </span>
              </td>
              <td>{{ sale.subtotal.toLocaleString() }} MMK</td>
              <td>{{ sale.deliveryFee.toLocaleString() }} MMK</td>
              <td class="total-text">{{ sale.grandTotal.toLocaleString() }} MMK</td>
              <td class="text-center">
                <button @click="viewDetails(sale)" class="btn-action view">👁️ View Details</button>
              </td>
            </tr>
            <tr v-if="filteredSales.length === 0">
              <td colspan="8" class="text-center no-data">ရှာဖွေမှုနှင့် ကိုက်ညီသော အရောင်းမှတ်တမ်းမရှိပါ။</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 🧾 Voucher Details Modal (အသေးစိတ်ကြည့်ရန် နှိပ်မှ ပေါ်လာမည့် Popup) -->
    <div v-if="selectedSale" class="modal-overlay" @click.self="selectedSale = null">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Voucher: {{ selectedSale.voucherNo }}</h3>
          <button @click="selectedSale = null" class="btn-close">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Date & Time:</strong> {{ selectedSale.dateTime }}</p>
          <p><strong>Staff (Cashier):</strong> {{ selectedSale.cashier }}</p>
          <p><strong>Township (Delivery):</strong> {{ selectedSale.township || 'Shop Pickup' }}</p>
          
          <table class="modal-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedSale.items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.price.toLocaleString() }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ (item.price * item.quantity).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>

          <div class="modal-summary">
            <div><span>Subtotal:</span> <span>{{ selectedSale.subtotal.toLocaleString() }} MMK</span></div>
            <div><span>Delivery Fee:</span> <span>{{ selectedSale.deliveryFee.toLocaleString() }} MMK</span></div>
            <div class="grand-total"><span>Total:</span> <span>{{ selectedSale.grandTotal.toLocaleString() }} MMK</span></div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="printVoucher" class="btn-print">🖨️ Print Voucher</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SaleList',
  data() {
    return {
      filterDate: '',
      searchQuery: '',
      selectedSale: null,
      
      // Backend (Database) ထဲကနေ လှမ်းယူလာမယ့် နမူနာ ဘောက်ချာမှတ်တမ်းများ
      sales: [
        {
          id: 1,
          voucherNo: 'V-1001',
          dateTime: '2026-06-28 10:30 AM',
          cashier: 'Ma May Thu',
          township: 'Kamayut',
          subtotal: 50000,
          deliveryFee: 3000,
          grandTotal: 53000,
          items: [
            { id: 1, name: 'Glow Serum', price: 35000, quantity: 1 },
            { id: 3, name: 'Matte Lipstick', price: 15000, quantity: 1 }
          ]
        },
        {
          id: 2,
          voucherNo: 'V-1002',
          dateTime: '2026-06-28 11:15 AM',
          cashier: 'Ko Htet',
          township: '',
          subtotal: 28000,
          deliveryFee: 0,
          grandTotal: 28000,
          items: [
            { id: 2, name: 'Sunscreen SPF50', price: 28000, quantity: 1 }
          ]
        }
      ],
      filteredSales: []
    };
  },
  mounted() {
    
    this.filteredSales = this.sales;
  },
  methods: {
    applyFilters() {
      this.filteredSales = this.sales.filter(sale => {
        const matchesDate = this.filterDate ? sale.dateTime.includes(this.filterDate) : true;
        const matchesQuery = this.searchQuery ? (
          sale.voucherNo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          sale.cashier.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) : true;
        return matchesDate && matchesQuery;
      });
    },
    resetFilters() {
      this.filterDate = '';
      this.searchQuery = '';
      this.filteredSales = this.sales;
    },
    viewDetails(sale) {
      this.selectedSale = sale;
    },
    printVoucher() {
      // alert(`Voucher နံပါတ် ${this.selectedSale.voucherNo} ကို Thermal Printer ဆီသို့ ပေးပို့နေပါသည်...`);
    }
  }
};
</script>

<style scoped>
.salelist-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}
.salelist-header h1 { 
  font-size: 24px; color: #1f2937; 
  margin: 0 0 4px 0; 
}
.subtitle { 
  font-size: 14px; 
  color: #6b7280; 
  margin: 0 0 24px 0; 
}

/* Filter Card */
.filter-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-end;
}
.filter-group { 
  display: flex; 
  flex-direction: column; 
  gap: 6px; 
}
.filter-group label { 
  font-size: 13px; 
  color: #4b5563; 
  font-weight: 500; 
}
.filter-group input { 
  padding: 8px 12px; 
  border-radius: 6px; 
  border: 1px solid #d1d5db; 
  font-size: 14px; 
  outline: none; 
}
.btn-reset { 
  padding: 8px 16px; 
  background: #e5e7eb; 
  border: none; 
  border-radius: 6px; 
  cursor: pointer; 
  font-size: 14px; 
}

/* Table Styles */
.table-card { 
  background: white; 
  padding: 20px; 
  border-radius: 12px; 
  border: 1px solid #e5e7eb; 
}
.table-card h2 { 
  font-size: 16px; 
  color: #1f2937; 
  margin: 0 0 16px 0; 
  padding-bottom: 10px; 
  border-bottom: 1px solid #f3f4f6; 
}
.table-responsive { 
  overflow-x: auto; 
}
.salelist-table { 
  width: 100%; 
  border-collapse: collapse; 
  font-size: 14px; 
}
.salelist-table th { 
  background: #f9fafb; 
  color: #4b5563; 
  padding: 12px; 
  border-bottom: 2px solid #e5e7eb; 
  text-align: left; 
}
.salelist-table td { 
  padding: 14px 12px; 
  border-bottom: 1px solid #f3f4f6; 
}
.v-num { 
  font-family: monospace; 
  font-weight: bold; 
  color: #111827; 
}
.font-bold { 
  font-weight: 600; 
}
.total-text { 
  font-weight: bold; 
  color: #10b981; 
}

.town-badge { 
  background: #e0f2fe; 
  color: #0369a1; 
  padding: 2px 8px; 
  border-radius: 4px; 
  font-size: 12px; 
}
.town-badge.pickup { 
  background: #fee2e2; 
  color: #ef4444; 
}

.btn-action.view { 
  background: #f3f4f6; 
  color: #1f2937; 
  padding: 6px 12px; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  font-size: 12px; 
}
.text-center { 
  text-align: center; 
}
.no-data { 
  color: #9ca3af; 
  padding: 24px; 
}

/* 🧾 Modal Popup Styles */
.modal-overlay { 
  position: fixed; 
  top: 0; left: 0; 
  width: 100vw; 
  height: 100vh; 
  background: rgba(0,0,0,0.4); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 100; 
}
.modal-content { 
  background: white; 
  padding: 24px; 
  border-radius: 12px; 
  width: 450px; 
  max-width: 90%; 
  max-height: 85vh; 
  overflow-y: auto; 
}
.modal-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 1px solid #e5e7eb; 
  padding-bottom: 12px; 
}
.modal-header h3 { 
  margin: 0; 
  font-size: 18px; 
}
.btn-close { 
  background: transparent; 
  border: none; 
  font-size: 24px; 
  cursor: pointer; 
}
.modal-body { 
  margin-top: 16px; 
  font-size: 14px; 
  line-height: 1.6; 
}
.modal-table { 
  width: 100%; 
  border-collapse: collapse; 
  margin-top: 12px; 
}
.modal-table th { 
  background: #f3f4f6; 
  padding: 8px; 
  font-size: 12px; 
  text-align: left; 
}
.modal-table td { 
  padding: 8px; 
  border-bottom: 1px solid #f3f4f6; 
}
.modal-summary { 
  margin-top: 16px; 
  background: #f9fafb; 
  padding: 12px; 
  border-radius: 6px; 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}
.modal-summary div { 
  display: flex; 
  justify-content: space-between; 
}
.grand-total { 
  font-weight: bold; 
  color: #10b981; 
  font-size: 15px; 
  border-top: 1px solid #e5e7eb; 
  padding-top: 8px; 
}
.modal-footer { 
  margin-top: 20px; 
  text-align: right; 
}
.btn-print { 
  width: 100%; 
  padding: 12px; 
  background: #2563eb; 
  color: white; 
  border: none; 
  border-radius: 6px; 
  font-weight: bold; 
  cursor: pointer; 
  }
</style>