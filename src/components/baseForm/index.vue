<template>
</template>
<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
    import { GlobalModule, IHeader } from '@/store/modules/global';
    @Component
    export default class Form extends Vue {
        // 表单是否实现
        @Prop()
        public dialogVisible: boolean = false;
        // 表单关闭
        public closeOnClickModal: boolean = false;

        // 表单提交按钮是否禁用
        public btnDisabled: boolean = false;
        // 弹窗加载
        public dialogLoding: boolean = false;
        // 表单数据 
        public form: any = {};
        // 表单验证
        public rules: any = {};
        // 表单原生数据
        public oldForm: any = {};

        @Watch('btnDisabled')
        onBtnDisabledChanged(val: boolean) {
            this.dialogLoding = val;

        }
        // 窗口名称
        public dialogName: string = "";
        get dialogTitle(): string {
            if (this.oldForm.ID > 0) {
                return `${this.dialogName}修改`;
            } else {
                return `${this.dialogName}新增`;

            }
        }


        // 表单重置之后子类重写
        public ResetAfert(): void {

        }
        // 表单重置
        public Reset(): void {
            const refForm = this.$refs.form as HTMLFormElement;
            if (refForm)
                refForm.resetFields();

            this.ResetAfert();
        }

        // 表单获取API
        public getFormData: Function = (postData: any) => { }
        // 表单获取
        public FormRequst(postData: any): void {
            const This = this as any;
            return this.getFormData(postData).then((data: any) => {
                This.oldForm = This.$myFreeze(data);
                This.FormGuidInit();
                return new Promise(function (resolve, reject) {
                    resolve(data);
                });
            }).catch((err: any) => {
                return new Promise(function (resolve, reject) {
                    reject(err);
                });
            })
        }
        // 表单唯一标识吗设置
        public FormGuidInit(): void {
            const This = this as any;
            This.GUID = This.$GUID();
        }
        // 警告提示框
        public warningBox(msg: string): void {
            const This = this as any;
            This.$warningBox(msg);
            this.btnDisabled = false;
        }
        // 正确提示框
        public successBox(msg: string): void {
            const This = this as any;
            This.$successBox(msg);
        }
        // 表单提交
        public SubmitFunApi: Function = (postData: any) => { }
        // 表单提交
        public FormSubmit(postData: any): Promise<any> {
            const This = this as any;
            this.btnDisabled = true;
            const refForm = this.$refs["form"] as HTMLFormElement;
            let formValid: boolean = false;
            refForm.validate((valid: any, object: any) => {
                formValid = valid;
                console.log(`表单验证未通过`);
                console.log(object);
            });
            if (formValid) {
                // 表单唯一标识
                GlobalModule.setRequestHeaders([{ key: "BmForm", value: This.GUID }]);

                return this.SubmitFunApi(postData)
                    .then((data: any) => {
                        this.btnDisabled = false;
                        return new Promise(function (resolve, reject) {
                            resolve(data);
                        });
                    }).catch((err: any) => {
                        this.btnDisabled = false;
                        return new Promise(function (resolve, reject) {
                            reject(err);
                        });
                    })
            } else {
                this.btnDisabled = false;
                return new Promise(function (resolve, reject) {
                    reject("当前页面未通过验证,请检查");
                });
            }
        }
        // 根据定义好的form规则 赋值表单
        public setFormData(data: any, myform: any = null): any {
            let form: any = {};
            const This = this;
            if (myform === null) {
                myform = This.form;
            }

            const setForm = (myData: any) => {
                for (let item in myData) {
                    if (myform.hasOwnProperty(item)) {
                        form[item] = myData[item];
                    }
                }
            }

            if (myform && data) {
                setForm(data);
            }
            return form;
        }
        // 关闭表单
        public close() {
            this.Reset();
            this.$emit("closeDialog");//通知列表页面关闭弹窗
        }
        public closeDialog(): void {
            this.close();
            this.$emit("closeDialog");//通知列表页面关闭弹窗
        }
        public refreshTable(): void{
            this.close();
            this.$emit("refreshTable");//通知列表页面关闭弹窗
        }
        
    }
</script>
