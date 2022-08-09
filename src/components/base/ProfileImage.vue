<template>
    <div class="profile-image">
        {{name}}
    </div>
</template>
<style>
    .profile-image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #512DA8;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        margin-right: 8px;
        }
</style>

<script>
export default {
    data() {
        return {
            name: "KH"
        }
    },
    created(){
        
    }
}
</script>
