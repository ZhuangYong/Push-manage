/**
 * Created by Zed on 2018/5/21.
 */
import {Component} from 'vue-property-decorator';
import {State} from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";
import {orderSave, orderSaveExcel} from "../../api/userManage";
import JPanel from "../../components/panel/JPanel";
import {OrderPage} from "../commPages/orderPage";


@Component({name: 'OrderView'})
export default class OrderView extends BaseView {
    created() {
        this.initialPages([<OrderListPage />, <ManualPayPage />]);
    }
}

@Component({name: 'OrderListPage'})
class OrderListPage extends OrderPage {
    created() {
        this.viewRule.push({label: '操作', buttons: [{label: '手动支付', type: 'manualPay', condition: r => r.orderStatus === 1}], minWidth: 100});
    }

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
            <div style="padding: 6px; 0 0 12px;">
                订单总金额: {this.tableData.allPrice || 0} 元
            </div>
        </div>;
    }
}

@Component({name: 'ManualPayPage'})
export class ManualPayPage extends BasePage {
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
