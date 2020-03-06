<template>
    <el-dialog title="分组菜单授权"
               :visible="dialogPowerVisible"
               @open="dialogOpen"
               @close="close"
               :close-on-click-modal="closeOnClickModal">
        <div style="height:500px;overflow-y:auto;padding:10px">

            <el-tree :data="TreeData"
                     show-checkbox
                     ref="treeMp"
                     node-key="nodeKey"
                     :default-expanded-keys="expandedKeys"
                      :default-checked-keys="checkdKeys"
                     :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span><i :class="data.Icon"></i>{{  node.label }}</span>
                    <span style="padding-left:20px">
                        <el-tag size="mini" v-if="data.GroupMenuType===1">菜单</el-tag>
                        <el-tag size="mini" v-else type="success">按钮</el-tag>
                    </span>
                </span>
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" ref="submitBtn" @click="saveGroupMenuPower">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
    import { getGroupMenuDto, saveGroupMenuPower } from '@/services/Sys/sysgroupService';
    import { Tree } from 'element-ui';
    @Component({
        components: {

        }
    })
    export default class groupMenuPower extends Vue {
        // 表单是否实现
        @Prop()
        public dialogPowerVisible: boolean = false;

        @Prop()
        private sysGroup!: any

        // 查询条件
        public searcheForm: any = {


        }
        // 表单关闭
        public closeOnClickModal: boolean = false;

        private dialogOpen(): void {
            const This = this as any;
            this.getTreeData();
        }
        private TreeData: any = [];
        private expandedKeys: number[] = []
        private checkdKeys: number[] = []
        public getTreeData(): void {
            const This = this as any;

            getGroupMenuDto(This.sysGroup.ID).then((data: any) => {
                This.TreeData = data.Item1;
                This.expandedKeys = data.Item2;
                debugger
                This.checkdKeys = data.Item3;
            })
        };
        private saveGroupMenuPower(): void {
            const This = this as any;

            const treeMp = this.$refs.treeMp as Tree
            let checkedNodes = treeMp.getCheckedNodes();
            //let checkedKeys = treeMp.getCheckedKeys();
            let saveNodes:any[] = [];
            checkedNodes.forEach((item: any) => {
                saveNodes.push({
                    ID: item.ID,
                    FatherID: item.FatherID,
                    GroupMenuType: item.GroupMenuType
                })
            });
            saveGroupMenuPower(This.sysGroup.ID, saveNodes).then((data: any) => {
                const This = this as any;
                if (data) {
                    This.$successBox("授权成功");
                
                } else {
                 
                    This.$warningBox("授权失败，请稍后再试！");
                }
                This.close();
            })
            //console.log(checkedKeys);

        }
        private close(): void {
            const This = this as any;
            This.expandedKeys = []
            This.checkdKeys = []

            const parent = this.$parent as any;
            parent.dialogPowerVisible = false
        }
        // 创建后
        mounted() {

        }
    }
</script>
