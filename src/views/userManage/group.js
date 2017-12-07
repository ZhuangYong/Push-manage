import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm/index';

const viewRule = [
    {columnKey: 'name', label: '组名称', minWidth: 120},
    {columnKey: 'channelName', label: '机型', minWidth: 120},
    {columnKey: 'createTime', label: '创建时间', minWidth: 170},
    {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
    {columnKey: 'createName', label: '创建人', minWidth: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '关联设备', type: 'devices'}], minWidth: 120}
];
const defaultAddData = {
    screenIds: []
};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            addData: defaultAddData, // 表单数据
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1
        };
    },
    computed: {
        ...mapGetters(['userManage'])
    },
    created() {
        this.loading = true;
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.addData.screenIds = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'group/RefreshPage'} data={this.userManage.groupPage}
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

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {

        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.submitLoading = true;

        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
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
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        }
    }
};
