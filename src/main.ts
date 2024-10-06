import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
