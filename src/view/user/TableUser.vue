<template>
  <div class="content-main">
    <div class="h-full w-full">
      <div class="flex items-center w-full bg-white" style="height: 60px">
        <span class="input-search-user">
          <div class="m-l-12" style="height: 36px; width: 240px">
            <div class="ms-input flex w-full">
              <div
                class="ms-icon-default flex items-center justify-center p-l-8"
              >
                <i class="ms-icon pre-icon mi-search"></i>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm người dùng"
                class="ms-input-item"
              />
            </div>
          </div>
        </span>

        <span class="select-box-role m-l-12">
          <DxSelectBox
            :data-source="simpleProducts"
            display-expr="Name"
            value-expr="ID"
            placeholder="Chọn vai trò"
            class="ms-select-box"
            v-model="valueSelect"
            :onValueChanged="showValueSelect"
          />
        </span>

        <div class="su-filter m-r-16">
          <div
            class="mi-24 cursor-pointer m-0 mi-setting"
            @click="showCustomizeTable"
          ></div>

          <!-- Pop up tuỳ chỉnh cột trong bảng user -->
          <CustomizeTable @closeCustomizeTable="closeCustomizeTable" v-if="isShowCustomize"/>
        </div>
      </div>

      <!-- bảng người dùng -->
      <div class="grid-container" id="user-table">
        <div class="h-full">
          <div class="tb-widget tb-visibility-change h-full">
            <div class="tb-datagrid tb-gridbase-container h-full">
              <!-- :data-source="employees" -->
              <div class="tb-datagrid-header tb-datagrid-nowrap h-full">
                <DxDataGrid
                  id="gridContainer"
                  :key-expr="ID"
                  :data-source="users"
                  column-resizing-mode="widget"
                  :allow-column-reordering="true"
                  :allow-column-resizing="true"
                  :column-auto-width="true"
                  :show-borders="false"
                  :show-column-lines="false"
                  :show-row-lines="true"
                  :hover-state-enabled="true"
                  :onRowClick="showUserDetail"
                >
                  <!-- data-field="UserCode" -->
                  <DxColumn
                    :width="230"
                    :min-width="230"
                    data-field="userCode"
                    caption="Mã nhân viên"
                  />

                  <DxColumn
                    :width="230"
                    :min-width="230"
                    data-field="fullName"
                    caption="Họ và tên"
                    cell-template="userProfileImage"
                  />
                  <template #userProfileImage="{ data }">
                    <div class="flex">
                      <ProfileImage :userCode="this.code" :fullNameAvatar="data.value"/>
                      <div class="flex" style="align-items: center">
                        {{ data.value }}
                      </div>
                    </div>
                  </template>

                  <DxColumn
                    :width="230"
                    data-field="departmentName"
                    caption="Phòng ban"
                  />

                  <DxColumn
                    :width="230"
                    data-field="positionName"
                    caption="Ví trí công việc"
                  />

                  <DxColumn :width="230" data-field="email" caption="Email" />

                  <DxColumn
                    :width="230"
                    data-field="roleName"
                    caption="Vai trò"
                  />

                  <DxColumn
                    :width="230"
                    data-field="status"
                    caption="Trạng thái"
                    cell-template="columnStatus"
                    alignment="left"
                  />
                  <template #columnStatus="{ data }">
                    <div
                      class="p-l-16 pos-relative"
                      :class="bindingClassStatus(data.value)"
                    >
                      {{ convertStatus(data.value) }}
                      <span class="dot-status"> </span>
                    </div>
                  </template>

                  <DxColumn
                    :min-width="96"
                    :max-width="96"
                    :width="96"
                    cell-template="dropDownBoxEditor"
                  />
                  <template #dropDownBoxEditor>
                    <div class="flex justify-flexend m-8 group-icon-table">
                      <div class="style-button">
                        <div class="button-comand-wrap btn-more">
                          <div
                            class="mi-pencil icon-hidden"
                            @click="editUser($event)"
                          ></div>
                        </div>
                      </div>
                      <div class="style-button">
                        <div class="button-comand-wrap btn-more">
                          <div
                            class="icon-delete-custom icon-hidden"
                            @click="deleteUser($event)"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </template>
                </DxDataGrid>
              </div>
            </div>
          </div>
        </div>

        <!-- popup sửa vai trò và xoá người dùng -->
        <PopUp
          v-if="showPopUp"
          :buttonName="buttonName"
          :popUpStyle="popUpStyle"
          :popUpTitle="popUpTitle"
          :buttonStyle="buttonStyle"
          @closePopUp="closePopUp"
          :userName="userName"
          :listRole="listRole"
        />

        <!-- Thông tin chi tiết người dùng -->
        <div
          class="detail-preview-user"
          id="previewSettingUser"
          v-if="isShowDetail"
        >
          <div class="content-user">
            <div class="mi-close" @click="closeDetail"></div>
            <div class="ms-row-detail">
              <div class="ms-col icon-detail">
                <div class="avatar m-r-8">
                  <img src="" style="width: 64px; height: 64px" alt="" />
                </div>
              </div>

              <div class="ms-col user-detail-info">
                <div class="fullname font-20 bold">Khuất Quang Hoàng</div>
                <div>Hoang@gmail.com</div>
                <div class="status-detail">
                  <div class="p-l-16 pos-relative">
                    <span class="icon-dot-detail"> </span>
                    <span class="active-detail"> Đang hoạt động </span>
                  </div>
                </div>
                <div class="flex">
                  <MsButton
                    class="m-r-12 p-d-16"
                    :styleButton="'ms-btn-detail'"
                    :isShowIcon="false"
                    :msButtonText="'Cập nhật'"
                  />

                  <MsButton
                    class="m-r-12 p-d-16"
                    :styleButton="'ms-btn-detail'"
                    :isShowIcon="false"
                    :msButtonText="'Xoá'"
                  />
                </div>
              </div>

              <div class="body-preview">
                <div class="font-20 bold detail-work-info">
                  THÔNG TIN CÔNG VIỆC
                </div>
                <div class="ms-row-detail m-t-20">
                  <div class="ms-col prop-detail-name">
                    <div class="bold">Mã nhân viên</div>
                  </div>

                  <div class="ms-col prop-detail-value">
                    <div class="value-border-bottom">NV-0011</div>
                  </div>
                </div>

                <div class="ms-row-detail">
                  <div class="ms-col prop-detail-name">
                    <div class="bold">Phòng ban</div>
                  </div>

                  <div class="ms-col prop-detail-value">
                    <div class="value-border-bottom">Trung tâm sản xuất</div>
                  </div>
                </div>

                <div class="ms-row-detail">
                  <div class="ms-col prop-detail-name">
                    <div class="bold">Vị trí công việc</div>
                  </div>

                  <div class="ms-col prop-detail-value">
                    <div class="value-border-bottom">Giám đốc/nhân viên</div>
                  </div>
                </div>

                <div class="font-20 bold detail-work-info">
                  THÔNG TIN PHÂN QUYỀN
                </div>

                <div class="w-full m-t-20">
                  <div class="grid-container-detail">
                    <div class="h-full">
                      <div class="role-detail">
                        <div class="datagrid grid-base-container">
                          <div class="datagrid-detail-header p-16">
                            <div class="bold line-height-48">Vai trò</div>
                          </div>

                          <div
                            class="datagrid-detail-header datagrid-detail-hover p-16"
                          >
                            <div class="line-height-48">Nhân viên</div>
                          </div>

                          <div
                            class="datagrid-detail-header datagrid-detail-hover p-16"
                          >
                            <div class="line-height-48">Quản trị hệ thống</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- phân trang -->
      <div class="paging">
        <div class="grid-navigatioin">
          <div class="page-total flex">
            Tổng số bản ghi:
            <b style="padding: 0 6px">{{this.totalRecord}}</b>
          </div>

          <div class="page-size-selector flex items-center">
            <div class="m-r-8">Số bản ghi/trang</div>

            <MSDropDown @getPageSize="getPageSize"/>

            <div class="page-info"><b>{{this.recordStart}}</b> - <b>{{this.recordEnd}}</b> bản ghi</div>
            <div class="page-next-preview">
              <div class="ms-row m-0">
                <div class="ms-pagination--mb ms-col ms-xs-12 ms-sm-12 ms-lg">
                  <div class="con-ms-pagination w-full ms-pagination-primary">
                    <nav
                      class="ms-pagination--nav flex justify-between items-center">
                      <div class="ms-button-nav disable">
                        <div
                          class="ms-icon-container flex items-center justify-center btn-icon-1" @click="prePage">
                          <i class="ms-icon notranslate icon-scale mi-chevron-left"></i>
                        </div>
                      </div>
                      <div class="ms-button-nav">
                        <div
                          class="ms-icon-container flex items-center justify-center btn-icon-1" @click="nextPage">
                          <i class="ms-icon notranslate icon-scale mi-chevron-right"></i>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopUp from "../../components/base/PopUp.vue";
