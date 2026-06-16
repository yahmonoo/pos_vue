<template>
  <div class="main-content">
    <section class="banner">
      <div class="video-box">
        <video controls autoplay muted loop>
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
          <p>{{ product.price.toLocaleString() }}MMK</p>
          <div class="add-btn">
          <button v-if="product.qty>0" class="minus-icon" @click="removeFromCart(product)">-</button>
          <button class="add-text":class="{ 'no-left-radius': product.qty > 0}" @click="addToCart(product)">
          {{ product.qty > 0 ? 'Qty: ' + product.qty : 'Add' }}
          </button>
          <button class="add-icon" @click="addToCart(product)">+</button>
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
          <div class="add-btn">
          <button v-if="product.qty>0" class="minus-icon" @click="removeFromCart(product)">-</button>
          <button class="add-text" @click="addToCart(product)">
          {{ product.qty > 0 ? 'Qty: ' + product.qty : 'Add' }}
          </button>
          <button class="add-icon" @click="addToCart(product)">+</button>
          </div>
        </div>
      </div>
    </section>

    <section class="products">
      <div class="title">
        <h2>Best Seller Products</h2>
      </div>
      <div class="card-container">
        <div v-for="(product, index) in bestsellerProducts" :key="'bestseller-' + index" class="card">
          <img :src="getImageUrl(product.img)" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price.toLocaleString() }}MMK</p>
          <div class="add-btn">
          <button v-if="product.qty>0" class="minus-icon" @click="removeFromCart(product)">-</button>
          <button class="add-text" @click="addToCart(product)">
          {{ product.qty > 0 ? 'Qty: ' + product.qty : 'Add' }}
          </button>
          <button class="add-icon" @click="addToCart(product)">+</button>
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
    <div class="cart-sidebar" :class="{ 'active': cart.length > 0 }">
      <div class="cart-header">
        <h3>🛒 Shopping Cart (ဝယ်ယူမည့်စာရင်း)</h3>
        <button class="clear-cart-btn" @click="clearCart">Clear All</button>
      </div>

      <div class="cart-items">
        <p v-if="cart.length === 0" class="empty-text">ခြင်းတောင်းထဲမှာ ပစ္စည်းမရှိသေးပါရှင်။</p>

        <div v-for="(item, index) in cart" :key="'cart-item-' + index" class="cart-item">
          <img :src="getImageUrl(item.img)" :alt="item.name" />
          <div class="item-details">
            <h4>{{ item.name }}</h4>
            <p>{{ item.price.toLocaleString() }} MMK x {{ item.boughtQty }}</p>
            </div>
          <div class="item-total">
            {{ (item.price * item.boughtQty).toLocaleString() }} MMK
          </div>
        </div>
      </div>

      <div class="cart-footer" v-if="cart.length > 0">
        <hr />
        <div class="total-row">
          <span>စုစုပေါင်း ကျသင့်ငွေ:</span>
          <span class="total-amount">{{ totalCartPrice.toLocaleString() }} MMK</span>
        </div>
        <button class="checkout-btn" @click="checkout">ဝယ်ယူမည် (Checkout)</button>
      </div>
  </div></div>
</template>

<script setup>
import { ref,computed } from 'vue'

import homeVideo from './home.mp4'
// Popular Products Data
const popularProducts = ref([
  { name: 'Dior Addict Lip Glow', price: 189000, img: 'dior.jpg',qty:0},
  { name: 'Bioderma Suncream', price: 61500, img: 'sun.jpg',qty:0 },
  { name: 'The Ordinary Serum', price: 60000, img: 'serum.jpg',qty:0 },
  { name: 'Medicube Collagen Jelly Cream', price: 68000, img: 'medi.webp',qty:0},
  { name: 'YSL Glow Cushion', price: 93000, img: 'foun.jpg',qty:0},
  { name: 'Chanel coco perfume(30ml)', price: 230000, img: 'coco.webp',qty:0},
  { name: 'Anua 70+ Toner', price: 65500, img: 'anua.webp' ,qty:0},
  { name: 'CeraVe Moisture Cream', price: 84000, img: 'carave.avif',qty:0 },
  { name: 'Rhode Peptide Lip Tint', price: 140000, img: 'rhode.webp',qty:0 },
  { name: 'COSRX essence', price: 6900, img: 'cosrx.jpg',qty:0},
  { name: 'Kiro Waterproof Eyeliner', price: 7000, img: 'eye.jpg',qty:0}
])

