<template>
    <div>
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" type="danger" @click="forceDeleteRole"
            >强制删除
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="addRole = true " type="primary"
                       icon="edit">添加
            </el-button>
        </div>

        <div v-if="flag">
            <Tabletemp :field="field" :dataList="dataList" :operField="operField"
                       @handleRowClick="handleRowClick" @deleteInfo="deleteInfo" @modifyInfo="modifyInfo"></Tabletemp>
            <Pager :totalRow="totalRow" :listParam="listParam" @updateData="updateData"></Pager>
        </div>
        <el-dialog title="添加信息" :visible.sync="addRole">
            <el-form class="small-space" :model="addForm" ref="addForm" :rules="rules" label-position="right"
                     label-width="70px"
                     style='width: 400px; margin-left:50px;'>
                <el-form-item label="父id:" prop="pid">
                    <el-input v-model="addForm.pid"></el-input>
                </el-form-item>
                <el-form-item label="排序:" prop="seq">
                    <el-input v-model="addForm.seq"></el-input>
                </el-form-item>
                <el-form-item label="状态:" prop="status">
                    <el-input v-model="addForm.status"></el-input>
                </el-form-item>
                <el-form-item label="描述:" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="资源名:" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限:" prop="permission">
                    <el-input v-model="addForm.permission"></el-input>
                </el-form-item>
                <el-form-item label="url:" prop="url">
                    <el-input v-model="addForm.url"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAdd('addForm')">提交</el-button>
                    <el-button @click="addRole = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <ConfirmDialog :dialogVisible="dialogVisibles" :tipTxt="tipTxts" :sureCallback="sureCallbacks"
                       @cancelConfirm="cancelConfirm"></ConfirmDialog>
    </div>
</template>
<script>
    import Tabletemp from 'components/table';
    import Pager from 'components/pager';
    import ConfirmDialog from 'components/confirm';
    import {
        resourceDelete,
        resourceForceDelete,
        resouceModify,
        resourceList,
        resourceTree
    } from 'api/resource';
    export default {
        name: 'layout',
        components: {
            Tabletemp,
            Pager,
            ConfirmDialog
        },
        data() {
            return {
                id: '', //只有选中一行时用到这个
                field: [
                    "id",
                    "name",
                    "createUser",
                    "description",
                    "pname",
                    "permission",
                    "url"
                ],
                operField: [
                    {
                        name: "编辑",
                        fn: "modifyInfo",
                        type: "success"
                    },
                    {
                        name: "删除",
                        fn: "deleteInfo",
                        type: "danger"
                    }
                ],
                dataList: [],
                listParam: {
                    currentPage: 1,
                    pageSize: 10
                },
                totalRow: 0,
                flag: false,
                dialogVisibles: false,
                tipTxts: '',
                sureCallbacks: function () {
                },
                addRole: false,
                addForm: {
                    id: '',
                    pid: '',
                    seq: '',
                    status: '',
                    description: '',
                    name: '',
                    permission: '',
                    url: ''
                },
                rules: {
                    name: [
                        {required: true, message: '资源名称不能为空', trigger: 'blur'},
                        {min: 1, max: 16, message: '资源名称不能为空', trigger: 'blur'}
                    ],
                    pid: [
                        {required: true, message: '父资源不能为空', trigger: 'blur'},
                        {min: 1, max: 16, message: '父资源不能为空', trigger: 'blur'}
                    ],
                    permission: [
                        {required: true, message: '权限设置不能为空', trigger: 'blur'},
                        {min: 1, max: 16, message: '权限设置不能为空', trigger: 'blur'}
                    ]
                }

            };
        },
        created() {
            this.getDataList(this.listParam);
        },
        methods: {
            getDataList(postData) {
                resourceList(postData).then(response => {
                    console.log(response);
                    var data = response.data;
                    this.dataList = response.data;
                    this.totalRow = response.totalRow;
                    this.flag = true;

                });
            },
            handleRowClick(row) {
                this.id = row.id;
            },
            updateData(msg) {
                this.listParam = msg;
                this.getDataList(this.listParam);
                this.id = '';
            },
            forceDeleteRole() {
                if (this.id === '') {
                    this.$message({
                        message: "请先选择行"
                    });
                    return false;

                }
                this.dialogVisibles = true;
                this.tipTxts = "确定要强制删除吗？";
                const userId = this.id;
                const getData = this.getDataList;
                const listParams = this.listParam;

                console.log("哈哈哈哈");
                this.sureCallbacks = function () {
                    resourceForceDelete(userId).then(res => {
                        this.dialogVisibles = false;
                        getData(listParams);
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    });
                };
            },
            deleteInfo(row) {
                this.dialogVisibles = true;
                this.tipTxts = "确定要删除吗？";
                const userId = row.id;
                const getData = this.getDataList;
                const listParams = this.listParam;
                this.sureCallbacks = function () {
                    resourceDelete(userId).then(response => {
                        getData(listParams);
                        this.dialogVisibles = false;
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    });
                };
            },
            modifyInfo(row) {
                this.editForm = row;
                this.editRole = true;
            },
            submitAdd(formName) {
                var postData = {
                    pid: this.addForm.pid,
                    seq: this.addForm.seq,
                    status: this.addForm.status,
                    description: this.addForm.description,
                    name: this.addForm.name,
                    permission: this.addForm.permission,
                    url: this.addForm.url

                };
                console.log(postData)
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        resouceModify(postData).then(response => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.addRole = false;
                            this.getDataList(this.listParam);
                        });
                    }


                });

            },
            cancelConfirm() {
                this.dialogVisibles = false;
            }

        }

    };
</script>
<style>
    .filter-container {
        padding-top: 20px;
    }
</style>
