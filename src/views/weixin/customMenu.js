import {mapGetters} from "vuex";
import {listTree} from '../../utils/index';
import {menuDelete, menuTree, save as saveFun} from "../../api/weixinMenu";
import BaseListView from "../../components/common/BaseListView";
import JPanel from "../../components/panel/JPanel";

const defaultData = {
    defaultFormData: {
        name: '',
        targetType: 1,
        isEnabled: 1,
        msgType: 1,
        parentId: 0,
        sort: 1,
        materialId: '',
        materialTitle: '',
        content: ''
    },
    viewRule: [
        {columnKey: 'name', label: '菜单名称', minWidth: 170},
        {columnKey: 'url', label: '级别/所属一级', minWidth: 200, formatter: r => {
            if (r.parentId === 0) return '一级';
            if (r.parentId !== 0) return r.parentName + '/二级';
        }},
        {columnKey: 'sort', label: '排序', minWidth: 90, sortable: true},
        {columnKey: 'targetType', label: '类型', minWidth: 90, formatter: r => {
            if (r.targetType === 1) return '发送消息';
            if (r.targetType === 2) return '跳转连接';
            if (r.targetType === 3) return '层级菜单';
        }},
        {columnKey: 'content', label: '内容', minWidth: 170},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 80, formatter: r => {
            if (r.isEnabled === 1) return '是';
                return '否';
        }},
        {
            label: '操作',
            buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}],
            width: 144
        }
    ],
    validRules: {
        name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
        ],
        permission: [
            {required: true, message: '请输入资源权限符', trigger: 'blur'},
            {min: 1, max: 100, message: '请输入2-16昵称', trigger: 'blur'}
        ]
    },
    tableCanSelect: false,
    enableDefaultCurrentPage: true,
    listDataGetter: function() {
        return this.weixin.weixinMenuPage;
    },
    pageAction: 'weixin/menu/RefreshPage'
};

