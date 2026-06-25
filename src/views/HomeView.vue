<template>
  <!-- <HomeDetailView
    v-if="selectedProduct"
    :product="selectedProduct"
    @back="selectedProduct = null"
    @add-to-cart="handleAddToCartFromDetail"
  /> -->
  
  <div class="main-content">
    <section class="banner">
      <div class="video-box">
        <video controls autoplay :muted="true" loop playsinline preload="auto">
          <source :src="homeVideo" type="video/mp4" />
        </video>
      </div>
    </section>

    <section class="products">
      <div class="title">
        <h2>Popular Products</h2>
      </div>
      <div class="card-container">
        <div v-for="(product, index) in popularProducts" :key="'popular-' + index" class="card" @click="openDetail(product)">
          <div class="image-box">
            <img :src="getImageUrl(product.img)" :alt="product.name" />
            <div class="rating-container" v-if="product.rating">
  <span class="stars">
    <span v-for="star in Math.floor(product.rating)" :key="'filled-' + star" class="star filled">★</span>
    
    <span v-if="product.rating % 1 !== 0" class="star half">★</span>
    
    <span v-for="star in (5 - Math.ceil(product.rating))" :key="'empty-' + star" class="star empty">★</span>
  </span>
  <span class="rating-text">({{ product.rating }})</span>
</div>
            <div class="product-desc" v-if="product.description">
              <p>{{ product.description }}</p>
            </div>
          </div>
          <h3>{{ product.name }}</h3>
          <p class="product-code">Code: #{{ product.id }}</p>
          <div class="add-btn">
            <span class="price-container">{{ product.price.toLocaleString() }}MMK</span>
            <button class="add-to-cart-btn" @click.stop="addToCart(product)">
              + Add
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="products">
      <div class="title">
        <h2>Discount Products</h2>
      </div>
      <div class="card-container">
        <div v-for="(product, index) in discountProducts" :key="'discount-' + product.name + index" class="card" @click="openDetail(product)">
          <span class="discount-badge">{{ product.discount }}</span>
          <img :src="getImageUrl(product.img)" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p class="product-code">Code: #{{ product.id }}</p>
          <div class="price-container">
            <span class="new-price">{{ product.newPrice.toLocaleString() }}MMK</span>
            <span class="old-price">{{ product.oldPrice.toLocaleString() }}MMK</span>
          </div>
          <div class="add-btn-dis">
            <button class="add-to-cart-btn" @click.stop="addToCart(product)">
              + Add
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="products">
      <div class="title">
        <h2>Best Seller Products</h2>
      </div>
      <div class="card-container">
        <div v-for="(product, index) in bestsellerProducts" :key="'bestseller-' + index" class="card" @click="openDetail(product)">
          <img :src="getImageUrl(product.img)" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p class="product-code">Code: #{{ product.id }}</p>
          <div class="add-btn">
            <span class="price-container">{{ product.price.toLocaleString() }}MMK</span>
            <button class="add-to-cart-btn" @click.stop="addToCart(product)">
              + Add
            </button>
          </div>
        </div>
      </div>
    </section>
  
    <footer id="contact-section">
      <div class="footer-content">
        <h3>Glow Skin Cosmetics</h3>
        <p>Trusted High-Quality Cosmetics for Your Beauty</p>

        <div class="contact-info">
          <span>📞 Phone: 09-123456789</span> |
          <span>📍 Address: Mandalay, Myanmar</span>
        </div>

        <div class="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
          <a href="https://viber.com" target="_blank" rel="noopener">Viber</a>
          <a href="#" class="mail-btn">Email Us</a>
        </div>

        <hr class="footer-line" />
        <p class="copyright">© 2026 Cosmetics POS. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import homeVideo from '../assets/images/co.mp4'
import HomeDetailView from './HomeDetailView.vue'

