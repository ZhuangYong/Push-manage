/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editSalePage.js @author: walljack@163.com @date: 18-2-27 下午2:37 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import JPanel from "../../../components/panel/JPanel";
import {rechargeGroupSave} from "../../../api/rechargeCardManage";

@Component({name: "rechargeGroupEditPage", components: {JPanel}})
export default class rechargeGroupEditPage extends BasePage {

    defaultFormData = {
        id: '',
        uuid: '',
        name: '',
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入名称'}
        ],
        uuid: [
            {required: true, message: '请输入控制码'},
            {validator: (rule, value, callback) => {
                    const v = parseInt(value, 10);
                    if (!isNaN(v) && v > 0 && value.length === 4) {
                        callback();
                    } else {
                        callback(new Error('请输入大于0的4位数字'));
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = rechargeGroupSave;

    constructor() {
        super();
    }

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}控制码`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="控制码：" prop="uuid">
                        <el-input value={this.formData.uuid} name="uuid" disabled={this.formData.id !== ''}/>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" rows={2} placeholder="请输入备注" value={this.formData.remark} name='remark'/>
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