const chooseMaterialData = {
    viewRule: [
        {columnKey: 'name', label: '图文消息名称', minWidth: 140},
        {columnKey: 'ossImage', label: '头图', minWidth: 80, imgColumn: 'ossImage'},
        {columnKey: 'title', label: '头图标题', minWidth: 100},
        {columnKey: 'url', label: 'URL', minWidth: 180},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
    ],
    listDataGetter: function() {
        return this.weixin.materialPage;
    },
    tableCanSelect: true,
    enableDefaultCurrentPage: false,
    pageAction: 'weixin/material/RefreshPage'
};
export default BaseListView.extend({
    name: "customMenuPage",
    components: {
        JPanel
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            preStatus: [],
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            defaultFormData: _defaultData.defaultFormData, // 表单数据
            formData: _defaultData.defaultFormData, // 表单数据
            viewRule: _defaultData.viewRule,
            treeData: [],
            roles: [],
            owned: [],
            tipTxt: "",
            dialogVisible: false,
            sureCallbacks: f => f,
            defaultCurrentPage: 1,
            tableCanSelect: false,
            rules: _defaultData.validRules,
            listDataGetter: _defaultData.listDataGetter,
            pageAction: _defaultData.pageAction,
            pageActionSearch: [{
                column: 'name', label: '请输入菜单名称', type: 'input', value: ''
            }],
            editFun: saveFun
        };
    },
    watch: {
        selectItem: function (v, ov) {
            const {name, id} = v || {};
            this.formData.materialTitle = name;
            this.formData.materialId = id;
        }
    },
    computed: {
        ...mapGetters(['weixin'])
    },
    created() {
        this.refreshTree();
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    methods: {
        renderTreeHtml: function (h) {
            if (!this.treeData || !this.treeData.length) return "";
            return (
                <el-tree
                    style="margin-top: 70px; padding: 22px; border-radius: 4px;"
                    v-loading={this.submitLoading || this.loading}
                    data={(this.treeData) || []}
                    props={{
                        children: 'children',
                        label: 'name'
                    }}
                    node-key={"id"}
                    default-expand-all
                    expand-on-click-node={false}
                    render-content={this.renderTreeContent}>
                </el-tree>
            );
        },

        /**
         * 树模板
         * @param h
         * @param data
         * @returns {*}
         */
        renderTreeContent: function(h, {data}) {
            return (
                <span class="hover-show">
                    <span>
                        <span>
                            {data.name}
                        </span>
                        <span class="hover-show-item">
                            <i class="el-icon-edit" style={{margin: '0 .5rem 0 1.5rem'}} onClick={() => {
                                this.formData = data;
                                this.goPage(this.PAGE_EDIT);
                            }}/>
                            <i class="el-icon-plus" style={{margin: '0 .5rem'}} onClick={() => {
                                this.formData = Object.assign({}, this.defaultFormData, {parentId: data.id});
                                this.goPage(this.PAGE_ADD);
                            }}/>
                            <i class="el-icon-delete" style={{margin: '0 .5rem'}} onClick={() => {
                                this.submitDel(data);
                            }}/>
                        </span>
                    </span>
                </span>
            );
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            if (this.currentPage === this.PAGE_ADD || this.currentPage === this.PAGE_EDIT) {
                return (
                    <el-form v-loading={this.loading} class="small-space" model={this.formData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="130px">
                        <el-form-item label="父级：" prop="parentId">
                             <el-select placeholder={(!this.formData.parentId && this.currentPage === this.PAGE_EDIT) ? "根目录" : "请选择"} value={this.formData.parentId} name='parentId'>
                                 <el-option label={'根目录'} value={0} key={0}/>
                                 {
                                     listTree({children: this.treeData}).map(item => (
                                         <el-option label={item.name} value={item.id} key={item.id}/>
                                     ))
                                 }
                            </el-select>
                        </el-form-item>
                        <el-form-item label="菜单名称：" prop="name">
                            <el-input value={this.formData.name} name='name'/>
                        </el-form-item>
                        <el-form-item label="是否开启：" prop="isEnabled">
                            <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                                <el-radio value={1} label={1}>是</el-radio>
                                <el-radio value={2} label={2}>否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="排序：" prop="sort">
                            <el-input value={this.formData.sort} onChange={v => this.formData.sort = parseInt(v, 10)} number/>
                        </el-form-item>
                        <el-form-item label="菜单类型：">
                             <el-radio-group value={this.formData.targetType} name="targetType">
                                 <el-radio value={1} label={1}>发送消息</el-radio>
                                 <el-radio value={2} label={2}>跳转连接</el-radio>
                                 <el-radio value={3} label={3}>层级菜单</el-radio>
                             </el-radio-group>
                         </el-form-item>
                        <el-form-item label="消息类型：" style={{display: this.formData.targetType === 1 ? '' : 'none' }}>
                            <el-radio-group value={this.formData.msgType} name="msgType">
                                <el-radio value={1} label={1}>图文消息</el-radio>
                                <el-radio value={2} label={2}>文字消息</el-radio>
                             </el-radio-group>
                        </el-form-item>
                        {
                            (this.formData.targetType === 1 && this.formData.msgType === 2) ? <el-form-item label="文字内容：">
                                                              <el-input value={this.formData.content} onChange={v => this.formData.content = v}/>
                                                          </el-form-item> : ''
                        }
                        {
                            (this.formData.targetType === 1 && this.formData.msgType === 1) ? <el-form-item label="从素材管理选择：">
                                {
                                    this.formData.materialId ? <el-tag key="tag" closable disable-transitions={false} onClose={f => this.selectItem = null}>
                                        {this.formData.materialTitle}
                                    </el-tag> : <el-button type="primary" onClick={f => {
                                        this.goPage(this.PAGE_LIST);
                                        this.showList("", true);
                                    }}>点击选择</el-button>
                                }
                                </el-form-item> : ''
                        }

                        {
                            this.formData.targetType === 2 ? <el-form-item label="URL地址：" prop="content">
                                                                <el-input value={this.formData.content} onChange={v => this.formData.content = v}/>
                                                            </el-form-item> : ''
                        }
                        <el-form-item>
                            <el-button type="primary" onClick={f => {
                                this.submitAddOrUpdate(f => {
                                    if (this.currentPage === this.PAGE_TREE) {
                                        this.refreshTree();
                                    }
                                    if (this.currentPage === this.PAGE_LIST) {
                                        this.showList();
                                        this.refreshTree();
                                    }
                                });
                            }}>提交</el-button>
                            <el-button onClick={f => {
                                this.pageBack();
                                this.showList();
                            }}>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                );
            }
        },

        topButtonHtml: function (h) {
            return (
                (this.currentPage === this.PAGE_LIST || this.currentPage === this.PAGE_TREE) ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={this.pageBack} type="primary" v-show={this.pageAction === chooseMaterialData.pageAction}>
                        返回
                    </el-button>
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, defaultData.defaultFormData);
                            this.selectItem = null;
                            this.owned = [];
                        }
                    } type="primary" icon="edit" v-show={this.pageAction !== chooseMaterialData.pageAction}>
                        添加
                    </el-button>
                    {
                        this.currentPage === this.PAGE_TREE ? <el-button class="filter-item" onClick={
                            f => {
                                this.goPage(this.PAGE_LIST);
                            }
                        } type="primary">
                            列表
                        </el-button> : ""
                    }
                    {
                        this.currentPage === this.PAGE_LIST ? <el-button class="filter-item" onClick={
                            f => {
                                this.goPage(this.PAGE_TREE);
                            }
                        } type="primary" v-show={this.pageAction !== chooseMaterialData.pageAction}>
                            树形结构
                        </el-button> : ""
                    }
                </div> : ""
            );
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const menuId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                menuDelete(menuId).then(res => {
                    this.loading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.refreshTree();
                    this.refreshTable();
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        refreshTree() {
            this.loading = true;
            menuTree().then((res) => {
                this.treeData = res;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        getDataWhenShowListChange(choosePage) {
            return choosePage ? Object.assign({}, chooseMaterialData) : defaultData;
        }
    }
});
