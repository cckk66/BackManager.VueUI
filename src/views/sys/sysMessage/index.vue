<template>
    <div>
        <myTable>
            <div slot="headerForm" ref="tb_header">
                <el-form ref="searcheForm" :model="searcheForm" class="demo-form-inline el-form--inline">
                    <el-row>
                        <el-form-item prop="Title" label="标题">
                            <el-input v-model="searcheForm.Title"></el-input>
                        </el-form-item>
                        <el-form-item prop="Content" label="内容">
                            <el-input v-model="searcheForm.Content"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearchFormSubmit">
                                查询
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-circle-plus" type="primary" size="mini" @click="add" plain>新增</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-refresh" size="small" @click="handleSearchFormReset">
                                重置
                            </el-button>
                        </el-form-item>
                    </el-row>
                    <!--<el-row>
                        <el-col :span="24" style="padding-bottom:10px;text-align:right">
                            <el-button type="primary" icon="el-icon-refresh" @click="add" size="mini" plain>刷新</el-button>
                        </el-col>
                    </el-row>-->
                </el-form>
                

            </div>
            <div slot="mainTable" ref="tb_main">
                <el-table :data="tableData" ref="mytable" :height="tableHeight">
                    <el-table-column label="标题" prop="Title" sortable="custom">
                        <template slot-scope="scope">
                            {{scope.row.Title}}
                        </template>
                    </el-table-column>

                    <el-table-column label="内容" prop="Content" sortable="custom" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{scope.row.Content}}
                        </template>
                    </el-table-column>

                    <el-table-column label="创建人" prop="CreatedUserName" :show-overflow-tooltip="true">

                        <template slot-scope="scope">
                            {{scope.row.CreatedUserName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="ContractPhone" :show-overflow-tooltip="true">

                        <template slot-scope="scope">
                            {{scope.row.CreatedAt}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改人" prop="UpdatedUserName" :show-overflow-tooltip="true">

                        <template slot-scope="scope">
                            {{scope.row.UpdatedUserName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改时间" prop="UpdatedAt" :show-overflow-tooltip="true">

                        <template slot-scope="scope">
                            {{scope.row.UpdatedAt}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right"
                                     label="操作"
                                     width="100">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footerPagination" ref="tb_footer">
                <el-pagination :current-page="page.current"
                               :page-size="page.size"
                               :total="page.total"
                               :page-sizes="page.pagesizes"
                               layout="total, sizes, prev, pager, next, jumper"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"></el-pagination>

            </div>
        </myTable>
        <editForm 
                  :sysMessage="sysMessage" 
                  :dialogVisible="dialogVisible"
                  @refreshTable="refreshTable"
                  @closeDialog="closeFormDialog"/>
    </div>
   



</template>
<script lang="ts">
    import baseTable from '@/components/baseTable/index.vue'
    import myTable from '@/components/baseTable/myTable.vue'
    import editForm from "./editForm.vue";
    import { Component, Vue } from 'vue-property-decorator';
    import { getsysMessagePage } from '@/services/Sys/sysMessageService';
    @Component({
        components: {
            myTable, editForm
        }
    })
    export default class sysMessageTable extends baseTable {
        //单个分组
        private sysMessage: any = {};
        // 查询条件
        public searcheForm: any = {
            Title: '',
            Content: '',
        }

        public edit(row: any): void {
            const This = this as any;
            This.sysMessage = row;
            This.dialogVisible = true;

        };

        public add(): void {
            const This = this as any;
            This.sysMessage = { ID: 0};
            This.dialogVisible = true;

        };
        public getTableData(): void {
            const This = this as any;

            getsysMessagePage(This.PageQuery()).then((data: any) => {
                This.tableData = data.rows;
                This.page.total = data.total;
            })
        };
        // 创建后
        mounted() {
            this.getTableData();
        }
    }
</script>
