<template>
    <div class="app-wrapper" :class="classObj">
        <div v-if=" sidebar.opened" class="logo menu-bar-width" style="background-color: rgb(20, 136, 154);">
            <div>Vue-Ts</div>
        </div>
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <nav-bar></nav-bar>
            <app-main></app-main>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Mixins } from 'vue-property-decorator';
    import SideBar from '@/views/layout/Sidebar/index.vue';
    import NavBar from '@/views/layout/NavBar/index.vue';
    import AppMain from '@/views/layout/AppMain/index.vue';
    import { DeviceType, AppModule } from '@/store/modules/app';
    import ResizeHandlerMixin from '@/views/layout/ResizeHandler';

    @Component({
        components: {
            SideBar,
            NavBar,
            AppMain,
        },
    })
    export default class Layout extends ResizeHandlerMixin {
        get classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: DeviceType.Mobile === this.device,
            };
        }
        handleClickOutside() {
            AppModule.CloseSideBar(false);
        }
    }

</script>
<style lang="less" scoped>
    .menu-bar-width {
        width: 180px;
    }

    .logo {
        position: absolute;
        top: 0;
        height: 50px;
        line-height: 60px;
        background: #545c64;
        cursor: pointer;
    }

        .logo div {
            font-size: 20px;
            color: #fff;
            text-align: left;
            padding-left: 15px;
        }

    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
