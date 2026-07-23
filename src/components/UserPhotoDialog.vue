<template>
      <v-row no-gutters>
    <v-col cols="12" md="12">
      <v-toolbar dark color="pink-lighten-2 pl-2 pr-2" density="compact">
        <v-toolbar-title>{{ selectedOne.profileName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="$emit('closeDialog')">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
        <v-col cols="12" md="12" class="mt-5">
      <v-slide-y-transition mode="out-in">
        <v-row class="ml-2" key="product-photo-content">
          <v-col cols="12" md="12">
            <input type="file" id="file" ref="file" @change="changeImage" class="file-input-anim" />
          </v-col>
          <v-col cols="12" md="12">
            <!-- <v-btn color="red" outlined @click="clickCancel()">Cancel</v-btn> -->
            <v-btn color="primary" outlined class="ml-2" @click="savePicture()">Save</v-btn>
          </v-col>
          <v-col cols="12" md="12">
            <v-fade-transition mode="out-in">
              <v-img
                v-if="file"
                :src="file"
                alt="Product Photo"
                width="400"
                cover
                :lazy="true"
                class="mx-auto"
                key="product-photo-img"
              />
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-slide-y-transition>
    </v-col>
    </v-row>
</template>
<script>
import UserAccountService from '../service/UserAccountService.js'
import axios from "@/config";
export default {
  data: () => ({
    file:'',
  }),
   props: {selectedOne:Object,refreshIndex:Number},
  mounted: function() {
    console.log(this.selectedOne);
    this.getImageUrl();
  },
  methods: {
    getImageUrl() {
        console.log(" hello "+this.selectedOne.photo);
      const baseURL = axios?.defaults?.baseURL || "";
      this.file =  this.selectedOne.photo ? `${baseURL}/userphoto/${this.selectedOne.photo}` : "";
       //return new URL(`../assets/images/${photo}`, import.meta.url).href;
    },
    savePicture: function () {
  var formData = new FormData();
  formData.append("file", this.$refs.file.files[0]);
  UserAccountService.updateUserPhoto(formData, this.selectedOne.userAccountId)
    .then((response) => {
     
      let loginUser = JSON.parse(localStorage.getItem("loginUser"));
      if (loginUser && loginUser.userAccountId === this.selectedOne.userAccountId) {
        
        loginUser.photo = this.selectedOne.photo; 
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        
       
        window.dispatchEvent(new Event("login-state-changed"));
      }

      this.$emit("closeDialog");
      this.$swal({
        title: "Successful",
        text: "Success!",
        type: "success",
        timer: 500,
      });
    })
    .catch((error) => {
      const errMsg = error.response?.data?.message || error.message || "တစ်ခုခုမှားယွင်းနေပါသည်။";
      this.$swal("မအောင်မြင်ပါ", errMsg, "error");
    });
},
        changeImage: function (e) {
      let image = e.target.files[0];
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
  // refreshIndex(){
  //   this.getImageUrl();
  // }
},
  components: {}
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