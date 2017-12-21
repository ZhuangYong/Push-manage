import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    pageAdd,
    pageEdit,
    pageSave
} from "../../api/page";
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'name', label: '页面名称'},
    {columnKey: 'pageCode', label: '页面ID'},
    {columnKey: 'createName', label: '创建人'},
    {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
        if (r.status === 1) return '生效';
        if (r.status === 2) return '禁用';
        if (r.status === 3) return '删除';
    }},
    {columnKey: 'createTime', label: '创建时间'},
    {columnKey: 'updateTime', label: '更新时间'},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}], minWidth: 80}
];
const defaultFormData = {
    name: '',
    pageCode: '',
    status: 1 //1生效，2禁用，3删除
};

const validRules = {
    name: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    pageCode: [
        {required: true, message: '页面ID不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
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
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
        };
    },
    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, defaultFormData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'page/RefreshPage'} data={this.system.pageManage}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule}
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
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="90px">
                    <el-form-item label="页面名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入功能名称"/>
                    </el-form-item>
                    <el-form-item label="页面ID" prop="pageCode">
                        <el-input value={this.formData.pageCode} name='pageCode' placeholder="功能ID"/>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select placeholder="请选择" value={this.formData.status} name='status'>
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
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        pageSave(this.formData).then(response => {
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
        handleSelectionChange: function (selectedItems) {
        },
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.loading = false;
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
        }
    }
};
