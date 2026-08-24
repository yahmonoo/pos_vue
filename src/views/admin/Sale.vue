<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <!-- Left -->
      <v-col cols="12" md="8">
        <v-card elevation="0">
          <v-table fixed-header height="460px" density="compact" class="c-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in itemList"
                :key="index"
                @click="selectedIndex = index"
                :style="{
                  backgroundColor: selectedIndex === index ? '#f5e2e5' : 'transparent',
                }"
              >
                <td>{{ index + 1 }}</td>

                <td class="text-start">{{ item.itemtransactionDto?.productDto?.title }}</td>
                <td class="text-end">{{ item.itemtransactionDto.qty }}</td>
                <td class="text-end">{{ item.itemtransactionDto.unitPrice }}</td>
                <td class="text-end">{{ item.itemtransactionDto.amount }}</td>
                <td class="text-end">{{ item.itemtransactionDto.discount }}</td>
                <td class="text-end">{{ item.itemtransactionDto.balance }}</td>
                <td class="text-center">
                  <v-btn icon size="small" color="primary" @click.stop="editItem(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn icon size="small" color="red" @click.stop="deleteItem(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <!-- Right -->
      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="0">
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" md="12">
                <v-menu
                  v-model="fromMenu"
                  full-width
                  max-width="290px"
                  min-width="290px"
                  v-bind:close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      class="cinput"
                      v-model="saleDto.receivedDate"
                      label="Received Date"
                      readonly
                      v-bind="props"
                      density="compact"
                      variant="outlined"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="receivedPicker"
                    color="primary"
                    hide-header
                    :max="new Date()"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="12">
                <v-autocomplete
                  v-model="saleDto.customerDto"
                  item-text="userName"
                  item-title="userName"
                  :items="customerList"
                  label="Customer"
                  name="userName"
                  return-object
                  required
                  density="compact"
                  variant="outlined"
                  filled
                  class="cinput"
                />
              </v-col>
              <div style="border: 1px solid grey" class="pa-2">
                <v-row no-gutters>
                  <v-col cols="12" md="12">
                    <v-autocomplete
                      v-model="saleDto.itemtransactionDto.productDto"
                      item-text="title"
                      item-title="title"
                      :items="productList"
                      label="Product"
                      name="title"
                      return-object
                      required
                      density="compact"
                      variant="outlined"
                      filled
                      class="cinput"
                    />
                  </v-col>

                  <v-col cols="6" md="6">
                    <v-text-field
                      class="cinput"
                      label="Qty"
                      v-model="saleDto.itemtransactionDto.qty"
                      variant="outlined"
                      density="compact"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="6" md="6">
                    <v-text-field
                      class="cinput"
                      label="UnitPrice"
                      v-model="saleDto.itemtransactionDto.unitPrice"
                      variant="outlined"
                      density="compact"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field
                      class="cinput"
                      label="Amount"
                      v-model="saleDto.itemtransactionDto.amount"
                      variant="outlined"
                      density="compact"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-text-field
                      class="cinput"
                      label="Discount"
                      v-model="saleDto.itemtransactionDto.discount"
                      variant="outlined"
                      density="compact"
                      type="number"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-text-field
                      class="cinput"
                      label="Balance"
                      v-model="saleDto.itemtransactionDto.balance"
                      variant="outlined"
                      density="compact"
                    />
                  </v-col>

                  <v-col cols="12" md="12" class="text-right">
                    <v-btn class="bg-primary" @click="saveItem()">{{ saveOrUpdate }}</v-btn>
                  </v-col>
                </v-row>
              </div>
              <v-col cols="12" md="12" class="pt-2">
                <v-text-field
                  class="cinput"
                  label="Total"
                  v-model="totalBalance"
                  variant="outlined"
                  density="compact"
                  readonly
                />
              </v-col>
              <v-col cols="12" md="12" class="text-right">
                <v-btn class="bg-primary" @click="saveSale()">{{ saveUpdate }}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format } from 'date-fns'

