import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import ConfirmDialog from '../../components/confirm';
import selectMultiple from '../../components/common/select_multiple';
import {bindData} from "../../utils/index";

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
                checkChannelCode: []
            }
        };
    },
    mounted() {
        this.updateView();
        this.getData();
        this.getActivate();
        this.getStatChannel();
    },
    computed: {
        ...mapGetters(['statistics'])
    },
    render(h) {
        return (<div>
            <el-row>
                <el-col span={12}>
                    <Ntable ref="allTable" data={this.statistics.statData.all} viewRule={allViewRule} style="height:300px;border:1px solid #ccc"/>
                </el-col>
                <el-col span={12}>
                    <el-form ref="form" model={this.form} label-width="100px" style="margin-left:30px">
                        <el-form-item label="所有机型:">
                            <selectMultiple options={this.options} ref="seleMult"/>
                        </el-form-item>
                    </el-form>
                </el-col>
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
            this.$store.dispatch("statistics/RefreshPage", param).then((res) => {
               console.log("统计");
            }).catch((err) => {
            });
        },
        getActivate: function () {
            this.$store.dispatch("statistics/activate").then((res) => {
                console.log(res);
                console.log("激活码");
            }).catch((err) => {
            });
        },
        getStatChannel: function () {
            this.$store.dispatch("statistics/channelList").then((res) => {
                this.statChanList = res;
                res && res.length > 0 && res.map(item => {
                    const val = {value: item.code, label: item.name};
                    this.options.push(val);
                });

            }).catch((err) => {
            });
        },
        updateView: function () {
            this.$refs.seleMult.$on('selectMultiple', (data) => {
                this.form.checkChannelCode = data;
                var param = {
                    channelCode: this.form.checkChannelCode
                };
                this.getData(param);
            });
        }

    }
};
