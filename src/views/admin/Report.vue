<template>
  <div class="report-container">
    <!-- Header & Export Buttons -->
    <div class="report-header">
      <div>
        <h1>Sales Report</h1>
        <p class="subtitle">Detailed sales data of Glow Skin Cosmetics</p>
      </div>
     
      <div class="export-buttons">
        <button @click="exportData('Excel')" class="btn-export excel">📊 Export Excel</button>
        <button @click="exportData('PDF')" class="btn-export pdf">📄 Export PDF</button>
      </div>
    </div>

    
    <div class="filter-card">
      <div class="filter-group">
        <label>Start Date:</label>
        <input type="date" v-model="startDate" />
      </div>
      <div class="filter-group">
        <label>End Date:</label>
        <input type="date" v-model="endDate" />
      </div>
      <button @click="filterReport" class="btn-filter">Search</button>
    </div>

   
    <div class="report-summary-grid">
      <div class="summary-box">
        <span class="box-title">Total Revenue</span>
        <span class="box-value text-green">105,000 MMK</span>
      </div>
      <div class="summary-box">
        <span class="box-title">Total Orders</span>
        <span class="box-value">3 orders</span>
      </div>
      <div class="summary-box">
        <span class="box-title">Average Order Value</span>
        <span class="box-value">35,000 MMK</span>
      </div>
    </div>

    
    <div class="table-card">
      <h2>Sales Details</h2>
      <div class="table-responsive">
        <table class="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items Purchased</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in salesData" :key="row.orderId">
              <td>{{ row.date }}</td>
              <td class="order-id">{{ row.orderId }}</td>
              <td>{{ row.customer }}</td>
              <td>{{ row.product }}</td>
              <td><span class="payment-method">{{ row.payment }}</span></td>
              <td class="amount">{{ row.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesReport',
  data() {
    return {
      
      startDate: '2026-06-01',
      endDate: '2026-06-28',
     
      salesData: [
        { date: '28-06-2026', orderId: 'ORD-001', customer: 'Ma May Thu', product: 'Glow Serum (1)', payment: 'KPay', amount: '35,000 MMK' },
        { date: '27-06-2026', orderId: 'ORD-002', customer: 'Ko htet', product: 'Sunscreen SPF50 (1)', payment: 'Wave Pay', amount: '28,000 MMK' },
        { date: '27-06-2026', orderId: 'ORD-003', customer: 'Ma Su Mon', product: 'Moisturizer Cream (1)', payment: 'Cash on Delivery', amount: '42,000 MMK' }
      ]
    };
  },
  methods: {
    filterReport() {
      // alert(`ရက်စွဲ ${this.startDate} မှ ${this.endDate} အထိ ဒေတာများကို စစ်ထုတ်နေပါသည်...`);
     
    },
    exportData(type) {
      // alert(`အရောင်းစာရင်းကို ${type} ဖိုင်အဖြစ် ထုတ်ယူနေပါသည်...`);
    }
  }
};
</script>

<style scoped>
.report-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}

/* Header Area */
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}
.report-header h1 {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 4px 0;
}
.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Buttons Styling */
.export-buttons {
  display: flex;
  gap: 12px;
}
.btn-export {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}
.btn-export:hover { 
  opacity: 0.9; 
}
.excel { 
  background-color: #e2f5ec; 
  color: #10b981; 
}
.pdf { 
  background-color: #fee2e2; 
  color: #ef4444; 
}

/* Filter Card */
.filter-card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
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
.btn-filter {
  padding: 9px 20px;
  background-color: rgb(232, 124, 142);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.btn-filter:hover { 
  background-color: rgb(183, 64, 84); 
}

/* Summary Grid */
.report-summary-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
@media (min-width: 640px) {
  .report-summary-grid { 
    grid-template-columns: repeat(3, minmax(0, 1fr)); 
  }
}
.summary-box {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.box-title {
   font-size: 13px;
   color: #6b7280; 
}
.box-value { 
  font-size: 18px; 
  font-weight: bold; 
  color: #1f2937; 
}
.text-green { 
  color: #10b981; 
}

/* Table Styling */
.table-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.table-card h2 {
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 16px 0;
}
.table-responsive {
  overflow-x: auto;
}
.sales-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}
.sales-table th {
  background-color: #f9fafb;
  color: #4b5563;
  padding: 12px;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
}
.sales-table td {
  padding: 14px 12px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}
.sales-table tr:hover {
  background-color: #f9fafb; 
}
.order-id { 
  font-weight: 600; 
  color: #2563eb;
 }
.amount {
   font-weight: bold;
    color: #111827;
   }
.payment-method {
  background-color: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #4b5563;
}
</style>