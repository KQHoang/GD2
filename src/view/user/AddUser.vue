<template>
 <div class="ms-component con-ms-popup center ms-popup-primary p-t-0">
    <div class="ms-popup-background"></div>
    <div
      class="ms-popup flex flex-col popup-add-user">
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
              class="ms-icon notranslate icon-scale mi-close-add"
              @click="closePopUp"
            ></i>
          </div>
        </div>
      </header>

      <div class="ms-popup--content">
        <div class="content-table-add"
        >
          <!-- style="
            height: 100%;
            width: 100%;
            position: relative;
            overflow: auto;
            text-indent: 0;
            border: none;
          " -->
          <div class="tb-datagrid-header tb-datagrid-nowrap grid-container grid-container-add">
           
            <DxDataGrid
              ref="dataGridAddUser"
              id="gridContainer1"
              :key-expr="ID"
              :data-source="userList"
              column-resizing-mode="widget"
              :allow-column-reordering="true"
              :allow-column-resizing="true"
              :column-auto-width="true"
              :show-borders="true"
              :show-column-lines="false"
              :show-row-lines="true"
              :hover-state-enabled="true"
              :onRowClick="showUserDetail"
              :paging="{enabled: false}"
            >
              <DxColumn caption="STT" :width="60" cell-template="indexColumn" 
              header-cell-template="headerTableAddUser"
              />

              <!-- phần header -->
              <template #headerTableAddUser="{data}">
                  <div  class="p-lr-16" :class="{'label-header-dxgrid': data.columnIndex != 0}">
                  <!-- style="padding: 0 16px;" -->
                    {{data.column.caption}} 
                  </div>
              </template>

              <template #indexColumn="{ data }">
                <div :title="data.rowIndex + 1" class="wrap-text">
                  <div class="nomal line-clamp-2 d-flex justify-center text-align" >
                    <!-- style="text-align: center" -->
                    {{ data.rowIndex + 1 }}
                  </div>
                </div>
              </template>
              <!-- data-field="UserCode" -->
              <DxColumn
                :width="230"
                :min-width="230"
                data-field="userCode"
                caption="Mã nhân viên"
                cell-template="userCodeColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userCodeColumn="{ data }">
                 <DxTextBox v-model="userList[data.rowIndex].userCode"/>
              </template>

              <!-- Tên người dùng -->
              <DxColumn
                :width="230"
                :min-width="230"
                data-field="fullName"
                caption="Họ và tên"
                cell-template="userNameColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userNameColumn="{ data }">
                <DxTextBox v-model="userList[data.rowIndex].fullName"/>
              </template>

              <!-- Phòng ban -->
              <DxColumn
                :width="230"
                :min-width="230"
                data-field="departmentID"
                caption="Phòng ban"
                cell-template="userDepartmentColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userDepartmentColumn="{ data }">
                <DxSelectBox 
                  :data-source="departments"
                  display-expr="departmentName"
                  value-expr="departmentID"
                  placeholder="Chọn vai trò"
                  class="ms-select-box select-box-add w-full"
                  v-model="userList[data.rowIndex].departmentID"
                  
                />
              </template>

              <!-- Vị trí công việc -->
              <DxColumn
                :width="230"
                :min-width="230"
                data-field="positionID"
                caption="Vị trí công việc"
                cell-template="userPositionColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userPositionColumn="{ data }">
                <DxSelectBox 
                  :data-source="positions"
                  display-expr="positionName"
                  value-expr="positionID"
                  placeholder="Chọn vai trò"
                  class="ms-select-box select-box-add w-full"
                  v-model="userList[data.rowIndex].positionID"
                  
                />
              </template>

              <!-- Email -->
              <DxColumn
                :width="230"
                :min-width="230"
                data-field="email"
                caption="Email"
                cell-template="userEmailColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userEmailColumn="{ data }">
               <DxTextBox v-model="userList[data.rowIndex].email"/>
              </template>

              <!-- Vai trò -->
               <DxColumn
                :width="230"
                :min-width="230"
                data-field="roleID"
                caption="Vai trò"
                cell-template="userRoleColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userRoleColumn="{ data }">
                
                <DxTagBox
                  :data-source="roles"
                  display-expr="roleName"
                  value-expr="roleID"
                  class="ms-select-box w-full"
                  v-model="userList[data.rowIndex].roleID"
                  
                />
              </template>

              <!-- Trạng thái -->
               <DxColumn
                :width="230"
                :min-width="230"
                data-field="status"
                caption="Trạng thái"
                cell-template="userStatusColumn"
                header-cell-template="headerTableAddUser"
              />
              <template #userStatusColumn="{ data }">
                <DxSelectBox 
                  :data-source="status"
                  display-expr="statusName"
                  value-expr="ID"
                  placeholder="Chọn vai trò"
                  class="ms-select-box select-box-add w-full"
                  v-model="userList[data.rowIndex].status"
                  
                />
              </template>

              <DxColumn
                    :min-width="68"
                    :max-width="68"
                    :width="68"
                    cell-template="dropDownBoxEditor"
                  />
              <template #dropDownBoxEditor="{ data }">
                    <div class="flex m-8 height-50" >
                      <!-- style="height: 50px" -->
                      <div class="style-button">
                        <div class="button-comand-wrap btn-more">
                          <div
                            class="icon-delete-custom icon-hidden"
                            @click="deleteUser(data.rowIndex)"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </template>

            </DxDataGrid>
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
          @click="closePopUp"
        />
        <MsButton
          class="p-d-16"
          :styleButton="'ms-btn-primary'"
          :isShowIcon="false"
          :msButtonText="'Lưu'"
          @click="btnSubmit"
        />
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "AddUser",
    data(){
      return {
        index: 1, // số dòng trong bảng
        userList: [], // mảng người dùng
        departments: [], // mảng phòng ban
        positions: [], // mảng vị trí công việc
        roles: [], // mảng vai trò
        newUserCode: "", // mã nhân viên mới
        status: [{ID: 0, statusName:"Đang hoạt động"}, {ID: 1, statusName:"Chờ xác nhận"},
                {ID: 2, statusName:"Chưa kích hoạt"}, {ID: 3, statusName:"Ngừng kích hoạt"} ]
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

        /**
         * Thêm dòng cho bảng thêm người dùng
         * Khuất Quang Hoàng
         * Ngày tạo: 2/8/2022
         */
        addRow(){
          var newUser = {};
          newUser.roleID = [];
          newUser.fullName = "";
          newUser.departmentID = "";
          newUser.positionID = "";
          newUser.email = "";
          newUser.status = null;

          var oldUserCode = this.userList[this.userList.length-1].userCode;
          var userCodeSplit = oldUserCode.split("-");
          var newUserCode = parseInt(userCodeSplit[1]) + 1;
          newUser.userCode = "NV-"+ newUserCode;

          // Thêm người dùng vào trong mảng
          this.userList.push(newUser);
          this.$refs.dataGridAddUser.instance.refresh(true);
        }, 

        /**
         * Xoá dòng
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        deleteUser(index){
          // debugger
          this.userList.splice(index, 1);
          // setTimeout(() => ;
          this.$refs.dataGridAddUser.instance.refresh(false);
          // console.log(index);
        },

        /**
         * Thực hiện thêm mới
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        async btnSubmit(){
          var me = this;
          // console.log(this.userList);
          await axios
          .post(
            ` https://localhost:44328/api/v1/Users/postAll`, me.userList
          )
          .then(function (res) {
            console.log(res);
            me.$emit("reLoad");
            me.$emit("closePopUp", false);
          })
          .catch(function (res) {
            console.log(res);
          });

        }

    },
    components: {  },
    async created(){
      var me = this;
      var newUser = {};
      newUser.roleID = [];
      newUser.fullName = "";
      newUser.departmentID = "";
      newUser.positionID = "";
      newUser.email = "";
      newUser.status = null;

      // lấy mã nhân viên mới
        await axios
        .get(
          `https://localhost:44328/api/v1/Users/NewUserCode`
        )
        .then(function (res) {
          me.newUserCode = res.data;
        })
        .catch(function (res) {
          console.log(res);
        });
      
      newUser.userCode = this.newUserCode;

      // Thêm người dùng vào trong mảng
      this.userList.push(newUser);

      // lấy dữ liệu cho mảng departments
      await axios
        .get(
          `https://localhost:44328/api/v1/Departments`
        )
        .then(function (res) {
          me.departments = res.data;
        })
        .catch(function (res) {
          console.log(res);
        });

        // lấy dữ liệu cho mảng positions
        await axios
        .get(
          `https://localhost:44328/api/v1/Positions`
        )
        .then(function (res) {
          me.positions = res.data;
        })
        .catch(function (res) {
          console.log(res);
        });

         // lấy dữ liệu cho mảng roles
        await axios
        .get(
          `https://localhost:44328/api/v1/Roles`
        )
        .then(function (res) {
          me.roles = res.data;
        })
        .catch(function (res) {
          console.log(res);
        });
       
    }
};
</script>
