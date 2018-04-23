/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerStatistics.js @author: walljack@163.com @date: 18-4-9 下午6:02 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import CommonTable from "../../components/Table/CommonTable";
import JSelect from "../../components/select/select";
import {State} from "vuex-class/lib/index";
import {Watch} from "vue-property-decorator/lib/vue-property-decorator";
import {searchDeviceGroupBySalesUUID, searchSalesAndDeviceGroup} from "../../api/sales";
import _ from "lodash";
import {funChannelList, shareChannelList} from "../../api/function";
import {operateShareStatisticsList} from "../../api/statistics";

@Component({
    name: 'ShareStatisticsView',
    components: {
        JSelect
    }
})
export default class ShareStatisticsView extends BasePage {
    optionsChannel = [];
    deviceGroup = [];
    selectedChannelCode = [];
    salesUuids = [];
    salesList = [];
    @State(state => state.statistics.statisticsList) statisticsList;
    @State(state => state.statistics.statisticsDetail) statisticsDetail;

    @Watch('salesUuids', {immediate: true, deep: true})
    onSalesUuidsChange() {
        this.form.salesUuid = "";
        this.refreshDeviceGroup();
    }

    form = {
        effectTime: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
        deviceGroupUuid: [],
        salesUuids: [],
        groupUuids: [],
        isShare: ""
    };
    pickerOptions = {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近15天',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }]
    };

    created() {
        this.refreshChanel();
    }

