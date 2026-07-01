import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import axios from "axios";
import VueAxios from "vue-axios";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: { mdi },
  },
})

const app = createApp(App)

app.use(axios);
app.use(VueAxios);
app.use(router)

app.use(vuetify)

//app.use(store)

app.mount('#app')
