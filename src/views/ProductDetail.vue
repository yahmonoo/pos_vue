<template>
  <v-container fluid class="pa-6" style="background-color: #f3eae8; min-height: 100vh;">
    
    <v-btn outlined color="#d78f99" class="mb-4 text-none font-weight-bold back-btn px-4" style="border-radius:30px; border-width:2px; background-color:white; letter-spacing:0.5px;" @click="$router.go(-1)">
      <v-icon left size="18" class="arrow-icon">mdi-arrow-left</v-icon> Back
    </v-btn>

    <v-card v-if="productData" class="pa-6" elevation="1" style="border-radius: 12px; background-color: white;">
      <v-row>
        
        <v-col cols="12" md="5">
          <div class="detail-image-box-container">
            <img 
              :src="currentDisplayImage" 
              class="detail-pure-product-img" 
              @error="handleImageError"
              alt="Product Image"
            />
          </div>
        </v-col>

        <v-col cols="12" md="7" class="pl-md-8">
          <h1 class="headline font-weight-bold grey--text text--darken-3 mb-2">{{ productData.name }}</h1>
          
          <p class="subtitle-1 font-weight-black pink--text mb-4">Ks {{ currentDisplayPrice.toLocaleString() }}</p>
          
          <div class="body-2 grey--text mb-2">Selected Color/Size: <strong class="pink--text">{{ selectedVariant }}</strong></div>

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

          <div class="mb-6">
            <div class="body-2 grey--text mb-2">Quantity to buy:</div>
            <div class="d-flex align-center">
              <v-btn outlined small :disabled="quantity <= 1" @click="quantity--"><v-icon>mdi-minus</v-icon></v-btn>
              <div class="mx-4 font-weight-bold">{{ quantity }}</div>
              <v-btn outlined small @click="quantity++"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
          </div>

          <v-btn color="#d78f99" dark large depressed class="text-none" @click="addToCart">
            <v-icon left>mdi-cart-plus</v-icon> Add to Cart
          </v-btn>
        </v-col>

      </v-row>
    </v-card>

    <v-card v-else class="pa-6 text-center">
      <v-progress-circular indeterminate color="pink"></v-progress-circular>
      <p class="grey--text mt-2">Product data loading or not found...</p>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      productData: null,
      selectedVariant: '',
      currentImageName: '',
      currentDisplayPrice: 0,
      quantity: 1,
      variantOptions: []
    };
  },
  computed: {
    currentDisplayImage() {
      if (!this.currentImageName) return '';
      if (this.currentImageName.startsWith('http') || this.currentImageName.startsWith('data:')  || this.currentImageName.startsWith('blob:')) {
        return this.currentImageName;
      }
      
      // Home ရဲ့ ပုံလား Product ရဲ့ ပုံလားဆိုတာ ID ကိုကြည့်ပြီး ခွဲခြားဖတ်ပေးတာဖြစ်လို့ ပုံပျောက်မှာ မဟုတ်တော့ပါဘူး
      if (this.productData && this.productData.id >= 201) {
        return new URL(`../assets/products/${this.currentImageName}`, import.meta.url).href;
      } else {
        return new URL(`../assets/images/${this.currentImageName}`, import.meta.url).href;
      }
    }
  },
  mounted() {
    this.loadProduct();
  },
  methods: {
    loadProduct() {
      if (this.product) {
        this.setupProductDetails(this.product);
        return;
      }

      const productId = this.$route.query.id; 
      const allProducts = [
        // Home Products (101 - 123)
        { id: 101, name: 'Dior Addict Lip Glow', price: 189000, imageName: 'dior.jpg', category: 'Lipsticks' },
        { id: 102, name: 'Bioderma Suncream', price: 61500, imageName: 'sun.jpg', category: 'Skincare' },
        { id: 103, name: 'The Ordinary Serum', price: 60000, imageName: 'serum.jpg', category: 'serum' },
        { id: 104, name: 'Medicube Collagen Jelly Cream', price: 68000, imageName: 'medi.webp', category: 'Skincare' },
        { id: 105, name: 'YSL Glow Cushion', price: 93000, imageName: 'foun.jpg', category: 'Cushion' },
        { id: 106, name: 'Chanel coco perfume(30ml)', price: 230000, imageName: 'coco.webp', category: 'Perfume' },
        { id: 107, name: 'Anua 70+ Toner', price: 65500, imageName: 'anua.webp', category: 'Toner' },
        { id: 108, name: 'CeraVe Moisture Cream', price: 84000, imageName: 'carave.avif', category: 'Skincare' },
        { id: 109, name: 'Rhode Peptide Lip Tint', price: 140000, imageName: 'rhode.webp', category: 'Lipsticks' },
        { id: 110, name: 'COSRX essence', price: 69000, imageName: 'cosrx.jpg', category: 'Skincare' },
        { id: 111, name: 'Kiro Waterproof Eyeliner', price: 7000, imageName: 'eye.jpg', category: 'Eyeliner' },
        { id: 112, name: 'Romand Zero Matte Lipstick', price: 26100, imageName: 'r0.webp', category: 'Lipstick' },
        { id: 113, name: 'Dior Eyeshadow palette', price: 65000, imageName: 'de.jpg', category: 'Eyeshadow' },
        { id: 114, name: 'Innisfree Facial Foam', price: 27000, imageName: 'inn.jpg', category: 'Cleanser' },
        { id: 115, name: 'Black Rouge Airfit Velvet Tint', price: 29330, imageName: 'br.jpg', category: 'Lipstick' },
        { id: 116, name: 'Loreal Intense Volume Matte', price: 26000, imageName: 'lo.jpg', category: 'Lipstick' },
        { id: 117, name: 'Loreal Shampoo', price: 23750, imageName: 'sh.jpg', category: 'Shampoo' },
        { id: 118, name: '345 relief cream', price: 58000, imageName: '345.jpg', category: 'Cream' },
        { id: 119, name: 'Skin1004 Tone Brightening Ampoule', price: 56000, imageName: 'sk1004.jpg', category: 'Cream' },
        { id: 120, name: 'Anua Niacinamide serum', price: 82000, imageName: 'an.jpg', category: 'serum' },
        { id: 121, name: 'Laneige lip Sleeping mask', price: 44000, imageName: 'la.jpg', category: 'Lipstick & Lipblam' },
        { id: 122, name: 'Medicube Collegen Night Warping Mask', price: 98000, imageName: 'nw.jpg', category: 'Mask' },
        { id: 123, name: 'Axis-Y Dark Spot Glow Serum', price: 44000, imageName: 'axis.jpg', category: 'Serum' },

        // Product View Products (201 - 220)
        { id: 201, name: "Lancome Tonique Douceur", category: "Toner", price: 32000, imageName: "product-1.jpg" },
        { id: 202, name: "Media Cream Foundation", category: "Concelar", price: 48000, imageName: "product-2.png" },
        { id: 203, name: "Red Earth Nude Wear Powder", category: "BB Cream", price: 42000, imageName: "product-3.webp" },
        { id: 204, name: "Blackrouge Eye Stamp", category: "Mascara", price: 19900, imageName: "product-4.webp" },
        { id: 205, name: "Matte Velvet Lip Balm Romand", category: "Lipstick & Lipblam", price: 28500, imageName: "product-5.jpg" },
        { id: 206, name: "Perfect Eyebrow Pencil 02", category: "Eyebrow", price: 8500, imageName: "product-6.webp" },
        { id: 207, name: "Smooth Hair Repair Treatment", category: "Hair care", price: 18500, imageName: "product-7.webp" },
        { id: 208, name: "Organic Fiber Diet Drink", category: "Fiber", price: 29000, imageName: "product-8.webp" },
        { id: 209, name: "Whitening Body Milk Lotion", category: "Lotion", price: 16500, imageName: "product-9.avif" },
        { id: 210, name: "Cuta Pro Gentle Cleanser", category: "Clay Stick", price: 33000, imageName: "product-10.webp" },
        { id: 211, name: "Centella Skin1004 Probio-cica Bakuchio", category: "Toner", price: 45000, imageName: "product-11.webp" },
        { id: 212, name: "Medicube salmon DNA collagen", category: "Collagen", price: 48000, imageName: "product-12.webp" },
        { id: 213, name: "Rice Water", category: "Scrub", price: 12000, imageName: "product-13.webp" },
        { id: 214, name: "Centella skin1004", category: "Cleanser", price: 35000, imageName: "product-14.webp" },
        { id: 215, name: "3CE lip tint ", category: "Lipstick & Lipblam", price: 48000, imageName: "product-15.png" },
        { id: 216, name: "Yoonskin serum", category: "Serum", price: 49000, imageName: "product-16.jpg" },
        { id: 217, name: "SomeByMi hair care", category: "Hair care", price: 43000, imageName: "product-17.avif" },
        { id: 218, name: "Loreal shower", category: "Shower", price: 18600, imageName: "product-18.jpg" },
        { id: 219, name: "VITA-C moisture", category: "Moisture", price: 56000, imageName: "product-19.webp" },
        { id: 220, name: "Pantene shampoo", category: "Shampoo", price: 23000, imageName: "product-20.avif" }
      ];

      const found = allProducts.find(p => p.id == productId);
      if (found) {
        this.setupProductDetails(found);
      }
    },
    setupProductDetails(found) {
      this.productData = found;
      const baseImg = found.imageName || found.img;

      if (found.category === 'Lipstick & Lipblam' || found.category === 'Lipsticks'  ||found.category === 'Lipstick') {
        // lipstick-06.webp စတဲ့ သီးသန့်ပုံတွေ မရှိသေးရင် error ပြာသွားတတ်လို့ baseImg (မူလပုံ) ကိုပဲ လက်ရှိသုံးပေးထားပါတယ်
        this.variantOptions = [
          { name: '06', imageName: baseImg, price: found.price },
          { name: '07', imageName: baseImg, price: found.price },
          { name: '09', imageName: baseImg, price: found.price },
          { name: '10', imageName: baseImg, price: found.price }
        ];
      } else {
        this.variantOptions = [
          { name: '250ml', imageName: baseImg, price: found.price },
          { name: '100ml', imageName: baseImg, price: found.price - 10000 },
        ];
      }

      this.selectedVariant = this.variantOptions[0].name;
      this.currentImageName = this.variantOptions[0].imageName;
      this.currentDisplayPrice = this.variantOptions[0].price;
    },
    changeVariant(vOption) {
      this.selectedVariant = vOption.name;
      this.currentImageName = vOption.imageName; 
      this.currentDisplayPrice = vOption.price;   
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({
        id: this.productData.id,
        name: this.productData.name,
        price: this.currentDisplayPrice,
        imageName: this.currentImageName,
        chosenVariant: this.selectedVariant,
        buyQuantity: this.quantity
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
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
.detail-image-box-container {
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: #ffffff;
  border: 1px solid #eef2f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  overflow: hidden;
}
.detail-pure-product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; 
  display: block;
}
.back-btn:hover {
  background-color: #fff1f7 !important;
  box-shadow: 0 4px 10px rgba(215, 143, 153, 0.15);
}
.back-btn:hover .arrow-icon {
  transform: translateX(-4px);
}
</style>