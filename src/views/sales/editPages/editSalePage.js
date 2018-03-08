/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editSalePage.js @author: walljack@163.com @date: 18-2-27 下午2:37 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import JPanel from "../../../components/panel/JPanel";
import {save as saveSales} from "../../../api/sales";
import _ from "lodash";

// 结算类型： 1：手动， 2：自动
const METHOD_TYPE_MANUAL = 1;
const METHOD_TYPE_AUTO = 2;

@Component({name: "EditSalesPage", components: {JPanel}})
export default class EditSalesPage extends BasePage {

    defaultFormData = {
        id: '',
        name: '',
        alipayAccount: '',
        method: METHOD_TYPE_MANUAL,
        cycle: '',
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入销售方名称'}
        ],
        alipayAccount: [
            {required: true, message: '请输入销售方支付账号'},
        ],
        cycle: [
            {required: true, message: '请输入结算周期'},
            {type: 'number', message: '必须为数字值'}
        ],
    };

    editFun = saveSales;

    constructor() {
        super();
    }

    render() {
        return (
            <JPanel title="新增销售方用户">
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
                    <el-form-item label="结算周期：" prop="cycle">
                        <el-col span={4} style="width: 30px;">
                            T+
                        </el-col>
                        <el-col span={20}>
                            <el-input value={this.formData.cycle} name="cycle" number style="width: 100px;"/>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.formData.remark} name='remark'/>
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
