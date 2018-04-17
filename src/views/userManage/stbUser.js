/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: stbUser.js @author: walljack@163.com @date: 18-3-21 上午10:14 @version: 1.0
 */

/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData, parseTime} from "../../utils/index";
import {
    banVIP, setDeviceFilter, setDeviceStatus, stbUserActivateRecordEdit,
    stbUserSaveActivate, getShareProduct, save as saveStbUser, stbUserReset
} from "../../api/userManage";
import {soundDisable} from "../../api/recordManage";

const defaultData = {
    listData: {
        viewRule: [
            {columnKey: 'deviceId', label: '设备编号', minWidth: 144},
            {columnKey: 'sn', label: 'SN号', minWidth: 255, inDetail: true},
            {columnKey: 'mac', label: 'MAC地址', minWidth: 135, inDetail: true},
            {columnKey: 'channelName', label: '机型', minWidth: 150},
            {columnKey: 'orderCount', label: '订单数', minWidth: 70},
            {columnKey: 'orderAmount', label: '总金额', minWidth: 70},
            {columnKey: 'ip', label: '最近登录ip', minWidth: 150, inDetail: true},
            {columnKey: 'city', label: '归属地', sortable: true, inDetail: true},
            {columnKey: 'random', label: '随机码', formatter: (r, h) => {
                if (r.random) return (<div><el-popover
                    placement="top"
                    width="100%"
                    trigger="click"
                    content={r.random}>
                    <div slot="reference" style="width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{r.random}</div>
                </el-popover></div>);
                return '';
            }, inDetail: true},
            {columnKey: 'nickname', label: '别名'},
            {columnKey: 'isShare', label: '是否共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
            }},
            {columnKey: 'status', label: '设备状态', formatter: r => {
                if (r.status === 1) return '已开启';
                if (r.status === -1) return '禁用';
                if (r.status === -2) return '禁用';
            }},
            {columnKey: 'vipExpireTime', label: 'vip状态', minWidth: 90, formatter: (r, h) => {
                //后台给的判断方法
                if (r.disableVip === 2) {
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
            {columnKey: 'registerCount', label: '开机次数', minWidth: 140, inDetail: true},
            {columnKey: 'vipExpireTime', label: '到期时间', minWidth: 140, inDetail: true},
            {columnKey: 'useTime', label: '最近下单时间', minWidth: 140, inDetail: true},
            {columnKey: 'createTime', label: '注册时间', minWidth: 140, sortable: true},
            {columnKey: 'updateTime', label: '更新时间', minWidth: 140, sortable: true},
            {label: '操作', buttons: [{label: '查看', type: 'viewDetail'}, {label: '激活', type: 'del'}, {label: '推送', type: 'push'}], minWidth: 224}
        ],
        pageActionSearchColumn: [],
        pageActionSearch: [
            {
                column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
            },
            {
                column: 'type', label: '请选择是否注册', type: 'option', value: 2, options: [
                    {value: 2, label: '已注册'},
                    {value: 3, label: '未注册'},
                ]
            },
            {
                column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                    {value: 0, label: '非共享'},
                    {value: 1, label: '共享'},
                ]
            },
            {
                column: 'status', label: '请选择设备状态', type: 'option', value: '', options: [
                    {value: 1, label: '已开启'},
                    {value: -1, label: '设备永久禁用'},
                    {value: -2, label: '到时间禁用'},
                ]
            },
            {column: 'nickname', label: '请输入设备别名', type: 'input', value: ''},
            {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
            {column: 'sn', label: '请输入SN号', type: 'input', value: ''},
        ],
        defaultFormData: {
            id: '',
            nickname: '',
        },
        enableDefaultCurrentPage: true,
        listDataGetter: function() {
            return this.userManage.stbUserPage;
        },
        pageAction: 'stbUser/RefreshPage'
    },
    loginInfoData: {
        viewRule: [
            {columnKey: 'nickName', label: '用户昵称', minWidth: 120},
            {columnKey: 'openid', label: 'openId', minWidth: 120},
            {columnKey: 'userUuid', label: '用户UUID', minWidth: 285},
            {columnKey: 'createTime', label: '登录时间', minWidth: 175},
            {imgColumn: 'headerImg', label: '用户头像'}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {},
        enableDefaultCurrentPage: true,
        listDataGetter: function() {
            return this.userManage.stbUserLoginPage;
        },
        pageAction: 'stbUser/user/page/RefreshPage'
    },
    deviceBootData: {
        viewRule: [
            {columnKey: 'deviceUuid', label: '设备号', minWidth: 90, inDetail: true},
            {columnKey: 'deviceIp', label: '设备IP', minWidth: 90, inDetail: true},
            {columnKey: 'city', label: '城市', minWidth: 90},
            {columnKey: 'region', label: '省份', minWidth: 90},
            {columnKey: 'area', label: '区域', minWidth: 95},
            {columnKey: 'country', label: '国家', minWidth: 120},
            {columnKey: 'createTime', label: '创建时间'},
            // {columnKey: 'updateTime', label: '更新时间'}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.deviceBootInfoPage;
        },
        pageAction: 'stbUser/user/device/boot/RefreshPage'
    },
    bindDeviceInfoData: {
        viewRule: [
            {columnKey: 'userUuid', label: '用户UUID', minWidth: 285},
            {columnKey: 'nickName', label: '昵称', minWidth: 120},
            {imgColumn: 'headerImg', label: '头像'},
            {columnKey: 'expireTime', label: '绑定过期时间', minWidth: 170},
            {columnKey: 'status', label: '绑定状态', minWidth: 160}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.stbUserUserPage;
        },
        pageAction: 'stbUser/user/RefreshPage'
    },
    payOrderingsData: {
        viewRule: [
            {columnKey: 'orderNo', label: '订单号', minWidth: 285},
            {columnKey: 'productName', label: '产品名称', minWidth: 120},
            {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 140},
            {columnKey: 'type', label: '激活方式', formatter: (r, h) => {
                switch (r.type) {
                    case 1:
                        return '订购支付激活';
                    case 2:
                        return '用户免费领取VIP激活（非共享）';
                    case 3:
                        return '后台直接配置（共享）';
                    default:
                        return '';
                }
            }},
            {columnKey: 'productType', label: '产品类型', minWidth: 140, formatter: (r, h) => {
                switch (r.productType) {
                    case 1:
                        return '非共享设备产品';
                    case 2:
                        return '共享设备产品';
                    default:
                        return '';
                }
            }},
            {columnKey: 'discountType', label: '折扣类型', minWidth: 140, formatter: (r, h) => {
                switch (r.discountType) {
                    case 0:
                        return '没有折扣';
                    case 1:
                        return '立减金额';
                    case 2:
                        return '赠送时间';
                    case 3:
                        return '都有';
                    default:
                        return '';
                }
            }},
            {columnKey: 'productVipContent', label: '产品模板VIP有效时间', minWidth: 140, formatter: (r, h) => {
                if (r.productVipContent === null) return '';
                if (parseInt(r.productType, 10) === 2) {
                    return r.productVipContent + '（分钟）';
                }
                return r.productVipContent + '（天）';
            }},
            {columnKey: 'activeDay', label: '实际VIP有效时间', minWidth: 140, formatter: (r, h) => {
                if (r.activeDay === null) return '';
                if (parseInt(r.productType, 10) === 2) {
                    return r.activeDay + '（分钟）';
                }
                return r.activeDay + '（天）';
            }},
            {columnKey: 'discountDetail', label: '折扣详情', minWidth: 140},
            {columnKey: 'salePrice', label: '售价（元）', minWidth: 140},
            {columnKey: 'dealPrice', label: '成交价（元）', minWidth: 140},
            {columnKey: 'createTime', label: '创建时间', minWidth: 170}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {},
        listDataGetter: function() {
            return this.userManage.stbUserOrderPage;
        },
        enableDefaultCurrentPage: false,
        pageAction: 'stbUser/order/RefreshPage'
    },
    recordingsData: {
        viewRule: [
            {auditionColumn: 'nameNorm', label: '歌曲名称', minWidth: 220},
            {columnKey: 'isEnabled', label: '录音状态', formatter: r => {
                if (r.isEnabled === 1) return '开启';
                if (r.isEnabled === 2) return '禁用';
            }},
            // {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
            // {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
            {columnKey: 'createTime', label: '录音时间', minWidth: 170},
            {label: '操作', buttons: [{label: '下载', type: 'download'}, {label: r => r.isEnabled === 1 ? '禁用' : '开启', type: 'ban'}], minWidth: 145}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.stbUserUserSoundPage;
        },
        pageAction: 'stbUser/userSound/RefreshPage'
    },
    activeRecordingsData: {
        viewRule: [
            {columnKey: 'activateCode', label: '激活码', minWidth: 285},
            {columnKey: 'days', label: '激活天数', minWidth: 120},
            {columnKey: 'useTime', label: '使用时间', minWidth: 170},
            // {columnKey: 'status', label: '标识', minWidth: 100, formatter: r => {
            //     switch (r.status) {
            //         case 1:
            //             return '配置激活';
            //         case 2:
            //             return '免费激活';
            //         default:
            //             break;
            //     }
            // }},
            // {columnKey: 'remark', label: '备注', minWidth: 170},
            // {label: '操作', buttons: [{label: '设置', type: 'activeSettings'}], minWidth: 70}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {
            id: null,
            status: null,
            remark: null
        },
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.stbUserActivateRecordPage;
        },
        pageAction: 'stbUser/activateRecord/RefreshPage'
    },
    msgListData: {
        viewRule: [
            {columnKey: 'msgTitle', label: '消息标题', minWidth: 120},
            {columnKey: 'msgContent', label: '消息内容', minWidth: 220},
            // 1-活动推送 2-支付成功 3-包年到期 4-反馈回复 5-vip即将到期提示
            {columnKey: 'msgType', label: '消息类型', minWidth: 100, formatter: r => {
                switch (r.msgType) {
                    case 1:
                        return '活动推送';
                    case 2:
                        return '支付成功';
                    case 3:
                        return '包年到期';
                    case 4:
                        return '反馈回复';
                    case 5:
                        return 'vip即将到期提示';
                    case 6:
                        return '免费领取vip成功';
                    case 7:
                        return '后台免费赠送vip';
                    default:
                        return '';
                }
            }},
            {columnKey: 'msgTime', label: '发送时间', minWidth: 170}
        ],

        pageActionSearchColumn: [],
        pageActionSearch: [],
        defaultFormData: {
            deviceConfigId: null
        },
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.stbUserMessagePage;
        },
        pageAction: 'stbUser/message/RefreshPage'
    },
    activeData: {
        deviceConfigId: null,
        day: null,
        isShare: null,
        id: null
    },
    setDeviceData: {
        id: null,
        status: null,
        frozenTime: null
    },
    deviceResetData: {
        type: 1,
        deviceUuid: '',
    }
};

const styles = {
    table: {
        borderCollapse: 'collapse',
        lineHeight: '24px',
        fontSize: '14px',
        color: '#1f2d3d',
        textAlign: 'left',
        boxSizing: 'border-box',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        border: 'none',
        borderColor: '#dfe6ec'
    },
    cell: {
        padding: '10px',
        boxSizing: 'border-box'
    }
};

// 查看详情页面配置数据
const viewDetailRules = [
    [
        {label: '设备编号'},
        {val: 'deviceId', buttons: [
            {click: 'deviceReset', type: 'danger', content: target => '重置'}
        ]},

        {label: 'SN'},
        {val: 'sn', minWidth: 232},
        {label: 'mac地址'},
        {val: 'mac'}
    ],
    [
        {label: '机型'},
        {val: 'channelName'},
        {label: 'wifimac'},
        {val: 'wifimac', minWidth: 232},
        {label: '注册时间'},
        {val: 'createTime'}
    ],
    [
        {label: 'vip状态'}, //当前状态
        {status: selectItem => {
            if (selectItem.disableVip === 2) {
                return '已禁用';
            } else {
                if (selectItem.vipExpireTime === null) {
                    return '未激活';
                } else {
                    const date = (new Date()).getTime();
                    const expireTime = (new Date(selectItem.vipExpireTime)).getTime();
                    if ((date - expireTime) <= 0) {
                        return '已激活';
                    } else {
                        return '已过期';
                    }
                }
            }
        }},
        {label: '会员到期时间', minWidth: 110},
        {status: selectItem => {
            return selectItem.vipExpireTime === null ? '未开通会员' : selectItem.vipExpireTime;
        }, buttons: [
            {click: 'banVIPClick', content: target => {
                return !target.disableVip ? '禁用' : '恢复';
            }, disabled: selectItem => {
                return selectItem.vipExpireTime === null;
            }}
        ]},
        {label: '设备状态'},
        {minWidth: 215, status: selectItem => {
            return selectItem.status === 1 ? '已开启' : '禁用';
        }, buttons: [
            {click: 'toSetDeviceStatusPage', content: () => {
                return '设置';
            }},
            {click: 'setDeviceFilter', content: target => {
                return !target.isFilter ? '过滤' : '恢复过滤';
            }}
        ]}
    ],
    [
        {label: '友盟token'},
        {val: 'pushtoken', minWidth: 375},
        {label: 'app版本'},
        {val: 'deviceVersion'},
        {label: '服务端版本', minWidth: 95},
        {val: 'serverVersion'}
    ],
    [
        {label: '最近登录ip', minWidth: 95},
        {val: 'ip'},
        {label: '归属地'},
        {val: 'city'},
        {label: '随机码'},
        {val: 'random'},
    ],
    [
        {label: '最近下单时间'},
        {val: 'useTime', minWidth: 375},
        {label: '订单总数'},
        {val: 'orderCount'},
        {label: '总收入', minWidth: 95},
        {val: 'orderAmount'}
    ],
    [
        {label: '开机次数'},
        {val: 'registerCount', minWidth: 375},
    ],
];

// tabs按钮配置
const pages = [
    {status: 'viewDetail', label: '查看详情'},
    {status: 'loginInfo', label: '用户登陆记录'},
    {status: 'deviceBoot', label: '设备开机日志'},
    {status: 'bindDeviceInfo', label: '绑定设备（微信点歌）'},
    {status: 'payOrderings', label: '支付记录'},
    {status: 'recordings', label: '设备录音数据'},
    {status: 'activeRecordings', label: '激活码激活记录'},
    {status: 'msgList', label: '消息列表'}
];

const validRules = {};

export default BaseListView.extend({
    name: "stbUserPage",
    data() {
        const _defaultData = Object.assign({}, defaultData.listData);
        return {
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
            activeData: [], // 激活页面下拉列表数据
            activeShareData: [], //共享数据
            loginInfoData: [], // 登陆信息
            tabActiveItemName: pages[0].status, // tab激活项name
            selectItem: null, // 选中项
            disableVip: null,
            isFilter: null,
            editNickNameId: ''
        };
    },

    created() {
        this.refreshChanel();
        this.activeDeviceGetter();
    },
    watch: {
        optionsChannel: function() {
            if (defaultData.pageActionSearch[0].options.length === 0) {
                this.optionsChannel.map(i => defaultData.pageActionSearch[0].options.push({label: i.name, value: i.code}));
            }
        }
    },
    computed: {
        ...mapGetters(['userManage', 'system'])
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
        if (this.system.funChannelList && this.pageActionSearch[0] && this.pageActionSearch[0].options.length === 0) {
            this.system.funChannelList.map(f => {
                this.pageActionSearch[0].options.push({value: f.code, label: f.name});
            });
        }
    },
    methods: {

        handelPush(row) {
            this.$router.push({path: '/system/pushManage', query: {deviceUuid: row.deviceUuid, deviceId: row.deviceId}});
        },

        /**
         * 兼容写法
         * @param h
         * @returns {*|XML}
         */
        renderActiveHtml(h) {
            return this.cruHtml(h);
        },

        /**
         * 兼容写法
         * @param h
         * @returns {*|XML}
         */
        renderActiveSettingsHtml(h) {
            return this.cruHtml(h);
        },

        /**
         * 兼容写法
         * @param h
         * @returns {*|XML}
         */
        renderSetDeviceStatusHtml(h) {
            return this.cruHtml(h);
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            switch (this.currentPage) {
                case this.PAGE_EDIT:
                    return <el-form v-loading={this.loading} class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                        <el-form-item label="别名">
                            <el-input value={this.formData.nickname} onChange={v => this.formData.nickname = v}/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={f => {
                                this.applyApiDurFun(saveStbUser, e => this.pageBack());
                            }}>确定</el-button>
                            <el-button onClick={this.pageBack}>取消</el-button>
                        </el-form-item>
                    </el-form>;
                case pages[0].status:
                    return this.renderViewDetailHtml(h);
                // case pages[1].status:
                //     return this.renderLoginInfoHtml(h);
                default:
                    return this.submitHtml(h);
            }
        },

        /**
         * 顶部按钮配置
         * @param h
         * @returns {boolean|XML}
         */
        topButtonHtml: function (h) {
            return ((this.listStatus !== 'list' && this.currentPage !== 'setDeviceStatus' && this.currentPage !== 'deviceReset') && <div>
                <el-button type="primary" onClick={f => {
                    this.listStatus = 'list';
                    this.clearPageHistory();
                    this.pageReplace(this.PAGE_LIST);
                    this.showList();
                }}>返回</el-button>

                <el-tabs value={this.tabActiveItemName} onTab-click={this.tabsActive}>
                    {pages.map((item) => (<el-tab-pane
                        name={item.status}
                        label={item.label} />))}
                </el-tabs>
            </div>);
        },

        /**
         * 查看详情页面
         * @param h
         * @returns {XML}
         */
        renderViewDetailHtml: function (h) {
            const selectItem = this.selectItem;

            this.disableVip = selectItem.disableVip;
            this.isFilter = selectItem.isFilter;

            return <el-row>
                <el-col span={24} style={{overflowX: 'auto'}}>
                    <table border="1" style={styles.table}>
                        <tr>
                            {
                                viewDetailRules.map(rule => <tr>
                                    {
                                        rule.map(item => <td style={{...styles.cell, minWidth: `${item.minWidth || 88}px`}}>
                                            <span>
                                                {item.label ? item.label + ': ' : (item.val ? selectItem[item.val] : item.status(selectItem))}
                                                {item.val === "deviceId" ? <span><br />（昵称：{selectItem.nickname}）
                                                    <el-button size="mini" type="primary" onClick={f => {
                                                        this.formData = selectItem;
                                                        this.goPage(this.PAGE_EDIT);
                                                    }}>修改</el-button>
                                                </span> : ""}
                                            </span>
                                            {
                                                item.buttons && item.buttons.map(button => <el-button style={{marginLeft: '10px'}} disabled={button.disabled ? button.disabled(selectItem) : false} size="mini" type={button.type || "primary"} onClick={this[button.click]}>{button.content(this)}</el-button>)
                                            }
                                        </td>)
                                    }
                                </tr>)
                            }
                        </tr>
                    </table>
                </el-col>
            </el-row>;
        },

        /**
         * 登录信息页面
         * @param h
         * @returns {XML}
         */
        renderLoginInfoHtml: function (h) {

            const loginInfo = this.loginInfoData;

            return <div class="table">
                <el-table
                      border
                      data={loginInfo}
                      v-loading={this.loading}
                      tooltip-effect="dark"
                      style="width: 100%">
                      {
                          defaultData.loginInfoData.viewRule.map((viewRuleItem) => (
                              <el-table-column
                                  key={defaultData.loginInfoData.pageAction}
                                  prop={viewRuleItem.columnKey}
                                  scope="scope"
                                  label={viewRuleItem.label || viewRuleItem.columnKey}
                                  width={viewRuleItem.width || ''}
                                  min-width={viewRuleItem.minWidth || 100}
                                  fixed={viewRuleItem.fixed || false}
                                  formatter={viewRuleItem.imgColumn ? (row) => {
                                      const _img = row[viewRuleItem.imgColumn] || (row.tails && row.tails[viewRuleItem.imgColumn]);
                                      if (_img) return (<img src={_img} style="height: 30px; margin-top: 6px;"/>);
                                      return '';
                                  } : null} />
                          ))
                      }
                    </el-table>
            </div>;
        },

        /**
         * 激活、设置设备状态页面
         * @param h
         * @returns {XML}
         */
        submitHtml: function (h) {

            let submitFun = null;
            let options = [];
            let shareOptions = [];

            if (this.currentPage === 'active') {

                submitFun = this.activeSubmit;
                options = this.activeData;
                shareOptions = this.activeShareData;
                if (this.formData.deviceConfigId === null && options[0]) this.formData.deviceConfigId = options[0].id;
                if (this.formData.day === null && shareOptions.length > 0) {
                    this.formData.day = shareOptions[0].day;
                }
            } else if (this.currentPage === 'setDeviceStatus') {
                options = [
                    {status: 1, label: '启用'},
                    {status: -1, label: '永久禁用'},
                    {status: -2, label: '时间禁用'}
                ];
                submitFun = this.setDeviceStatusFilterSubmit;
            } else if (this.currentPage === 'activeSettings') {

                options = [
                    {status: 1, label: '配置激活'},
                    {status: 2, label: '免费激活'}
                ];
                submitFun = this.activeSettingsSubmit;
            } else if (this.currentPage === 'deviceReset') {

                options = [
                    {status: 1, label: 'vip失效（将清除支付相关信息，还原vip）'},
                    {status: 2, label: '清除历史数据（将清除设备其他信息）'},
                    {status: 3, label: '以上都是'},
                ];
                submitFun = this.deviceResetSubmit;
            }

            return <el-form v-loading={this.loading} class="small-space" model={this.formData}
                          ref="addForm" rules={this.rules} label-position="right" label-width="140px">

                {
                    this.currentPage === 'active' && <div><el-form-item label="配置设备免费活动：" v-show={this.formData.isShare !== 1}>
                        <el-select placeholder="请选择" value={this.formData.deviceConfigId} name='deviceConfigId'>
                            {
                                options && options.map(item => <el-option
                                    label={`${item.groupName}--${item.codeAutoDay}天`}
                                    value={item.id}
                                    key={item.id}/>)
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品包活动：" v-show={this.formData.isShare === 1}>
                        <el-select placeholder="请选择" value={this.formData.day} name="day">
                            {
                                this.activeShareData && this.activeShareData.map(item => <el-option
                                    label={`${item.remark}(${item.day})`}
                                    value={item.day}
                                    key={item.day}/>
                                )
                            }
                        </el-select>
                    </el-form-item>
                    </div>
                }

                {
                    this.currentPage === 'setDeviceStatus' && <div>
                        <el-form-item label="设备状态：">
                            <el-select placeholder={'请选择'} value={this.formData.status} name='status'>
                                {
                                    options.map(item => <el-option
                                        key={item.status}
                                        label={item.label}
                                        value={item.status}>
                                    </el-option>)
                                }
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show={this.formData.status === -2}>
                            <el-date-picker
                                style="max-width: 300px;"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                value={this.formData.frozenTime}
                                onInput={v => {
                                    this.formData.frozenTime = v || [];
                                }} />
                        </el-form-item>
                    </div>
                }

                {
                    (this.currentPage === 'activeSettings') && <el-form-item label="激活码激活：">
                        <el-select placeholder={'请选择'} value={this.formData.status} name='status'>
                            {
                                options.map(item => <el-option
                                    key={item.status}
                                    label={item.label}
                                    value={item.status}>
                                </el-option>)
                            }
                        </el-select>
                    </el-form-item>
                }

                {
                    (this.currentPage === 'activeSettings') && <el-form-item label="描述：">
                        <el-input type="textarea" value={this.formData.remark} name="remark"/>
                    </el-form-item>
                }

                {
                    (this.currentPage === 'deviceReset') && <el-form-item label="重置类型：">
                        <el-select placeholder={'请选择'} value={this.formData.type} name='type' onChange={v => this.formData.type = v}>
                            {
                                options.map(item => <el-option
                                    key={item.status}
                                    label={item.label}
                                    value={item.status}>
                                </el-option>)
                            }
                        </el-select>
                    </el-form-item>
                }

                <el-form-item>
                    <el-button type="primary" onClick={submitFun}>提交</el-button>
                    <el-button onClick={this.pageBack}>取消</el-button>
                </el-form-item>
            </el-form>;
        },

        /**
         * tabs激活处理
         * @param e
         */
        tabsActive: function (e) {
          this.listStatus = pages[e.index].status;

          if (this.listStatus !== pages[0].status)
              this.goPage('list');
              // this.status = 'list';

          switch (this.listStatus) {
              case pages[0].status:
                  this.goPage(pages[0].status);
                  // this.status = pages[0].status;
                  break;
              // case pages[1].status:
              //     this.goPage(pages[1].status);
              //     // this.status = pages[1].status;
              //     this.loginInfoGetter();
              //     break;
              default:
                  this.showList();
                  break;
          }
        },

        historyBack: function () {
            const lastPage = this.preStatus.pop();
            // if (this.currentPage === pages[1].status) {
            //     this.goPage(lastPage);
            //     // this.status = lastPage;
            //     this.loginInfoData = [];
            // }

            if (this.currentPage === pages[0].status)
                this.goPage(lastPage);
                // this.status = lastPage;

            this.listStatus = lastPage;
            this.showList();
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         */
        showList: function () {
            setTimeout(f => {
                let _thisData = defaultData[this.listStatus + 'Data'];

                const id = this.listStatus !== 'list' ? this.selectItem.id : null;

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
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.currentPage) {
                case this.PAGE_LIST:
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        this.$refs.Vtable.$on(pages[0].status, (row) => {
                            this.selectItem = row;

                            this.goPage(pages[0].status);
                            // this.status = pages[0].status;
                            this.tabActiveItemName = pages[0].status;
                            this.listStatus = pages[0].status;
                            this.preStatus.push('list');
                        });
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.goPage(this.PAGE_EDIT);
                            // this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });
                        this.$refs.Vtable.$on('del', (row) => {

                            this.formData = {...defaultData.activeData};
                            this.formData.id = row.id;
                            this.formData.isShare = row.isShare;
                            if (row.isShare === 1) {//共享设备
                                this.activeShareDeviceGetter(row.id);
                            }
                            this.goPage("active");
                            // this.status = "active";
                            this.preStatus.push('list');
                        });

                        this.$refs.Vtable.$on('download', (row) => {
                            window.location.href = row.musicUrl;
                        });

                        this.$refs.Vtable.$on('ban', (row) => {
                            this.banSound(row);
                        });

                        this.$refs.Vtable.$on('activeSettings', (row) => {
                            this.formData = {...this.defaultFormData};
                            for (let key in this.formData) {
                                this.formData[key] = (key === 'status' && row.status === 3) ? 1 : row[key];
                            }
                            this.goPage('activeSettings');
                            // this.status = 'activeSettings';
                            this.preStatus.push('list');
                        });

                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            if (this.enableDefaultCurrentPage) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        });

                        this.$refs.Vtable.$on('push', (row) => {
                            this.handelPush(row);
                        });

                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'active':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'setDeviceStatus':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'activeSettings':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },

        /**
         * 设备重置按钮操作
         */
        deviceReset: function () {
            this.formData = {...defaultData.deviceResetData};
            this.formData.deviceUuid = this.selectItem.deviceUuid;
            this.goPage('deviceReset');
            this.preStatus.push(pages[0].status);
        },

        /**
         * 设备重置提交
         */
        deviceResetSubmit: function () {
            // console.log(this.formData);
            this.submitLoading = true;
            stbUserReset(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.pageBack();
            }).catch(err => {
                this.submitLoading = false;
            });
        },

        renderDeviceResetHtml: function(h) {
            return this.cruHtml(h);
        },

        /**
         * 设置激活码提交
         */
        activeSettingsSubmit: function () {
            const param = this.formData;
            this.submitLoading = true;
            stbUserActivateRecordEdit(param).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.pageBack();
            }).catch(err => {
                this.submitLoading = false;
            });
        },

        /**
         * 设置设备状态
         */
        toSetDeviceStatusPage: function () {

            this.formData = {...defaultData.setDeviceData};

            for (let key in defaultData.setDeviceData) {
                this.formData[key] = (key === 'frozenTime' && this.selectItem.frozenTime === null) ? new Date() : this.selectItem[key];
            }

            this.goPage('setDeviceStatus');
            // this.status = 'setDeviceStatus';
            this.preStatus.push(pages[0].status);
        },

        /**
         * 设置设备状态提交
         */
        setDeviceStatusFilterSubmit: function () {
            const param = this.formData;
            this.submitLoading = true;
            param.frozenTime = parseTime(param.frozenTime);
            setDeviceStatus(param).then(res => {
                this.selectItem.status = this.formData.status;
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.pageBack();
            }).catch(err => {
                this.submitLoading = false;
            });
        },

        /**
         * 禁用录音
         * @param row
         */
        banSound(row) {
            this.dialogVisible = true;
            this.tipTxt = row.state === 1 ? "确定要禁用吗？" : "确定开启吗？";
            const menuId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                soundDisable(menuId).then(response => {
                    this.loading = false;
                    this.$message({
                        message: row.state === 1 ? "禁用成功！" : "开启成功！",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData();
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        /**
         * 禁用VIP
         */
        banVIPClick: function () {
            this.dialogVisible = true;
            this.tipTxt = !this.disableVip ? '确定要禁用VIP吗？' : '确定要恢复VIP吗';
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                banVIP(this.selectItem.id).then(res => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.selectItem.disableVip = !this.selectItem.disableVip;
                }).catch(err => {});
            };
        },

        /**
         * 设置设备过滤
         */
        setDeviceFilter: function () {
            this.dialogVisible = true;
            this.tipTxt = this.isFilter ? '确定要恢复过滤吗？' : '确定要过滤吗';
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                setDeviceFilter(this.selectItem.id).then(res => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.selectItem.isFilter = !this.selectItem.isFilter;
                }).catch(err => {
                });
            };
        },

        /**
         * 设备激活提交
         */
        activeSubmit: function () {

            const param = {};
            param.id = this.formData.id;
            if (this.formData.isShare === 1) {
                param.day = this.formData.day;
            } else {
                param.deviceConfigId = this.formData.deviceConfigId;
            }
            this.submitLoading = true;
            stbUserSaveActivate(param).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.pageBack();
            }).catch(err => {
                this.submitLoading = false;
            });
        },

        /**
         * 获取设备激活类型列表
         * @constructor
         */
        // loginInfoGetter: function () {
        //     this.$store.dispatch(defaultData.loginInfoData.pageAction, this.selectItem.id).then(res => {
        //         this.loginInfoData = [res];
        //     }).catch(err => {});
        // },

        /**
         * 获取设备激活类型列表
         * @constructor
         */
        activeDeviceGetter: function () { //非共享的设备信息
            this.$store.dispatch('device/deviceList').then(res => {
                this.activeData = res;
            }).catch(err => {});
        },

        /**
         * 获取共享的设备列表
         * @param param
         */
        activeShareDeviceGetter: function(param) { //共享设备信息
            this.loading = true;
            getShareProduct(param).then(res => {
               this.activeShareData = res;
                this.loading = false;
            }).catch(err => this.loading = false);
        },

        refreshChanel() {
            this.loading = true;
            this.$store.dispatch("fun/chanelList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },
    }
});
