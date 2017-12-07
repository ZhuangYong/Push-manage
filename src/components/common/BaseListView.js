import Vtable from '../../components/Table';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const BaseListView = {
    data() {
        return {
            status: "list", // 页面状态
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            defaultFormData: {},
            formData: {}, // 表单数据
            viewRule: [], // 列表显示字段与规则
            tipTxt: "", // 提示信息
            dialogVisible: false, // 是否显示confirm
            enableDefaultCurrentPage: true, // 是否启用默认页
            defaultCurrentPage: 1, // 默认选择页数
            validateRule: {}, // 校验规则
            pageAction: '', // 列表请求action标志
            pageActionSearchColumn: [], // 列表搜索过滤
            delItemFun: null,
            addItemFun: null,
            updateItemFun: null,
            tableData: '',
            tableCanSelect: true
        };
    },
    computed: {
    },
    created() {
        this.formData = Object.assign({}, this.defaultFormData);
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        const data = (typeof this.listDataGetter === 'string' ? this[this.listDataGetter] : (typeof this.listDataGetter === 'function' ? this.listDataGetter() : {data: []})) || {data: []};
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    this.topButtonHtml(h)
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={this.pageAction} data={data} pageActionSearchColumn={this.pageActionSearchColumn}
                                                     defaultCurrentPage={this.enableDefaultCurrentPage ? this.defaultCurrentPage : 0} select={this.tableCanSelect} viewRule={this.viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
                }
                <ConfirmDialog
                    visible={this.dialogVisible}
                    tipTxt={this.tipTxt}
                    handelSure={this.sureCallbacks}
                    handelCancel={() => {
                        this.dialogVisible = false;
                    }}
                />
            </el-row>
        );
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="left" label-width="70px">
                    请重写cruHtml方法来实现
                    {
                        this.bottomOperationButtonHtml(h)
                    }
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, this.defaultFormData);
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
            );
        },

        bottomOperationButtonHtml(h) {
            return (
                <el-form-item>
                    <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                    <el-button onClick={
                        () => {
                            this.status = "list";
                        }
                    }>取消
                    </el-button>
                </el-form-item>
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit') {
                        this.updateItemFun && this.updateItemFun(this.formData).then(res => {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    } else if (this.status === 'add') {
                        this.addItemFun && this.addItemFun(this.formData).then(res => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const id = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                this.delItemFun && this.delItemFun(id).then(res => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.submitLoading = false;
                });
            };
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },

        // 当图片选择修改的时候
        chooseChange: function (file, fileList, uploadImgItem) {
            if (!this.submitLoading) {
                this.imgChooseFileList = fileList;
                if (fileList.length > 0) {
                    uploadImgItem.$parent.resetField && uploadImgItem.$parent.resetField();
                    if (uploadImgItem.name) this.formData[uploadImgItem.name] = fileList[0].url;
                } else {
                    if (uploadImgItem.name) this.formData[uploadImgItem.name] = "";
                }
            }
        },

        beforeEditSHow: function () {

        },
    },

    extend: function (obj, parent) {
        const pObj = parent || BaseListView;
        if (typeof obj === "object") {
            Object.keys(pObj).map(key => {
               if (typeof pObj[key] === "function") {
                   if (pObj[key].name === "data") {
                       const objData = obj[key].call();
                       obj[key] = function () {
                           return Object.assign({}, pObj.data.call(), objData);
                       };
                   } else {
                       if (typeof obj[key] === 'undefined') {
                           obj[key] = pObj[key];
                       }
                   }
               } else if (typeof pObj[key] === "object") {
                   obj[key] = Object.assign({}, pObj[key], obj[key]);
               } else {
                   if (typeof obj[key] === 'undefined') {
                       obj[key] = pObj[key];
                   }
               }
           });
           return obj;
       }
    }
};

export default BaseListView;
