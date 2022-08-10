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
        }
    },
    data() {
        return {
            id: "NV-001",
            name: "KH",
            color: ""
        }
    },
    created(){
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
