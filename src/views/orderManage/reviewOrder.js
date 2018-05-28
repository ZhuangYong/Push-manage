/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {OrderPage} from "../commPages/orderPage";
import {orderReview} from "../../api/userManage";

@Component({name: 'ReviewOrderView'})
export default class ReviewOrderView extends BaseView {
    created() {
        this.initialPages([<ReviewOrderPage />]);
    }
}

@Component({name: 'ReviewOrderPage'})
class ReviewOrderPage extends OrderPage {
    tableCanSelect = true;
    tableActionSearchColumn = [{orderStatus: [7]}];


    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={() => this.handelReviewBtn(8)} type="danger" disabled={this.orderNos.length <= 0}>审核通过</el-button>
            <el-button class="filter-item" onClick={() => this.handelReviewBtn(9)} type="danger" disabled={this.orderNos.length <= 0}>审核不通过</el-button>
        </div>;
    }

    handelReviewBtn(status) {
        this.dialogVisible = true;
        this.tipTxt = status === 8 ? '确定要审核通过吗？' : '确定要审核不通过吗';
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            const params = {
                orderNos: this.orderNos,
                status: status,
            };
            this.loading = true;
            orderReview(params).then(res => {
                this.loading = false;
                this.successMsg('操作成功');
            }).catch(err => this.oading = false);
        };
    }
}

