<template>
  
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Header Toolbar -->
      <v-col cols="12">
        <v-toolbar dark color="pink-lighten-2 pl-2 pr-2" class="px-2" density="compact">
          <v-toolbar-title>{{ selectedOne?.title || 'Product Photo' }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="$emit('closeDialog')">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>

      <!-- Content Area -->
      <v-col cols="12" class="mt-5">
        <v-slide-y-transition mode="out-in">
          <v-row class="mx-2" >
            
            <v-col cols="12" md="12">
              <v-card variant="outlined" class="pa-5" color="surface-variant">
              <input 
                type="file" 
                id="file" 
                ref="file" 
                multiple 
                accept="image/*"
                @change="changeImage" 
                class="file-input-anim" 
              /></v-card>
            </v-col>
           <v-col cols="12">
              <v-btn color="primary" outlined class="ml-2" @click="savePicture">
                Save
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col v-for="(img, idx) in previewImages" :key="idx" cols="3">
                  <v-card variant="outlined">
                    <v-img :src="img" height="150" cover />
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container></template>

<script>
import ProductService from '../service/ProductService.js'
import axios from "@/config";

export default {
  name: "ProductPhotoDialog",
  props: {
    selectedOne: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedFiles: [],
    previewImages: [],
  }),
  mounted() {
    this.getImageUrl();
  },
  methods: {
    getImageUrl() {
      if (!this.selectedOne) return;
      const baseURL = axios?.defaults?.baseURL || "";
      this.previewImages = [];
      
      ['photoOne', 'photoTwo', 'photoThree', 'photoFour'].forEach(key => {
        if (this.selectedOne[key]) {
          this.previewImages.push(`${baseURL}/productphoto/${this.selectedOne[key]}`);
        }
      });
    },

    changeImage(e) {
      const files = Array.from(e.target.files);

      if (files.length > 4) {
        alert("ဓာတ်ပုံ ၄ ပုံထက် ပိုမရွေးပါနှင့်။");
        e.target.value = '';
        this.selectedFiles = [];
        this.getImageUrl();
        return;
      }

      this.selectedFiles = files;
      const tempPreviews = new Array(files.length);
      let loadedCount = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          tempPreviews[index] = evt.target.result;
          loadedCount++;

          
          if (loadedCount === files.length) {
            this.previewImages = [...tempPreviews];
          }
        };
        reader.readAsDataURL(file);
      });
    },

    savePicture() {
  if (this.selectedFiles.length === 0) {
    alert("ကျေးဇူးပြု၍ ဓာတ်ပုံရွေးချယ်ပေးပါဦး။");
    return;
  }

  const formData = new FormData();
  
  this.selectedFiles.forEach((file) => {
    formData.append("files", file); 
  });

  ProductService.updateProductPhoto(formData, this.selectedOne.productId)
    .then((response) => {
      // 👇 Parent Component (ProductList.vue) ဆီကို Data ပြန် refresh လုပ်ခိုင်းရန် လှမ်းပို့ပါ
      this.$emit("refreshData");
      this.$emit("closeDialog");
    })
    .catch((error) => {
      console.error(error);
      alert(error.response?.data?.message || "မအောင်မြင်ပါ");
    });
}
  },
  watch: {
    selectedOne: {
      handler(newVal) {
        if (newVal) {
          this.getImageUrl();
        }
      },
      deep: true,
      immediate: true 
    }
  }
};
</script>

<style scoped>
.file-input-anim {
  transition: box-shadow 0.2s;
}
.file-input-anim:focus {
  box-shadow: 0 0 0 2px #1976d2;
}
</style>