<template>
    <div class="content-setting w-full">
        <div class="h-full container body-custom">
            <div class="content-header p-b-16">
                <div class="flex justify-between items-center header-custom">
                    <div class="font-20 bold">Người dùng</div>
                    
                    <MsButton :styleButton="'ms-btn-primary'" :isShowIcon="true" 
                    :iconButtonName="'mi-push-white'" 
                    :msButtonText="'Thêm mới'"/>
                </div>
            </div>

            <div class="content-main">
                <div class="h-full w-full">
                    <div class="flex items-center w-full bg-white" style="height: 60px">
                        <span class="input-search-user">
                            <div class="m-l-12" style="height: 36px;  width:240px ">
                                <div class="ms-input flex w-full">
                                    <div class="ms-icon-default flex items-center justify-center p-l-8">
                                        <i class="ms-icon pre-icon mi-search"></i>
                                    </div>
                                    <input type="text" placeholder="Tìm kiếm người dùng" class="ms-input-item">
                                </div>
                            </div>
                        </span>

                        <span class="select-box-role"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
   name: "TheContent" 
}
</script>
