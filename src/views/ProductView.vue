<template>
  <div>
    <ProductDetail 
      v-if="selectedProduct" 
      :product="selectedProduct" 
      @back="selectedProduct = null"
      @add-to-cart="handleAddToCartFromDetail"
    />

    <div v-else class="h-screen flex flex-col p-4 bg-[#f3eae8] font-sans text-slate-800 overflow-hidden">
      
      <div class="mb-4 shrink-0 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-rose-100">
        <div>
          <h1 class="text-lg font-bold text-slate-800 tracking-wide">Cosmetic Counter</h1>
          <p class="text-[11px] text-slate-500">Total Products: {{ allProducts.length }} Items Available</p>
        </div>
        <div class="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-xs font-semibold border border-rose-100">
          Viewing: {{ activeCategory }}
        </div>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-4 scrollbar-hide shrink-0">
        <button @click="activeCategory = 'All Items'"
                :class="activeCategory === 'All Items' ? 'bg-[#d78f99] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-rose-50'"
                class="px-4 py-2 rounded-xl text-[11px] font-bold border border-rose-100 whitespace-nowrap transition-all duration-200">
          ✨ All Items
        </button>

        <button v-for="cat in categories" :key="cat" 
                @click="activeCategory = cat"
                :class="activeCategory === cat ? 'bg-[#d78f99] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-rose-50'"
                class="px-4 py-2 rounded-xl text-[11px] font-bold border border-rose-100 whitespace-nowrap transition-all duration-200">
          {{ cat }}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-6">
          
          <div v-for="item in filteredProducts" :key="item.id" 
               @click="selectedProduct = item"
               class="bg-white p-3 rounded-2xl shadow-sm border border-rose-100 flex flex-col justify-between hover:shadow-md transition-all duration-200 group cursor-pointer">
            
            <div class="w-full h-32 bg-slate-50 rounded-xl overflow-hidden mb-3 relative border border-rose-50">
              <img :src="item.image" 
                   :alt="item.name" 
                   loading="lazy" 
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              
              <span class="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[9px] font-semibold px-2 py-0.5 rounded-md text-slate-600 shadow-xs">
                {{ item.category }}
              </span>
            </div>

            <div class="flex flex-col flex-1 justify-between">
              <div>
                <h4 class="text-[11px] font-bold text-slate-700 leading-snug line-clamp-2 min-h-[32px] mb-1">
                  {{ item.name }}
                </h4>
                <p class="text-[10px] text-slate-400">ID: {{ item.id }}</p>
              </div>
              
              <div class="pt-2 mt-2 border-t border-rose-50 flex items-center justify-between">
                <span class="text-xs font-black text-[#db2777]">Ks {{ item.price.toLocaleString() }}</span>
                <button @click.stop="addToCart(item)" 
                        class="bg-rose-50 hover:bg-[#d78f99] text-[#d78f99] hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border border-rose-100 flex items-center gap-1">
                        <button @click.stop="addToCart(item)">
                        <button @click.stop="cartStore.addToCart(item)"class="bg-rose-50 hover:bg-[#d78f99] text-[#d78f99] hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">
                  <i class="fas fa-plus text-[9px]"></i> Add
                </button>
                </button>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductDetail from './ProductDetail.vue';
import {useCartStore} from '@/store/cartStore';
const cartStore= useCartStore();


const categories = [
  'Skincare', 'Lipsticks', 'Foundation', 'Eye Makeup', 'Perfumes', 'Cleansers', 'Toners','Serums', 'Moisturizers', 'Sunscreens', 'Face Masks', 'Scrubs', 'Body Lotions', 
  'Hair Care', 'Nail Polish', 'Makeup Brushes', 'Sponges', 'Eyeliners', 'Mascara', 
  'Eyeshadows', 'Eyebrow Pencils', 'Concealers', 'Primers', 'Setting Sprays', 
  'Highlighters', 'Bronzers', 'Blushes', 'Lip Gloss', 'Lip Balm', 'Lip Liners', 
  'Hair Serums', 'Hair Masks', 'Body Wash', 'Deodorants', 'Bath Bombs'
];

