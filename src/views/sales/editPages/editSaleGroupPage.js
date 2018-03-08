/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editSaleGroupPage.js @author: walljack@163.com @date: 18-2-27 下午2:43 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {saveGroup} from "../../../api/sales";
import SalesGroupPage from "../../commPages/salesGroupPage";
import {checkChannelCodeUnique} from "../../../api/channel";
import {validatFloat} from "../../../utils/validate";

@Component({name: "EditSaleGroupPage"})
export default class EditSaleGroupPage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        parentProportions: '',
        groupName: '',
        groupUuid: ''
    };
    validateRule = {
        name: [
            {required: true, message: '请输入分组名称'}
        ],
        parentProportions: [
            {required: true, message: '请输入结算比例设置'},
            {validator: (rule, value, callback) => {
                const v = parseFloat(value);
                if (!validatFloat(value)) {
                    callback(new Error('请输入最多两位小数的数字'));
                } else {
                    callback();
                }
            }, trigger: 'blur'},
        ],
    };

    editFun = saveGroup;

    render() {
        return (
            <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                {
                    this.formData.id ? <el-form-item label="分组名称：">
                        {this.formData.groupName}
                    </el-form-item> : <el-form-item label="分组名称：" prop={this.formData.id ? "" : "groupUuid"}>
                        {
                            this.formData.groupUuid ? <el-tag key="tag" closable disable-transitions={false} onClose={f => this.selectItem = null}>
                                {this.formData.groupName}
                            </el-tag> : <el-button type="primary" onClick={f => {
                                this.goPage("ChooseGroupPage");
                            }}>点击选择</el-button>
                        }
                    </el-form-item>
                }

                <el-form-item label="结算比例配置（%）：" prop="parentProportions">
                    <el-input value={this.formData.parentProportions} placeholder="请输入百分比数字，保留两位小数" name="parentProportions"/>
                    <p style="color: red">
                        *提示：该比例为销售方所得比例
                    </p>
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
        );
    }
}
