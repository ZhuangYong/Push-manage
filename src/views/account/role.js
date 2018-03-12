import {mapGetters} from "vuex";
import {deleteRole, modifyResourceTree, modifyRole, saveChannel, saveUserGroup} from "../../api/role";
import BaseListView from "../../components/common/BaseListView";
import Const from "../../utils/const";

const defaultData = {
    viewRule: [
        {columnKey: 'id', label: 'id', minWidth: 120, sortable: true},
        {columnKey: 'roleName', label: '角色名称', minWidth: 120, sortable: true},
        {columnKey: 'description', label: '描述', minWidth: 220, sortable: true},
        {columnKey: 'createUser', label: '创建者', minWidth: 100, width: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建日期', width: 170, sortable: true, inDetail: true},
        {
            label: '操作',
            buttons: [{label: '编辑', type: 'edit', role: Const.ROLE.ROLE_EDIT}, {label: '删除', type: 'del', role: Const.ROLE.ROLE_DELETE}, {label: '授权', type: 'auth', role: Const.ROLE.ROLE_APPLY}],
            width: 210
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
    pageAction: 'stbUser/RefreshPage'
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            newIds: [],
            id: '', //当前id
            resourceData: [],
            defaultChecked: [],
            viewRule: _defaultData.viewRule,
            formData: _defaultData.defaultFormData,
            disable: true,
            submitLoading: false,
            validRules: {
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
            listDataGetter: function() {
                return this.role;
            },
            tableCanSelect: false,
            pageAction: 'role/RefreshPage',
            editFun: modifyRole,
            delItemFun: deleteRole
        };
    },

    computed: {
        ...mapGetters(['role', 'system'])
    },

    methods: {

        /**
         * 授权页面
         * @param h
         * @returns {*}
         */
        renderAuthHtml: function (h) {
            return (
                <el-row style="float: left; width: 100%;">
                    <el-col xs={24} sm={8}>
                         <h5 style="border: 1px solid #d1dbe5; margin: 0; padding: 10px; background-color: #eef1f6; border-bottom: none;">权限选择</h5>
                        {
                            this.resourceData.length > 0 ? <el-tree
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
                            </el-tree> : ""
                        }

                    </el-col>
                    <el-col xs={24} sm={8}>
                         <h5 style="border: 1px solid #d1dbe5; margin: 0; padding: 10px; background-color: #eef1f6; border-bottom: none;">选择机型</h5>
                         <div style="height: 400px; overflow: auto; border: 1px solid #d1dbe5;">
                             {
                                 this.role.channelList && this.role.channelList.map(channel => (
                                     <el-checkbox checked={!!channel.isSelected} style="width: 100%; padding: .5rem; margin: 0; float: left; " label={channel.code} onChange={(checked) => {
                                         if (checked) {
                                             if (!this.channelCodes.some(v => v === channel.code)) {
                                                 this.channelCodes.push(channel.code);
                                             }
                                         } else {
                                             this.channelCodes = this.channelCodes.filter(v => v !== channel.code);
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
                                     <el-checkbox checked={!!group.isSelected} style="width: 100%; padding: .5rem; margin: 0; float: left; " label={group.uuid} onChange={(checked) => {
                                         if (checked) {
                                             if (!this.groupListCodes.some(v => v === group.uuid)) {
                                                 this.groupListCodes.push(group.uuid);
                                             }
                                         } else {
                                             this.groupListCodes = this.groupListCodes.filter(v => v !== group.uuid);
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
                                   onClick={this.saveAuth}>提交
                        </el-button>
                        <el-button onClick={
                            () => {
                                this.pageBack();
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
                    <el-form v-loading={this.submitLoading} class="small-space" model={this.formData} ref="addForm" rules={this.validRules} label-position="right" label-width="100px" size="mini" width="400px">
                        {
                          this.currentPage === this.PAGE_EDIT ? <el-form-item label="id" prop="id"><el-input value={this.formData.id} name='id' disabled={this.disable}/></el-form-item> : ''
                        }

                        <el-form-item label="角色名" prop="roleName">
                            <el-input value={this.formData.roleName} onChange={v => this.formData.roleName = v}/>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input rows={2} type="textarea" value={this.formData.description} onChange={v => this.formData.description = v}/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交
                            </el-button>
                            <el-button onClick={
                                () => {
                                    this.goPage(this.PAGE_LIST);
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>

                </el-row>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        this.hasRole(Const.ROLE.ROLE_ADD) ? <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_ADD);
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button> : ""
                    }
                </div> : ""
            );
        },

        /**
         * 获取权限数据
         * @param param
         */
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

        /**
         * 修改授权
         */
        saveAuth() {
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
                        this.goPage(this.PAGE_LIST);
                    }).catch(errFun);

                }).catch(errFun);
            }).catch(errFun);
        },

        /**
         * 获取选择了的授权id
         * @param data
         * @param allId
         * @returns {Array}
         */
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

        /**
         *
         * @param row
         */
        handelAuth(row) {
            this.id = row.id;
            this.getData(row.id);
            this.getStatChannel(row.id);
            this.getStatGroupList(row.id);
            this.goPage("auth");
        },

        /**
         * 获取机型列表
         * @param id
         */
        getStatChannel: function (id) {
            const roleId = id || this.id;
            this.role.channelList = [];
            this.submitLoading = true;
            this.$store.dispatch("role/channelList", {roleId: roleId}).then(res => this.submitLoading = false).catch(err => this.submitLoading = false);
        },

        /**
         * 获取设备组列表
         * @param id
         */
        getStatGroupList: function (id) {
            const roleId = id || this.id;
            this.role.groupList = [];
            this.submitLoading = true;
            this.$store.dispatch("role/groupList", {roleId: roleId}).then(res => this.submitLoading = false).catch(err => this.submitLoading = false);
        },

        /**
         * 显示不同列表时获取列表需要的data
         * @param choosePage
         * @param id
         * @returns {{} & any}
         */
        getDataWhenShowListChange(choosePage, id) {
            return Object.assign({}, id ? deviceData : defaultData);
        }

    }
});
