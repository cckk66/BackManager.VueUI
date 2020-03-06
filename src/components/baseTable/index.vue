<template>
</template>
<script lang="ts">
    import { Component,Vue } from 'vue-property-decorator';
    //import * as sysgroupService from '@/services/Sys/sysgroupService';
    @Component
    export default class Table extends Vue {
       
        //定义获取数据方法子类重写
        public getTableData(): void {

        };
        //定义查询类
        public searcheForm: any = {}
        // 表格数据
        public tableData: any = [];
        //表格分页信息
        public page: any = {
            pagesizes: [10, 30, 100, 200, 400],
            current: 1,
            size: 10,
            total: 0,
            IsPage: true,
        }
        //表格分页排序信息
        private sort: any = {
            prop: "",
            order: "descending",
        }


        // table高
        private tableHeight: number = 0;

        // 页面高
        get pageHeight() {
            return document.body.offsetHeight;
        }
        private handleSizeChange(val: number): void {
            this.page.size = val;
            this.getTableData();
        }
        private handleCurrentChange(val: number): void {
            this.page.current = val;
            this.getTableData();
        }
        //protected getTableData(): void {
        //    sysgroupService.getSysGroupPage(this.PageQuery()).then((data: any) => {
        //        this.tableData = data.rows;
        //        this.page.total = data.total;
        //    })
        //}
        private handleSearchFormSubmit(): void {
            this.page.current = 1;
            this.getTableData();
        }
        private handleSearchFormReset(): void {
            const refName = this.$refs.searcheForm as HTMLFormElement;
            if (refName) {
                refName.resetFields();
            }
            this.handleSearchFormSubmit();
        }

        //获取查询条件
        public PageQuery(): any {
            const This = this as any;
            let query = {
                PageIndex: this.page.current, //当前页码
                PageSize: this.page.size, //显示行数
                OrderBy: this.sort.prop, //排序字段
                IsDesc: this.sort.order === "descending", //是否降序
                IsPage: this.sort.IsPage,
                Filter: {},

            };
            if (this.searcheForm) {
                //query["Filter"] = this.$myFreeze(this.searchForm) //自定义查询
                query.Filter = This.$myCopyFreeze(this.searcheForm); //自定义查询
            }
            return query;
        }
        //编辑页面是否显示
        public dialogVisible: boolean = false
        public closeFormDialog(): void {
            this.dialogVisible = false;
        }
        public refreshTable(): void {
            this.dialogVisible = false;
            this.handleSearchFormSubmit();
        }
        


        // 创建后
        mounted() {
            const This = this;
            this.$nextTick(() => {
                if (This.$refs && Object.keys(This.$refs).length > 0) {

                    let tbHeader: HTMLElement = This.$refs.tb_header as HTMLElement;
                    let tbFooter: HTMLElement = This.$refs.tb_footer as HTMLElement;

                    let tbHeaderOffsetHeight = 0;
                    let tbFooterOffsetHeight = 0;
                    if (tbHeader && tbHeader.offsetHeight) {
                        tbHeaderOffsetHeight = tbHeader.offsetHeight;
                    }
                    if (tbFooter && tbFooter.offsetHeight) {
                        tbFooterOffsetHeight = tbFooter.offsetHeight;
                    }
                    const IntervalHeight = 80;// 间隔高度
                    const thisHeight = (This.pageHeight - tbHeaderOffsetHeight - tbFooterOffsetHeight - IntervalHeight);
                    This.tableHeight = (thisHeight - 25);
                }
            });

        }

    }
</script>

