import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {getPushType} from "../../utils/index";
import {getGroupList, pushSave} from '../../api/push';

const PUSH_TYPE_CHANNEL = 1;
const PUSH_TYPE_GROUP = 2;
const PUSH_TYPE_DEVICE = 3;

// 特殊选择页面的页面
const EXT_PAGE_CHOOSE_PAGE_PAGE = "choosePage";

const defaultData = {
    defaultFormData: {
        type: 1, //1最新配置, 2系统升级检测, 3应用升级检测, 4系统消息提醒
        method: PUSH_TYPE_CHANNEL, // 1机型，2设备组, 3: 设备
        groupId: '',
        channelCode: '', //机型
        deviceUuid: '', //指定设备,
        deviceId: '',
        target: '',
        targetName: '',
        title: '', //标题
        content: '', //内容
        pageId: '', //跳转页面
    },
    viewRule: [
        {columnKey: 'id', label: 'ID', minWidth: 110, sortable: true, inDetail: true},
        {columnKey: 'method', label: '推送方式', minWidth: 144, formatter: r => {
            if (r.method === PUSH_TYPE_CHANNEL) return '机型';
            if (r.method === PUSH_TYPE_GROUP) return '设备组';
            if (r.method === PUSH_TYPE_DEVICE) return '单个设备';
        }},
        {columnKey: 'type', label: '推送类型', minWidth: 140, formatter: r => {
            if (r.type === 1) return '最新配置';
            if (r.type === 2) return '系统升级检测';
            if (r.type === 3) return '应用升级检测';
            if (r.type === 4) return '系统消息提醒';

        }},
        {columnKey: 'target', label: '目标', minWidth: 140, formatter: r => {
            if (r.method === PUSH_TYPE_CHANNEL) return `机型${r.targetName ? `(${r.targetName})` : ''}`;
            if (r.method === PUSH_TYPE_GROUP) return `设备组${r.targetName ? `(${r.targetName})` : ''}`;
            if (r.method === PUSH_TYPE_DEVICE) return `单个设备${r.targetName ? `(设备号：${r.targetName})` : ''}`;
        }},
        // {columnKey: 'deviceUuid', label: '设备UUID', minWidth: 140},
        // {columnKey: 'channelName', label: '机型', minWidth: 120},
        // {columnKey: 'groupName', label: '设备组', minWidth: 120},
        {columnKey: 'title', label: '标题', sortable: true},
        {columnKey: 'content', label: '内容', inDetail: true},
        {columnKey: 'createTime', label: '推送时间', minWidth: 170, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true}
    ],
    validRules: {
        title: [
            {required: true, message: '请输入标题'}
        ],
        content: [
            {required: true, message: '请输入内容'},
        ],
        channelCode: [
            {required: true, message: '请选择机型'},
        ],
        deviceUuid: [
            {required: true, message: '请选择设备'},
        ],
        pageId: [
            {required: true, message: '请选择页面'},
        ],
    },
    tableCanSelect: false,
    listDataGetter: function() {
        return this.system.pushManage;
    },
    pageActionSearch: [
        // {column: 'deviceUuid', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'title', label: '请输入标题', type: 'input', value: ''},
        {
            column: 'type', label: '请选择类型', type: 'option', value: '', options: [
                {value: 1, label: '最新配置'},
                {value: 2, label: '系统升级检测'},
                {value: 3, label: '应用升级检测'},
                {value: 4, label: '系统消息提醒'},
            ]
        },
        {column: 'deviceId', label: '请输入设备号', type: 'input', value: ''},
    ],
    enableDefaultCurrentPage: true,
    pageActionSearchColumn: [],
    pageAction: 'push/RefreshPage',
    editFun: pushSave
};

const pageData = {
    defaultFormData: {},
    viewRule: [
        {columnKey: 'name', label: '页面名称'},
        {columnKey: 'pageCode', label: '页面ID'},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
                if (r.status === 1) return '生效';
                if (r.status === 2) return '禁用';
                if (r.status === 3) return '删除';
            }}
    ],
    listDataGetter: function() {
        return this.system.pageManage;
    },
    enableDefaultCurrentPage: false,
    tableCanSelect: true,
    pageActionSearch: [],
    pageActionSearchColumn: [],
    pageAction: 'page/RefreshPage'
};

