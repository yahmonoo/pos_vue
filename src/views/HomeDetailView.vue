<template>
  <!-- <v-container fluid class="pa-6" style="background-color: #f3eae8; min-height: 100vh;">
    <v-btn text color="grey darken-2" class="mb-4 text-none" @click="goBack">
      <v-icon left>mdi-arrow-left</v-icon> Back to Home
    </v-btn> -->

  <v-btn 
  depressed
  color="grey lighten-4" 
  class="mb-4 back-btn" 
  style="border-radius: 10px; width: 40px; height: 40px; min-width: 0; padding: 0;"
  @click="goBack"
>
  <v-icon color="grey darken-3">mdi-chevron-left</v-icon>
</v-btn>
    <v-row >
      <v-col cols="12" md="6" class="d-flex justify-center">
        <div class="detail-image-box-container">
          <img 
          :src="imgPhoto"
            class="detail-pure-product-img" 
            @error="handleImageError"
            alt="Product Image"
          />
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="headline font-weight-bold grey--text text--darken-3 mb-2">{{ product.title }}</h1>
        <p class="caption grey--text mb-4" >{{ product.priceOne }} Ks</p>



        <!-- <div class="mb-6">
          Selected Color/Size: <strong class="pink--text">{{ selectedVariant }}</strong>
        </div> -->

        <div class="mb-6">
          <span v-if="product.sizeOne>0">
          <v-btn class="mr-2" @click="clickSizeColor(0)">
            {{product.sizeOne}}
          </v-btn>
          <v-btn v-if="product.sizeTwo>0" @click="clickSizeColor(1)">
            {{product.sizeTwo}}
          </v-btn>
          </span>
          <span v-else-if="product.colorOne!=undefined && product.colorOne!=''">
          <v-btn class="mr-2" @click="clickSizeColor(2)">
            {{product.colorOne}}
          </v-btn>
          <v-btn class="mr-2" @click="clickSizeColor(3)">
            {{product.colorTwo}}
          </v-btn>
          <v-btn class="mr-2" @click="clickSizeColor(4)">
            {{product.colorThree}}
          </v-btn>
          <v-btn class="mr-2" @click="clickSizeColor(5)">
            {{product.colorFour}}
          </v-btn>
          </span>
          <span v-else>
            <v-btn depressed color="grey lighten-3" class="text-none">
              Standard
            </v-btn>
          </span>

          <!-- <v-btn
            v-for="vOption in variantOptions"
            :key="vOption.name"
            outlined
            small
            :color="selectedVariant === vOption.name ? 'pink darken-1' : 'grey'"
            :class="selectedVariant === vOption.name ? 'pink--text font-weight-bold' : 'grey--text'"
            class="mr-2 mb-2 text-none"
            @click="changeVariant(vOption)"
          >
            {{ vOption.name }} 
          </v-btn> -->
        </div>

        <v-card flat class="pa-4 grey lighten-4 mb-6" style="border-radius: 8px;">
          
          <h4 class="subtitle-2 font-weight-bold grey--text text--darken-3 mb-1">detail</h4>
          <p class="body-2 grey--text text--darken-1 mb-0">
            {{ product.detail || 'High-quality cosmetic product imported directly. Safe for all skin types and long-lasting.' }}
          </p>
        </v-card> 

        <div class="mb-6">
          <div class="body-2 grey--text mb-2">count:</div>
          <div class="d-flex align-center">
            <v-btn outlined small :disabled="quantity <= 1" @click="quantity--">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <div class="mx-4 font-weight-bold">{{ quantity}}</div>
            <v-btn outlined small @click="quantity++">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </div>
        
        <v-btn color="#d78f99" dark large block depressed style="border-radius: 6px;" class="text-none" @click="addToCart">
          <v-icon left>mdi-cart-plus</v-icon> Add to Cart
        </v-btn>
      </v-col>
    </v-row>
  
    <!-- <v-row v-else class="text-center pa-12">
      <v-col cols="12">
        <p class="grey--text">Product data not found.</p>
      </v-col>
    </v-row> -->
  <!-- </v-container> -->
</template>

