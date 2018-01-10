/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData} from "../../utils/index";
import {groupDeleteUser, groupListDelete, groupListSave, groupSaveUser} from "../../api/grayGroup";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '组名称', minWidth: 120, sortable: true},
        {columnKey: 'createName', label: '创建人', minWidth: 170, sortable: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '关联设备', type: 'devices'}], minWidth: 236}
    ],

    tableCanSelect: false,

    defaultFormData: {
        id: null,
        name: '',
        info: ''

    },
    pageActionSearch: [
        {column: 'name', label: '请输入组名称', type: 'input', value: ''},
    ],
    listDataGetter: function() {
        return this.system.grayGroupPage;
    },
    pageAction: 'grayGroup/RefreshPage'
};

const devicesData = {
    viewRule: [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 250},
        {columnKey: 'nickname', label: '设备昵称', minWidth: 120},
        {columnKey: 'lastChannelName', label: '旧机型', minWidth: 260, formatter: (r, h) => {
            const name = r.lastChannelName || '';
            const code = r.lastChannelCode ? '(' + r.lastChannelCode + ')' : '';
            return name + code;
        }},
        {columnKey: 'lastAppVersion', label: '旧app版本', minWidth: 120},
        {columnKey: 'lastRomVersion', label: '旧rom版本', minWidth: 120},
        {columnKey: 'currentChannelName', label: '当前新机型', minWidth: 260, formatter: (r, h) => {
            const name = r.currentChannelName || '';
            const code = r.currentChannelCode ? '(' + r.currentChannelCode + ')' : '';
            return name + code;
        }},
        {columnKey: 'currentAppVersion', label: '当前app版本', minWidth: 120},
        {columnKey: 'currentRomVersion', label: '当前rom版本', minWidth: 120},
        {columnKey: 'updateStatues', label: '升级状态', formatter: (r, h) => {
            if (r.updateStatues === true) return '已升级';
            if (r.updateStatues === false) return '未升级';
        }},
        {label: '操作', buttons: [{label: '删除', type: 'del'}]}
    ],

    defaultFormData: {deviceUuids: []},
    tableCanSelect: true,
    pageActionSearch: [
    ],
    listDataGetter: function() {
        return this.system.grayGroupUserPage;
    },
    pageAction: 'grayGroup/user/RefreshPage'
};

