import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import Vtable from '../../components/Table/index';
import ConfirmDialog from '../../components/confirm';
import selectMultiple from '../../components/common/select_multiple';
import {bindData, parseTime} from "../../utils/index";

const detailViewRule = [
    {columnKey: 'registerCount', label: '新增注册设备', width: 100},
    {columnKey: 'activateCount', label: '已激活设备(台)'},
    {columnKey: 'configActivateCount', label: '新增配置激活设备/激活码', width: 130},
    {columnKey: 'payActivateCount', label: '新增自主付费设备/激活码', width: 130},
    {columnKey: 'freeActivateCount', label: '新增免费激活设备/激活码', width: 130},
    {columnKey: 'time', label: '时间'},
    {columnKey: 'runCount', label: '活跃设备'},
];

const allViewRule = [
    {columnKey: 'registerCount', label: '新增注册设备', width: 110},
    {columnKey: 'activateCount', label: '已激活设备(台)'},
    {columnKey: 'configActivateCount', label: '新增配置激活设备/激活码'},
    {columnKey: 'payActivateCount', label: '新增自主付费设备/激活码'},
    {columnKey: 'freeActivateCount', label: '新增免费激活设备/激活码'},
    {columnKey: 'time', label: '时间'},
    {columnKey: 'runCount', label: '活跃设备'}
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
                startTime: []
            }
        };
    },
    mounted() {
        this.updateView();
        this.getData();
        this.getStatChannel();
    },
    updated() {
        //this.updateView();
    },
    computed: {
        ...mapGetters(['dataStat'])
    },
    render(h) {
        return (<div>
            <el-row>
                <el-col span={12}>
                    <Ntable ref="allTable" data={this.dataStat.detail} viewRule={detailViewRule} style="height:350px;border:1px solid #ccc"/>
                </el-col>
                <el-col span={12}>
                    <el-form ref="form" model={this.form} label-width="100px" style="margin-left:30px">
                        <el-form-item label="时间范围:">
                            <el-date-picker
                                value={this.form.startTime}
                                type="daterange"
                                placeholder="开始时间 - 结束时间"
                                name="startTime"
                                format={"yyyy-MM-dd"}
                                value-format={"yyyy-MM-dd"}
                                onChange={() => {
                                    if (this.form.startTime[0] && this.form.startTime[1]) {
                                        var param = {
                                            channelCode: this.form.checkChannelCode,
                                            startTime: parseTime(this.form.startTime[0]),
                                            endTime: parseTime(this.form.startTime[1])
                                        };
                                        this.getData(param);
                                    }
                                }}>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="所有机型:">
                            <selectMultiple options={this.options} ref="seleMult"/>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row style="margin-top:50px">
                <b>数据明细 <i class="el-icon-d-arrow-right"></i></b>
                <Vtable style="margin-top:20px" ref="Vtable" pageAction={'actual/RefreshPage'} data={this.dataStat.statData} viewRule={allViewRule} defaultCurrentPage={this.defaultCurrentPage}/>
            </el-row>
        </div>);
    },
    methods: {
        getData: function (val) {
            const param = val || '';
            this.$store.dispatch("actual/RefreshPage", param).then((res) => {
                console.log(res);
            }).catch((err) => {
            });
        },
        getStatChannel: function () {
            this.$store.dispatch("actual/channelList").then((res) => {
                res && res.length > 0 && res.map(item => {
                    const val = {value: item.code, label: item.name};
                    this.options.push(val);
                });
            }).catch((err) => {
            });
        },
        updateView: function () {
            bindData(this, this.$refs.form);
            this.$refs.seleMult.$on('selectMultiple', (data) => {
                this.form.checkChannelCode = data;
                var param = {
                    channelCode: this.form.checkChannelCode
                };
                if (this.form.startTime !== undefined && this.form.startTime[0] && this.form.endTime[1]) {
                    param.startTime = parseTime(this.form.startTime[0]);
                    param.endTime = parseTime(this.form.startTime[1]);
                }
                this.getData(param);
            });
        }

    }
};
