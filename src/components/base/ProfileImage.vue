<template>
    <div class="profile-image" :class="this.color" >
        {{name}}
    </div>
</template>
<style>
    .profile-image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        margin-right: 8px;
        font-weight: 700;
        }
    .color9{
        background: red;
    }

    .color8{
        background: blue;
    }
    .color7{
        background: yellow;
    }
    .color6{
        background: #00ffff;
    }

    .color0{
        background: #ff1493;
    }

    .color1{
        background: #ADFF2F;
    }

    .color2{
        background: #ff8c00;
    }

    .color3{
        background: #D3D3D3;
    }

    .color4{
        background: #FFDEAD;
    }

    .color5{
        background: #FF6347;
    }
</style>

<script>
import Resources from '@/js/resources';
export default {
    props:{

        // mã người dùng
        userCode:{
            type: String,
        }, 
        
        // tên người dùng
        fullNameAvatar: {
            type: String,
        }, 

        // class cho profile image
        styleProfile: {
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
        /**
         * Phân tách khoảng trắng khỏi tên người dùng và thiết lập tên hiển thị cho profileImage
         * Người tạo: Khuất Quang Hoàng
         * Ngày tạo: 11/8/2022 
         */
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
            case Resources.ColorProfileImage.Color9:
                this.color = "color9";
                break;
            case Resources.ColorProfileImage.Color8: 
                this.color = "color8";
                break;
            case Resources.ColorProfileImage.Color7:
                this.color = "color7";
                break;
            case Resources.ColorProfileImage.Color6:
                this.color = "color6";
                break;
            case Resources.ColorProfileImage.Color5:
                this.color = "color5";
                break;
            case Resources.ColorProfileImage.Color4:
                this.color = "color4";
                break;
            case Resources.ColorProfileImage.Color3:
                this.color = "color3";
                break;
            case Resources.ColorProfileImage.Color2:
                this.color = "color2";
                break;
            case Resources.ColorProfileImage.Color1:
                this.color = "color1";
                break;
            case Resources.ColorProfileImage.Color0:
                this.color = "color0";
                break;
            default:
                this.color = "color0";
                break;
        }
    }
}
</script>
