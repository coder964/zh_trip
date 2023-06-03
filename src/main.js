import { createApp } from 'vue'
import App from './App.vue'

// 引入vue-router
import router from "./router"
// 引入pinia
import pinia from "./stores"

// 引入normalize.css
import "normalize.css"

// 自己的css
import "./assets/css/index.css"

const app = createApp(App)

// 注册使用router
app.use(router)
// 注册使用pinia
app.use(pinia)

app.mount('#app')
