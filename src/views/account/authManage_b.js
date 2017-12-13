import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    resourceTree, resouceModify, resourceForceDelete, resourceDelete
} from "../../api/resource";
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'id', label: '名称', width: 140},
    {columnKey: 'createUser', label: '创建者'},
    {columnKey: 'seq', label: 'seq'},
    {columnKey: 'status', label: '状态', width: 170},
    {columnKey: 'updateUser', label: '更新用户', width: 170},
    {columnKey: 'description', label: '描述'},
    {columnKey: 'name', label: '名字'},
    {columnKey: 'permission', label: '权限'},
    {columnKey: 'pname', label: '父名'},
    {columnKey: 'url', label: '路径'},
    {columnKey: 'createTime', label: '创建时间'},
    {columnKey: 'updateTime', label: '更新时间'},
    {
        label: '操作',
        buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}],
        width: 170
    }
];
const defaultFormData = {
    pid: '',
    seq: '',
    status: 0,
    description: '',
    name: '',
    permission: '',
    url: ''

};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            formData: defaultFormData, // 表单数据
            roleData: {},
            roles: [],
            owned: [],
            tipTxt: "",
            dialogVisible: false,
            sureCallbacks: function () {
            },
            defaultCurrentPage: 1,
            rules: {

            },
        };
    },
    computed: {
        ...mapGetters(['resource'])
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
                        <el-button class="filter-item" disabled={this.selectItems.length !== 1} type="danger"
                                   onClick={this.forceDelete}>
                            强制删除
                        </el-button>
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = defaultFormData;
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'resource/RefreshPage'} data={this.resource}
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
                         ref="addForm" rules={this.rules} label-position="right" label-width="70px">
                    <el-form-item label="父id" prop="pid">
                        <el-input value={this.formData.pid} name='pid' disabled={this.status !== 'add'}/>
                    </el-form-item>
                    <el-form-item label="seq" prop="seq">
                        <el-input value={this.formData.seq} name='seq'/>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select placeholder="请选择" value={this.formData.status} name='status'>
                            <el-option label="0" value="0" key="0"></el-option>
                            <el-option label="1" value="1" key="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input value={this.formData.description} name='description'/>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input value={this.formData.name} name='name'/>

                    </el-form-item>
                    <el-form-item label="权限" prop="permission">
                        <el-input value={this.formData.permission} name='permission' disabled={this.status !== 'add'}/>
                    </el-form-item>
                    <el-form-item label="url" prop="url">
                        <el-input value={this.formData.url} name='url'/>
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
                resourceDelete(userId).then(response => {
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
        forceDelete: function () {
            this.dialogVisible = true;
            this.tipTxt = "确定要强制删除吗？";
            this.sureCallbacks = () => {
                resourceForceDelete(this.selectItems[0]['id']).then(res => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
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
                    }
                    break;
                case 'add':
                case 'edit':
                    break;
                default:
                    break;
            }
        }
    }
};
