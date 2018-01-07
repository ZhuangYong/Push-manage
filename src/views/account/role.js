import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {deleteRole, modifyRole, forceDelete, getTree, modifyResourceTree} from 'api/role';
import ConfirmDialog from '../../components/confirm';
import {bindData} from "../../utils/index";
import {saveChannel, saveUserGroup} from "../../api/role";

const defaultData = {
    viewRule: [
        {columnKey: 'id', label: 'id', minWidth: 120, sortable: true},
        {columnKey: 'roleName', label: '角色名称', minWidth: 120, sortable: true},
        {columnKey: 'description', label: '描述', minWidth: 220, sortable: true},
        {columnKey: 'createUser', label: '创建者', minWidth: 100, width: 170, sortable: true},
        {columnKey: 'createTime', label: '创建日期', width: 170, sortable: true},
        {
            label: '操作',
            buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '授权', type: 'auth'}],
            width: 200
        }
    ],
    defaultFormData: {
        id: '',
        roleName: '',
        description: ''
    }
};

const deviceData = {
    listDataGetter: function() {
        return this.userManage.stbUserPage;
    },
    tableCanSelect: true,
    pageAction: 'stbUser/RefreshPage'
};

export default {
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            newIds: [],
            id: '', //当前id
            resourceData: [],
            defaultChecked: [],
            viewRule: _defaultData.viewRule,
            formData: _defaultData.defaultFormData,
            disable: true,
            submitLoading: false,
            rules: {
                roleName: [
                    {required: true, message: '角色名不能为空', trigger: 'blur'},
                    {min: 1, max: 16, message: '请输入1-16位的角色名', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '描述不能为空', trigger: 'blur'},
                    {min: 1, max: 16, message: '请输入1-16位的描述', trigger: 'blur'}
                ]
            },
            tipTxt: "",
            dialogVisible: false,
            sureCallbacks: function () {
            },
            selectItems: [],
            channelCodes: [],
            groupListCodes: [],
            deviceUuid: [],
            defaultCurrentPage: 1,
            pageActionSearch: [
                {column: 'roleName', label: '请输入角色名称', type: 'input', value: ''},
            ],
        };
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    computed: {
        ...mapGetters(['role', 'system'])
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading || this.loading}>
                {
                    this.status === "list" ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                        <el-button class="filter-item" disabled={this.selectItems.length !== 1} type="danger" onClick={this.forceDelete}>
                            强制删除
                        </el-button>
                    </div> : ""
                }
                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'role/RefreshPage'} data={this.role} select={true} pageActionSearch={this.pageActionSearch} viewRule={this.viewRule} defaultCurrentPage={this.defaultCurrentPage} handleSelectionChange={this.handleSelectionChange}/> : (this.status === "edit" || this.status === "add" ? this.cruHtml(h) : this.resourceHtml(h))
                }
                <ConfirmDialog visible={this.dialogVisible} tipTxt={this.tipTxt} handelSure={this.sureCallbacks} handelCancel={() => {
                    this.dialogVisible = false;
                }}/>
            </el-row>
        );
    },
    methods: {
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },
        resourceHtml: function (h) {
            return (
                <el-row style="float: left; width: 100%;">
                    <el-col xs={24} sm={8}>
                         <h5 style="border: 1px solid #d1dbe5; margin: 0; padding: 10px; background-color: #eef1f6; border-bottom: none;">权限选择</h5>
                         <el-tree
                             style="height: 400px; overflow: auto; border: 1px solid #d1dbe5;"
                             data={this.resourceData || []}
                             show-checkbox
                             node-key="id"
                             props={{
                                 children: 'children',
                                 label: 'name'
                             }}
                             ref="tree"
                             default-checked-keys={this.defaultChecked}
                             highlight-current
                             default-expand-all>
                        </el-tree>
                    </el-col>
                    <el-col xs={24} sm={8}>
                         <h5 style="border: 1px solid #d1dbe5; margin: 0; padding: 10px; background-color: #eef1f6; border-bottom: none;">选择机型</h5>
                         <div style="height: 400px; overflow: auto; border: 1px solid #d1dbe5;">
                             {
                                 this.role.channelList && this.role.channelList.map(channel => (
                                     <el-checkbox checked={!!channel.isSelected} style="width: 100%; padding: .5rem; margin: 0; float: left; " label={channel.code} onChange={(e) => {
                                         let {value, checked} = e.target;
                                         if (checked) {
                                             if (!this.channelCodes.some(v => v === value)) {
                                                 this.channelCodes.push(value);
                                             }
                                         } else {
                                             this.channelCodes = this.channelCodes.filter(v => v !== value);
                                         }
                                     }}>
                                        {channel.name}
                                   </el-checkbox>
                                 ))
                             }
                       </div>
                    </el-col>
                    <el-col xs={24} sm={8}>
                         <h5 style="border: 1px solid #d1dbe5; margin: 0; padding: 10px; background-color: #eef1f6; border-bottom: none;">设备组</h5>
                         <div style="height: 400px; overflow: auto; border: 1px solid #d1dbe5;">
                             {
                                 this.role.groupList && this.role.groupList.map(group => (
                                     <el-checkbox checked={!!group.isSelected} style="width: 100%; padding: .5rem; margin: 0; float: left; " label={group.uuid} onChange={(e) => {
                                         let {value, checked} = e.target;
                                         if (checked) {
                                             if (!this.groupListCodes.some(v => v === value)) {
                                                 this.groupListCodes.push(value);
                                             }
                                         } else {
                                             this.groupListCodes = this.groupListCodes.filter(v => v !== value);
                                         }
                                     }}>
                                        {group.name}
                                   </el-checkbox>
                                 ))
                             }
                       </div>
                    </el-col>
                    <el-row style="float: left; width: 100%; margin: 2rem 1rem;">
                        <el-button type="primary"
                                   onClick={this.getCheckedKeys}>提交
                        </el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                                this.defaultChecked = [];
                            }
                        }>取消
                        </el-button>
                    </el-row>

                </el-row>
            );
        },
        cruHtml: function(h) {
            return (
                <el-row>
                    <el-form v-loading={this.submitLoading} class="small-space" model={this.formData} ref="Dataform" rules={this.rules} label-position="right" label-width="100px" size="mini" width="400px">
                        {
                          this.status === 'edit' ? <el-form-item label="id" prop="id"><el-input value={this.formData.id} name='id' disabled={this.disable}/></el-form-item> : ''
                        }

                        <el-form-item label="角色名" prop="roleName">
                            <el-input value={this.formData.roleName} name='roleName'/>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input type="textarea" value={this.formData.description} name='description'/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                       onClick={this.submitAdd}>提交
                            </el-button>
                            <el-button onClick={
                                () => {
                                    this.status = "list";
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>

                </el-row>
            );
        },
        getData(param) {
            this.resourceData = [];
            this.loading = true;
            this.$store.dispatch("role/resource", param).then((res) => {
                this.resourceData = res.data;
                this.defaultChecked = res.owned;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
                this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            });
        },
        getCheckedKeys() {
            this.newIds = []; //点击之前先清空否者会叠加
            const allChecked = this.$refs.tree.getCheckedKeys();
            const checkedIds = this.getChecked(this.resourceData, allChecked);
            const errFun = err => {
                this.submitLoading = false;
                this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            };

            const postData = {
                id: this.id,
                newIds: checkedIds
            };
            this.submitLoading = true;
            modifyResourceTree(postData).then(res => {
                saveChannel({
                    roleId: this.id,
                    channelCodes: this.channelCodes
                }).then(res => {
                    saveUserGroup({
                        roleId: this.id,
                        groupUuid: this.groupListCodes
                    }).then(res => {
                        this.submitLoading = false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.status = 'list';
                    }).catch(errFun);

                }).catch(errFun);
            }).catch(errFun);

        },
        getChecked(data, allId) {
            const keys = allId;
            data.forEach((item, index, arr) => {
                if (keys.indexOf(item.id) >= 0) { //查找当前id是否在keys里面
                    this.newIds.push(item.id);
                } else { //如果不存在，查看其子元素在不在，
                    if (data[index].children !== undefined && data[index].children.length > 0) {
                        this.getChecked(data[index].children, allId);
                    }
                }
            });
            return this.newIds;
        },
        updateView: function () {
            switch (this.status) {
                case 'list':
                    this.$refs.Vtable.$on('auth', (row) => {
                        this.status = "auth";
                        this.id = row.id;
                        this.getData(row.id);
                        this.getStatChannel(row.id);
                        this.getStatGroupList(row.id);
                    });
                    this.$refs.Vtable.$on('edit', (row) => {
                        this.status = "edit";
                        this.formData = row;
                    });
                    this.$refs.Vtable.$on('del', (row) => {
                        this.submitDel(row);
                    });
                    this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                        this.defaultCurrentPage = defaultCurrentPage;
                    });
                    break;
                case 'add':
                    bindData(this, this.$refs.Dataform);
                    break;
                case 'edit':
                    bindData(this, this.$refs.Dataform);
                    break;
                default:
                    break;
            }
        },
        submitAdd: function() {
            this.$refs.Dataform.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    modifyRole(this.formData).then(response => {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.submitLoading = false;
                        this.status = 'list';
                    }).catch(err => {
                        this.submitLoading = false;
                    });
                } else {
                    return false;
                }
            });
        },
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const userId = row.id;
            this.sureCallbacks = () => {
                deleteRole(userId).then(response => {
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
        forceDelete() {
            this.dialogVisible = true;
            this.tipTxt = "确定要强制删除吗？";
            this.sureCallbacks = () => {
                forceDelete(this.selectItems[0]['id']).then(res => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                });
            };
        },

        getStatChannel: function (id) {
            const roleId = id || this.id;
            this.role.channelList = [];
            this.submitLoading = true;
            this.$store.dispatch("role/channelList", {roleId: roleId}).then(res => this.submitLoading = false).catch(err => this.submitLoading = false);
        },

        getStatGroupList: function (id) {
            const roleId = id || this.id;
            this.role.groupList = [];
            this.submitLoading = true;
            this.$store.dispatch("role/groupList", {roleId: roleId}).then(res => this.submitLoading = false).catch(err => this.submitLoading = false);
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         * @param choosePage
         * @param refreshPage
         */
        showList: function (id, choosePage, refreshPage) {
            this.id = id;
            setTimeout(f => {
                const _thisData = Object.assign({}, id ? deviceData : defaultData);
                Object.keys(_thisData).map(key => {
                    this[key] = _thisData[key];
                });
                this.enableDefaultCurrentPage = !id;
                if (id && !choosePage) {
                    this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                    this.pageActionSearchColumn = [{
                        urlJoin: id
                    }];
                } else {
                    this.pageActionSearchColumn = [];
                }
                this.id = id;
                if (refreshPage) {
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }
            }, 50);
            this.deviceUuid = [];
        },

    }
};
