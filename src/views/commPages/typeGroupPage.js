/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: actorPage.js @author: walljack@163.com @date: 18-2-6 下午12:52 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import Const from "../../utils/const";

@Component({name: "TypeGroupPage"})
export default class TypeGroupPage extends BasePage {
    tableAction = 'adminTypeGroupList/RefreshPage';
    defaultViewRule = [
        {columnKey: 'name', label: '分组名称', minWidth: 140, sortable: true},
        {columnKey: 'isEnabled', label: '状态', formatter: r => {
                if (r.isEnabled === 1) return '生效';
                if (r.isEnabled === 2) return '禁用';
            }, minWidth: 120},
        {columnKey: 'sort', label: '排序', minWidth: 140, sortable: true},
        {columnKey: 'createName', label: '创建者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 180, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 180, sortable: true},
    ];
    oprateViewRule = [
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}], minWidth: 144},
    ];
    tableActionSearch = [{
        column: 'name', label: '请输入分组名称', type: 'input', value: ''
    }];

    @State(state => state.operate.adminTypeGroupList) tableData;

    created() {
        this.viewRule = [...this.defaultViewRule, ...this.oprateViewRule];
    }

    render(h) {
        return <div>
            {
                this.pageCanBack() ? <div class="filter-container table-top-button-container">
                    {
                        this.pageBackHtml(h)
                    }
                </div> : ""
            }
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return '';
    }

    handelEdit(row) {
        this.goPage('EditTypeGroupPage', {formData: row});
    }
}
