<template>
    <el-container>
        <el-header>
            <slot name="headerForm"></slot>
            

        </el-header>
        <el-main >
            <slot name="mainTable"></slot>
        </el-main>
        <el-footer>
            <slot name="footerPagination"></slot>
        </el-footer>

    </el-container>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class myTable extends Vue {
        // 页面主页高
        public tbMainHeight: string = '800px';


    }
</script>
<style lang="less" scoped>

    .el-header {
        padding: 15px 15px 0px 15px !important;
        margin: 10px 15px 10px 15px !important;
        background-color: #fff;
        color: #333;
        margin: 10px;
        height: auto !important;
        text-align: left
    }

    .el-footer {
        height: auto !important;
        text-align: right
    }

    .el-main {
        color: #333;
        text-align: center;
        padding: 0px 15px 10px 15px !important;
    }
</style>
<style>
    /* 滚动条的整体样式 */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    /* 滚动条的滚动轨迹 */

    ::-webkit-scrollbar-track {
        border-radius: 8px;
        /*background-color: hotpink;*/
        -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.2) inset;
    }
    /* 滚动条上面的小滑块 */

    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        /*background-color: pink;*/
    }
</style>