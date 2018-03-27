/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editSaleDeviceGroupPage.js @author: walljack@163.com @date: 18-3-1 下午2:26 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {save as saveSalesGroup} from "../../../api/salesGroup";
import JPanel from "../../../components/panel/JPanel";
import {vipGroupList} from "../../../api/channel";
import {validatFloat} from "../../../utils/validate";

@Component({name: "EditSaleDeviceGroupPage", components: {JPanel}})
export default class EditSaleDeviceGroupPage extends BasePage {

    vipGroupOptionList = [];

    defaultFormData = {
        id: '',
        name: '',
        remark: '',
        vipGroupUuid: '',
        salesUuid: '',
        salesName: '',
        shareVipGroupUuid: '',
        parentProportions: '',
        isCopy: 2,
    };
    validateRule = {
        salesUuid: [
            {required: true, message: '请选择销售方'}
        ],
        name: [
            {required: true, message: '请输入设备分组名称'}
        ],
        parentProportions: [
            {required: true, message: '请输入结算比例设置'},
            {validator: (rule, value, callback) => {
                    const v = parseFloat(value);
                    if (!validatFloat(value)) {
                        callback(new Error('请输入最多两位小数的数字'));
                    } else if (value > 100) {
                        callback(new Error('比例不能大于100'));
                    } else {
                        callback();
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = saveSalesGroup;

    constructor() {
        super();
    }

    created() {
        vipGroupList().then(res => {
            this.vipGroupOptionList = res;
        }).catch(err => {});
    }

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}设备分组`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="销售方用户：" prop="salesUuid">
                        {
                            this.formData.salesUuid ? <el-tag key="tag" closable disable-transitions={false} onClose={f => this.formData.salesUuid = this.formData.salesName = null}>
                                {this.formData.salesName}
                            </el-tag> : <el-button type="primary" onClick={f => {
                                this.goPage("ChooseSalesPage");
                            }}>点击选择</el-button>
                        }
                    </el-form-item>

                    <el-form-item label="设备分组名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
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

                    <el-form-item label="结算比例配置（%）：" prop="parentProportions">
                        <el-input value={this.formData.parentProportions} placeholder="请输入百分比数字，保留两位小数" name="parentProportions"/>
                        <p style="color: red">
                            *提示：该比例为销售方所得比例
                        </p>
                    </el-form-item>
                    {
                        !this.formData.id && <el-form-item label="是否复制：" prop="isCopy">
                            <el-radio-group value={this.formData.isCopy} name="isCopy">
                                <el-radio value={1} label={1}>是</el-radio>
                                <el-radio value={2} label={2}>否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    }

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
