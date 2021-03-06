/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerManage.js @author: walljack@163.com @date: 18-2-27 下午4:08 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delManufacturer, delChannel, saveChannel} from "../../api/manufacturer";
import {State} from "vuex-class/lib/index";
import EditManufacturerPage from "./editPages/editManufacturerPage";
import EditManufacturerChannelPage from "./editPages/editManufacturerChannelPage";
import SalesGroupPage from "../commPages/salesGroupPage";
import _ from "lodash";
import {manufacturerChannelList} from "../../api/channel";
import ManufacturerPage from "../commPages/manufacturerPage";
import {saveDevice} from "../../api/sales";
import {Watch} from "vue-property-decorator/lib/vue-property-decorator";

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
    manufacturerUuid = '';
    tableAction = 'manufacturer/channel/RefreshPage';
    viewRule = [
        {columnKey: 'channelName', label: '机型名称', minWidth: 120},
        {columnKey: 'channelCode', label: '机型值', minWidth: 120},
        {columnKey: 'isShare', label: '是否是共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
                return '';
            }},
        {columnKey: 'remark', label: '描述', minWidth: 170},
        // {columnKey: 'parentProportions', label: '结算比例', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [
            {label: '删除', type: 'del', condition: r => !r.isLeike},
                // {label: '结算设置', type: 'edit'}
                ], minWidth: 236}
    ];

    tableActionSearch = [
        {column: 'name', label: '机型名称或机型值', type: 'input', value: ''}
    ];

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
                    this.goPage("ChooseGroupPage", {formData: {manufacturerUuid: this.manufacturerUuid}});
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
    channelCodes = [];
    channelNames = [];
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

    tableActionSearch = [
        // {column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []},
        {column: 'name', label: '机型名称或机型值', type: 'input', value: ''}
    ];
    manufacturerUuid = '';

    @State(state => state.channel.channelPage) tableData;

    created() {
        this.viewRule = this.viewRule.filter(v => _.isEmpty(v.buttons) && v.columnKey !== "deviceCount");
        this.manufacturerUuid = this.formData.manufacturerUuid;
        this.tableActionSearchColumn = [{manufacturerUuid: this.manufacturerUuid}];
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
            <el-button class="filter-item" disable={this.selectItems.length <= 0} onClick={this.submitChooseChannel} type="primary" icon="edit">
                确定
            </el-button>
        </div>;
    }

    submitChooseChannel() {

        /*if (this.channelCodes.length) {
            this.changePrePageData({
                channelCodes: this.channelCodes,
                channelNames: this.channelNames
            });
            this.pageBack();
        }*/

        this.submitLoading = true;
        let channelCodes = [];
        this.selectItems.map(selectItem => channelCodes.push(selectItem.code));
        const params = {
            manufacturerUuid: this.manufacturerUuid,
            channelCodes,
        };
        saveChannel(params).then(res => {
            this.submitLoading = false;
            this.$message.success('操作成功');
            this.pageBack();
        }).catch(err => {
            this.submitLoading = false;
            this.$message.error('操作失败');
        });
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    /*handleSelectionChange(selectedItems) {
        this.channelCodes = [];
        this.channelNames = [];
        if (selectedItems.length) {
            let channelCodes = [];
            let channelNames = [];
            selectedItems.map(s => {
                const {name, code} = s;
                channelCodes.push(code);
                channelNames.push(name);
            });
            this.channelCodes = channelCodes;
            this.channelNames = channelNames;
        }
    }*/
    handleSelectionChange(selectedItems) {
        this.selectItems = selectedItems;
    }
}
