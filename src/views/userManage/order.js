import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm/index';
import {orderSave} from "../../api/userManage";

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
    {label: '操作', buttons: [{label: '手动支付', type: 'edit'}], minWidth: 100}
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
            filter: {
                dealDesc: null
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
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>

                {this.status === 'list' ? <Vtable ref="Vtable" pageAction={'order/RefreshPage'} data={this.userManage.orderPage}
                        defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule}/> : this.cruHtml(h)}

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
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return <el-form model={this.filter} ref="filterDesc">
                <el-form-item label="描述">
                    <el-input type="textarea" value={this.filter.dealDesc} name="dealDesc"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" onClick={this.submit}>确定</el-button>
                    <el-button onClick={() => {this.status = 'list';}}>取消</el-button>
                </el-form-item>
            </el-form>;
        },

        submit: function () {
            const param = {
                id: this.selectItems.id,
                userRemark: this.filter.dealDesc.trim()
            };

            if (param.userRemark === null || param.userRemark.length <= 0) {
                this.$message({
                   message: '请输入描述',
                   type: 'error'
                });
                return;
            }

            orderSave(param).then(res => {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.status = 'list';
            }).catch(err => {});
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {

                            this.selectItems = row;

                            if (row.orderStatus === 1) {
                                this.status = "deal";
                            } else {
                                this.$message({
                                    message: "请选择未付款项",
                                    type: "error"
                                });
                            }
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                case 'deal':
                    bindData(this, this.$refs.filterDesc);
                    break;
                default:
                    break;
            }
        }
    }
};
