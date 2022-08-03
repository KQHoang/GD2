<template>
    <div class="main-nav">
        <div class="nav-container flex justify-between">
            <div class="flex flex-1">
                <div class="box-app-menu">                   
                </div>
                <a href="" class="nav-logo flex-c-m flex">
                    Quy trình
                </a>
                <div class="top-menu-container flex-1">
                    <div class="flex-m">
                        <div class="menu-item">
                            <div class="menu-item-name">Lượt chạy</div>
                            <div></div> 
                            <!-- div active -->
                        </div>
                        <div class="menu-item">
                            <div class="menu-item-name">Thiết kế quy trình</div>
                            <div></div> 
                            <!-- div active -->
                        </div>
                        <div class="menu-item">
                            <div class="menu-item-name">Báo cáo</div>
                            <div></div> 
                            <!-- div active -->
                        </div>
                        <div class="menu-item active">
                            <div class="menu-item-name">Thiết lập</div>
                            <div class="menu-item-active"></div> 
                            <!-- div active -->
                        </div>
                        <div class="btn-run-process">
                            <MsButton :styleButton="'ms-btn-primary'" :isShowIcon="true" 
                            :iconButtonName="'icon-run-proccess'" 
                            :msButtonText="'Chạy quy trình'"/>
                        </div>
                    </div>
                    <div class="flex-1 flex-r-m"></div>
                </div>
            </div>
            
            <div class="flex-m">
                <div class="flex-m global-search">
                    <div class="ab-c-m"></div>
                    <div class="pre-icon mi-search"></div>
                    <input type="text" class="flex-1 m-l-4" placeholder="Nhập ID, tiêu đề lượt chạy">
                </div>
                <div id="AMIS-Notification" class="apui-notification-trigger"></div> 
                <div class="right-action user">
                    <div class="user-avatar">
                        <div class="apui-user-avatar">
                            <img src="../../assets/img/anh1.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

