<template>
    <div class="flex flex-col list-menu" id="menu">
        <div class="setting-tab-item flex align-items-center cursor-pointer" @click="active(1)" :class="{ 'item-activated' : 1 == this.actived}">
            <div class="icon-tab icon-employee"></div>
            <div class="name-tab">
                <router-link to="/setting/user">Người dùng</router-link>
            </div>
        </div>

        <div class="setting-tab-item flex align-items-center cursor-pointer" @click="active(2)" :class="{ 'item-activated' : 2 == this.actived}">
            <div class="icon-tab icon-protect"></div>
            <div class="name-tab">Vai trò</div>
        </div>

        <div class="setting-tab-item flex align-items-center cursor-pointer" @click="active(3)" :class="{ 'item-activated' : 3 == this.actived}">
            <div class="icon-tab icon-multiple-user"></div>
            <div class="name-tab">Nhóm người dùng</div>
        </div>

        <div class="setting-tab-item flex align-items-center cursor-pointer" @click="active(4)" :class="{ 'item-activated' : 4 == this.actived}"> 
            <div class="icon-tab icon-share-link"></div>
            <div class="name-tab">Kết nối</div>
        </div>
    </div>

     <!-- bảng người dùng -->
    <GridUser/>
</template>

<script>
import GridUser from '../../view/user/TableUser.vue'
export default{
  name: "TheMenu" ,
  components: {
    GridUser
  }, 

  data(){
    return {
       actived: 1
    }

  },

  methods:{
    active(id){
        this.actived = id;
    }
  }
}
</script>
