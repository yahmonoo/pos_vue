<template>
  <v-row no-gutters style="background-color: #f3eae8; min-height: 100vh;">
    
    <v-col cols="12" sm="4" md="3" lg="2" class="white" style="border-right: 1px solid #e0e0e0;">
      <v-list dense class="pa-0">
        <v-list-item @click="selectedCategory = 'All'" :class="selectedCategory === 'All' ? 'primary white--text font-weight-bold' : ''">
          <v-list-item-content>
            <v-list-item-title>All Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item 
          v-for="(cat, index) in categoriesList" 
          :key="index"
          @click="selectedCategory = cat"
          :class="selectedCategory === cat ? 'primary white--text font-weight-bold' : ''"
          style="border-bottom: 1px solid #f0f0f0;"
        >
          <v-list-item-content>
            <v-list-item-title>{{ cat }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>

    <v-col cols="12" sm="8" md="9" lg="10" class="pa-4">
      <div class="products-flex-container">
        
        <div v-for="product in filteredProducts" :key="product.id" class="product-item-wrapper">
          <v-card 
            @click="goToDetail(product.id)"
            class="custom-product-card" 
            outlined
          >
            <div class="card-image-box">
              <img 
                :src="getProductImage(product.imageName)" 
                class="pure-product-img"
                @error="handleImageError"
                alt="Product Image"
              />
            </div>

            <div class="card-content-box">
              <h3 class="product-title" :title="product.name">
                {{ product.name }}
              </h3>
              <p class="product-code">Code: #{{ product.id }}</p>
              
              <div class="price-btn-row">
                <span class="product-price">Ks {{ product.price.toLocaleString() }}</span>
                
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
export default {
  name: 'ProductView',
  data() {
    return {
      selectedCategory: 'All',
      categoriesList: [
        'Cleanser', 'Concelar', 'Mascara', 'BB Cream', 'Hair Removal', 'Clay Stick',
        'Eyebrow', 'Lipstick & Lipblam', 'Hair care', 'Fiber', 'Dress', 'Lotion',
        'Toner & Emulsion', 'Toner', 'Hair color', 'Moisture', 'Shower',
        'Collagen', 'Suncream', 'Serum', 'Scrub'
      ],
      productsList: []
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'All') return this.productsList;
      return this.productsList.filter(p => p.category === this.selectedCategory);
    }
  },
  mounted() {
    this.generateProducts();
  },
  methods: {
    generateProducts() {
      this.productsList = [
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
    },
    getProductImage(name) {
      return new URL(`../assets/products/${name}`, import.meta.url).href;
    },
    goToDetail(productId) {
      this.$router.push({ 
        path: '/product-detail', 
        query: { id: productId } 
      });
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ ...product, chosenVariant: 'Default', buyQuantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
      // alert(`${product.name} added  to cart။`);
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