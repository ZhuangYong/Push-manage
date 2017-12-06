import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import ConfirmDialog from '../../components/confirm/index';

const viewRule = [
    {columnKey: 'deviceId', label: '设备编号', minWidth: 220},
    {columnKey: 'status', label: '设备状态', formatter: r => {
        if (r.status === 1) return '已开启';
        if (r.status === 2) return '禁用';
    }},
    {columnKey: 'mac', label: 'MAC地址', minWidth: 120},
    {columnKey: 'channelName', label: '机型'},
    {columnKey: 'sn', label: 'SN号', minWidth: 170},
    {columnKey: 'freeDays', label: '免费天数', minWidth: 100},
    {columnKey: 'createTime', label: '注册时间', minWidth: 170},
    {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
    {label: '操作', buttons: [{label: '查看', type: 'edit'}], minWidth: 70}
];

const viewRuleBindDeviceInfo = [
    {columnKey: 'unionid', label: '用户unionid', minWidth: 220},
    {columnKey: 'nickName', label: '昵称', minWidth: 120},
    {imgColumn: 'headerImg', label: '头像'},
    {columnKey: 'expireTime', label: '绑定过期时间', minWidth: 170},
    {columnKey: 'status', label: '绑定状态', minWidth: 120}
];

const viewRulePayOrderings = [
    {columnKey: 'orderNo', label: '订单号', minWidth: 220},
    {columnKey: 'productName', label: '产品名称', minWidth: 120},
    {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 100},
    {columnKey: 'startTime', label: '支付时间', minWidth: 170}
];

const viewRuleRecordings = [
    {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 220},
    {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
    {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
    {columnKey: 'createTime', label: '录音时间', minWidth: 170},
    {label: '操作', buttons: [{label: '下载', type: 'edit'}, {label: '禁止分享', type: 'del'}], minWidth: 70}
];

const viewRuleActivateRecord = [
    {columnKey: 'activateCode', label: '激活码', minWidth: 120},
    {columnKey: 'days', label: '激活天数', minWidth: 120},
    {columnKey: 'useTime', label: '使用时间', minWidth: 100},
    {columnKey: 'status', label: '标识', minWidth: 170},
    {columnKey: 'remark', label: '备注', minWidth: 170},
    {label: '操作', buttons: [{label: '设置', type: 'del'}], minWidth: 70}
];

const viewRuleMsgList = [
    {columnKey: 'msgTitle', label: '消息标题', minWidth: 120},
    {columnKey: 'msgContent', label: '消息内容', minWidth: 220},
    {columnKey: 'msgType', label: '消息类型', minWidth: 100},
    {columnKey: 'msgTime', label: '发送时间', minWidth: 170}
];

// 功能tabs按钮配置
let elButtons = [
    {name: 'viewDetail', desc: '查看详情'},
    {name: 'loginInfo', desc: '当前登录信息'},
    {name: 'bindDeviceInfo', desc: '绑定设备（微信点歌）'},
    {name: 'payOrderings', desc: '支付记录'},
    {name: 'recordings', desc: '设备录音数据'},
    {name: 'activeRecordings', desc: '激活码激活记录'},
    {name: 'msgList', desc: '消息列表'},
    {name: 'activeDevice', desc: '激活'}
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
            defaultCurrentPageBindDeviceInfo: 1,
            defaultCurrentPagePayOrderings: 1,
            defaultCurrentRecordings: 1,
            defaultCurrentActivateRecord: 1,
            defaultCurrentPageMsgList: 1,
            tabActiveItemName: elButtons[0].name,
            selectorValue: null,
            filters: {
                deviceId: ''
            }
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

                {this.status === "list" ? <div>
                    <el-form model={this.filters} inline ref="filterData">

                        <el-form-item label="" prop="name">
                            <el-input value={this.filters.deviceId} name='deviceId' placeholder="请输入设备编号"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.searchFilter}>搜索</el-button>
                        </el-form-item>
                    </el-form>

                    <Vtable ref="Vtable" pageAction={'stbUser/RefreshPage'} data={this.userManage.stbUserPage} select={false} viewRule={viewRule} defaultCurrentPage={this.defaultCurrentPage}/>
                </div> : <div>

                    <el-button type="primary" onClick={() => {
                        this.status = "list";
                        this.tabActiveItemName = elButtons[0].name;
                    }}>返回</el-button>

                    <el-tabs value={elButtons[0].name} onTab-click={(e) => {
                        this.tabActiveItemName = e.name;
                    }}>
                        {elButtons.map((item) => (<el-tab-pane
                            name={item.name}
                            style={{overflowX: 'auto'}}
                            label={item.desc}>{item.name === this.tabActiveItemName ? this[item.name](h) : "没有任何数据"}</el-tab-pane>))}
                    </el-tabs>
                </div>}

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
                    if (this.$refs.Vtable) {

                        this.$refs.Vtable.$on('edit', (row) => {
                            this.selectItems = row;
                            this.status = "view";
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                default:
                    break;
            }
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
         * 功能tabs视图方法
         */
        viewDetail: function (h) {
            const selectItems = this.selectItems;

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
                    <td style={styles.tableTd}>当前状态: {selectItems.isActivate ? '已激活' : '未激活'}</td>
                    <td style={styles.tableTd}>
                        会员到期时间: {selectItems.vipExpireTime}
                        <el-button type="primary" onClick={() => {this.status = "list";}}>禁用</el-button>
                    </td>
                    <td style={styles.tableTd}>
                        设备状态: {selectItems.status === 1 ? '已开启' : "禁用"}
                        <el-button type="primary" onClick={() => {this.status = "list";}}>设置</el-button>
                        <el-button type="primary" onClick={() => {this.status = "list";}}>过滤</el-button>
                    </td>
                </tr>
                <tr style={styles.tableTr}>
                    <td style={styles.tableTd}>友盟token: {selectItems.pushtoken}</td>
                    <td style={styles.tableTd}>app版本: {selectItems.deviceVersion}</td>
                    <td style={styles.tableTd}>服务端版本: {selectItems.serverVersion}</td>
                </tr>
            </table>;
        },
        loginInfo: function (h) {
            const id = this.selectItems.id;

            this.$store.dispatch('stbUser/login', id).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });

            const {deviceUuid} = this.userManage.stbUserLoginData;

            console.log(this.userManage.stbUserLoginData);

            return <table border="1" style={{
                ...styles.table,
                marginLeft: '28px'
            }}>
                <tr style={styles.tableTr}>用户UUID: {deviceUuid}</tr>
                <tr style={styles.tableTr}>用户昵称: </tr>
                <tr style={styles.tableTr}>用户头像: </tr>
            </table>;
        },
        bindDeviceInfo: function (h) {

            const id = this.selectItems.id;

            return <Vtable
                ref="VtableBindDeviceInfo"
                pageAction={'stbUser/user/RefreshPage'}
                pageActionSearchColumn={[{urlJoin: id}]}
                data={this.userManage.stbUserUserPage}
                select={false}
                viewRule={viewRuleBindDeviceInfo}
                defaultCurrentPage={this.defaultCurrentPageBindDeviceInfo}/>;
        },
        payOrderings: function (h) {

            const id = this.selectItems.id;

            return <Vtable
                ref="VtablePayOrderings"
                pageAction={'stbUser/order/RefreshPage'}
                pageActionSearchColumn={[{urlJoin: id}]}
                data={this.userManage.stbUserOrderPage}
                select={false}
                viewRule={viewRulePayOrderings}
                defaultCurrentPage={this.defaultCurrentPagePayOrderings}/>;
        },
        recordings: function (h) {

            const id = this.selectItems.id;

            return <Vtable
                ref="VtableRecordings"
                pageAction={'stbUser/userSound/RefreshPage'}
                pageActionSearchColumn={[{urlJoin: id}]}
                data={this.userManage.stbUserUserSoundPage}
                select={false}
                viewRule={viewRuleRecordings}
                defaultCurrentPage={this.defaultCurrentRecordings}/>;
        },
        activeRecordings: function (h) {

            const id = this.selectItems.id;

            return <Vtable
                ref="VtableActiveRecordings"
                pageAction={'stbUser/activateRecord/RefreshPage'}
                pageActionSearchColumn={[{urlJoin: id}]}
                data={this.userManage.stbUserActivateRecordPage}
                select={false}
                viewRule={viewRuleActivateRecord}
                defaultCurrentPage={this.defaultCurrentActivateRecord}/>;
        },
        msgList: function (h) {

            const id = this.selectItems.id;

            return <Vtable
                ref="VtableMsgList"
                pageAction={'stbUser/message/RefreshPage'}
                pageActionSearchColumn={[{urlJoin: id}]}
                data={this.userManage.stbUserMessagePage}
                select={false}
                viewRule={viewRuleMsgList}
                defaultCurrentPage={this.defaultCurrentPageMsgList}/>;
        },
        activeDevice: function (h) {

            const id = this.selectItems.id;

            const options = [
                {label: '1天', value: 1},
                {label: '30天', value: 2},
                {label: '365天', value: 3}
            ];

            return <el-row>
                <div>配置设备免费活动: </div>
                <el-select v-model={this.selectorValue} placeholder="请选择">
                    {options.map(item => <el-option
                        key={item.value}
                        label={item.label}
                        value={item.value} />)}
                </el-select>
            </el-row>;
        }
    }
};
