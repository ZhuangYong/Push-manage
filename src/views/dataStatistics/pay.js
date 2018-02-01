import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import Vtable from '../../components/Table/index';
import selectMultiple from '../../components/common/select_multiple';
import {bindData, parseTime} from "../../utils/index";
import {searchChannelAndDeviceGroup} from "../../api/statistics";
import {list as payList} from "../../api/pay";

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
        selectMultiple
    },
    data() {
        return {
            statChanList: [],
            defaultCurrentPage: 1,
            options: [], //
            form: {
                checkChannelCode: [],
                checkGroupUuids: [],
                startTime: []
            },
            channelList: [],
            groupList: [],
            payList: [],
            loading: false
        };
    },
    mounted() {
        this.getStatisticsPay();
        this.getStatChannel();
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
                    {
                        this.groupList.length > 0 ? <el-form-item label="设备组:" style="float: left">
                            <selectMultiple options={this.groupList.map(chan => {
                                return {value: chan.uuid, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkGroupUuids = f;
                                this.getStatisticsPay();
                            }}/>
                        </el-form-item> : ""
                    }
                    <el-form-item label="时间范围:" style="float: left;">
                        <el-date-picker
                            value={this.form.startTime}
                            type="daterange"
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
                <Ntable ref="allTable" data={[this.dataStat.payDetail]} viewRule={detailRule}/>
            </el-row>
            <el-row style="margin-top:50px">
                <b>数据明细 <i class="el-icon-d-arrow-right"/></b>
                <Vtable style="margin-top:20px" ref="Vtable" pageAction={'statistics/pay/RefreshPage'} data={this.dataStat.payPage} viewRule={allViewRule} defaultCurrentPage={this.defaultCurrentPage}/>
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
                    startTime: parseTime(this.form.startTime[0]),
                    endTime: parseTime(this.form.startTime[1]),
                    ...param
                };
            }
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
    }
};