// Discount Products Data
const discountProducts = ref([
  { name: 'Romand Zero Matte Lipstick', oldPrice: 29000, newPrice: 26100, discount: '10% OFF', img: 'r0.webp' ,qty:22,maxQty:22 },
  { name: 'Dior Eyeshadow palette', oldPrice: 130000, newPrice: 65000, discount: '50% OFF', img: 'de.jpg',qty:5,maxQty:5 },
  { name: 'Innisfree Facial Foam', oldPrice: 30000, newPrice: 27000, discount: '10% OFF', img: 'inn.jpg',qty:15,maxQty:15 },
  { name: 'Black Rouge Airfit Velvet Tint', oldPrice: 41900, newPrice: 29330, discount: '30% OFF', img: 'br.jpg',qty:25,maxQty:25 },
  { name: 'Loreal Intense Volume Matte', oldPrice: 40000, newPrice: 26000, discount: '35% OFF', img: 'lo.jpg',qty:15,maxQty:15 },
  { name: 'Loreal Shampoo', oldPrice: 25000, newPrice: 23750, discount: '5% OFF', img: 'sh.jpg',qty:14,maxQty:14 }
])

const bestsellerProducts = ref([
  { name: '345 relief cream', price: 58000, img: '345.jpg' ,qty:11,maxQty:11 },
  { name: 'Skin1004 Tone Brightening Ampoule', price: 56000,img: 'sk1004.jpg',qty:25,maxQty:25},
  { name: 'Anua Niacinamide serum', price: 82000,img: 'an.jpg',qty:5,maxQty:5 },
  { name: 'Laneige lip Sleeping mask', price: 44000,img: 'la.jpg',qty:13,maxQty:13 },
  { name: 'Medicube Collegen Night Warping Mask', price: 98000, img: 'nw.jpg',qty:7,maxQty:7 },
  { name: 'Axis-Y Dark Spot Glow Serum', price: 44000, img: 'axis.jpg' ,qty:11,maxQty:11}
])
const getImageUrl = (name) => {
  return new URL(`./${name}`, import.meta.url).href
}

const cart=ref([])
const addToCart = (product) => {
  // if(product.qty>0){
    product.qty++
    const cartItem = cart.value.find(item => item.name === product.name)
  if(cartItem){
    cartItem.boughtQty=product.qty
  }else{
    cart.value.push({
      name:product.name,
      price:product.price||product.newPrice,
      img:product.img,
      boughtQty:1
    })
  }
  console.log('Current Stock in Cart-',cart.value)
}

const removeFromCart = (product) => {
  if(product.qty<product.maxQty){
      product.qty++
      const cartItem = cart.value.find(item => item.name === product.name)
  if(cartItem){
    cartItem.boughtQty--
    if(cartItem.boughtQty===0){
      cart.value=cart.value.filter(item=>item.name !== product.name)
    }
  }
  }else{
    alert("Cannot increase stock.The Stock is already at the maximum quantity")
  }  
  }
  const totalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.boughtQty), 0)
})

// ၃။ ခြင်းတောင်းတစ်ခုလုံးကို သိမ်းကျုံးဖျက်မည့် Function
const clearCart = () => {
  // အကုန်ပြန်ရှင်းမှာဖြစ်လို့ products တွေရဲ့ qty ကို 0 ပြန်ပြောင်းပေးရပါမယ်
  popularProducts.value.forEach(p => p.qty = 0)
  discountProducts.value.forEach(p => p.qty = 0)
  bestsellerProducts.value.forEach(p => p.qty = 0)
  cart.value = []
}
const checkout = () => {
  alert(`လူကြီးမင်း ဝယ်ယူမှု အောင်မြင်ပါသည်ရှင်။ စုစုပေါင်းကျသင့်ငွေ ${totalCartPrice.value.toLocaleString()} MMK ဖြစ်ပါတယ်ရှင်။`)
  clearCart()
}
</script>

<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, sans-serif;
}

body{
    background:#fdf7f8;
}

.main-content {
    margin-left:0;
    margin-top: 0;
    padding: 0;
}

