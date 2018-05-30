/**
 * Created by Zed on 2018/5/12.
 */

import { Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import MACEditPage from "./MACEditPage";

@Component
export default class MacListView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <MACEditPage />]);
    }
}

@Component
export class IndexPage extends BasePage {
    viewRule = [
        {columnKey: 'mac', label: 'MAC', minWidth: 90},
        {columnKey: 'status', label: '是否使用', minWidth: 90, formatter: r => {
                if (r.status === 1) return '否';
                if (r.status === 2) return '是';
            }},
        {columnKey: 'type', label: '类型', minWidth: 120, formatter: r => {
            if (r.type === 1) return '真实MAC';
            if (r.type === 2) return '虚拟MAC';
            }},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建时间', inDetail: true},
        {label: '操作', buttons: [{label: '导出', type: 'export'}, {label: '查看', type: 'detail'}], minWidth: 120},
    ];
    tableAction = 'mac/RefreshPage';
    @State(state => state.snManage.macData) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return <div className="filter-container table-top-button-container" style={{paddingBottom: '15px'}}>
            <el-button type="primary" onClick={f => {
                this.goPage('MACEditPage');
            }}>
                生成虚拟MAC
            </el-button>
        </div>;
    }
}
