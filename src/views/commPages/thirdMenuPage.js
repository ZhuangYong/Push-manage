/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdMenuPage.js @author: walljack@163.com @date: 18-3-15 下午6:01 @version: 1.0
 */


import {del as delThirdMenu} from "../../api/third";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class";

@Component({name: "ThirdMenuPage"})
export default class ThirdMenuPage extends BasePage {
    tableAction = 'third/api/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '接口名称', minWidth: 90},
        {columnKey: 'url', label: 'URL', minWidth: 120},
        {columnKey: 'uuid', label: 'UUID', minWidth: 120},
        {columnKey: 'remark', label: '备注', minWidth: 140},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}], minWidth: 176}
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入接口名称', type: 'input', value: ''},
    ];

    delItemFun = delThirdMenu;

    @State(state => state.third.thirdApiPage) tableData;

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
                    this.goPage("EditMenuPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditMenuPage", {formData: row});
    }
}

