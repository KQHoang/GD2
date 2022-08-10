<template>
  <div class="ms-component con-ms-popup center ms-popup-primary p-t-0">
    <div class="ms-popup-background"></div>
    <div
      class="ms-popup flex flex-col"
      style="
        background: rgb(255, 255, 255);
        width: 992px;
        min-width: 500px;
        height: 100%;
      "
    >
      <header class="ms-popup--header">
        <div class="ms-popup--title">
          <h2>
            <span class="ms-title--span">Thêm người dùng</span>
          </h2>
        </div>
        <div class="flex justity-between items-center ms-popup--close">
          <div
            class="ms-icon-container flex items-center justify-center btn-icon-1"
          >
            <i
              class="ms-icon notranslate icon-scale mi-close-2"
              @click="closePopUp"
            ></i>
          </div>
        </div>
      </header>

      <div class="ms-popup--content">
        <div
          style="
            height: 100%;
            width: 100%;
            position: relative;
            overflow: auto;
            text-indent: 0;
            border: none;
          "
        >
          <div class="tb-datagrid-header tb-datagrid-nowrap">
            <table class="table-user table-add-user">
              <thead class="header-title">
                <th>STT</th>
                <th class="th-width-200">Mã nhân viên
                  <span class="required">*</span>
                </th>
                <th class="th-width-200">Họ và tên
                  <span class="required">*</span>
                </th>
                <th class="th-width-200">Phòng ban
                  <span class="required">*</span>
                </th>
                <th class="th-width-250">Vị trí công việc
                  <span class="required">*</span>
                </th>
                <th class="th-width-250">Email
                  <span class="required">*</span>
                </th>
                <th class="th-width-311">Vai trò
                  <span class="required">*</span>
                </th>
                <th class="th-width-200">Trạng thái
                  <span class="required">*</span>
                </th>
              </thead>

              <tbody v-for="i in index" :key="i">
                <tr>
                  <td class="text-align">{{i}}</td>
                  <td><input type="text" class="add-user-input w-full"></td>
                  <td><input type="text" class="add-user-input w-full"></td>
                  <td> <DxSelectBox :items="simpleProducts" placeholder="Chọn vai trò" class="ms-select-box w-full"/></td>
                  <td> <DxSelectBox :items="simpleProducts" placeholder="Chọn vai trò" class="ms-select-box w-full"/></td>
                  <td><input type="text" class="add-user-input w-full"></td>
                  <td> <DxSelectBox :items="simpleProducts" placeholder="Chọn vai trò" class="ms-select-box w-full"/></td>
                  <td> <DxSelectBox :items="simpleProducts" placeholder="Chọn vai trò" class="ms-select-box w-full"/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <MsButton
          class="m-r-12 p-d-16"
          :styleButton="'add-row-user ps-sticky'"
          :isShowIcon="true"
          :iconButtonName="'mi-push-white'"
          :msButtonText="'Thêm dòng'"
          @click="addRow"
        />
        </div>
      </div>

      <footer class="ms-popup-footer">
        <MsButton
          class="m-r-12 p-d-16"
          :styleButton="'ms-btn-default'"
          :isShowIcon="false"
          :msButtonText="'Huỷ'"
        />
        <MsButton
          class="m-r-12 p-d-16"
          :styleButton="'ms-btn-primary'"
          :isShowIcon="false"
          :msButtonText="'Lưu'"
        />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    name: "AddUser",
    data(){
      return {
        simpleProducts:["Nhân viên", "Quản lý"], 
        index: 1
      }
    },

    methods: {
        /**
         * Đóng form thêm mới người dùng
         * Khuất Quang Hoàng
         * Ngày tạo: 2/8/2022
         */
        closePopUp() {
            this.$emit("closePopUp", false);
        },
        addRow(){
          this.index = this.index + 1;
        }
    },
    components: {  }
};
</script>
