import {mapGetters} from "vuex";
import {resouceModify, resourceDelete} from "../../api/resource";
import {listTree} from '../../utils/index';
import BaseListView from "../../components/common/BaseListView";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名字', minWidth: 170, sortable: true},
        {columnKey: 'url', label: '路径', minWidth: 200, sortable: true},
        {columnKey: 'permission', label: '权限', minWidth: 140, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 80, formatter: r => {
                switch (r.isEnabled) {
                    case 1:
                        return '是';
                    case 2:
                        return '否';
                    default:
                        return '否';
                }
            }},
        {columnKey: 'description', label: '描述', minWidth: 200},
        {
            label: '操作',
            buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}],
            width: 144
        }
    ],
    defaultFormData: {
        pid: 0,
        seq: 1,
        isEnabled: 1,
        description: '',
        name: '',
        permission: '',
        url: ''
    },
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
    pageActionSearch: [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        {
            column: 'isEnabled', label: '是否开启', type: 'option', value: '', options: [
                {value: 1, label: '是'},
                {value: 2, label: '否'},
            ]
        },
    ]
};
export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            roleData: {},
            treeData: [],
            roles: [],
            owned: [],
            viewRule: _defaultData.viewRule,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            validRules: _defaultData.validRules,
            pageActionSearch: _defaultData.pageActionSearch,
            defaultExpandedKeys: [],
            listDataGetter: function() {
                return this.resource.page;
            },
            tableCanSelect: false,
            pageAction: 'resource/RefreshPage',
            editFun: resouceModify,
            delItemFun: resourceDelete
        };
    },
    computed: {
        ...mapGetters(['resource'])
    },
    created() {
        this.refreshTree();
    },

    methods: {

        renderTreeHtml: function (h) {
            return (
                <el-tree
                    accordion
                    style="float: left; width: 100%;"
                    v-loading={this.submitLoading || this.loading}
                    data={(this.resource && this.resource.treeList.children) || []}
                    props={{
                        children: 'children',
                        label: 'label'
                    }}
                    node-key={"id"}
                    default-expanded-keys={this.defaultExpandedKeys}
                    onNode-expand={a => this.defaultExpandedKeys.push(a.id)}
                    onNode-collapse={a => this.defaultExpandedKeys = this.defaultExpandedKeys.filter(id => id !== a.id)}
                    render-content={this.treeContentTemplate}>
               </el-tree>
            );
        },

        /**
         * 树模板
         * @param h
         * @param node
         * @param data
         * @returns {*}
         */
        treeContentTemplate: function(h, {node, data}) {
            node.expanded = !!this.defaultExpandedKeys.some(id => id === node.data.id);
            return (
                <span class="hover-show">
                    <span>
                        <span>
                            {data.name}
                        </span>
                        <span class="hover-show-item">
                            <i class="el-icon-edit" style={{margin: '0 .5rem 0 1.5rem'}} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.formData = data;
                                this.goPage(this.PAGE_EDIT);
                            }}/>
                            <i class="el-icon-plus" style={{margin: '0 .5rem'}} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.formData = Object.assign({}, this.defaultFormData, {pid: data.id});
                                this.goPage(this.PAGE_ADD);
                            }}/>
                            <i class="el-icon-delete" style={{margin: '0 .5rem'}} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.submitDel(data, null, f => {
                                    this.refreshTree();
                                });
                            }}/>
                        </span>
                    </span>
                </span>
            );
        },

        topButtonHtml: function (h) {
            return (
                (this.currentPage === this.PAGE_LIST || this.currentPage === this.PAGE_TREE) ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, this.defaultFormData);
                            this.owned = [];
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                    {
                        this.currentPage === this.PAGE_TREE ? <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_LIST);
                            }
                        } type="primary">
                            列表
                        </el-button> : ""
                    }
                    {
                        this.currentPage === this.PAGE_LIST ? <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_TREE);
                            }
                        } type="primary">
                            树形结构
                        </el-button> : ""
                    }
                </div> : ""
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
                             ref="addForm" rules={this.validRules} label-position="right" label-width="120px">
                        <el-form-item label="父级" prop="pid">
                             <el-select placeholder={(!this.formData.pid && this.currentPage === this.PAGE_EDIT) ? "根目录" : "请选择"} value={this.formData.pid} name='pid' disabled={this.currentPage !== this.PAGE_ADD} onHandleOptionClick={f => this.formData.pid = f.value}>
                                 <el-option label={'根目录'} value={0} key={0}/>
                                 {
                                     listTree(this.resource.treeList).map(item => (
                                         <el-option label={item.name} value={item.id} key={item.id}/>
                                     ))
                                 }
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名称" prop="name">
                            <el-input value={this.formData.name} name='name'/>
                        </el-form-item>
                        <el-form-item label="权限" prop="permission">
                            <el-input value={this.formData.permission} name='permission' disabled={this.currentPage !== this.PAGE_ADD}/>
                        </el-form-item>
                        <el-form-item label="url" prop="url">
                            <el-input value={this.formData.url} name='url'/>
                        </el-form-item>
                        <el-form-item label="是否开启：" prop="isEnabled">
                            <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                                <el-radio value={1} label={1}>是</el-radio>
                                <el-radio value={2} label={2}>否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="排序" prop="seq">
                            <el-input value={this.formData.seq} name='seq'/>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input rows={2} type="textarea" value={this.formData.description} name='description'/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={f => {
                                this.submitAddOrUpdate(f => {
                                    this.refreshTable();
                                });
                            }}>提交</el-button>
                            <el-button onClick={this.pageBack}>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                );
            }
        },

        refreshTree() {
            this.loading = true;
            this.$store.dispatch("resource/tree", {rootId: null}).then((res) => {
                this.treeData = res;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },

        refreshTable() {
            this.$refs.Vtable && this.$refs.Vtable.refreshData({
                currentPage: this.defaultCurrentPage
            });
            this.refreshTree();
        },
    }
});
