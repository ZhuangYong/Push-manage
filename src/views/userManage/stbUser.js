import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import ConfirmDialog from '../../components/confirm/index';
import {bindData} from "../../utils/index";
import {banVIP, setDeviceFilter, setDeviceStatus, stbUserSaveActivate} from "../../api/userManage";

const dataConfigs = {
    list: {
        ref: 'Vtable',
        pageAction: 'stbUser/RefreshPage',
        pageActionSearchColumn: null,
        dataGetter: 'stbUserPage',
        viewRule: [
            {columnKey: 'deviceId', label: '设备编号', minWidth: 220},
            {columnKey: 'status', label: '设备状态', formatter: r => {
                if (r.status === 1) return '已开启';
                if (r.status === -1) return '禁用';
                if (r.status === -2) return '禁用';
            }},
            {columnKey: 'mac', label: 'MAC地址', minWidth: 120},
            {columnKey: 'channelName', label: '机型'},
            {columnKey: 'sn', label: 'SN号', minWidth: 170},
            {columnKey: 'freeDays', label: '免费天数', minWidth: 100},
            {columnKey: 'createTime', label: '注册时间', minWidth: 170},
            {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
            {label: '操作', buttons: [{label: '查看', type: 'edit'}, {label: '激活', type: 'del'}], minWidth: 120}
        ]
    },
    bindDeviceInfo: {
        ref: 'VtableBindDeviceInfo',
        pageAction: 'stbUser/user/RefreshPage',
        pageActionSearchColumn: null,
        dataGetter: 'stbUserUserPage',
        viewRule: [
            {columnKey: 'unionid', label: '用户unionid', minWidth: 220},
            {columnKey: 'nickName', label: '昵称', minWidth: 120},
            {imgColumn: 'headerImg', label: '头像'},
            {columnKey: 'expireTime', label: '绑定过期时间', minWidth: 170},
            {columnKey: 'status', label: '绑定状态', minWidth: 120}
        ]
    },
    payOrderings: {
        ref: 'VtablePayOrderings',
        pageAction: 'stbUser/order/RefreshPage',
        pageActionSearchColumn: null,
        dataGetter: 'stbUserOrderPage',
        viewRule: [
            {columnKey: 'orderNo', label: '订单号', minWidth: 220},
            {columnKey: 'productName', label: '产品名称', minWidth: 120},
            {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 100},
            {columnKey: 'startTime', label: '支付时间', minWidth: 170}
        ]
    },
    recordings: {
        ref: 'VtableRecordings',
        pageAction: 'stbUser/userSound/RefreshPage',
        pageActionSearchColumn: null,
        dataGetter: 'stbUserUserSoundPage',
        viewRule: [
            {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 220},
            {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
            {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
            {columnKey: 'createTime', label: '录音时间', minWidth: 170},
            {label: '操作', buttons: [{label: '下载', type: 'edit'}, {label: '禁止分享', type: 'del'}], minWidth: 130}
        ]
    },
    activeRecordings: {
        ref: 'VtableActiveRecordings',
        pageAction: 'stbUser/activateRecord/RefreshPage',
        pageActionSearchColumn: null,
        dataGetter: 'stbUserActivateRecordPage',
        viewRule: [
            {columnKey: 'activateCode', label: '激活码', minWidth: 120},
            {columnKey: 'days', label: '激活天数', minWidth: 120},
            {columnKey: 'useTime', label: '使用时间', minWidth: 100},
            {columnKey: 'status', label: '标识', minWidth: 170},
            {columnKey: 'remark', label: '备注', minWidth: 170},
            {label: '操作', buttons: [{label: '设置', type: 'del'}], minWidth: 70}
        ]
    },
    msgList: {
        ref: 'VtableMsgList',
        pageAction: 'stbUser/message/RefreshPage',
        pageActionSearchColumn: null,
        dataGetter: 'stbUserMessagePage',
        viewRule: [
            {columnKey: 'msgTitle', label: '消息标题', minWidth: 120},
            {columnKey: 'msgContent', label: '消息内容', minWidth: 220},
            {columnKey: 'msgType', label: '消息类型', minWidth: 100},
            {columnKey: 'msgTime', label: '发送时间', minWidth: 170}
        ]
    }
};

// 功能tabs按钮配置
let pages = [
    {status: 'viewDetail', label: '查看详情'},
    {status: 'loginInfo', label: '当前登录信息'},
    {status: 'bindDeviceInfo', label: '绑定设备（微信点歌）'},
    {status: 'payOrderings', label: '支付记录'},
    {status: 'recordings', label: '设备录音数据'},
    {status: 'activeRecordings', label: '激活码激活记录'},
    {status: 'msgList', label: '消息列表'}
];

const styles = {
    table: {
        borderCollapse: 'collapse',
        borderColor: '#ccc',
        border: 'none'
    },
    tableTr: {
        height: '48px',
        lineHeight: '48px',
        fontSize: '12px',
        textAlign: 'left'
    },
    tableTd: {
        paddingLeft: '15px',
        paddingRight: '15px',
        minWidth: '288px',
        boxSizing: 'border-box'
    }
};

export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            tabActiveItemName: pages[0].status, // tabs激活项
            activeData: [], // 激活页选择器数据
            activeFilter: { // 激活页选择结果
                selectorValue: null
            },
            filters: { // 搜索keyword
                deviceId: ''
            },
            disableVip: null,
            isFilter: null,
            setDeviceStatusFilter: { // 设置设备状态选择结果
                selectorValue: null,
                dateTime: null
            },
        };
    },
    computed: {
        ...mapGetters(['userManage'])
    },
    created() {
        this.loading = true;
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render: function (h) {
        return (
            <el-row v-loading={this.submitLoading}>

                {this.status === 'list' ? <el-form model={this.filters} inline ref="filterData">

                    <el-form-item label="" prop="name">
                        <el-input value={this.filters.deviceId} name='deviceId' placeholder="请输入设备编号"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.searchFilter}>搜索</el-button>
                    </el-form-item>
                </el-form> : (this.status !== 'active' && this.status !== 'setDeviceStatus' && <div>
                    <el-button type="primary" onClick={this.historyBack}>返回</el-button>

                    <el-tabs value={this.tabActiveItemName} onTab-click={this.tabsActive}>
                        {pages.map((item) => (<el-tab-pane
                            name={item.status}
                            label={item.label} />))}
                    </el-tabs>
                </div>)}

                {this.changeView(h)}

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

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs[dataConfigs.list.ref]) {

                        this.$refs[dataConfigs.list.ref].$on('edit', (row) => {
                            this.selectItems = row;
                            this.status = pages[0].status;
                        });

                        this.$refs.Vtable.$on('del', (row) => {
                            this.selectItems = row;
                            this.status = 'active';
                            this.getDataActiveDevice();
                        });
                        // this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                        //     this.defaultCurrentPage = defaultCurrentPage;
                        // });
                    }
                    break;
                case 'active':
                    bindData(this, this.$refs.activeFilter);
                    break;
                case 'setDeviceStatus':
                    bindData(this, this.$refs.setDeviceStatus);
                    break;
                default:
                    break;
            }
        },

        /**
         * 切换视图内容
         */
        changeView: function (h) {
            const dataConfig = dataConfigs[this.status];
            switch (this.status) {

                case pages[0].status:
                    return this.viewDetail(h);
                case pages[1].status:
                    return this.loginInfo(h);
                case 'active':
                    return this.activeDevice(h);
                case 'setDeviceStatus':
                    return this.setDeviceStatusPage(h);
                default:
                    if (this.status !== 'list') {
                        const id = this.selectItems.id;
                        dataConfig.pageActionSearchColumn = [{urlJoin: id}];
                    }
                    return <Vtable
                        ref={dataConfig.ref}
                        pageAction={dataConfig.pageAction}
                        pageActionSearchColumn={dataConfig.pageActionSearchColumn}
                        data={this.userManage[dataConfig.dataGetter]}
                        select={false}
                        viewRule={dataConfig.viewRule}
                        defaultCurrentPage={this.defaultCurrentPage}/>;
            }
        },

        /**
         * tab项激活时运行
         * @param e
         */
        tabsActive: function (e) {
            this.tabActiveItemName = e.name;
            this.status = pages[e.index].status;
            if (parseInt(e.index, 10) === 1)
                this.getLoginInfo();
        },

        /**
         * 搜索关键字
         */
        searchFilter: function() {
            this.$refs.Vtable.refreshData({
                currentPage: 1,
                deviceId: this.filters.deviceId
            });
        },

        /**
         * 选择器提交
         */
        activeFilterSubmit: function () {
            const param = {
                id: this.activeFilter.selectorValue,
                deviceConfigId: this.selectItems.id
            };
            stbUserSaveActivate(param).then(res => {
                const {status, msg} = res;
                this.$message({
                    message: status === 2000 ? "激活成功" : msg,
                    type: "success"
                });
                this.historyBack();
            }).catch(err => {
            });
        },
        setDeviceStatusFilterSubmit: function () {
            const param = {
                status: this.setDeviceStatusFilter.selectorValue,
                id: this.selectItems.id
            };
            setDeviceStatus(param).then(res => {
                this.selectItems.status = this.setDeviceStatusFilter.selectorValue;
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.status = pages[0].status;
            }).catch(err => {
            });
        },

        historyBack: function () {
            this.status = "list";
        },

        // 禁用VIP
        banVIPClick: function () {
            banVIP(this.selectItems.id).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.selectItems.disableVip = !this.selectItems.disableVip;
            }).catch(err => {});
        },

        // 设置设备状态
        setDeviceStatus: function () {
            this.status = 'setDeviceStatus';
        },

        // 设置设备过滤
        setDeviceFilter: function () {
            setDeviceFilter(this.selectItems.id).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.selectItems.isFilter = !this.selectItems.isFilter;
            }).catch(err => {});
        },

        /**
         * 功能tabs视图方法
         */
        viewDetail: function (h) {
            const selectItems = this.selectItems;

            this.disableVip = selectItems.disableVip;
            this.isFilter = selectItems.isFilter;

            return <table border="1" style={styles.table}>
                <tr style={styles.tableTr}>
                    <td style={styles.tableTd}>设备编号: {selectItems.deviceId}</td>
                    <td style={styles.tableTd}>mac地址: {selectItems.mac}</td>
                    <td style={styles.tableTd}>机型: {selectItems.channelName}</td>
                </tr>
                <tr style={styles.tableTr}>
                    <td style={styles.tableTd}>注册时间: {selectItems.createTime}</td>
                    <td style={styles.tableTd}>SN: {selectItems.sn}</td>
                    <td style={styles.tableTd}>TID: {selectItems.tid}</td>
                </tr>
                <tr style={styles.tableTr}>
                    <td style={styles.tableTd}>当前状态: {selectItems.isActivate === 2 ? '已激活' : '未激活'}</td>
                    <td style={styles.tableTd}>
                        会员到期时间: {selectItems.vipExpireTime}
                        <el-button type="primary" onClick={this.banVIPClick}>{!this.disableVip ? '禁用' : '恢复'}</el-button>
                    </td>
                    <td style={styles.tableTd}>
                        设备状态: {selectItems.status === 1 ? '已开启' : "禁用"}
                        <el-button type="primary" onClick={this.setDeviceStatus}>设置</el-button>
                        <el-button type="primary" onClick={this.setDeviceFilter}>{!this.isFilter ? '过滤' : '恢复过滤'}</el-button>
                    </td>
                </tr>
                <tr style={styles.tableTr}>
                    <td style={styles.tableTd}>友盟token: {selectItems.pushtoken}</td>
                    <td style={styles.tableTd}>app版本: {selectItems.deviceVersion}</td>
                    <td style={styles.tableTd}>服务端版本: {selectItems.serverVersion}</td>
                </tr>
            </table>;
        },
        getLoginInfo: function () {
            const id = this.selectItems.id;

            this.$store.dispatch('stbUser/login', id).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
        },
        loginInfo: function (h) {

            const {deviceUuid} = this.userManage.stbUserLoginData;

            return <table border="1" style={{
                ...styles.table,
                marginLeft: '28px'
            }}>
                <tr style={styles.tableTr}>用户UUID: {deviceUuid}</tr>
                <tr style={styles.tableTr}>用户昵称: </tr>
                <tr style={styles.tableTr}>用户头像: </tr>
            </table>;
        },
        getDataActiveDevice: function () {

            this.$store.dispatch('device/deviceList').then(res => {
                console.log(res);
                this.activeData = res;
            }).catch(err => {
            });
        },
        activeDevice: function (h) {

            const activeData = this.activeData;

            return <el-form model={this.activeFilter} inline ref="activeFilter">
                <el-form-item label="" prop="selectorValue">
                    <div>配置设备免费活动:</div>
                    <el-select placeholder="请选择" value={this.activeFilter.selectorValue} name='selectorValue'>
                        {
                            activeData.length > 0 && activeData.map(item => <el-option
                                key={item.id}
                                label={`${item.groupName}--${item.codeAutoDay}天`}
                                value={item.id}>
                            </el-option>)
                        }
                    </el-select>
                </el-form-item><br/>
                <el-form-item>
                    <el-button type="primary" disabled={this.activeFilter.selectorValue === null} onClick={this.activeFilterSubmit}>激活</el-button>
                    <el-button onClick={this.historyBack}>取消</el-button>
                </el-form-item>
            </el-form>;
        },
        setDeviceStatusPage: function (h) {

            const options = [
                {id: 1, label: '启用'},
                {id: -1, label: '永久禁用'},
                {id: -2, label: '时间禁用'}
            ];

            return <el-form model={this.setDeviceStatusFilter} inline ref="setDeviceStatus">
                <el-form-item label="" prop="selectorValue">
                    <div>设备状态:</div>
                    <el-select placeholder={'请选择'} value={this.setDeviceStatusFilter.selectorValue} name='selectorValue'>
                        {
                            options.map(item => <el-option
                                key={item.id}
                                label={item.label}
                                value={item.id}>
                            </el-option>)
                        }
                    </el-select>
                </el-form-item><br/>

                <el-form-item prop="dataTime">
                    <el-date-picker
                        model={this.setDeviceStatusFilter.dateTime}
                        name='dataTime'
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item><br/>

                <div>{this.setDeviceStatusFilter.dataTime}</div>

                <el-form-item>
                    <el-button type="primary" disabled={this.setDeviceStatusFilter.selectorValue === null} onClick={this.setDeviceStatusFilterSubmit}>确定</el-button>
                    <el-button onClick={() => {
                        this.status = pages[0].status;
                    }}>取消</el-button>
                </el-form-item>
            </el-form>;
        }
    }
};
