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
          <div class="tb-datagrid-header tb-datagrid-nowrap grid-container grid-container-add">
            <table class="table-add-newuser">
              <thead>
                <th class="min-width-60">STT</th>
                <th  class="text-align-left min-width-150">Mã nhân viên</th>
                <th  class="text-align-left min-width-230">Họ tên</th>
                <th  class="text-align-left min-width-230">Phòng ban</th>
                <th  class="text-align-left min-width-230">Vị trí công việc</th>
                <th  class="text-align-left min-width-230">Email</th>
                <th  class="text-align-left min-width-230">Vai trò</th>
                <th  class="text-align-left min-width-230">Trạng thái</th>
                <th :class="{'disable-icon': this.hideIconDelete()}"></th>
              </thead>
              <tbody>
                <tr v-for="(row, index) in userList" :key="index">
                  <td class="text-align">{{index+1}}</td>
                  <td >
                    <div :class="{'invalid': this.errorRequireds[index].userCode == true}">
                      <input type="text" class="w-full" v-model="userList[index].userCode" 
                      @blur="blurColor(userList[index].userCode, index, 'userCode')"
                      ref="txtUserCode" maxlength="20"/>
                      <div class="tooltip-required">{{errorValidateCode}}</div>
                    </div>
                  </td>
                  <td>
                    <div :class="{'invalid': this.errorRequireds[index].fullName == true}">
                      <input type="text" class="w-full" v-model="userList[index].fullName" :maxlength="100"
                       @blur="blurColor(userList[index].fullName, index, 'fullName')"/>
                      <div class="tooltip-required">Họ tên trống</div>
                    </div>
                  </td>
                  <td>
                    <div :class="{'invalid': this.errorRequireds[index].departmentID == true}">
                      <DxSelectBox 
                        :data-source="departments"
                        display-expr="departmentName"
                        value-expr="departmentID"
                        placeholder="Chọn phòng ban"
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
                          placeholder="Chọn vị trí"
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
                      <input type="text" class="w-full" v-model="userList[index].email" :maxlength="100" 
                      @blur="blurColor(userList[index].email, index, 'email')"/>
                      <div class="tooltip-required width-80">{{validateEmail}}</div>
                    </div>
                  </td>
                  <td class="max-width-230">
                    <div :class="{'invalid': this.errorRequireds[index].role == true}">
                      <DxTagBox
                        :with="230"
                        :max-width="230"
                        :data-source="roles"
                        display-expr="roleName"
                        placeholder="Chọn vai trò"
                        value-expr="roleID"
                        :multiline="false"
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
                        placeholder="Chọn trạng thái"
                        class="ms-select-box select-box-add w-full"
                        v-model="userList[index].status"
                        @closed="valueChangedBlur(userList[index].status, index, 'status')"
                        @value-changed="valueChangedBlur(userList[index].status, index, 'status')"
                      />
                      <div class="tooltip-required width-105">Trạng thái trống</div>
                    </div>
                  </td>

                  <td :class="{'disable-icon': this.hideIconDelete()}">
                    <div class="flex m-8 height-50" >
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
import getListUser from "@/js/services/user/getListUser.js"
import getNewUserCode from "@/js/services/user/getNewUserCode.js"
import getDepartment from "@/js/services/departmentServices/getDepartment.js"
import getRole from "@/js/services/role/getRole";
import getPosition from "@/js/services/positonServices/getPosition.js"
import Resources from "@/js/resources";
import User from "@/js/user.js"
export default {
    name: "AddUser",
    data(){
      return {
        index: 1, // số dòng trong bảng
        userList: [], // mảng người dùng thêm mới
        departments: [], // mảng phòng ban
        positions: [], // mảng vị trí công việc
        roles: [], // mảng vai trò
        newUserCode: "", // mã nhân viên mới
        status: [{ID: 0, statusName:"Đang hoạt động"}, {ID: 1, statusName:"Chờ xác nhận"},
                {ID: 2, statusName:"Chưa kích hoạt"}, {ID: 3, statusName:"Ngừng kích hoạt"} ],
        errorRequireds:[], // mảng validate dữ liệu
        validateEmail: "", // thông báo lỗi validate email
        errorValidateCode: "", // thông báo lỗi validate code
        listUserCheckCode: [] // mảng người dùng lấy từ db dùng check trùng mã
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
          try {
            debugger
            // khai báo nhân viên mới
            var newUser = new User();

            // thực hiện tăng mã người dùng
            var oldUserCode = this.userList[this.userList.length-1].userCode;
            var userCodeSplit = oldUserCode.split("-");
            var newUserCode = parseInt(userCodeSplit[1]) + 1;
            newUser.userCode = "NV-"+ newUserCode;
            // Thêm người dùng vào trong mảng
            this.userList.push(newUser);

            // khai báo mảng chứa validate từng field của người dùng
            var newValidate = {
              userCode: false, fullName: false, departmentID: false, positionID: false, role: false, email: false, status: false
            };
            this.errorRequireds.push(newValidate);

            this.$nextTick(()=> this.$refs.txtUserCode[this.userList.length - 1].focus());
                     
          } catch (error) {
            console.log("Có lỗi xảy ra khi thêm dòng dữ liệu.");
          }
        }, 

        /**
         * Validate email đúng định dạng
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        validateFormatEmail(email){
          var validateRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
          if(!email.match(validateRegex))
            return true;
          return false;
        },

        /**
         * Check trùng mã
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
         checkDuplicateCode(userCode){
          var res = false;
          this.listUserCheckCode.forEach(element => {
            if(element.userCode == userCode)
              res = true;
          });
          return res;
        },

        /**
         * Xoá dòng
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        deleteUser(index){
          try {
            this.userList.splice(index, 1);
          } catch (error) {
            console.log("Có lỗi xảy ra khi thực hiện xoá dòng.");
          }          
        },
        
         /**
         * ẩn hoặc hiện viền đỏ khi validate
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        blurColor(data, index, propertyName){
          try {
            // Validate userCode
            if(propertyName == "userCode")
            {
              if(data){       
                if(this.checkDuplicateCode(data))
                {
                  this.errorRequireds[index].userCode = true;
                  this.errorValidateCode = "Mã đã tồn tại";
                }
                else
                  this.errorRequireds[index].userCode = false;
              }
              else{
                  this.errorRequireds[index].userCode = true;
                  this.errorValidateCode = "Mã người dùng trống";
              }  
            }

            // Validate Email
            if(propertyName == "email")
            {
              if(data){           
                if(this.validateFormatEmail(data))
                {
                  this.errorRequireds[index].email = true;
                  this.validateEmail ="Email chưa đúng định dạng";
                }
                else
                  this.errorRequireds[index].email = false;
              }
              else{
                  this.errorRequireds[index].email = true;
                  this.validateEmail ="Email đang trống";
              }  
            }
            
            if(data == ""){
              if(propertyName == "fullName")
                this.errorRequireds[index].fullName = true;
            }
            else
            {
              if(propertyName == "fullName")
                this.errorRequireds[index].fullName = false;
            }
          } catch (error) {
            console.log("Có lỗi xảy ra khi thực hiện validate dữ liệu.");
          }
        },

        /**
         * Thay đổi dữ liệu thẻ select
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 20/8/2022
         */
        valueChangedBlur(data, index, propertyName){
          try {
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
          } catch (error) {
            console.log("Có lỗi xảy ra khi thực hiện validate dữ liệu.");
          }
        },

        /**
         * Validate dữ liệu
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 20/8/2022
         */
         validate(){
          try {
            for(var i = 0; i < this.errorRequireds.length; i++)
          {
            if(this.userList[i].userCode == "")
            {
              this.errorRequireds[i].userCode = true;
              this.errorValidateCode = "Mã người dùng trống";
            }
            else{
              if(this.checkDuplicateCode(this.userList[i].userCode)){
                this.errorRequireds[i].userCode = true;
                this.errorValidateCode = "Mã đã tồn tại";
              }
              else
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
              this.validateEmail ="Email đang trống";
            }
            else
            {
              if(this.validateFormatEmail(this.userList[i].email))
              {
                this.errorRequireds[i].email = true;
                this.validateEmail ="Email chưa đúng định dạng";
              }
              else
                this.errorRequireds[i].email = false;
              }
                
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
          } catch (error) {
            console.log("Có lỗi xảy ra khi thực hiện validate dữ liệu.");  
          }
        },

        /**
         * Thực hiện thêm mới
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 16/8/2022
         */
        async btnSubmit(){
          try {
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
              // thêm mới dữ liệu bảng user
              await addUser.addUser(me.userList, me);
            }
          } catch (error) {
            console.log("Có lỗi xảy ra khi thực hiện thêm mới dữ liệu.");
          }
        }, 

        hideIconDelete(){
          if(this.userList.length == 1)
            return true;
          return false;
        }

    },
    components: {  },
    async created(){
      try {
        var me = this;
        // Khai báo người dùng mới
        var newUser = new User();

        var newValidate = {
          userCode: false, fullName: false, departmentID: false, positionID: false, role: false, email: false, status: false
        };

        this.errorRequireds.push(newValidate);

        // lấy mã nhân viên mới
        me.newUserCode = await getNewUserCode.getNewUserCode();
        newUser.userCode = this.newUserCode;

        // Thêm người dùng vào trong mảng
        this.userList.push(newUser);

        // lấy dữ liệu cho mảng departments
        me.departments = await getDepartment.getDepartment();

        // lấy dữ liệu bảng vị trí
        me.positions = await getPosition.getPosition();

        // lấy dữ liệu cho mảng roles
        me.roles = await getRole.getRoleList();

        // lấy tất cả người dùng dùng kiểm tra trùng mã
        this.listUserCheckCode = await getListUser.getListUser();

        // focus vào ô mã người dùng
        this.$nextTick(()=> this.$refs.txtUserCode[0].focus());
              
      } catch (error) {
        console.log("Có lỗi xảy ra khi tải dữ liệu về.");
      } 
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

.min-width-150{
  min-width: 150px;
  width: 150px;
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
  border: 1px solid #e7e8e9;
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

tr td{
  border-top: 1px solid #e7e8e9;
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

/* tbody>tr:hover .disable-icon{
  display: none;
} */

.disable-icon{
  display: none;
}

.max-width-230{
  max-width: 230px;
}

</style>
