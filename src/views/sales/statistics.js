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
import DataRangePicker from "../../components/data/dataRangePicker";
import TreeSelect from "../../components/select/treeSelect";

@Component({
    name: 'StatisticsView',
    components: {
        JSelect,
        DataRangePicker
    }
})
export default class StatisticsView extends BasePage {
    deviceGroup = [];
    selectedChannelCode = [];
    salesUuids = [];
    salesList = [];
    defaultChecked = [];
    @State(state => state.sales.statisticsIndex) statisticsIndex;
    @State(state => state.sales.statisticsDetail) statisticsDetail;

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
    detailTableActionSearchColumn = [];
    created() {
        this.refreshChanel();
    }

    render(h) {
        const {currentDay = {}, yesterday = {}, month = {}} = this.statisticsIndex.data || {currentDay: {}, yesterday: {}, month: {}};
        currentDay.label = "今日";
        yesterday.label = "昨日";
        month.label = "当月";
        return <div>
            <el-row>
                <el-form ref="form" model={this.form} label-width="100px">
                    <div class="table" style="inline;">
                        {/*<JSelect placeholder="请选择销售方" emptyLabel="所有" vModel="salesUuids" options={this.salesList.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={f => {
                            this.salesUuids = f;
                            this.handelSearch();
                        }} class="table-top-item"/>*/}
                        {/*<el-dropdown class="table-top-item" trigger="click" hide-on-click={false}>
                            <el-button type="primary">
                                {"请选择销售方"}<i class="el-icon-arrow-down el-icon--right"/>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    {
                                        this.salesList.length && <el-tree
                                            style="min-height: 300px; min-width: 260px; overflow: auto; border: 1px solid #d1dbe5;border-top:1px solid whitesmoke;"
                                            data={this.salesList || [{label: "所有", id: ""}]}
                                            check-strictly={true}
                                            expand-on-click-node={false}
                                            node-key="id"
                                            props={{
                                                children: 'children',
                                                label: 'name'
                                            }}
                                            ref="tree"
                                            default-checked-keys={this.defaultChecked}
                                            onNode-click={d => {
                                                this.salesUuids = d.uuid;
                                                this.handelSearch();
                                            }}
                                            highlight-current
                                            default-expand-all>
                                        </el-tree>
                                    }
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>*/}
                        <TreeSelect placeHolder="请选择销售方" class="table-top-item" treeData={this.salesList} multiple={true} handelNodeClick={d => {
                            this.salesUuids = d.map(item => item.uuid);
                            this.handelSearch();
                        }}/>
                        <JSelect placeholder="请选择设备组" emptyLabel="所有" vModel="groupUuids" options={this.deviceGroup.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={this.handelSearch} class="table-top-item"/>
                        <DataRangePicker vModel="effectTime" handelChange={this.handelSearch}/>
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
                            refName: "indexTable",
                            showDetail: false,
                            tableAction: "sales/statistics/index/RefreshPage",
                            data: {data: [this.statisticsIndex.data.all]},
                            viewRule: [
                                {columnKey: 'orderCount', label: '汇总', minWidth: 60, formatter: () => "累计"},
                                {columnKey: 'orderCount', label: '订单数', minWidth: 80},
                                {columnKey: 'shouldAmount', label: '应结算金额', minWidth: 100},
                                {columnKey: 'alreadyAmount', label: '已结算金额（元）', minWidth: 120},
                                {columnKey: 'unAmount', label: '未结算金额（元）', minWidth: 120},
                                {columnKey: 'outAmount', label: '应支出', minWidth: 60},
                                {columnKey: 'inAmount', label: '应收入', minWidth: 60},
                            ],
                            pagination: false
                        })
                    }
                </el-col>
            </el-row>

            <el-row style="max-width: 800px; margin-bottom: 20px;">
                {
                    this.mTableHtml(h, {
                        tableActionSearchColumn: [],
                        tableAction: "sales/statistics/index/RefreshPage",
                        data: {data: [currentDay, yesterday, month]},
                        viewRule: [
                            {columnKey: '', label: '汇总', minWidth: 60, formatter: r => r.label},
                            {columnKey: 'orderCount', label: '订单数', minWidth: 60},
                            {columnKey: 'inAmount', label: '收入金额（元）', minWidth: 100},
                            {columnKey: 'registerCount', label: '套餐占比', minWidth: 180, formatter: r => r.proportion && `${r.proportion.map(p => p.productName).join("：")}/${r.proportion.map(p => p.count).join("：")}`},
                        ],
                        pagination: false
                    })
                }
            </el-row>

            <el-row>
                {
                    this.mTableHtml(h, {
                        refName: "detailTable",
                        tableActionSearchColumn: this.detailTableActionSearchColumn,
                        tableAction: "sales/statistics/detail/RefreshPage",
                        data: this.statisticsDetail || {data: []},
                        viewRule: [
                            {columnKey: 'time', label: '日期', minWidth: 60},
                            {columnKey: 'orderCount', label: '订单数', minWidth: 60},
                            {columnKey: 'payPrice', label: '收入金额（元）', minWidth: 100},
                            {columnKey: 'registerCount', label: '套餐占比', minWidth: 180, formatter: r => r.proportion && `${r.proportion.map(p => p.productName).join("：")}/${r.proportion.map(p => p.count).join("：")}`},
                        ],
                        pagination: true
                    })
                }
            </el-row>
        </div>;
    }
    mTableHtml(h, options) {
        return <div>
            <CommonTable ref={options.refName || "commonTable"}
                         data={options.data}
                         showDetail={options.showDetail}
                         tableAction={options.tableAction}
                         defaultSort={this.defaultSort[this.tableAction]}
                         tableActionSearchColumn={options.tableActionSearchColumn}
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
        param.salesUuids = this.salesUuids;
        param.groupUuids = this.form.groupUuids;
        let detailParam = Object.assign({}, param);
        if (!_.isEmpty(this.form.effectTime)) {
            const startTime = this.form.effectTime[0];
            const endTime = this.form.effectTime[1];
            detailParam.startTime = startTime;
            detailParam.endTime = endTime;
        }
        this.$refs.commonTable.refreshData(param);
        this.detailTableActionSearchColumn = Object.keys(detailParam).map(d => {
            let item = {};
            item[d] = detailParam[d];
            return item;
        });
        this.$refs.detailTable.refreshData(Object.assign({}, detailParam, {
            currentPage: this.defaultCurrentPage
        }));
        this.$refs.indexTable.refreshData(Object.assign({}, detailParam, {
            currentPage: this.defaultCurrentPage
        }));
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
