import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import ConfirmDialog from '../../components/confirm';
import {bindData} from "../../utils/index";

const allViewRule = [
    {columnKey: 'activateCount', label: '汇总', width: 80, formatter: () => {
        return '累计';
    }},
    {columnKey: 'activateCount', label: '已激活设备(台)', width: 140},
    {columnKey: 'allPrice', label: '支付金额/元', width: 140},
    {columnKey: 'payCount', label: '自主付费设备', width: 90},
    {columnKey: 'stbUserCount', label: '设备', width: 90},
    {columnKey: 'vipCount', label: 'vip设备(台)', width: 80},
];
const dayViewRule = [
    {columnKey: 'activateCount', label: '汇总', width: 80, formatter: () => {
        return '当日';
    }},
    {columnKey: 'orderCount', label: '订单数', width: 90},
    {columnKey: 'price', label: '支付金额', width: 120},
    {columnKey: 'activateCount', label: '新增激活设备(台)', width: 160},
    {columnKey: 'configActivateCount', label: '新增配置激活设备/激活码', width: 140},
    {columnKey: 'payActivateCount', label: '新增自主付费设备/激活码', width: 140},
    {columnKey: 'registerCount', label: '新增注册设备', width: 140},
    {columnKey: 'freeActivateCount', label: '新增免费激活设备/激活码', width: 220},
];

const montyViewRule = [
    {columnKey: 'activateCount', label: '汇总', width: 80, formatter: () => {
        return '当月';
    }},
    {columnKey: 'orderCount', label: '订单数', width: 90},
    {columnKey: 'price', label: '支付金额', width: 120},
    {columnKey: 'activateCount', label: '新增激活设备(台)', width: 160},
    {columnKey: 'configActivateCount', label: '新增配置激活设备/激活码', width: 140},
    {columnKey: 'payActivateCount', label: '新增自主付费设备/激活码', width: 140},
    {columnKey: 'registerCount', label: '新增注册设备', width: 140},
    {columnKey: 'freeActivateCount', label: '新增免费激活设备/激活码', width: 220},
];

const activateViewRule = [
    {columnKey: 'day', label: '激活码天数', width: 140, formatter: (r, h) => {
        return (<span><i class="el-icon-time"></i>{r.day}</span>);
    }},
    {columnKey: 'rest', label: '剩余数量', width: 140},
    {columnKey: 'total', label: '总数量', width: 140},
];

export default {
    data() {
        return {
            statChanList: [],
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
    updated() {
        this.updateView();
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
                    <el-form ref="form" model={this.form} label-width="80px" style="margin-left:30px">
                        <el-form-item label="所有机型:" style="max-height:300px;width:auto;">
                            {
                                this.statistics.statChanList && this.statistics.statChanList.length === 0 ? <div style="min-height:300px;width:100px;border:1px solid #ccc;">
                                    <div style="text-align:center;line-height:300px;">暂无机型</div>
                                </div> : ''
                            }
                            {
                                this.statistics.statChanList && this.statistics.statChanList.map(item => (
                                    <div style="display:inline-block; margin-left:10px">
                                        <el-checkbox label={item.name} name="type" key={item.code} onChange={(e) => {
                                            let {checked} = e.target;
                                            let value = item.code;

                                            if (checked) {
                                                if (!this.form.checkChannelCode.find(v => v === value)) {
                                                    this.form.checkChannelCode.push(value);
                                                }
                                            } else {
                                                this.form.checkChannelCode = this.form.checkChannelCode.filter(v => v !== value);
                                            }

                                            var param = {
                                                channelCode: this.form.checkChannelCode
                                            };
                                            this.getData(param);

                                        }}></el-checkbox>
                                    </div>
                                ))
                            }
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
            }).catch((err) => {
            });
        },
        updateView: function () {
            bindData(this, this.$refs.form);
        }

    }
};
