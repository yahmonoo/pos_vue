<template>
  <div class="h-screen flex flex-col bg-[#f3eae8] font-sans text-slate-800 overflow-y-auto p-4 sm:p-6">
    
    <div class="mb-6 shrink-0 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-rose-100">
      <button @click="$emit('back')" 
              class="bg-rose-50 hover:bg-[#d78f99] text-[#d78f99] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-rose-100 flex items-center gap-2">
        <i class="fas fa-arrow-left"></i> Back to Counter
      </button>
      <div>
        <h1 class="text-base font-bold text-slate-800">Product Details</h1>
        <p class="text-[10px] text-slate-400">Viewing detailed specifications</p>
      </div>
    </div>

    <div class="bg-white rounded-3xl p-6 shadow-sm border border-rose-100 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div class="w-full h-72 sm:h-96 bg-slate-50 rounded-2xl overflow-hidden border border-rose-50 relative group shadow-xs">
        <img :src="product.image" 
             :alt="product.name" 
             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102">
        <span class="absolute top-4 left-4 bg-[#d78f99] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
          {{ product.category }}
        </span>
      </div>

      <div class="flex flex-col justify-between">
        <div>
          <div class="border-b border-rose-50 pb-4 mb-4">
            <span class="text-[10px] uppercase tracking-wider text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded">
              {{ currentDetails.badge }}
            </span>
            <h2 class="text-xl sm:text-2xl font-black text-slate-800 mt-2 mb-1 leading-tight">{{ product.name }}</h2>
            <p class="text-xs text-slate-400 font-mono">Product Serial: {{ product.id }}</p>
          </div>

          <div class="mb-6 bg-rose-50/50 p-4 rounded-xl border border-rose-100/50">
            <p class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Retail Price</p>
            <p class="text-2xl font-black text-[#db2777] mt-1">Ks {{ product.price.toLocaleString() }}</p>
          </div>

          <div class="mb-6">
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Product Highlights</h4>
            <ul class="text-xs text-slate-600 space-y-2">
              <li v-for="(highlight, index) in currentDetails.highlights" :key="index" class="flex items-start gap-2">
                <i class="fas fa-check-circle text-[#d78f99] mt-0.5"></i>
                <span>{{ highlight }}</span>
              </li>
            </ul>
          </div>

          <div class="flex gap-4 items-center text-xs mb-6">
            <div class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span> In Stock
            </div>
            <span class="text-slate-400">Available Qty: <strong class="text-slate-700 font-bold">24 Items</strong></span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-2 pt-4 border-t border-rose-50">
          <button @click="$emit('add-to-cart', product)"
                  class="w-full bg-[#d78f99] hover:bg-[#c27c86] text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2">
            <i class="fas fa-shopping-bag"></i> Add Item to Cart Order
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['back', 'add-to-cart']);

const categoryDetailsMap = {
  'Skincare': {
    badge: 'Deep Hydration',
    highlights: [
      'Formulated with Hyaluronic acid and organic nourishing ingredients.','Dermatologically tested and 100% suitable for all sensitive skin types.',
      'Restores skin moisture barrier and protects from environmental damage.'
    ]
  },
  'Lipsticks': {
    badge: 'Matte & Long-Wear',
    highlights: [
      'High-pigment formula that stays perfectly vibrant for up to 12 hours.',
      'Enriched with Vitamin E and Jojoba oil to prevent lip drying.',
      'Smudge-proof, waterproof, and smooth velvet texture finish.'
    ]
  },
  'Foundation': {
    badge: 'Flawless Coverage',
    highlights: [
      'Full coverage with a lightweight, breathable second-skin feel.',
      'Oil-control formula that maintains a fresh satin finish all day.',
      'SPF 30 protection against harmful UV rays and photo-aging.'
    ]
  },
  'Eye Makeup': {
    badge: 'High Definition Eyes',
    highlights: [
      'Intense color payoff with minimal fallout or creasing.',
      'Ophthalmologist-tested and safe for contact lens wearers.',
      'Blends effortlessly for both everyday look and party glam.'
    ]
  },
  'Perfumes': {
    badge: 'Long-Lasting Luxury Scent',
    highlights: [
      'Exquisite premium oil blend that lasts elegantly throughout the day.',
      'Top notes of fresh blossom with a luxurious warm woody base.',
      'Perfect signature fragrance for everyday elegance and luxury events.'
    ]
  },
  'Hair Care': {
    badge: 'Nourish & Repair',
    highlights: [
      'Deeply repairs damaged hair cuticles and prevents split ends.',
      'Sulfate-free formula that retains natural hair oils and shine.',
      'Boosts hair volume and leaves a refreshing professional salon scent.'
    ]
  },
  'Nail Polish': {
    badge: 'Gel Shine Finish',
    highlights: [
      'Quick-drying formula with an ultra-glossy professional gel finish.',
      'Long-lasting chip-resistant technology that protects for weeks.',
      'Non-toxic ingredients that keep natural nails strong and healthy.'
    ]
  }
};

const defaultDetails = {
  badge: 'Premium Cosmetics',
  highlights: [
    'Made with high-quality, professional-grade aesthetic ingredients.',
    'Dermatologically safe, cruelty-free, and eco-friendly packaging.',
    'Guaranteed long-lasting results designed for all premium beauty needs.'
  ]
};

const currentDetails = computed(() => {
  return categoryDetailsMap[props.product.category] || defaultDetails;
});
</script>