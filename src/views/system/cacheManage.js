import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {
    upDelete,
    upSave,
} from "../../api/upgrade";
import {getUpgradeType, bindData} from '../../utils/index';
import uploadApk from '../../components/Upload/singleApk.vue';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as updateApplication, del as delApplication} from "../../api/application";

const defaultData = {
    viewRule: [
        {columnKey: 'key', label: '缓存名', minWidth: 140, sortable: true},
        {columnKey: 'objectNum', label: '对象数', minWidth: 140, sortable: true},
        {columnKey: 'survivalTime', label: '存活时间', imgColumn: 'icon'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    tableCanSelect: false,
    defaultFormData: {
        key: "",
        objectNum: 0,
        survivalTime: -1
    },
    listDataGetter: function() {
        return {
            data: this.system.systemRedisList.data ? this.system.systemRedisList.data.keyPair : []
        };
    },
    pageActionSearch: [
        {column: 'name', label: '请输入应用名称', type: 'input', value: ''},
        {column: 'version', label: '请输入版本号', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'systemRedisList/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
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
            loading: false,
            submitLoading: false,
            rules: validRules,
            fileList: [],
            delItemFun: delApplication
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
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return "";
        },

        topButtonHtml: function(h) {
            return (
                this.status === "list" ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, defaultData.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            console.log(this.formData);
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        console.log("submit");
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
