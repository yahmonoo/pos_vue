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
        :items="filteredTownships"
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
export default {
  props: ['formData'],
  data() {
    return {
      regions: [
        'Mandalay', 'Yangon', 'Ayeyarwady', 'Bago', 'Magway', 'Sagaing', 'Tanintharyi', 'Naypyidaw',
        'Kachin', 'Kayah', 'Kayin', 'Chin', 'Mon', 'Rakhine', 'Shan (South)', 'Shan (North)'
      ],
      townshipData: {
        'Shan (South)': ['Taunggyi', 'Kalaw', 'Aungban', 'Nyaungshwe', 'Phekon'],
        'Mandalay': ['Chanayethazan', 'Mahaaungmye', 'Pyigyidagun', 'Chanmyathazi', 'Aungmyethazan', 'Patheingyi', 'Pyinoolwin'],
        'Yangon': ['Kamayut', 'Latha', 'Sanchaung', 'Mayangone', 'Hledan', 'Tamwe', 'Bahan'],
        'Naypyidaw': ['Zabuthiri', 'Pobbathiri', 'Ottarathiri', 'Dekkhinathiri'],
        'Shan (North)': ['Lashio', 'Muse', 'Kyaukme'],
        'Kachin': ['Myitkyina', 'Bhamo', 'Waingmaw'],
        'Sagaing': ['Monywa', 'Sagaing Town', 'Shwebo'],
        'Magway': ['Magway Town', 'Pakokku', 'Chauk'],
        'Bago': ['Bago Town', 'Taungoo', 'Pyay'],
        'Ayeyarwady': ['Pathein', 'Hinthada', 'Maubin'],
        'Mon': ['Mawlamyine', 'Thaton', 'Mudon'],
        'Kayin': ['Hpa-an', 'Myawaddy'],
        'Rakhine': ['Sittwe', 'Thandwe', 'Kyaukpyu'],
        'Kayah': ['Loikaw'],
        'Chin': ['Hakha', 'Falam'],
        'Tanintharyi': ['Dawei', 'Myeik']
      }
    };
  },
  watch: {
    'formData.city': {
      handler(newCity, oldCity) {
        if (newCity !== oldCity && oldCity !== undefined) {
          this.formData.township = null;
        }
      },
      immediate: true
    }
  },
  computed: {
    filteredTownships() {
      if (!this.formData || !this.formData.city) return [];
      return this.townshipData[this.formData.city] || [];
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

.custom-input >>> .v-input__control > .v-input__slot {
  background-color: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  min-height: 38px !important; 
}

.custom-input >>> .v-input__slot:focus-within {
  border-color: #e91e63 !important;
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.12) !important;
}

.custom-input >>> fieldset {
  border: none !important;
}

.custom-input >>> input, .custom-input >>> .v-select__selection {
  font-size: 13.5px !important;
  color: #334155 !important;
  padding: 5px 0 !important;
}

.custom-input.v-input--is-disabled >>> .v-input__slot {
  background-color: #f8fafc !important;
  border-color: #e2e8f0 !important;
}
</style>