import UserAccountService from '../../service/UserAccountService.js'
import ProductService from '../../service/ProductService.js'
import SaleService from '../../service/SaleService.js'
export default {
  data() {
    return {
      receivedPicker: new Date(),
      fromMenu: false,
      dialog: false,
      cityName: '',
      townshipDto: {},
      saleDto: {
        itemtransactionDto: {
          productDto: {},
          qty: 0,
          unitPrice: 0,
          amount: 0,
          discount: 0,
          balance: 0,
        },
        transactionDto: {
          balance: 0,
        },
      },
      selectedOne: {},
      saveOrUpdate: 'SAVE',
      dialogDelete: false,
      itemList: [],
      customerList: [],
      productList: [],
      selectedIndex: null,
      saveUpdate: 'SAVE',
    }
  },
  props: {},
  computed: {
    totalBalance() {
      return this.itemList.reduce((total, item) => {
        return total + (Number(item.itemtransactionDto?.balance) || 0)
      }, 0)
    },
  },
  mounted: function () {
    this.saleDto.receivedDate = format(this.receivedPicker, 'dd-MM-yyyy')
    this.customerListMethod()
    this.productListMethod()
  },
  methods: {
    customerListMethod() {
      UserAccountService.getUserAccount('CUSTOMER').then((response) => {
        this.customerList.splice(0, this.customerList.length)
        this.customerList.push(...response)
        this.saleDto.customerDto = this.customerList[0]
      })
      // .catch((error) => {
      //   this.$swal('Fail!', error.response.data.message, 'error')
      // })
    },
    productListMethod() {
      ProductService.getProduct().then((response) => {
        this.productList.splice(0, this.productList.length)
        this.productList.push(...response)
        this.saleDto.itemtransactionDto.productDto = this.productList[0]
      })
      // .catch((error) => {
      //   this.$swal('Fail!', error.response.data.message, 'error')
      // })
    },
    calculateAmount() {
      const qty = Number(this.saleDto.itemtransactionDto.qty) || 0
      const unitPrice = Number(this.saleDto.itemtransactionDto.unitPrice) || 0
      const discount = Number(this.saleDto.itemtransactionDto.discount) || 0
      this.saleDto.itemtransactionDto.amount = qty * unitPrice
      this.saleDto.itemtransactionDto.balance = this.saleDto.itemtransactionDto.amount - discount
    },
    saveItem() {
      const item = JSON.parse(JSON.stringify(this.saleDto))

      if (this.saveOrUpdate === 'SAVE') {
        this.itemList.push(item)
      } else {
        const index = this.itemList.findIndex(
          (x) =>
            x.itemtransactionDto.productDto.productId ===
            item.itemtransactionDto.productDto.productId,
        )

        if (index !== -1) {
          this.itemList[index] = item
        }

        this.saveOrUpdate = 'SAVE'
      }

      this.clearItem()
    },
    editItem(item) {
      this.saveOrUpdate = 'UPDATE'

      this.saleDto = JSON.parse(JSON.stringify(item))
    },
    clearItem() {
      this.saleDto.itemtransactionDto = {
        productDto: this.productList[0] || {},
        qty: 0,
        unitPrice: 0,
        amount: 0,
        discount: 0,
        balance: 0,
      }
    },
    deleteItem(item) {
      const index = this.itemList.indexOf(item)

      if (index !== -1) {
        this.itemList.splice(index, 1)
      }
    },

    saveSale() {
      const request = {
        receivedDate: this.receivedPicker ? new Date(this.receivedPicker) : new Date(),
        userAccount: {
          userAccountId: this.saleDto?.customerDto?.userAccountId || 1,
        },
        transaction: {
          payment: Number(this.totalBalance) || 0,
        },
        itemList: this.itemList.map((item) => ({
          productId: item.itemtransactionDto?.productDto?.productId || 0,
          qty: Number(item.itemtransactionDto?.qty) || 1,
          unitPrice: Number(item.itemtransactionDto?.unitPrice) || 0,
          amount: Number(item.itemtransactionDto?.amount) || 0,
          discount: Number(item.itemtransactionDto?.discount) || 0,
          balance: Number(item.itemtransactionDto?.balance) || 0,
        })),
      }

      SaleService.addNewSale(request)
        .then((response) => {
          alert('Sale saved successfully!')
          this.clearSale()
        })
        .catch((error) => {
          console.error('Error Response:', error.response?.data)
        })
    },
    clearSale() {
      this.itemList = []

      this.saleDto.itemtransactionDto = {
        productDto: this.productList[0] || {},
        qty: 0,
        unitPrice: 0,
        amount: 0,
        discount: 0,
        balance: 0,
      }

      this.saveUpdate = 'SAVE'
    },
  },
  watch: {
    receivedPicker() {
      this.fromMenu = false
      this.saleDto.receivedDate = format(this.receivedPicker, 'dd-MM-yyyy')
    },
    'saleDto.itemtransactionDto.qty'() {
      this.calculateAmount()
    },

    'saleDto.itemtransactionDto.unitPrice'() {
      this.calculateAmount()
    },
    'saleDto.itemtransactionDto.discount'() {
      this.calculateAmount()
    },
  },
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

.cinput {
  max-width: 100%;
}

.cinput :deep(.v-field) {
  box-shadow: 0 0 0 2px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
  min-height: 20px;
}

.cinput :deep(.v-field--focused) {
  box-shadow: 0 0 0 2px rgba(35, 32, 33, 0.15);
  padding-left: 12px;
  min-height: 20px;
}

.cinput :deep(.v-label.v-field-label) {
  background: white;
  padding: 0 3px;
}
</style>
