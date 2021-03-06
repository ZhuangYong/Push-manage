/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: shareStatistics.js @author: walljack@163.com @date: 18-4-10 上午10:34 @version: 1.0
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
import {operateShareStatisticsList} from "../../api/statistics";
import TreeSelect from "../../components/select/treeSelect";

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
    @State(state => state.statistics.operateShareStatisticsList) operateShareStatisticsList;
    @State(state => state.statistics.operateShareStatisticsListDetail) operateShareStatisticsListDetail;

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
                        <JSelect placeholder="请选机型" emptyLabel="所有" value={this.form.selectedChannelCode} vModel="selectedChannelCode" options={this.optionsChannel.map(i => {
                            return {label: `${i.name}(${i.code})`, value: i.code};
                        })} multiple handelSelectChange={f => {
                            this.selectedChannelCode = f;
                            if (!_.isEmpty(f)) {
                                this.form.salesUuids = [];
                                this.form.groupUuids = [];
                            }
                            this.handelSearch();
                        }} class="table-top-item"/>
                        {/*<JSelect placeholder="请选择销售方" emptyLabel="所有" value={this.form.salesUuids} vModel="salesUuids" options={this.salesList.map(i => {*/}
                            {/*return {label: i.name, value: i.uuid};*/}
                        {/*})} multiple handelSelectChange={f => {*/}
                            {/*this.salesUuids = f;*/}
                            {/*if (!_.isEmpty(f)) {*/}
                                {/*this.form.selectedChannelCode = [];*/}
                                {/*this.selectedChannelCode = [];*/}
                            {/*}*/}
                            {/*this.handelSearch();*/}
                        {/*}} class="table-top-item"/>*/}

                        <TreeSelect placeHolder="请选择销售方" class="table-top-item" treeData={this.salesList} multiple={true} handelNodeClick={d => {
                            this.form.salesUuids = d.map(item => item.uuid);
                            this.salesUuids = this.form.salesUuids;
                            if (!_.isEmpty(this.form.salesUuids)) {
                                this.form.selectedChannelCode = [];
                                this.selectedChannelCode = [];
                            }
                            this.handelSearch();
                        }}/>
                        <JSelect placeholder="请选择设备组" emptyLabel="所有" value={this.form.groupUuids} vModel="groupUuids" options={this.deviceGroup.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={f => {
                            if (!_.isEmpty(f)) {
                                this.form.selectedChannelCode = [];
                                this.selectedChannelCode = [];
                            }
                            this.form.groupUuids = f;
                            this.handelSearch();
                        }} class="table-top-item"/>
                        {/*<el-date-picker*/}
                            {/*class="table-top-item"*/}
                            {/*style="max-width: 300px;"*/}
                            {/*type="daterange"*/}
                            {/*picker-options={this.pickerOptions}*/}
                            {/*range-separator="-"*/}
                            {/*start-placeholder="开始日期"*/}
                            {/*end-placeholder="结束日期"*/}
                            {/*value-format="yyyy-MM-dd HH:mm:ss"*/}
                            {/*value={this.form.effectTime}*/}
                            {/*onInput={v => {*/}
                                {/*this.form.effectTime = v || [];*/}
                                {/*this.handelSearch();*/}
                            {/*}}*/}
                            {/*align="left">*/}
                        {/*</el-date-picker>*/}
                    </div>
                </el-form>
            </el-row>
            <el-row>
                <el-col style="max-width: 644px; margin-bottom: 20px;">
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "all",
                            tableAction: "statistics/operate/share/RefreshPage",
                            data: {data: [this.operateShareStatisticsList.data.all]},
                            viewRule: [
                                {columnKey: 'registerCount', label: '总设备', minWidth: 140},
                                {columnKey: 'vipCount', label: 'VIP设备', minWidth: 140},
                                {columnKey: 'orderCount', label: '订单总数', minWidth: 140},
                                {columnKey: 'price', label: '总收入', minWidth: 140},
                            ],
                            pagination: false
                        })
                    }
                </el-col>
            </el-row>

            <el-row>
                {
                    this.mTableHtml(h, {
                        showDetail: false,
                        refs: "day",
                        tableAction: "statistics/operate/share/RefreshPage",
                        data: {data: [Object.assign({}, this.operateShareStatisticsList.data.day, {label: "今日"}), Object.assign({}, this.operateShareStatisticsList.data.yesterday, {label: "昨日"}), Object.assign({}, this.operateShareStatisticsList.data.month, {label: "当月"})]},
                        viewRule: [
                            {columnKey: '', label: '汇总', minWidth: 60, formatter: r => r.label},
                            {columnKey: 'orderCount', label: '订单数', minWidth: 140, sortable: true},
                            {columnKey: 'price', label: '支付金额'},
                            {columnKey: 'registerCount', label: '新增注册设备数', minWidth: 120},
                            {columnKey: 'runCount', label: '活跃设备数'},
                            {columnKey: 'activateCount', label: '新增激活备数'},
                        ],
                        pagination: false
                    })
                }
            </el-row>

            <el-row style="margin-top: 16px;">
                <el-col>
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "detail",
                            tableAction: "statistics/operate/share/detail/RefreshPage",
                            data: this.operateShareStatisticsListDetail,
                            viewRule: [
                                {columnKey: 'channelName', label: '名称', minWidth: 140},
                                {columnKey: 'registerCount', label: '总设备', minWidth: 140},
                                {columnKey: 'vipCount', label: 'VIP设备', minWidth: 140},
                                {columnKey: 'orderCount', label: '订单总数', minWidth: 140},
                                {columnKey: 'price', label: '总收入', minWidth: 140},
                            ],
                        })
                    }
                </el-col>
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
        param.salesUuids = this.form.salesUuids;
        param.groupUuids = this.form.groupUuids;
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
        await searchSalesAndDeviceGroup().then(res => {
            this.salesList = res;
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
        searchDeviceGroupBySalesUUID({salesUuids: this.salesUuids}).then(res => {
            this.deviceGroup = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}
