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
            title="Đóng"
          >
            <i
              class="ms-icon notranslate icon-scale mi-close-2"
            ></i>
          </div>
        </div>
      </div>
      <span class="input-search-user">
        <div class="w-full height-36">
          <!-- style="height: 36px; width: 100%"  -->
          <div class="ms-input flex w-full">
            <div class="ms-icon-default flex items-center justify-center p-l-8">
              <i class="ms-icon pre-icon mi-search"></i>
            </div>
            <input type="text" placeholder="Tìm kiếm" class="ms-input-item" ref="hoang" v-model="keySearch" @keyup="search"/>
          </div>
        </div>
      </span>
    </header>

    <div
      class="list-customize-column p-b-12"  >
    <!-- style=" height: 250px; overflow: auto" -->
      <div class="list-group-item" v-if="arrayShow[0]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <div class="item-customize ms-checkbox cursor-pointer">
            <div >
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark icon-square-check check-box-disable top--2"
              ></span>
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label">
                <div class="label-role-checkbox lable-role-width">
                  Mã nhân viên
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column bg-white"></div>
        </div>
      </div>

      <div class="list-group-item" v-if="arrayShow[1]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <!-- style="padding: 8px; height: 42px" -->
          <div class="item-customize ms-checkbox cursor-pointer" >
            <div>
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark icon-square-check check-box-disable top--2"
                
              ></span>
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label">
                <div class="label-role-checkbox lable-role-width">
                  Họ và tên
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column bg-white"></div>
        </div>
      </div>

      <div class="list-group-item" v-if="arrayShow[2]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <!-- style="padding: 8px; height: 42px" -->
          <div class="item-customize ms-checkbox cursor-pointer">
            <div>
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark top--2"
                @click="change(0)"
                :class="{
                  'icon-square-check': this.checkboxs[0] == true,
                }"
                
              ></span>
              <!-- style="top: -2px" -->
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label" @click="change(0)">
                <div class="label-role-checkbox lable-role-width">
                  Phòng ban
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column"></div>
        </div>
      </div>

      <div class="list-group-item" v-if="arrayShow[3]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <!-- style="padding: 8px; height: 42px" -->
          <div class="item-customize ms-checkbox cursor-pointer">
            <div>
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark top--2"
                @click="change(1)"
                :class="{
                  'icon-square-check': this.checkboxs[1] == true,
                }"
                
              ></span>
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label" @click="change(1)">
                <div class="label-role-checkbox lable-role-width">
                  Vị trí công việc
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column"></div>
        </div>
      </div>

      <div class="list-group-item" v-if="arrayShow[4]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <!-- style="padding: 8px; height: 42px" -->
          <div class="item-customize ms-checkbox cursor-pointer">
            <div>
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark top--2"
                @click="change(2)"
                :class="{
                  'icon-square-check': this.checkboxs[2] == true,
                }"
              ></span>
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label" @click="change(2)">
                <div class="label-role-checkbox lable-role-width">
                  Email
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column"></div>
        </div>
      </div>

      <div class="list-group-item" v-if="arrayShow[5]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <div class="item-customize ms-checkbox cursor-pointer">
            <div>
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark top--2"
                @click="change(3)"
                :class="{
                  'icon-square-check': this.checkboxs[3] == true,
                }"
              
              ></span>
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label" @click="change(3)">
                <div class="label-role-checkbox lable-role-width">
                  Vai trò
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column"></div>
        </div>
      </div>

      <div class="list-group-item" v-if="arrayShow[6]">
        <div
          class="flex items-center justify-between item-checkbox-custom"
        >
          <div class="item-customize ms-checkbox cursor-pointer">
            <div>
              <input type="checkbox" class="ms-checkbox--input" />
              <span
                class="icon-square-uncheck checkmark top--2"
                @click="change(4)"
                :class="{
                  'icon-square-check': this.checkboxs[4] == true,
                }"
              ></span>
              <!-- icon-square-uncheck  -->
              <span class="con-slot-label" @click="change(4)">
                <div class="label-role-checkbox lable-role-width">
                  Trạng thái
                </div>
              </span>
            </div>
          </div>

          <div class="icon-customize-column"></div>
        </div>
      </div>
    </div>

    <footer class="ms-popup-footer ms-footer-custom">
      <MsButton
        class="m-r-12 p-d-16"
        :styleButton="'ms-btn-default'"
        :isShowIcon="false"
        :msButtonText="'Lấy lại mặc định'"
         @click="getDefaultCustomize"
      />
      <MsButton
        class="p-d-16"
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

        props:{
          columnVisible:{
            type: Array
          }
        },

        data(){
            return {
              keySearch: "",
              arrayName: ["Mã nhân viên", "Họ và tên", "Phòng ban", "Vị trí công việc", "Email", "Vai trò", "Trạng thái"],
              arrayShow: [true, true, true, true, true, true, true],
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
            }, 

              /**
           * Thực hiện ẩn hiện đóng pop up khi click ra ngoài
           * Khuất Quang Hoàng
           * Ngày tạo: 12/8/2022
           */
           close(e) {
            if (!this.$el.contains(e.target) && !e.target.classList.contains('cursor-pointer')) {
                this.$emit("closeCustomizeTable", false);
            }
          }, 

           /**
           * Thực hiện lấy lại mặc định tuỳ chỉnh cột
           * Khuất Quang Hoàng
           * Ngày tạo: 12/8/2022
           */
          getDefaultCustomize(){
            for(var i=0; i<this.checkboxs.length; i++)
              this.checkboxs[i] = true;
          },

          searchCustomName(){
            if(this.keySearch){
            for(var i = 0; i< this.arrayName.length; i++)
              {
                if(!this.arrayName[i].toLowerCase().includes(this.keySearch.toLowerCase()))
                  this.arrayShow[i] = false;
              }
            }
            else
              this.arrayShow = [true, true, true, true, true, true, true];           
          },

          search(){
            setTimeout(()=> this.searchCustomName(), 1000);
          }
          

            
        },

        created() {
          this.checkboxs = JSON.parse(JSON.stringify(this.columnVisible));
          this.$nextTick(() => this.$refs.hoang.focus());
          window.addEventListener("click", this.close);
        },

        beforeUnmount() {
        window.removeEventListener("click", this.close);
      },
    }
</script>