.banner{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom: 0;
    width:100%;
}

.video-box{
    width:100%;
    max-width: 100%;
    overflow: hidden;
    height:500px;
    border: none;
    display:flex;
    justify-content:center;
    align-items:center;
    background:white;
}
.video-box video{ 
    width: 100% !important;
    height: 100% !important; 
    object-fit: cover;
}

.products{
    padding:40px 30px 30px 30px;
}

.title{
    display:flex;
    justify-content:space-between;
    margin-bottom:20px;
}

.card-container{
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #f0f0f0;
    flex: 0 0 220px;
    position: relative;
}
.card img{
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
    text-align:center;
}

.card p {
    font-size: 1.1rem;
    color: #8a2be2; 
    font-weight: bold;
    margin-bottom: 10px;
}
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
    z-index:10;
}

.price-container {
    display: flex;
    align-items: center;
    gap: 10px; 
    margin-bottom: 12px;
}

.new-price {
    font-size: 18px;
    font-weight: bold;
    color: #10b981; 
}
.old-price {
    font-size: 14px;
    color: #9ca3af; 
    text-decoration: line-through; 
}

.add-btn{
    display:flex;
    width:100%;
    margin-top: auto;
}

.add-text{
    flex:1;
    padding:12px;
    border:1px solid white;
    background:#e6e9ff;
    color:black;
    font-size:18px;
    border-radius:10px 0 0 10px;
    cursor:pointer;
}

.add-icon{
    width:45px;
    border:none;
    background:#FFC0CB;
    color:white;
    font-size:24px;
    border-radius:0 10px 10px 0;
    cursor:pointer;
}
.minus-icon {
    width: 45px;
    border: none;
    background:#FFC0CB;
    color: white;
    font-size: 24px;
    border-radius: 10px 0 0 10px; /* ဘယ်ဘက်အနားကိုပဲ ဝိုင်းမည် */
    cursor: pointer;
}
footer {
    background-color:#FFC0CB;
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

.footer-content p{
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
    color: #000000;
    text-decoration: none;
    background-color: #4a154b;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s ease;
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

/* ဈေးဝယ်ခြင်းတောင်း Sidebar ဒီဇိုင်း */
.cart-sidebar {
    position: fixed;
    top: 70px; /* Header ရဲ့အောက်နားကနေ စပေါ်ရန် */
    right: -350px; /* ပုံမှန်အချိန်တွင် ဖျောက်ထားမည် */
    width: 340px;
    height: calc(100vh - 70px);
    background: #ffffff;
    box-shadow: -4px 0 15px rgba(0,0,0,0.1);
    z-index: 99;
    padding: 20px;
    display: flex;
    flex-direction: column;
    transition: right 0.3s ease;
    border-left: 2px solid #FFC0CB;
}

/* ပစ္စည်းတစ်ခုခု ဝယ်လိုက်တာနဲ့ ညာဘက်ကနေ ဝုန်းခနဲ ပွင့်ထွက်လာစေမည့် Class */
.cart-sidebar.active {
    right: 0;
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
}
.cart-header h3 {
    font-size: 16px;
    color: #4a154b;
}
.clear-cart-btn {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 13px;
}

.cart-items {
    flex: 1;
    overflow-y: auto;
}
.empty-text {
    text-align: center;
    color: #9ca3af;
    margin-top: 30px;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #f0f0f0;
}
.cart-item img {
    width: 45px;
    height: 45px;
    object-fit: contain;
}
.item-details h4 {
    font-size: 13px;
    color: #333;
    white-space: normal;
}
.item-details p {
    font-size: 12px;
    color: #8a2be2;
    margin: 0;
}
.item-total {
    margin-left: auto;
    font-weight: bold;
    font-size: 13px;
    color: #10b981;
}

.cart-footer {
    padding-top: 15px;
}
.total-row {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    margin: 10px 0;
}
.total-amount {
    color: #8a2be2;
}
.checkout-btn {
    width: 100%;
    background: #4a154b;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}
.checkout-btn:hover {
    background: #FFC0CB;
    color: #4a154b;
}
@media (max-width: 768px) {
    .main-content {
        margin-top: 0; 
        padding: 0;
    }
    .products{
        padding:20px 15px;
    }
}
</style>
