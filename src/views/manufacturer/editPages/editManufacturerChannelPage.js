/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editManufacturerChannelPage.js @author: walljack@163.com @date: 18-2-27 下午4:09 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {saveChannel} from "../../../api/manufacturer";

@Component({name: "EditManufacturerChannelPage"})
export default class EditManufacturerChannelPage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        parentProportions: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入分组名称'}
        ],
        parentProportions: [
            {required: true, message: '请输入结算比例设置'},
        ],
    };

    editFun = saveChannel;

    render() {
        return (
            <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                <el-form-item label="分组名称：" prop={this.formData.id ? "" : "name"}>
                    {
                        this.formData.id ? this.formData.name : <el-input value={this.formData.name} name="name"/>
                    }
                </el-form-item>
                <el-form-item label="结算比例配置（%）：" prop="parentProportions">
                    <el-input value={this.formData.parentProportions} name="parentProportions"/>
                    *提示：该比例为销售方所得比例
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
