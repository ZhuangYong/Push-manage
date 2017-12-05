import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import ConfirmDialog from '../../components/confirm/index';
import {stbUserLogin, stbUserUser} from "../../api/userManage";

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

// 功能tabs按钮配置
const elButtons = [
    {name: 'viewDetail', desc: '查看详情'},
    {name: 'loginInfo', desc: '当前登录信息'},
    {name: 'bindDeviceInfo', desc: '绑定设备（微信点歌）'},
    {name: 'payOrderings', desc: '支付记录'},
    {name: 'recordings', desc: '设备录音数据'},
    {name: 'activeRecordings', desc: '激活码激活记录'},
    {name: 'msgList', desc: '消息列表'}
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

                    <Vtable ref="Vtable" pageAction={'stbUser/RefreshPage'} data={this.userManage.stbUserPage} select={false} viewRule={viewRule} defaultCurrentPage={this.defaultCurrentPage} handleSelectionChange={this.handleSelectionChange}/>
                </div> : <div>

                    <el-button type="primary" onClick={() => {this.status = "list";}}>返回</el-button>

                    <el-tabs type="border-card">
                        {elButtons.map((item) => (<el-tab-pane style={{overflowX: 'auto'}} label={item.desc}>{this[item.name](h)}</el-tab-pane>))}
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
                    if (this.$refs.Vtable) {

                        this.$refs.Vtable.$on('edit', (row) => {
                            this.status = "view";
                            this.selectItems = row;
                        });

                        this.$refs.Vtable.$on('del', (row) => {
                            console.log('del');
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

            stbUserLogin(id).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });

            return <table border="1" style={styles.table}>
                <tr style={styles.tableTr}>用户UUID: </tr>
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
                viewRule={viewRule}
                defaultCurrentPage={this.defaultCurrentPageBindDeviceInfo}/>;
        },
        payOrderings: function (h) {
            return "hello";
        },
        recordings: function (h) {
            return "hello";
        },
        activeRecordings: function (h) {
            return "hello";
        },
        msgList: function (h) {
            return "hello";
        }
    }
};
