<template>
  <div
    id="customize-table-user"
    class="customize-table-user ms-popup flex flex-column"
  >
    <header class="ms-popup--customize p-b-8">
      <div class="flex justify-between items-center p-b-12 w-full">
        <div class="customize-title--span">Tuỳ chỉnh cột</div>
        <div class="flex justity-between items-center">
          <div
            class="ms-icon-container flex items-center justify-center btn-icon-1"
            @click="closeCustomizeTable"
          >
            <i
              class="ms-icon notranslate icon-scale mi-close-2"
            ></i>
          </div>
        </div>
      </div>
      <span class="input-search-user">
        <div style="height: 36px; width: 100%">
          <div class="ms-input flex w-full">
            <div class="ms-icon-default flex items-center justify-center p-l-8">
              <i class="ms-icon pre-icon mi-search"></i>
            </div>
            <input type="text" placeholder="Tìm kiếm" class="ms-input-item" />
          </div>
        </div>
      </span>
    </header>

    <div
      class="list-customize-column p-b-12"
      style="height: 250px; overflow: auto"
    >
      <div class="list-group-item">
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark icon-square-check check-box-disable"
                style="top: -2px"
              ></span>
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
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark icon-square-check check-box-disable"
                style="top: -2px"
              ></span>
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
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark"
                @click="change(0)"
                :class="{
                  'icon-square-check': this.checkboxs[0] == true,
                }"
                style="top: -2px"
              ></span>
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
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark"
                @click="change(1)"
                :class="{
                  'icon-square-check': this.checkboxs[1] == true,
                }"
                style="top: -2px"
              ></span>
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
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark"
                @click="change(2)"
                :class="{
                  'icon-square-check': this.checkboxs[2] == true,
                }"
                style="top: -2px"
              ></span>
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
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark"
                @click="change(3)"
                :class="{
                  'icon-square-check': this.checkboxs[3] == true,
                }"
                style="top: -2px"
              ></span>
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
        <div
          class="flex items-center justify-between"
          style="padding: 8px; height: 42px"
        >
          <div class="item-customize ms-checkbox">
            <div class="fdsafs">
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark"
                @click="change(4)"
                :class="{
                  'icon-square-check': this.checkboxs[4] == true,
                }"
                style="top: -2px"
              ></span>
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
        @click="btnApplyClick"
      />
    </footer>
  </div>
</template>

<script>
    export default {
        name: "CustomizeTable",
        data(){
            return {
                checkboxs: [false, false, false, false, false], // mảng danh sách trạng thái các input
            }
        }, 
        methods: {
            /**
           * Thay đổi trạng thái checkbox
           * Khuất Quang Hoàng
           * Ngày tạo: 2/8/2022
           */
            change(index) {
                this.checkboxs[index] = !this.checkboxs[index];
            },

            /**
           * Đóng form tuỳ chỉnh
           * Khuất Quang Hoàng
           * Ngày tạo: 2/8/2022
           */
            closeCustomizeTable(){
                this.$emit("closeCustomizeTable", false);
            },

             /**
           * Thực hiện ẩn hiện cột bảng người dùng
           * Khuất Quang Hoàng
           * Ngày tạo: 12/8/2022
           */
            btnApplyClick(){
              this.$emit("columnCustomizeTable", this.checkboxs);
              this.$emit("closeCustomizeTable", false);
            }
        },
    }
</script>
