/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdOrder.js @author: walljack@163.com @date: 18-3-23 下午4:10 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import JPanel from "../../components/panel/JPanel";
import {sendOrder} from "../../api/third";
import ThirdOrderPage from "../commPages/thirdOrderPage";

@Component({name: "salesOrderManageView"})
export default class salesOrderManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <SendMsgPage/>, <ChooseThirdOrderPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends ThirdOrderPage {
    tableCanSelect = true;
    orderNos = [];

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    // this.goPage("SendMsgPage");
                    console.log(this.orderNos);
                    this.dialogVisible = true;
                    this.tipTxt = '确定发送？';
                    this.sureCallbacks = () => {
                        this.dialogVisible = false;
                        this.submitLoading = true;
                        sendOrder({orderNos: this.orderNos}).then(res => {
                            this.submitLoading = false;
                            this.successMsg('操作成功');
                            this.refreshTable();
                        }).catch(err => {
                            this.submitLoading = false;
                            this.failMsg('操作失败');
                        });
                    };
                }
            } type="primary" icon="edit" disabled={this.orderNos.length <= 0}>
                发送订单
            </el-button>
        </div>;
    }

    handleSelectionChange(selectedItems) {
        this.orderNos = [];
        selectedItems.map(selctedItem => this.orderNos.push(selctedItem.orderNo));
    }
}


@Component({name: "SendMsgPage", components: {JPanel}})
class SendMsgPage extends BasePage {
    defaultFormData = {
        orderNos: [],
        productNames: []
    };
    validateRule = {
        orderNos: [
            {required: true, message: '请选择订单'}
        ],
    };

    editFun = sendOrder;

    render() {
        return (
            <JPanel title={`发送消息`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="选择订单：" prop="orderNos">
                        {
                            this.formData.orderNos.length ? this.formData.orderNos.map((n, i) => {
                                return <el-tag key="tag" closable disable-transitions={false} onClose={() => {
                                    this.formData.orderNos = this.formData.orderNos.filter(m => m !== n);
                                }}>
                                    {this.formData.productNames[i]}
                                </el-tag>;
                        }) : <el-button type="primary" onClick={f => {
                                this.goPage("ChooseThirdOrderPage");
                            }}>点击选择</el-button>
                        }
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>发送</el-button>
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }
}

@Component({name: "ChooseThirdOrderPage"})
class ChooseThirdOrderPage extends ThirdOrderPage {
    tableCanSelect = true;
    orderNos = [];
    productNames = [];

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
            <el-button class="filter-item" disabled={!this.orderNos.length} onClick={this.submitSaveDevices} type="primary">
                选定
            </el-button>
        </div>;
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveDevices() {
        this.changePrePageData({
            orderNos: this.orderNos,
            productNames: this.productNames
        });
        this.pageBack();
    }

    handleSelectionChange(selectedItems) {
        this.formData.deviceUuids = [];
        if (selectedItems.length > 0) {
            let orderNos = [];
            let productNames = [];
            selectedItems.map(s => {
                orderNos.push(s.orderNo);
                productNames.push(s.productName);
            });
            this.orderNos = orderNos;
            this.productNames = productNames;
        } else {
            this.orderNos = [];
            this.productNames = [];
        }
    }
}
