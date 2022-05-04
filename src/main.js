import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
