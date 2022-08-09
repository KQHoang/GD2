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
                :items="simpleProducts"
                placeholder="Chọn vai trò"
                class="ms-select-box"
              />
            </span>

            <div class="su-filter m-r-16" >
              <div class="mi-24 cursor-pointer m-0 mi-setting" @click="showCustumizeTable"></div>

              <!-- Pop up tuỳ chỉnh cột trong bảng user -->
              <div
                id="customize-table-user"
                class="customize-table-user ms-popup flex flex-column" v-if="isShowCustomize"
              >
                <header class="ms-popup--customize p-b-8 ">
                    <div class="flex justify-between items-center p-b-12 w-full">
                        <div class="customize-title--span">Tuỳ chỉnh cột</div>
                        <div class="flex justity-between items-center" >
                            <div class="ms-icon-container flex items-center justify-center btn-icon-1" @click="closeCustomizeTable">
                                <i
                                    class="ms-icon notranslate icon-scale mi-close-2"
                                    @click="closePopUp"
                                ></i>
                            </div>
                        </div>
                    </div>
                    <span class="input-search-user">
                        <div  style="height: 36px;  width:100% ">
                            <div class="ms-input flex w-full">
                                <div class="ms-icon-default flex items-center justify-center p-l-8">
                                    <i class="ms-icon pre-icon mi-search"></i>
                                </div>
                                <input type="text" placeholder="Tìm kiếm" class="ms-input-item">
                            </div>
                        </div>
                    </span>                
                </header>

                <div class="list-customize-column p-b-12" style="height: 250px; overflow: auto;">                  
                    <div class="list-group-item" >
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark icon-square-check check-box-disable" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Mã nhân viên
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column bg-white"></div>
                      </div>
                    </div>

                    <div class="list-group-item">
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark icon-square-check check-box-disable" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Họ và tên
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column bg-white"></div>
                      </div>
                    </div>

                    <div class="list-group-item">
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark" @click="change(0)" :class="{'icon-square-check': this.checkboxs[0] == true}" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Phòng ban
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column"></div>
                      </div>
                    </div>

                    <div class="list-group-item">
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark" @click="change(1)" :class="{'icon-square-check': this.checkboxs[1] == true}" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Vị trí công việc
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column"></div>
                      </div>
                    </div>

                    <div class="list-group-item">
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark" @click="change(2)" :class="{'icon-square-check': this.checkboxs[2]== true}" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Email
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column"></div>
                      </div>
                    </div>

                    <div class="list-group-item">
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark" @click="change(3)" :class="{'icon-square-check': this.checkboxs[3] == true}" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Vai trò
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column"></div>
                      </div>
                    </div>

                    <div class="list-group-item">
                      <div class="flex items-center justify-between" style="padding: 8px; height: 42px;">
                        <div class="item-customize ms-checkbox">
                          <div class="fdsafs">
                            <input type="checkbox" class="ms-checkbox--input" />
                            <span class="icon-square-uncheck checkmark" @click="change(4)" :class="{'icon-square-check': this.checkboxs[4] == true}" style="top: -2px;"></span> 
                            <!-- icon-square-uncheck  -->
                            <span class="con-slot-label">
                              <div style="margin-top: 2px" class="label-role-checkbox">
                                Trạng thái
                              </div>
                            </span>
                          </div>
                        </div>

                        <div class="icon-customize-column"></div>
                      </div>
                    </div>
                </div>

                <footer class="ms-popup-footer">
                  <MsButton
                    class="m-r-12 p-d-16"
                    :styleButton="'ms-btn-default'"
                    :isShowIcon="false"
                    :msButtonText="'Lấy lại mặc định'"
                  />
                  <MsButton
                    class="m-r-12 p-d-16"
                    :styleButton="'ms-btn-primary'"
                    :isShowIcon="false"
                    :msButtonText="'Áp dụng'"
                  />
                </footer>
              </div>
            </div>
          </div>

          <!-- bảng người dùng -->
          <TableUser />

          <!-- phân trang -->
          <div class="paging">
            <div class="grid-navigatioin">
              <div class="page-total flex">
                Tổng số bản ghi:
                <b style="padding: 0 6px">44</b>
              </div>

              <div class="page-size-selector flex items-center">
                <div class="m-r-8">Số bản ghi/trang</div>

                <MSDropDown />

                <div class="page-info"><b>1</b> - <b>44</b> bản ghi</div>
                <div class="page-next-preview">
                  <div class="ms-row m-0">
                    <div
                      class="ms-pagination--mb ms-col ms-xs-12 ms-sm-12 ms-lg"
                    >
                      <div
                        class="con-ms-pagination w-full ms-pagination-primary"
                      >
                        <nav
                          class="ms-pagination--nav flex justify-between items-center"
                        >
                          <div class="ms-button-nav disable">
                            <div
                              class="ms-icon-container flex items-center justify-center btn-icon-1"
                            >
                              <i
                                class="ms-icon notranslate icon-scale mi-chevron-left"
                              ></i>
                            </div>
                          </div>
                          <div class="ms-button-nav">
                            <div
                              class="ms-icon-container flex items-center justify-center btn-icon-1"
                            >
                              <i
                                class="ms-icon notranslate icon-scale mi-chevron-right"
                              ></i>
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
  </div>

  <!-- pop up thêm mới nhân viên -->
  <AddUser v-if="isShowAdd" @closePopUp="closeAddUser" />
</template>
<script>
import TableUser from "@/view/user/TableUser.vue";
import AddUser from "@/view/user/AddUser.vue";
export default {
  name: "TheContent",
  comments: {
    TableUser,
    AddUser,
  },
  data() {
    return {
      isShowAdd: false, // ẩn hiện form thêm mới người dùng
      simpleProducts: [
        "Tất cả",
        "Quản trị ứng dụng quy trình",
        "Nhân viên",
        "Quản lý",
      ], // mảng item trong select box lọc dữ liệu
      checkboxs: [false, false, false, false, false], // mảng chứa value của checkbox chỉnh sửa table
      isShowCustomize: false, // hiển thị pop up tuỳ chỉnh table
    };
  },
  components: { TableUser, AddUser },
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
     * Thay đổi trạng thái của check box thay đổi cột trên bảng dữ liệu
     * Khuất Quang Hoàng 
     * Ngày tạo: 7/8/2022
     */

    change(index){
      this.checkboxs[index] = !this.checkboxs[index];
    },

    /**
     * Hiển thị tuỳ chỉnh bảng
     * Khuất Quang Hoàng 
     * Ngày tạo: 7/8/2022
     */
    showCustumizeTable(){
      this.isShowCustomize = true;
    },

    /**
     * ẩn tuỳ chỉnh bảng
     * Khuất Quang Hoàng 
     * Ngày tạo: 7/8/2022
     */
    closeCustomizeTable(){
      this.isShowCustomize = false;
    },

  },
  update(){
    
  }
};
</script>