export default {
  name: 'HomeView',
  components: {
    HomeDetailView
  },
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      homeVideo: homeVideo,
      selectedProduct: null,

      // Popular Products Data
      popularProducts: [
        { id: 101, name: 'Dior Addict Lip Glow', price: 189000, img: 'dior.jpg', qty: 0, maxQty: 2, category: 'Lipsticks',rating:5 },
        { id: 102, name: 'Bioderma Suncream', price: 61500, img: 'sun.jpg', qty: 0, maxQty: 7, category: 'Skincare', rating:4.8},
        { id: 103, name: 'The Ordinary Serum', price: 60000, img: 'serum.jpg', qty: 0, maxQty: 12, category: 'serum',rating:4.5  },
        { id: 104, name: 'Medicube Collagen Jelly Cream', price: 68000, img: 'medi.webp', qty: 0, maxQty: 13,rating:5 },
        { id: 105, name: 'YSL Glow Cushion', price: 93000, img: 'foun.jpg', qty: 0, maxQty: 3 ,rating: 4.8},
        { id: 106, name: 'Chanel coco perfume(30ml)', price: 230000, img: 'coco.webp', qty: 0, maxQty: 5 ,rating:4.3},
        { id: 107, name: 'Anua 70+ Toner', price: 65500, img: 'anua.webp', qty: 0, maxQty: 11,rating:4.5 },
        { id: 108, name: 'CeraVe Moisture Cream', price: 84000, img: 'carave.avif', qty: 0, maxQty: 10,rating:4.8 },
        { id: 109, name: 'Rhode Peptide Lip Tint', price: 140000, img: 'rhode.webp', qty: 0, maxQty: 7 ,rating:4.6},
        { id: 110, name: 'COSRX essence', price: 69000, img: 'cosrx.jpg', qty: 0, maxQty: 5,rating:4  },
        { id: 111, name: 'Kiro Waterproof Eyeliner', price: 7000, img: 'eye.jpg', qty: 0, maxQty: 9,rating:4.8 }
      ],

      // Discount Products Data
      discountProducts: [
        { id: 112, name: 'Romand Zero Matte Lipstick', oldPrice: 29000, newPrice: 26100, price: 26100, discount: '10% OFF', img: 'r0.webp', qty: 0, maxQty: 22, category: 'Lipstick' },
        { id: 113, name: 'Dior Eyeshadow palette', oldPrice: 130000, newPrice: 65000, price: 65000, discount: '50% OFF', img: 'de.jpg', qty: 0, maxQty: 5, category: 'Eyeshadow' },
        { id: 114, name: 'Innisfree Facial Foam', oldPrice: 30000, newPrice: 27000, price: 27000, discount: '10% OFF', img: 'inn.jpg', qty: 0, maxQty: 15 },
        { id: 115, name: 'Black Rouge Airfit Velvet Tint', oldPrice: 41900, newPrice: 29330, price: 29330, discount: '30% OFF', img: 'br.jpg', qty: 0, maxQty: 25 },
        { id: 116, name: 'Loreal Intense Volume Matte', oldPrice: 40000, newPrice: 26000, price: 26000, discount: '35% OFF', img: 'lo.jpg', qty: 0, maxQty: 15 },
        { id: 117, name: 'Loreal Shampoo', oldPrice: 25000, newPrice: 23750, price: 23750, discount: '5% OFF', img: 'sh.jpg', qty: 0, maxQty: 14 }
      ],

      // Best Seller Products Data
      bestsellerProducts: [
        { id: 118, name: '345 relief cream', price: 58000, img: '345.jpg', qty: 0, maxQty: 11 },
        { id: 119, name: 'Skin1004 Tone Brightening Ampoule', price: 56000, img: 'sk1004.jpg', qty: 0, maxQty: 25, category: 'Cream' },
        { id: 120, name: 'Anua Niacinamide serum', price: 82000, img: 'an.jpg', qty: 0, maxQty: 5, category: 'serum' },
        { id: 121, name: 'Laneige lip Sleeping mask', price: 44000, img: 'la.jpg', qty: 0, maxQty: 13 },
        { id: 122, name: 'Medicube Collegen Night Warping Mask', price: 98000, img: 'nw.jpg', qty: 0, maxQty: 7 },
        { id: 123, name: 'Axis-Y Dark Spot Glow Serum', price: 44000, img: 'axis.jpg', qty: 0, maxQty: 11 }
      ]
    }
  },
  computed: {
  },

  methods: {
    getImageUrl(name) {
      return new URL(`../assets/images/${name}`, import.meta.url).href
    },

    openDetail(product) {
      this.$router.push({
       path:'/home-detail',
       query:{id:product.id}
      });
    },
     
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const targetPrice = product.price || product.newPrice;
      cart.push({ 
        ...product, 
        imageName: product.img,
        price: targetPrice,
        chosenVariant: product.category === 'Lipstick' || product.category === 'Lipsticks' ? '06' : 'Standard', 
        buyQuantity: 1 
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-local-storage-changed'));
      
      // alert(`${product.name} added to cart။`);
    },
    handleAddToCartFromDetail(productDataFromDetail) {
      this.addToCart(productDataFromDetail);
      this.selectedProduct = null; 
    } 
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background: #fdf7f8;
}

.main-content {
  margin-left: 0;
  margin-top: 0;
  padding: 0;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  width: 100%;
}

.video-box {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  height: 530px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
.video-box video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}

.products {
  padding: 40px 30px 30px 30px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title h2 {
  font-size: 1.6rem; 
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em; 
}

.card-container {
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  padding: 20px;
  scroll-behavior: smooth;
  white-space: nowrap;
  scrollbar-width: thin;
}
.card-container::-webkit-scrollbar {
  height: 6px;
}
.card-container::-webkit-scrollbar-thumb {
  background: #ffb6c1;
  border-radius: 10px;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 16px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f0f0f0;
  flex: 0 0 220px;
  position: relative;
  text-decoration: none;
  cursor: pointer;
}
.card img {
  height: 250px;
  object-fit: contain;
  margin-bottom: 10px;
  border-radius: 8px;
}
.card:hover img {
  transform: scale(1.05);
}
.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); /* Card လေးပါ အပေါ်ကို နည်းနည်း ကြွတက်လာသလို ခံစားရစေတယ် */
}
.card h3 {
  font-size: 1rem;
  color: #000000;
  margin: 10px 0 5px 0;
  font-weight: 600;
  white-space: normal;
  text-align: center;
}

