/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import {ManualPayPage} from "./order";
import BaseView from "../../components/common/BaseView";
import {OrderPage} from "../commPages/orderPage";

@Component({name: 'RefundOKOrderView'})
export default class RefundOKOrderView extends BaseView {
    created() {
        this.initialPages([<RefundOKOrderPage />, <ManualPayPage />]);
    }
}

@Component({name: 'RefundOKOrderPage'})
class RefundOKOrderPage extends OrderPage {
    tableActionSearchColumn = [{orderStatus: [3]}];
}

