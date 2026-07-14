<template>
  <v-container fluid>
    <!-- Header -->

    <div class="d-flex justify-end mb-4">
      <v-btn class="add-btn" prepend-icon="mdi-plus" @click="openAddDialog"> Add Product </v-btn>
    </div>

    <!-- Table Card -->
    <v-card rounded="lg" elevation="0">
      <v-table fixed-header height="470px" density="compact" class="c-table">
        <thead>
          <tr>
            <th class="text-center">No.</th>
            <th class="text-center">Category name</th>
            <th class="text-center">title</th>
            <th class="text-center">detail</th>
            <th class="text-center">code</th>
            <th class="text-center">colorBox</th>
            <th class="text-center">normalPriceOne</th>
            <th class="text-center">percent</th>
            <th class="text-center">discountPriceOne</th>
            <th class="text-center">percent</th>
            <th class="text-center">discountPriceTwo</th>
            <th class="text-center">sizeOne</th>
            <th class="text-center">rating</th>
            <th class="text-center" width="150">Action</th>
          </tr>
        </thead>
        
        <tbody>
          <tr
            v-for="(item, index) in productList"
            :key="item.productId"
            @click="selectedOne = item"
            :style="{
              backgroundColor:
                item.productId == selectedOne.productId ? '#f5e2e5' : 'transparent',
            }"
          >
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.categorydto?.name}}</td>
            <td class="text-center">{{ item.title }}</td>
            <td class="text-center">{{ item.detail }}</td>
            <td class="text-center">{{ item.code }}</td>
            <td class="text-center" v-if="item.colorBox===1">{{ item.colorOne }}</td>
            <td class="text-center" v-else>None</td>
            <td class="text-center">{{item.normalPriceOne }}</td>
            <td class="text-center">{{ item.percent }}%</td>
            <td class="text-center">{{ item.discountPriceOne }}</td>
            <td class="text-center">{{ item.percent }}%</td>
            <td class="text-center">{{ item.discountPriceTwo }}</td>
            <td class="text-center">{{ item.sizeOne}}</td>
            <td class="text-center">{{ item.rating }}</td>
          
            <td class="text-center">
              <v-btn density="compact" icon="mdi-image" @click="viewPhoto(item)"></v-btn>
              <v-btn density="compact" icon="mdi-pencil" @click="editProduct(item)"></v-btn>
              <v-btn density="compact" icon="mdi-delete" @click="deleteProduct(item)"></v-btn>
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
              <div class="text-h6 font-weight-bold">Add New Product</div>
            </div>
          </div>
        </div>
        <v-card-text class="pa-6">  
           <v-autocomplete
                  v-model="productDto.categorydto"
                  item-text="name"
                  item-title="name"
                  :items="categoryList"
                  label="Category Name"
                  name="categoryName"
                  return-object
                  required
                  density="compact"
                  variant="outlined"
                  filled
                  class="cinput"
                />
            <v-text-field
            v-model="productDto.title"
            class="cinput"
            label="Product Title"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="productDto.detail"
            class="cinput"
            label="Product detail"
            variant="outlined"
            density="compact"
          />
          <v-text-field
            v-model="productDto.code"
            class="cinput"
            label="Product Code"
            variant="outlined"
            density="compact"
          />
          
          <v-input
                label="Product Type"
                variant="outlined"
                class="cinput mb-4 pa-3"
                hide-details
              >
              <div class="w-100">
              <v-radio-group
              v-model="productDto.type"
              label="Product Type"
              inline
              density="compact"
              variant="outlined"
              color="#d66182"
              class="cinput mb-4"
              >
              <v-radio label="lip" value="lip" color="#d66182" class="mr-4"></v-radio>
              <v-radio label="none" value="none" color="#d66182"></v-radio>
               </v-radio-group>
               <v-expand-transition>
                <div v-if="productDto.type === 'lip'" class="mt-2 pt-2" style="border-top: 1px dashed #d66182;">
                <v-radio-group
                v-model="productDto.colorOne"
                label="Select Lip Color:"
                inline
                density="compact"
                color="#d66182"
                >
          <v-radio label="06" value="06" class="mr-2"></v-radio>
      <v-radio label="07" value="07" class="mr-2"></v-radio>
      <v-radio label="08" value="08" class="mr-2"></v-radio>
      <v-radio label="09" value="09"></v-radio>
    </v-radio-group>
    </div>
    </v-expand-transition>
   </div>
   </v-input>
              <v-text-field
               v-model.number="productDto.normalPriceOne"
              type="number"
              class="cinput"
              label="Product Normal Price One"
              variant="outlined"
              density="compact"
            />
              <v-text-field
             v-model.number="productDto.discountPriceOne"
             type="number"
             class="cinput"
             label="Product Discount Price One"
            variant="outlined"
            density="compact"
            />

           <v-text-field
           v-model.number="productDto.percent"
           type="number"
           class="cinput"
           label="Product Percent"
           variant="outlined"
           density="compact"
          />
           
          <v-autocomplete
          v-model.number="productDto.sizeOne"
          class="cinput"
          label="Product Size"
          :items="[100,250]"
          variant="outlined"
          density="compact"
         />
         
         <v-text-field
          v-model.number="productDto.rating"
          type="number"
          class="cinput"
          label="Product rating"
          variant="outlined"
          density="compact"
          hint="Rating must be between 1 and 5"
          persistent-hint
         />

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn variant="tonal" rounded="pill" class="mr-2" @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn rounded="pill" class="add-btn" @click="saveProduct"> {{ saveOrUpdate }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog  -->
    <v-col>
      <v-dialog v-model="dialogDelete" width="500">
        <v-card>
          <v-card-title class="text-h5 white--text bg-red"> Delete </v-card-title>

          <v-card-text class="text-h6">
            Are you sure to delete({{ selectedOne.title }})?
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
import productService from '../../service/ProductService.js'
import categoryService from '../../service/CategoryService.js'
import UserAccountService from '../../service/UserAccountService.js';
export default {
  data() {
    return {
      dialog: false,
      productName: '',
      productDto: {},
      selectedOne: {},
      saveOrUpdate: 'SAVE',
      dialogDelete: false,
      productList: [],
      categoryList:[],
    }
  },

  props: {},
  mounted: function () {
    this.categoryListMethod()
    this.productListMethod()
  },
  methods: {
    categoryListMethod() {
    categoryService
      .getCategory() 
      .then((response) => {
        this.categoryList.splice(0, this.categoryList.length)
        this.categoryList.push(...response)
        if(this.categoryList.length > 0) {
          this.productDto.categorydto = this.categoryList[0]
        }
      })
      .catch((error) => {
        this.$swal('Fail!', error.response?.data?.message || 'Error loading categories', 'error')
      })
  },
   openAddDialog(){
  this.productDto = {
    title: '',
    detail: '',
    code: '',
    colorOne: 'none',
    normalPriceOne: 0,
    discountPriceOne: 0,
    percent: 0,
    sizeOne: '',
    rating: 0,
    type:'none',
    categorydto: this.categoryList.length > 0 ? this.categoryList[0] : null
    // Categorydto: { 
    //   categoryId: 1 
    //     }
  }
  this.saveOrUpdate = 'SAVE'
  this.dialog = true
},
    productListMethod() {
      productService
        .getProduct()
        .then((response) => {
          console.log(response);
          
          this.productList.splice(0, this.productList.length)
          this.productList.push(...response)
          // if(this.categoryList.length>0){
          // this.productDto.categoryDto = this.categoryList[0]
          
        })
        .catch((error) => {
          this.$swal('Fail!', error.response.data.message, 'error')
        })
    },
    saveProduct() {
      const payload={...this.productDto};
      // payload.colorBox=this.productDto.type;
      // payload.type=0;
      if(this.productDto.type ==='lip'){
        payload.colorBox=1;
        payload.type=1;
        payload.colorOne=this.productDto.colorOne || '06';
      }else{
        payload.colorBox=0;
        payload.type=0;
        payload.colorOne='none';
      }
       payload.colorTwo='none';
       payload.colorThree='none';
       payload.colorFour='none';

      if (this.saveOrUpdate == 'SAVE') {
        console.log(this.saveOrUpdate)
        console.log(this.productDto);
      
        productService
          .addProduct(payload)
          .then((response) => {
            this.dialog = false;
            this.productDto = {};
            this.productListMethod();
          })
          // .catch((error) => {
          //   this.$swal('Fail!', error.response.data.message, 'error')
          // })
      } else {
        console.log(this.saveOrUpdate)

        productService
          .updateProduct(payload)
          .then((response) => {
            this.dialog = false;
            this.productListMethod();
          })
          .then((response) => {
            this.dialog = false;
            this.productListMethod();
          })
          .catch((error) => {
            // this.$swal('Fail!', error.response.data.message, 'error')
          })
      }
    },
    editProduct(item) {
      console.log(item)
      this.dialog = true
      this.saveOrUpdate = 'UPDATE'

      const isLip=item.colorBox===1 ||['06','07','08','09'].includes(item.colorOne);

      this.productDto = { 
        ...item,
      type:isLip?'lip':'none',
    colorOne:isLip ? item.colorOne :'06' }
    },

    deleteProduct(item) {
      this.dialogDelete = true
      this.selectedOne = { ...item }
      console.log(item)
    },
    clickDeleteDialog() {
      productService
        .deleteProduct(this.selectedOne)
        .then((response) => {
         this.dialogDelete = false
        this.productListMethod();
         this.dialogDelete = false
        this.productListMethod();
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
  /*overflow: hidden;*/
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