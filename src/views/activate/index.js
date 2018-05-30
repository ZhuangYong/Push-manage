/**
 * Created by Zed on 2018/5/30.
 */
import {Component, Watch} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class";
import Const from "../../utils/const";
import {activateAll, activateDayList} from "../../api/activate";

@Component({name: 'ActivateView'})
export default class ActivateView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <ActiveDevicePage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    viewRule = [
        {columnKey: 'activateCode', label: '激活码', minWidth: 190},
        {columnKey: 'days', label: '时间', formatter: r => r.days + '天', sortable: true},
        {columnKey: 'avaTime', label: '激活码有效时间', minWidth: 170, sortable: true},
        {columnKey: 'deviceUuid', label: '设备编号', minWidth: 190},
        {columnKey: 'useTime', label: '使用时间', minWidth: 170, sortable: true},
        // {columnKey: 'orderCode', label: '订单号'},
        // 1 未使用 2 已使用 3 待处理（雷石使用了，数据库没修改情况）
        {columnKey: 'status', label: '状态', formatter: r => {
                if (r.status === 1) return '未使用';
                if (r.status === 2) return '已使用';
                if (r.status === 3) return '待处理';
            }}
    ];
    tableActionSearch = [
        {column: 'activateCode', label: '请输入激活码', type: 'input', value: ''},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'status', label: '请选择使用状态', type: 'option', value: '', options: [
                {value: 1, label: '未使用'},
                {value: 2, label: '已使用'},
                {value: 3, label: '待处理'},
            ]},
        {column: 'days', label: '请选择有效时间', type: 'option', value: '', options: []},
        {column: 'expireAfter,expireBefore', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption}
    ];
    tableAction = 'activate/RefreshPage';
    tableCanSelect = true;
    activateCodesStatus = '1';
    refreshStatusErrorCounts = 0;
    nextRefreshStatus = true;
    // isAbleClickActivateAll = true;
    activateCodes = [];

    @State(state => state.activate.activatePage) tableData;
    @Watch('activateCodesStatus')
    onActivateCodesStatusChange(v, ov) {
        if (parseInt(v, 10) === 1) {
            this.refreshTable();
            // this.isAbleClickActivateAll = true;
            this.$message.success('激活成功');
        }
    }

    created() {
        this.nextRefreshStatus = true;
        this.getActivateDays();
        this.refreshUpdateMigrationStatus();
    }

    beforeDestroy() {
        this.nextRefreshStatus = false;
    }

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        // const isAbleClickActivateAll = this.activateCodesStatus === '1' ? this.isAbleClickActivateAll : false;
        const isAbleClickActivateAll = this.activateCodesStatus === '1';

        return <div class="filter-container table-top-button-container">
            <el-button onClick={this.getActivateCode} type="primary">获取激活码</el-button>
            <el-button onClick={() => this.goPage('ActiveDevicePage', {defaultData: {activateCodes: this.activateCodes}})} loading={!isAbleClickActivateAll} disabled={(isAbleClickActivateAll && this.activateCodes.length <= 0)} type="primary">批量激活
            </el-button>
        </div>;
    }

    getActivateCode() {
        this.loading = true;
        this.$store.dispatch('activate/code/list', {type: 2}).then((res) => {
            this.refreshTable();
            this.loading = false;
        }).catch(e => this.loading = false);
    }

    getActivateDays() {
        this.loading = true;
        activateDayList().then(r => {
            this.tableActionSearch[3].options = r.map(d => {
                return {value: d, label: d};
            });
            this.loading = false;
        }).catch(e => this.loading = false);
    }

    /**
     * 递归刷新迁移状态
     */
    refreshUpdateMigrationStatus() {
        const params = {
            confName: 'activateCodesStatus',
        };
        this.$store.dispatch('config/status', params).then(res => {
            this.activateCodesStatus = res.activateCodesStatus;
            if (this.nextRefreshStatus) {
                this.refreshStatusErrorCounts = 0;
                setTimeout(this.refreshUpdateMigrationStatus, 1000);
            }
        }).catch(err => {
            if (this.refreshStatusErrorCounts <= 3) {
                this.refreshStatusErrorCounts += 1;
                if (this.nextRefreshStatus) setTimeout(this.refreshUpdateMigrationStatus, 1000);
            }
        });
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let arr = [];
            selectedItems.map(selectItem => arr.push(selectItem.activateCode));
            this.activateCodes = arr;
        } else this.activateCodes = [];
    }

}

@Component({name: 'ActiveDevicePage'})
class ActiveDevicePage extends BasePage {
    viewRule = [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 144},
        {columnKey: 'sn', label: 'SN号', minWidth: 255, inDetail: true},
        {columnKey: 'mac', label: 'MAC地址', minWidth: 135, inDetail: true},
        {columnKey: 'channelName', label: '机型', minWidth: 150},
        // {columnKey: 'orderCount', label: '订单数', minWidth: 70},
        {columnKey: 'orderAmount', label: '总金额', minWidth: 70},
        // {columnKey: 'address', label: '地址', minWidth: 150},
        {columnKey: 'online', label: '是否在线', formatter: (r, h) => {
                if (r.online === 1) return '是';
                return '否';
            }},
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

        /*{columnKey: 'status', label: '设备状态', formatter: r => {
            if (r.status === 1) return '已开启';
            if (r.status === -1) return '禁用';
            if (r.status === -2) return '禁用';
        }},*/
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
        {columnKey: 'useTime', label: '最近下单时间', minWidth: 140, sortable: true},
        {columnKey: 'registerCount', label: '开机次数', minWidth: 140, inDetail: true},
        {columnKey: 'leikeExpireTime', label: '雷客过期时间', minWidth: 140, inDetail: true},
        {columnKey: 'vipExpireTime', label: '到期时间', minWidth: 140, inDetail: true},
        {columnKey: 'createTime', label: '注册时间', minWidth: 140, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 140, sortable: true},
        {label: '操作', buttons: [{label: '查看', type: 'viewDetail'}, {label: '激活', type: 'del'}, {label: '推送', type: 'push'}], minWidth: 224}
    ];
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
        },
        {
            column: 'vipStatus', label: '请选择VIP状态', type: 'option', value: '', options: [
                {value: 1, label: '未激活'},
                {value: 2, label: '已激活'},
                {value: 3, label: '已过期'},
            ]
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
    ];
    tableAction = 'activate/device/RefreshPage';
    tableCanSelect = true;
    deviceUuid = [];

    @State(state => state.activate.activateDevicesPage) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button onClick={() => this.pageBack()} type="primary">返回</el-button>
            <el-button onClick={this.activeDevice} disabled={this.deviceUuid.length <= 0} type="primary">选定</el-button>
        </div>;
    }

    activeDevice() {
        this.loading = true;
        const params = {
            activateCode: this.activateCodes.join(','),
            deviceUuid: this.deviceUuid.join(',')
        };
        activateAll(params).then(res => {
            this.loading = false;
            this.pageBack();
        }).catch(err => {
            this.loading = false;
        });
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let arr = [];
            selectedItems.map(selectItem => arr.push(selectItem.deviceUuid));
            this.deviceUuid = arr;
        } else this.deviceUuid = [];
    }
}
