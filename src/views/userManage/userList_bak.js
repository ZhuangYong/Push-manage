/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {soundDelete, soundDisable} from "../../api/recordManage";
import {del as albumDelete, disable as ablumDisable} from "../../api/album";

const defaultData = {
    listData: {
        viewRule: [
            {columnKey: 'openid', label: 'openId', minWidth: 220},
            {imgColumn: 'headerImg', label: '微信头像', minWidth: 120, formatter: (r, h) => {
                    if (r.headerImg) return (<img src={r.headerImg} style="height: 30px; margin-top: 6px;"/>);
                    return '';
                }},
            {columnKey: 'nickName', label: '微信昵称', minWidth: 120, sortable: true},
            {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
            {label: '操作', buttons: [{label: '查看', type: 'viewDetail'}], minWidth: 80}
        ],
        tableCanSelect: false,
        pageActionSearchColumn: [],
        pageActionSearch: [
            {column: 'nickname', label: '请输入微信昵称', type: 'input', value: ''},
            {column: 'openid', label: '请输入openId', type: 'input', value: ''},

        ],
        defaultFormData: {},
        enableDefaultCurrentPage: true,
        listDataGetter: function() {
            return this.userManage.userListPage;
        },
        pageAction: 'userList/RefreshPage'
    },
    payData: {
        viewRule: [
            {columnKey: 'orderNo', label: '订单号', minWidth: 220},
            {columnKey: 'deviceUuid', label: '设备编号', minWidth: 220},
            {columnKey: 'productName', label: '产品名', minWidth: 120},
            {columnKey: 'dealPrice', label: '订单金额（元）'},
            {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170},
            {columnKey: 'payType', label: '支付方式', formatter: r => {
                    if (r.payType === 1) return '支付宝';
                    if (r.payType === 2) return '微信';
                }},
            {columnKey: 'payStatus', label: '付款状态', formatter: r => {
                    if (r.payStatus === 1) return '创建';
                    if (r.payStatus === 2) return '已完成';
                }},
            {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
                    if (r.orderStatus === 1) return '未付款';
                    if (r.orderStatus === 2) return '已付款';
                }},
            {columnKey: 'transactionId', label: '支付流水号', minWidth: 170},
            {label: '操作', buttons: [{label: '手动支付', type: 'edit'}], minWidth: 100}
        ],
        tableCanSelect: false,
        pageActionSearchColumn: [],
        pageActionSearch: [
            {column: 'orderNo', label: '请输入订单号', type: 'input', value: ''},
            {column: 'deviceUuid', label: '请输入设备编号', type: 'input', value: ''},
            {column: 'productName', label: '请输入产品名', type: 'input', value: ''},
            {column: 'transactionId', label: '请输入支付流水号', type: 'input', value: ''},
        ],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.orderPage;
        },
        pageAction: 'order/RefreshPage'
    },
    albumData: { //相册
        viewRule: [
            {columnKey: 'nickname', label: '微信昵称', minWidth: 120},
            {columnKey: 'id', label: '用户id', minWidth: 80},
            {imgColumn: 'thumbnail', label: '图片缩略图', minWidth: 120, formatter: (r, h) => {
                    if (r.thumbnail) return (<img src={r.thumbnail} style="height: 30px; margin-top: 6px;"/>);
                    return '';
                }},
            {columnKey: 'createTime', label: '上传时间', minWidth: 170},
            {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
                    switch (r.isEnabled) {
                        case 1:
                            return '是';
                        case 2:
                            return '否';
                        default:
                            return '否';
                    }
                }},
            {label: '操作', buttons: [{label: '删除', type: 'del'}, {label: r => r.isEnabled === 1 ? '禁用' : '开启', type: 'ban'}], minWidth: 145}
        ],
        tableCanSelect: false,
        pageActionSearchColumn: [],
        pageActionSearch: [
            {column: 'nickname', label: '请输入微信昵称', type: 'input', value: ''},
            {column: 'id', label: '请输入用户id', type: 'input', value: ''},
        ],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.albumPage;
        },
        pageAction: 'album/RefreshPage'
    },
    recordingsData: { //录音
        viewRule: [
            {auditionColumn: 'nameNorm', label: '歌曲名称', minWidth: 220},
            {columnKey: 'deviceUuid', label: '设备号'},
            {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
                    switch (r.isEnabled) {
                        case 1:
                            return '是';
                        case 2:
                            return '否';
                        default:
                            return '否';
                    }
                }},
            // {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
            // {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
            {columnKey: 'createTime', label: '录音时间', minWidth: 170},
            {label: '操作', buttons: [{label: '删除', type: 'del'}, {label: '下载', type: 'download'}, {label: r => r.isEnabled === 1 ? '禁用' : '开启', type: 'ban'}], minWidth: 200}
        ],

        tableCanSelect: false,
        pageActionSearchColumn: [],
        pageActionSearch: [
            {column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''},
            {column: 'deviceUuid', label: '请输入设备号', type: 'input', value: ''},
        ],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.recordManage.soundList;
        },
        pageAction: 'soundList/RefreshPage'
    },
    bindDeviceInfoData: { //绑定
        viewRule: [
            {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
            {columnKey: 'createTime', label: '创建时间', minWidth: 120, inDetail: true},
            {columnKey: 'openid', label: 'openid', minWidth: 170},
            {columnKey: 'deviceUuid', label: 'deviceUuid', minWidth: 170},
            {columnKey: 'unionid', label: 'unionid', minWidth: 170}
        ],
        tableCanSelect: false,
        pageActionSearchColumn: [],
        pageActionSearch: [
            {column: 'nickName', label: '请输入登录设备昵称', type: 'input', value: ''},
            {column: 'openid', label: '请输入openid', type: 'input', value: ''},
        ],
        defaultFormData: {},
        enableDefaultCurrentPage: false,
        listDataGetter: function() {
            return this.userManage.userBindPage;
        },
        pageAction: 'userBind/RefreshPage'
    },
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
        {label: '微信昵称'},
        {val: 'nickName'},
        {label: '微信头像'},
        {formatter: (r, h) => {
                if (r.headerImg) return (<img src={r.headerImg} style="height: 30px; margin-top: 6px;"/>);
                return '';
            }},
        {label: '用户id'},
        {val: 'id'}
    ],
    [
        {label: 'openid'},
        {val: 'openid'},
        {label: 'unionid'},
        {val: 'unionid'},
        {label: '创建时间'},
        {val: 'createTime'}
    ]
];

