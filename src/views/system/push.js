import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Vtable from '../../components/Table';
import {bindData, getPushType} from "../../utils/index";
import ConfirmDialog from '../../components/confirm';
import { pushSave, getGroupList, getPushDevice} from '../../api/push';

const defaultData = {
    listData: {
        viewRule: [
            {columnKey: 'id', label: '序号', minWidth: 70},
            {columnKey: 'deviceUuid', label: '设备编号'},
            {columnKey: 'type', label: '类型', formatter: r => {
                if (r.type == 1) return '最新配置';
                if (r.type == 2) return '系统升级检测';
                if (r.type == 3) return '应用升级检测';
                if (r.type == 4) return '系统消息提醒';

            }},
            {columnKey: 'title', label: '标题'},
            {columnKey: 'content', label: '内容'},
            {columnKey: 'createTime', label: '创建时间'},
            {columnKey: 'updateTime', label: '更新时间'}
        ],
        tableCanSelect: false,
        defaultFormData: {
            type: 1, //1最新配置, 2系统升级检测, 3应用升级检测, 4系统消息提醒
            method: 1, // 1机型，2设备组
            groupId: '',
            channelCode: '', //机型
            deviceUuid: '', //指定设备,
            title: '', //标题
            content: '', //内容
            pageId: '', //跳转页面
        },
        listDataGetter: function() {
            return this.system.pushManage;
        },
        pageActionSearch: [
            {column: 'deviceUuid', label: '请输入设备编号', type: 'input', value: ''},
            {column: 'title', label: '请输入标题', type: 'input', value: ''},
            {
                column: 'type', label: '请选择类型', type: 'option', value: '', options: [
                    {value: 1, label: '最新配置'},
                    {value: 2, label: '系统升级检测'},
                    {value: 3, label: '应用升级检测'},
                    {value: 4, label: '系统消息提醒'},
                ]
            },
        ],
        pageActionSearchColumn: [],
        pageAction: 'push/RefreshPage'
    },
    pageData: {
        viewRule: [
            {columnKey: 'name', label: '页面名称'},
            {columnKey: 'pageCode', label: '页面ID'},
            {columnKey: 'createName', label: '创建人'},
            {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
                if (r.status === 1) return '生效';
                if (r.status === 2) return '禁用';
                if (r.status === 3) return '删除';
            }}
        ],
        defaultFormData: {
        },
        listDataGetter: function() {
            return this.system.pageManage;
        },
        pageActionSearch: [
        ],
        pageActionSearchColumn: [],
        pageAction: 'page/RefreshPage'
    },
    deviceData: {
        viewRule: [
            {columnKey: 'deviceId', label: '设备ID'},
            {columnKey: 'mac', label: 'mac'},
            {columnKey: 'createTime', label: '创建时间'},
        ],
        defaultFormData: {
        },
        listDataGetter: function() {
            return this.system.deviceList;
        },
        pageActionSearch: [
        ],
        pageActionSearchColumn: [],
        pageAction: 'device/RefreshPage'
    }
};
const validRules = {};
export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData.listData);
        return {
            status: 'list',
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            tableCanSelect: false,
            pageAction: _defaultData.pageAction,
            rules: validRules,
            channelStatus: true,
            deviceStatus: false,
            msgStatus: false,
            groupList: [], //组列表
            channelList: [], //机型
            selectItems: [],
            deviceSelectedItems: [], //设备选择列表
            pageSelectedItems: [], //页面选择列表
            pageName: ''
        };
    },
    watch: {
        status: function (v, ov) {
            if (v === 'list') {
                const _defaultData = Object.assign({}, defaultData.listData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            } else if (v === 'device') {
                const _defaultData = Object.assign({}, defaultData.deviceData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            } else if (v === 'page') {
                const _defaultData = Object.assign({}, defaultData.pageData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            }
        }
    },
    mounted() {
        this.getGroupLists();
        this.getChannelList();
    },
    computed: {
        ...mapGetters(['system'])
    },
    render(h) {
        const tableData = this.listDataGetter() || {};
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    (this.status === "list") ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.preStatus.push("list");
                                this.formData = Object.assign({}, this.defaultFormData);
                                this.selectItems = null;
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : (
                        <div class="filter-container">
                            {
                                this.status === "device" || this.status === 'page' ? <div><el-button class="filter-item" onClick={
                                    () => {
                                        this.status = this.preStatus.pop();
                                    }
                                } type="primary">
                                    返回
                                </el-button>
                                <el-button class="filter-item" disabled={this.status === 'device' ? false : this.pageSelectedItems.length !== 1} onClick={
                                    () => {
                                        if (this.status === 'device') {
                                            const deviceUuid = [];
                                            this.deviceSelectedItems && this.deviceSelectedItems.map(item => {
                                                deviceUuid.push(item.deviceId);
                                            });
                                            this.formData.deviceUuid = deviceUuid.join(',');
                                        } else if (this.status === 'page') {
                                            this.formData.pageId = this.pageSelectedItems[0].pageCode;
                                            this.pageName = this.pageSelectedItems[0].name;
                                        }
                                        this.status = this.preStatus.pop();

                                    }
                                } type="primary">确定</el-button>
                                </div> : ''
                            }
                        </div>
                    )
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={defaultData.listData.pageAction} data={tableData}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={this.viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : (this.status === 'device' ? <Vtable ref="Vtable" pageAction={defaultData.deviceData.pageAction} data={tableData}
                                                                                                                                                defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={this.viewRule}
                                                                                                                                                handleSelectionChange={this.handleDevice}/> : (this.status === 'page' ? <Vtable ref="Vtable" pageAction={defaultData.pageData.pageAction} data={tableData}
                                                                                                                                                                                                                                         defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={this.viewRule}
                                                                                                                                                                                                                                         handleSelectionChange={this.handlePage}/> : this.cruHtml(h)))
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
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData} ref="addForm" label-position="right" label-width="90px">
                    <el-form-item label="推送类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} name='type' onChange={() => {
                            if (this.formData.type === 4) {
                                this.msgStatus = true;
                            } else {
                                this.msgStatus = false;
                                this.formData.title = '';
                                this.formData.content = '';
                                this.formData.pageId = '';
                            }
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
                    <el-form-item label="推送方式" prop="method">
                        <el-radio-group value={this.formData.method} name='method' onChange={() => {
                            if (this.formData.method === 1) { //机型
                                this.channelStatus = true ;
                                this.deviceStatus = false ;
                                this.formData.channelCode = this.channelList[0].code;
                                this.formData.groupId = '';
                                this.formData.deviceUuid = '';
                            } else {
                                this.deviceStatus = true ;
                                this.channelStatus = false ;
                                this.formData.channelCode = '';
                                this.formData.groupId = this.groupList[0].id;
                            }
                        }}>
                            <el-radio value={1} label={1}>机型</el-radio>
                            <el-radio value={2} label={2}>设备组</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-show={this.channelStatus}>
                        <el-form-item label="机型" prop="channelCode">
                            <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                                {
                                    this.channelList && this.channelList.map(item => (
                                        <el-option
                                            key={item.id}
                                            label={item.name}
                                            value={item.code}>
                                        </el-option>
                                    ))
                                }
                            </el-select>
                        </el-form-item>
                    </div>

                    <div v-show={this.deviceStatus}>
                        <el-form-item label="设备组" prop="groupId">
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
                        </el-form-item>
                        <el-form-item label="指定设备" prop="deviceUuid">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.deviceSelectedItems = [];
                                    this.preStatus.push(this.status);
                                    this.status = "device";
                                }
                            } type="primary" disabled={!this.formData.groupId}>选择设备
                            </el-button>
                            {
                                this.formData.deviceUuid ? <el-input type="textarea" value={this.formData.deviceUuid} name="deviceUuid"></el-input> : ''
                            }
                        </el-form-item>
                    </div>
                    <div v-show={this.msgStatus}>
                        <el-form-item label="标题" prop="title">
                            <el-input type="textarea" value={this.formData.title} name="title"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <el-input type="textarea" value={this.formData.content} name="content"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转页面" prop="pageId">
                            <el-button onClick={() => {
                                this.pageSelectedItems = [];
                                this.preStatus.push(this.status);
                                this.status = "page";
                            }}>选择</el-button>
                            <el-tag type="success" style="margin-left:10px" value={this.formData.pageId} name="pageId" v-show={this.pageName}>{this.pageName}</el-tag>
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                                this.channelStatus = true;
                                this.deviceStatus = false;
                                this.msgStatus = false;
                                this.pageName = '';
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },
        topButtonHtml: function (h) {
            return (
                this.status === "list" ? <div class="filter-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.preStatus.push('list');
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
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
                            this.channelStatus = true;
                            this.deviceStatus = false;
                            this.msgStatus = false;
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        updateView: function () {
            switch (this.status) {
                case 'list':
                    break;
                case 'add':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },
        handlePage: function (selectedItems) {
            this.pageSelectedItems = selectedItems;
        },
        handleDevice: function (selectedItems) {
            this.deviceSelectedItems = selectedItems;
        },
        getGroupLists: function() {
            getGroupList().then(res => {
                this.groupList = res;
                this.formData.groupId = res[0].id;
            });
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                this.defaultFormData.channelCode = res[0].code;
                this.formData.channelCode = res[0].code;
            }).catch((err) => {
            });
        },
    }
});
