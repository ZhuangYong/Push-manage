/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: MusicPage.js @author: walljack@163.com @date: 18-2-2 下午5:58 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../common/BasePage";
import {State} from "vuex-class/lib/index";

@Component
export default class MusicPage extends BasePage {
    pageAction = 'operate/media/RefreshPage';
    viewRule = [
        {columnKey: 'serialNo', label: '歌曲编号', minWidth: 120, sortable: true},
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 120, sortable: true},
        {columnKey: 'abbrNorm', label: '拼音首字母缩写', minWidth: 100, sortable: true},
        {columnKey: 'languageNorm', label: '语言', minWidth: 100},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxPic', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxPic'},
        {columnKey: 'ottPic', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottPic'},
        // {columnKey: 'charge', label: 'CIBN审核状态', minWidth: 100},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 70, formatter: r => {
                if (r.isEnabled === 1) return '是';
                if (r.isEnabled === 0) return '否';
            }},
        {columnKey: 'fileMark', label: '播放时长', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '查看歌星', type: 'filterActor'}], minWidth: 168}
        ];

    @State(state => state.operate.mediaPage) tableData;

    constructor() {
        super();
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

}
