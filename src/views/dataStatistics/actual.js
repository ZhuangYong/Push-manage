/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: shareStatistics.js @author: walljack@163.com @date: 18-4-9 下午3:04 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import CommonTable from "../../components/Table/CommonTable";
import JSelect from "../../components/select/select";
import {State} from "vuex-class/lib/index";
import {Watch} from "vue-property-decorator/lib/vue-property-decorator";
import Ntable from '../../components/Table/normalTable';
import {
    searchDeviceGroupBySalesUUID,
    searchManufactureChannelByManufUUID,
    searchSalesAndDeviceGroup, searchStatisticsSearchTree
} from "../../api/sales";
import _ from "lodash";
import {shareChannelList} from "../../api/function";
import {operateShareStatisticsList, shareStatisticsDetail, shareStatisticsList2} from "../../api/statistics";
import TreeSelect from "../../components/select/treeSelect";

const detailViewRule = [
    {columnKey: 'registerCount', label: '新增设备', width: 110},
    {columnKey: 'activateCount', label: '新增激活设备'},
    {columnKey: 'configActivateCount', label: '新增配置领取设备'},
    {columnKey: 'payActivateCount', label: '新增自主付费设备'},
    {columnKey: 'freeActivateCount', label: '新增后台激活设备'},
    // {columnKey: 'time', label: '时间'},
    {columnKey: 'runCount', label: '活跃设备'}
];

@Component({
    name: 'ActualStatisticsView',
    components: {
        JSelect
    }
})
export default class ShareStatisticsView extends BasePage {
    statChanList = [];
    defaultCurrentPage = 1;
    options = []; //
    channelList = [];
    groupList = [];
    optionsSales = [];
    manufUuids = [];
    loading = false;
    @State(state => state.dataStat) dataStat;

    @Watch('manufUuids', {immediate: true, deep: true})
    onManufUuidsChange() {
        this.getStatChannel();
    }

    form = {
        effectTime: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
        checkChannelCode: [],
        checkGroupUuids: [],
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
        this.getStatChannel();
        this.refreshSales();
    }

    render(h) {
        return <div>
            <el-row>
                <el-form ref="form" model={this.form} label-width="100px">
                    <div class="table" style="inline;">
                        <TreeSelect placeHolder="渠道方" class="table-top-item" treeData={this.optionsSales} multiple={true} handelNodeClick={d => {
                            this.form.manufUuids = d.map(item => item.uuid);
                            this.manufUuids = this.form.manufUuids;
                            this.form.checkChannelCode = [];
                            this.handelSearch();
                        }}/>
                        {
                            this.channelList.length > 0 && <JSelect placeholder="请选机型" emptyLabel="所有" value={this.form.checkChannelCode} vModel="checkChannelCode" options={this.channelList.map(i => {
                                return {label: `${i.channelName}(${i.channelCode})`, value: i.channelCode};
                            })} multiple handelSelectChange={f => {
                                this.checkChannelCode = f;
                                this.handelSearch();
                            }} class="table-top-item"/>
                        }

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
                <Ntable ref="allTable" data={this.dataStat.detail} viewRule={detailViewRule} pageActionSearchColumn={this.pageActionSearchColumn}/>
            </el-row>

            <el-row style="margin-top: 16px; margin-bottom: 20px;">
                <el-col>
                    {
                        this.mTableHtml(h, {
                            showDetail: false,
                            refs: "detail",
                            tableAction: "actual/RefreshPage",
                            data: this.dataStat.statData,
                            viewRule: [
                                {columnKey: 'time', label: '日期'},
                                {columnKey: 'registerCount', label: '新增设备', width: 110},
                                {columnKey: 'activateCount', label: '新增激活设备'},
                                {columnKey: 'configActivateCount', label: '新增配置领取设备'},
                                {columnKey: 'payActivateCount', label: '新增自主付费设备'},
                                {columnKey: 'freeActivateCount', label: '新增后台激活设备'},
                                {columnKey: 'runCount', label: '活跃设备'}
                            ],
                            handelBeforeRenderPage: d => this.handelBeforeRenderPage2(d, this.childes3),
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
                         handelBeforeRenderPage={options.handelBeforeRenderPage}
            />
        </div>;
    }

    handelSearch() {
        let param = {};
        param.groupUuids = this.form.checkGroupUuids;
        param.channelCodes = this.form.checkChannelCode;
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
        if (this.manufUuids) param.manufUuids = this.manufUuids;
        param.currentPage = 1;
        Object.keys(this.$refs).forEach(t => {
            this.$refs[t].refreshData && this.$refs[t].refreshData(param);
        });
    }
    getStatChannel() {
        this.loading = true;
        searchManufactureChannelByManufUUID({manufUuids: this.manufUuids}).then((res) => {
            this.channelList = res;
            this.loading = false;
        }).catch((err) => {
            this.loading = false;
        });
    }
    refreshSales() {
        this.loading = true;
        searchStatisticsSearchTree().then(res => {
            this.optionsSales = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
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
        if (_.isEmpty(this.form.salesUuids)) {
            this.deviceGroup = [];
        }
        this.loading = true;
        searchDeviceGroupBySalesUUID({salesUuids: this.form.salesUuids}).then(res => {
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
