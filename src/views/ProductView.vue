<template>
  
  <v-row no-gutters class="layout-container page-container-lock" style="background-color: #f3eae8;">
    
    <!-- Category Section: သီးသန့် scroll -->
    <v-col cols="12" sm="4" md="3" lg="2" class="white category-scroll" style="border-right: 1px solid #e0e0e0;">
      <v-list dense class="pa-0">
       <v-list-item @click="selectedCategoryHandler(0)" :class="selectedCategory === 0 ? 'primary white--text font-weight-bold' : ''">
          <v-list-item-content>
            <v-list-item-title>All Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item 
          v-for="(cat, index) in categoriesList" 
          :key="'cat-' + cat.categoryId"
          @click="selectedCategoryHandler(cat.categoryId)"
          :class="selectedCategory == cat.categoryId? 'primary white--text font-weight-bold' : ''"
          style="border-bottom: 1px solid #f0f0f0;"
        >
          <v-list-item-content>
            <v-list-item-title>{{ cat.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>

    <v-col cols="12" sm="8" md="9" lg="10" class="pa-4 product-scroll" ref="productContainer">
      <div class="products-flex-container">
        
        <div v-for="product in filteredProducts" :key="product.productId" class="product-item-wrapper">
          <v-card 
            @click="goToDetail(product)"
            class="custom-product-card" 
            outlined
          >
            <div class="card-image-box">
              <img 
                :src="getProductImage(product.photoOne)" 
                class="pure-product-img"
                @error="handleImageError"
                alt="Product Image"
              />
            </div>

            <div class="card-content-box">
              <h3 class="product-title" :title="product.title">
                {{ product.title }}
              </h3>
              <p class="product-code">Code: #{{ product.code }}</p>
              
              <div class="price-btn-row">
                <span class="product-price">Ks {{ product.priceOne.toLocaleString() }}</span>
                
                <v-btn 
                  @click.stop="addToCart(product)" 
                  x-small
                  color="#d78f99" 
                  dark 
                  depressed 
                  class="text-none px-2 mini-btn"
                >
                  + Add
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>

      </div>
    </v-col>
  </v-row>
</template>

<script>
import productService from "../service/ProductService";
import axios from "@/config";

export default {
  name: 'ProductView',
  data() {
    return {
      selectedCategory: 0,
      categoriesList: [],
      productsList: []
    };
  },
  computed: {
    filteredProducts(){
      if(this.selectedCategory === 0 || this.selectedCategory === '0'){
        return this.productsList;
      }
      return this.productsList.filter(product =>{
        return product.categorydto && product.categorydto.categoryId == this.selectedCategory;
      })
    }
  },
  mounted: function(){
    this.getCategories();
    this.getProductHome();
  },
  methods: {
    selectedCategoryHandler(categoryId){
      this.selectedCategory = categoryId;
      
      this.$nextTick(() => {
        const container = this.$refs.productContainer;
        if (container) {
          const el = container.$el || container;
          el.scrollTop = 0;
        }
      });
    },
    getCategories: function(){
      axios.get('/category').then((response) => {
        this.categoriesList.splice(0);
        this.categoriesList.push(...response.data);
      })
      .catch((error)=>{
        console.error(error);
      });
    },
    getProductHome: function(){
      productService.getProductHome('c',0).then((response) => {
        this.productsList.splice(0);
        this.productsList.push(...response);
      })
      .catch((error)=>{
        console.error(error);
      });
    },
    getProductImage(photo) {
      const baseURL = axios?.defaults?.baseURL || "";
      return photo ? `${baseURL}/productphoto/${photo}` : "";
       //return new URL(`../assets/images/${photo}`, import.meta.url).href;
    },
    
    goToDetail(product) {
      this.$router.push({ 
        path: '/home-detail', 
        query: { id: product.productId } 
      });
    },
    addToCart(product) {
      console.log('product')
      console.log(product)
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ 
        imageName:product.photoOne,
        price: product.priceOne,
        title:product.title,
         chosenVariant: product.sizeOne, buyQuantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
    },
    handleImageError(event) {
      if (event && event.target) {
        event.target.src = 'https://placehold.co/300x300?text=Product';
      }
    }
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}


.page-container-lock {
  height: calc(100vh - 64px) !important; 
  overflow: hidden !important; 
}


.category-scroll {
  height: 100% !important; 
  overflow-y: scroll !important; 
  overflow-x: hidden !important;
  padding-bottom: 40px !important;
}

.product-scroll {
  height: 100% !important; 
  overflow-y: scroll !important; 
  overflow-x: hidden !important;
  padding-bottom: 60px !important;
}

.products-flex-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.product-item-wrapper {
  width: 20%; 
  padding: 8px;
  display: flex;
}

@media (max-width: 600px) {
  .product-item-wrapper {
    width: 50%;
    padding: 4px;
  }
  .page-container-lock {
    height: calc(100vh - 56px) !important;
  }
}

.custom-product-card {
  background-color: white !important;
  border: 1px solid #eef0f3 !important;
  border-radius: 16px !important; 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.custom-product-card:hover {
  transform: translateY(-3px);
}

.card-image-box {
  width: 100%;
  aspect-ratio: 1 / 1; 
  background-color: #f7f7f7; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px; 
  overflow: hidden;
}

.pure-product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; 
  display: block;
}

.card-content-box {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: white;
}

.product-title {
  font-size: 13px !important;
  font-weight: 600;
  color: #2c3e50;
  margin: 0px 0px 3px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-code {
  font-size: 11px !important;
  color: #95a5a6;
  margin: 0px 0px 10px 0px !important;
}

.price-btn-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.product-price {
  font-size: 13px !important;
  font-weight: 700;
  color: #d78f99; 
}

.mini-btn {
  border-radius: 6px !important;
  font-size: 11px !important;
  height: 24px !important;
  text-transform: none !important;
}
</style>