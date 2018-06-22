/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdMenu.js @author: walljack@163.com @date: 18-3-15 上午11:06 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class";
import JPanel from "../../components/panel/JPanel";
import uploadImg from '../../components/Upload/singleImage.vue';
import {pushDelete, save as savePush} from "../../api/weixinPush";
import ChooseImagePage from "./ChooseImagePage";
import ChooseMaterialPage from "./ChooseMaterialPage";
import {EditWXMaterialPage} from "./material";
import {EditWXImagePage} from "./image";
import JSelect from "../../components/select/select";
import {userTagAllPage} from "../../api/userTag";
import {mobile} from "../../utils/browser";

@Component({name: "WXPushView"})
export default class WXPushView extends BaseView {
    created() {
        this.initialPages([<WXPushPage/>, <EditWXPushPage/>, <ChooseImagePage/>, <ChooseMaterialPage/>, <EditWXMaterialPage />, <EditWXImagePage />]);
    }
}

@Component({name: "WXPushPage"})
class WXPushPage extends BasePage {
    tableAction = 'weixin/push/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '推送名称', minWidth: 170, sortable: true},
        {columnKey: 'eventType', label: '事件类型', minWidth: 120, formatter: r => {
                if (r.eventType === 1) return '登录';
                if (r.eventType === 2) return '关注';
                if (r.eventType === 3) return '绑定';
            }},
        {columnKey: 'msgType', label: '类型', minWidth: 120, formatter: r => {
                if (r.msgType === 1) return '图文消息';
                if (r.msgType === 2) return '文字消息';
                if (r.msgType === 3) return '图片消息';
            }},
        {columnKey: 'content', label: '内容', minWidth: 120},
        {columnKey: 'sort', label: '推送顺序', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 80, formatter: r => {
                if (r.isEnabled === 1) return '是';
                return '否';
            }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入推送名称', type: 'input', value: ''
    }];

    delItemFun = pushDelete;

    @State(state => state.weixin.pushPage) tableData;

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
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditWXPushPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditWXPushPage", {formData: row});
    }
}

@Component({
    name: "EditWXPushPage",
    components: {
        JPanel,
        JSelect,
        uploadImg,
    }
})
class EditWXPushPage extends BasePage {
    defaultFormData = {
        name: '',
        eventType: 1,
        sort: 1,
        isEnabled: 1,
        msgType: 1,
        materialId: '',
        materialTitle: '',
        content: '',
        image: '',
        tagCodes: '',
        tagCodesArr: [],
    };
    validateRule = {
        name: [
            {required: true, message: '请输入推送名称'}
        ],
        materialId: [
            {required: true, message: '请选择图文'}
        ],
        content: [
            {required: true, message: '请输入文字内容'}
        ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字'},
        ]
    };

    editFun = savePush;
    tags = [];

    created() {
        this.refreshTags();
    }

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "新增"}推送`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="推送名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="事件类型">
                        <el-radio-group value={this.formData.eventType} name="eventType">
                            <el-radio value={1} label={1}>登录</el-radio>
                            <el-radio value={2} label={2}>关注</el-radio>
                            <el-radio value={3} label={3}>绑定</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="推送顺序：" prop="sort">
                        <el-input value={this.formData.sort} placeholder="" name="sort" number/>
                    </el-form-item>
                    <el-form-item label="推送标签：" prop="tagCodes">
                        <el-select value={this.formData.tagCodesArr} placeholder='请选择标签' onInput={f => {
                            this.formData.tagCodesArr = f;
                            this.formData.tagCodes = f.join(',');
                        }} multiple>
                            {
                                this.tags.map(u => (
                                    <el-option label={`${u.tagName}(${u.tagCode})`} value={u.tagCode} key={u.tagCode}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否开启：">
                        <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="消息类型：">
                        <el-radio-group value={this.formData.msgType} name="msgType">
                            <el-radio value={1} label={1}>图文消息</el-radio>
                            <el-radio value={2} label={2}>文字消息</el-radio>
                            <el-radio value={3} label={3}>图片消息</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    {
                        this.formData.msgType === 1 ? <el-form-item label="从图文管理里面选择：" prop="materialId">
                            {
                                this.formData.materialTitle ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                    this.formData.materialId = '';
                                    this.formData.materialTitle = '';
                                }}>
                                    {this.formData.materialTitle}
                                </el-tag> : <el-button type="primary" size="mini" onClick={f => {
                                    this.goPage('ChooseMaterialPage');
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }
                    {
                        this.formData.msgType === 2 ? <el-form-item label="文字内容：" prop="content">
                            <el-input value={this.formData.content} name='content' onChange={v => this.formData.content = v}/>
                        </el-form-item> : ''
                    }
                    {
                        this.formData.msgType === 3 ? <el-form-item label="从图片管理里面选择：" prop="materialId">
                            {
                                this.formData.image ? <div class="image-preview" style={{
                                    position: 'relative',
                                    // clear: 'both',
                                    height: '100px',
                                    width: '100px',
                                }}>
                                    <i class="el-icon-close"
                                       style={{
                                           position: 'absolute',
                                           left: '-3px',
                                           cursor: 'pointer',
                                           background: 'red',
                                           borderRadius: '50%',
                                           padding: '6px',
                                           zIndex: 3,
                                           right: 'auto!important',
                                           top: '1px!important',
                                           color: '#fff!important'
                                       }}
                                       onClick={f => {
                                        this.formData.materialId = '';
                                        this.formData.image = '';
                                    }} />
                                    <div class="image-preview-wrapper">
                                        <img src={this.formData.image} style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            marginTop: '7px'
                                        }} />
                                    </div>
                                </div> : <el-button type="primary" size="mini" onClick={f => {
                                    this.goPage('ChooseImagePage');
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }

    refreshTags() {
        this.loading = true;
        userTagAllPage().then(res => {
            this.tags = res;
            if (!this.formData.id) {
                res.map(i => this.formData.tagCodesArr.push(i.tagCode));
                this.formData.tagCodes = this.formData.tagCodesArr.join(',');
            }
            this.loading = false;
        }).catch(err => this.loading = false);
    }
}
