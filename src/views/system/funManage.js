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
        {columnKey: 'name', label: '功能名'},
        {columnKey: 'functionCode', label: '功能编号'},
        {columnKey: 'pageName', label: '页面'},
        {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
            if (r.status === 1) return '生效';
            if (r.status === 2) return '禁用';
            if (r.status === 3) return '删除';
        }},
        {columnKey: 'createTime', label: '创建日期'},
        {columnKey: 'updateTime', label: '更新日期'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
    ],
    tableCanSelect: false,
    defaultFormData: {
        name: '',
        functionCode: '',
        pageId: '', //通过getPageList()函数获得列表
        status: 1, //1生效，2禁用，3删除
        createTime: '',
        updateTime: ''
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
                         ref="addForm" rules={this.rules} label-position="right" label-width="90px">
                    <el-form-item label="功能名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入功能名称"/>
                    </el-form-item>
                    <el-form-item label="功能ID" prop="functionCode">
                        <el-input value={this.formData.functionCode} name='functionCode' placeholder="功能ID"/>
                    </el-form-item>
                    <el-form-item label="页面" prop="pageId">
                        <el-select placeholder="请选择" value={this.formData.pageId} name='pageId'>
                            {
                                this.pageList && this.pageList.map(item => (
                                    <el-option
                                        key={item.id}
                                        label={item.name}
                                        value={item.id}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select placeholder="请选择" value={this.formData.status || 1} name='status'>
                            <el-option label="生效" value={1} key={1}/>
                            <el-option label="禁用" value={2} key={2}/>
                            <el-option label="删除" value={3} key={3}/>
                        </el-select>
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
                defaultData.defaultFormData.pageId = res[0].id;
                this.formData.pageId = res[0].id;
            }).catch((err) => {
            });
        },
    }
});
