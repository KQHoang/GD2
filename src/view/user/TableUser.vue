<template>
  <div>
    <div class="grid-container" id="user-table">
      <div class="h-full">
        <div class="tb-widget tb-visibility-change">
          <div class="tb-datagrid tb-gridbase-container">
            <div class="tb-datagrid-header tb-datagrid-nowrap">
              <DxDataGrid
                id="gridContainer"
                :data-source="employees"
                :key-expr="ID"
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
                <DxColumn
                  :width="230"
                  data-field="UserCode"
                  caption="Mã nhân viên"
                />

                <DxColumn
                  :width="230"
                  data-field="FullName"
                  caption="Họ và tên"
                />

                <DxColumn
                  :width="230"
                  data-field="Department"
                  caption="Phòng ban"
                />

                <DxColumn
                  :width="230"
                  data-field="PositionName"
                  caption="Ví trí công việc"
                />

                <DxColumn :width="230" data-field="Email" caption="Email" />

                <DxColumn :width="230" data-field="" caption="Vai trò" />

                <DxColumn
                  :width="230"
                  data-field="Status"
                  caption="Trạng thái"
                />

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
                          @click="editUser"
                        ></div>
                      </div>
                    </div>
                    <div class="style-button">
                      <div class="button-comand-wrap btn-more">
                        <div
                          class="icon-delete-custom icon-hidden"
                          @click="deleteUser"
                        ></div>
                      </div>
                    </div>
                  </div>
                </template>
              </DxDataGrid>
              <!-- <table class="table-user">

              <thead class="header-title">
                <th class="th-width-200">Mã nhân viên</th>
                <th class="th-width-200">Họ và tên</th>
                <th class="th-width-200">Phòng ban</th>
                <th class="th-width-250">Vị trí công việc</th>
                <th class="th-width-250">Email</th>
                <th class="th-width-311">Vai trò</th>
                <th class="th-width-200">Trạng thái</th>
              </thead>

              <tbody>
                <tr @click="showUserDetail">
                  <td>MF1154</td>
                  <td>Khuất Quang Hoàng</td>
                  <td>Trung tâm sản xuất</td>
                  <td>Triển khai</td>
                  <td>hoang@gmail.com</td>
                  <td>Quản lý, nhân viên</td>
                  <td>Chờ xác nhận</td>
                  <td class="custom-column custom-button">
                    <div class="flex justify-flexend m-8">
                      <div class="style-button">
                        <div class="button-comand-wrap btn-more">
                          <div class="mi-pencil" @click="editUser"></div>
                        </div>
                      </div>
                      <div class="style-button">
                        <div class="button-comand-wrap btn-more">
                          <div
                            class="icon-delete-custom"
                            @click="deleteUser"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table> -->
            </div>
          </div>
        </div>
      </div>
    </div>

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

    <!-- user detail -->
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
            <div class="font-20 bold detail-work-info">THÔNG TIN CÔNG VIỆC</div>
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
</template>

<script>
import PopUp from "../../components/base/PopUp.vue";
export default {
  name: "TableUer",
  components: {
    PopUp,
  },
  data() {
    return {
      showPopUp: false, // hiển thị pop up
      isShowDetail: false,
      employees: [
        {
          UserCode: "NV-100",
          FullName: "Quang Hoàng",
          Department: "Trung tâm sản xuât",
          PositionName: "Nhân viên",
          Email: "fsafa@gmail.com",
          Status: "Chờ xác nhận",
        },
        {
          UserCode: "NV-100",
          FullName: "Quang Hoàng",
          Department: "Trung tâm sản xuât",
          PositionName: "Nhân viên",
          Email: "fsafa@gmail.com",
          Status: "Chờ xác nhận",
        },
      ],
    };
  },

  methods: {
    /**
     * Nhấn nút sửa người dùng
     * Khuất Quang Hoàng (2/8/2022)
     */
    editUser() {
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
    deleteUser() {
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
    showUserDetail() {
      this.isShowDetail = true;
    },

    /**
     * đóng form thông tin chi tiết người dùng
     * Khuất Quang Hoàng (4/8/2022)
     */
    closeDetail() {
      this.isShowDetail = false;
    },
  },
};
</script>