const cosmeticImages = [
  'https://images.unsplash.com/photo-1608248597481-496100c8c836?w=400&h=400&fit=crop', // Skincare Bottle
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop', // Lipstick Luxury
  'https://images.unsplash.com/photo-1631730359577-38e4755d772b?w=400&h=400&fit=crop', // Foundation Cream
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop', // Palette Makeup
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', // Perfume Glass
  'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400&h=400&fit=crop', // Lotion Cleanser
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop', // Skincare Oils
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', // Serum Dropper
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop', // Clay Mask Tube
  'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?w=400&h=400&fit=crop', // Essential Cream
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', // Makeup Brushes
  'https://images.unsplash.com/photo-1619551734325-81aaf323686c?w=400&h=400&fit=crop', // Organic Shampoo
  'https://images.unsplash.com/photo-1631214503951-366ec34a50f6?w=400&h=400&fit=crop', // Hair Treatment Oil
  'https://images.unsplash.com/photo-1604654894610-df490651e56c?w=400&h=400&fit=crop', // Red Nail Polish
  'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop', // Eyeshadow Glow
  'https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?w=400&h=400&fit=crop', // Soap / Cleanser
  'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=400&h=400&fit=crop', // Lip gloss
  'https://images.unsplash.com/photo-1614859324967-bdf461fcf769?w=400&h=400&fit=crop', // Makeup Powder
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop', // Sunscreen Cream
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop', // Hair Conditioner
  'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop', // Eyeliner set
  'https://images.unsplash.com/photo-1591343395902-1adcb454c2e4?w=400&h=400&fit=crop', // Pink Lipsticks
  'https://images.unsplash.com/photo-1611085583191-a3b1a30a8a0a?w=400&h=400&fit=crop', // Glass Perfume Bottle
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop', // Facial Face Mask
  'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop', // Premium Body Wash
  'https://images.unsplash.com/photo-1605497746444-ac9dbd53a474?w=400&h=400&fit=crop', // Eyebrow pencils
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop', // Concealer Cream
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop', // Natural Moisturizer
  'https://images.unsplash.com/photo-1601612620952-41f99607fec6?w=400&h=400&fit=crop', // Body Scrub Jar
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop', // Skin Toner Liquid
  'https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?w=400&h=400&fit=crop', // Shaving/Cleanser Gel
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', // Luxury Bath Bomb
  'https://images.unsplash.com/photo-1628149455678-16f37bc392f4?w=400&h=400&fit=crop', // Spray Bottle Mists
  'https://images.unsplash.com/photo-1610309590059-43c3f91522be?w=400&h=400&fit=crop', // Solid Deodorant stick
  'https://images.unsplash.com/photo-1512207724313-a4e675ec79ab?w=400&h=400&fit=crop'  // Luxury Premium Makeup Blushes
];

const rawProducts = [];
categories.forEach((cat, catIndex) => {
  for (let i = 1; i <= 10; i++) {
    const imageIndex = catIndex % cosmeticImages.length;
    
    rawProducts.push({
      id: `${cat.substring(0,3).toUpperCase()}-${100 + i}`,
      name: `${cat} Premium Model-${i}`,
      category: cat,
      price: 15000 + (i * 1500),
      image: cosmeticImages[imageIndex] 
    });
  }
});


const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const allProducts = shuffleArray(rawProducts);

const activeCategory = ref('All Items');
const selectedProduct = ref(null);


const filteredProducts = computed(() => {
  if (activeCategory.value === 'All Items') {
    return allProducts; 
  }
  return rawProducts.filter(p => p.category === activeCategory.value); 
});

const addToCart = (item) => {
  cartStore.addToCart(item);
  alert(` ${item.name} to cart!`);
};

const handleAddToCartFromDetail = (product) => {
  addToCart(product);
  selectedProduct.value = null;
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #ecdcd9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d78f99; }
</style>