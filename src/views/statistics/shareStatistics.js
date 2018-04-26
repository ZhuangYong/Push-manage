/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: shareStatistics.js @author: walljack@163.com @date: 18-4-9 下午3:04 @version: 1.0
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
import {operateShareStatisticsList, shareStatisticsDetail, shareStatisticsList2} from "../../api/statistics";
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
    childes1 = [];
    childes2 = [];
    childes3 = [];
    @State(state => state.statistics.shareStatisticsList2) shareStatisticsList2;
    @State(state => state.statistics.shareStatisticsDetail) shareStatisticsDetail;

    @Watch('salesUuids', {immediate: true, deep: true})
    onSalesUuidsChange() {
        this.form.salesUuid = "";
        this.refreshDeviceGroup();
    }

    form = {
        effectTime: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
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
                            return {label: i.name, value: i.code};
                        })} multiple handelSelectChange={f => {
                            this.selectedChannelCode = f;
                            if (!_.isEmpty(f)) {
                                this.form.salesUuids = [];
                                this.form.groupUuids = [];
                            }
                            this.handelSearch();
                        }} class="table-top-item"/>
                       {/* <JSelect placeholder="请选择销售方" emptyLabel="所有" value={this.form.salesUuids} vModel="salesUuids" options={this.salesList.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={f => {
                            this.salesUuids = f;
                            if (!_.isEmpty(f)) {
                                this.form.selectedChannelCode = [];
                                this.selectedChannelCode = [];
                            }
                            this.handelSearch();
                        }} class="table-top-item"/>*/}
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
                <el-col>
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "all",
                            tableAction: "statistics2/share/RefreshPage",
                            data: {data: [this.shareStatisticsList2.single]},
                            viewRule: [
                                {columnKey: 'label', label: '名称', formatter: r => "总计", minWidth: 50},
                                {columnKey: 'registerCount', label: '新增设备', minWidth: 90},
                                {columnKey: 'orderCount', label: '新增订单', minWidth: 90},
                                {columnKey: 'price', label: '新增收入', minWidth: 90},
                                {columnKey: 'runCount', label: '活跃设备', minWidth: 90},
                                {columnKey: 'proportion', label: '套餐分布', childes: this.childes1},
                            ],
                            handelBeforeRenderPage: d => this.handelBeforeRenderPage1(d, this.childes1),
                            pagination: false
                        })
                    }
                </el-col>
            </el-row>

            <el-row style="margin-top: 16px; margin-bottom: 20px;">
                <el-col>
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "detail",
                            tableAction: "statistics2/share/detail/RefreshPage",
                            data: this.shareStatisticsDetail,
                            viewRule: [
                                {columnKey: 'channelName', label: '名称', minWidth: 90},
                                {columnKey: 'registerCount', label: '新增设备', minWidth: 90},
                                {columnKey: 'orderCount', label: '新增订单', minWidth: 90},
                                {columnKey: 'price', label: '新增收入', minWidth: 90},
                                {columnKey: 'runCount', label: '活跃设备', minWidth: 90},
                                {columnKey: 'proportion', label: '套餐分布', childes: this.childes3},
                            ],
                            handelBeforeRenderPage: d => this.handelBeforeRenderPage2(d, this.childes3),
                        })
                    }
                </el-col>
            </el-row>

            <el-row>
                {
                    this.mTableHtml(h, {
                        showDetail: false,
                        refs: "day",
                        tableAction: "statistics2/share/RefreshPage",
                        data: this.shareStatisticsList2,
                        viewRule: [
                            {columnKey: 'time', label: '日期', minWidth: 90},
                            {columnKey: 'registerCount', label: '新增设备', minWidth: 90},
                            {columnKey: 'orderCount', label: '新增订单', minWidth: 90},
                            {columnKey: 'price', label: '新增收入', minWidth: 90},
                            {columnKey: 'runCount', label: '活跃设备', minWidth: 90},
                            {columnKey: 'proportion', label: '套餐分布', childes: this.childes2},
                        ],
                        handelBeforeRenderPage: d => this.handelBeforeRenderPage2(d, this.childes2),
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
                 handelBeforeRenderPage={options.handelBeforeRenderPage}
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

    handelBeforeRenderPage1(d, childFormatter) {
        const {data} = d;
        if (data[0].proportion) {
            this.handelColumnWhenDataChange(data, childFormatter);
        }
    }

    handelBeforeRenderPage2(d, childFormatter) {
        const {data} = d;
        if (data.length) {
            this.handelColumnWhenDataChange(data, childFormatter);
        }
    }

    handelColumnWhenDataChange(data, childFormatter) {
        let dayKeys = {};
        data.map(k => {
            const {proportion} = k;
            if (proportion && proportion.length) {
                proportion.map(p => {
                    dayKeys[p.productName] = true;
                });
            }
        });
        Object.keys(dayKeys).map(k => {
            if (!childFormatter.some(c => {
                return k === c.label;
                })) childFormatter.push({columnKey: 'proportion', label: k, formatter: r => {
                    let count = "";
                    if (r.proportion && r.proportion.length) {
                        r.proportion.map(rp => {
                            if (rp.productName === k) count = rp.count;
                        });
                    }
                    return count;
                }, minWidth: 90});
        });
    }

}
