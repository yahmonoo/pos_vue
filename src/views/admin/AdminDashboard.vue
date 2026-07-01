<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Today's business activities of Glow Skin Cosmetics</p>
    </div>

    <!-- ၄ ကတ်တွဲ Stats Section -->
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.id" class="stat-card">
        <div class="stat-info">
          <span class="stat-name">{{ stat.name }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
        <!-- Icon အစား စာသား/အီမိုဂျီ သုံးထားခြင်း -->
        <div class="stat-icon-box" :style="{ backgroundColor: stat.color }">
          <span class="emoji-icon">{{ stat.icon }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content: Graph & Table -->
    <div class="main-content-grid">
      <div class="chart-section">
        <h2>Sales Trend Graph</h2>
        <div class="chart-placeholder">

        </div>
      </div>

      <div class="orders-section">
        <h2>Latest Orders</h2>
        <div class="orders-list">
          <div v-for="order in recentOrders" :key="order.id" class="order-item">
            <div class="order-customer-details">
              <p class="customer-name">{{ order.customer }}</p>
              <p class="product-info">{{ order.product }} • {{ order.id }}</p>
            </div>
            <div class="order-price-details">
              <p class="price-text">{{ order.price }}</p>
              <span :class="['status-badge', order.status.toLowerCase()]">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: [
        
        { id: 1, name: 'Total Price', value: '1,250,000 MMK', icon: '💰', color: '#10b981' },
        { id: 2, name: 'New Order', value: '45 pcs', icon: '🛍️', color: '#3b82f6' },
        { id: 3, name: 'New Member', value: '12 Members', icon: '👥', color: '#8b5cf6' },
        { id: 4, name: 'Low Stock', value: '5 Items', icon: '⚠️', color: '#ef4444' },
      ],
      recentOrders: [
        { id: 'ORD-001', customer: 'Ma May Thu', product: 'Glow Serum', price: '35,000 MMK', status: 'Pending' },
        { id: 'ORD-002', customer: 'Ko Htet', product: 'Sunscreen SPF50', price: '28,000 MMK', status: 'Shipped' },
        { id: 'ORD-003', customer: 'Ma Su Mon', product: 'Moisturizer Cream', price: '42,000 MMK', status: 'Delivered' },
      ]
    };
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}

.dashboard-header {
  margin-bottom: 24px;
}
.dashboard-header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 4px 0;
}
.dashboard-header p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .stats-grid { 
    grid-template-columns: repeat(2, minmax(0, 1fr)); 
  }
}
@media (min-width: 1024px) {
  .stats-grid { 
    grid-template-columns: repeat(4, minmax(0, 1fr)); 
  }
}

.stat-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-name {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}
.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-top: 4px;
}

.stat-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.emoji-icon {
  font-size: 22px;
}

.main-content-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
}

@media (min-width: 1024px) {
  .main-content-grid { 
    grid-template-columns: repeat(3, minmax(0, 1fr)); 
  }
  .chart-section { 
    grid-column: span 2 / span 2; 
  }
}

.chart-section, .orders-section {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.chart-section h2, .orders-section h2 {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.chart-placeholder {
  height: 256px;
  background-color: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  border: 1px dashed #d1d5db;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.order-item:hover {
  background-color: #f9fafb;
}

.customer-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
  margin: 0;
}
.product-info {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
}

.order-price-details {
  text-align: right;
}
.price-text {
  font-size: 14px;
  font-weight: bold;
  color: #374151;
  margin: 0 0 4px 0;
}

.status-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-weight: 500;
  display: inline-block;
}
.status-badge.pending { 
  background-color: #fef3c7; 
  color: #d97706; 
}
.status-badge.shipped { 
  background-color: #dbeafe; 
  color: #2563eb; 
}
.status-badge.delivered { 
  background-color: #d1fae5; 
  color: #059669; 
}
</style>