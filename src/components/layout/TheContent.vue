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
      <TableUser />
    </div>
    <!-- pop up thêm mới nhân viên -->
    <AddUser v-if="isShowAdd" @closePopUp="closeAddUser" />
  </div>
</template>
<script>
import AddUser from "../../view/user/AddUser.vue";
import TableUser from "@/view/user/TableUser.vue";
export default {
  name: "TheContent",
  components: {
    TableUser,
    AddUser,
  },
  data() {
    return {
      isShowAdd: false,
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
  },
  update() {}
};
</script>
