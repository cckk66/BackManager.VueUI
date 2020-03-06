
<template>
    <el-dialog title="密码修改"
               :visible="dialogMcVisible"
               width="500px"
               @open="dialogOpen"
               v-loading="dialogLoding"
               @close="close"
               :close-on-click-modal="closeOnClickModal">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px" size="small">
            <el-form-item prop="newPassWord" label="新密码">
                <el-input v-model="form.newPassWord"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassWord" label="确认密码">
                <el-input v-model="form.confirmPassWord"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassWord" label="密保" >
               
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" ref="submitBtn" :disabled="btnDisabled" @click="saveSysGroup">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    @Component({
        components: {

        }
    })
     
    export default class matrixCard extends Vue {
        @Prop()
        private dialogMcVisible: boolean = false;

        private form: any = {
            newPassWord: "",
            confirmPassWord:""
        }
        private validateNewPass = (rule: any, value: any, callback: any) => {
            let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).{6,}$/;
            if (!reg.test(value))
                callback(new Error('最少6位，至少包括一个大写字母、一个小写字母、一个数字、一个特殊字符'))
            else
                callback()
        }

        private rules: any = {
            newPassWord: {
                newPassWord: [{ required: true, trigger: 'blur', validator: this.validateNewPass }]
            }
        }
        //表单是否实现
        private dialogOpen(): void {
       
        }

      
        // 创建后
        mounted() {
           
        }
    }
</script>
