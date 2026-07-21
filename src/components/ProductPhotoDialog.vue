<template>
  <!-- တစ်ခုတည်းသော Root Element ဖြစ်အောင် v-container သို့မဟုတ် v-row နဲ့ အုပ်ပေးရပါမယ် -->
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Header Toolbar -->
      <v-col cols="12">
        <v-toolbar dark color="primary" class="px-2" density="compact">
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
              <v-fade-transition mode="out-in">
                <v-img
                  v-if="file"
                  :src="file"
                  alt="Product Photo"
                  width="400"
                  cover
                  class="mx-auto"
                  key="product-photo-img"
                />
              </v-fade-transition>
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
    file: '',
  }),
  mounted() {
    this.getImageUrl();
  },
  methods: {
    getImageUrl() {
      if (!this.selectedOne) return;
      const baseURL = axios?.defaults?.baseURL || "";
      this.file = this.selectedOne.photoOne ? `${baseURL}/productphoto/${this.selectedOne.photoOne}` : "";
    },
    savePicture() {
      // file ရွေးထားခြင်း ရှိမရှိ အရင်စစ်ဆေးမယ်
      if (!this.$refs.file || !this.$refs.file.files[0]) {
        alert("ကျေးဇူးပြု၍ ဓာတ်ပုံရွေးချယ်ပေးပါဦး။");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
  
      ProductService.updateProductPhoto(formData, this.selectedOne.productId)
        .then((response) => {
          this.$emit("closeDialog");
          // SweetAlert စနစ်သုံးထားရင် ပြန်ဖွင့်ပေးနိုင်ပါတယ်
          /* this.$swal({
            title: "Successful",
            text: "Success!",
            type: "success",
            timer: 500,
          }); */
        })
        .catch((error) => {
          console.error(error);
          alert(error.response?.data?.message || "မအောင်မြင်ပါ");
        });
    },
    changeImage(e) {
      let image = e.target.files[0];
      if (!image) return;
      
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.file = e.target.result;
      };
    },
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