import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {deleteRole, modifyRole, forceDelete, getTree, modifyResourceTree} from 'api/role';

const viewRule = [
    {columnKey: 'id', label: '名称', width: 140},
    {columnKey: 'roleName', label: '创建者'},
    {columnKey: 'description', label: '描述'},
    {columnKey: 'createUser', label: '创建者', width: 170},
    {columnKey: 'createTime', label: '创建日期', width: 170},
    {
        label: '操作',
        buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '授权', type: 'auth'}],
        width: 170
    }
];

const defaultFormData = {
    id: '',
    roleName: '',
    description: ''
};

export default {
    data() {
        return {
            status: 'list',
            newIds: [],
            id: '', //当前id
            resourceData: [],
            resourceAction: 'role/resource',
            defaultChecked: [],
            name: "tree",
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            formData: defaultFormData,
            disable: true,
            submitLoading: false,
            rules: {
            },
        };
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    computed: {
        ...mapGetters(['role'])
    },
    render(h) {
        return (

            <el-row>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" style="margin-left: 10px;" onClick={
                            () => {
                                this.status = "add";
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }
                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'role/RefreshPage'} data={this.role} select={true} viewRule={viewRule} handleSelectionChange={this.handleSelectionChange}/> : (this.status === "edit" || this.status === "add" ? this.cruHtml(h) : this.resourceHtml(h))
                }

            </el-row>
        );
    },
    methods: {
        handleSelectionChange: function (selectedItems) {
            console.log(selectedItems);
        },
        resourceHtml: function (h) {
            return (
                <el-row>
                    <el-tree
                        data={this.resourceData}
                        show-checkbox
                        node-key="id"
                        props={this.defaultProps}
                        ref={this.name}
                        default-checked-keys={this.defaultChecked}
                        highlight-current
                        default-expand-all>
                    </el-tree>
                    <div style="padding-top:10px"></div>
                    <el-button type="primary"
                               onClick={this.getCheckedKeys}>提交
                    </el-button>
                    <el-button onClick={
                        () => {
                            this.status = "list";
                        }
                    }>取消
                    </el-button>
                </el-row>
            );
        },
        cruHtml: function(h) {
            return (
                <el-row>
                    <el-form v-loading={this.submitLoading} class="small-space" model={this.formData} ref="formData" rules={this.rules} label-position="right" label-width="70px" size="mini" width="400px">
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
            this.$store.dispatch(this.resourceAction, param).then((res) => {
                this.resourceData = res.data;
                this.defaultChecked = res.owned;
            }).catch((err) => {
            });
        },
        getCheckedKeys() {
            this.newIds = []; //点击之前先清空否者会叠加
            const allChecked = this.$refs.tree.getCheckedKeys();
            const checkedIds = this.getChecked(this.resourceData, allChecked);
            var postData = {
                id: this.id,
                newIds: checkedIds
            };
            modifyResourceTree(postData).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.status = 'list';
            });

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
                    });
                    this.$refs.Vtable.$on('edit', (row) => {
                        this.status = "edit";
                        this.formData.id = row.id;
                        this.formData.roleName = row.roleName;
                        this.formData.description = row.description;
                    });
                    break;
                case 'add':
                    this.formData.id = '';
                    this.formData.roleName = '';
                    this.formData.description = '';
                    break;
                case 'edit':
                    break;
                default:
                    break;
            }
        },
        submitAdd: function() {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    modifyRole(this.formData).then(response => {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.addUserInfo = false;
                        this.submitLoading = false;
                        this.status = 'list';
                    }).catch(err => {
                        this.submitLoading = false;
                    });
                } else {
                    return false;
                }
            });
        }


    }
};
