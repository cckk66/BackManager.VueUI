
<template>
    <el-dialog title="设置菜单排序"
               :visible="dialogSrotVisible"
               width="500px"
               @open="dialogOpen"
               v-loading="dialogLoding"
               @close="closeDialog"
               :close-on-click-modal="closeOnClickModal">

        <el-tree :data="list"
                 node-key="ID"
                 default-expand-all
                 @node-drag-start="handleDragStart"
                 @node-drag-enter="handleDragEnter"
                 @node-drag-leave="handleDragLeave"
                 @node-drag-over="handleDragOver"
                 @node-drag-end="handleDragEnd"
                 @node-drop="handleDrop"
                 draggable
                 :allow-drop="allowDrop"
                 :allow-drag="allowDrag">
        </el-tree>



        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" ref="submitBtn" :disabled="btnDisabled" @click="saveMenuSort">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { getSysMenuPage, saveMenuSort } from '@/services/Sys/sysMenuService';
    @Component({
        components: {

        }
    })
    export default class setMenuSort extends Vue {

        //表单是否实现
        @Prop()
        public dialogSrotVisible: boolean = false
        // 表单加载
        private dialogLoding: boolean = false

        // 表单提交按钮是否禁用
        public btnDisabled: boolean = false;
        // 表单关闭
        public closeOnClickModal: boolean = false;

        private list: any[] = []
        public getTableData(): void {

            const This = this as any;
            This.dialogLoding = true;
            getSysMenuPage({}).then((data: any) => {


                This.list = data.rows;

                This.setList(This.list)

                This.dialogLoding = false;


               
            })
        };


        private setList(lists: any[]) {
            const This = this as any;
            lists.forEach((list) => {
                list["label"] = list["Name"];
                if (list.children && list.children.length>0) {
                    This.setList(list.children);
                }
            })
            //for (let list of lists) {
            //    list["label"] = list["Name"];
            //    if (list.children && list.children.length>0) {
            //        This.setList(list.children);
            //    }
            //}
        }
        private dialogOpen(): void {
            const This = this as any;
            this.getTableData();
        }
        private handleDragStart(node: any, ev: any) {
            console.log('drag start', node);
        }
        private handleDragEnter(draggingNode: any, dropNode: any, ev: any) {
            console.log('tree drag enter: ', dropNode.label);
        }
        private handleDragLeave(draggingNode: any, dropNode: any, ev: any) {
            console.log('tree drag leave: ', dropNode.label);
        }
        private handleDragOver(draggingNode: any, dropNode: any, ev: any) {
            console.log('tree drag over: ', dropNode.label);
        }
        private handleDragEnd(draggingNode: any, dropNode: any, dropType: any, ev: any) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        }
        private handleDrop(draggingNode: any, dropNode: any, dropType: any, ev: any) {
            console.log('tree drop: ', dropNode.label, dropType);
        }
        private allowDrop(draggingNode: any, dropNode: any, type: any) {
            if (dropNode.data.label === '二级 3-1') {
                return type !== 'inner';
            } else {
                return true;
            }
        }
        private allowDrag(draggingNode: any) {
            return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
        }
        private menuSort: { [key: number]: number; } = {};
        // 保存排序
        private saveMenuSort(): void {
            const This = this as any;
            This.btnDisabled = true;
            This.menuSort = {};
            This.setMenuSort(This.list);
            saveMenuSort(This.menuSort)
                .then((data: any) => {
                    this.btnDisabled = false;
                    This.refreshTable();
                }).catch((err: any) => {
                    this.btnDisabled = false;
                    This.$errorBox("设置菜单顺序错误,请稍后再试！");
                })
            This.refreshTable();
        }
        private setMenuSort(lists: any[]) {
            const This = this as any;
            lists.forEach((ls: any, index: number) => {
                This.menuSort[ls.ID] = (index+1)
                if (ls.children && ls.children.length > 0) {
                    This.setMenuSort(ls.children);
                }
            })
          
        }

        // 关闭弹窗
        public closeDialog(): void {
            this.$emit("closeDialog");//通知列表页面关闭弹窗
        }
        public refreshTable(): void {
            this.$emit("refreshTable");//通知列表页面关闭弹窗
        }

        // 创建后
        mounted() {
           

        }
    }
</script>
