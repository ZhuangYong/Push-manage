/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editSalePage.js @author: walljack@163.com @date: 18-2-27 下午2:37 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import JPanel from "../../../components/panel/JPanel";
import {save as saveSales} from "../../../api/sales";
import _ from "lodash";
import {vipGroupList} from "../../../api/channel";
import {validatFloat} from "../../../utils/validate";

// 结算类型： 1：手动， 2：自动
const METHOD_TYPE_MANUAL = 1;
const METHOD_TYPE_AUTO = 2;

@Component({name: "EditSalesPage", components: {JPanel}})
export default class EditSalesPage extends BasePage {
    vipGroupOptionList = [];
    defaultFormData = {
        id: '',
        name: '',
        alipayAccount: '',
        method: METHOD_TYPE_MANUAL,
        type: 1,
        cycle: '',
        remark: '',
        vipGroupUuid: '',
        sendOrderUrl: "",
        secretkey: "",
        shareVipGroupUuid: '',
        parentProportions: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入销售方名称'}
        ],
        alipayAccount: [
            // {required: true, message: '请输入销售方支付账号'},
        ],
        cycle: [
            // {required: true, message: '请输入结算周期'},
            {type: 'number', message: '必须为数字值'}
        ],
        parentProportions: [
            {required: true, message: '请输入结算比例设置'},
            {validator: (rule, value, callback) => {
                    const v = parseFloat(value);
                    if (parseInt(v, 10) === 0) {
                        callback();
                    } else if (!validatFloat(value)) {
                        callback(new Error('请输入最多两位小数的数字'));
                    } else if (value > 100) {
                        callback(new Error('比例不能大于100'));
                    } else {
                        callback();
                    }
                }, trigger: 'blur'},
        ],
        vipGroupUuid: [
            {required: true, message: '请选择产品包'}
        ],
        shareVipGroupUuid: [
            {required: true, message: '请选择产品包'}
        ],
    };

    editFun = saveSales;

    created() {
        vipGroupList().then(res => {
            this.vipGroupOptionList = res;
        }).catch(err => {});
    }

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}销售方用户`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="销售方名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="销售方支付账号：" prop="alipayAccount">
                        <el-input value={this.formData.alipayAccount} name="alipayAccount"/>
                    </el-form-item>
                    <el-form-item label="结算方式：">
                        <el-radio-group value={this.formData.method || 1} name="method">
                            <el-radio disabled value={METHOD_TYPE_MANUAL} label={METHOD_TYPE_MANUAL}>手动</el-radio>
                            <el-radio disabled value={METHOD_TYPE_AUTO} label={METHOD_TYPE_AUTO}>自动</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="结算比例配置（%）：" prop="parentProportions">
                        <el-input value={this.formData.parentProportions} placeholder="请输入百分比数字，保留两位小数" name="parentProportions"/>
                        <p style="color: red">
                            *提示：该比例为销售方所得比例
                        </p>
                    </el-form-item>
                    {/*<el-form-item label="结算周期：" prop="cycle" v-show={false}>*/}
                        {/*<el-col span={4} style="width: 30px;">*/}
                            {/*T+*/}
                        {/*</el-col>*/}
                        {/*<el-col span={6} style="width: 130px;">*/}
                            {/*<el-input value={this.formData.cycle} name="cycle" number style="width: 100px;"/>*/}
                        {/*</el-col>*/}
                    {/*</el-form-item>*/}
                    <el-form-item label="方式：">
                        <el-radio-group value={this.formData.type || 1} name="type">
                            <el-radio value={1} label={1}>直推</el-radio>
                            <el-radio value={2} label={2}>买断</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="产品包选择" prop="vipGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.vipGroupUuid} onHandleOptionClick={f => this.formData.vipGroupUuid = f.value}>
                            <el-option label="无" value="" key="vipGroupUuid"/>
                            {this.vipGroupOptionList.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item label="会员产品包选择" prop="shareVipGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.shareVipGroupUuid} onHandleOptionClick={f => this.formData.shareVipGroupUuid = f.value}>
                            <el-option label="无" value="" key="vipGroupUuid"/>
                            {this.vipGroupOptionList.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发送订单链接" prop="sendOrderUrl">
                        <el-input value={this.formData.sendOrderUrl} placeholder="http://........" name="sendOrderUrl"/>
                    </el-form-item>
                    <el-form-item label="密钥" prop="secretkey">
                        <el-input value={this.formData.secretkey} placeholder="" name="secretkey"/>
                    </el-form-item>
                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="备注信息" value={this.formData.remark} name='remark'/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            if (_.isEmpty(this.formData.method)) this.formData.method = METHOD_TYPE_MANUAL;
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
