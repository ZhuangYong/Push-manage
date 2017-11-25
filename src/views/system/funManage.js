import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    funDelete,
    funeAdd,
    funeEdit,
    funeSave
} from "../../api/function";
import {getUserType, bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'channelName', label: '机型'},
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
];
const defaultFormData = {
    channelCode: '',
    name: '',
    functionCode: '',
    pageId: '',
    status: '',
    createTime: '',
    updateTime: ''
};

const validRules = {
    name: [
        {required: true, message: '功能名不嫩为空', trigger: 'blur'},
        {min: 1, max: 16, message: '功能名不能为空', trigger: 'blur'}
    ],
    functionCode: [
        {required: true, message: '功能ID不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '功能ID不能为空', trigger: 'blur'}
    ]
};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            formData: defaultFormData, // 表单数据
            channelDefault: '',
            pageDefault: '',
            roles: [],
            owned: [],
            channleList: [],
            pageList: [],
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
            filters: {
                channelCode: '',
                name: '',
                status: ''
            }

        };
    },
    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
        this.getChannelList();
        this.getPageList();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-form model={this.filters} inline ref="filterData">
                            <el-form-item label="">
                                <el-button class="filter-item" onClick={
                                    () => {
                                        this.status = "add";
                                        this.formData = Object.assign({}, defaultFormData);
                                    }
                                } type="primary" icon="edit">添加
                                </el-button>
                            </el-form-item>
                            <el-form-item label="" prop="channelCode">
                                <el-select placeholder="全部机型" value={this.filters.channelCode} name='channelCode'>
                                    {
                                        this.channelList && this.channelList.map(item => (
                                            <el-option
                                                key={item.id}
                                                label={item.name}
                                                value={item.code}>
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" prop="name">
                                <el-input value={this.filters.name} name='name' placeholder="请输入功能名称"/>
                            </el-form-item>
                            <el-form-item label="" prop="status">
                                <el-select placeholder="全部状态" value={this.filters.status} name='status'>
                                    <el-option label="生效" value={1} key={1}/>
                                    <el-option label="禁用" value={2} key={2}/>
                                    <el-option label="删除" value={3} key={3}/>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" onClick={this.searchFilter}>搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'fun/RefreshPage'} data={this.system.funManage}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={viewRule}
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
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="90px">
                    <el-form-item label="机型" prop="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {
                                this.channelList && this.channelList.map(item => (
                                    <el-option
                                        key={item.id}
                                        label={item.name}
                                        value={item.code}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
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

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
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
         * 重置密码
         */
        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            console.log(row);
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
                    bindData(this, this.$refs.filterData);
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                defaultFormData.channelCode = res[0].code;
                this.formData.channelCode = res[0].code;
            }).catch((err) => {
            });
        },
        getPageList: function() {
            this.$store.dispatch("fun/pageList", '').then((res) => {
                this.pageList = res ;
                defaultFormData.pageId = res[0].id;
                this.formData.pageId = res[0].id;
            }).catch((err) => {
            });
        },
        searchFilter: function() {
            this.$refs.Vtable.refreshData({
                currentPage: this.defaultCurrentPage,
                channelCode: this.filters.channelCode,
                name: this.filters.name,
                status: this.filters.status
            });
        }
    }
};
