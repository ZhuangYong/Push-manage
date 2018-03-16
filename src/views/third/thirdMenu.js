/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdMenu.js @author: walljack@163.com @date: 18-3-15 上午11:06 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import ThirdMenuPage from "../commPages/thirdMenuPage";
import BasePage from "../../components/common/BasePage";
import JPanel from "../../components/panel/JPanel";
import {edit as editThirdMenu} from "../../api/third";

@Component({name: "salesOrderManageView"})
export default class salesOrderManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditMenuPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends ThirdMenuPage {}


@Component({name: "EditMenuPage", components: {JPanel}})
class EditMenuPage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        url: '',
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入接口名称'}
        ],
        url: [
            {required: true, message: '请输入url'}
        ],
    };

    editFun = editThirdMenu;

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "新增"}接口名称`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="接口名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>

                    <el-form-item label="URL：" prop="url">
                        <el-input value={this.formData.url} name="url"/>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input rows={2} type="textarea" value={this.formData.remark} name="remark"/>
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
