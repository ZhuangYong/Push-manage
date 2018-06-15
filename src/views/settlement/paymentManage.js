/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: paymentManage.js @author: walljack@163.com @date: 18-3-8 上午11:18 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import JSelect from "../../components/select/select";
import Const from "../../utils/const";
import {payMentPage, savePayMent} from "../../api/payment";
import _ from "lodash";
import {searchDeviceGroupBySalesUUID, searchSalesAndDeviceGroup} from "../../api/sales";
import {Watch} from "vue-property-decorator/lib/vue-property-decorator";
import {validatFloat} from "../../utils/validate";
import JPanel from "../../components/panel/JPanel";
import TreeSelect from "../../components/select/treeSelect";


// @Component({name: "SettlementManageView"})
// export default class SettlementManageView extends BaseView {
//     created() {
//         this.initialPages([<IndexPage/>]);
//     }
// }

@Component({
    name: "SettlementManagePage",
    components: {
        JSelect,
        JPanel
    }
})
export default class SettlementManagePage extends BasePage {

    deviceGroup = [];
    salesUuid = "";
    salesList = [];

    effectTime = [];
    form = {
        allAmount: "",
        amount: "",
        salesUuid: "",
        startTime: "",
        endTime: "",
        groupUuids: [],
        type: 1,
    };

    validateRule = {
        salesUuid: [
            {required: true, message: '请选择销售方'}
        ],
        groupUuids: [
            // {required: true, message: '请选择设备组'}
        ],
        amount: [
            {required: true, message: '请输入结算金额'},
            {validator: (rule, value, callback) => {
                    const v = parseFloat(value);
                    if (!validatFloat(value)) {
                        callback(new Error('请输入最多两位小数的数字'));
                    } if (value < 0.1) {
                        callback(new Error('不得小于0.1元'));
                    } if (value > this.form.allAmount) {
                        callback(new Error('不能大于可结算金额'));
                    } else {
                        callback();
                    }
                }, trigger: 'blur'},
        ],
    };

    addFun = savePayMent;

    @Watch('salesUuid', {immediate: true, deep: true})
    onSalesUuidChange() {
        this.refreshDeviceGroup();
    }

    created() {
        this.refreshChanel();
        const now = new Date();
        this.effectTime = [new Date(now.getFullYear(), (now.getMonth() - 1), now.getDate()), now];
    }

    render(h) {
        return (
            <JPanel>
                <el-form class="small-space" model={this.form} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="销售方：" prop="salesUuid">
                        {/*<JSelect placeholder="请选择销售方" emptyLabel="所有" vModel="salesUuid" options={this.salesList.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} handelSelectChange={f => {
                            this.salesUuid = f;
                            this.form.groupUuids = [];
                            this.handelSearch();
                        }}/>*/}
                        <TreeSelect placeHolder="请选择销售方" treeData={this.salesList} multiple={false} handelNodeClick={d => {
                            this.form.salesUuid = d.uuid;
                            this.salesUuid = this.form.salesUuid;
                            this.form.groupUuids = [];
                            this.handelSearch();
                        }}/>
                    </el-form-item>

                    <el-form-item label="设备组：" prop="groupUuids">
                        <JSelect placeholder="请选择设备组" emptyLabel="所有" vModel="groupUuids" options={this.deviceGroup.map(i => {
                            return {label: i.name, value: i.uuid};
                        })} multiple handelSelectChange={this.handelSearch}/>
                    </el-form-item>

                    <el-form-item label="时间段：">
                        <el-date-picker
                            style="max-width: 300px;"
                            type="daterange"
                            picker-options={Const.dataRangerOption}
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            value={this.effectTime}
                            onInput={v => {
                                this.effectTime = v || [];
                                this.handelSearch();
                            }}
                            align="left">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结算类型：" prop="type">
                        <el-radio-group value={this.form.type} name="type">
                            <el-radio value={1} label={1}>线下结算</el-radio>
                            <el-radio value={2} label={2}>线上结算</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="可结算金额（元）：">
                        {this.form.allAmount || '0.00'}
                    </el-form-item>
                    <el-form-item label="结算金额（元）：" prop="amount">
                        <el-input placeholder="不得小于0.1元" value={this.form.amount} name='amount'/>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.form.remark} name='remark'/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            const _formData = _.cloneDeep(this.form);
                            delete _formData.allAmount;
                            this.formData = _formData;
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

    handelSearch() {
        let param = {};
        if (!_.isEmpty(this.form.salesUuid)) param.salesUuid = this.form.salesUuid;
        if (!_.isEmpty(this.form.groupUuids)) param.groupUuids = this.form.groupUuids;
        if (!_.isEmpty(this.effectTime)) {
            const startTime = this.effectTime[0];
            const endTime = this.effectTime[1];
            param.startTime = startTime;
            param.endTime = endTime;
            this.form.startTime = startTime;
            this.form.endTime = endTime;
        } else {
            this.form.startTime = "";
            this.form.endTime = "";
        }
        payMentPage(param).then(res => {
            this.form.allAmount = res.amount;
        });
    }

    async refreshChanel() {
        this.loading = true;
        await searchSalesAndDeviceGroup().then(res => {
            this.salesList = res;
        });
        this.loading = false;
    }

    refreshDeviceGroup() {
        if (_.isEmpty(this.salesUuid)) {
            this.deviceGroup = [];
            return;
        }
        this.loading = true;
        searchDeviceGroupBySalesUUID({salesUuids: [this.salesUuid]}).then(res => {
            this.deviceGroup = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}

