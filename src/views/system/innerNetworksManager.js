/**
 * Created by Zed on 2018/3/20.
 */

import BaseListView from "../../components/common/BaseListView";
import {
    innerNetworksAddChannels, innerNetworksDelete, innerNetworksDeleteChannels,
    innerNetworksSave, innerNetworksSendToPrivate
} from "../../api/innerNetworksManager";
import {mapGetters} from "vuex";

const PAGE_DETAIL = 'detail';

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '专网组名称', minWidth: 120, sortable: true},
        {columnKey: 'queueId', label: '通信队列ID', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否启用', minWidth: 120, formatter: r => {
            if (r.isEnabled === 1) return '启用';
            if (r.isEnabled === 2) return '未启用';
        }},
        {columnKey: 'updateName', label: '更新者', minWidth: 170, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '关联机型', type: PAGE_DETAIL}], minWidth: 236}
    ],

    tableCanSelect: false,

    defaultFormData: {
        id: '',
        name: '',
        queueId: '',
        isEnabled: 1,
    },
    pageActionSearch: [],
    listDataGetter: function() {
        return this.system.innerNetworksList;
    },
    enableDefaultCurrentPage: true,
    pageAction: 'innerNetworks/RefreshPage',
    editFun: innerNetworksSave,
    delItemFun: innerNetworksDelete
};

const detailData = {
    viewRule: [
        {columnKey: 'name', label: '机型名称', minWidth: 120, sortable: true},
        {columnKey: 'channelCode', label: '机型值', minWidth: 120, sortable: true},
    ],

    tableCanSelect: true,

    defaultFormData: {

    },
    pageActionSearch: [],
    listDataGetter: function() {
        return this.system.innerNetworksChannels;
    },
    enableDefaultCurrentPage: true,
    pageAction: 'innerNetworks/channels/RefreshPage',
    editFun: innerNetworksAddChannels,
};

const devicesData = {
    viewRule: [
        {columnKey: 'name', label: '机型名称', minWidth: 120, sortable: true},
        {columnKey: 'code', label: '机型值', minWidth: 120, sortable: true},
    ],

    tableCanSelect: true,

    defaultFormData: {},
    pageActionSearch: [],
    listDataGetter: function() {
        return this.system.innerNetworksRestChannels;
    },
    enableDefaultCurrentPage: true,
    pageAction: 'innerNetworks/restChannels/RefreshPage',
};

