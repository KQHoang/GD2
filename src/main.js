import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import MsButton from './components/base/Button.vue'
import MSDropDown from './components/base/DropDown.vue'
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';
import ProfileImage from './components/base/ProfileImage.vue'
import {
    DxDataGrid,
    DxColumn
} from 'devextreme-vue/data-grid';


const app = createApp(App);
app.component("MsButton", MsButton)
app.component("MSDropDown", MSDropDown)
app.component("DxSelectBox", DxSelectBox)
app.component("DxCheckBox", DxCheckBox)
app.component("DxDataGrid", DxDataGrid)
app.component("DxColumn", DxColumn)
app.component("ProfileImage", ProfileImage)
app.mount('#app')