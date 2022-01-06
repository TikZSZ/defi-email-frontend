import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "./assets/base.css"
import NProgress from './misc/NProgress'
import "nprogress/nprogress.css"
import { server } from './misc/request/server'
import api from './misc/request/api'
import pkg from "@/misc/cryptography/encryption"
import "@tikz/hedera-mirror-node-ts/dist/RestMirrorNode/baseClasses"
import "@tikz/hedera-mirror-node-ts/dist/RestMirrorNode/helpers"


const app = createApp(App)

const main = async ()=>{
  await pkg.ready
  app.use(router)
  app.use(createPinia())
  NProgress(router)
  server.connect(api)
  app.mount('#app')
}
main()





