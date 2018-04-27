/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editManufacturerChannelPage.js @author: walljack@163.com @date: 18-2-27 下午4:09 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {saveChannel} from "../../../api/manufacturer";
import {validatFloat} from "../../../utils/validate";
import JPanel from "../../../components/panel/JPanel";

@Component({name: "EditManufacturerChannelPage", components: {JPanel}})
export default class EditManufacturerChannelPage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        parentProportions: '',
        manufacturerUuid: '',
        channelNames: [],
        channelCodes: []
    };
    validateRule = {
        channelCodes: [
            {required: true, message: '请选择机型'}
        ],
        parentProportions: [
            {required: true, message: '请输入结算比例设置'},
            {validator: (rule, value, callback) => {
                    const v = parseFloat(value);
                    if (value !== 0 && value !== '0' && !validatFloat(value)) {
                        callback(new Error('请输入最多两位小数的数字'));
                    } else if (value > 100) {
                        callback(new Error('比例不能大于100'));
                    } else {
                        callback();
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = saveChannel;

    render() {
        return (
            <JPanel title={`${this.formData.id ? "结算设置" : "新增分组列表"}`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    {
                        this.formData.id ? <el-form-item label="机型：">
                            {this.formData.channelName}
                        </el-form-item> : <el-form-item label="机型：" prop={this.formData.id ? "" : "channelCodes"}>
                            {
                                this.formData.channelCodes.length ? this.formData.channelCodes.map((c, i) => <el-tag key="tag" closable disable-transitions={false} onClose={f => this.formData.channelCodes = this.formData.channelCodes.filter(t => t !== c)}>
                                    {this.formData.channelNames[i]}
                                </el-tag>) : <el-button type="primary" onClick={f => {
                                    this.goPage("ChooseGroupPage");
                                }}>点击选择</el-button>
                            }
                        </el-form-item>
                    }

                    {/*<el-form-item label="结算比例配置（%）：" prop="parentProportions">
                        <el-input value={this.formData.parentProportions} placeholder="请输入百分比数字，保留两位小数" name="parentProportions"/>
                        <p style="color: red">
                            *提示：该比例为销售方所得比例
                        </p>
                    </el-form-item>*/}
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
