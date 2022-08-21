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
            <table class="table-add-newuser">
              <thead>
                <th class="min-width-60">STT</th>
                <th  class="text-align-left min-width-230">Mã nhân viên</th>
                <th  class="text-align-left min-width-230">Họ tên</th>
                <th  class="text-align-left min-width-230">Phòng ban</th>
                <th  class="text-align-left min-width-230">Vị trí công việc</th>
                <th  class="text-align-left min-width-230">Email</th>
                <th  class="text-align-left min-width-230" >Vai trò</th>
                <th  class="text-align-left min-width-230">Trạng thái</th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="(row, index) in userList" :key="index">
                  <td class="text-align">{{index+1}}</td>
                  <td >
                    <div :class="{'invalid': this.errorRequireds[index].userCode == true}">
                      <input type="text" class="w-full" v-model="userList[index].userCode" @blur="blurColor(userList[index].fullName, index, 'userCode')"/>
                      <div class="tooltip-required">Mã người dùng trống</div>
                    </div>
                  </td>
                  <td>
                    <div :class="{'invalid': this.errorRequireds[index].fullName == true}">
                      <input type="text" class="w-full" v-model="userList[index].fullName" @blur="blurColor(userList[index].fullName, index, 'fullName')"/>
                      <div class="tooltip-required">Mã người dùng trống</div>
                    </div>
                  </td>
                  <td>
                    <div :class="{'invalid': this.errorRequireds[index].departmentID == true}">
                      <DxSelectBox 
                        :data-source="departments"
                        display-expr="departmentName"
                        value-expr="departmentID"
                        placeholder="Chọn vai trò"
                        class="ms-select-box select-box-add w-full"
                        v-model="userList[index].departmentID"
                        @closed="valueChangedBlur(userList[index].departmentID, index, 'departmentID')"
                        @value-changed="valueChangedBlur(userList[index].departmentID, index, 'departmentID')"
                      />
                      <div class="tooltip-required">Phòng ban trống</div>
                    </div>
                  </td>
                  <td>
                    <div :class="{'invalid': this.errorRequireds[index].positionID == true}">
                        <DxSelectBox 
                          :data-source="positions"
                          display-expr="positionName"
                          value-expr="positionID"
                          placeholder="Chọn vai trò"
                          class="ms-select-box select-box-add w-full"
                          v-model="userList[index].positionID"
                          @closed="valueChangedBlur(userList[index].positionID, index, 'positionID')"
                          @value-changed="valueChangedBlur(userList[index].positionID, index, 'positionID')"
                        />
                      <div class="tooltip-required">Vị trí công việc trống</div>
                    </div>
                  </td>
                  <td >
                    <div :class="{'invalid': this.errorRequireds[index].email == true}">
                      <input type="text" class="w-full" v-model="userList[index].email" @blur="blurColor(userList[index].fullName, index, 'email')"/>
                      <div class="tooltip-required width-80">Email trống</div>
                    </div>
                  </td>
                  <td >
                    <div :class="{'invalid': this.errorRequireds[index].role == true}">
                      <DxTagBox
                        :data-source="roles"
                        display-expr="roleName"
                        value-expr="roleID"
                        class="ms-select-box w-full"
                        v-model="userList[index].roleID"
                        @closed="valueChangedBlur(userList[index].roleID, index, 'roleID')"
                        @value-changed="valueChangedBlur(userList[index].roleID, index, 'roleID')"
                      />
                      <div class="tooltip-required width-90">Vai trò trống</div>
                    </div>
                  </td>
                  <td>
                    <div :class="{'invalid': this.errorRequireds[index].status == true}">
                      <DxSelectBox 
                        :data-source="status"
                        display-expr="statusName"
                        value-expr="ID"
                        placeholder="Chọn vai trò"
                        class="ms-select-box select-box-add w-full"
                        v-model="userList[index].status"
                        @closed="valueChangedBlur(userList[index].status, index, 'status')"
                        @value-changed="valueChangedBlur(userList[index].status, index, 'status')"
                      />
                      <div class="tooltip-required width-105">trạng thái trống</div>
                    </div>
                  </td>

                  <td>
                    <div class="flex m-8 height-50" >
                      <!-- style="height: 50px" -->
                      <div class="style-button">
                        <div class="button-comand-wrap btn-more">
                          <div
                            class="icon-delete-custom icon-hidden"
                            @click="deleteUser(index)"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
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
import addUser from "@/js/services/user/addUser";
import getNewUserCode from "@/js/services/user/getNewUserCode.js"
import getDepartment from "@/js/services/departmentServices/getDepartment.js"
import getRole from "@/js/services/role/getRole";
import getPosition from "@/js/services/positonServices/getPosition.js"
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
                {ID: 2, statusName:"Chưa kích hoạt"}, {ID: 3, statusName:"Ngừng kích hoạt"} ],
        errorRequireds:[], // mảng validate dữ liệu
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

          var newValidate = {
            userCode: false, fullName: false, departmentID: false, positionID: false, role: false, email: false, status: false
          };

          this.errorRequireds.push(newValidate);
          // this.$refs.dataGridAddUser.instance.refresh(true);
        }, 

        /**
         * Xoá dòng
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        deleteUser(index){
          this.userList.splice(index, 1);
        },
        
         /**
         * ẩn hoặc hiện viền đỏ khi validate
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        blurColor(data, index, propertyName){
          // debugger
          if(data == ""){
            if(propertyName == "userCode")
              this.errorRequireds[index].userCode = true;
            if(propertyName == "fullName")
              this.errorRequireds[index].fullName = true;
            if(propertyName == "email")
              this.errorRequireds[index].email = true;
          }
          else
          {
            if(propertyName == "userCode")
                this.errorRequireds[index].userCode = false;
            if(propertyName == "fullName")
              this.errorRequireds[index].fullName = false;
            if(propertyName == "email")
                this.errorRequireds[index].email = false;
          }

        },

        /**
         * Thay đổi dữ liệu thẻ select
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 20/8/2022
         */
        valueChangedBlur(data, index, propertyName){

          debugger
          if(propertyName == 'departmentID'){
            if(data == "")
              this.errorRequireds[index].departmentID = true;
            else
              this.errorRequireds[index].departmentID = false;
          }

          if(propertyName == 'positionID'){
            if(data == "")
              this.errorRequireds[index].positionID = true;
            else
              this.errorRequireds[index].positionID = false;
          }

          if(propertyName == 'roleID'){
            if(data.length == 0)
              this.errorRequireds[index].role = true;
            else
              this.errorRequireds[index].role = false;
          }

          if(propertyName == 'status'){
            if(data == null)
              this.errorRequireds[index].status = true;
            else
              this.errorRequireds[index].status = false;
          }
        },

        /**
         * Validate dữ liệu
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 20/8/2022
         */
         validate(){
          for(var i = 0; i < this.errorRequireds.length; i++)
          {
            if(this.userList[i].userCode == "")
            {
              this.errorRequireds[i].userCode = true;
            }
            else{
              this.errorRequireds[i].userCode = false;
            }

            if(this.userList[i].fullName == ""){
              this.errorRequireds[i].fullName = true;
            }
            else
              this.errorRequireds[i].fullName = false;


            if(this.userList[i].departmentID == ""){
              this.errorRequireds[i].departmentID = true;
            }
            else
              this.errorRequireds[i].departmentID = false;

            if(this.userList[i].positionID == ""){
              this.errorRequireds[i].positionID = true;
            }
            else
              this.errorRequireds[i].positionID = false;

            if(this.userList[i].email == ""){
              this.errorRequireds[i].email = true;
            }
            else
              this.errorRequireds[i].email = false;

            if(this.userList[i].roleID.length == 0){
              this.errorRequireds[i].role = true;
            }
            else
              this.errorRequireds[i].role = false;

            if(this.userList[i].status == null){
              this.errorRequireds[i].status = true;
            }
            else
              this.errorRequireds[i].status = false;
          }   
        },

        /**
         * Thực hiện thêm mới
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        async btnSubmit(){
          var me = this;
          // Validate dữ liệu
          this.validate();

          var isValid = true;
          this.errorRequireds.forEach(element => {
            for(var property in element){
              if(element[property] == true)
                {
                  isValid = false;
                  return;
                }
            }
          });

          if(isValid){
            // await axios
            // .post(
            //   ` https://localhost:44328/api/v1/Users/postAll`, me.userList
            // )
            // .then(function (res) {
            //   // console.log(res);
            //   me.$emit("reLoad");
            //   me.$emit("closePopUp", false);
            // })
            // .catch(function (res) {
            //   console.log(res);
            // });
            await addUser.addUser(me.userList, me);
          }

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

      var newValidate = {
        userCode: false, fullName: false, departmentID: false, positionID: false, role: false, email: false, status: false
      };

      this.errorRequireds.push(newValidate);
      // lấy mã nhân viên mới
        // await axios
        // .get(
        //   `https://localhost:44328/api/v1/Users/NewUserCode`
        // )
        // .then(function (res) {
        //   me.newUserCode = res.data;
        // })
        // .catch(function (res) {
        //   console.log(res);
        // });
      me.newUserCode = await getNewUserCode.getNewUserCode();
      
      newUser.userCode = this.newUserCode;

      // Thêm người dùng vào trong mảng
      this.userList.push(newUser);

      // lấy dữ liệu cho mảng departments
      // await axios
      //   .get(
      //     `https://localhost:44328/api/v1/Departments`
      //   )
      //   .then(function (res) {
      //     me.departments = res.data;
      //   })
      //   .catch(function (res) {
      //     console.log(res);
      //   });
      me.departments = await getDepartment.getDepartment();

        // lấy dữ liệu cho mảng positions
        // await axios
        // .get(
        //   `https://localhost:44328/api/v1/Positions`
        // )
        // .then(function (res) {
        //   me.positions = res.data;
        // })
        // .catch(function (res) {
        //   console.log(res);
        // });
        me.positions = await getPosition.getPosition();

         // lấy dữ liệu cho mảng roles
        // await axios
        // .get(
        //   `https://localhost:44328/api/v1/Roles`
        // )
        // .then(function (res) {
        //   me.roles = res.data;
        // })
        // .catch(function (res) {
        //   console.log(res);
        // });
        me.roles = await getRole.getRoleList();
       
    }
};
</script>

<style scoped>
.table-add-newuser{
  width: 100%; 
  overflow: auto;
}

.min-width-60{
  min-width: 60px;
  width: 60px;
}

.min-width-230{
  min-width: 230px;
  width: 230px;
}

.width-80{
  width: 80px;
}

.width-90{
  width: 90px;
}

.width-105{
  width: 105px;
}
.grid-container-add{
  overflow: auto !important;
  max-height: 500px;
}

thead{
  background: #f3f8ff;
}

thead th:not(:first-child, :last-child)::after{
  content: " *";
  color: red;
  right: 0;
}

tr td{
  height: 60px;
  padding: 6px;
}

td input{
  border: 1px solid #e7e8e9;
  background: #fff;
  border-radius: 4px;
  height: 36px;
  padding: 7px 8px 9px;
}

td input:focus-visible{
  border-color: var(--input-hover-border-color);
  outline: none;
}

td input:hover{
  border-color: var(--input-hover-border-color);
  outline: none;
}

.invalid input:hover{
  border-color: red;
  outline: none;
}

.invalid input:focus{
  border-color: red;
  outline: none;
}

tbody>tr:hover td{
  background: #dbf4ff;
}

tbody>tr:hover .icon-hidden{
  display: block;
}

tbody td:last-child{
  position: sticky;
  right: 0;
}

.tooltip-required{
  display: none;
  position: absolute;
  background-color: black;
  color: #fff;
  width: fit-content;
  padding: 4px;
  top: 25px;
}

.dx-template-wrapper{
  position: relative;
  display: flex;
  justify-content: center;
}

.invalid .dx-texteditor.dx-editor-outlined{
  border-color: red !important;
}

.invalid input{
  border-color: red;
}
.invalid:hover  .tooltip-required{
    display: block;
}

.text-align-left{
  text-align: left;
}

.invalid{
  position: relative;
  display: flex;
  justify-content: center;
}
</style>
