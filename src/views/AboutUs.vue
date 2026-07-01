<template>
  <v-container class="py-10">
    <!-- Title Section -->
    <v-row justify="center" class="text-center mb-10">
      <v-col cols="12" md="8">
        <h1
          class="primary-title mt-n3 mb-3 mm-stroke-bold"
          style="font-size: 2.5rem ; font-weight: 400 ; color: black"
        >
          About Glow Skin Cosmetics
        </h1>
        <p class="text-subtitle-1 text-muted">"Trusted High-Quality Cosmetics for Your Beauty"</p>
        <v-divider class="my-5 mx-auto" ></v-divider>
      </v-col>
    </v-row>

    
    <v-row align="stretch" class="mb-12 px-6 px-md-16">
      <v-col cols="12" md="7" class="pr-md-8 d-flex flex-column justify-center">
        <h2
          class="headline mb-4 mm-stroke-bold"
          style="color: black; font-size: 1.5rem ; font-weight: 700 "
        >
          ကျွန်ုပ်တို့၏ ရည်ရွယ်ချက်
        </h2>
        <br />
        <p class="body-1 text-justify lineHeight-lg">
          <strong>Glow Skin Cosmetics</strong> သည် မန္တလေးမြို့အခြေစိုက်ပြီး လူကြီးမင်းတို့၏
          သဘာဝအလှတရားများကို ပိုမိုတောက်ပလာစေရန်အတွက် အရည်အသွေးမြင့် ကမ္ဘာကျော်
          အလှကုန်ပစ္စည်းများကို (၁၀၀%) စစ်မှန်မှု အပြည့်အဝဖြင့် တရားဝင် ဖြန့်ချိရောင်းချပေးနေသော
          ဆိုင်ဖြစ်ပါသည်။
        </p>
        <p class="body-1 text-justify lineHeight-lg mt-3">
          ကျွန်ုပ်တို့ဆိုင်တွင် Dior, Chanel, YSL, Medicube, Anua, CeraVe အစရှိသည့် နာမည်ကြီး Brand
          ပေါင်းများစွာကို တစ်နေရာတည်းတွင် စုံစုံလင်လင် ဝယ်ယူရရှိနိုင်သည့်အပြင်၊ အဆင်ပြေချောမွေ့သော
          POS စနစ်ဖြင့် လူကြီးမင်းတို့၏ အော်ဒါများကို အမြန်ဆုံး ဝန်ဆောင်မှုပေးနေပါသည်။
        </p>
      </v-col>

      
      <v-col cols="12" md="5" class="d-flex justify-end align-center">
        <v-img
          :src="aboutPhoto"
          width="100%"
          max-width="450"
          class="elevation-3 rounded-lg"
          cover
        ></v-img>
      </v-col>
    </v-row>

    
    <div class="bg-light-pink pa-6 pa-md-10 rounded-lg">
      
      <!-- Why Choose Us Section -->
      <v-row class="text-center mb-12">
        <v-col cols="12">
          <h2
            class="headline font-weight-bold mb-6"
            style="color: black; font-size: 1.5rem ; font-weight: 600 "
          >
            ဘာကြောင့် Glow Skin က Cosmetics တွေကို ရွေးချယ်သင့်သလဲ?
          </h2>
        </v-col>

        <v-col cols="12" sm="4">
          <v-avatar color="#FFC0CB" size="64" class="mb-4">
            <v-icon size="32" color="white">mdi-shield-check</v-icon>
          </v-avatar>
          <h3 class="title font-weight-bold mb-2">100% Authentic</h3>
          <p class="body-2 text-muted px-4">
            စစ်မှန်သော Quality ကောင်းမွန်သည့် ပစ္စည်းများကိုသာ တိုက်ရိုက်တင်သွင်းရောင်းချပါသည်။
          </p>
        </v-col>

        <v-col cols="12" sm="4">
          <v-avatar color="#FFC0CB" size="64" class="mb-4">
            <v-icon size="32" color="white">mdi-heart</v-icon>
          </v-avatar>
          <h3 class="title font-weight-bold mb-2">Customer First</h3>
          <p class="body-2 text-muted px-4">
            ဝယ်ယူသူတိုင်း စိတ်တိုင်းကျစေမည့် နွေးထွေးပျူငှာသော ဝန်ဆောင်မှုဖြင့် ကြိုဆိုနေပါသည်။
          </p>
        </v-col>

        <v-col cols="12" sm="4">
          <v-avatar  color="#FFC0CB" size="64" class="mb-4">
            <v-icon size="32" color="white">mdi-map-marker</v-icon>
          </v-avatar>
          <h3 class="title font-weight-bold mb-2">Mandalay Delivery</h3>
          <p class="body-2 text-muted px-4">
            မန္တလေးမြို့တွင်းသာမက မြန်မာတစ်နိုင်ငံလုံးသို့ အိမ်အရောက် Delivery စနစ်ဖြင့်
            ပို့ဆောင်ပေးပါသည်။
          </p>
        </v-col>
      </v-row>

      <!-- FAQ Section -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" md="10">
          <h2
            class="headline font-weight-bold text-center mb-6"
            style="color: black; font-size: 1.5rem ; font-weight: 600 "
          >
            အမေးများသော မေးခွန်းများ (FAQ)
          </h2>

          <v-expansion-panels variant="accordion">
            <v-expansion-panel
              class="pl-3"
              title="Glow Skin Cosmetics က ပစ္စည်းတွေက တကယ်ပဲ Original စစ်စစ်တွေလား?"
              text="ဟုတ်ပါတယ်။ ကျွန်ုပ်တို့ဆိုင်မှာ ရောင်းချတဲ့ အလှကုန်ပစ္စည်းအားလုံးကို သက်ဆိုင်ရာနိုင်ငံတွေကနေ (၁၀၀%) စစ်မှန်ကြောင်း အာမခံချက်အပြည့်နဲ့ တိုက်ရိုက်တင်သွင်းထားတာဖြစ်လို့ စိတ်ချယုံကြည်စွာ ဝယ်ယူအားပေးနိုင်ပါတယ်ခင်ဗျာ။"
            ></v-expansion-panel>

            <v-expansion-panel
              class="pl-3"
              title="နယ်မြို့တွေကို ရန်ကုန်/မန္တလေးကနေ ဘယ်လိုပို့ဆောင်ပေးပါသလဲ?"
              text="မန္တလေးမြို့တွင်းကို အိမ်အရောက် Delivery စနစ်နဲ့ ပို့ဆောင်ပေးသလို၊ အခြားနယ်မြို့များကိုလည်း သက်ဆိုင်ရာ အမြန်ချောပို့ (ကားဂိတ်များ) မှတစ်ဆင့် စနစ်တကျ ထုပ်ပိုးပြီး ပို့ဆောင်ပေးနေပါတယ်ဗျာ။"
            ></v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <!-- Location & Map Section -->
      <v-row align="center" class="mb-12">
        <v-col cols="12" md="6" class="px-6 d-flex flex-column justify-center">
          <h3
            class="title font-weight-bold mb-3"
            style="color: black; font-size: 1.5rem !important; font-weight: 600 !important"
          >
            📍 Shop Location & Opening Time
          </h3>
          <p class="body-1 mb-2">
            <strong>Address:</strong> Theik Pan Road, Chan Mya Thazi Township, Mandalay
          </p>
          <p class="body-1 mb-2"><strong>Opening Time:</strong> Daily (9:00 AM - 9:00 PM)</p>
          <p class="body-1"><strong>Phone:</strong> 09-123456789</p>
        </v-col>

        <v-col cols="12" md="6" class="d-flex align-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d947361.3439733528!2d96.3695953!3d21.9487616!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6d23addc9fb1%3A0x2802b4778282b0ad!2sInfo%20Lite!5e0!3m2!1sen!2smm!4v1782627498306!5m2!1sen!2smm" width="100%" height="350" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </v-col>
      </v-row>

      <!-- Reviews Section -->
      <v-row class="px-6 text-center">
        <v-col cols="12">
          <h2
            class="headline font-weight-bold mb-5"
            style="color: black; font-size: 1.5rem ; font-weight: 600 "
          >
            Customer Reviews
          </h2>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="pa-5 elevation-1 rounded-xl" color="white">
            <v-rating
              model-value="5"
              readonly
              active-color="#FFD700"
              color="grey-lighten-1"
              density="compact"
              class="mb-2"
            ></v-rating>
            <p class="body-2">
              "တခြားဆိုင်တွေမှာ ရှာမရတဲ့ Viral ဖြစ်နေတဲ့ Skincare တွေပါ ဒီဆိုင်မှာ အမြဲ အလွယ်တကူ
              ဝယ်လို့ရတာ တော်တော်အဆင်ပြေတယ်။ လက်ဆောင် Sample လေးတွေပါ ထည့်ပေးလို့ သဘောကျတယ်ရှင်။"
            </p>
            <h4 class="mt-3 font-weight-bold">- မအိသက် (ပြင်ဦးလွင်)</h4>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="pa-5 elevation-1 rounded-xl" color="white">
            <v-rating
              model-value="4"
              readonly
              active-color="#FFD700"
              color="grey-lighten-1"
              density="compact"
              class="mb-2"
            ></v-rating>
            <p class="body-2">
              "ပစ္စည်းတွေလည်း စုံသလို Chatbox က မေးတာတွေကိုလည်း စိတ်ရှည်လက်ရှည်နဲ့ အသားအရေအလိုက်
              သေချာအကြံပေးတာ သဘောကျတယ်။ ပုံးအပြင်အဆင်လည်း အရမ်းသပ်ရပ်တယ်ရှင်။"
            </p>
            <h4 class="mt-3 font-weight-bold">- မြတ်နိုး (တောင်ကြီး)</h4>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="pa-5 elevation-1 rounded-xl" color="white">
            <v-rating
              model-value="4"
              readonly
              active-color="#FFD700"
              color="grey-lighten-1"
              density="compact"
              class="mb-2"
            ></v-rating>
            <p class="body-2">
              "SK-II နဲ့ Anua သုံးနေကျမို့ ပစ္စည်းအတု/အစစ် ချက်ချင်းသိသာတယ်။ ဒီဆိုင်ကတော့ Skincare
              တိုင်းက တကယ့် Batch Code စစ်စစ်တွေမို့ စိတ်ချရတယ်။ အမြဲဝယ်ဖြစ်ပါတယ်!"
            </p>
            <h4 class="mt-3 font-weight-bold">- မစန္ဒာ (ရန်ကုန်)</h4>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

import aboutphoto from '../assets/images/about.avif'

export default {
  name: 'AboutUs',
  data() {
    return {
      aboutPhoto: aboutphoto
    };
  }
};
</script>

<style scoped>
.primary-title {
  color: #4a154b;
}
.text-muted {
  color: #6c757d;
}
.lineHeight-lg {
  line-height: 1.8;
}
.bg-light-pink {
  background-color: #fff0f2;
}
</style>