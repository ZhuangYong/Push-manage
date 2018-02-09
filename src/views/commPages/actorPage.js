/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: actorPage.js @author: walljack@163.com @date: 18-2-6 下午12:52 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import Const from "../../utils/const";

@Component
export default class ActorPage extends BasePage {
    tableAction = 'operate/actor/RefreshPage';
    viewRule = [
        {columnKey: 'actorNo', label: '歌星编号', minWidth: 120, sortable: true},
        {columnKey: 'nameNorm', label: '歌星名称', minWidth: 120, sortable: true},
        {columnKey: 'abbrNorm', label: '歌星首字母', minWidth: 140, sortable: true},
        {columnKey: 'actorTypeNorm', label: '歌星类型', minWidth: 90},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxPic', label: '自定义微信图片', minWidth: 110, imgColumn: 'wxPic'},
        {columnKey: 'ottPic', label: '自定义ott图片', minWidth: 110, imgColumn: 'ottPic'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '歌星歌曲', type: 'filterMedia'}], minWidth: 168}
    ];
    tableActionSearch = [
        {column: 'nameNorm', label: '请输入歌星名称', type: 'input', value: ''},
        {column: 'actorNo', label: '请输入歌星编号', type: 'input', value: ''},
        {column: 'serialNo', label: '请输入歌曲编号', type: 'input', value: ''}
    ];

    @State(state => state.operate.actorPage) tableData;

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
        const updateIngFromLeiKe = (this.tableData.config && this.tableData.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'actor'}, true)} type="primary" loading={updateIngFromLeiKe}>
                {
                    updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                }
            </el-button>
        </div>;
    }
}
