import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import {funcSave, funGroupDelete, funcSaveFunctions, funcDeleteFunctions} from '../../api/functionGroup';

const defaultData = {
    defaultFormData: {
        name: '',
        remark: ''
    },
    viewRule: [
        {columnKey: 'name', label: '分组名称', minWidth: 170, sortable: true},
        {columnKey: 'remark', label: '备注', minWidth: 170, sortable: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '功能管理', type: 'funManage'}], minWidth: 234}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入推送名称'}
        ],
        materialId: [
            {required: true, message: '请选择素材'}
        ],
        content: [
            {required: true, message: '请输入文字内容'}
        ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字'},
        ]
    },
    tableCanSelect: false,
    listDataGetter: function() {
        return this.system.funGroupPage;
    },
    pageAction: 'fun/group/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [{
        column: 'name', label: '请输入分组名称', type: 'input', value: ''
    }],
    enableDefaultCurrentPage: true,
    editFun: funcSave,
    delItemFun: funGroupDelete
};

const funListData = {
    viewRule: [
        {columnKey: 'name', label: '已选择功能名称', minWidth: 120},
        {columnKey: 'functionCode', label: '功能编号', minWidth: 120},
        {columnKey: 'pageName', label: '页面名称', minWidth: 120},
    ],
    pageActionSearch: [],
    tableCanSelect: true,
    listDataGetter: function() {
        return this.system.funGroupFunListPage;
    },
    enableDefaultCurrentPage: false,
    pageActionSearchColumn: [],
    pageAction: 'fun/group/funList/RefreshPage'
};

const chooseFunData = {
    defaultFormData: {
        functionCodes: '',
        groupUuid: ''
    },
    viewRule: [
        {columnKey: 'name', label: '功能名', minWidth: 120, sortable: true},
        {columnKey: 'functionCode', label: '功能编号', minWidth: 120, sortable: true},
        {columnKey: 'pageName', label: '页面', minWidth: 100, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 80, formatter: r => {
            switch (r.isEnabled) {
                case 1:
                    return '是';
                case 2:
                    return '否';
                default:
                    return '否';
            }
        }, inDetail: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 170, sortable: true},
    ],
    listDataGetter: function() {
        return this.system.funManage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
    ],
    enableDefaultCurrentPage: false,
    pageActionSearchColumn: [],
    functionCodes: [],
    pageAction: 'fun/RefreshPage',
    tableCanSelect: true,
    editFun: funcSaveFunctions
};

export default BaseListView.extend({
    name: 'materialIndex',
    components: {
        uploadImg
    },
    watch: {
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            preStatus: [],
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            selectItem: null,
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null,
            pageAction: _defaultData.pageAction,
            groupUuid: ''
        };
    },

    computed: {
        ...mapGetters(['system'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="分组名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" row={4} value={this.formData.remark} placeholder="" name="remark"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.goPage(this.PAGE_LIST);
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        this.pageAction !== defaultData.pageAction ? <el-button class="filter-item" onClick={e => {

                            if (this.pageAction === chooseFunData.pageAction) {
                                this.showList(this.groupUuid);
                            } else {
                                this.showList();
                            }
                        }} type="primary">返回</el-button> : ""
                    }
                    <el-button class="filter-item" onClick={
                        () => {
                            if (this.pageAction === chooseFunData.pageAction) {
                                this.submitAddOrUpdate();
                            } else if (this.pageAction === funListData.pageAction) {
                                this.showList(this.groupUuid, true);
                            } else {
                                this.goPage(this.PAGE_ADD);
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                            }
                        }
                    } type="primary" icon="edit" >{this.pageAction === chooseFunData.pageAction ? "保存" : "添加功能"}
                    </el-button>
                    {
                        this.pageAction === funListData.pageAction ? <el-button class="filter-item" disabled={this.selectItems.length < 1} type="danger" onClick={e => {
                            const param = {
                                functionCodes: this.formData.functionCodes,
                                groupUuid: this.groupUuid
                            };
                            this.submitLoading = true;
                            funcDeleteFunctions(param).then(r => {
                                this.$refs.Vtable.refreshData({
                                    currentPage: this.defaultCurrentPage
                                });
                                this.submitLoading = false;
                            }).catch(e => this.submitLoading = false);
                        }}>
                            删除
                        </el-button> : ""
                    }

                </div> : ""
            );
        },

        showList: function (id, choosePage, refreshPage) {
            this.groupUuid = id;
            setTimeout(f => {
                const _thisData = choosePage ? Object.assign({}, chooseFunData) : Object.assign({}, id ? funListData : defaultData);
                Object.keys(_thisData).map(key => {
                    this[key] = _thisData[key];
                });
                this.formData = this.defaultFormData;
                this.enableDefaultCurrentPage = !id;
                if (id && !choosePage) {
                    this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                    this.pageActionSearchColumn = [{
                        groupUuid: id
                    }];
                } else {
                    this.pageActionSearchColumn = [];
                }
                if (choosePage && id) this.formData.groupUuid = id;
                this.groupUuid = id;
                if (refreshPage) {
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }
            }, 50);
            this.formData.serialNos = [];
        },

        submitAddOrUpdate: function () {
            if (this.$refs.addForm) {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.submitForm();
                    } else {
                        return false;
                    }
                });
            } else {
                this.submitForm();
            }
        },

        submitForm() {
            this.submitLoading = true;
            this.editFun && this.editFun(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.goPage(this.PAGE_LIST);
                if (this.pageAction === chooseFunData.pageAction) this.showList(this.groupUuid);
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
            if (selectedItems.length > 0) {
                this.formData.functionCodes = selectedItems.map(i => i.functionCode);
            } else {
                this.formData.functionCodes = [];
            }
        },

        handelFunManage: function (row) {
            this.showList(row.uuid);
        }
    }
});
