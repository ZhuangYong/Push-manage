import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {page, save, del, productPage, productSave, productDel, saveImg} from '../../api/vipGroup';
import {bindData} from "../../utils/index";

const defaultData = {
    viewRule: [
        {columnKey: 'id', label: '产品id', minWidth: 80},
        {columnKey: 'name', label: '产品名称', minWidth: 130},
        {columnKey: 'remark', label: '备注', minWidth: 120},
        {columnKey: 'updateId', label: '更新id'},
        {columnKey: 'status', label: '状态', formatter: r => {
            if (r.status === 1) return '正常';
            if (r.status === 2) return '禁用';
            if (r.status === 3) return '删除';
        }},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '子产品', type: 'proList'}], minWidth: 190}
    ],
    validateRule: {
        name: [
            {required: true, message: '必须请输入'}
        ],
        remark: [
            {required: true, message: '必须请输入'}
        ],
    },
    listDataGetter: function() {
        return this.channel.vipGroupPage;
    },
    pageAction: 'channel/vipGroup/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [],
    defaultFormData: {
        name: '',
        remark: '',
        status: 1 //1:正常，2：禁用，3：删除

    },
    editFun: save,
    delItemFun: del
};

const childProdcutData = {
    viewRule: [
        {columnKey: 'productId', label: '产品Id', minWidth: 160},
        {columnKey: 'productName', label: '产品名称', minWidth: 130},
        {columnKey: 'vipGroupId', label: '产品分组Id', minWidth: 120},
        {columnKey: 'updateTime', label: '更新时间'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 150}
    ],
    validateRule: {},
    listDataGetter: function() {
        return this.channel.vipGroupProductPage;
    },
    pageAction: 'channel/vipGroup/product/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [],
    defaultFormData: {
        productId: '',
        productName: '',
        vipGroupId: ''
    },
    editFun: productSave,
    delItemFun: productDel
};

export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null,
            pageAction: _defaultData.pageAction
        };
    },
    computed: {
        ...mapGetters(['channel'])
    },
    methods: {
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_VIP_GROUP_SAVE_IMG;
            return (

                this.pageAction === childProdcutData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="产品Id：" prop="productId">
                        <el-input value={this.formData.productId} placeholder="" name="productId"/>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                        <el-input value={this.formData.mac} placeholder="" name="mac"/>
                    </el-form-item>
                    <el-form-item label="产品分组Id：" prop="vipGroup">
                        <el-input value={this.formData.vipGroup} placeholder="" name="vipGroup"/>
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
                </el-form> : <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                      ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="产品名称：" prop="name">
                        <el-input value={this.formData.name} placeholder="" name="name"/>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input value={this.formData.remark} placeholder="" name="remark"/>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                        <el-select value={this.formData.status} name='status'>
                            <el-option label="正常" value={1} key={1}/>
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
        topButtonHtml: function (h) {
            const proList = this.pageAction === childProdcutData.pageAction;
            return (
                this.status === "list" ? <div class="filter-container table-top-button-container">
                    {
                        proList ? <el-button class="filter-item" onClick={() => {this.showList();}} type="primary" icon="caret-left">返回
                        </el-button> : ""
                    }
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        const edit = (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        };
                        const del = (row) => {
                            this.submitDel(row);
                        };
                        const proList = (row) => {
                            this.showList(row.id);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', del);
                        this.$refs.Vtable.$on('proList', proList);
                        this.$refs.Vtable.$on('pageChange', pageChange);
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

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    this.submitForm();
                } else {
                    return false;
                }
            });
        },
        submitForm() {
            this.submitLoading = true;
            this.editFun && this.editFun(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.status = 'list';
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         */
        showList: function (id) {
            this.deviceConfigId = id;
            setTimeout(f => {
                const _deviceUserData = Object.assign({}, id ? childProdcutData : defaultData);
                this.pageAction = _deviceUserData.pageAction;
                this.pageActionSearchColumn = [{
                    id: id
                }];
                this.listDataGetter = _deviceUserData.listDataGetter;
                this.validateRule = _deviceUserData.validateRule;
                this.viewRule = _deviceUserData.viewRule;
                this.delItemFun = _deviceUserData.delItemFun;
                this.defaultFormData = _deviceUserData.defaultFormData;
                if (id) this.defaultFormData = Object.assign({}, this.defaultFormData, {id: id});
                this.enableDefaultCurrentPage = !id;
                this.editFun = _deviceUserData.editFun;
            }, 50);
        },
    }
});
