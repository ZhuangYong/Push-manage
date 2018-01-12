import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData} from '../../utils/index';
import {systemRedisClearCache, systemRedisDeleteAndCreateIndex, systemRedisSaveCache} from "../../api/cacheManage";
import {adminTypeGroupDelete, adminTypeGroupSave} from "../../api/typeGroupManage";

const defaultData = {
    viewRule: [
        {columnKey: 'groupName', label: '分组名称', minWidth: 140, sortable: true},
        {columnKey: 'isEnabled', label: '状态', formatter: r => {
            if (r.isEnabled === 1) return '生效';
            if (r.isEnabled === 2) return '禁用';
        }, minWidth: 120},
        {columnKey: 'sort', label: '排序', minWidth: 140, sortable: true},
        {columnKey: 'createName', label: '创建者', minWidth: 140, sortable: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 180, sortable: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 180, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    tableCanSelect: false,
    defaultFormData: {
        id: null,
        groupName: null,
        isEnabled: 1,
        sort: null,
        isLeike: null
    },
    listDataGetter: function() {
        return this.operate.adminTypeGroupList;
    },
    pageActionSearch: [],
    pageActionSearchColumn: [],
    pageAction: 'adminTypeGroupList/RefreshPage'
};

const validRules = {
    groupName: [
        {required: true, message: '分组名称不能为空', trigger: 'blur'},
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
            pagination: _defaultData.pagination,
            loading: false,
            submitLoading: false,
            rules: validRules,
            delItemFun: adminTypeGroupDelete
        };
    },
    computed: {
        ...mapGetters(['operate'])
    },
    mounted() {
        this.updateView();
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

            const options = [
                {isEnabled: 1, label: "生效"},
                {isEnabled: 2, label: "禁用"}
            ];

            return <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                            ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                <el-form-item label="分组名称" prop="groupName">
                    <el-input value={this.formData.groupName} name='groupName' placeholder="请输入分组名称" disabled={parseInt(this.formData.isLeike, 10) === 1}/>
                </el-form-item>

                <el-form-item label="设备状态：">
                    <el-select placeholder={'请选择'} value={this.formData.isEnabled} name='isEnabled' disabled={parseInt(this.formData.isLeike, 10) === 1}>
                        {
                            options.map(item => <el-option
                                key={item.isEnabled}
                                label={item.label}
                                value={item.isEnabled}>
                            </el-option>)
                        }
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input value={this.formData.sort} name='sort' placeholder="请输入排序数"/>
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
            </el-form>;
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            console.log(this.formData);
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;

                    adminTypeGroupSave(this.formData).then(res => {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.submitLoading = false;
                        this.status = 'list';
                    }).catch(err => {
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    });
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
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            for (let key in this.defaultFormData) {
                                this.formData[key] = row[key];
                            }
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
        }
    }
});
