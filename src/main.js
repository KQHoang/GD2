import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import MsButton from './components/base/Button.vue'
import MSDropDown from './components/base/DropDown.vue'
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';


const app = createApp(App);
app.component("MsButton", MsButton)
app.component("MSDropDown", MSDropDown)
app.component("DxSelectBox", DxSelectBox)
app.component("DxCheckBox", DxCheckBox)
app.mount('#app')