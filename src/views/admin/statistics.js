import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import ConfirmDialog from '../../components/confirm';
import selectMultiple from '../../components/common/select_multiple';
import {bindData} from "../../utils/index";
import {searchChannelAndDeviceGroup} from "../../api/statistics";

const allViewRule = [
    {columnKey: 'orderCount', label: '汇总', width: 80, formatter: () => {
        return '累计';
    }},
    {columnKey: 'activateCount', label: '已激活设备(台)', width: 140},
    {columnKey: 'allPrice', label: '支付金额/元'},
    {columnKey: 'payCount', label: '自主付费设备'},
    {columnKey: 'stbUserCount', label: '设备'},
    {columnKey: 'vipCount', label: 'vip设备(台)'},
];
const dayViewRule = [
    {columnKey: 'orderCount', label: '汇总', width: 80, formatter: () => {
        return '当日';
    }},
    {columnKey: 'orderCount', label: '订单数', width: 90},
    {columnKey: 'price', label: '支付金额'},
    {columnKey: 'activateCount', label: '新增激活设备(台)'},
    {columnKey: 'configActivateCount', label: '新增配置激活设备/激活码'},
    {columnKey: 'payActivateCount', label: '新增自主付费设备/激活码', width: 140},
    {columnKey: 'registerCount', label: '新增注册设备', width: 140},
    {columnKey: 'freeActivateCount', label: '新增免费激活设备/激活码', width: 220},
];

const montyViewRule = [
    {columnKey: 'orderCount', label: '汇总', width: 80, formatter: () => {
        return '当月';
    }},
    {columnKey: 'orderCount', label: '订单数', width: 90},
    {columnKey: 'price', label: '支付金额'},
    {columnKey: 'activateCount', label: '新增激活设备(台)'},
    {columnKey: 'configActivateCount', label: '新增配置激活设备/激活码'},
    {columnKey: 'payActivateCount', label: '新增自主付费设备/激活码', width: 140},
    {columnKey: 'registerCount', label: '新增注册设备', width: 140},
    {columnKey: 'freeActivateCount', label: '新增免费激活设备/激活码', width: 220},
];

const activateViewRule = [
    {columnKey: 'day', label: '激活码天数', formatter: (r, h) => {
        return (<span><i class="el-icon-time"></i>{r.day}</span>);
    }},
    {columnKey: 'rest', label: '剩余数量'},
    {columnKey: 'total', label: '总数量'},
];

export default {
    components: {
        selectMultiple
    },
    data() {
        return {
            statChanList: [],
            options: [], //
            form: {
                checkChannelCode: [],
                checkGroupUuids: []
            },
            channelList: [],
            groupList: [],
            loading: false
        };
    },
    mounted() {
        this.getData();
        this.getActivate();
        this.getStatChannel();
    },
    computed: {
        ...mapGetters(['statistics'])
    },
    render(h) {
        return (<div v-loading={this.loading}>
            <el-row>
                <el-form ref="form" model={this.form} label-width="100px">
                {
                    this.channelList.length > 0 ? <el-form-item label="机型:" style="float: left">
                                <selectMultiple options={this.channelList.map(chan => {
                                    return {value: chan.code, label: chan.name};
                                })} multiChange={f => {
                                    this.form.checkChannelCode = f;
                                    const param = {
                                        groupUuids: this.form.checkGroupUuids,
                                        channelCodes: this.form.checkChannelCode
                                    };
                                    this.getData(param);
                                }}/>
                            </el-form-item> : ""
                }
                {
                    this.groupList.length > 0 ? <el-form-item label="设备组:" style="float: left">
                            <selectMultiple options={this.groupList.map(chan => {
                                return {value: chan.uuid, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkGroupUuids = f;
                                const param = {
                                    groupUuids: this.form.checkGroupUuids,
                                    channelCodes: this.form.checkChannelCode
                                };
                                this.getData(param);
                            }}/>
                        </el-form-item> : ""
                }
                </el-form>
            </el-row>
            <el-row>
                <Ntable ref="allTable" data={this.statistics.statData.all} viewRule={allViewRule}/>
            </el-row>
            <el-row style="margin-top:50px">
                 <Ntable ref="dayTable" data={this.statistics.statData.day} viewRule={dayViewRule}/>
            </el-row>
            <el-row style="margin-top:50px;">
                <Ntable ref="monthTable" data={this.statistics.statData.month} viewRule={montyViewRule}/>
            </el-row>
            <el-row style="margin-top:50px;">
                <p>激活码统计列表</p>
                <Ntable ref="activeTable" data={this.statistics.statActivate} viewRule={activateViewRule}/>
            </el-row>
        </div>);
    },
    methods: {
        getData: function (val) {
            const param = val || '';
            this.loading = true;
            this.$store.dispatch("statistics/RefreshPage", param).then((res) => {
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        getActivate: function () {
            this.loading = true;
            this.$store.dispatch("statistics/activate").then((res) => {
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
