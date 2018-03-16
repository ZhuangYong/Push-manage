/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerPage.js @author: walljack@163.com @date: 18-3-15 下午5:06 @version: 1.0
 */


import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import {del as delManufacturer} from "../../api/manufacturer";

@Component({name: "ManufacturerPage"})
export default class ManufacturerPage extends BasePage {
    tableAction = 'manufacturer/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '渠道名称', minWidth: 120},
        {columnKey: 'remark', label: '备注', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '分组列表', type: 'channelList'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入渠道名称', type: 'input', value: ''
    }];

    delItemFun = delManufacturer;

    @State(state => state.manufacturer.manufacturerPage) tableData;

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
                    this.goPage("EditManufacturerPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditManufacturerPage", {formData: row});
    }

    handelChannelList(row) {
        this.goPage("ChannelPage", {formData: row});
    }

}
