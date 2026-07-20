<template>
  <div class="address-fields-container">
    <v-row dense>
      
      <!-- PHONE NUMBER -->
      <v-col cols="12" class="mb-2">
        <label class="input-label font-weight-bold">PHONE NUMBER</label>
        <v-text-field
          v-model="formData.phone"
          readonly
          append-icon="mdi-phone-outline"
          solo
          flat
          hide-details
          class="custom-input readonly-style"
        ></v-text-field>
      </v-col>

      <!-- DETAILED ADDRESS -->
      <v-col cols="12" class="mb-2">
        <label class="input-label font-weight-bold">DETAILED ADDRESS</label>
        <v-textarea
          v-model="formData.address"
          readonly
          append-icon="mdi-home-outline"
          solo
          flat
          hide-details
          rows="2"
          class="custom-input readonly-style"
        ></v-textarea>
      </v-col>

      <!-- REGION / STATE -->
      <v-col cols="12" class="mb-2">
        <label class="input-label font-weight-bold">REGION / STATE</label>
        <v-text-field
          v-model="formData.regionName"
          readonly
          append-icon="mdi-map-marker-outline"
          solo
          flat
          hide-details
          class="custom-input readonly-style"
        ></v-text-field>
      </v-col>

      <!-- TOWNSHIP -->
      <v-col cols="12" class="mb-3">
        <label class="input-label font-weight-bold">TOWNSHIP</label>
        <v-text-field
          v-model="formData.townshipName"
          readonly
          append-icon="mdi-navigation-outline"
          solo
          flat
          hide-details
          class="custom-input readonly-style"
        ></v-text-field>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import userAccountService from "../service/UserAccountService"; 

export default {
  props: {
    formData: {
      type: Object,
      required: true
    }
  },

  mounted() {
    this.fetchUserProfile();
  },

  methods: {
    fetchUserProfile() {
      const loginUserJson = localStorage.getItem("loginUser"); 
      let loggedInUserId = null;

      if (loginUserJson) {
        try {
          const userObj = JSON.parse(loginUserJson);
          loggedInUserId = userObj.userAccountId; 
        } catch (e) {
          console.error("Error parsing loginUser from localStorage:", e);
        }
      }

      if (!loggedInUserId) {
        console.warn("User က login ဝင်ထားခြင်း မရှိသေးပါ သို့မဟုတ် ID မရှိပါ!");
        this.$router.push('/login'); 
        return;
      }
      
      console.log("လက်ရှိ Dynamic စနစ်ဖြင့် ခေါ်ယူနေသော User ID:", loggedInUserId);

      userAccountService.getUserAccountById(loggedInUserId)
        .then(userDto => {
          console.log("userdata", userDto);
          
          if (userDto) {
            this.formData.phone = userDto.phone || 'ဖြည့်စွက်ထားခြင်းမရှိပါ';
            this.formData.address = userDto.address || 'ဖြည့်စွက်ထားခြင်းမရှိပါ';
            this.formData.townshipName = userDto.townshipName || 'ဖြည့်စွက်ထားခြင်းမရှိပါ';
            this.formData.regionName = (userDto.cityDto && userDto.cityDto.cityName) 
              ? userDto.cityDto.cityName 
              : 'ဖြည့်စွက်ထားခြင်းမရှိပါ';
          }
        })
        .catch(error => {
          console.error("Error fetching user profile via service:", error);
        });
    }
  }
};
</script>

<style scoped>
.input-label {
  display: block;
  font-size: 11px;
  color: #70695d;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.readonly-style :deep(.v-input__control) {
  opacity: 0.9 !important;
}

.custom-input :deep(.v-input__control) {
  background-color: #e6e2d8 !important;
  border-radius: 8px !important;
}

.custom-input :deep(input), 
.custom-input :deep(textarea) {
  color: #4a443a !important;
  font-size: 13px !important;
  padding-left: 8px !important;
    padding-top: 8px !important;
    line-height: 1.5 imo !important;


}

.custom-input :deep(.v-icon) {
  color: #615a4f !important;
}
</style>