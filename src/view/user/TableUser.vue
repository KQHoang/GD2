<template>
  <div class="content-setting w-full">
    <div class="h-full container body-custom">
      <div class="content-header p-b-16">
        <div class="flex justify-between items-center header-custom">
          <div class="font-20 bold">Người dùng</div>

          <MsButton
            :styleButton="'ms-btn-primary'"
            :isShowIcon="true"
            :iconButtonName="'mi-push-white'"
            :msButtonText="'Thêm mới'"
            @click="showAddUser"
          />
        </div>
      </div>
      
      <!-- Phần bảng người dùng -->
      <div class="content-main">
        <div class="h-full w-full">
          <div class="flex items-center w-full bg-white header-input-table" >
            <!-- style="height: 60px" -->
            <span class="input-search-user">
              <div class="m-l-12 input-search-content">
                 <!-- style="height: 36px; width: 240px" -->
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
                    v-model="keySearch"
                    @keyup="searchUser"
                  />
                </div>
              </div>
            </span>

            <span class="select-box-role m-l-12">
              <DxSelectBox 
                :data-source="roleNameFilter"
                placeholder="Chọn vai trò"
                class="ms-select-box"
                v-model="roleFilter"
                :onValueChanged="filterUserByRole"
              />
            </span>

            <div class="su-filter m-r-16">
              <div
                class="mi-24 cursor-pointer m-0 mi-setting"
                @click="showCustomizeTable"
              ></div>

              <!-- Pop up tuỳ chỉnh cột trong bảng user -->
            
            </div>
          </div>

          <!-- bảng người dùng -->
          <div class="grid-container" id="user-table">
            <div class="h-full">
              <div class="tb-widget tb-visibility-change h-full">
                <div class="tb-datagrid tb-gridbase-container h-full">
                  <!-- :data-source="employees" -->
                  <div class="tb-datagrid-header tb-datagrid-nowrap h-full">
                    <HLoading v-if="isShowLoading"/>
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
                      :paging="{enabled: false}"
                    >
                      <!-- data-field="UserCode" -->
                      <DxColumn
                        :width="150"
                        :min-width="150"
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
                          <ProfileImage :userCode="data.values[0]" :fullNameAvatar="data.value"/>
                          <div class="flex align-items-center" >
                            <!-- style="align-items: center" -->
                            {{ data.value }}
                          </div>
                        </div>
                      </template>

                      <DxColumn
                        :width="200"
                        data-field="departmentName"
                        caption="Phòng ban"
                        :visible="columnVisible[0]"
                      />

                      <DxColumn
                        :width="200"
                        data-field="positionName"
                        caption="Ví trí công việc"
                        :visible="columnVisible[1]"
                      />

                      <DxColumn :width="200" data-field="email" caption="Email" 
                      :visible="columnVisible[2]"/>

                      <DxColumn
                        :width="230"
                        data-field="roleName"
                        caption="Vai trò"
                        :visible="columnVisible[3]"
                      />

                      <DxColumn
                        :width="200"
                        data-field="status"
                        caption="Trạng thái"
                        cell-template="columnStatus"
                        alignment="left"
                        :visible="columnVisible[4]"
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
                      <template #dropDownBoxEditor="{ data }">
                        <div class="flex justify-flexend m-8 group-icon-table">
                          <div class="style-button">
                            <div class="button-comand-wrap btn-more">
                              <div
                                class="mi-pencil icon-hidden"
                                @click="editUser($event, data.data)"
                                title="Sửa"
                              ></div>
                            </div>
                          </div>
                          <div class="style-button">
                            <div class="button-comand-wrap btn-more">
                              <div
                                class="icon-delete-custom icon-hidden"
                                @click="deleteUser($event, data.data)"
                                title="Xoá"
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
              @reLoad="updateData"
              :editMode="editMode"
              :userInfo="userInfo"
            />
            <!-- :userName="userName" -->
            <!-- :listRole="listRole" -->

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
                    <div class="avatar m-r-8 m-t-10">
                      <ProfileImage  :userCode="userInfo.userCode" :fullNameAvatar="userInfo.fullName" :key="userInfo.userCode"/>
                    </div>
                  </div>

                  <div class="ms-col user-detail-info">
                    <div class="fullname font-20 bold">{{userInfo.fullName}}</div>
                    <div>{{userInfo.email}}</div>
                    <div class="status-detail">
                        <div
                          class="p-l-16 pos-relative"
                          :class="bindingClassStatus(userInfo.status)"
                        >
                          {{ convertStatus(userInfo.status) }}
                          <span class="dot-status icon-dot-detail"> </span>
                        </div>
                    </div>
                    <div class="flex">
                      <MsButton
                        class="m-r-12 p-d-16"
                        :styleButton="'ms-btn-detail'"
                        :isShowIcon="false"
                        :msButtonText="'Cập nhật'"
                        @click="editUserDetail(this.userInfo)"

                      />

                      <MsButton
                        class="m-r-12 p-d-16"
                        :styleButton="'ms-btn-detail'"
                        :isShowIcon="false"
                        :msButtonText="'Xoá'"
                        @click="deleteUserDetail(this.userInfo)"
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
                        <div class="value-border-bottom">{{userInfo.userCode}}</div>
                      </div>
                    </div>

                    <div class="ms-row-detail">
                      <div class="ms-col prop-detail-name">
                        <div class="bold">Phòng ban</div>
                      </div>

                      <div class="ms-col prop-detail-value">
                        <div class="value-border-bottom">{{userInfo.departmentName}}</div>
                      </div>
                    </div>

                    <div class="ms-row-detail">
                      <div class="ms-col prop-detail-name">
                        <div class="bold">Vị trí công việc</div>
                      </div>

                      <div class="ms-col prop-detail-value">
                        <div class="value-border-bottom">{{userInfo.positionName}}</div>
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

                              <div v-for="item in roleNames" :key="item">
                                <div class="datagrid-detail-header datagrid-detail-hover p-16">
                                  <div class="line-height-48">{{item}}</div>
                                </div>
                              </div>
                            

                              <!-- <div
                                class="datagrid-detail-header datagrid-detail-hover p-16"
                              >
                                <div class="line-height-48">Quản trị hệ thống</div>
                              </div> -->
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
                <b  class="p-lr-6">{{this.totalRecord}}</b>
                <!-- style="padding: 0 6px" -->
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
                          <div class="ms-button-nav button-pre" :class="disableButtonPaging()">
                            <div
                              class="ms-icon-container flex items-center justify-center btn-icon-1" @click="prePage" title="Quay lại">
                              <i class="ms-icon notranslate icon-scale mi-chevron-left"></i>
                            </div>
                          </div>
                          <div class="ms-button-nav button-next" :class="disableButtonPaging()">
                            <div
                              class="ms-icon-container flex items-center justify-center btn-icon-1" @click="nextPage" title="Tiếp tục">
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

    </div>

    <!-- pop up thêm mới nhân viên -->
    <AddUser v-if="isShowAdd" @closePopUp="closeAddUser" @reLoad="updateData"/>
  </div>
  
   <CustomizeTable @closeCustomizeTable="closeCustomizeTable" v-if="isShowCustomize"
          :columnVisible="columnVisible" @columnCustomizeTable="columnCustomizeTable"/>
