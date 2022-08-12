<template>
  <div style="position: relative">
    <MsButton
      :styleButton="'btn-select-pagesize justify-between'"
      :isShowIcon="true"
      :iconButtonName="'mi-chevron-down'"
      :msButtonText="selected"
      @click="showDropDown"
    />

    <div class="con-ms-dropdown" v-if="isShow" id="dropdown">
      <ul class="ul-dropdown">
        <li
          class="li-dropdown"
          @click="setActive(15)"
          :class="{ 'dropdown-li-active': 15 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>15</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>

        <li
          class="li-dropdown"
          @click="setActive(25)"
          :class="{ 'dropdown-li-active': 25 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>25</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>
        <li
          class="li-dropdown"
          @click="setActive(50)"
          :class="{ 'dropdown-li-active': 50 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>50</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>
        <li
          class="li-dropdown"
          @click="setActive(100)"
          :class="{ 'dropdown-li-active': 100 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>100</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MSDropDown",
  data() {
    return {
      selected: 15, // số bản ghi trên 1 trang
      isShow: false, // hiển thị dropdown chọn số lượng bản ghi
    };
  },

  methods: {

    /**
     * chọn item trong list số lượng bản ghi trên trang
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 11/8/2022
     * @param {* số bản ghi trên 1 trang} indexSelect 
     */
    setActive(indexSelect) {
      this.selected = indexSelect;
      this.$emit("getPageSize", this.selected);
      this.isShow = false;
    },

    /**
     * Đóng mở danh sách dropdown khi ấn 
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 11/8/2022 
     */
    showDropDown() {
      this.isShow = !this.isShow;
    },

    /**
     * Ẩn danh sách khi nhấn ra ngoài
     * Người tạo: Khuất Quang Hoàng
     * Ngày tạo: 11/8/2022 
     */
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
      }
    }
  },
  created() {
    window.addEventListener("click", this.close);
  },
    beforeUnmount() {
    window.removeEventListener("click", this.close);
  },
};
</script>
