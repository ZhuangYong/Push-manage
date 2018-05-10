/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerPage.js @author: walljack@163.com @date: 18-3-15 下午5:06 @version: 1.0
 */


import {Component, Watch} from "vue-property-decorator/lib/vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import {del as delManufacturer} from "../../api/manufacturer";
import {searchSalesAndDeviceGroup, searchStatisticsSearchTree} from "../../api/sales";

@Component({name: "ManufacturerPage"})
export default class ManufacturerPage extends BasePage {
    optionsSales = [];
    tableAction = 'manufacturer/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '渠道名称', minWidth: 120},
        {columnKey: 'remark', label: '备注', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '机型列表', type: 'channelList'}], minWidth: 236}
    ];

    tableActionSearch = [
        {column: 'manufUuid', label: '请选择渠道方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []},
        {column: 'name', label: '请输入渠道名称', type: 'input', value: ''}];

    delItemFun = delManufacturer;

    @Watch('optionsSales', {immediate: true, deep: true})
    onOptionsChannelChange() {
        this.tableActionSearch[0].options = [];
        this.optionsSales.map(i => this.tableActionSearch[0].options.push(i));
    }

    @State(state => state.manufacturer.manufacturerPage) tableData;

    created() {
        this.refreshSales();
    }

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

    refreshSales() {
        this.loading = true;
        searchStatisticsSearchTree().then(res => {
            this.optionsSales = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }
}
