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
              @click="closePopUp"
            ></i>
          </div>
        </div>
      </header>

      <div class="ms-popup--content">
        <!-- nội dung pop up xoá -->
        <div class="ms-content-delete" v-if="isDelete">
          <span style="color: #171b2a"
            >Bạn có chắc chắn muốn xoá
            <span style="font-weight: 700">{{ user.fullName }}</span>
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

          <div style="margin-bottom: 4px">
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
                    <div class="label-role-checkbox">
                      <!-- Quản trị ứng dụng quy tình -->{{item.roleName}}
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <!-- <div class="ms-col ms-role-checkbox">
              <div class="flex items-center">
                <div class="ms-checkbox-container ms-checkbox">
                  <input type="checkbox" class="ms-checkbox--input" />
                  <span class="icon-square-uncheck checkmark" @click="change(1)" :class="{'icon-square-check': this.checks[1] == true}"></span> 
                  <span class="con-slot-label">
                    <div class="label-role-checkbox">
                      Quản trị ứng dụng quy tình
                    </div>
                  </span>
                </div>
              </div>
            </div> -->

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
import ProfileImage from './ProfileImage.vue';

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
            checks: [],
            isEdit: false, // thực hiện sửa vai trò
            isDelete: false, // thực hiện xoá dữ liệu
            roles: [], // mảng vai trò
            roleNames:[], 
            test: [{}]
        };
    },
    methods: {
        /**
         * Đóng pop up
         * Người tạo: Khuất Quang Hoàng 
         * Ngày tạo: (10/8/2022)
         */
        closePopUp() {
            this.$emit("closePopUp", true);
        },

        /**
         * Cập nhật lại trạng thái checkbox
         * Người tạo: Khuất Quang Hoàng 
         * Ngày tạo: (10/8/2022)
         */
        change(index) {
            if (this.checks[index]){
              this.checks[index] = false;
              this.roles[index].status = 2;
            }
            else{
              this.checks[index] = true;
              this.roles[index].status = 1;
            }
                
        },

        /**
         * thực hiện cập nhật vai trò hoặc xoá người dùng
         * Người tạo: Khuất Quang Hoàng 
         * Ngày tạo: (10/8/2022)
         */
        btnYes() {
          var me = this;

          // thực hiện cập nhật vai trò
          if(this.isEdit){
             axios
            .put(
              `https://localhost:7087/api/v1/UserRoles/putAll/`, me.roles
            )
            .then(function (res) {
              console.log(res);
            })
            .catch(function (res) {
              console.log(res);
            });
          }

          if(this.isDelete){
            axios
            .delete(
              `https://localhost:7087/api/v1/Users/${me.user.userID}`, 
            )
            .then(function (res) {
              console.log(res);
            })
            .catch(function (res) {
              console.log(res);
            });
          }
          
        }
    },
      async created() {
      var me = this;
      this.user = JSON.parse(JSON.stringify(this.userInfo));

      if(this.user.roleName)
        this.roleNames = this.user.roleName.split(", ");
      // hiển thị nội dung cập nhật hoặc sửa
      if (this.editMode == 0)
          this.isEdit = true;
      if (this.editMode == 1)
          this.isDelete = true;
      
      // lấy dữ liệu từ bảng role khi thực hiện sửa vai trò
      if(this.isEdit){
        await axios
        .get(
          `https://localhost:7087/api/v1/Roles`
        )
        .then(function (res) {
          me.roles = res.data;
          console.log(me.roles);
         
        })
        .catch(function (res) {
          console.log(res);
        });
      }

      // thêm thuộc tính cho đối tượng trong mảng
      for(var i = 0; i< me.roles.length; i++)
      {
        me.roles[i].index = i;
        me.roles[i].userID = me.user.userID;
        me.roles[i].status = 3;

        if(me.roleNames.includes(me.roles[i].roleName))
          me.checks.push(true);
        else
          me.checks.push(false);
      } 
      
      
    },
    components: { ProfileImage }
};
</script>
