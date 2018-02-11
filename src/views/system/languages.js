/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: languages.js @author: walljack@163.com @date: 18-2-11 下午2:35 @version: 1.0
 */
import BasePage from "../../components/common/BasePage";
import {Component} from "vue-property-decorator";
import {State} from "vuex-class";
import {save as editLanguage} from "../../api/language";
import BaseView from "../../components/common/BaseView";

@Component({name: "LanguageView"})
export default class LanguageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditLanguagePage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'system/language/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '语言名称', minWidth: 120, sortable: true},
        {columnKey: 'language', label: '语言值', minWidth: 120, sortable: true},
        {columnKey: 'updateName', label: '更新者', inDetail: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, inDetail: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
    ];

    @State(state => state.system.languagePage) tableData;

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditLanguagePage");
                }
            } type="primary" icon="edit">
                添加
            </el-button>
        </div>;
    }
}

@Component({name: "EditLanguagePage"})
class EditLanguagePage extends BasePage {
    editFun = editLanguage;
    defaultFormData = {
        name: '',
        language: ''
    };
    validateRule = {
        name: [
            {required: true, message: '请输入名称'}
        ],
        language: [
            {required: true, message: '请输入语言值'},
        ],
    };

    render() {
        return <el-form class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
            <el-form-item label="语言名称：" prop="name">
                <el-input value={this.formData.name} name="name"/>
            </el-form-item>
            <el-form-item label="语言值：" prop="language">
                <el-input value={this.formData.language} name="language"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" onClick={() => {
                    this.submitAddOrUpdate(() => {
                        this.pageBack();
                    });
                }}>提交
                </el-button>
                <el-button onClick={this.pageBack}>取消
                </el-button>
            </el-form-item>
        </el-form>;
    }
}
