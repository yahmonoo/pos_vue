<template>
  <v-container fluid class="pa-6">
    <!-- Header & Dropdowns Section -->
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" sm="5">
        <h2 class="text-h4 font-weight-bold primary--text">
          <v-icon large color="primary" class="mr-2">mdi-chart-areaspline</v-icon>
          Sales Analytics
        </h2>
        <p class="text-subtitle-1 grey--text text--darken-1 mb-0">
          လအလိုက် နှင့် တစ်နှစ်စာ ရောင်းအားမှတ်တမ်းများ
        </p>
      </v-col>

      <v-col cols="12" sm="7" class="d-flex justify-end align-center">
        <!-- Month Selector -->
        <div style="width: 200px;" class="mr-3">
          <v-select
            v-model="selectedMonth"
            :items="monthOptions"
            label="Select Month"
            dense
            outlined
            hide-details
            prepend-inner-icon="mdi-filter-variant"
            class="rounded-lg elevation-1 bg-white"
            @change="updateAnalytics"
          ></v-select>
        </div>

        <!-- Year Selector -->
        <div style="width: 140px;">
          <v-select
            v-model="selectedYear"
            :items="years"
            label="Select Year"
            dense
            outlined
            hide-details
            prepend-inner-icon="mdi-calendar"
            class="rounded-lg elevation-1 bg-white"
            @change="updateAnalytics"
          ></v-select>
        </div>
      </v-col>
    </v-row>

    <!-- Summary Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card elevation="3" class="rounded-lg pa-4 border-left-success">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="caption grey--text text-uppercase font-weight-bold">
                {{ isAllMonths ? 'Total Sales (Yearly)' : `${selectedMonth} Total Sales `}}
              </div>
              <div class="text-h5 font-weight-bold green--text text--darken-1">
                {{ displayTotalSales.toLocaleString() }} MMK
              </div>
            </div>
            <v-avatar color="green lighten-5" size="48">
              <v-icon color="green">mdi-cash-multiple</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card elevation="3" class="rounded-lg pa-4 border-left-info">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="caption grey--text text-uppercase font-weight-bold">
                {{ isAllMonths ? 'Monthly Average' : 'Daily Average' }}
              </div>
              <div class="text-h5 font-weight-bold cyan--text text--darken-2">
                {{ displayAverageSales.toLocaleString() }} MMK
              </div>
            </div>
            <v-avatar color="cyan lighten-5" size="48">
              <v-icon color="cyan darken-1">mdi-chart-timeline-variant</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card elevation="3" class="rounded-lg pa-4 border-left-warning">
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="caption grey--text text-uppercase font-weight-bold">
                {{ isAllMonths ? 'Best Month' : 'Best Day' }}
              </div>
              <div class="text-h5 font-weight-bold orange--text text--darken-2">
                {{ peakSalesInfo.title }} ({{ peakSalesInfo.amount.toLocaleString() }} MMK)
              </div>
            </div>
            <v-avatar color="orange lighten-5" size="48">
              <v-icon color="orange darken-2">mdi-trophy-outline</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

   <!-- Chart / Graph Card -->
<v-card elevation="4" class="rounded-xl pa-5">
  <v-card-title class="font-weight-bold text-h6 grey--text text--darken-3">
    <v-icon color="primary" class="mr-2">mdi-chart-line</v-icon>
    {{ isAllMonths ? `${selectedYear} Yearly Monthly Overview` : `${selectedMonth} ${selectedYear} Daily Breakdown `}}
  </v-card-title>
  <v-divider class="my-3"></v-divider>

  <v-card-text>
    <!-- Pure Vue Line Graph (SVG) -->
    <div style="height: 320px; width: 100%; position: relative;" class="pa-2">
      <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none" style="overflow: visible;">
        <!-- Background Grid Lines -->
        <line x1="0" y1="50" x2="800" y2="50" stroke="#f0f0f0" stroke-width="1" />
        <line x1="0" y1="120" x2="800" y2="120" stroke="#f0f0f0" stroke-width="1" />
        <line x1="0" y1="190" x2="800" y2="190" stroke="#f0f0f0" stroke-width="1" />
        <line x1="0" y1="260" x2="800" y2="260" stroke="#e0e0e0" stroke-width="2" />

        <!-- Line Fill Gradient / Area Color -->
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2196F3" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#2196F3" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Area Under Line -->
        <polygon :points="graphAreaPoints" fill="url(#lineGrad)" />

        <!-- Graph Line Path -->
        <polyline
          fill="none"
          stroke="#2196F3"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          :points="graphLinePoints"
        />

        <!-- Data Points (Dots & Value Labels) -->
        <g v-for="(pt, idx) in graphPoints" :key="idx">
          <!-- Circle Dot -->
          <circle
            :cx="pt.x"
            :cy="pt.y"
            r="5"
            fill="#1E88E5"
            stroke="#ffffff"
            stroke-width="2"
          />
          <!-- Value Text Above Dot -->
          <text
            :x="pt.x"
            :y="pt.y - 12"
            font-size="11"
            font-weight="bold"
            fill="#424242"
            text-anchor="middle"
          >
            {{ pt.val > 0 ? (pt.val >= 1000000 ? (pt.val / 1000000).toFixed(1) + 'M' : (pt.val / 1000).toFixed(0) + 'K') : '' }}
          </text>

          <!-- X-Axis Label Below (Jan, Feb, 1, 2...) -->
          <text
            :x="pt.x"
            y="282"
            font-size="11"
            fill="#616161"
            text-anchor="middle"
          >
            {{ currentGraphLabels[idx] }}
          </text>
        </g>
      </svg>
    </div>
  </v-card-text>
