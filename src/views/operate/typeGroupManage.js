import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {adminTypeGroupDelete} from "../../api/typeGroupManage";
import EditTypeGroupPage from "./editPages/editTypeGroupPage";
import TypeGroupPage from "../commPages/typeGroupPage";
import EditI18nPage from "../commPages/editI18nPage";

@Component({name: 'TypeGroupView'})
export default class TypeGroupView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <EditTypeGroupPage />, <EditI18nPage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends TypeGroupPage {
    oprateViewRule = [
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ];
    delItemFun = adminTypeGroupDelete;

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage('EditTypeGroupPage');
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }
}
