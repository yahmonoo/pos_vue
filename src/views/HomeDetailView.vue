<template>
  <!-- <v-container fluid class="pa-6" style="background-color: #f3eae8; min-height: 100vh;">
    <v-btn text color="grey darken-2" class="mb-4 text-none" @click="goBack">
      <v-icon left>mdi-arrow-left</v-icon> Back to Home
    </v-btn> -->

    <v-btn 
  text 
  color="pink darken-1" 
  class="mb-4 text-none font-weight-medium back-btn" 
  @click="goBack"
>
  <v-icon left class="mr-1">mdi-chevron-left</v-icon> Back
</v-btn>

    <v-row >
      <v-col cols="12" md="6" class="d-flex justify-center">
        <div class="detail-image-box-container">
          <img 
          :src="getImageUrl(product.photoOne)"
            class="detail-pure-product-img" 
            @error="handleImageError"
            alt="Product Image"
          />
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="headline font-weight-bold grey--text text--darken-3 mb-2">{{ product.title }}</h1>
        <p class="caption grey--text mb-4" >Ks {{ currentDisplayPrice ? currentDisplayPrice.toLocaleString() : (product.priceOne || 0).toLocaleString() }}</p>



        <!-- <div class="mb-6">
          Selected Color/Size: <strong class="pink--text">{{ selectedVariant }}</strong>
        </div> -->

        <div class="mb-6">
          <v-btn
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
          </v-btn>
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
     getImageUrl(photo) {
      return `${axios.defaults.baseURL}/productphoto/${photo}`;
    },
    getProductDetail:function(){
    productService
        .getProductDetail(this.productId)
        .then((response) => {
          this.product = response;
          this.setupVariants(response);
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
      
      // 💡 ပြင်ဆင်ချက် - const allProducts = [ ... ] ဟု ပြောင်းလဲသတ်မှတ်ထားပါသည်
      const allProducts = [
        // Popular Products
      //   { id: 101, name: 'Dior Addict Lipstick Glow', price: 189000, img: 'dior.jpg', category: 'Lipstick', description: 'နှုတ်ခမ်းသားကို တနေကုန် စိုပြေဝင်းပစေပြီး Natural Look ပေးမယ့် Dior ရဲ့ Luxury Lip Glow ပါ။',rating:4.8,reviewCount:25 },
      //   { id: 102, name: 'Bioderma Suncream', price: 61500, img: 'sun.jpg', category: 'Skincare', description: 'အသားအရေကို အဆီမပြန်စေဘဲ UV ဒဏ်ကနေ အပြည့်အဝကာကွယ်ပေးတဲ့ ပြင်သစ်နိုင်ငံထုတ် နေလောင်ကာခရင်မ် ဖြစ်ပါတယ်။' },
      //   { id: 103, name: 'The Ordinary Serum', price: 60000, img: 'serum.jpg', category: 'serum', description: 'အမည်းစက်၊ တင်းတိပ်နဲ့ အသားအရေ မညီညာမှုတွေကို သိသိသာသာ သက်သာလျော့ပါးစေတဲ့ နာမည်ကြီး Serum ဖြစ်ပါတယ်။' },
      //   { id: 104, name: 'Medicube Collagen Jelly Cream', price: 68000, img: 'medi.webp', description: 'အသားအရေကို ရေဓာတ်ပြည့်ဝပြီး ကော်လာဂျင်ကြောင့် တင်းရင်းအိစက်စေမယ့် ဂျယ်လီခရင်မ် ဖြစ်ပါတယ်။' },
      //   { id: 105, name: 'YSL Glow Cushion', price: 93000, img: 'foun.jpg', description: 'မျက်နှာကို သဘာဝအတိုင်း Glow ပြီး Coverage ကောင်းကောင်းနဲ့ တနေကုန် ခံတဲ့ YSL Cushion ပါ။' },
      //   { id: 106, name: 'Chanel coco perfume(30ml)', price: 230000, img: 'coco.webp', description: 'Chanel ရဲ့ နာမည်ကြီး လူကြိုက်အများဆုံး ဆွဲဆောင်မှုရှိတဲ့ ဇိမ်ခံ ရေမွှေး ဖြစ်ပါတယ်။' },
      //   { id: 107, name: 'Anua 70+ Toner', price: 65500, img: 'anua.webp', description: 'အသားအရေ နီမြန်းတာတွေနဲ့ Sensitive ဖြစ်တာတွေကို အမြန်ဆုံး သက်သာစေတဲ့ နာမည်ကြီး Toner ပါ။' },
      //   { id: 108, name: 'CeraVe Moisture Cream', price: 84000, img: 'carave.avif', description: 'အသားအရေ ခြောက်သွေ့ပြီး ကွဲအက်တာတွေအတွက် ဆရာဝန်ညွှန်ကြားချက်ပါဝင်တဲ့ အစိုဓာတ်ထိန်းခရင်မ်ပါ။' },
      //   { id: 109, name: 'Rhode Peptide Lip Tint', price: 140000, img: 'rhode.webp',category:'Lip Tint', description: 'Hailey Bieber ရဲ့ နာမည်ကြီး Rhode Lip Tint ဖြစ်ပြီး နှုတ်ခမ်းကို ပြည့်ပြည့်အိအိလေး ဖြစ်စေပါတယ်။' },
      //   { id: 110, name: 'COSRX essence', price: 69000, img: 'cosrx.jpg', description: 'ခရုချွဲဓာတ် ၉၆% ပါဝင်လို့ အသားအရေ ပျက်စီးတာတွေကို ပြုပြင်ပေးပြီး ကြည်လင်စေပါတယ်။' },
      //   { id: 111, name: 'Kiro Waterproof Eyeliner', price: 7000, img: 'eye.jpg', description: 'ရေစိုခံ၊ ချွေးစိုခံပြီး ဆိုးရလွယ်ကူတဲ့ Waterproof Eyeliner ဖြစ်ပါတယ်။' },

      //   // Discount Products
      //   { id: 112, name: 'Romand Zero Matte Lipstick', oldPrice: 29000, newPrice: 26100, price: 26100, discount: '10% OFF', img: 'r0.webp', category: 'Lipstick', description: 'နှုတ်ခမ်းသား ခြောက်သွေ့ခြင်းမရှိဘဲ Matte အိအိလေးနဲ့ အရောင်ထွက် စွဲမက်ဖွယ်ကောင်းတဲ့ Romand Lipstick ပါ။' },
      //   { id: 113, name: 'Dior Eyeshadow palette', oldPrice: 130000, newPrice: 65000, price: 65000, discount: '50% OFF', img: 'de.jpg', category: 'Eyeshadow', description: 'Dior ရဲ့ မျက်ဝန်းကို ပိုမိုတောက်ပ စွဲမက်စေမယ့် Luxury Eyeshadow Palette ဖြစ်ပါတယ်။' },
      //   { id: 114, name: 'Innisfree Facial Foam', oldPrice: 30000, newPrice: 27000, price: 27000, discount: '10% OFF', img: 'inn.jpg', description: 'မျက်နှာအဆီပြန်တာကို ထိန်းပေးပြီး အသားအရေကို သန့်စင်လန်းဆန်းစေတဲ့ Green Tea မျက်နှာသစ်ဖောက်ပါ။' },
      //   { id: 115, name: 'Black Rouge Airfit Velvet Tint', oldPrice: 41900, newPrice: 29330, price: 29330, discount: '30% OFF', img: 'br.jpg',category:'Velvet Tint', description: 'နှုတ်ခမ်းပေါ်တင်လိုက်ရင် ပေါ့ပါးပြီး Velvet သားလေးအတိုင်း တနေကုန်ခံတဲ့ နှုတ်ခမ်းနီ ဖြစ်ပါတယ်။' },
      //   { id: 116, name: 'Loreal Intense Volume Matte', oldPrice: 40000, newPrice: 26000, price: 26000, discount: '35% OFF', img: 'lo.jpg',category:'Matte', description: 'Loreal ရဲ့ Slim Matte နှုတ်ခမ်းနီဖြစ်ပြီး နှုတ်ခမ်းကို ထူထူအိအိလေးနဲ့ ပေါ်လွင်စေပါတယ်။' },
      //   { id: 117, name: 'Loreal Shampoo', oldPrice: 25000, newPrice: 23750, price: 23750, discount: '5% OFF', img: 'sh.jpg', description: 'ဆံသားပျက်စီးတာတွေကို အမြန်ဆုံး ပြုပြင်ပေးပြီး ဆံပင်ကျွတ်ခြင်းကို သက်သာစေတဲ့ ခေါင်းလျှော်ရည်ပါ။' },

      //   // Best Seller Products
      //   { id: 118, name: '345 relief cream', price: 58000, img: '345.jpg', description: 'Skin Barrier ကို ပြလည်ကောင်းမွန်စေပြီး ဝက်ခြံနဲ့ အမာရွတ်တွေကို သက်သာစေတဲ့ Relief Cream ပါ။' },
      //   { id: 119, name: 'Skin1004 Tone Brightening Ampoule', price: 56000, img: 'sk1004.jpg', category: 'Cream', description: 'အသားအရေကို သိသိသာသာ ဖြူဝင်းကြည်လင်လာစေမယ့် Skin1004 ရဲ့ Best Seller Ampoule ပါ။' },
      //   { id: 120, name: 'Anua Niacinamide serum', price: 82000, img: 'an.jpg', category: 'serum', description: 'ချွေးပေါက်ကျဉ်းစေပြီး အဆီပြန်တာကို ထိန်းချုပ်ပေးတဲ့ Anua ရဲ့ နာမည်ကြီး Serum ဖြစ်ပါတယ်။' },
      //   { id: 121, name: 'Laneige lip Sleeping mask', price: 44000, img: 'la.jpg', description: 'ညအိပ်ယာဝင်ဆိုးပေးရုံနဲ့ မနက်ခင်းမှာ နှုတ်ခမ်းသားကို ပန်းရောင်သန်းပြီး စိုအိသွားစေမယ့် Mask ပါ။' },
      //   { id: 122, name: 'Medicube Collegen Night Warping Mask', price: 98000, img: 'nw.jpg', description: 'ညအိပ်နေစဉ် အသားအရေကို ပြုပြင်ပေးပြီး မနက်ခင်းမှာ တင်းရင်းကြည်လင်စေမယ့် Night Mask ပါ။' },
      //   { id: 123, name: 'Axis-Y Dark Spot Glow Serum', price: 44000, img: 'axis.jpg', description: 'တင်းတိပ်၊ မှဲ့ခြောက်နဲ့ အမည်းစက်တွေကို အထိရောက်ဆုံး ဖျောက်ဖျက်ပေးတဲ့ နာမည်ကြီး Serum ဖြစ်ပါတယ်။' }
       ];
     
      // Product Card မှာ ပေါ်အောင် ရေးမည့် Logic ပုံစံ
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
  transform: translateX(-4px); /* Mouse တင်လိုက်ရင် ဘယ်ဘက်ကို နည်းနည်းရွေ့သွားမယ် */
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