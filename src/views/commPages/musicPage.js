/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: musicPage.js @author: walljack@163.com @date: 18-2-6 下午12:52 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import Const from "../../utils/const";
import {mediaLanguageList} from "../../api/media";

@Component({name: "MusicPage"})
export default class MusicPage extends BasePage {
    // 列表api地址
    tableAction = 'operate/media/RefreshPage';
    // 列表显示规则
    viewRule = [
        {columnKey: 'id', label: 'id', minWidth: 120, inDetail: true},
        {columnKey: 'serialNo', label: '歌曲编号', minWidth: 120, sortable: true},
        // {columnKey: 'serialNos', label: 'serialNos', inDetail: true},
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否启用', minWidth: 120, formatter: r => {
                if (r.isEnabled === 1) return '是';
                return '否';
            }},
        {columnKey: 'charge', label: '是否免费', minWidth: 120, formatter: r => {
                // 0为本地可播，1为vip歌曲，-1024为免费歌曲
                // if (r.charge === 0) return '本地可播';
                // if (r.charge === 1) return 'vip歌曲';
                if (r.charge === -1024) return '是';
                return '否';
            }},
        {columnKey: 'abbrNorm', label: '拼音首字母缩写', minWidth: 100, sortable: true},
        {columnKey: 'actorName', label: '歌星名称', minWidth: 100},
        {columnKey: 'languageNorm', label: '语言', minWidth: 100},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxPic', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxPic'},
        {columnKey: 'ottPic', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottPic'},
        {columnKey: 'charge', label: 'CIBN审核状态', minWidth: 100, inDetail: true},
        {columnKey: 'acc', label: 'acc', minWidth: 60, inDetail: true},
        {columnKey: 'org', label: 'org', minWidth: 60, inDetail: true},
        {columnKey: 'orgMy', label: 'orgMy', minWidth: 60, inDetail: true},
        {columnKey: 'bcolor', label: 'bcolor', minWidth: 60, inDetail: true},
        {columnKey: 'fileMark', label: 'fileMark', minWidth: 60, inDetail: true},
        {columnKey: 'hd', label: 'hd', minWidth: 60, inDetail: true},
        {columnKey: 'hot', label: 'hot', minWidth: 60, inDetail: true},
        {columnKey: 'isChecked', label: 'isChecked', minWidth: 60, inDetail: true},
        {columnKey: 'version', label: 'version', minWidth: 60, inDetail: true},
        {columnKey: 'volume', label: 'volume', minWidth: 60, inDetail: true},
        {columnKey: 'fileMark', label: '播放时长', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '查看歌星', type: 'filterActor'}], minWidth: 168}
    ];
    // 搜索规则
    tableActionSearch = [
        {column: 'languageNorm', label: '请选择语言类型', type: 'option', value: '', options: []},
        {column: 'serialNo', label: '请输入歌曲编码', type: 'input', value: ''},
        {column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''},
        {
            column: 'isEnabled', label: '请选择是否启用', type: 'option', value: '', options: [
                {label: '是', value: 1},
                {label: '否', value: 2}
            ]
        },
        // 0为本地可播，1为vip歌曲，-1024为免费歌曲
        {
            column: 'charge', label: '请选择是否免费', type: 'option', value: '', options: [
                {label: '是', value: -1024},
                {label: '否', value: 1}
            ]
        },
        {column: 'actorNo', label: '请输入歌星编码', type: 'input', value: ''},
    ];
    // 列表数据
    @State(state => state.operate.mediaPage) tableData;

    constructor() {
        super();
    }
    created() {
        this.initialMediaLanguageList();
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
        const updateIngFromLeiKe2 = (this.tableData.config2 && this.tableData.config2.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
        return <div class="filter-container table-top-button-container">
                <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'media'}, true)} type="primary" loading={updateIngFromLeiKe}>
                    {
                        updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                    }
                </el-button>
                <el-button class="filter-item" onClick={f => this.updateFromLeiKe(null, false, false, true)} type="primary" loading={updateIngFromLeiKe2}>
                    {
                        updateIngFromLeiKe2 ? "数据更新中" : "从雷客更新歌曲关联歌星"
                    }
                </el-button>
            </div>;
    }

    /**
     *  获取歌曲中的语言列表
     */
    initialMediaLanguageList() {
        this.loading = false;
        mediaLanguageList().then(res => {
            this.mediaLanguageList = res;
            if (this.tableActionSearch[0].options.length === 0) {
                this.mediaLanguageList.map(i => this.tableActionSearch[0].options.push({label: i, value: i}));
            }
            this.loading = false;
        }).catch(() => this.loading = false);
    }

}
