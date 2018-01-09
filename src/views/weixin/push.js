import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import Vtable from '../../components/Table';
import ConfirmDialog from '../../components/confirm';
import {save as savePush, pushDelete} from '../../api/weixinPush';

const imgFormat = (r, h) => {
    if (r.freeBgImg) return (<img src={r.freeBgImg} style="height: 30px; margin-top: 6px;"/>);
    return '';
};
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
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
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
    pageAction: 'weixin/material/RefreshPage'
};

export default BaseListView.extend({
    name: 'materialIndex',
    components: {
        uploadImg
    },
    watch: {
        status: function (v, ov) {
            if (v === 'list') {
                const _defaultData = Object.assign({}, defaultData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            } else if (v === 'chooseMaterial') {
                const _defaultData = Object.assign({}, chooseMaterialData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            }
        }
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
            formData: {},
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

    render(h) {
        const tableData = this.listDataGetter() || {};
        return (
            <el-row v-loading={this.submitLoading}>
               {
                   (this.status === "list" || this.status === "tree") ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.preStatus.push("list");
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                                this.selectItem = null;
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : (
                       <div class="filter-container table-top-button-container">
                           {
                               this.status === "chooseMaterial" ? <el-button class="filter-item" onClick={
                                   () => {
                                       this.status = this.preStatus.pop();
                                   }
                               } type="primary">
                                返回
                            </el-button> : ''
                           }
                       </div>
                   )
               }
                {
                    this.status === "tree" ? this.treeHtml(h) : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={defaultData.pageAction} data={tableData} pageActionSearch={this.pageActionSearch}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={this.viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : (this.status === "chooseMaterial" ? <Vtable ref="Vtable" pageAction={chooseMaterialData.pageAction} data={tableData}
                                                                                                                                                        defaultCurrentPage={1} select={true} viewRule={this.viewRule} filter-multiple={false}
                                                                                                                                                        handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h))
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
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
                        this.formData.msgType === 1 ? <el-form-item label="从素材管理里面选择一个：" prop="materialId">
                                {
                                    this.selectItem ? <el-tag key="tag" closable disable-transitions="false" onClose={f => {
                                        this.selectItem = null;
                                        this.formData.materialId = '';
                                        this.formData.materialTitle = '';
                                    }}>
                                        {this.selectItem.name}
                                        <el-input type="hidden" style="display: none;" name="materialId" value={this.selectItem.id}/>
                                        <el-input type="hidden" style="display: none;" name="materialTitle" value={this.selectItem.name}/>
                                    </el-tag> : <el-button type="primary" onClick={f => {
                                        this.preStatus.push(this.status);
                                        this.status = "chooseMaterial";
                                    }}>点击选择</el-button>
                                }
                                </el-form-item> : ''
                    }

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
            return (
                this.status === "list" ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.preStatus.push('list');
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
                this.$refs.Vtable && this.$refs.Vtable.refreshData({
                    currentPage: this.defaultCurrentPage
                });
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
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
                this.status = this.preStatus.pop();
            } else {
                this.selectItem = null;
                this.formData.materialId = '';
                this.formData.materialTitle = '';
            }
        },
    }
});
