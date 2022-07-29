import { createApp } from 'vue'
import App from './App.vue'
import MsButton from './components/base/Button.vue'

const app = createApp(App);
app.component("MsButton", MsButton)
app.mount('#app')