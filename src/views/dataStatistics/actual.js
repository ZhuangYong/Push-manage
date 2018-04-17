import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import Vtable from '../../components/Table/index';
import selectMultiple from '../../components/common/select_multiple';
import {searchChannelAndDeviceGroup} from "../../api/statistics";

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
                checkGroupUuids: [],
                startTime: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
            },
            channelList: [],
            groupList: [],
            loading: false
        };
    },
    mounted() {
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
        return (<div v-loading={this.loading}>
            <el-row >
                <el-form ref="form" model={this.form} label-width="100px">
                    {
                        this.channelList.length > 0 ? <el-form-item label="机型:" style="float: left">
                            <selectMultiple options={this.channelList.map(chan => {
                                return {value: chan.code, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkChannelCode = f;
                                this.getData();
                            }}/>
                        </el-form-item> : ""
                    }
                    {
                        this.groupList.length > 0 ? <el-form-item label="设备组:" style="float: left">
                            <selectMultiple options={this.groupList.map(chan => {
                                return {value: chan.uuid, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkGroupUuids = f;
                                this.getData();
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
                            onChange={this.getData}>
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row>
                <Ntable ref="allTable" data={this.dataStat.detail} viewRule={detailViewRule}/>
            </el-row>
            <el-row style="margin-top:50px">
                <b>数据明细 <i class="el-icon-d-arrow-right"></i></b>
                <Vtable style="margin-top:20px" ref="Vtable" pageAction={'actual/RefreshPage'} data={this.dataStat.statData} viewRule={allViewRule} defaultCurrentPage={this.defaultCurrentPage}/>
            </el-row>
        </div>);
    },
    methods: {
        getData: function () {
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
            this.loading = true;
            this.$store.dispatch("actual/RefreshPage", param).then((res) => {
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