.card button:hover {
  background-color: #ffb6c1;
  color: #4a154b;
}

.card .discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  color: white;
  background-color: red;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  z-index: 10;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #db2777;
  font-weight: bold;
  font-size: 15px;
}

.new-price {
  font-size: 15px;
  font-weight: bold;
  color: #db2777;
}

.old-price {
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
}

.add-btn-dis {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
}

.add-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
}

.add-to-cart-btn {
  background-color: #fff5f7;
  color: #d81b60;
  border: none;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

footer {
  background-color: #ffc0cb;
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
  margin-top: 60px;
  border-radius: 12px;
}

.footer-content h3 {
  color: #000000;
  font-size: 22px;
  margin-bottom: 10px;
}

.footer-content p {
  color: #000000;
  font-size: 14px;
  margin-top: 0;
  padding: 0;
}

.contact-info {
  margin: 15px 0;
  font-size: 15px;
  color: #000000;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.social-links a {
  color: #1e293b;
  text-decoration: none;
  background-color: #fce7f3;
  padding: 15px 10px;
  border-radius: 12px;
  text-align: center;
}

.social-links a:hover {
  background-color: #ffb6c1;
  color: #4a154b;
}

.footer-line {
  border: 0;
  border-top: 1px solid #374151;
  margin: 25px auto 15px auto;
  width: 80%;
}

.footer-content .copyright {
  font-size: 15px;
  color: #000000;
}
.product-code {
  font-size: 11px !important;
  color: #95a5a6;
  margin: 5px 0px 10px 0px !important;
}
.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 5px 0;
  background:#fff9fa;
}

.stars {
  display:inline-flex;
  color: #f1c40f; /* ကြယ်ရောင်ကို အဝါရောင် သတ်မှတ်ခြင်း */
  font-size: 15px;
}

.star.filled {
  color: #ffb800;
}

.star.empty {
  color: #e2e8f0; 
}
.star.half {
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #f1c40f 50%, #e0e0e0 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rating-text {
  font-size: 12px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .main-content {
    margin-top: 0;
    padding: 0;
  }
  .products {
    padding: 20px 15px;
  }
}
</style>