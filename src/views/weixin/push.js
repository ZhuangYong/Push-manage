import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {pushDelete, save as savePush} from '../../api/weixinPush';

const defaultData = {
    defaultFormData: {
        name: '',
        eventType: 1,
        sort: 1,
        isEnabled: 1,
        msgType: 1,
        materialId: '',
        materialTitle: '',
        content: ''
    },
    viewRule: [
        {columnKey: 'name', label: '推送名称', minWidth: 170, sortable: true},
        {columnKey: 'eventType', label: '事件类型', minWidth: 120, formatter: r => {
            if (r.eventType === 1) return '登录';
            if (r.eventType === 2) return '关注';
        }},
        {columnKey: 'msgType', label: '类型', minWidth: 120, formatter: r => {
            if (r.msgType === 1) return '图文消息';
            if (r.msgType === 2) return '文字消息';
        }},
        {columnKey: 'content', label: '内容', minWidth: 120},
        {columnKey: 'sort', label: '推送顺序', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 80, formatter: r => {
            if (r.isEnabled === 1) return '是';
                return '否';
        }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
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
    listDataGetter: function() {
        return this.weixin.pushPage;
    },
    pageAction: 'weixin/push/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [{
        column: 'name', label: '请输入推送名称', type: 'input', value: ''
    }],
    tableCanSelect: false,
    editFun: savePush,
    delItemFun: pushDelete
};

const chooseMaterialData = {
    viewRule: [
        {columnKey: 'name', label: '图文消息名称', minWidth: 140},
        {columnKey: 'ossImage', label: '头图', minWidth: 80, imgColumn: 'ossImage'},
        {columnKey: 'title', label: '头图标题', minWidth: 100},
        {columnKey: 'url', label: 'URL', minWidth: 180},
    ],
    listDataGetter: function() {
        return this.weixin.materialPage;
    },
    tableCanSelect: true,
    pageAction: 'weixin/material/RefreshPage'
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
            formData: _defaultData.defaultFormData,
            selectItem: null,
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null,
            pageAction: _defaultData.pageAction
        };
    },

    computed: {
        ...mapGetters(['weixin'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_PRODUCT_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="推送名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                   <el-form-item label="事件类型">
                        <el-radio-group value={this.formData.eventType} name="eventType">
                            <el-radio value={1} label={1}>登录</el-radio>
                            <el-radio value={2} label={2}>关注</el-radio>
                         </el-radio-group>
                    </el-form-item>
                    <el-form-item label="推送顺序：" prop="sort">
                        <el-input value={this.formData.sort} placeholder="" name="sort" number/>
                    </el-form-item>
                    <el-form-item label="是否开启：">
                        <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                         </el-radio-group>
                    </el-form-item>
                    <el-form-item label="消息类型：">
                        <el-radio-group value={this.formData.msgType} name="msgType">
                            <el-radio value={1} label={1}>图文消息</el-radio>
                            <el-radio value={2} label={2}>文字消息</el-radio>
                         </el-radio-group>
                    </el-form-item>
                    {
                        this.formData.msgType === 2 ? <el-form-item label="文字内容：" prop="content">
                                                              <el-input value={this.formData.content} name='content' onChange={v => this.formData.content = v}/>
                                                          </el-form-item> : ''
                    }
                    {
                        this.formData.msgType === 1 ? <el-form-item label="从素材管理里面选择：" prop="materialId">
                                {
                                    this.formData.materialId ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                        this.selectItem = null;
                                        this.formData.materialId = '';
                                        this.formData.materialTitle = '';
                                    }}>
                                        {this.formData.materialTitle}
                                    </el-tag> : <el-button type="primary" onClick={f => {
                                        this.goPage(this.PAGE_LIST);
                                        this.showList("", true);
                                    }}>点击选择</el-button>
                                }
                                </el-form-item> : ''
                    }

                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={f => {
                            this.showList();
                            this.pageBack();
                        }}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {

            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_ADD);
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
            );
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitForm();
                }
            });
        },

        /**
         * 提交表单
         */
        submitForm() {
            this.applyApiDurFun(this.editFun, r => {
                this.pageBack();
                this.showList();
                this.refreshTable();
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            if (selectedItems.length === 1) {
                this.selectItem = selectedItems[0];
                const {name, id} = this.selectItem;
                this.formData.materialTitle = name;
                this.formData.materialId = id;
                this.pageBack();
            } else {
                this.selectItem = null;
                this.formData.materialId = '';
                this.formData.materialTitle = '';
            }
        },

        /**
         *
         * @param choosePage
         * @returns {any}
         */
        getDataWhenShowListChange(choosePage) {
            return choosePage ? Object.assign({}, chooseMaterialData) : defaultData;
        }
    }
});
