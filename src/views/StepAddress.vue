<template>
  <div class="address-wrapper">
    <v-form class="px-2">
      <div class="input-label-hint">Phone Number</div>
      <v-text-field
        v-model="formData.phone"
        type="tel"
        outlined
        dense
        placeholder="09xxxxxxxx အစရှိသဖြင့် ဖြည့်သွင်းပါ"
        class="custom-input mb-3"
        hide-details
        append-icon="mdi-phone-outline"
      ></v-text-field>

      <div class="input-label-hint">Detailed Address</div>
      <v-text-field
        v-model="formData.address"
        outlined
        dense
        placeholder="အိမ်အမှတ်၊ လမ်း၊ ရပ်ကွက် အပြည့်အစုံ..."
        class="custom-input mb-3"
        hide-details
        append-icon="mdi-home-map-marker"
      ></v-text-field>

      <div class="input-label-hint">Region / State</div>
      <v-select
        v-model="formData.city"
        :items="regions"
        item-text="cityName"
        item-value="cityName"
        placeholder="တိုင်းဒေသကြီး / ပြည်နယ် ရွေးချယ်ပါ"
        outlined
        dense
        class="custom-input mb-3"
        hide-details
        append-icon="mdi-map-marker-outline"
      ></v-select>

      <div class="input-label-hint">Township</div>
      <v-select
        v-model="formData.township"
        :items="townships"
        item-text="townshipName"
        item-value="townshipName"
        :disabled="!formData.city"
        :placeholder="formData.city ? 'မြို့နယ် ရွေးချယ်ပါ' : 'တိုင်းဒေသကြီးကို အရင်ရွေးချယ်ပေးပါ'"
        outlined
        dense
        class="custom-input mb-1"
        hide-details
        append-icon="mdi-navigation-variant-outline"
      ></v-select>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['formData'],
  data() {
    return {
      regions: [],       
      townships: []      
    };
  },
  watch: {
    'formData.city': {
      async handler(newCity, oldCity) {
        // ၁။ တန်ဖိုး တကယ်ပြောင်းမှသာ township ကို reset လုပ်မယ် (undefined ဖြစ်နေရင် ကျော်မယ်)
        if (oldCity !== undefined && newCity !== oldCity) {
          this.formData.township = null;
        }

        // ၂။ newCity ထဲမှာ တန်ဖိုးအမှန်တကယ် ရှိမှသာ backend ကို ခေါ်မယ်
        if (newCity) {
          await this.fetchTownships(newCity);
        } else {
          this.townships = [];
        }
      },
      immediate: true // initial check အတွက် ထားပေးရပါမယ်
    }
  },
  mounted() {
    this.fetchRegions();
  },
 methods: {
  async fetchRegions() {
    try {
      // 💡 မိမိ Backend port အမှန်ကို ပြောင်းရန် (ဥပမာ- 3000 သို့မဟုတ် 5000)
      const response = await axios.get('http://localhost:8088/api/useraccount');
      
      // backend က တိုက်ရိုက် array ပြန်ပေးရင် response.data ဖြစ်ပြီး၊ { data: [...] } နဲ့လာရင် response.data.data ပါ
      const resData = response.data.data || response.data;
      
      this.regions = resData; 
      console.log("Regions data ဝင်လာပါပြီ-", this.regions);
    } catch (error) {
      console.error("Regions ဆွဲရယူရာတွင် အမှားအယွင်းရှိနေပါသည်-", error);
    }
  },

  async fetchTownships(regionName) {
    try {
      // 💡 မိမိ Backend port အမှန်ကို ပြောင်းရန်
      const response = await axios.get(`http://localhost:8088/api/townships?region=${regionName}`);
      
      const resData = response.data.data || response.data;
      
      this.townships = resData;
      console.log("Townships data ဝင်လာပါပြီ-", this.townships);
    } catch (error) {
      console.error("Townships ဆွဲရယူရာတွင် အမှားအယွင်းရှိနေပါသည်-", error);
    }
  }

  }
}

</script>

<style scoped>
.address-wrapper {
  width: 100% !important;
  max-width: 420px !important; 
  margin: 0 auto !important;
}

.input-label-hint {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
  padding-left: 2px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.custom-input :deep(.v-input__control >.v-input__slot) {
  background-color: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  min-height: 38px !important; 
}

.custom-input :deep( .v-input__slot:focus-within) {
  border-color: #e91e63 !important;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.12) !important;
}

.custom-input :deep(fieldset) {
  border: none !important;
}

.custom-input :deep(input), .custom-input :deep(.v-select__selection) {
  font-size: 13.5px !important;
  color: #334155 !important;
  padding: 5px 0 !important;
}

.custom-input.v-input--is-disabled :deep(.v-input__slot) {
  background-color: #f8fafc !important;
  border-color: #e2e8f0 !important;
}
</style>