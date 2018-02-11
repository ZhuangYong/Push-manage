/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: languageResources.js @author: walljack@163.com @date: 18-2-11 下午3:24 @version: 1.0
 */
import BasePage from "../../components/common/BasePage";
import {Component} from "vue-property-decorator";
import {State} from "vuex-class";
import BaseView from "../../components/common/BaseView";

@Component({name: "LanguageResourcesView"})
export default class LanguageResourcesView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'system/language/resources/RefreshPage';
    viewRule = [
        {columnKey: 'cn', label: '中文', minWidth: 120, sortable: true},
        {columnKey: 'en', label: '英文', minWidth: 120, sortable: true},
        {columnKey: 'hk', label: '粤语', inDetail: true},
        {columnKey: 'tw', label: '繁体', minWidth: 190, inDetail: true},
        {columnKey: 'key', label: 'KEY', minWidth: 190, inDetail: true},
        {columnKey: 'isUsed', label: '是否使用', minWidth: 190, formatter: r => {
            if (r.isUsed === 1) return '使用';
            return '未使用';
        }},
        // 1为图片，2为文字，3为epg选择，4为load选择
        {columnKey: 'type', label: '类型', minWidth: 190, formatter: r => {
            if (r.type === 1) return '文字';
            if (r.type === 2) return '图片';
            if (r.type === 3) return 'epg选择';
            if (r.type === 4) return 'load选择';
        }},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
    ];

    @State(state => state.system.languageResourcesPage) tableData;

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
        return "";
    }
}
