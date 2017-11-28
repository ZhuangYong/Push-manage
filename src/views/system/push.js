import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    pushSave,
    getGroupList,
    getPushDevice
} from "../../api/push";
import {bindData, getPushType} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'id', label: '序号', minWidth: 70},
    {columnKey: 'content', label: '内容'},
    {columnKey: 'deviceUuid', label: '设备编号'},
    {columnKey: 'title', label: '标题'},
    {columnKey: 'createTime', label: '创建时间'},
    {columnKey: 'updateTime', label: '更新时间'}
];
const pageViewRule = [
    {columnKey: 'name', label: '页面名称'},
    {columnKey: 'pageCode', label: '页面ID'},
    {columnKey: 'createName', label: '创建人'},
    {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
        if (r.status === 1) return '生效';
        if (r.status === 2) return '禁用';
        if (r.status === 3) return '删除';
    }},
    {label: '操作', buttons: [{label: '选择', type: 'edit'}], minWidth: 80}
];
const defaultFormData = {
    type: 1,
    method: 1,
    groupId: '',
    channelCode: '', //机型
    deviceUuid: '', //指定设备,
    title: '', //标题
    content: '', //内容
    pageId: '', //跳转页面
};
export default {
    data() {
        return {
            status: "list",
            chooseStatus: 'channel',
            msgStatus: '',
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            formData: defaultFormData, // 表单数据
            channelDefault: '',
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            filters: {
                type: ''
            },
            groupList: []
        };
    },
    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
        this.getChannelList();
        this.getGroupLists();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-form model={this.filters} inline ref="filterData">
                            <el-form-item label="">
                                <el-button class="filter-item" onClick={
                                    () => {
                                        this.status = "add";
                                        this.formData = Object.assign({}, defaultFormData);
                                    }
                                } type="primary" icon="edit">添加
                                </el-button>
                            </el-form-item>
                            <el-form-item label="" prop="type">
                                <el-select placeholder="请选择" value={this.filters.type} name='type' onChange={() => {
                                    this.filters.type === 4 ? this.msgStatus = 'msg' : this.msgStatus = '';
                                }}>
                                    {
                                        getPushType().map(item => (
                                            <el-option
                                                key={item.value}
                                                label={item.label}
                                                value={item.value}>
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" onClick={this.searchFilter}>搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div> : ""
                }
                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'push/RefreshPage'} data={this.system.pushManage}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : (this.status === "device" ? this.deviceHtml(h) : (this.status === 'page' ? this.pageHtml(h) : this.cruHtml(h)))
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
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" label-position="right" label-width="90px">
                    <el-form-item label="推送类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} name='type'>
                            {
                                getPushType().map(item => (
                                    <el-option
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推送方式" prop="method">
                        <el-select placeholder="请选择" value={this.formData.method} name='method' onChange={() => {
                            this.formData.method === 1 ? this.chooseStatus = 'channel' : this.chooseStatus = 'device';
                        }}>
                            <el-option label="机型" value={1} key={1}/>
                            <el-option label="设备组" value={2} key={2}/>
                        </el-select>
                    </el-form-item>
                    {
                        this.chooseStatus === 'channel' ? <el-form-item label="机型" prop="channelCode">
                            <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {
                                this.groupList && this.groupList.map(item => (
                                    <el-option
                                        key={item.id}
                                        label={item.name}
                                        value={item.code}>
                                    </el-option>
                                ))
                            }
                            </el-select>
                        </el-form-item> : ""
                    }
                    {
                        this.chooseStatus === 'device' ? <el-form-item label="设备组" prop="groupId">
                            <el-select placeholder="请选择" value={this.formData.groupId} name='groupId'>
                                {
                                    this.groupList && this.groupList.map(item => (
                                        <el-option
                                            key={item.id}
                                            label={item.name}
                                            value={item.id}>
                                        </el-option>
                                    ))
                                }
                            </el-select>
                        </el-form-item> : ''
                    }
                    {
                        this.chooseStatus === 'device' ? <el-form-item label="指定设备" prop="deviceUuid">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.status = "device";
                                }
                            } type="primary">选择设备
                            </el-button>
                            {
                                this.formData.deviceUuid ? <el-input type="textarea" value={this.formData.deviceUuid} name="deviceUuid"></el-input> : ''
                            }
                        </el-form-item> : ''
                    }
                    {
                        this.msgStatus === 'msg' ? <el-form-item label="标题" prop="title">
                            <el-input type="textarea" value={this.formData.title} name="title"></el-input>
                         </el-form-item> : ''
                    }
                    {
                        this.msgStatus === 'msg' ? <el-form-item label="内容" prop="content">
                            <el-input type="textarea" value={this.formData.content} name="content"></el-input>
                        </el-form-item> : ''
                    }
                    <el-form-item label="跳转页面" prop="pageId">
                        <el-button onClick={() => {
                            this.status = 'page'
                        }}>选择</el-button>
                        <span value={this.formData.pageId} name="pageId"></span>
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
        deviceHtml: function (h) {
            return (
                <el-row>
                    <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                            }
                        } type="primary" icon="edit">返回</el-button>
                    </div>
                    <Vtable ref="Dtable" pageAction={'device/RefreshPage'} data={this.system.deviceList}
                            defaultCurrentPage={this.defaultCurrentPage}  viewRule={pageViewRule}/>
                </el-row>
            );
        },
        pageHtml: function(h) {
            return (
                <el-row>
                    <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                            }
                        } type="primary" icon="edit">返回</el-button>
                    </div>
                    <Vtable ref="Dtable" pageAction={'page/RefreshPage'} data={this.system.pageManage}
                            defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={viewRule}
                            handleSelectionChange={this.handleSelectionChange}/>
                </el-row>
            );
        },
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        pushSave(this.formData).then(response => {
                            this.$message({
                                message: this.status === 'add' ? "添加成功" : "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        handleSelectionChange: function (selectedItems) {
        },
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.loading = false;
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    bindData(this, this.$refs.filterData);
                    break;
                case 'add':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'device':
                    break;
                default:
                    break;
            }
        },
        searchFilter: function () {
            this.$refs.Vtable.refreshData({
                currentPage: 1,
                type: this.filters.type
            });
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                defaultFormData.channelCode = res[0].code;
                this.formData.channelCode = res[0].code;
            }).catch((err) => {
            });
        },
        getGroupLists: function() {
            getGroupList().then(res => {
                defaultFormData.groupId = res[0].id;
                this.formData.groupId = res[0].id;
                this.groupList = res;
            });
        },
        chooseDevice: function() {

        }

    }
};
