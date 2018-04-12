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
import Const from "../../utils/const";
import TreeSelect from "../../components/select/treeSelect";

@Component({
    name: 'OperateStatisticsPage',
    components: {
        JSelect
    }
})
export default class OperateStatisticsPage extends BasePage {
    deviceGroup = [];
    selectedChannelCode = [];
    salesUuids = [];
    salesList = [];
    @State(state => state.statistics.operateStatisticsList) operateStatisticsList;

    @Watch('salesUuids', {immediate: true, deep: true})
    onSalesUuidsChange() {
        this.form.salesUuid = "";
        this.refreshDeviceGroup();
    }

    form = {
        isShare: "",
        effectTime: [],
        deviceGroupUuid: [],
        salesUuids: [],
        groupUuids: []
    };

    created() {
        this.refreshChanel();
    }

    render(h) {
        const {currentDay = {}, yesterday = {}, month = {}} = this.operateStatisticsList.data || {currentDay: {}, yesterday: {}, month: {}};
        currentDay.label = "今日";
        yesterday.label = "昨日";
        month.label = "当月";
        return <div>
            <el-row>
                <el-form ref="form" model={this.form} label-width="100px">
                    <div class="table" style="inline;">
                        <JSelect placeholder="请选择是否共享" emptyLabel="所有" vModel="isShare" options={[{label: "非共享", value: 0}, {label: "共享", value: 1}].map(i => {
                            return {label: i.label, value: i.value};
                        })} handelSelectChange={this.handelSearch} class="table-top-item"/>
                        {/*<JSelect placeholder="请选择销售方" emptyLabel="所有" vModel="salesUuids" options={this.salesList.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={f => {
                            this.salesUuids = f;
                            this.handelSearch();
                        }} class="table-top-item"/>*/}
                        <TreeSelect placeHolder="请选择销售方" class="table-top-item" treeData={this.salesList} multiple={true} handelNodeClick={d => {
                            this.form.salesUuids = d.map(item => item.uuid);
                            this.salesUuids = this.form.salesUuids;
                            this.handelSearch();
                        }}/>
                        <JSelect placeholder="请选择设备组" emptyLabel="所有" vModel="groupUuids" options={this.deviceGroup.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={this.handelSearch} class="table-top-item"/>
                        {/*<el-date-picker
                            class="table-top-item"
                            style="max-width: 300px;"
                            type="daterange"
                            picker-options={Const.dataRangerOption}
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
                        </el-date-picker>*/}
                    </div>
                </el-form>
            </el-row>

            <el-row>
                <el-col style="max-width: 800px; margin-bottom: 20px;">
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            tableAction: "statistics/operate/RefreshPage",
                            data: {data: [this.operateStatisticsList.data.all]},
                            viewRule: [
                                {columnKey: '', label: '汇总', minWidth: 60, formatter: () => "累计"},
                                {columnKey: 'deviceCount', label: '总设备（台）', minWidth: 80},
                                {columnKey: 'orderCount', label: '订单总数', minWidth: 60},
                                {columnKey: 'amount', label: '总收入', minWidth: 100},
                            ],
                            pagination: false
                        })
                    }
                </el-col>
            </el-row>

            <el-row style="max-width: 800px; margin-bottom: 20px;">
                {
                    this.mTableHtml(h, {
                        tableAction: "statistics/operate/RefreshPage",
                        data: {data: [currentDay, yesterday, month]},
                        viewRule: [
                            {columnKey: '', label: '汇总', minWidth: 60, formatter: r => r.label},
                            {columnKey: 'deviceCount', label: '新增激活设备', minWidth: 60},
                            {columnKey: 'orderCount', label: '订单', minWidth: 60},
                            {columnKey: 'amount', label: '收入金额（元）', minWidth: 100},
                            {columnKey: 'runCount', label: '活跃设备', minWidth: 100},
                        ],
                        pagination: false
                    })
                }
            </el-row>

            {/*<el-row>
                {
                    this.mTableHtml(h, {
                        tableAction: "sales/statistics/detail/RefreshPage",
                        data: this.statisticsDetail || {data: []},
                        viewRule: [
                            {columnKey: 'time', label: '日期', minWidth: 60},
                            {columnKey: 'orderCount', label: '订单数', minWidth: 60},
                            {columnKey: 'payPrice', label: '收入金额（元）', minWidth: 100},
                            {columnKey: 'registerCount', label: '套餐占比', minWidth: 180, formatter: r => r.proportion && `${r.proportion.map(p => p.productName).join("：")}/${r.proportion.map(p => p.count).join("：")}`},
                        ],
                        pagination: false
                    })
                }
            </el-row>*/}
        </div>;
    }
    mTableHtml(h, options) {
        return <div>
            <CommonTable ref={options.refName || "commonTable"}
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
        if (!_.isEmpty(this.form.isShare + "")) param.isShare = this.form.isShare;
        if (!_.isEmpty(this.form.salesUuids)) param.salesUuids = this.form.salesUuids;
        if (!_.isEmpty(this.form.groupUuids)) param.groupUuids = this.form.groupUuids;
        // let detailParam = Object.assign({}, param);
        // if (!_.isEmpty(this.form.effectTime)) {
        //     const startTime = this.form.effectTime[0];
        //     const endTime = this.form.effectTime[1];
        //     detailParam.startTime = startTime;
        //     detailParam.endTime = endTime;
        // }
        this.$refs.commonTable.refreshData(param);
        // this.$refs.detailTable.refreshData(detailParam);
    }

    async refreshChanel() {
        this.loading = true;
        await searchSalesAndDeviceGroup().then(res => {
            this.salesList = res;
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
