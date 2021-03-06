import {mapGetters} from "vuex";
import Ntable from '../../components/Table/normalTable';
import Vtable from '../../components/Table/index';
import selectMultiple from '../../components/common/select_multiple';
import TreeSelect from "../../components/select/treeSelect";
import {searchManufactureChannelByManufUUID, searchStatisticsSearchTree} from "../../api/sales";
import {list as payList} from "../../api/pay";

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
        selectMultiple,
        TreeSelect
    },

    watch: {
        manufUuids: function() {
            this.getStatChannel();
        }
    },

    data() {
        return {
            statChanList: [],
            defaultCurrentPage: 1,
            options: [], //
            channelList: [],
            groupList: [],
            optionsSales: [],
            manufUuids: [],
            loading: false,
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
        };
    },
    mounted() {
        // this.getData();
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
                            this.manufUuids = d.map(item => item.uuid);
                            this.handleSearch();
                        }}/>
                    </el-form-item>
                    {
                        this.channelList.length > 0 ? <el-form-item label="机型:" style="float: left">
                            <selectMultiple options={this.channelList.map(chan => {
                                return {value: chan.channelCode, label: chan.channelName};
                            })} multiChange={f => {
                                this.form.checkChannelCode = f;
                                this.handleSearch();
                            }}/>
                        </el-form-item> : ""
                    }
                    {/* {
                        this.groupList.length > 0 ? <el-form-item label="设备组:" style="float: left">
                            <selectMultiple options={this.groupList.map(chan => {
                                return {value: chan.uuid, label: chan.name};
                            })} multiChange={f => {
                                this.form.checkGroupUuids = f;
                                this.getData();
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
                            onChange={this.handleSearch}>
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row>
                <Ntable ref="allTable" data={this.dataStat.detail} viewRule={detailViewRule} pageActionSearchColumn={this.pageActionSearchColumn}/>
            </el-row>
            <el-row style="margin-top:50px">
                <b>数据明细 <i class="el-icon-d-arrow-right"></i></b>
                <Vtable style="margin-top:20px" ref="Vtable" pageAction={'actual/RefreshPage'}
                        data={this.dataStat.statData} viewRule={allViewRule} defaultCurrentPage={this.defaultCurrentPage}
                        pageActionSearchColumn={this.pageActionSearchColumn}/>
            </el-row>
        </div>);
    },
    methods: {
        handleSearch() {
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
            if (this.manufUuids) param.manufUuids = this.manufUuids;
            this.pageActionSearchColumn = Object.keys(param).map(p => {
                let column = {};
                column[p] = param[p];
                return column;
            });
            Object.keys(this.$refs).forEach(t => {
                this.$refs[t].refreshData && this.$refs[t].refreshData(param);
            });
        },
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
            if (this.manufUuids) param.manufUuids = this.manufUuids;
            this.pageActionSearchColumn = Object.keys(param).map(p => {
                let column = {};
                column[p] = param[p];
                return column;
            });
            this.loading = true;
            this.$store.dispatch("actual/RefreshPage", param).then((res) => {
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        getStatChannel: function () {
            this.loading = true;
            searchManufactureChannelByManufUUID({manufUuids: this.manufUuids}).then((res) => {
                this.channelList = res;
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
