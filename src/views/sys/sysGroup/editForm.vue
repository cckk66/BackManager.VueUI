
<template>
    <el-dialog :title="dialogTitle"
               :visible="dialogVisible"
               width="500px"
               @open="dialogOpen"
               v-loading="dialogLoding"
               @close="close"
               :close-on-click-modal="closeOnClickModal">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px" size="small">
            <el-form-item prop="GroupName" label="分组名称">
                <el-input v-model="form.GroupName"></el-input>
            </el-form-item>
            <el-form-item prop="Remark" label="备注">
                <el-input type="textarea" :rows="3" v-model="form.Remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" ref="submitBtn" :disabled="btnDisabled" @click="saveSysGroup">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import baseForm from '@/components/baseForm/index.vue'
    import { Component, Prop } from 'vue-property-decorator';
    import * as sysgroupService from '@/services/Sys/sysgroupService';
    @Component({
        components: {

        }
    })
    export default class sysGroupTable extends baseForm {
        //表单是否实现

        @Prop()
        private sysGroup!: any

        private dialogOpen(): void {
            const This = this as any;
            if (This.sysGroup && This.sysGroup.ID > 0) {
                This.FormRequst(This.sysGroup.ID).then((formData: any) => {
                    This.form = formData;
                }).catch((err: any) => {

                })
            } else {
                This.FormGuidInit();
                This.form = This.sysGroup;
            }
        }

        private saveSysGroup(): void {
            const This = this as any;
            This.FormSubmit(This.form).then((value: any) => {
               debugger
                if (value > 0) {
                    This.refreshTable();
                }
                else {
                    This.closeDialog();
                }
            }).catch((err: string) => {
                //This.warningBox(err)
            })
        }
        // 创建后
        mounted() {
            const This = this as any;
            This.getFormData = sysgroupService.getsysGroup;
            This.SubmitFunApi = sysgroupService.saveSysGroup;
            This.rules = {
                GroupName: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                Remark: [
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ]
            }
            This.dialogName = "用户分组";
        }
    }
</script>
