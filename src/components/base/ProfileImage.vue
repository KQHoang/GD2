<template>
    <div class="profile-image" :class="this.color">
        {{name}}
    </div>
</template>
<style>
    .profile-image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        margin-right: 8px;
        background: red;
        }
    .red{
        background: red;
    }

    .blue{
        background: blue;
    }
    .yellow{
        background: yellow;
    }
</style>

<script>

export default {
    props:{
        userCode:{
            type: String,
        }, 

        fullNameAvatar: {
            type: String,
        }
    },
    data() {
        return {
            arrayName:[], // mảng sau khi tách full bởi các khoảng trắng
            name: "KH", // tên hiển thị trong avatar
            color: "", // màu sắc hiển thị
        }
    },
    methods: {
        splitSpace(){
            if(this.fullNameAvatar){
                 const s = this.fullNameAvatar;
            this.arrayName = s.split(" ");
            this.name = this.arrayName[this.arrayName.length-2].charAt(0) + this.arrayName[this.arrayName.length-1].charAt(0);
            }   
        }
    },
    created(){
        this.splitSpace();
        const charLast = this.userCode.slice(-1);
        switch (charLast) {
            case "9":
                this.color = "red";
                break;
            case "8": 
                this.color = "blue";
                break;
            case "1":
                this.color = "yellow";
                break;
            default:
                break;
        }
    }
}
</script>
