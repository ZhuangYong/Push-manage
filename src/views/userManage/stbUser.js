/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData, parseTime} from "../../utils/index";
import {
    banVIP, setDeviceFilter, setDeviceStatus, stbUserActivateRecordEdit,
    stbUserSaveActivate
} from "../../api/userManage";
import {soundDisable} from "../../api/recordManage";

const defaultData = {
    listData: {
        viewRule: [
            {columnKey: 'deviceId', label: '设备编号', minWidth: 285},
            {columnKey: 'sn', label: 'SN号', minWidth: 255},
            {columnKey: 'mac', label: 'MAC地址', minWidth: 135},
            {columnKey: 'channelName', label: '机型', minWidth: 150},
            {columnKey: 'orderCount', label: '订单数'},
            {columnKey: 'orderAmount', label: '总金额'},
            {columnKey: 'ip', label: '最近登录ip', minWidth: 150},
            {columnKey: 'city', label: '归属地'},
            {columnKey: 'random', label: '随机码', formatter: (r, h) => {
                if (r.random) return (<div><el-popover
                    placement="top"
                    width="100%"
                    trigger="click"
                    content={r.random}>
                    <div slot="reference" style="width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{r.random}</div>
                </el-popover></div>);
                return '';
            }},
            {columnKey: 'nickname', label: '备注'},
            {columnKey: 'status', label: '设备状态', formatter: r => {
                if (r.status === 1) return '已开启';
                if (r.status === -1) return '禁用';
                if (r.status === -2) return '禁用';
            }},
            {columnKey: 'createTime', label: '注册时间', minWidth: 170},
            {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
            {columnKey: 'vipExpireTime', label: 'vip状态', minWidth: 170, formatter: (r, h) => {
                //后台给的判断方法
                if (r.disableVip == 2) {
                    return '已禁用';
                } else {
                    if (r.vipExpireTime === null) {
                        return '未激活';
                    } else {
                        var date = (new Date()).getTime();
                        var expireTime = (new Date(r.vipExpireTime)).getTime();
                        if ((date - expireTime) <= 0) {
                            return '已激活';
                        } else {
                            return '已过期';
                        }
                    }
                }
            }},
            {label: '操作', buttons: [{label: '查看', type: 'viewDetail'}, {label: '激活', type: 'del'}], minWidth: 120}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {},
        listDataGetter: function() {
            return this.userManage.stbUserPage;
        },
        pageAction: 'stbUser/RefreshPage'
    },
    loginInfoData: {
        viewRule: [
            {columnKey: 'unionid', label: '用户UUID', minWidth: 285},
            {columnKey: 'nickName', label: '用户昵称', minWidth: 120},
            {imgColumn: 'headerImg', label: '用户头像'}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {},
        listDataGetter: function() {
            return this.userManage.stbUserLoginData;
        },
        pageAction: 'stbUser/login'
    },
    bindDeviceInfoData: {
        viewRule: [
            {columnKey: 'unionid', label: '用户unionid', minWidth: 285},
            {columnKey: 'nickName', label: '昵称', minWidth: 120},
            {imgColumn: 'headerImg', label: '头像'},
            {columnKey: 'expireTime', label: '绑定过期时间', minWidth: 170},
            {columnKey: 'status', label: '绑定状态', minWidth: 160}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {},
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
            {columnKey: 'duration', label: '时长'},
            {columnKey: 'discountType', label: '折扣方式', minWidth: 140, formatter: (r, h) => {
                //后端给的判断方式
                if (r.discountType == 0) {
                    return '无折扣';
                } else if (r.discountType == 1) {
                    return '立减金额';
                } else if (r.discountType == 2) {
                    return '赠送时间';
                } else if (r.discountType == 3) {
                    return '都有';
                }
            }},
            {columnKey: 'dealPrice', label: '折扣详情', minWidth: 140, formatter: (r, h) => {
                if (r.discountType == 1) { //优惠金额
                    return r.discount;
                } else if (r .discountType == 2) {//优惠时间
                    return r.extraTime;
                } else {//暂无第三种
                    return '';
                }
            }},
            {columnKey: 'startTime', label: '支付时间', minWidth: 170}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {},
        listDataGetter: function() {
            return this.userManage.stbUserOrderPage;
        },
        pageAction: 'stbUser/order/RefreshPage'
    },
    recordingsData: {
        viewRule: [
            {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 220},
            {columnKey: 'state', label: '录音状态', formatter: r => {
                if (r.state === 1) return '开启';
                if (r.state === -1) return '禁用';
            }},
            {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
            {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
            {columnKey: 'createTime', label: '录音时间', minWidth: 170},
            {label: '操作', buttons: [{label: '下载', type: 'download'}, {label: '禁用/开启', type: 'ban'}], minWidth: 145}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {},
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
            {columnKey: 'status', label: '标识', minWidth: 100, formatter: r => {
                switch (r.status) {
                    case 1:
                        return '配置激活';
                    case 2:
                        return '免费激活';
                    default:
                        break;
                }
            }},
            {columnKey: 'remark', label: '备注', minWidth: 170},
            {label: '操作', buttons: [{label: '设置', type: 'activeSettings'}], minWidth: 70}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {
            id: null,
            status: null,
            remark: null
        },
        listDataGetter: function() {
            return this.userManage.stbUserActivateRecordPage;
        },
        pageAction: 'stbUser/activateRecord/RefreshPage'
    },
    msgListData: {
        viewRule: [
            {columnKey: 'msgTitle', label: '消息标题', minWidth: 120},
            {columnKey: 'msgContent', label: '消息内容', minWidth: 220},
            {columnKey: 'msgType', label: '消息类型', minWidth: 100},
            {columnKey: 'msgTime', label: '发送时间', minWidth: 170}
        ],

        pageActionSearchColumn: [],

        defaultFormData: {
            deviceConfigId: null
        },
        listDataGetter: function() {
            return this.userManage.stbUserMessagePage;
        },
        pageAction: 'stbUser/message/RefreshPage'
    },
    activeData: {
        deviceConfigId: null,
        id: null
    },
    setDeviceData: {
        id: null,
        status: null,
        frozenTime: null
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
        {val: 'deviceId'},
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
            return selectItem.isActivate === 2 ? '已激活' : '未激活';
        }},
        {label: '会员到期时间', minWidth: 110},
        {status: selectItem => {
            return selectItem.vipExpireTime === null ? '未开通会员的穷逼' : selectItem.vipExpireTime;
        }, buttons: [
            {click: 'banVIPClick', content: target => {
                return !target.disableVip ? '禁用' : '恢复';
            }, disabled: selectItem => {
                return selectItem.vipExpireTime === null;
            }}
        ]},
        {label: '设备状态'},
        {minWidth: 166, status: selectItem => {
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
];

// tabs按钮配置
const pages = [
    {status: 'viewDetail', label: '查看详情'},
    {status: 'loginInfo', label: '当前登录信息'},
    {status: 'bindDeviceInfo', label: '绑定设备（微信点歌）'},
    {status: 'payOrderings', label: '支付记录'},
    {status: 'recordings', label: '设备录音数据'},
    {status: 'activeRecordings', label: '激活码激活记录'},
    {status: 'msgList', label: '消息列表'}
];

const validRules = {};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData.listData);
        return {
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            pageAction: _defaultData.pageAction,
            rules: validRules,
            activeData: [], // 激活页面下拉列表数据
            loginInfoData: [], // 登陆信息
            tabActiveItemName: pages[0].status, // tab激活项name
            selectItem: null, // 选中项
            disableVip: null,
            isFilter: null
        };
    },

    created() {
        this.activeDeviceGetter();
    },

    computed: {
        ...mapGetters(['userManage'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            switch (this.status) {
                case pages[0].status:
                    return this.viewDetailHtml(h);
                case pages[1].status:
                    return this.loginInfoHtml(h);
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
            return ((this.listStatus !== 'list' && this.status !== 'setDeviceStatus') && <div>
                <el-button type="primary" onClick={this.historyBack}>返回</el-button>

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
        viewDetailHtml: function (h) {
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
                                            <span>{item.label ? item.label + ': ' : (item.val ? selectItem[item.val] : item.status(selectItem))}</span>
                                            {
                                                item.buttons && item.buttons.map(button => <el-button disabled={button.disabled ? button.disabled(selectItem) : false} size="mini" type="primary" onClick={this[button.click]}>{button.content(this)}</el-button>)
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
        loginInfoHtml: function (h) {

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

            if (this.status === 'active') {

                submitFun = this.activeSubmit;
                options = this.activeData;
                if (this.formData.deviceConfigId === null) this.formData.deviceConfigId = options[0].id;
            } else if (this.status === 'setDeviceStatus') {

                options = [
                    {status: 1, label: '启用'},
                    {status: -1, label: '永久禁用'},
                    {status: -2, label: '时间禁用'}
                ];
                submitFun = this.setDeviceStatusFilterSubmit;
            } else if (this.status === 'activeSettings') {

                options = [
                    {status: 1, label: '配置激活'},
                    {status: 2, label: '免费激活'}
                ];
                submitFun = this.activeSettingsSubmit;
            }

            return <el-form v-loading={this.loading} class="small-space" model={this.formData}
                          ref="addForm" rules={this.rules} label-position="right" label-width="140px">

                    {
                        this.status === 'active' && <el-form-item label="配置设备免费活动：">
                            <el-select placeholder="请选择" value={this.formData.deviceConfigId} name='deviceConfigId'>
                                {
                                    options && options.map(item => <el-option
                                        label={`${item.groupName}--${item.codeAutoDay}天`}
                                        value={item.id}
                                        key={item.id}/>)
                                }
                            </el-select>
                        </el-form-item>
                    }

                    {
                        this.status === 'setDeviceStatus' && <el-form-item label="设备状态：">
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
                        (this.status === 'setDeviceStatus') && <el-form-item style={{display: this.formData.status === -2 ? 'block' : 'none'}}>
                            <el-date-picker
                                value={this.formData.frozenTime}
                                name='frozenTime'
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    }

                    {
                        (this.status === 'activeSettings') && <el-form-item label="激活码激活：">
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
                        (this.status === 'activeSettings') && <el-form-item label="描述：">
                            <el-input type="textarea" value={this.formData.remark} name="remark"/>
                        </el-form-item>
                    }

                <el-form-item>
                    <el-button type="primary" onClick={submitFun}>提交</el-button>
                    <el-button onClick={f => this.status = this.preStatus.pop()}>取消</el-button>
                </el-form-item>
            </el-form>;
        },

        /**
         * tabs激活处理
         * @param e
         */
        tabsActive: function (e) {
          this.listStatus = pages[e.index].status;

          if (this.listStatus !== pages[1].status || this.listStatus !== pages[0].status)
              this.status = 'list';

          switch (this.listStatus) {
              case pages[0].status:
                  this.status = pages[0].status;
                  break;
              case pages[1].status:
                  this.status = pages[1].status;
                  this.loginInfoGetter();
                  break;
              default:
                  this.showList();
                  break;
          }
        },

        historyBack: function () {
            const lastPage = this.preStatus.pop();
            if (this.status === pages[1].status) {
                this.status = lastPage;
                this.loginInfoData = [];
            }

            if (this.status === pages[0].status)
                this.status = lastPage;

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
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        this.$refs.Vtable.$on(pages[0].status, (row) => {
                            this.selectItem = row;

                            this.status = pages[0].status;
                            this.tabActiveItemName = pages[0].status;
                            this.listStatus = pages[0].status;
                            this.preStatus.push('list');
                        });

                        this.$refs.Vtable.$on('del', (row) => {

                            this.formData = {...defaultData.activeData};
                            this.formData.id = row.id;

                            this.status = "active";
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
                            this.status = 'activeSettings';
                            this.preStatus.push('list');
                        });

                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
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
         * 设置激活码提交
         */
        activeSettingsSubmit: function () {
            const param = this.formData;
            stbUserActivateRecordEdit(param).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.status = this.preStatus.pop();
            }).catch(err => {
            });
        },

        /**
         * 设置设备状态提交
         */
        setDeviceStatusFilterSubmit: function () {
            const param = this.formData;
            param.frozenTime = parseTime(param.frozenTime);
            // console.log(param);
            setDeviceStatus(param).then(res => {
                this.selectItem.status = this.formData.status;
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.status = this.preStatus.pop();
            }).catch(err => {
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
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
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
         * 设置设备状态
         */
        toSetDeviceStatusPage: function () {

            this.formData = {...defaultData.setDeviceData};

            for (let key in defaultData.setDeviceData) {
                this.formData[key] = (key === 'frozenTime' && this.selectItem.frozenTime === null) ? new Date() : this.selectItem[key];
            }

            this.status = 'setDeviceStatus';
            this.preStatus.push(pages[0].status);
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

            const param = this.formData;
            stbUserSaveActivate(param).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.status = this.preStatus.pop();
            }).catch(err => {});
        },

        /**
         * 获取设备激活类型列表
         * @constructor
         */
        loginInfoGetter: function () {
            this.$store.dispatch(defaultData.loginInfoData.pageAction, this.selectItem.id).then(res => {
                this.loginInfoData = [res];
            }).catch(err => {});
        },

        /**
         * 获取设备激活类型列表
         * @constructor
         */
        activeDeviceGetter: function () {
            this.$store.dispatch('device/deviceList').then(res => {
                this.activeData = res;
            }).catch(err => {});
        }
    }
});
