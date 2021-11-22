import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Varlet from '@varlet/ui'
import 'element-plus/dist/index.css'
import '@varlet/ui/es/style.js'

createApp(App).use(ElementPlus, Varlet).mount('#app')