const validRules = {
    name: [
        {required: true, message: '通信队列ID', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
    ],
    queueId: [
        {required: true, message: '请输入专网组名称', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
    ],
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
            formData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            rules: validRules,
            editFun: _defaultData.editFun,
            delItemFun: _defaultData.delItemFun,
            sendToPrivateSerialNo: null,
        };
    },

    computed: {
        ...mapGetters(['system'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            if (this.currentPage === this.PAGE_ADD || this.currentPage === this.PAGE_EDIT) {
                return (
                    <el-form v-loading={this.loading} class="small-space" model={this.formData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                        <el-form-item label="专网组名称：" prop="name">
                            <el-input value={this.formData.name} name='name'/>
                        </el-form-item>
                        <el-form-item label="通信队列ID：" prop="queueId">
                            <el-input value={this.formData.queueId} name='queueId'/>
                        </el-form-item>
                        <el-form-item label="是否启用" prop="isEnabled">
                            <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                                <el-radio value={1} label={1}>启用</el-radio>
                                <el-radio value={2} label={2}>未启用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={this.pageBack}>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                );
            }
        },

        topButtonHtml: function (h) {
            const isDefaultPage = this.pageAction === defaultData.pageAction;
            const isDetailPage = this.pageAction === detailData.pageAction;
            const isDevicesPage = this.pageAction === devicesData.pageAction;
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        isDefaultPage ? <div>
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.goPage(this.PAGE_ADD);
                                    this.selectItem = null;
                                    this.formData = Object.assign({}, defaultData.defaultFormData);
                                }
                            } type="primary" icon="edit">添加</el-button>

                            <el-input value={this.sendToPrivateSerialNo} placeholder={"请输入歌曲SerialNo"} onChange={v => {
                                this.sendToPrivateSerialNo = v;
                            }} class="filter-item" style={{
                                verticalAlign: 'center',
                                maxWidth: '160px',
                                margin: '0 10px',
                            }} />

                            <el-button class="filter-item" onClick={
                                () => {
                                    // console.log(this.sendToPrivateSerialNo);

                                    this.clickSendToPrivate(this.sendToPrivateSerialNo);
                                }
                            } type="primary" icon="edit">推送</el-button>
                        </div> : ''
                    }

                    {
                        isDetailPage ? <div>
                            <el-button class="filter-item" onClick={f => {
                                this.pageBack();
                                this.showList('');
                            }} type="primary">返回</el-button>
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.goPage(this.PAGE_LIST);
                                    this.showList(this.searchId, PAGE_DETAIL);
                                }
                            } type="primary" icon="edit">添加机型</el-button>
                            <el-button class="filter-item" onClick={f => {
                                this.detailDelete(this.selectItems);
                            }} type="primary">批量删除</el-button>
                        </div> : ""
                    }

                    {
                        isDevicesPage && <div>
                            <el-button class="filter-item" onClick={f => {
                                this.showList(this.searchId, this.PAGE_LIST);
                            }} type="primary">返回</el-button>
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.addDevicesForInner(this.selectItems);
                                }
                            } type="primary" icon="edit">批量添加</el-button>
                        </div>
                    }

                </div> : ""
            );
        },

        /**
         * 推送歌曲
         * @param serialNo 歌曲serialNo
         */
        clickSendToPrivate: function (serialNo) {
            if (serialNo === null) {
                this.$message.error('请输入歌曲serialNo');
                return;
            }
            this.dialogVisible = true;
            this.tipTxt = "确定要推送吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                innerNetworksSendToPrivate(serialNo).then(res => {
                    this.submitLoading = false;
                    this.sendToPrivateSerialNo = null;
                    this.$message.success('推送成功');
                }).catch(err => {
                    this.submitLoading = false;
                    this.$message.error('推送失败');
                });
            };
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         * @param choosePage
         * @param refreshPage
         */
        showList: function (id, choosePage, refreshPage) {
            this.searchId = id;
            setTimeout(f => {
                const _thisData = this.getDataWhenShowListChange(choosePage, id);
                Object.keys(_thisData).map(key => {
                    this[key] = _thisData[key];
                });
                if (_thisData.defaultFormData && !choosePage) this.formData = _thisData.defaultFormData;
                if (id) {
                    this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                    this.pageActionSearchColumn = [{
                        queueId: id
                    }];
                    if (this.isLeike) this.tableCanSelect = false;
                } else {
                    this.pageActionSearchColumn = [];
                }
                if (refreshPage) this.refreshTable();
                this.searchId = id;
            }, 50);
        },

        getDataWhenShowListChange(choosePage, id) {
            console.log(choosePage);
            switch (choosePage) {
                case this.PAGE_LIST:
                    return Object.assign({}, detailData);
                case PAGE_DETAIL:
                    return Object.assign({}, devicesData);
                default:
                    return Object.assign({}, defaultData);
            }
        },

        handelDetail: function (row) {
            this.goPage(this.PAGE_LIST);
            this.showList(row.queueId, this.PAGE_LIST);
        },

        /**
         * 批量删除专网下机型
         * @param selectItems
         */
        detailDelete: function (selectItems) {
            if (selectItems.length <= 0) {
                this.$message.error('请选择要删除的选项');
                return;
            }

            const params = {
                queueId: this.searchId,
                channelCodes: [],
            };

            Object.keys(selectItems).map(key => {
                params.channelCodes.push(selectItems[key].channelCode);
            });

            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                innerNetworksDeleteChannels(params).then(res => {
                    this.submitLoading = false;
                    this.$message.success('删除成功');
                    this.goPage(this.PAGE_LIST);
                    this.refreshTable();
                }).catch(err => {
                    this.submitLoading = false;
                    this.$message.error('删除失败');
                });
            };
        },

        /**
         * 批量添加专网机型
         * @param selectItems
         */
        addDevicesForInner: function (selectItems) {
            if (selectItems.length <= 0) {
                this.$message.error('请选择要添加的选项');
                return;
            }

            const params = {
                queueId: this.searchId,
                channelCodes: [],
            };

            Object.keys(selectItems).map(key => {
                params.channelCodes.push(selectItems[key].code);
            });

            this.dialogVisible = true;
            this.tipTxt = "确定要添加吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                innerNetworksAddChannels(params).then(res => {
                    this.submitLoading = false;
                    this.$message.success('添加成功');
                    this.showList(this.searchId, this.PAGE_LIST);
                }).catch(err => {
                    this.submitLoading = false;
                    this.$message.error('添加失败');
                });
            };
        }

    }
});
