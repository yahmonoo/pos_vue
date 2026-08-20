<template>
  <v-container fluid>
    <!-- Header -->
  <v-row density="comfortable">
  <!-- From Date -->
  <v-col cols="12" md="3">
    <v-menu
      v-model="fromMenu"
      :close-on-content-click="false"
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          class="cinput"
          v-model="fromDateStr"
          label="From Date"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          readonly
          v-bind="props"
          hide-details
          density="compact"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="fromDate"
        color="primary"
        hide-header
        @update:model-value="onFromDateSelect"
      ></v-date-picker>
    </v-menu>
  </v-col>

  <!-- To Date -->
  <v-col cols="12" md="3">
    <v-menu
      v-model="toMenu"
      :close-on-content-click="false"
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ props }">
        <v-text-field 
          class="cinput"
          v-model="toDateStr"
          label="To Date"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          readonly
          v-bind="props"
          hide-details
          density="compact"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="toDate"
        color="primary"
        hide-header
        @update:model-value="onToDateSelect"
      ></v-date-picker>
    </v-menu>
  </v-col>
  <v-col cols="12" md="2">
    <v-btn
      color="#d66182"
      theme="dark"
      height="44"
      rounded="lg"
      prepend-icon="mdi-magnify"
      @click="filterByDate"
      block
    >
      Search
    </v-btn>
  </v-col>

</v-row>

    <!-- Table Card -->
    <v-card rounded="lg" elevation="0" class="mt-4">
      <v-table fixed-header height="400px" density="compact" class="c-table">
        <thead>
          <tr>
            <th class="text-center">No.</th>
            <th class="text-center">Customer Name</th>
            <th class="text-center">Received Date</th>
            <th class="text-center">Voucher Code</th>
            <th class="text-center">Item Count</th>
            <th class="text-center">Sale Amount</th>
            <th class="text-center">Deli Fee</th>
            <th class="text-center">Payment Type</th>
            <th class="text-center">Payment Amount</th>
            <th class="text-center">Date</th>
            <th class="text-center" width="150">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in SaleList"
            :key="index"
            @click="selectedOne = item"
            :style="{
              backgroundColor:
                item.saleId == selectedOne.saleId ? '#f5e2e5' : 'transparent',
            }"
          >
            <td class="text-center">{{ index + 1 }}</td>

            <td class="text-center">{{ item.userAccount.profileName }}</td>
            <td class="text-center">{{ item.receivedDate }}</td>
            <td class="text-center">{{ item.voucherCode }}</td>
            <td class="text-center">{{ item.itemCount }}</td>
            <td class="text-center">{{ item.transaction?.amount }}</td>
            <td class="text-center">{{ item.transaction?.deliFee }}</td>
            <td class="text-center">{{ item.transaction?.paymentType }}</td>
            <td class="text-center">{{ item.transaction?.payment }}</td>
            <td class="text-center">{{ item.date }}</td>
            

            <td class="text-center">
              <!-- <v-btn density="compact" icon="mdi-pencil" @click="editSale(item)"></v-btn> -->
              <v-btn density="compact" icon="mdi-delete" @click="deleteSale(item)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Add Dialog -->
    <!-- <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card rounded="xl" class="cdialog">
        
        <div class="dialog-header">
          <div class="d-flex align-center">
            <div>
              <div class="text-h6 font-weight-bold">Add New City</div>
            </div>
          </div>
        </div>

        <v-card-text class="pa-6">
          <v-text-field
            v-model="townshipDto.townshipName"
            class="cinput"
            label="Township Name"
            variant="outlined"
            density="compact"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn variant="tonal" rounded="pill" class="mr-2" @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn rounded="pill" class="add-btn" @click="saveCity"> {{ saveOrUpdate }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- Delete Dialog  -->
    <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red"> Delete </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.name }})?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="black" text @click="dialogDelete = false"> CANCEL </v-btn>
            <v-btn dark class="bg-red" text @click="clickDeleteDialog()"> DELETE </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>

import { format, parse, subDays } from 'date-fns'

import saleService from '../../service/SaleService.js'

export default {
  data() {
    const initialFromDate = subDays(new Date(), 60)
    return {
      fromMenu: false,
      toMenu: false,
      fromDate: initialFromDate, 
      toDate: new Date(),
      fromDateStr: '',
      toDateStr: '',

      dialog: false,
      saleName: '',
      saleDto: {},
      selectedOne: {},
      saveOrUpdate: 'SAVE',
      dialogDelete: false,
      SaleList: [],
    }
  },
  mounted() {
    this.fromDateStr = format(this.fromDate, 'dd-MM-yyyy')
    this.toDateStr = format(this.toDate, 'dd-MM-yyyy')
    
    this.SaleListMethod(this.fromDateStr, this.toDateStr)
  },

  methods: {
    onFromDateSelect(val) {
      if (val) {
        const dateObj = new Date(val)
        this.fromDate = dateObj
        this.fromDateStr = format(dateObj, 'dd-MM-yyyy')
      }
      this.fromMenu = false
    },

    onToDateSelect(val) {
      if (val) {
        const dateObj = new Date(val)
        this.toDate = dateObj
        this.toDateStr = format(dateObj, 'dd-MM-yyyy')
      }
      this.toMenu = false
    },

    filterByDate() {
      console.log("Searching with:", this.fromDateStr, this.toDateStr)
      if (this.fromDateStr && this.toDateStr) {
        this.SaleListMethod(this.fromDateStr, this.toDateStr)
      }
    },

SaleListMethod(from = this.fromDateStr, to = this.toDateStr) {
  saleService
    .getSaleList(from, to, 0)
    .then((response) => {
      console.log("Raw Sale List Response:", response)
      const rawData = response.data?.data || response.data || response

    
      const toYYYYMMDD = (dateStr) => {
        if (!dateStr) return null

        const str = String(dateStr).trim()
        const pureDateStr = str.split(' ')[0] 

        
        if (/^\d{2}-\d{2}-\d{4}$/.test(pureDateStr)) {
          const [d, m, y] = pureDateStr.split('-')
          return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
        }

        
        if (/^\d{4}-\d{2}-\d{2}$/.test(pureDateStr)) {
          return pureDateStr
        }

        
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(pureDateStr)) {
          const [d, m, y] = pureDateStr.split('/')
          return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
        }

        const dObj = new Date(str)
        if (!isNaN(dObj.getTime())) {
          const y = dObj.getFullYear()
          const m = String(dObj.getMonth() + 1).padStart(2, '0')
          const d = String(dObj.getDate()).padStart(2, '0')
          return `${y}-${m}-${d}`
        }

        return null
      }

      
      const fromFormatted = toYYYYMMDD(from)
      const toFormatted = toYYYYMMDD(to)

      if (Array.isArray(rawData)) {
        const filtered = rawData.filter((item) => {
          
          const targetDateStr = item.date || item.receivedDate
          const itemFormatted = toYYYYMMDD(targetDateStr)

          if (!itemFormatted) {
            console.warn("Date Parse မရပါ:", item)
            return false
          }

         
          return itemFormatted >= fromFormatted && itemFormatted <= toFormatted
        })

        this.SaleList = [...filtered]
      } else {
        this.SaleList = []
      }

      console.log("Filtered Count:", this.SaleList.length)
    })
    .catch((error) => {
      console.error("API Error:", error)
    })
},

    deleteSale(item) {
      this.dialogDelete = true
      this.selectedOne = { ...item }
    },

    clickDeleteDialog() {
      saleService
        .deleteSale(this.selectedOne)
        .then((response) => {
          this.dialogDelete = false
          this.SaleListMethod()
        })
        .catch((error) => {})
    },
  },
}
</script>
<style scoped>
.v-table {
  background: transparent;
}

