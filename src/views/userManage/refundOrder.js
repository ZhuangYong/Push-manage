/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import {ManualPayPage} from "./order";
import BaseView from "../../components/common/BaseView";
import {OrderPage} from "../commPages/orderPage";
import {orderRefund, orderSaveExcel} from "../../api/userManage";

@Component({name: 'RefundOrderView'})
export default class RefundOrderView extends BaseView {
    created() {
        this.initialPages([<RefundOrderPage />, <ManualPayPage />]);
    }
}

@Component({name: 'RefundOrderPage'})
class RefundOrderPage extends OrderPage {
    tableCanSelect = true;
    tableActionSearchColumn = [{orderStatus: [6, 8]}];

    topButtonHtml(h) {
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
            } type="primary" icon="edit">导出
            </el-button>
            <el-button class="filter-item" onClick={
                () => {
                    this.dialogVisible = true;
                    this.tipTxt = '确定要退款吗？';
                    this.sureCallbacks = () => {
                        this.dialogVisible = false;
                        const params = {
                            orderNos: this.orderNos,
                        };
                        this.loading = true;
                        orderRefund(params).then(res => {
                            this.loading = false;
                            this.successMsg('退款成功');
                        }).catch(err => this.loading = false);
                    };
                }
            } type="danger" disabled={this.orderNos.length <= 0}>退款
            </el-button>
        </div>;
    }
}

