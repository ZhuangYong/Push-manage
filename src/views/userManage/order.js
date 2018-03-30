import {mapGetters} from "vuex";
import Vtable from '../../components/Table/index';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm/index';
import {orderSave} from "../../api/userManage";
import Const from "../../utils/const";

const viewRule = [
    {columnKey: 'headImg', label: '头像', formatter: (r, h) => {
        if (r.headImg) return (<img src={r.headImg} style="height: 30px; margin-top: 6px;"/>);
        return '';
    }, inDetail: true},
    {columnKey: 'nickname', label: '昵称', minWidth: 140, sortable: true},
    {columnKey: 'productName', label: '产品名', minWidth: 120, sortable: true},
    {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 160, sortable: true},
    {columnKey: 'payStatus', label: '付款状态', formatter: r => {
            if (r.payStatus === 1) return '创建';
            if (r.payStatus === 2) return '已完成';
        }},
    {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
            if (r.orderStatus === 1) return '未付款';
            if (r.orderStatus === 2) return '已付款';
        }},
    {columnKey: 'payType', label: '支付方式', formatter: r => {
        if (r.payType === 1) return '支付宝';
        if (r.payType === 2) return '微信';
    }},
    {columnKey: 'orderNo', label: '订单号', minWidth: 280, inDetail: true},
    {columnKey: 'deviceId', label: '设备编号', minWidth: 280, inDetail: true},
    {columnKey: 'channelName', label: '机型名称', minWidth: 110},
    {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170, sortable: true},
    {columnKey: 'transactionid', label: '支付流水号', minWidth: 170, inDetail: true},
    {label: '操作', buttons: [{label: '手动支付', type: 'edit'}], minWidth: 100}
];
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            pageActionSearch: [
                {
                    column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
                },
                {column: 'orderNo', label: '请输入订单号', type: 'input', value: ''},
                {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
                {column: 'productName', label: '请输入产品名', type: 'input', value: ''},
                {
                    column: 'payType', label: '请选择付款方式', type: 'option', value: '', options: [
                        {value: 1, label: '支付宝'},
                        {value: 2, label: '微信'},
                    ]
                },
                {
                    column: 'payStatus', label: '请选择付款状态', type: 'option', value: '', options: [
                    {value: 1, label: '创建'},
                    {value: 2, label: '完成'},
                ]
                },
                {
                    column: 'startTime,endTime', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption
                }
            ],
            showSummary: (row) => {
                const { columns, data } = row;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '汇总';
                        return;
                    }
                    if (column.property !== "dealPrice") {
                        sums[index] = 'N/A';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' 元';
                    } else {
                        sums[index] = 'N/A';
                    }
                });

                return sums;
            },
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            filter: {
                dealDesc: null
            }
        };
    },
    computed: {
        ...mapGetters(['userManage', 'system'])
    },
    watch: {
        optionsChannel: function() {
            if (this.pageActionSearch[0].options.length === 0) {
                this.optionsChannel.map(i => this.pageActionSearch[0].options.push({label: i.name, value: i.code}));
            }
        }
    },
    created() {
        this.loading = true;
        this.refreshChanel();
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
        if (this.system.funChannelList && this.pageActionSearch[0].options.length === 0) {
            this.system.funChannelList.map(f => {
                this.pageActionSearch[0].options.push({value: f.code, label: f.name});
            });
        }
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>

                {this.status === 'list' ? <Vtable ref="Vtable" pageAction={'order/RefreshPage'} data={this.userManage.orderPage} pageActionSearch={this.pageActionSearch}
                        defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule} showSummary={this.showSummary}/> : this.cruHtml(h)}

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
                    <el-input rows={2} type="textarea" value={this.filter.dealDesc} name="dealDesc"/>
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
        },

        refreshChanel() {
            this.loading = true;
            this.$store.dispatch("fun/chanelList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

    }
};