const addDevicesData = {
    viewRule: [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 285},
        {columnKey: 'status', label: '设备状态', formatter: r => {
            if (r.status === 1) return '已开启';
            if (r.status === -1) return '禁用';
            if (r.status === -2) return '禁用';
        }},
        {columnKey: 'mac', label: 'MAC地址', minWidth: 135},
        {columnKey: 'channelName', label: '机型', minWidth: 150},
        {columnKey: 'sn', label: 'SN号', minWidth: 255},
        {columnKey: 'freeDays', label: '免费天数', minWidth: 100},
        {columnKey: 'createTime', label: '注册时间', minWidth: 170},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170}
    ],

    defaultFormData: {deviceUuids: []},
    tableCanSelect: true,
    listDataGetter: function() {
        return this.system.stbUserPage;
    },
    pageAction: 'stbUser/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '请输入名称', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
    ]
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            rules: validRules,
            groupId: null
        };
    },

    computed: {
        ...mapGetters(['system', 'channel'])
    },

    methods: {

        /**
         * 获取渠道列表
         */
        channelGetter: function () {
            this.$store.dispatch('channel/RefreshPage', {currentPage: 1, pageSize: 20}).then(res => {}).catch(err => {});
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {

            if (this.status === "add" || this.status === "edit") {

                const {data} = this.channel.channelPage;

                if (this.defaultFormData.channelCode === null) this.defaultFormData.channelCode = data[0] ? data[0].code : null;

                return (
                    <el-form v-loading={this.loading} class="small-space" model={this.defaultFormData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                        <el-form-item label="灰度组名称：" prop="name">
                            <el-input value={this.defaultFormData.name} name='name'/>
                        </el-form-item>
                        <el-form-item label="描述：" prop="info">
                            <el-input type="textarea" value={this.defaultFormData.info} name='info'/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={f => this.status = this.preStatus.pop()}>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                );
            }
        },

        topButtonHtml: function (h) {
            return (
                this.listStatus === "list" ? (this.status === 'list' ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.preStatus.push("list");
                            this.selectItem = null;
                            this.owned = [];
                            this.defaultFormData = Object.assign({}, defaultData.defaultFormData);
                            this.channelGetter();
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : '') : (<div class="filter-container">
                    <el-button class="filter-item" onClick={this.historyBack} type="primary">返回</el-button>
                    {
                        this.listStatus === 'addDevices' ? <el-button class="filter-item" onClick={this.queryAdd} type="primary">保存</el-button> : <div style="display: inline-block; margin-left: 10px;">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.listStatus = 'addDevices';
                                    this.preStatus.push('devices');
                                    this.showList();
                                }
                            } type="primary">添加设备</el-button>

                            <el-button class="filter-item" onClick={this.queryDelete} type="primary">批量删除</el-button>
                        </div>
                    }
                </div>)
            );
        },

        /**
         * 批量添加
         */
        queryAdd: function () {
            if (!this.defaultFormData.deviceUuids || this.defaultFormData.deviceUuids.length <= 0) {
                this.$message({
                    message: "请选择添加项！",
                    type: "error"
                });
                return;
            }
            groupSaveUser(this.groupId, this.defaultFormData).then(() => {
                this.$message({
                    message: "操作成功！",
                    type: "success"
                });
                this.$refs.Vtable && this.$refs.Vtable.refreshData({
                    currentPage: this.defaultCurrentPage
                });
                this.submitLoading = false;
                this.historyBack();
            }).catch(err => {
                console.log(err);
                this.submitLoading = false;
            });
        },

        /**
         * 批量删除
         */
        queryDelete: function () {
            if (!this.defaultFormData.deviceUuids || this.defaultFormData.deviceUuids.length <= 0) {
                this.$message({
                    message: "请选择删除项！",
                    type: "error"
                });
                return;
            }
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                groupDeleteUser(this.groupId, this.defaultFormData).then(() => {
                    this.$message({
                        message: "操作成功！",
                        type: "success"
                    });
                    this.$refs.Vtable && this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                    this.submitLoading = false;
                }).catch(err => {
                    console.log(err);
                    this.submitLoading = false;
                });
            };

        },

        historyBack: function () {
            this.listStatus = this.preStatus.pop();
            this.showList();
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         */
        showList: function () {
            let id = null;
            setTimeout(f => {
                let _thisData = null;
                switch (this.listStatus) {
                    case 'list':
                        _thisData = defaultData;
                        break;
                    case 'devices':
                        id = this.groupId;
                        _thisData = devicesData;
                        break;
                    case 'addDevices':
                        _thisData = addDevicesData;
                        break;
                    default:
                        break;
                }

                for (let key in _thisData) {
                    this[key] = _thisData[key];
                }
                this.enableDefaultCurrentPage = !id;
                this.pageActionSearchColumn = [{
                    urlJoin: id
                }];
            }, 50);
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    groupListSave(this.defaultFormData).then(() => {
                        this.$message({
                            message: "操作成功！",
                            type: "success"
                        });
                        this.$refs.Vtable && this.$refs.Vtable.refreshData({
                            currentPage: this.defaultCurrentPage
                        });
                        this.submitLoading = false;
                        this.status = 'list';
                    }).catch(e => {
                        console.log(e);
                        this.submitLoading = false;
                    });
                }
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
            if (this.defaultFormData.deviceUuids) {
                let arr = [];
                selectedItems.map(item => {
                    arr.push(item.deviceUuid);
                });
                this.defaultFormData.deviceUuids = arr;
            }
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
                groupListDelete(menuId).then(response => {
                    this.loading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            // for (let key in this.defaultFormData) {
                            //     this.defaultFormData[key] = row[key];
                            // }
                            this.defaultFormData = row;
                            this.status = "edit";
                            this.preStatus.push('list');
                            this.channelGetter();
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            if (this.listStatus === 'list') {
                                this.submitDel(row);
                            } else if (this.listStatus === 'devices') {
                                this.defaultFormData.deviceUuids = [];
                                this.defaultFormData.deviceUuids.push(row.deviceUuid);
                                this.defaultFormData.deviceUuids.length > 0 && this.queryDelete();

                            }
                        });
                        this.$refs.Vtable.$on('devices', (row) => {
                            this.groupId = row.id;
                            this.listStatus = 'devices';
                            this.preStatus.push('list');
                            this.showList();
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
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
    }
});