const bindDeviceRules = [
    [
        {label: '当前', colspan: 6},
    ],
    [
        {label: '状态'},
        {val: 'status'},
        {label: '设备号'},
        {val: 'deviceId'},
        {label: '时间'},
        {val: 'time'}
    ]
];

// tabs按钮配置
const pages = [
    {status: 'viewDetail', label: '查看详情'},
    {status: 'pay', label: '支付详情'},
    {status: 'album', label: '相册'},
    {status: 'recordings', label: '录音'},
    {status: 'bindDeviceInfo', label: '绑定设备'}
];

const validRules = {};

export default BaseListView.extend({
    name: "userListPage",
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
            tableCanSelect: false,
            pageAction: _defaultData.pageAction,
            rules: validRules,
            activeData: [], // 激活页面下拉列表数据
            tabActiveItemName: pages[0].status, // tab激活项name
            selectItem: null, // 选中项
        };
    },

    computed: {
        ...mapGetters(['userManage', 'recordManage'])
    },

    methods: {

        /**
         * 顶部按钮配置
         * @param h
         * @returns {boolean|XML}
         */
        topButtonHtml: function (h) {
            return ((this.listStatus !== 'list') && <div>
                <el-button type="primary" onClick={f => {
                    this.listStatus = this.currentPage = 'list';
                    this.showList();
                }}>返回</el-button>

                <el-tabs value={this.tabActiveItemName} onTab-click={this.tabsActive}>
                    { this.listStatus === 'bindDeviceInfo' ? this.bindDeviceHtml(h) : ''}
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
            return <el-row>
                <el-col span={24} style={{overflowX: 'auto'}}>
                    <table border="1" style={styles.table}>
                        <tr>
                            {
                                viewDetailRules.map(rule => <tr>
                                    {
                                        rule.map(item => <td style={{...styles.cell, minWidth: `${item.minWidth}`}} colspan={item.colspan ? item.colspan : ''}>
                                            <span>{item.label ? item.label + ': ' : (item.val ? selectItem[item.val] : (item.formatter ? item.formatter(selectItem, h) : item.status(selectItem)))}</span>
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
         * 查看绑定设备
         * @param h
         * @returns {XML}
         *
         */

        bindDeviceHtml: function (h) {
            const bindDeviceData = this.userManage.userBindPage.result;
            console.log("bindDeviceDataResult", bindDeviceData);
            return <el-row>
                <el-col span={24} style={{overflowX: 'auto', marginBottom: '30px'}}>
                    <table border="1" style={styles.table}>
                        <tr>
                            {
                                bindDeviceData && bindDeviceRules.map(rule => <tr>
                                    {
                                        rule.map(item => <td style={{...styles.cell, minWidth: `${item.minWidth || 88}px`}} colspan={item.colspan ? item.colspan : 0}>
                                            <span>{item.label ? item.label + ': ' : (item.val ? bindDeviceData[item.val] : '')}</span>
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
         * tabs激活处理
         * @param e
         */
        tabsActive: function (e) {
            this.listStatus = pages[e.index].status;

            if (this.listStatus !== pages[0].status) this.goPage(this.PAGE_LIST);
            // this.status = 'list';


            switch (this.listStatus) {
                case pages[0].status:
                    // this.status = pages[0].status;
                    this.goPage(pages[0].status);
                    break;
                default:
                    this.showList();
                    break;
            }
        },

        historyBack: function () {
            const lastPage = this.preStatus.pop();
            if (this.status === pages[0].status || this.status === pages[4].status) this.goPage(lastPage);
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

                const openid = this.listStatus !== 'list' ? this.selectItem.openid : null;

                for (let key in _thisData) {
                    this[key] = _thisData[key];
                }

                this.enableDefaultCurrentPage = !openid;
                if (this.listStatus !== 'list') {
                    this.pageActionSearchColumn = [{
                        openid: openid
                    }];
                }

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
                            // this.preStatus.push('list');
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('ban', (row) => {
                            this.submitBan(row);
                        });
                        this.$refs.Vtable.$on('download', (row) => { //下载
                            location.href = row.musicUrl;
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * 禁用录音
         * @param row
         */
        submitBan(row) {
            this.dialogVisible = true;
            this.tipTxt = row.isEnabled === 1 ? "确定要禁用吗？" : (row.isEnabled === 1 ? "确定要禁用吗?" : "确定开启吗？");
            const id = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                if (this.listStatus === 'album') {
                    ablumDisable(id).then(response => {
                        this.loading = false;
                        this.$message({
                            message: row.isEnabled === 1 ? "禁用成功！" : "开启成功！",
                            type: "success"
                        });
                        this.$refs.Vtable.refreshData();
                    }).catch(err => {
                        this.loading = false;
                    });
                } else if (this.listStatus === 'recordings') {
                    soundDisable(id).then(response => {
                        this.loading = false;
                        this.$message({
                            message: row.isEnabled === 1 ? "禁用成功！" : "开启成功！",
                            type: "success"
                        });
                        this.$refs.Vtable.refreshData();
                    }).catch(err => {
                        this.loading = false;
                    });
                }
            };
        },
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const id = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                if (this.listStatus === 'album') {
                    albumDelete(id).then(response => {
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
                } else if (this.listStatus === 'recordings') {
                    const deleteParams = {ids: id};
                    soundDelete(deleteParams).then(response => {
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
                }
            };
        }

    }
});
