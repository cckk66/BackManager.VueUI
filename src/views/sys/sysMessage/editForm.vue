
<template>
    <el-dialog :title="dialogTitle"
               :visible="dialogVisible"
               width="800px"
               @open="dialogOpen"
               v-loading="dialogLoding"
               @close="close"
               :close-on-click-modal="closeOnClickModal">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px" size="small">
            <el-form-item prop="Title" label="标题">
                <el-input v-model="form.Title"></el-input>
            </el-form-item>
            <el-form-item prop="Content" label="内容">
                <!--<el-input type="textarea" :rows="3" v-model="form.Content"></el-input>-->
                <bmEditor v-model="form.Content"></bmEditor>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" ref="submitBtn" :disabled="btnDisabled" @click="savesysMessage">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import baseForm from '@/components/baseForm/index.vue'
    import { Component, Prop } from 'vue-property-decorator';
    import * as sysMessageService from '@/services/Sys/sysMessageService';
    import bmEditor from "@/components/bmEditor/index.vue";
    @Component({
        components: {
            bmEditor
        }
    })
    export default class sysMessageTable extends baseForm {
        //表单是否实现

        @Prop()
        private sysMessage!: any

        private dialogOpen(): void {
            const This = this as any;
            if (This.sysMessage && This.sysMessage.ID > 0) {
                This.FormRequst(This.sysMessage.ID).then((formData: any) => {
                    This.form = formData;
                }).catch((err: any) => {

                })
            } else {
                This.FormGuidInit();
                This.form = This.sysMessage;
            }
        }

        private savesysMessage(): void {
            const This = this as any;
            This.FormSubmit(This.form).then((value: any) => {
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
            This.getFormData = sysMessageService.getsysMessage;
            This.SubmitFunApi = sysMessageService.savesysMessage;
            This.rules = {
                Title: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
                Content: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur' }
                ]
            }
            This.dialogName = "系统消息";
        }
    }
</script>
