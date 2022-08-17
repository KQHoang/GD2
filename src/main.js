import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import MsButton from './components/base/Button.vue'
import MSDropDown from './components/base/DropDown.vue'
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';
import ProfileImage from './components/base/ProfileImage.vue'
import DxPopup from 'devextreme-vue/popup'
import DxTagBox from 'devextreme-vue/tag-box';
import { createRouter, createWebHistory } from 'vue-router'
import GridUser from './view/user/TableUser.vue'
import HLoading from './components/base/BLoading.vue'
import DxTextBox from 'devextreme-vue/text-box';
import {
    DxDataGrid,
    DxColumn
} from 'devextreme-vue/data-grid';

const routers = [{
    path: '/setting/user',
    component: GridUser
}]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: routers, // short for `routes: routes`
})

const app = createApp(App);
app.component("DxTextBox", DxTextBox)
app.component("MsButton", MsButton)
app.component("MSDropDown", MSDropDown)
app.component("DxSelectBox", DxSelectBox)
app.component("DxCheckBox", DxCheckBox)
app.component("DxDataGrid", DxDataGrid)
app.component("DxColumn", DxColumn)
app.component("ProfileImage", ProfileImage)
app.component("DxPopup", DxPopup)
app.component("DxTagBox", DxTagBox)
app.component("HLoading", HLoading)
app.use(router).mount('#app')