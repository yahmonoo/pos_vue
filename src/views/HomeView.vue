<template>
  <div class="main-content">
    <section class="banner">
      <div class="video-box">
        <video controls autoplay muted loop playsinline preload="auto">
          <source :src="homeVideo" type="video/mp4" />
          <!-- <source src="/home.mp4" type="video/mp4" /> -->
        </video>
      </div>
    </section>

    <section class="products">
      <div class="title">
        <h2>Popular Products</h2>
      </div>
      <div class="card-container">
        <div v-for="(product, index) in popularProducts" :key="'popular-' + index" class="card">
          <img :src="getImageUrl(product.img)" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <div class="add-btn">
           <span class="price-container">{{ product.price .toLocaleString()}}MMK</span>
           <button class="add-to-cart-btn" @click="addToCart(product)">
          + Add
          </button>
          </div>
        </div>

        <a href="#" class="more-card">
          <span>&gt;</span>
        </a>
      </div>
    </section>

    <section class="products">
      <div class="title">
        <h2>Discount Products</h2>
      </div>
      <div class="card-container">
        <div v-for="(product, index) in discountProducts" :key="'discount-' + index" class="card">
          <span class="discount-badge">{{ product.discount }}</span>
          <img :src="getImageUrl(product.img)" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <div class="price-container">
            <span class="new-price">{{ product.newPrice.toLocaleString() }}MMK</span>
            <span class="old-price">{{ product.oldPrice.toLocaleString() }}MMK</span>
          </div>
          <div class="add-btn-dis">
            <button class="add-to-cart-btn" @click="addToCart(product)">
              +Add
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
        <div v-for="(product, index) in bestsellerProducts"
          :key="'bestseller-' + index"
          class="card">
          <img :src="getImageUrl(product.img)" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <div class="add-btn">
           <span class="price-container">{{ product.price.toLocaleString() }}MMK</span>
           <button class="add-to-cart-btn" @click="addToCart(product)">
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

<script setup>
import { ref } from 'vue'
import homeVideo from '../assets/images/home.mp4'

// Popular Products Data
const popularProducts = ref([
  { name: 'Dior Addict Lip Glow', price: 189000, img: 'dior.jpg', qty: 0 ,maxQty:2},
  { name: 'Bioderma Suncream', price: 61500, img: 'sun.jpg', qty: 0,maxQty:7},
  { name: 'The Ordinary Serum', price: 60000, img: 'serum.jpg', qty: 0 ,maxQty:12 },
  { name: 'Medicube Collagen Jelly Cream', price: 68000, img: 'medi.webp', qty: 0 ,maxQty:13},
  { name: 'YSL Glow Cushion', price: 93000, img: 'foun.jpg', qty: 0 ,maxQty:3},
  { name: 'Chanel coco perfume(30ml)', price: 230000, img: 'coco.webp', qty: 0,maxQty:5 },
  { name: 'Anua 70+ Toner', price: 65500, img: 'anua.webp', qty: 0,maxQty:11 },
  { name: 'CeraVe Moisture Cream', price: 84000, img: 'carave.avif', qty: 0 ,maxQty:10},
  { name: 'Rhode Peptide Lip Tint', price: 140000, img: 'rhode.webp', qty: 0 ,maxQty:7},
  { name: 'COSRX essence', price: 6900, img: 'cosrx.jpg', qty: 0 ,maxQty:5},
  { name: 'Kiro Waterproof Eyeliner', price: 7000, img: 'eye.jpg', qty: 0 ,maxQty:9},
])

// Discount Products Data
const discountProducts = ref([
  {
    name: 'Romand Zero Matte Lipstick',
    oldPrice: 29000,
    newPrice: 26100,
    discount: '10% OFF',
    img: 'r0.webp',
    qty: 0,
    maxQty: 22,
  },
  {
    name: 'Dior Eyeshadow palette',
    oldPrice: 130000,
    newPrice: 65000,
    discount: '50% OFF',
    img: 'de.jpg',
    qty: 0,
    maxQty: 5,
  },
  {
    name: 'Innisfree Facial Foam',
    oldPrice: 30000,
    newPrice: 27000,
    discount: '10% OFF',
    img: 'inn.jpg',
    qty: 0,
    maxQty: 15,
  },
  {
    name: 'Black Rouge Airfit Velvet Tint',
    oldPrice: 41900,
    newPrice: 29330,
    discount: '30% OFF',
    img: 'br.jpg',
    qty: 0,
    maxQty: 25,
  },
  {
    name: 'Loreal Intense Volume Matte',
    oldPrice: 40000,
    newPrice: 26000,
    discount: '35% OFF',
    img: 'lo.jpg',
    qty: 0,
    maxQty: 15,
  },
  {
    name: 'Loreal Shampoo',
    oldPrice: 25000,
    newPrice: 23750,
    discount: '5% OFF',
    img: 'sh.jpg',
    qty: 0,
    maxQty: 14,
  },
])

const bestsellerProducts = ref([
  { name: '345 relief cream', price: 58000, img: '345.jpg', qty: 0, maxQty: 11 },
  {
    name: 'Skin1004 Tone Brightening Ampoule',
    price: 56000,
    img: 'sk1004.jpg',
    qty: 0,
    maxQty: 25,
  },
  { name: 'Anua Niacinamide serum', price: 82000, img: 'an.jpg', qty: 0, maxQty: 5 },
  { name: 'Laneige lip Sleeping mask', price: 44000, img: 'la.jpg', qty: 0, maxQty: 13 },
  { name: 'Medicube Collegen Night Warping Mask', price: 98000, img: 'nw.jpg', qty: 0, maxQty: 7 },
  { name: 'Axis-Y Dark Spot Glow Serum', price: 44000, img: 'axis.jpg', qty: 0, maxQty: 11 },
])
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

const cart = ref([])
const addToCart = (product) => {
  if (product.maxQty && product.qty >= product.maxQty) {
    alert('Cannot increase stock. The Stock is already at the maximum quantity');
    return;
  }
  product.qty++
  if (typeof cartStore.addToCart === 'function') {
    cartStore.addToCart(product)
  } else if (typeof cartStore.addItem === 'function') {
    cartStore.addItem(product)
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
}
.card img {
  height: 250px;
  object-fit: contain;
  margin-bottom: 10px;
  border-radius: 8px;
}
.card h3 {
  font-size: 1rem;
  color: #000000;
  margin: 10px 0 5px 0;
  font-weight: 600;
  white-space: normal;
  text-align: center;
}

/* .card p { 
  font-size: 1.1rem;
  color: #8a2be2;
  font-weight: bold;
  margin-bottom: 10px;
}*/
.more-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 50px;
  background: #ffb6c1;
  border-radius: 12px;
  color: #4a154b;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
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
  color:#db2777;
  font-weight: bold;
  font-size: 15px;
}

.new-price {
  font-size: 15px;
  font-weight: bold;
  color:#db2777;
}

.old-price {
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
}

.add-btn-dis {
  display: flex;
  justify-content:center;
  width: 100%;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
}

.add-btn {
  display: flex;
  justify-content:space-between;
  width: 100%;
  align-items: center;
  margin-top: auto;
  padding-top:0 8px;
  margin-top: auto;
}

.product-price{
  font-weight: bold;
  color: #e91ee9;
  font-size: 14px;
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
  color:#1e293b;
  text-decoration: none;
  background-color:#fce7f3;
  padding: 15px 10px;
  border-radius: 12px;
  text-align: center;
  margin-left:0;
  margin-right:0;
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
