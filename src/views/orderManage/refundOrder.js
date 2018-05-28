/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {OrderPage} from "../commPages/orderPage";
import {orderRefund} from "../../api/userManage";

@Component({name: 'RefundOrderView'})
export default class RefundOrderView extends BaseView {
    created() {
        this.initialPages([<RefundOrderPage />]);
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

