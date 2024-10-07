import { createApp, type Plugin } from 'vue'

import App from './App.vue'
import './assets/main.css'

import router from './router'

const app = createApp(App)

Object.values(
  import.meta.glob<Plugin>('./plugins/*.ts', {
    eager: true,
    import: 'default'
  })
).forEach((v) => app.use(v))

app.use(router)

app.mount('#app')
