import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import Vtable from '../../components/Table/index';
import selectMultiple from '../../components/common/select_multiple';
import {bindData, parseTime} from "../../utils/index";
import {searchChannelAndDeviceGroup} from "../../api/statistics";
import {list as payList} from "../../api/pay";
import {searchStatisticsSearchTree} from "../../api/sales";
import TreeSelect from "../../components/select/treeSelect";

const detailViewRule = [
    {columnKey: 'orderCount', label: '订单数'},
    {columnKey: 'price', label: '支付金额'},
];
const detailRule = [
    {columnKey: 'payPrice', label: '支付金额', minWidth: 100},
    {columnKey: 'freeActivateCodeCount', label: '新增免费激活码', minWidth: 200},
    {columnKey: 'payActivateCodeCount', label: '新增自主付费激活码', minWidth: 230},
    {columnKey: 'configActivateCodeCount', label: '新增配置激活码', minWidth: 230},
    {columnKey: 'time', label: '时间 ', minWidth: 170}
];
const allViewRule = [
    {columnKey: 'payPrice', label: '支付金额', minWidth: 160},
    {columnKey: 'configActivateCodeCount', label: '新增配置激活码', minWidth: 200},
    {columnKey: 'freeActivateCodeCount', label: '新增免费激活码', minWidth: 230},
    {columnKey: 'payActivateCodeCount', label: '新增自主付费激活码', minWidth: 230},
    {columnKey: 'time', label: '时间', minWidth: 170},
];
export default {
    components: {
        selectMultiple,
        TreeSelect
    },
    data() {
        return {
            statChanList: [],
            defaultCurrentPage: 1,
            options: [], //
            form: {
                checkChannelCode: [],
                checkGroupUuids: [],
                startTime: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
            },
            pickerOptions: {
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
            },
            channelList: [],
            groupList: [],
            payList: [],
            optionsSales: [],
            checkedSale: [],
            loading: false
        };
    },
    mounted() {
        this.getStatisticsPay();
        this.getStatChannel();
        this.refreshSales();
    },
    updated() {
        //this.updateView();
    },
    computed: {
        ...mapGetters(['dataStat'])
    },
    render(h) {
        return (<div v-loading={this.loading}>
            <el-row >
                <el-form ref="form" model={this.form} label-width="100px">
                    <el-form-item label="渠道方:" style="float: left">
                        <TreeSelect placeHolder="请选择" treeData={this.optionsSales} multiple={true} handelNodeClick={d => {
                            this.checkedSale = d.map(item => item.uuid);
                            this.getStatisticsPay();
                        }}/>
                    </el-form-item>
                    {
                        this.channelList.length > 0 ? <el-form-item label="机型:" style="float: left">
                            <selectMultiple options={this.channelList.map(chan => {
                                return {value: chan.code, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkChannelCode = f;
                                this.getStatisticsPay();
                            }}/>
                        </el-form-item> : ""
                    }
                    {/*{
                        this.groupList.length > 0 ? <el-form-item label="设备组:" style="float: left">
                            <selectMultiple options={this.groupList.map(chan => {
                                return {value: chan.uuid, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkGroupUuids = f;
                                this.getStatisticsPay();
                            }}/>
                        </el-form-item> : ""
                    }*/}
                    <el-form-item label="时间范围:" style="float: left;">
                        <el-date-picker
                            value={this.form.startTime}
                            type="daterange"
                            picker-options={this.pickerOptions}
                            placeholder="开始时间 - 结束时间"
                            name="startTime"
                            format={"yyyy-MM-dd"}
                            value-format={"yyyy-MM-dd"}
                            onInput={v => this.form.startTime = v || []}
                            onChange={this.getStatisticsPay}>
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row style="max-width: 250px;">
                <Ntable ref="allTable" data={[this.payList]} viewRule={detailViewRule}/>
            </el-row>
            <el-row style="margin-top:50px">
                <Ntable ref="allTable" data={[this.dataStat.payDetail]} viewRule={detailRule} pageActionSearchColumn={this.pageActionSearchColumn}/>
            </el-row>
            <el-row style="margin-top:50px">
                <b>数据明细 <i class="el-icon-d-arrow-right"/></b>
                <Vtable style="margin-top:20px" ref="Vtable" pageAction={'statistics/pay/RefreshPage'} data={this.dataStat.payPage} viewRule={allViewRule} defaultCurrentPage={this.defaultCurrentPage} pageActionSearchColumn={this.pageActionSearchColumn}/>
            </el-row>
        </div>);
    },
    methods: {
        getStatisticsPay: function () {
            let param = {
                groupUuids: this.form.checkGroupUuids,
                channelCodes: this.form.checkChannelCode
            };
            if (this.form.startTime[0] && this.form.startTime[1]) {
                param = {
                    startTime: this.form.startTime[0],
                    endTime: this.form.startTime[1],
                    ...param
                };
            }
            if (this.checkedSale) param.manufUuids = this.checkedSale;
            this.pageActionSearchColumn = Object.keys(param).map(p => {
                let column = {};
                column[p] = param[p];
                return column;
            });
            this.loading = true;
            payList(param).then(res => {
                this.payList = res;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        getStatChannel: function () {
            this.loading = true;
            searchChannelAndDeviceGroup().then((res) => {
                this.channelList = res.channelList;
                this.groupList = res.groupList;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        refreshSales: function () {
            this.loading = true;
            searchStatisticsSearchTree().then(res => {
                this.optionsSales = res;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        }
    }
};
