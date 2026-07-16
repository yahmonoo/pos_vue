<template>
  <div class="dashboard-container">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Today's business activities of Glow Skin Cosmetics</p>
    </div>

    <!-- Loading UI -->
    <div v-if="loading" class="loading-text">Loading Dashboard Data...</div>

    <!-- Error UI -->
    <div v-else-if="error" class="error-text">{{ error }}</div>

    <!-- Stats Grid (Dynamic API Data) -->
    <div v-else class="stats-grid">
      <div v-for="stat in stats" :key="stat.id" class="stat-card">
        <div class="stat-info">
          <span class="stat-name">{{ stat.name }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
        
        <div class="stat-icon-box" :style="{ backgroundColor: stat.color }">
          <span class="emoji-icon">{{ stat.icon }}</span>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from "@/config";

export default {
  name: 'AdminDashboard',
  data() {
    return {
      loading: true,
      error: null,
      stats: [
        { id: 1, key: 'totalPrice', name: 'Total Price', value: '0 MMK', icon: '💰', color: '#10b981' },
        { id: 2, key: 'newOrder', name: 'New Order', value: '0 Orders', icon: '🛍', color: '#3b82f6' },
        { id: 3, key: 'newMember', name: 'New Member', value: '0 Members', icon: '👥', color: '#8b5cf6' },
        { id: 4, key: 'lowStock', name: 'Low Stock', value: '0 Items', icon: '⚠️', color: '#ef4444' },
      ],
    };
  },
  mounted() {
    this.getAdminHomeData();
  },
  methods: {
    getAdminHomeData() {
      this.loading = true;
      this.error = null;

      axios.get('/product/adminhome')
        .then((response) => {
          const data = response.data; 
          console.log("backend",data)
          
          if (data) {
            this.stats = this.stats.map(stat => {
              if (stat.key === 'totalPrice') {
                const formattedPrice = Number(data.saleAmount || 0).toLocaleString();
                return { ...stat, value: `${formattedPrice} MMK` };
              }
              if (stat.key === 'newOrder') {
                return { ...stat, value: `${data.orderCount || 0} Orders` };
              }
              if (stat.key === 'newMember') {
                return { ...stat, value: `${data.memberCount || 0} Members `};
              }
              if (stat.key === 'lowStock') {
               return { ...stat, value: `${data.itemCount || 0} Items `};
              }
              return stat;
            });
          }
        })
        .catch((error) => {
          console.error("Dashboard API Error:", error);
          this.error = "Dashboard data ရယူရာတွင် အမှားအယွင်းရှိနေပါသည်။";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.loading-text, .error-text {
  padding: 80px 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
}
.error-text {
  color: #ef4444;
}

.dashboard-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: sans-serif;
}

.dashboard-header {
  margin-bottom: 70px;
  margin-top: 20px;
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
  background-color: #f0a3a3;
  padding: 100px 60px 60px 60px;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px 0 rgba(225, 29, 29, 0.05);
}
.stat-card:hover  {
  transform: scale(1.05);
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
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.emoji-icon {
  font-size: 22px;
}
</style>