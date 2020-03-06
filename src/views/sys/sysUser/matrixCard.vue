
<template>
    <el-dialog title="密保"
               :visible="dialogMcVisible"
               width="500px"
               @open="dialogOpen"
               @close="close"
               :close-on-click-modal="closeOnClickModal">
        <table id="box-table-a" summary="Employee Pay Sheet">
            <thead>
                <tr>
                    <th></th>
                    <th v-for="(item,i) in SecretInsuranceHead">{{item}}</th>
                </tr>
            </thead>
            <tbody v-html="SecretInsuranceBodyHtml"></tbody>

        </table>


        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" ref="submitBtn" :disabled="btnDisabled" @click="sendMx">发 送</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">

    import * as sysUserService from '@/services/Sys/sysUserService';
    import { Component, Prop, Vue } from 'vue-property-decorator';
    @Component({
        components: {

        }
    })

    export default class matrixCard extends Vue {
        @Prop()
        private dialogMcVisible: boolean = false;
        @Prop()
        private sysUser!: any

        // 表单关闭
        public closeOnClickModal: boolean = false;
        public btnDisabled: boolean = false;



        private SecretInsuranceHead: number[] = [];
        private SecretInsuranceBody: number[] = [];
        private SecretInsuranceBodyHtml: string = "";

        //表单是否实现
        private dialogOpen(): void {
            sysUserService.getMatrixCard(this.sysUser.ID).then((data: any) => {
                this.SecretInsuranceHead = data.SecretInsuranceHead.split(',')
                this.SecretInsuranceBody = data.SecretInsuranceBody.split(',')
                let i = 0;
                let siHtml = [];
                for (var k = 0; k < data.Rows; k++) {
                    siHtml.push(`<tr><td>${k}</td>`)
                    for (var l = 0; l < data.Cols; l++) {
                        siHtml.push(`<td>${this.SecretInsuranceBody[i]}</td>`)
                        i++;
                    }
                    siHtml.push('</tr>')
                }

                this.SecretInsuranceBodyHtml = siHtml.join('')
            });
        }

        //表单是否实现
        private close(): void {
            const parent = this.$parent as any;
            parent.dialogMcVisible = false;
        }
        private sendMx(): void {
            this.btnDisabled = true;
            this.btnDisabled = false;
        }


        // 创建后
        mounted() {

        }
    }
</script>
<style>
    #box-table-a {
        font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
        font-size: 12px;
        /*margin: 5px;*/
        width: 460px;
        text-align: left;
        border-collapse: collapse;
        margin-top:-20px;
        margin-bottom:-20px;
    }

        #box-table-a th {
            font-size: 13px;
            font-weight: normal;
            padding: 8px;
            background: #b9c9fe;
            border-top: 4px solid #aabcfe;
            border-bottom: 1px solid #fff;
            color: #039;
        }

        #box-table-a td {
            padding: 8px;
            background: #e8edff;
            border-bottom: 1px solid #fff;
            color: #669;
            border-top: 1px solid transparent;
        }

        #box-table-a tr:hover td {
            background: #d0dafd;
            color: #339;
        }
</style>

