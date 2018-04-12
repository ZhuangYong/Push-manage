/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerManage.js @author: walljack@163.com @date: 18-2-27 下午4:08 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delManufacturer, delChannel} from "../../api/manufacturer";
import {State} from "vuex-class/lib/index";
import EditManufacturerPage from "./editPages/editManufacturerPage";
import EditManufacturerChannelPage from "./editPages/editManufacturerChannelPage";
import SalesGroupPage from "../commPages/salesGroupPage";
import _ from "lodash";
import {manufacturerChannelList} from "../../api/channel";
import ManufacturerPage from "../commPages/manufacturerPage";

@Component({name: "manufacturerManageView"})
export default class manufacturerManageView extends BaseView {
    created() {
            this.initialPages([<IndexPage/>, <EditManufacturerPage/>, <EditManufacturerChannelPage/>, <ChannelPage/>, <ChooseGroupPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends ManufacturerPage {}

@Component({name: "ChannelPage"})
class ChannelPage extends BasePage {
    salesUuid = '';
    tableAction = 'manufacturer/channel/RefreshPage';
    viewRule = [
        {columnKey: 'channelName', label: '机型名称', minWidth: 120},
        {columnKey: 'channelCode', label: '机型CODE', minWidth: 120, inDetail: true},
        {columnKey: 'parentProportions', label: '结算比例', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '结算设置', type: 'edit'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入销售名称', type: 'input', value: ''
    }];

    delItemFun = delChannel;

    @State(state => state.manufacturer.channelPage) tableData;

    created() {
        const {uuid} = this.param || {};
        if (uuid) {
            this.manufacturerUuid = uuid;
            this.tableActionSearchColumn = [{manufacturerUuid: uuid}];
        }
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
            <el-button class="filter-item" onClick={this.pageBack} type="primary">
                返回
            </el-button>
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditManufacturerChannelPage", {formData: {manufacturerUuid: this.manufacturerUuid}});
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditManufacturerChannelPage", {formData: row});
    }

}

@Component({name: "ChooseGroupPage"})
class ChooseGroupPage extends SalesGroupPage {
    tableCanSelect = true;

    viewRule = [
        {columnKey: 'name', label: '机型名称', minWidth: 190, sortable: true},
        {columnKey: 'code', label: '机型值', minWidth: 120},
        {columnKey: 'isShare', label: '是否是共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
                return '';
            }},
        // {columnKey: 'vipGroupName', label: '产品包名'},
        // {columnKey: 'image', label: '支付二维码背景图片', minWidth: 170, imgColumn: 'image'},
        {columnKey: 'payX', label: 'X轴', inDetail: true},
        {columnKey: 'payY', label: 'Y轴', inDetail: true},
        {columnKey: 'payW', label: '宽', inDetail: true},
        {columnKey: 'payH', label: '高', inDetail: true},
        // {columnKey: 'status', label: '状态', formatter: r => {
        //     if (r.status === 1) return '生效';
        //     if (r.status === 2) return '禁用';
        //     if (r.status === 3) return '删除';
        // }, inDetail: true},
        {columnKey: 'remark', label: '描述', minWidth: 170},
        {columnKey: 'updateName', label: '更新者', inDetail: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144 }
    ];
    tableAction = "channel/RefreshPage";
    @State(state => state.channel.channelPage) tableData;

    created() {
        this.viewRule = this.viewRule.filter(v => _.isEmpty(v.buttons) && v.columnKey !== "deviceCount");
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
        </div>;
    }

    handleSelectionChange(selectedItems) {
        if (selectedItems.length === 1) {
            const {name, code} = selectedItems[0];
            this.changePrePageData({
                channelCode: code,
                channelName: name
            });
            this.pageBack();
        }
    }
}
