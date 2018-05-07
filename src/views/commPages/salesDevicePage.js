/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesDevicePage.js @author: walljack@163.com @date: 18-3-28 下午7:02 @version: 1.0
 */

import BasePage from "../../components/common/BasePage";
import {del as delSales, searchDeviceGroupBySalesUUID, searchSalesAndDeviceGroup} from "../../api/sales";
import {State} from "vuex-class/lib/index";
import {Watch, Component} from "vue-property-decorator";

@Component({name: "SalesDevicePage"})
export default class SalesDevicePage extends BasePage {
    optionsChannel = [];
    deviceGroup = [];
    salesUuid = "";
    tableAction = 'sales/stbuser/RefreshPage';
    viewRule = [
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
        {columnKey: 'registerCount', label: '开机次数', minWidth: 140, inDetail: true},
        {columnKey: 'vipExpireTime', label: '到期时间', minWidth: 140},
        {columnKey: 'useTime', label: '最近下单时间', minWidth: 140, inDetail: true},
        {columnKey: 'createTime', label: '注册时间', minWidth: 140, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 140, sortable: true},
    ];

    tableActionSearch = [
        {column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []},
        {column: 'groupUuid', label: '请选择设备组', type: 'option', value: '', options: []},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'sn', label: '请输入SN号', type: 'input', value: ''}
    ];

    delItemFun = delSales;

    @State(state => state.sales.stbUserPage) tableData;

    @Watch('optionsChannel', {immediate: true, deep: true})
    onOptionsChannelChange() {
        this.tableActionSearch[0].options = [];
        this.optionsChannel.map(i => this.tableActionSearch[0].options.push(i));
    }

    @Watch('deviceGroup')
    onDeviceGroupChange() {
        this.tableActionSearch[1].options = [];
        this.tableActionSearch[1].value = "";
        this.deviceGroup.map(i => this.tableActionSearch[1].options.push({label: i.name, value: i.uuid}));
    }

    @Watch('tableActionSearch', {immediate: true, deep: true})
    onTableActionSearchColumnChange() {
        const channelCode = this.tableActionSearch[0].value;
        this.refreshDeviceGroup(channelCode);
    }

    created() {
        this.refreshChanel();
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    refreshChanel() {
        this.loading = true;
        searchSalesAndDeviceGroup().then(res => {
            this.optionsChannel = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }

    refreshDeviceGroup(salesUuid) {
        if (this.salesUuid === salesUuid || !salesUuid) return;
        this.loading = true;
        searchDeviceGroupBySalesUUID({salesUuids: [salesUuid]}).then(res => {
            this.deviceGroup = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
        this.salesUuid = salesUuid;
    }
}
