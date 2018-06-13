/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {orderApplyRefund, orderSave, orderSaveExcel} from "../../api/userManage";
import JPanel from "../../components/panel/JPanel";
import OrderPage from "../commPages/orderPage";
import {searchSalesAndDeviceGroup} from "../../api/sales";
import Const from "../../utils/const";


@Component({name: 'OrderView'})
export default class OrderView extends BaseView {
    created() {
        this.initialPages([<OrderListPage />, <RefundPage />]);
    }
}

@Component({name: 'OrderListPage'})
export class OrderListPage extends OrderPage {
    exportFormData = {};
    operateViewRule = [
        {label: '操作', buttons: [{label: '申请退款', type: 'refund', condition: r => r.orderStatus === 2}], minWidth: 100},
    ];
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: [], handelChange: this.tableActionSearchHandelChange
        },
        {
            column: 'notChannelCodes', label: '请选择不包含的机型', type: 'option', multiple: true, value: '', options: [], handelChange: this.tableActionSearchHandelChange
        },
        {
            column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: [], handelChange: this.tableActionSearchHandelChange
        },
        // {
        //     column: 'gxggk', label: '是否包含共享K1机型', type: 'option', value: 2, options: [
        //         {value: 1, label: '包含共享K1机型'},
        //         {value: 2, label: '不包含共享K1机型'},
        //     ]
        // },
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
            ], handelChange: this.tableActionSearchHandelChange
        },
        {column: 'orderNo', label: '请输入订单号', type: 'input', value: '', handelChange: this.tableActionSearchHandelChange},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: '', handelChange: this.tableActionSearchHandelChange},
        {column: 'productName', label: '请输入产品名', type: 'input', value: '', handelChange: this.tableActionSearchHandelChange},
        {
            column: 'productType', label: '请选择产品类型', type: 'option', value: '', options: [
                {value: 1, label: 'VIP会员'},
                {value: 2, label: '共享'},
            ], handelChange: this.tableActionSearchHandelChange
        },
        {
            column: 'payType', label: '请选择付款方式', type: 'option', value: '', options: [
                {value: 1, label: '支付宝'},
                {value: 2, label: '微信'},
            ], handelChange: this.tableActionSearchHandelChange
        },
        {
            column: 'payStatus', label: '请选择付款状态', type: 'option', value: '', options: [
                {value: 1, label: '创建'},
                {value: 2, label: '完成'},
            ], handelChange: this.tableActionSearchHandelChange
        },
        {
            column: 'isOpen', label: '请选择开票状态', type: 'option', value: '', options: [
                {value: 0, label: '未开票'},
                {value: 1, label: '已开票'},
                {value: 2, label: '开票中'},
                {value: 3, label: '开票失败'},
            ], handelChange: this.tableActionSearchHandelChange
        },
        {
            column: 'startTime,endTime', label: '请选择时间', type: 'daterange', value: '', option: Const.dataRangerOption, handelChange: this.tableActionSearchHandelChange
        }
    ];

    created() {
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

    handelRefund(row) {
        this.goPage('RefundPage', {formData: {id: row.id}});
    }

    handelManualPay(row) {
        this.goPage('ManualPayPage', {formData: row});
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
