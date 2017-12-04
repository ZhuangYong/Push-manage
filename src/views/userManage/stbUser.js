import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import ConfirmDialog from '../../components/confirm/index';

const viewRule = [
    {columnKey: 'deviceId', label: '设备编号', minWidth: 220},
    {columnKey: 'status', label: '设备状态', formatter: r => {
        if (r.status === 1) return '已开启';
        if (r.status === 2) return '禁用';
    }},
    {columnKey: 'mac', label: 'MAC地址', minWidth: 120},
    {columnKey: 'channelName', label: '机型'},
    {columnKey: 'sn', label: 'SN号', minWidth: 170},
    {columnKey: 'freeDays', label: '免费天数', minWidth: 100},
    {columnKey: 'createTime', label: '注册时间', minWidth: 170},
    {columnKey: 'updateTime', label: '更新时间', minWidth: 170}
];
const validRules = {
    versionName: [
        {required: true, message: '请输入设备编号', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-32位字符', trigger: 'blur'}
    ]
};

// 功能按钮配置
const elButtons = [
    {funName: 'viewDetail', desc: '查看详情'},
    {funName: 'loginInfo', desc: '当前登录信息'},
    {funName: 'bindDeviceInfo', desc: '绑定设备（微信点歌）'},
    {funName: 'payOrderings', desc: '支付记录'},
    {funName: 'recordings', desc: '设备录音数据'},
    {funName: 'activeRecordings', desc: '激活码激活记录'},
    {funName: 'msgList', desc: '消息列表'},
    {funName: 'active', desc: '激活'},
];

export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
            filters: {
                deviceId: ''
            }
        };
    },
    computed: {
        ...mapGetters(['userManage'])
    },
    created() {
        this.loading = true;
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render: function (h) {
        return (
            <el-row v-loading={this.submitLoading}>

                <div class="filter-container">
                    <el-form model={this.filters} inline ref="filterData">

                        <el-form-item label="" prop="name">
                            <el-input value={this.filters.deviceId} name='deviceId' placeholder="请输入设备编号"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.searchFilter}>搜索</el-button>
                        </el-form-item>
                    </el-form>

                    <el-form model={this.filters} inline ref="filterData">

                        {elButtons.map((item) => (<el-form-item label="">
                            <el-button class="filter-item" onClick={() => {
                                this[item.funName]();
                            }} type="primary" icon="edit">{item.desc}
                            </el-button>
                        </el-form-item>))}
                    </el-form>
                </div>

                <Vtable ref="Vtable" pageAction={'stbUser/RefreshPage'} data={this.userManage.stbUserPage}
                                defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule}
                                handleSelectionChange={this.handleSelectionChange}/>

                <ConfirmDialog
                    visible={this.dialogVisible}
                    tipTxt={this.tipTxt}
                    handelSure={this.sureCallbacks}
                    handelCancel={() => {
                        this.dialogVisible = false;
                    }}
                />
            </el-row>
        );
    },
    methods: {

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * 搜索关键字
         */
        searchFilter: function() {
            this.$refs.Vtable.refreshData({
                currentPage: 1,
                deviceId: this.filters.deviceId
            });
        },

        /**
         * 按钮点击事件
         */
        viewDetail: function () {
            console.log(1);
        }
    }
};
