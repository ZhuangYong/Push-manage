/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {orderApplyRefund, orderSave, orderSaveExcel} from "../../api/userManage";
import JPanel from "../../components/panel/JPanel";
import {OrderPage} from "../commPages/orderPage";
import {searchSalesAndDeviceGroup} from "../../api/sales";
import Const from "../../utils/const";


@Component({name: 'OrderView'})
export default class OrderView extends BaseView {
    created() {
        this.initialPages([<OrderListPage />, <RefundPage />]);
    }
}

@Component({name: 'OrderListPage'})
class OrderListPage extends OrderPage {
    exportFormData = {};
    viewRule = [
        {columnKey: 'headImg', label: '头像', formatter: (r, h) => {
                if (r.headImg) return (<img src={r.headImg} style="height: 30px; margin-top: 6px;"/>);
                return '';
            }, inDetail: true},
        {columnKey: 'nickname', label: '昵称', minWidth: 140, sortable: true},
        {columnKey: 'productName', label: '产品名', minWidth: 120, sortable: true},
        {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 160, sortable: true},
        {columnKey: 'payStatus', label: '付款状态', formatter: r => {
                if (r.payStatus === 1) return '未付款';
                if (r.payStatus === 2) return '已付款';
            }},
        // 1-待付款，2-已付款，3-已退款，4-订单出错，5：退款中，6：退款失败，7：审核中，8：审核通过，9：审核失败
        {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
                if (r.orderStatus === 1) return '未付款';
                if (r.orderStatus === 2) return '已付款';
                if (r.orderStatus === 3) return '已退款';
                if (r.orderStatus === 4) return '订单出错';
                if (r.orderStatus === 5) return '退款中';
                if (r.orderStatus === 6) return '退款失败';
                if (r.orderStatus === 7) return '审核中';
                if (r.orderStatus === 8) return '审核通过';
                if (r.orderStatus === 9) return '审核失败';
            }},
        {columnKey: 'payType', label: '支付方式', formatter: r => {
                if (r.payType === 1) return '支付宝';
                if (r.payType === 2) return '微信';
            }},
        {columnKey: 'orderNo', label: '订单号', minWidth: 280, inDetail: true},
        {columnKey: 'deviceId', label: '设备编号', minWidth: 280, inDetail: true},
        {columnKey: 'channelName', label: '机型名称', minWidth: 110},
        {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170, sortable: true},
        {columnKey: 'transactionId', label: '支付流水号', minWidth: 170, inDetail: true},
        {label: '操作', buttons: [{label: '申请退款', type: 'refund', condition: r => r.orderStatus === 2}], minWidth: 100},
    ];
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
        },
        {
            column: 'notChannelCodes', label: '请选择不包含的机型', type: 'option', multiple: true, value: '', options: []
        },
        {
            column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []
        },
        {
            column: 'orderStatu', label: '请选择订单状态', type: 'option', value: '', options: [
                {value: 1, label: '未付款'},
                {value: 2, label: '已付款'},
                {value: 3, label: '已退款'},
                {value: 4, label: '订单出错'},
                {value: 5, label: '退款中'},
                {value: 6, label: '退款失败'},
                {value: 7, label: '审核中'},
                {value: 8, label: '审核通过'},
                {value: 9, label: '审核失败'},
            ]
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
    ];

    created() {
        this.tableActionSearch.map(i => i.handelChange = this.tableActionSearchHandelChange);

        this.refreshSalesChanel();
    }

    topButtonHtml(h) {
        const {startTime, endTime} = this.exportFormData;
        const dayRange = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60 * 24);

        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.loading = true;
                    orderSaveExcel(this.exportFormData).then(res => {
                        this.loading = false;
                        window.location.href = res;
                        this.successMsg('即将开始下载。。。');
                    }).catch(err => this.loading = false);
                }
            } type="primary" icon="edit" disabled={!(!dayRange || dayRange <= 31)}>导出</el-button>
            <div style={{fontSize: '12px', color: 'red'}}>（*默认导出一周内数据，最多导出31天内数据!）</div>
            <div style="padding: 6px; 0 0 12px;">
                订单总金额: {this.tableData.allPrice || 0} 元
            </div>
        </div>;
    }

    tableActionSearchHandelChange(v) {
        // console.log(v);
        this.exportFormData = {};
        v.map(o => {
            const {column, value} = o;
            if (column.indexOf(",") > 0) {
                const columns = column.split(",");
                columns.map((c, i) => {
                    if (value[i]) this.exportFormData[c] = value[i];
                });
            } else {
                if (value) this.exportFormData[column] = value;
            }
        });
    }

    handelRefund(row) {
        this.goPage('RefundPage', {formData: {id: row.id}});
    }

    handelManualPay(row) {
        this.goPage('ManualPayPage', {formData: row});
    }

    refreshChanel() {
        this.loading = true;
        this.$store.dispatch("fun/chanelList").then(res => {
            this.loading = false;
            this.tableActionSearch[0].options = [];
            res.map(f => this.tableActionSearch[0].options.push({value: f.code, label: `${f.name}(${f.code})`}));
            this.tableActionSearch[1].options = [];
            res.map(f => this.tableActionSearch[1].options.push({value: f.code, label: `${f.name}(${f.code})`}));
        }).catch(err => {
            this.loading = false;
        });
    }

    refreshSalesChanel() {
        this.loading = true;
        searchSalesAndDeviceGroup().then(res => {
            this.tableActionSearch[2].options = [];
            res.map(i => this.tableActionSearch[2].options.push(i));
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}

@Component({name: 'RefundPage'})
class RefundPage extends BasePage {
    defaultFormData = {
        refundReason: '',
    };

    validateRule = {
        refundReason: [
            {required: true, message: '请输入退款理由'}
        ],
    };

    editFun = orderApplyRefund;

    render() {
        return (
            <JPanel title={`申请退款`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="退款理由：" props="refundReason">
                        <el-input type="textarea" rows={2} placeholder="请输入退款理由" value={this.formData.refundReason} name='refundReason'/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }
}

@Component({name: 'ManualPayPage'})
class ManualPayPage extends BasePage {
    defaultFormData = {
        userRemark: '',
    };

    editFun = orderSave;

    render() {
        return (
            <JPanel title={`手动支付订单`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="描述：" props="userRemark">
                        <el-input type="textarea" rows={2} placeholder="请输入描述文字" value={this.formData.userRemark} name='userRemark'/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }
}
