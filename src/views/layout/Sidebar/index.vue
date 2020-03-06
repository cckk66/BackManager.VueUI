<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :show-timeout="200"
                 :default-active="$route.path"
                 :collapse="isCollapse"
                 mode="vertical"
                 background-color="#304156"
                 text-color="#bfcbd9"
                 active-text-color="#409EFF">
            <SubMenu v-for="route in routes"
                     :key="route.path"
                     :base-path="route.path"
                     :item="route"></SubMenu>
        </el-menu>
    </el-scrollbar>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import SubMenu from '@/views/layout/Sidebar/SubMenu.vue';
    import { GlobalModule } from '@/store/modules/global';
    import { AppModule } from '@/store/modules/app';
    @Component({
        components: {
            SubMenu,
        },
    })
    export default class SideBar extends Vue {
        get routes() {
            // const routes = (this.$router as any).options.routes;
            const routes = GlobalModule.routers;
            return routes
        }
        get isCollapse() {
            return !AppModule.sidebar.opened;
        }
    }
</script>
<style>

    .el-scrollbar {
    top:49px!important
    }
</style>