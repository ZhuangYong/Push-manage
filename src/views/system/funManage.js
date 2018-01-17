import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {
    funDelete,
    funeAdd,
    funeEdit,
    funeSave
} from "../../api/function";
import {getUserType, bindData} from '../../utils/index';

const defaultData = {
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
        }},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    tableCanSelect: false,
    defaultFormData: {
        name: '',
        functionCode: '',
        pageCode: '', //通过getPageList()函数获得列表
        isEnabled: 1, //1生效，2禁用
        createTime: '',
        updateTime: '',
        channelCode: ''
    },
    listDataGetter: function() {
        return this.system.funManage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'fun/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '功能名不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    functionCode: [
        {required: true, message: '功能ID不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ]
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            formData: _defaultData.defaultFormData,
            roles: [],
            owned: [],
            pageList: [],
            rules: validRules,
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
        };
    },

    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
        this.getPageList();
        this.refreshChanel();
    },
    updated() {
        this.updateView();
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="120px">
                    <el-form-item label="功能名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入功能名称"/>
                    </el-form-item>
                    <el-form-item label="功能ID" prop="functionCode">
                        <el-input value={this.formData.functionCode} name='functionCode' placeholder="功能ID"/>
                    </el-form-item>
                    <el-form-item label="页面" prop="pageCode">
                        <el-select placeholder="请选择" value={this.formData.pageCode} name='pageCode'>
                            {
                                this.pageList && this.pageList.map(item => (
                                    <el-option
                                        key={item.pageCode}
                                        label={item.name}
                                        value={item.pageCode}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机型名称：" prop="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} onHandleOptionClick={f => this.formData.channelCode = f.value}>
                            {
                                this.system.funChannelList && this.system.funChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function(h) {
            return (
                this.status === "list" ? <div class="filter-container" style="float: left;margin: 12px 12px 12px 0;">
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
            const userId = row.id;
            this.sureCallbacks = () => {
                funDelete(userId).then(response => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.dialogVisible = false;
                });
            };
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.loading = false;
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
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

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        funeSave(this.formData).then(response => {
                            this.$message({
                                message: this.status === 'add' ? "添加成功" : "修改成功",
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
        getPageList: function() {
            this.$store.dispatch("fun/pageList", '').then((res) => {
                this.pageList = res ;
                defaultData.defaultFormData.pageCode = res[0].pageCode;
                this.formData.pageCode = res[0].pageCode;
            }).catch((err) => {
            });
        },

        refreshChanel() {
            this.loading = true;
            this.$store.dispatch("fun/chanelList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
    }
});
