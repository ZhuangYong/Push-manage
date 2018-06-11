/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: devicePage.js @author: walljack@163.com @date: 18-3-1 下午2:39 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import Const from "../../utils/const";
import {mediaLanguageList} from "../../api/media";
import {searchSalesAndDeviceGroup} from "../../api/sales";

@Component({name: "DevicePage"})
export default class DevicePage extends BasePage {
    showIndex = true;
    // 列表api地址
    tableAction = 'stbUser/RefreshPage';
    // 列表显示规则
    defaultViewRule = [
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
    ];
    operateViewRule = [];
    // 搜索规则
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
        },
        {
            column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []
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
        {
            column: 'onLine', label: '请选择是否在线', type: 'option', value: 1, options: [
                {value: 1, label: '在线'},
                {value: 0, label: '不在线'},
            ]
        },
    ];
    // 列表数据
    @State(state => state.userManage.stbUserPage) tableData;

    created() {
        this.viewRule = [...this.defaultViewRule, ...this.operateViewRule];
        this.refreshChanel();
        this.refreshSalesChanel();
    }

    render(h) {
        return <div>
            {
                this.pageCanBack() ? <div class="filter-container table-top-button-container">
                    {
                        this.pageBackHtml(h)
                    }
                </div> : ""
            }
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
        this.$store.dispatch("fun/chanelList").then(res => {
            this.loading = false;
            this.tableActionSearch[0].options = [];
            res.map(f => {
                this.tableActionSearch[0].options.push({value: f.code, label: `${f.name}(${f.code})`});
            });
        }).catch(err => {
            this.loading = false;
        });
    }

    refreshSalesChanel() {
        this.loading = true;
        searchSalesAndDeviceGroup().then(res => {
            this.tableActionSearch[1].options = [];
            res.map(i => this.tableActionSearch[1].options.push(i));
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}