    render(h) {
        return <div>
            <el-row>
                <el-form ref="form" model={this.form} label-width="100px">
                    <div class="table" style="inline;">
                        <JSelect placeholder="请选机型类型" emptyLabel="所有" value={this.form.isShare} vModel="isShare" options={[{label: "共享", value: 1}, {label: "非共享", value: 0}]} handelSelectChange={f => {
                            this.form.isShare = f;
                            this.refreshChanel();
                        }} class="table-top-item"/>
                        <JSelect placeholder="请选机型" emptyLabel="所有" value={this.form.selectedChannelCode} vModel="selectedChannelCode" options={this.optionsChannel.map(i => {
                            return {label: i.name, value: i.code};
                        })} multiple handelSelectChange={f => {
                            this.selectedChannelCode = f;
                            if (!_.isEmpty(f)) {
                                this.form.salesUuids = [];
                                this.form.groupUuids = [];
                            }
                            this.handelSearch();
                        }} class="table-top-item"/>
                        <el-date-picker
                            class="table-top-item"
                            style="max-width: 300px;"
                            type="daterange"
                            picker-options={this.pickerOptions}
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            value={this.form.effectTime}
                            onInput={v => {
                                this.form.effectTime = v || [];
                                this.handelSearch();
                            }}
                            align="left">
                        </el-date-picker>
                    </div>
                </el-form>
            </el-row>
            <el-row>
                <el-col style="max-width: 944px; margin-bottom: 20px;">
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "all",
                            tableAction: "statistics2/RefreshPage",
                            data: {data: [this.statisticsList.single]},
                            viewRule: [
                                {columnKey: '', label: '名称', formatter: r => "统计"},
                                {columnKey: 'registerCount', label: '新增设备', minWidth: 140},
                                {columnKey: 'orderCount', label: '订单', minWidth: 140},
                                {columnKey: 'price', label: '收入', minWidth: 140},
                                {columnKey: 'activateCount', label: '新增激活设备', minWidth: 140},
                                // {columnKey: 'configCount', label: '配置激活设备', minWidth: 140},
                                // {columnKey: 'payCount', label: '支付激活设备', minWidth: 140},
                                {columnKey: 'runCount', label: '活跃设备', minWidth: 140},
                            ],
                            pagination: false
                        })
                    }
                </el-col>
            </el-row>

            <el-row style="margin-top: 16px; max-width: 944px; margin-bottom: 20px;">
                <el-col>
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "detail",
                            tableAction: "statistics2/detail/RefreshPage",
                            data: this.statisticsDetail,
                            viewRule: [
                                {columnKey: 'channelName', label: '汇总', minWidth: 140},
                                {columnKey: 'registerCount', label: '新增设备', minWidth: 140},
                                {columnKey: 'orderCount', label: '订单', minWidth: 140},
                                {columnKey: 'price', label: '收入', minWidth: 140},
                                {columnKey: 'activateCount', label: '新增激活设备', minWidth: 140},
                                // {columnKey: 'configCount', label: '配置激活设备', minWidth: 140},
                                // {columnKey: 'payCount', label: '支付激活设备', minWidth: 140},
                                {columnKey: 'runCount', label: '活跃设备', minWidth: 140},
                            ],
                        })
                    }
                </el-col>
            </el-row>

            <el-row>
                {
                    this.mTableHtml(h, {
                        showDetail: false,
                        refs: "day",
                        tableAction: "statistics2/RefreshPage",
                        data: this.statisticsList,
                        viewRule: [
                            {columnKey: 'time', label: '日期', minWidth: 90},
                            {columnKey: 'registerCount', label: '新增设备', minWidth: 140},
                            {columnKey: 'orderCount', label: '订单', minWidth: 140},
                            {columnKey: 'price', label: '收入', minWidth: 140},
                            {columnKey: 'activateCount', label: '新增激活设备', minWidth: 140},
                            // {columnKey: 'configCount', label: '配置激活设备', minWidth: 140},
                            // {columnKey: 'payCount', label: '支付激活设备', minWidth: 140},
                            {columnKey: 'runCount', label: '活跃设备', minWidth: 140},
                        ],
                    })
                }
            </el-row>
        </div>;
    }
    mTableHtml(h, options) {
        return <div>
            <CommonTable ref={"commonTable_" + options.refs}
                 data={options.data}
                 showDetail={options.showDetail}
                 tableAction={options.tableAction}
                 defaultSort={this.defaultSort[this.tableAction]}
                 tableActionSearchColumn={this.tableActionSearchColumn}
                 tableActionSearch={this.tableActionSearch}
                 defaultCurrentPage={this.enableDefaultTableCurrentPage ? this.defaultTableCurrentPage : 0}
                 select={false}
                 viewRule={options.viewRule}
                 pagination={options.pagination}
                 handelSortChange={this.handelSortChange}
                 handleSelectionChange={this.handleSelectionChange}
                 handelTablePageChange={this.handelTablePageChange}
                 handelTableButtonsEvent={this.handelTableButtonsEvent}
            />
        </div>;
    }

    handelSearch() {
        let param = {};
        param.channelCodes = this.selectedChannelCode;
        if (!_.isEmpty(this.form.effectTime)) {
            const startTime = this.form.effectTime[0];
            const endTime = this.form.effectTime[1];
            param.startTime = startTime;
            param.endTime = endTime;
        }
        this.tableActionSearchColumn = Object.keys(param).map(p => {
            let column = {};
            column[p] = param[p];
            return column;
        });
        param.currentPage = 1;
        Object.keys(this.$refs).forEach(t => {
            this.$refs[t].refreshData && this.$refs[t].refreshData(param);
        });
    }

    async refreshChanel() {
        this.loading = true;
        // await searchSalesAndDeviceGroup().then(res => {
        //     this.salesList = res.salesList;
        // });
        let param = {};
        if (!_.isEmpty(this.form.isShare + "")) param.isShare = this.form.isShare;
        await funChannelList(param).then().then(res => {
            this.optionsChannel = res;
        });
        // await shareChannelList().then().then(res => {
        //     this.optionsChannel = res;
        // });
        this.loading = false;
    }

    refreshDeviceGroup() {
        if (_.isEmpty(this.salesUuids)) {
            this.deviceGroup = [];
            return;
        }
        this.loading = true;
        searchDeviceGroupBySalesUUID(this.salesUuids).then(res => {
            this.deviceGroup = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}
