<template>
    <div class="navbar" mode="horizontal">
        <Hamburger class="hamburger-container"
                   :toggle-click="toggleSideBar"
                   :is-active="sidebar.opened" />
        <Breadcrumb />
        <el-menu class="el-menu-demo" mode="horizontal" style="float:right">
            <el-menu-item index="1">


                <el-badge v-show="newMessageCount>0" :value="newMessageCount" class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>



            </el-menu-item>
            <el-menu-item index="2">
                <div class="user-info">
                    <img :src="userHead" @click="signalTest" />
                </div>
            </el-menu-item>
        </el-menu>

        <!--<el-row :gutter="20" style="float:right">
            <el-col :span="5">
                <i class="el-icon-bell"></i>
                <span id="badge">1000</span>
            </el-col>

            <el-col :span="4" style="float:left">
                <div class="user-info">
                    <img :src="userHead" />
                </div>
            </el-col>
            <el-col :span="1" style="padding-left: 0px!important; padding-right: 0px!important;">
                <el-dropdown class="avatar-container" trigger="click">
                    <div class="avatar-wrapper">
                        <i class="el-icon-caret-bottom"></i>
                    </div>

                    <el-dropdown-menu slot="dropdown" class="user-dropdown">
                        <router-link class="inlineBlock" to="/">
                            <el-dropdown-item>Home</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided>
                            <span style="display:block;" @click="logout">LogOut</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>-->
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Hamburger from './Hamburger/index.vue';
    import Breadcrumb from './Breadcrumb/index.vue';
    import { AppModule } from '@/store/modules/app';
    import * as  MySignalR from '@/utils/SignalR'
    import { UserModule } from '@/store/modules/user';
    import { GlobalModule } from '@/store/modules/global';
    import { getNewSysMessageCount } from '@/services/Sys/sysMessageService';
    import { getLocalStorage } from '@/utils/auth';
    @Component({
        components: { Hamburger, Breadcrumb },
    })
    export default class NavBar extends Vue {
        get sidebar() {
            return AppModule.sidebar;
        }
        get newMessageCount() {

            return GlobalModule.newMessageCount;
        }
        private userHead: string = require("@/assets/userhead.png");

        private dialogVisible: boolean = false;
        //弹窗请求测试总耗时
        private count: number = 0
        // //弹窗请求测试剩余耗时
        private specificNumbe: number = 0

        toggleSideBar() {
            AppModule.ToggleSideBar(false);
        }
        logout() {
            UserModule.Logout().then(() => {
                window.location.reload();
            });
        }

        //消息对象
        private mySignalR: MySignalR.MySignalR = new MySignalR.MySignalR();


        private setNewMessageCount(): void {
            getNewSysMessageCount().then((m) => {
                let newCount: number = parseInt(String(m));
                GlobalModule.setNewMessageCount(newCount);
            });
        }
        private signalTest(): void {
            const This = this as any;
            //发送

            This.mySignalR.send("SendClientByUser", UserModule.userID, UserModule.userID, { title: '111', content: '11111' })
                .then(() => {
                    alert(111)
                });

        }
        // 创建后
        mounted() {

            UserModule.GetUserInfo().then((userInfo) => {

                if (userInfo && userInfo.userID > 0) {
                    const baseURL = process.env.VUE_APP_URL;
                    const This = this as any;
                    This.mySignalR.url = baseURL + "/chathub?userId=" + userInfo.userID;
                    //广播消息
                    This.mySignalR.on("sysMessage", (title: string, content: string) => {
                        this.$message('您有新消息了');
                        this.setNewMessageCount();
                    });
                    //指定客户端消息接收
                    This.mySignalR.on("userMessageReceived", (title: string, content: string) => {
                        this.$message('您有新消息了');
                        this.setNewMessageCount();
                    });
                    This.mySignalR.on("testOpen", (count: number, specificNumbe: number) => {
                        //this.$message('开始弹窗测试了');
                        this.count = count;
                        this.specificNumbe = specificNumbe;
                        if (this.specificNumbe > 0) {
                            this.dialogVisible = true;
                        } else {
                            this.dialogVisible = false;
                        }
                    });

                    This.mySignalR.start().then(() => {
                        this.setNewMessageCount();
                    }).catch((err: string) => {

                    });
                }
            })
            //发送
            //This.mySignalR.send("SendClientByUser",11, 11, {title: '111', content: '11111')})
            //    .then(() => This.sendusermessage = "");

        }
    }
</script>
<!--<style>
    .el-badge__content {
        padding: 10px 0px 6px 6px !important;
        margin-top: 12px;
        height: 0px !important;
        line-height: 0px !important;
    }
</style>-->
<style lang="less">
    .navbar {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #e6e6e6;
        .hamburger-container

    {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }

    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }

    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper

    {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;
        .user-avatar

    {
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }

    .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
    }

    }
    }
    }
    .el-badge__content.is-fixed {
        top: 12px !important;
    }
</style>
<style scoped lang="scss">
    .el-menu--horizontal > .el-menu-item {
        float: left;
        height: 45px;
        line-height: 45px;
        margin: 0;
        border-bottom: 2px solid transparent;
        color: #909399;
        padding: 0px 30px 0px 0px;
    }


    .user-info {
        width: 40px;
        height: 40px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        img

    {
        width: 40px;
        height: 40px;
    }

    }

    .el-menu-item [class^=el-icon-] {
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 30px;
        vertical-align: middle;
    }
  

</style>