const deviceData = {
    defaultFormData: {},
    viewRule: [
        {columnKey: 'nickname', label: '别名'},
        {columnKey: 'deviceId', label: '设备编号', minWidth: 144},
        {columnKey: 'isShare', label: '是否共享', formatter: r => {
            if (r.isShare === 0) return '非共享';
            if (r.isShare === 1) return '共享';
        }},
        {columnKey: 'sn', label: 'SN号', minWidth: 255, inDetail: true},
        {columnKey: 'mac', label: 'MAC地址', minWidth: 135, inDetail: true},
        {columnKey: 'channelName', label: '机型', minWidth: 150},
        {columnKey: 'orderCount', label: '订单数', minWidth: 70, inDetail: true},
        {columnKey: 'orderAmount', label: '总金额', minWidth: 70, inDetail: true},
        {columnKey: 'ip', label: '最近登录ip', minWidth: 150, inDetail: true},
        {columnKey: 'city', label: '归属地', sortable: true, inDetail: true},
        {columnKey: 'status', label: '设备状态', formatter: r => {
            if (r.status === 1) return '已开启';
            if (r.status === -1) return '禁用';
            if (r.status === -2) return '禁用';
        }},
        {columnKey: 'vipExpireTime', label: 'vip状态', minWidth: 90, formatter: (r, h) => {
            //后台给的判断方法
            if (r.disableVip == 2) {
                return '已禁用';
            } else {
                if (r.vipExpireTime === null) {
                    return '未激活';
                } else {
                    const date = (new Date()).getTime();
                    const expireTime = (new Date(r.vipExpireTime)).getTime();
                    if ((date - expireTime) <= 0) {
                        return '已激活';
                    } else {
                        return '已过期';
                    }
                }
            }
        }},
        {columnKey: 'createTime', label: '注册时间', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', inDetail: true},
    ],
    listDataGetter: function() {
        return this.userManage.stbUserPage;
    },
    enableDefaultCurrentPage: false,
    tableCanSelect: true,
    pageActionSearch: [
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'stbUser/RefreshPage'
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            validRules: _defaultData.validRules,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            tableCanSelect: false,
            pageAction: _defaultData.pageAction,
            rules: {},
            pushType: PUSH_TYPE_CHANNEL,
            groupList: [], //组列表
            channelList: [], //机型
            deviceSelectedItems: [], //设备选择列表
            pageSelectedItems: [], //页面选择列表
            pageName: '',
            editFun: pushSave
        };
    },
    watch: {
        selectItems: function (v, ov) {
            if (v && v.length > 0) {
                const selectedItem = v[0];
                if (selectedItem.deviceUuid) {
                    this.formData.target = selectedItem.deviceUuid;
                    this.formData.deviceId = selectedItem.deviceId;
                }
                if (selectedItem.pageCode) {
                    this.formData.pageId = selectedItem.pageCode;
                    this.formData.pageName = selectedItem.name;
                }
            }
        }
    },
    mounted() {
        this.getGroupLists();
        this.getChannelList();
        const {deviceUuid, deviceId} = this.$route.query;
        if (deviceUuid) {
            this.formData.method = PUSH_TYPE_DEVICE;
            this.formData.target = deviceUuid;
            this.formData.deviceId = deviceId;
            this.goPage(this.PAGE_ADD);
        }
    },
    computed: {
        ...mapGetters(['system', 'userManage'])
    },
    methods: {
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData} rules={this.validRules} ref="addForm" label-position="right" label-width="90px">
                    <el-form-item label="推送类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} onHandleOptionClick={f => this.formData.type = f.value} onChange={() => {
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
                                    <el-option key={item.value} label={item.label} value={item.value}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推送方式" prop="method">
                        <el-radio-group value={this.formData.method} name='method' onChange={() => {
                           this.formData.target = '';
                        }}>
                            <el-radio value={PUSH_TYPE_CHANNEL} label={PUSH_TYPE_CHANNEL}>机型</el-radio>
                            <el-radio value={PUSH_TYPE_GROUP} label={PUSH_TYPE_GROUP}>设备组</el-radio>
                            <el-radio value={PUSH_TYPE_DEVICE} label={PUSH_TYPE_DEVICE}>单个设备</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-show={this.formData.method === PUSH_TYPE_CHANNEL}>
                        <el-form-item label="机型" prop="target">
                            <el-select placeholder="请选择" value={this.formData.target} name='target'>
                                {
                                    this.channelList && this.channelList.map(item => (
                                        <el-option key={item.id} label={item.name} value={item.code}/>
                                    ))
                                }
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-show={this.formData.method === PUSH_TYPE_GROUP}>
                        <el-form-item label="设备组" prop="target">
                            <el-select placeholder="请选择" value={this.formData.target} name='target'>
                                {
                                    this.groupList && this.groupList.map(item => (
                                        <el-option key={item.uuid} label={item.name} value={item.uuid}/>
                                    ))
                                }
                            </el-select>
                        </el-form-item>
                    </div>
                    {
                        this.formData.method === PUSH_TYPE_DEVICE ? <el-form-item label="指定设备" prop="target">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.goPage(this.PAGE_LIST);
                                    this.showList("", true);
                                }
                            } type="primary" v-show={!this.formData.target}>
                                选择设备
                            </el-button>
                            <el-tag type="success" style="margin-left:10px" closable value={this.formData.target} name="target" v-show={this.formData.target} onClose={f => this.formData.target = null}>{this.formData.deviceId}</el-tag>
                        </el-form-item> : ""
                    }
                    {
                        this.msgStatus ? <div>
                            <el-form-item label="标题" prop="title">
                                <el-input type="textarea" value={this.formData.title} onChange={v => this.formData.title = v}/>
                            </el-form-item>
                            <el-form-item label="内容" prop="content">
                                <el-input type="textarea" value={this.formData.content} onChange={v => this.formData.content = v}/>
                            </el-form-item>
                            <el-form-item label="跳转页面" prop="pageId">
                                <el-button onClick={() => {
                                    this.pageSelectedItems = [];
                                    this.goPage(EXT_PAGE_CHOOSE_PAGE_PAGE);
                                    this.showList("", true);
                                }} v-show={!this.formData.pageId}>选择</el-button>
                                <el-tag type="success" style="margin-left:10px" closable value={this.formData.pageId} name="pageId" v-show={this.formData.pageId} onClose={f => this.formData.pageId = null}>{this.formData.pageName}</el-tag>
                            </el-form-item>
                        </div> : ""
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={f => {
                            this.submitAddOrUpdate(e => {
                                this.showList();
                            });
                        }}>提交</el-button>
                        <el-button onClick={f => {
                            this.pageBack();
                            this.showList();
                        }}>
                            取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST || this.currentPage === EXT_PAGE_CHOOSE_PAGE_PAGE ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" v-show={this.pageAction !== defaultData.pageAction} onClick={f => {
                        this.pageBack();
                    }} type="primary" icon="caret-left">
                        返回
                    </el-button>
                    <el-button class="filter-item" v-show={this.pageAction === defaultData.pageAction} onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">
                        添加
                    </el-button>

                </div> : ""
            );
        },

        renderChoosePageHtml(h) {
            return this.tableHtml(h);
        },

        getDataWhenShowListChange(choosePage, id, refreshPage) {
            if (choosePage) {
                if (this.currentPage === this.PAGE_LIST) {
                    return {...deviceData};
                } else if (this.currentPage === EXT_PAGE_CHOOSE_PAGE_PAGE) {
                    return {...pageData};
                }
            } else {
                return defaultData;
            }
            return choosePage ? {...deviceData} : defaultData;
        },

        getGroupLists: function() {
            getGroupList().then(res => {
                this.groupList = res;
                this.formData.groupId = res[0].uuid;
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
