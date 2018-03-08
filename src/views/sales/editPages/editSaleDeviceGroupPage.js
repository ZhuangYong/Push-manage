/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editSaleDeviceGroupPage.js @author: walljack@163.com @date: 18-3-1 下午2:26 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {save as saveSalesGroup} from "../../../api/salesGroup";
import JPanel from "../../../components/panel/JPanel";

@Component({name: "EditSaleDeviceGroupPage", components: {JPanel}})
export default class EditSaleDeviceGroupPage extends BasePage {

    defaultFormData = {
        id: '',
        name: '',
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入设备分组名称'}
        ],
    };

    editFun = saveSalesGroup;

    constructor() {
        super();
    }

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}设备分组`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="设备分组名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.formData.remark} name='remark'/>
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
