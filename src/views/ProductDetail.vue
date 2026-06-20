<template>
  <v-container fluid class="pa-6" style="background-color: #f3eae8; min-height: 100vh;">
    
    <v-btn text color="grey darken-2" class="mb-4 text-none" @click="$router.push('/product')">
      <v-icon left>mdi-arrow-left</v-icon> Back to Products
    </v-btn>

    <v-card v-if="product" class="pa-6" elevation="1" style="border-radius: 12px; background-color: white;">
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
          <h1 class="headline font-weight-bold grey--text text--darken-3 mb-2">{{ product.name }}</h1>
          
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
  data() {
    return {
      product: null,
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
      return new URL(`../assets/products/${this.currentImageName}`, import.meta.url).href;
    }
  },
  mounted() {
    this.loadProduct();
  },
  methods: {
    loadProduct() {

      const productId = this.$route.query.id;

      const allProducts = [
        { id: 201, name: "Lancome Tonique Douceur", category: "Toner", price: 32000, imageName: "product-1.jpg" },
        { id: 202, name: "Media Cream Foundation", category: "Concelar", price: 48000, imageName: "product-2.png" },
        { id: 203, name: "Red Earth Nude Wear Powder", category: "BB Cream", price: 42000, imageName: "product-3.webp" },
        { id: 204, name: "Blackrouge Eye Stamp", category: "Mascara", price: 19900, imageName: "product-4.webp" },
        { id: 205, name: "Matte Velvet Lip Balm Romand", category: "Lipstick & Lipblam", price: 28500, imageName: "product-5.jpg" },
        { id: 206, name: "Perfect Eyebrow Pencil 02", category: "Eyebrow", price: 8500, imageName: "product-6.webp" },
        { id: 207, name: "Smooth Hair Repair Treatment", category: "Hair care", price: 18500, imageName: "product-7.webp" },
        { id: 208, name: "Organic Fiber Diet Drink", category: "Fiber", price: 29000, imageName: "product-8.webp" },
        { id: 209, name: "Whitening Body Milk Lotion", category: "Lotion", price: 16500, imageName: "product-9.avif" },
        { id: 210, name: "Cuta Pro Gentle Cleanser", category: "Clay Stick", price: 33000, imageName: "product-10.webp" }
      ];

      const found = allProducts.find(p => p.id == productId);
      if (found) {
        this.product = found;
        
        if (found.category === 'Lipstick & Lipblam') {
          this.variantOptions = [
            { name: '06', imageName: 'lipstick-06.webp', price: found.price },
            { name: '07', imageName: 'lipstick-07.webp', price: found.price },
            { name: '09', imageName: 'lipstick-09.webp', price: found.price },
            { name: '10', imageName: 'lipstick-10.webp', price: found.price }
          ];
        } else {
          this.variantOptions = [
            { name: '250ml', imageName: found.imageName, price: found.price },
            { name: '100ml', imageName: found.imageName, price: found.price - 10000 }
          ];
        }

        this.selectedVariant = this.variantOptions[0].name;
        this.currentImageName = this.variantOptions[0].imageName;
        this.currentDisplayPrice = this.variantOptions[0].price;
      }
    },
    changeVariant(vOption) {
      this.selectedVariant = vOption.name;
      this.currentImageName = vOption.imageName; 
      this.currentDisplayPrice = vOption.price;   
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ 
        ...this.product, 
        imageName: this.currentImageName, 
        price: this.currentDisplayPrice,
        chosenVariant: this.selectedVariant, 
        buyQuantity: this.quantity 
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
      alert(`${this.product.name} (${this.selectedVariant}) added to cart`);
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
</style>