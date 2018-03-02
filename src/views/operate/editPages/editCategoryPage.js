/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editCategoryPage.js @author: walljack@163.com @date: 18-2-8 下午3:21 @version: 1.0
 */
import {adminTypeGroupGroupList as getAdminTypeGroupGroupList} from "../../../api/typeGroupManage";
import {languageList} from "../../../api/language";
import Const from "../../../utils/const";
import {save as editCategory} from "../../../api/category";
import apiUrl from "../../../api/apiUrl";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import BasePage from "../../../components/common/BasePage";
import uploadImg from '../../../components/Upload/singleImage.vue';

@Component({
    name: "EditCategoryPage",
    components: {
        uploadImg
    }
})
export default class EditCategoryPage extends BasePage {

    defaultFormData = {
        id: '',
        groups: '',
        name: '',
        isEnabled: 1, //是否使用,1启用，2禁用
        sort: 1,
        map: {
            nameKey: {},
            ottPicKey: {},
            wxPicKey: {},
        },
        groupsUuid: '',
        serialNos: []
        // isUsage: 0,
    };
    validateRule = {
        name: [
            {required: true, message: '请输入图文消息名称'}
        ],
        groupsUuid: [
            {required: true, message: '请输入组名称'},
        ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字'},
        ],
    };
    // 修改歌星方法
    editFun = editCategory;
    adminTypeGroupGroupList = [];

    constructor() {
        super();
    }

    created() {
        this.loading = true;
        const fail = err => {
            this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
            this.loading = false;
        };
        languageList().then(res => {
            this.lanList = res;
            // 获取分类分组
            getAdminTypeGroupGroupList().then(res => {
                this.adminTypeGroupGroupList = res;
                this.loading = false;
            }).catch(fail);
        }).catch(fail);
    }

    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_TYPE_SAVE_IMG;
        return (
            <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                <el-form-item label="是否开启：" prop="isEnabled">
                    <el-radio-group value={this.formData.isEnabled} onInput={v => this.formData.isEnabled = v}>
                        <el-radio label={1} value={1}>是</el-radio>
                        <el-radio label={2} value={2}>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input value={this.formData.sort} onChange={v => this.formData.sort = parseInt(v, 10)}/>
                </el-form-item>
                <div>
                    {
                        this.lanList.length > 0 ? <el-form-item label="分类名称：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {type: 'txt', i18nObj: {label: "分类名称", i18nkey: "nameKey", lanList: this.lanList, defaultMap: this.formData.map}})} plain size="small">
                                            点击编辑多语言
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    <el-form-item label="组名称：" prop="groupsUuid">
                        <el-select placeholder={'请选择'} value={this.formData.groupsUuid} onHandleOptionClick={f => this.formData.groupsUuid = f.value} name='groupsUuid' onChange={v => {
                            this.adminTypeGroupGroupList.map(item => {
                                if (item.groupUuid === v) this.formData.groups = item.name;
                            });
                        }}>
                            {
                                this.adminTypeGroupGroupList.map(item => <el-option
                                    key={item.groupUuid}
                                    label={item.name}
                                    value={item.groupUuid}>
                                </el-option>)
                            }
                        </el-select>
                    </el-form-item>
                </div>
                {
                    this.lanList.length > 0 ? <el-form-item label="微信图片(300*180)：">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-form-item prop="x">
                                    <uploadImg defaultImg={this.formData.map.wxPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => {
                                        this.formData.map.wxPicKey[this.lanList[0].language] = v;
                                        this.formData.wxPic = v;
                                    }} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                </el-form-item>
                            </el-col>
                            <el-col span={12}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {type: 'img', i18nObj: {label: "图片", i18nkey: "wxPicKey", lanList: this.lanList, defaultMap: this.formData.map, uploadImgApi: uploadImgApi}})} plain size="small">点击编辑多语言</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item> : ""
                }

                {
                    this.lanList.length > 0 ? <el-form-item label="ott图片(280*280 280*580 580*280 580*580)：">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-form-item prop="x">
                                    <uploadImg defaultImg={this.formData.map.ottPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.ottPicKey[this.lanList[0].language] = this.formData.ottPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                </el-form-item>
                            </el-col>
                            <el-col span={12}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {type: 'img', i18nObj: {label: "图片", i18nkey: "ottPicKey", lanList: this.lanList, defaultMap: this.formData.map, uploadImgApi: uploadImgApi}})} plain size="small">点击编辑多语言</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item> : ""
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
        );
    }
}
