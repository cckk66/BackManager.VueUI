
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
            <el-form-item prop="LoginName" label="用户名称">
                <el-input v-model="form.LoginName"></el-input>
            </el-form-item>
            <el-form-item prop="NiceName" label="用户昵称">
                <el-input v-model="form.NiceName"></el-input>
            </el-form-item>
            <el-form-item prop="ContractPhone" label="联系电话">
                <el-input v-model="form.ContractPhone"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" ref="submitBtn" :disabled="btnDisabled" @click="savesysUser">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import baseForm from '@/components/baseForm/index.vue'
    import { Component, Prop } from 'vue-property-decorator';
    import * as sysUserService from '@/services/Sys/sysUserService';
    @Component({
        components: {

        }
    })
    export default class sysUserTable extends baseForm {
        //表单是否实现

        @Prop()
        private sysUser!: any

        private dialogOpen(): void {
            debugger
            const This = this as any;
            if (This.sysUser && This.sysUser.ID > 0) {
                This.FormRequst(This.sysUser.ID).then((formData: any) => {
                    This.form = formData;
                }).catch((err: any) => {

                })
            } else {
                This.FormGuidInit();
                This.form = This.sysUser;
            }
        }

        private savesysUser(): void {
            debugger
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
            This.getFormData = sysUserService.getsysUser;
            This.SubmitFunApi = sysUserService.savesysUser;
            This.rules = {
                LoginName: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                NiceName: [
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ]
            }
            This.dialogName = "用户管理";
        }
    }
</script>
