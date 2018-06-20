/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdMenu.js @author: walljack@163.com @date: 18-3-15 上午11:06 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class";
import JPanel from "../../components/panel/JPanel";
import Const from "../../utils/const";
import {wxImageDelete, wxImageSave} from "../../api/weixinImage";
import apiUrl from "../../api/apiUrl";
import uploadImg from '../../components/Upload/singleImage.vue';

@Component({name: "WXImageView"})
export default class WXImageView extends BaseView {
    created() {
        this.initialPages([<WXImagePage/>, <EditWXImagePage/>]);
    }
}

@Component({name: "WXImagePage"})
export class WXImagePage extends BasePage {
    tableAction = 'weixin/image/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '名称', minWidth: 120},
        {imgColumn: 'image', label: '图片', minWidth: 120},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '删除', type: 'del'}], minWidth: 176}
    ];

    tableActionSearch = [];

    delItemFun = wxImageDelete;

    @State(state => state.weixin.wxImagePage) tableData;

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
                    this.goPage("EditWXImagePage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }
}

@Component({
    name: "EditWXImagePage",
    components: {
        JPanel,
        uploadImg
    }
})
export class EditWXImagePage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        image: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入图片名称'}
        ],
        image: [
            {required: true, message: '请上传图片'}
        ],
    };

    editFun = wxImageSave;

    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_WEIXIN_IMAGE_SAVE_IMAGE;
        return (
            <JPanel title={`${this.formData.id ? "修改" : "新增"}图片`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="图片：" prop="image">
                        <uploadImg defaultImg={this.formData.image} actionUrl={uploadImgApi} name='image' chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                    </el-form-item>
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
}
