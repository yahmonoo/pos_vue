<template>
  <v-container fluid>
    <!-- Header -->
  <v-row density="comfortable">
    <v-col cols="12" md="3">
      <v-date-input
        label="From"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        variant="solo"
      ></v-date-input>
    </v-col>

    <v-col cols="12" md="3">
      <v-date-input
        label="To"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        variant="solo"
      ></v-date-input>
    </v-col>
  </v-row>

    <!-- Table Card -->
    <v-card rounded="lg" elevation="0">
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
            <th class="text-center">Customer Name</th>
            <th class="text-center">Date</th>
            <th class="text-center" width="150">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in SaleList"
            :key="item.saleId"
            @click="selectedOne = item"
            :style="{
              backgroundColor:
                item.saleId == selectedOne.saleId ? '#f5e2e5' : 'transparent',
            }"
          >
            <td class="text-center">{{ index + 1 }}</td>

            <td class="text-center">{{ item.profileName }}</td>
            <td class="text-center">{{ item.receiveDate }}</td>
            <td class="text-center">{{ item.voucherCode }}</td>
            <td class="text-center">{{ item.count }}</td>
            <td class="text-center">{{ item.receiveDate }}</td>
            <td class="text-center">{{ item.amount }}</td>
            <td class="text-center">{{ item.receiveDate }}</td>
            <td class="text-center">{{ item.deliFee }}</td>
            <td class="text-center">{{ item.paymentType }}</td>
            <td class="text-center">{{ item.payment }}</td>
            <td class="text-center">{{ item.Date }}</td>
            

            <td class="text-center">
              <v-btn density="compact" icon="mdi-pencil" @click="editSale(item)"></v-btn>
              <v-btn density="compact" icon="mdi-delete" @click="deleteSale(item)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Add Dialog -->
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card rounded="xl" class="cdialog">
        <!-- Header -->
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
    </v-dialog>

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
import cityService from '../../service/CityService.js'
export default {
  data() {
    return {
      dialog: false,
      saleName: '',
      saleDto: {},
      selectedOne: {},
      saveOrUpdate: 'SAVE',
      dialogDelete: false,
      saleList: [],
    }
  },
  props: {},
  mounted: function () {},
  methods: {
    SaleListMethod() {
      SaleListService
        .getsaleList()
        .then((response) => {
          this.SaleList.splice(0, this.SaleList.length)
          this.SaleList.push(...response)
        })
        .catch((error) => {
          this.$swal('Fail!', error.response.data.message, 'error')
        })
    },
    saveSaleList() {
      if (this.saveOrUpdate == 'SAVE') {
        console.log(this.saveOrUpdate)

        SaleListService
          .addSaleList(this.saleDto)
          .then((response) => {})
          .catch((error) => {
            // this.$swal('Fail!', error.response.data.message, 'error')
          })
      } else {
        console.log(this.saveOrUpdate)

        SaleListService
          .updateSaleList(this.saleDto)
          .then((response) => {})
          .catch((error) => {
            // this.$swal('Fail!', error.response.data.message, 'error')
          })
      }
    },
    editSaleList(item) {
      console.log(item)
      this.dialog = true
      this.saveOrUpdate = 'UPDATE'
      this.saleDto = { ...item }
    },
    deleteSlaeList(item) {
      this.dialogDelete = true
      this.selectedOne = { ...item }
      console.log(item)
    },
    clickDeleteDialog() {
      SaleListService
        .deleteCity(this.selectedOne)
        .then((response) => {
          this.dialogDelete = false
        })
        .catch((error) => {
          // this.$swal('Fail!', error.response.data.message, 'error')
        })
    },
  },
  watch: {},
  components: {},
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
  box-shadow: 0 0 0 3px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
}

.cinput :deep(.v-field--focused) {
  box-shadow: 0 0 0 3px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
}

.cinput :deep(.v-label.v-field-label) {
  background: white;
  padding: 0 3px;
}
</style>