</template>

<script>
import PopUp from "../../components/base/PopUp.vue";
import CustomizeTable from "./CustomizeTable.vue"
import AddUser from "../../view/user/AddUser.vue";
import axios from "axios";
import HoangEnum from "../../js/enums.js";
import getRole from "@/js/services/role/getRole";
import getUserPaging from "@/js/services/user/getUserPaging.js"
import Resources from "@/js/resources";
export default {
  name: "TableUer",
  components: {
    PopUp,
    CustomizeTable, 
    AddUser
},
  data() {
    return {
      isShowAdd: false, // hiển thị pop up thêm mới người dùng
      showPopUp: false, // hiển thị pop up sửa người dùng, xoá người dùng
      isShowDetail: false, // hiển thị thông tin chi tiết người dùng
      users: [], // danh sách người dùng
      pageIndex: 1, // trang hiện tại
      pageSize: 15, // số bản ghi trên 1 trang
      keySearch: "", // chuỗi tìm kiếm
      totalRecord: 0, // tổng số bản ghi
      recordStart: 0, // bản ghi đầu 
      recordEnd: 0, // bản ghi cuối 
      isShowCustomize: false, // hiển thị tuỳ chỉnh bảng người dùng
      userInfo: {}, // thông tin người dùng gửi sang pop up
      editMode: 0, // 0 - sửa vai trò, 1 - xoá người dùng
      columnVisible: [true, true, true, true, true], // mảng ẩn hiện cột bảng
      roleNames:[], // mảng tên vai trò của nhân viên
      roleNameFilter: [], // mảng tên vai trò (dữ liệu trong select box lọc theo vai trò)
      isShowLoading: false, // hiển thị loading dữ liệu
      roleFilter: "" // tên vai trò để lọc người dùng
    };
  },

  methods: {

    /**
     * Hiện form thêm mới người dùng
     * Khuất Quang Hoàng
     * Ngày tạo: 2/8/2022
     */
     showAddUser() {
      this.isShowAdd = true;
    },

    /**
     * Đóng form thêm mới người dùng
     * Khuất Quang Hoàng
     * Ngày tạo: 2/8/2022
     */
    closeAddUser(isShow) {
      this.isShowAdd = isShow;
    },

    /**
     * Nhấn nút sửa người dùng
     * Khuất Quang Hoàng (2/8/2022)
     */
    editUser(event, user) {
      event.preventDefault();
      event.stopPropagation();
      this.showPopUp = true;
      this.popUpTitle = "Sửa người dùng";
      this.buttonStyle = "ms-btn-primary";
      this.buttonName = "Lưu";
      this.popUpStyle = "popup-edit-user";
      this.userInfo = user;
      this.editMode = 0;
    },

    /**
     * Nhấn nút sửa người dùng
     * Người tạo: Khuất Quang Hoàng
     *  (2/8/2022)
     */
    editUserDetail(user){
      this.showPopUp = true;
      this.popUpTitle = "Sửa người dùng";
      this.buttonStyle = "ms-btn-primary";
      this.buttonName = "Lưu";
      this.popUpStyle = "popup-edit-user";
      this.userInfo = user;
      this.editMode = 0;
      // this.isShowDetail = false;
    },

    /**
     * Đóng pop up
     * Khuất Quang Hoàng (2/8/2022)
     */
    closePopUp(closeDetailUser) {
      if(closeDetailUser){
        if(this.isShowDetail)
        {
          this.isShowDetail = false;
          this.showPopUp = false;
        }
        else
          this.showPopUp = false;
      }
      else
       this.showPopUp = false;
    },

    /**
     * Nhấn nút xoá người dùng
     * Khuất Quang Hoàng (2/8/2022)
     */
    deleteUser(event, user) {
      event.preventDefault();
      event.stopPropagation();
      this.showPopUp = true;
      this.popUpTitle = "Xoá người dùng";
      this.buttonStyle = "ms-btn-danger";
      this.buttonName = "Xoá";
      this.popUpStyle = "popup-notitification";
      this.userInfo = user;
      this.editMode = 1; 
    },

    /**
     * Nhấn nút xoá người dùng
     * Khuất Quang Hoàng
     *  (2/8/2022)
     */
    deleteUserDetail(user) {
      this.showPopUp = true;
      this.popUpTitle = "Xoá người dùng";
      this.buttonStyle = "ms-btn-danger";
      this.buttonName = "Xoá";
      this.popUpStyle = "popup-notitification";
      this.userInfo = user;
      this.editMode = 1; 
      // this.isShowDetail = false;
    },

    /**
     * hiển thị thông tin chi tiết nhân viên
     * Khuất Quang Hoàng (2/8/2022)
     */
    showUserDetail(selectRowsData) {
      try {
        this.isShowDetail = true;
        this.userInfo = selectRowsData.data;
        if(this.roleNames != null)
          this.roleNames = this.userInfo.roleName.split(", ");
      } catch (error) {
        console.log("Có lỗi khi tải dữ liệu");  
      }
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
      try {
        if (input == HoangEnum.Status.Working) return Resources.StatusName.WorkingName;
        if (input == HoangEnum.Status.WConfirm) return Resources.StatusName.WConfirmName;
        if (input == HoangEnum.Status.NotActive) return Resources.StatusName.NotActiveName;
        if (input == HoangEnum.Status.DeActivation) return Resources.StatusName.DeActivationName;
      } catch (error) {
        console.log("Có lỗi xảy ra khi chuyển đổi trạng thái người dùng");
      }
    },

    /**
     * binding class cho trường trạng thái người dùng
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (4/8/2022)
     */
    bindingClassStatus(value) {
      return {
        "status-yellow": value == HoangEnum.Status.WConfirm,
        "status-green": value == HoangEnum.Status.Working,
        "status-blue": value == HoangEnum.Status.NotActive,
        "status-gray": value == HoangEnum.Status.DeActivation,
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
      this.isShowCustomize = !this.isShowCustomize;
    },

     /**
     * phân lại trang khi thay đổi số lượng bản ghi trên 1 trang
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    getPageSize(pageSize){
      try {
        this.pageSize = pageSize;
        this.getPaging(this.keySearch);
      } catch (error) {
        console.log("Có lỗi xảy ra khi thực hiện phân trang");
      }
    },

     /**
     * Phân trang
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    async getPaging(filter){
      var me = this;
      this.isShowLoading = true;
      // Thực hiện phân trang
      var pagingResponse = await getUserPaging.getUserPaging(me.pageIndex, me.pageSize, filter, me);
      me.users = pagingResponse.users;
      me.totalRecord = pagingResponse.totalRecord;
      me.recordStart = pagingResponse.recordStart;
      me.recordEnd = pagingResponse.recordEnd;
      },

       /**
     * Phân lại trang khi người dùng ấn sang trang tiếp
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    nextPage(){
      try {
        if(this.recordEnd < this.totalRecord)
        {
          this.pageIndex ++;
          this.getPaging(this.keySearch);  
        }
      } catch (error) {
        console.log("Có lỗi xảy ra khi thực hiện chuyển trang");  
      }
    },

     /**
     * Phân lại trang khi người dùng ấn nút pre 
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (10/8/2022)
     */
    prePage(){
      try {
        if(this.recordStart > 1)
        {
          this.pageIndex --;
          this.getPaging(this.keySearch);  
        }
      } catch (error) {
        console.log("Có lỗi xảy ra khi thực hiện phân trang dữ liệu.");
      }
    },

    /**
     * binding class disable nút phân trang
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (11/8/2022)
     */
    disableButtonPaging(){
      return{
        "disablePre": this.recordStart == 1,
        "disableNext": this.recordEnd >= this.totalRecord,
      }
    }, 

    /**
     * Nhận dữ liệu từ bên pop up
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (11/8/2022)
     */
    columnCustomizeTable(array){
      this.columnVisible = array;
    }, 

    /**
     * Load lại dữ liệu khi thực hiện thêm mới
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (11/8/2022)
     */
    updateData(){
      try {
        this.getPaging(this.keySearch);
      } catch (error) {
        console.log("Có lỗi xảy ra khi cập nhật lại dữ liệu.");
      }
    }, 

    /**
     * Thực hiện tìm kiếm người dùng
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (17/8/2022)
     */
    searchUser(){
      try {
        this.pageIndex = 1;
        setTimeout(() => this.getPaging(this.keySearch), 500);
      } catch (error) {
        console.log("Có lỗi xảy ra khi thực hiện tìm kiếm.");
      }
    }, 

    /**
     * Lọc người dùng theo vai trò
     * Người tạo: Khuất Quang Hoàng 
     * Ngày tạo: (17/8/2022)
     */
    filterUserByRole(){
      try {
        if(this.roleFilter != "Tất cả")
        this.getPaging(this.roleFilter);
        else
          this.getPaging(this.keySearch);
      } catch (error) {
        console.log("Có lỗi xảy ra khi thực hiện lọc vai trò.");  
      }
    }
  },

  async created() {
    try {
      var me = this;
      // lấy dữ liệu có phân trang
      this.getPaging(this.keySearch);

      // lấy tên các vai trò từ database
      (await getRole.getRoleList()).forEach(element => {
              me.roleNameFilter.push(element.roleName);
        });
      this.roleNameFilter.unshift("Tất cả");
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy dữ liệu về.");
    }
  },
};
</script>