</v-card>
  </v-container>
</template>

<script>
export default {
  name: "SalesReport",
  data() {
    return {
      selectedYear: 2026,
      selectedMonth: "All Months (၁နှစ်လုံး)",
      years: [2024, 2025, 2026],

      monthOptions: [
        "All Months (၁နှစ်လုံး)",
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ],

      monthsLabel: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

      mockYearlyData: {
        2024: [1200000, 1900000, 3000000, 500000, 2000000, 3000000, 4500000, 3200000, 2100000, 1800000, 2900000, 4000000],
        2025: [2200000, 2900000, 1500000, 2500000, 3200000, 4100000, 3800000, 4900000, 3100000, 2800000, 3900000, 5200000],
        2026: [3500000, 4200000, 2800000, 3900000, 4500000, 5100000, 6200000, 0, 0, 0, 0, 0]
      },

      currentGraphLabels: [],
      currentGraphData: []
    };
  },

  computed: {
    isAllMonths() {
      return this.selectedMonth === "All Months (၁နှစ်လုံး)";
    },

    displayTotalSales() {
      return this.currentGraphData.reduce((acc, val) => acc + val, 0);
    },

    displayAverageSales() {
      if(!this.currentGraphData || !this.currentGraphData.length) return 0;
      const activeUnits = this.currentGraphData.filter(val => val > 0).length || 1;
      const divisor=activeUnits > 0 ? activeUnits : 1;
      return Math.round(this.displayTotalSales / divisor);
    },

    peakSalesInfo() {
      if (!this.currentGraphData || !this.currentGraphData.length) return { title: '-', amount: 0 };
      
      const maxVal = Math.max(...this.currentGraphData);
      if (maxVal ==0){
        return { title: '-',amount:0};
      }
      const index = this.currentGraphData.indexOf(maxVal);
      const labelName = this.currentGraphLabels[index] || '-';

      return {
        title: this.isAllMonths ? labelName : `Day ${labelName}`,
        amount: maxVal
      };
    },
     graphPoints() {
    if (!this.currentGraphData || !this.currentGraphData.length) return [];
    
    const maxVal = Math.max(...this.currentGraphData, 1);
    const totalPoints = this.currentGraphData.length;
    const width = 800;
    const height = 210; // Top margin allowance
    const startY = 50;

    return this.currentGraphData.map((val, idx) => {
      // Divide X evenly across width
      const x = totalPoints > 1 ? (idx / (totalPoints - 1)) * (width - 40) + 20 : width / 2;
      // Invert Y axis for SVG (0 is top)
      const ratio = val / maxVal;
      const y = startY + (height - ratio * height);
      return { x, y, val };
    });
  },

  // Line Path ၏ points များ
  graphLinePoints() {
    return this.graphPoints.map(p => `${p.x},${p.y}`).join(" ");
  },

  // Line အောက်ခြေ Area Color ၏ points များ
  graphAreaPoints() {
    if (!this.graphPoints.length) return "";
    const firstX = this.graphPoints[0].x;
    const lastX = this.graphPoints[this.graphPoints.length - 1].x;
    return `${firstX},260 ${this.graphLinePoints} ${lastX},260`;
  }
  },

  mounted() {
    this.updateAnalytics();
  },

  methods: {
      
    updateAnalytics() {
      if (this.isAllMonths) {
        this.currentGraphLabels = this.monthsLabel;
        this.currentGraphData = this.mockYearlyData[this.selectedYear] || Array(12).fill(0);
      } else {
        const monthIndex = this.monthOptions.indexOf(this.selectedMonth);
        this.generateMonthlyDailyData(monthIndex);
      }
    },

    generateMonthlyDailyData(monthNum) {
      const daysInMonth = new Date(this.selectedYear, monthNum, 0).getDate();
      const labels = [];
      const data = [];

      const baseMonthlyTotal = this.mockYearlyData[this.selectedYear]?.[monthNum - 1] || 0;
      const avgDaily = baseMonthlyTotal > 0 ? Math.round(baseMonthlyTotal / daysInMonth) : 0;

      for (let day = 1; day <= daysInMonth; day++) {
        labels.push(`${day}`);
        if (baseMonthlyTotal === 0) {
          data.push(0);
        } else {
          const randomFactor = 0.5 + Math.random();
          data.push(Math.round(avgDaily * randomFactor));
        }
      }

      this.currentGraphLabels = labels;
      this.currentGraphData = data;
    }
  },
  watch: {
    selectedYear(){
      this.updateAnalytics();
    },
    selectedMonth(){
      this.updateAnalytics();
    }
  }
};
</script>

<style scoped>
.border-left-success { border-left: 5px solid #4CAF50 !important; }
.border-left-info { border-left: 5px solid #00ACC1 !important; }
.border-left-warning { border-left: 5px solid #FB8C00 !important; }
</style>