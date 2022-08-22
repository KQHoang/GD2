<template>
  <div class="ms-component con-ms-popup ms-popup-primary">
    <div class="ms-popup--background"></div>
    <div class="ms-popup flex flex-column" :class="popUpStyle">
      <header class="ms-popup--header">
        <div class="ms-popup--title">
          <h2>
            <span class="ms-title--span">{{ popUpTitle }}</span>
          </h2>
        </div>
        <div class="flex justity-between items-center ms-popup--close">
          <div
            class="ms-icon-container flex items-center justify-center btn-icon-1"
          >
            <i
              class="ms-icon notranslate icon-scale mi-close-2"
              @click="closePopUp" title="Đóng"
            ></i>
          </div>
        </div>
      </header>

      <div class="ms-popup--content">
        <!-- nội dung pop up xoá -->
        <div class="ms-content-delete" v-if="isDelete">
          <span class="content-delete-popup"
            >Bạn có chắc chắn muốn xoá
            <span class="name-user-delete">{{ user.fullName }}</span>
            khỏi ứng dụng AMIS Quy trình không?</span
          >
        </div>

        <!-- nội dung pop up sửa vai trò -->
        <div class="ms-content-edit" v-if="isEdit">
          <div class="item-wrap">
            <div class="flex items-center">
              <div class="avatar m-r-8">
                 <ProfileImage  :userCode="user.userCode" :fullNameAvatar="user.fullName"/>
              </div>
              <div class="user-information">
                <div>
                  <b>{{user.fullName}}</b>
                  <span class="m-l-4">({{user.userCode}})</span>
                </div>
                <div class="m-t-4 m-b-4">
                  <span>{{user.email}}</span>
                </div>
                <div>
                  <span>{{user.positionName}}</span>
                  <span> - </span>
                  <span>{{user.departmentName}}</span>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div  class="m-b-4">
            <label class="bold lab-role">
            Vai trò
            <span class="required"> * </span>
            <br />
          </label>
          </div>
          
          <br />

          <div class="ms-row-role">

            <div class="ms-col ms-role-checkbox" v-for="item in roles" :key="item">
              <div class="flex items-center">
                <div class="ms-checkbox-container ms-checkbox">
                  <input type="checkbox" class="ms-checkbox--input" />
                  <span class="icon-square-uncheck checkmark" @click="change(item.index)" :class="{'icon-square-check': this.checks[item.index] == true}"></span> 
                  <span class="con-slot-label">
                    <div class="label-role-checkbox" :title="item.roleName">
                      {{item.roleName}}
                    </div>
                  </span>
                </div>
              </div>
            </div>

          </div>
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
          class=" p-d-16"
          :styleButton="buttonStyle"
          :isShowIcon="false"
          :msButtonText="buttonName"
          @click="btnYes"
        />
      </footer>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Enum from '@/js/enums.js'
import ProfileImage from './ProfileImage.vue';
import getRole from '@/js/services/role/getRole.js';
import deleteUser from '@/js/services/user/deleteUser.js'
import updateUserRole from '@/js/services/userRoleServices/updateUserRole.js'
export default {
    name: "PopUp",
    props: {
        // Tiêu đề pop up
        popUpTitle: {
            type: String,
        },
        // tên css cho pop up
        popUpStyle: {
            type: String,
        },
        // css cho button thứ 2
        buttonStyle: {
            type: String,
        },
        // nội dung của button
        buttonName: {
            type: String,
        },
        // thông tin người dùng
        userInfo: {
            type: Object,
        },
        // 0 - thực hiện sửa vai trò, 1 - thực hiện xoá thông tin người dùng
        editMode: {
            type: Number,
        }
    },
    data() {
        return {
            user: {}, // thông tin người dùng
            checks: [], // mảng ktra checkbox được chọn
            isEdit: false, // thực hiện sửa vai trò
            isDelete: false, // thực hiện xoá dữ liệu
            roles: [], // mảng vai trò
            roleNames:[], // mảng tên vai trò

        };
    },
    methods: {
        /**
         * Đóng pop up
         * Người tạo: Khuất Quang Hoàng 
         * Ngày tạo: (10/8/2022)
         */
        closePopUp() {
            // truyền false: không đóng form chi tiết nếu có
            this.$emit("closePopUp", false);
        },

        /**
         * Cập nhật lại trạng thái checkbox
         * Người tạo: Khuất Quang Hoàng 
         * Ngày tạo: (10/8/2022)
         */
        change(index) {
          try {
            if (this.checks[index]){
              this.checks[index] = false;
              this.roles[index].status = Enum.UserRoleStatus.Delete;
            }
            else{
              this.checks[index] = true;
              this.roles[index].status = Enum.UserRoleStatus.Add;
            }
          } catch (error) {
            console.log("Có lỗi xảy ra khi thay đổi vai trò.");
          }
        },

        /**
         * thực hiện cập nhật vai trò hoặc xoá người dùng
         * Người tạo: Khuất Quang Hoàng 
         * Ngày tạo: (10/8/2022)
         */
       async btnYes() {
          try {
            var me = this;
            // thực hiện cập nhật vai trò
            if(this.isEdit){           
              // validate xem vai trò có trống không
              var isValid = this.checks.includes(true);
              if(isValid)
                await updateUserRole.updateUserRole(me.roles, me);
              else
                alert("Không phần tử được chọn");
            }
            if(this.isDelete){
              // thực hiện xoá người dùng
              await deleteUser.deleteUser(me.user.userID, me);
            }
          } catch (error) {
            console.log("Có lỗi xảy ra.");
          }
        }
    },
      async created() {
        try {
          var me = this;
          this.user = JSON.parse(JSON.stringify(this.userInfo));
    
          // lấy mảng tên vai trò của người dùng
          if(this.user.roleName)
            this.roleNames = this.user.roleName.split(", ");
          // hiển thị nội dung cập nhật hoặc sửa
          if (this.editMode == Enum.EditMode.Edit)
              this.isEdit = true;
          if (this.editMode == Enum.EditMode.Delete)
              this.isDelete = true;
          
          // lấy dữ liệu từ bảng role khi thực hiện sửa vai trò
          if(this.isEdit){
            this.roles = await getRole.getRoleList();
          }
    
          // thêm thuộc tính cho đối tượng trong mảng
          for(var i = 0; i< me.roles.length; i++)
          {
            me.roles[i].index = i;
            me.roles[i].userID = me.user.userID;
            me.roles[i].status = Enum.UserRoleStatus.NoAction;
    
            if(me.roleNames.includes(me.roles[i].roleName))
              me.checks.push(true);
            else
              me.checks.push(false);
          }  
        } catch (error) {
          console.log("Có lỗi xảy ra khi tải dữ liệu.");
        }
    },
    components: { ProfileImage }
};
</script>
