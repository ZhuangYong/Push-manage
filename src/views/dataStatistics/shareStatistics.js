/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: shareStatistics.js @author: walljack@163.com @date: 18-3-6 上午10:40 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import CommonTable from "../../components/Table/CommonTable";
import JSelect from "../../components/select/select";
import {State} from "vuex-class/lib/index";
import {Watch} from "vue-property-decorator/lib/vue-property-decorator";
import {searchDeviceGroupBySalesUUID, searchSalesAndDeviceGroup} from "../../api/sales";
import _ from "lodash";
import {shareChannelList} from "../../api/function";

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
    @State(state => state.statistics.shareStatisticsList) shareStatisticsList;

    @Watch('salesUuids', {immediate: true, deep: true})
    onSalesUuidsChange() {
        this.form.salesUuid = "";
        this.refreshDeviceGroup();
    }

    form = {
        effectTime: [],
        deviceGroupUuid: [],
        salesUuids: [],
        groupUuids: []
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
                        <JSelect placeholder="请选机型" emptyLabel="所有" vModel="channelCodes" options={this.optionsChannel.map(i => {
                            return {label: i.name, value: i.code};
                        })} multiple handelSelectChange={f => {
                            this.selectedChannelCode = f;
                            this.handelSearch();
                        }} class="table-top-item"/>
                        <JSelect placeholder="请选择销售方" emptyLabel="所有" vModel="salesUuids" options={this.salesList.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={f => {
                            this.salesUuids = f;
                            this.handelSearch();
                        }} class="table-top-item"/>
                        <JSelect placeholder="请选择设备组" emptyLabel="所有" vModel="groupUuids" options={this.deviceGroup.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={this.handelSearch} class="table-top-item"/>
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
                <el-col style="max-width: 644px; margin-bottom: 20px;">
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            tableAction: "statistics/share/RefreshPage",
                            data: {data: [this.shareStatisticsList.detail]},
                            viewRule: [
                                {columnKey: 'orderCount', label: '订单数', minWidth: 140},
                                {columnKey: 'payPrice', label: '支付金额'},
                            ],
                            pagination: false
                        })
                    }
                </el-col>
            </el-row>

            <el-row>
                {
                    this.mTableHtml(h, {
                        tableAction: "statistics/share/RefreshPage",
                        data: this.shareStatisticsList || {data: []},
                        viewRule: [
                            {columnKey: 'orderCount', label: '订单数', minWidth: 140, sortable: true},
                            {columnKey: 'payPrice', label: '支付金额'},
                            {columnKey: 'registerCount', label: '新增注册设备数', minWidth: 120},
                            {columnKey: 'runCount', label: '活跃设备数'},
                            {columnKey: 'time', label: '日期', minWidth: 170, sortable: true},
                        ],
                        pagination: false
                    })
                }
            </el-row>
        </div>;
    }
    mTableHtml(h, options) {
        return <div>
            <CommonTable ref="commonTable"
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
        if (!_.isEmpty(this.selectedChannelCode)) param.channelCodes = this.selectedChannelCode;
        if (!_.isEmpty(this.form.salesUuids)) param.salesUuids = this.form.salesUuids;
        if (!_.isEmpty(this.form.groupUuids)) param.groupUuids = this.form.groupUuids;
        if (!_.isEmpty(this.form.effectTime)) {
            const startTime = this.form.effectTime[0];
            const endTime = this.form.effectTime[1];
            param.startTime = startTime;
            param.endTime = endTime;
        }
        this.$refs.commonTable.refreshData(param);
    }

    async refreshChanel() {
        this.loading = true;
        await searchSalesAndDeviceGroup().then(res => {
            this.salesList = res.salesList;
        });
        await shareChannelList().then().then(res => {
            this.optionsChannel = res;
        });
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
