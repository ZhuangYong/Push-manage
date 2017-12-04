import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm/index';
import {add as addPage, edit as editPage, del as delPage} from '../../api/pageBuild';

const viewRule = [
    {columnKey: 'orderNo', label: '订单号', minWidth: 220},
    {columnKey: 'deviceUuid', label: '设备编号', minWidth: 220},
    {columnKey: 'productName', label: '产品名', minWidth: 120},
    {columnKey: 'dealPrice', label: '订单金额（元）'},
    {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170},
    {columnKey: 'payType', label: '支付方式', formatter: r => {
        if (r.payType === 1) return '支付宝';
        if (r.payType === 2) return '微信';
    }},
    {columnKey: 'payStatus', label: '付款状态', formatter: r => {
        if (r.payStatus === 1) return '创建';
        if (r.payStatus === 2) return '已完成';
    }},
    {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
        if (r.orderStatus === 1) return '未付款';
        if (r.orderStatus === 2) return '已付款';
    }},
    {columnKey: 'transactionid', label: '支付流水号', minWidth: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const validRules = {
    versionName: [
        {required: true, message: '请输入版本名称', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
    ]
};
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
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>

                <Vtable ref="Vtable" pageAction={'order/RefreshPage'} data={this.userManage.orderPage}
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
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }
};