<script>
import productService from "../service/ProductService.js";
import axios from "@/config";
export default {
  name: 'HomeDetail',
  props: {
  },
  data() {
    return {
      // productData: null, // UI ပေါ်မှာ အချက်အလက်ပြဖို့ သုံးပါမည်
         selectedVariant: 'Standard',
       currentImageName: '',
       currentDisplayPrice:'' ,
       quantity: 1,
       variantOptions: [],
      productId:0,
      product:{},
      tempOne:0,
      imgPhoto:'',
    };
  },
  computed: {
    // currentDisplayImage() {
    //   if (!this.currentImageName) return '';
    //   if (this.currentImageName.startsWith('http') || this.currentImageName.startsWith('data:')) {
    //     return this.currentImageName;
    //   }
    //   // 💡 ရုပ်ထွက်ပုံရိပ်များကို assets/images ထဲမှ ရှာဖွေရန် ချိတ်ဆက်ထားပါသည်
    //   return new URL(`../assets/images/${this.currentImageName}`, import.meta.url).href;
    // }
  },
  mounted() {
   // this.loadProduct();
   this.productId = parseInt(this.$route.query.id);
   this.getProductDetail();
  },
  methods: {
    clickSizeColor(index){//0-5
        if(index==0){//price & size 1
          this.product.priceOne = this.tempOne;
          this.selectedVariant = this.product.sizeOne;
          this.currentDisplayPrice = this.product.priceOne;
        }else if(index==1){//price & size2
          this.product.priceOne = this.product.priceTwo;
          this.selectedVariant = this.product.sizeTwo;
          this.currentDisplayPrice = this.product.priceTwo;
        }else if(index==2){
 this.imgPhoto = this.getImageUrl(this.product.photoOne);
 if(this.product.colorOne)this.selectedVariant=this.product.colorOne;
        }else if(index==3){
 this.imgPhoto = this.getImageUrl(this.product.photoTwo);
 if(this.product.colorTwo)this.selectedVariant=this.product.colorTwo;
        }else if(index==4){
 this.imgPhoto = this.getImageUrl(this.product.photoThree);
 if(this.product.colorThree)this.selectedVariant=this.product.colorThree;
        }else if(index==5){
 this.imgPhoto = this.getImageUrl(this.product.photoFour);
 if(this.product.colorFour)this.selectedVariant=this.product.colorFour;
        }
    },
     getImageUrl(photo) {
      return `${axios.defaults.baseURL}/productphoto/${photo}`;
    },
    getProductDetail:function(){
    productService
        .getProductDetail(this.productId)
        .then((response) => {
          this.product = response;
          this.setupVariants(response);
          this.tempOne = this.product.priceOne;
          this.imgPhoto = this.getImageUrl(this.product.photoOne);
        })
        .catch((error) => {
          // this.$swal("Fail!", error.response.data.message, "error");
        });
    },
    loadProduct() {
      if (this.product) {
        this.setupProductDetails(this.product);
        return;
      }
      const productId = parseInt(this.$route.query.id);
   
      const allProducts = [
      ];
     
      
      const found = allProducts.find(p => p.id === productId);
      if (found) {
        this.setupProductDetails(found);
      } else {
        this.$router.push('/');
      }
    },
    
     setupVariants(product) {
      this.variantOptions = [];

      const num1 = parseInt(product.sizeOne) || 0;
      const num2 = parseInt(product.sizeTwo) || 0;

      if (product.sizeTwo && num2 < num1) {
        this.variantOptions.push({
          name: product.sizeTwo,
          imageName: product.photoTwo || product.photoOne,
          price: product.priceTwo  || product.priceOne || product.price
        });
        this.variantOptions.push({
          name: product.sizeOne,
          imageName: product.photoOne,
          price: product.priceOne || product.price
        });
      } else {
        if (product.sizeOne) {
          this.variantOptions.push({
            name: product.sizeOne,
            imageName: product.photoOne,
            price: product.priceOne || product.price
          });
        }
        if (product.sizeTwo) {
          this.variantOptions.push({
            name: product.sizeTwo,
            imageName: product.photoTwo || product.photoOne,
            price: product.priceTwo || product.priceOne || product.price
          });
        }
      }

      if (this.variantOptions.length === 0) {
        this.variantOptions.push({
          name: 'Standard',
          imageName: product.photoOne,
          price: product.priceOne || product.price
        });
      }
      
      this.selectedVariant = this.variantOptions[0].name;
      this.currentImageName = this.variantOptions[0].imageName;
      this.currentDisplayPrice = this.variantOptions[0].price;
    },

isPopular(product) {
  return product.rating >= 4.5 && product.reviewCount >= 10;
},
    changeVariant(vOption) {
      this.selectedVariant = vOption.name;
      this.currentImageName = vOption.imageName; 
      this.currentDisplayPrice = vOption.price;   
    },
    goBack() {
      this.$router.go(-1);
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItem = {
        ...this.product,
        chosenVariant: this.selectedVariant, 
        price: this.currentDisplayPrice || this.product.priceOne,
        imageName: this.currentImageName || this.product.photoOne,
        buyQuantity: this.quantity
      };
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
      
    //   alert(`${this.productData.name} (${this.selectedVariant}) x ${this.quantity} ခုကို Cart ထဲသို့ ထည့်လိုက်ပါပြီ။`);
    },
    handleImageError(event) {
      if (event && event.target) {
        event.target.src = 'https://placehold.co/300x300?text=Glow+Skin';
      }
    }
  }
};
</script>

<style scoped>
.back-btn {
  transition: transform 0.2s ease-in-out;
}
.back-btn:hover {
  transform: translateX(-4px); 
}
.detail-image-box-container {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1 / 1;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #eef2f6;
}
.detail-pure-product-img {
  max-width: 100%;
  max-height: 350px;
  object-fit: contain;
}
</style>