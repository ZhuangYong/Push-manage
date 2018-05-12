/**
 * Created by Zed on 2018/5/12.
 */

import { Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";

@Component
export default class SNListView extends BaseView {
    created() {
        this.initialPages([<SNListPage />]);
    }
}

@Component
export class SNListPage extends BasePage {
    viewRule = [
        {columnKey: 'sn', label: 'SN号', minWidth: 90},
        {columnKey: 'mac', label: 'MAC地址', minWidth: 90},
        {columnKey: 'wifimac', label: 'WIFIMAC', minWidth: 90},
        {columnKey: 'random', label: '随机码', minWidth: 90},
        {columnKey: 'createTime', label: '生成时间', minWidth: 120},
        {columnKey: 'createName', label: '创建者', inDetail: true},
    ];
    tableActionSearch = [
        {column: 'sn', label: 'SN号', type: 'input', value: ''},
        {column: 'random', label: '随机码', type: 'input', value: ''},
        {column: 'mac', label: 'MAC地址', type: 'input', value: ''},
        {column: 'startTime,endTime', label: '生成时间', type: 'daterange', value: '', option: Const.dataRangerOption},
    ];
    tableAction = 'sn/RefreshPage';
    @State(state => state.snManage.snData) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }
}