import CustomizeTable from "./CustomizeTable.vue"
import axios from "axios";
export default {
  name: "TableUer",
  components: {
    PopUp,
    CustomizeTable
},
  data() {
    return {
      showPopUp: false, // hiển thị pop up
      isShowDetail: false,
      code: "",
      users: [], // danh sách người dùng
      pageIndex: 1, // trang hiện tại
      pageSize: 15, // số bản ghi trên 1 trang
      keySearch: "", // chuỗi tìm kiếm
      totalRecord: 0, // tổng số bản ghi
      recordStart: 0, // bản ghi đầu 
      recordEnd: 0, // bản ghi cuối 
      checkboxs: [false, false, false, false, false],
      isShowCustomize: false, // hiển thị tuỳ chỉnh bảng người dùng
    };
  },

  methods: {
    /**
     * Nhấn nút sửa người dùng
     * Khuất Quang Hoàng (2/8/2022)
     */
    editUser(event) {
      event.preventDefault();
      event.stopPropagation();
      this.showPopUp = true;
      this.popUpTitle = "Sửa người dùng";
      this.buttonStyle = "ms-btn-primary";
      this.buttonName = "Lưu";
      this.popUpStyle = "popup-edit-user";
      this.userName = "";
      this.listRole = "dfsda";
      this.sShowDetail = false;
    },

    /**
     * Đóng pop up
     * Khuất Quang Hoàng (2/8/2022)
     */
    closePopUp() {
      this.showPopUp = false;
    },

    /**
     * Nhấn nút xoá người dùng
     * Khuất Quang Hoàng (2/8/2022)
     */
    deleteUser(event) {
      event.preventDefault();
      event.stopPropagation();
      this.showPopUp = true;
      this.popUpTitle = "Xoá người dùng";
      this.buttonStyle = "ms-btn-danger";
      this.buttonName = "Xoá";
      this.popUpStyle = "popup-notitification";
      this.userName = "Khuất Quang Hoàng";
      this.listRole = "";
      this.isShowDetail = false;
    },

    /**
     * hiện thông tin chi tiết nhân viên
     * Khuất Quang Hoàng (2/8/2022)
     */
    showUserDetail(selectRowsData) {
      this.isShowDetail = true;
      const data = selectRowsData;
      console.log(data);
    },

    /**
     * đóng form thông tin chi tiết người dùng
     * Khuất Quang Hoàng (4/8/2022)
     */
    closeDetail() {
      this.isShowDetail = false;
    },

    /**
     * convert trạng thái người dùng
     * Khuất Quang Hoàng (10/8/2022)
     */
    convertStatus(input) {
      if (input == 0) return "Đang hoạt động";
      if (input == 1) return "Chờ xác nhận";
      if (input == 2) return "Chưa kích hoạt";
      if (input == 3) return "Ngừng kích hoạt";
    },

    /**
     * binding class cho trường trạng thái người dùng
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (4/8/2022)
     */
    bindingClassStatus(value) {
      return {
        "status-yellow": value == 1,
        "status-green": value == 0,
        "status-blue": value == 2,
        "status-gray": value == 3,
      };
    },

    /**
     * đóng form tuỳ chỉnh bảng người dùng
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (4/8/2022)
     */
    closeCustomizeTable(isShow) {
      this.isShowCustomize = isShow;
    },

     /**
     * hiển thị form tuỳ chỉnh bảng người dùng
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (4/8/2022)
     */
    showCustomizeTable() {
      this.isShowCustomize = true;
    },

     /**
     * phân lại trang khi thay đổi số lượng bản ghi trên 1 trang
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    getPageSize(pageSize){
      this.pageSize = pageSize;
      this.getPaging();
    },

     /**
     * Phân trang
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    async getPaging(){
      var me = this;
      await axios
        .get(
          `https://localhost:7087/api/v1/Users/filter?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.keySearch}`
        )
        .then(function (res) {
          me.users = res.data.data;
          me.totalRecord = res.data.totalRecord;
          me.recordStart = res.data.recordStart;
          me.recordEnd = res.data.recordEnd;
        })
        .catch(function (res) {
          console.log(res);
        });
      },

       /**
     * Phân lại trang khi người dùng ấn sang trang tiếp
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    nextPage(){
      if(this.recordEnd <= this.totalRecord)
      {
        this.pageIndex ++;
        this.getPaging();  
      }
    },

     /**
     * Phân lại trang khi người dùng ấn nút pre 
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    prePage(){
      if(this.recordStart > 1)
      {
        this.pageIndex --;
        this.getPaging();  
      }
    }
  },

  created() {
    this.getPaging();
  },
};
</script>