.v-table thead th {
  font-weight: 700;
  background: #f8fafc;
}

.v-table tbody tr:hover {
  background: #f8fafc;
  transition: 0.2s;
}

table,
th,
td {
  border: 1px solid rgb(215, 215, 215);
  border-collapse: collapse;
  padding: 0 3px !important;
}

.add-btn {
  background: linear-gradient(135deg, #e48494 0%, rgb(214, 96, 130) 100%) !important;
  color: white;
  font-weight: 600;
  text-transform: none;
  border-radius: 999px;
  padding: 10px 18px;
  box-shadow: 0 8px 20px rgba(228, 132, 148, 0.35);

  transition: all 0.25s ease;
}

.add-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 28px rgba(228, 132, 148, 0.45);
}

.add-btn:active {
  transform: scale(0.98);
  box-shadow: 0 6px 14px rgba(228, 132, 148, 0.3);
}

.c-table thead th {
  background: #d66182 !important;
  font-weight: 700;

  text-transform: none;
  position: sticky;
  top: 0;
  z-index: 1;
}

/* .c-table tbody tr:hover {
  background: #f5e2e5;
  transition: 0.2s ease;
} */

.cdialog {
  overflow: hidden;
  border: 1px solid #f4d7de;
}

.dialog-header {
  background: linear-gradient(135deg, #e48494 0%, #d66182 100%);
  padding: 22px;
  color: white;
}

.cinput :deep(.v-field) {
  box-shadow: 0 0 0 2px rgba(35, 32, 33, 0.15);
  padding-left: 8px;
  background-color: white;
  border-radius: 8px;
}

.cinput :deep(.v-field--focused) {
  box-shadow: 0 0 0 3px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
}
.cinput :deep(.v-label.v-field-label) {
  background: white;
  padding: 0 4px;
}
.cinput :deep(.v-label.v-field-label) {
  background: white;
  padding: 0 3px;
}
</style>