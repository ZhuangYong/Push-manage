/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editI18nPage.js @author: walljack@163.com @date: 18-2-6 下午12:54 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {saveLanguage} from "../../api/category";
import uploadImg from '../../components/Upload/singleImage.vue';

const defaultMap = {
    nameKey: {},
    imageKey: {},
    ottPicKey: {},
    wxPicKey: {},
    epgIndexKey: {},
    loadKey: {}
};
@Component({
    name: "EditI18nPage",
    components: {
        uploadImg
    }
})
export default class EditI18nPage extends BasePage {
    defaultFormData = {
        map: {
            nameKey: {},
            imageKey: {},
            ottPicKey: {},
            wxPicKey: {},
            epgIndexKey: {},
            loadKey: {},
        },
    };
    showI18nObj = [];
    i18nkey = "";
    label = "";
    lanList = "";
    defaultMap = "";
    isVideo = "";
    uploadImgApi = "";
    constructor() {
        super();
    }

    render(h) {
        const {type, i18nObj, isVideo, uploadImgApi} = this.$vnode.extraData || {};
        const {label, lanList, i18nkey, defaultMap} = i18nObj || {};
        this.label = label;
        this.lanList = lanList;
        this.i18nkey = i18nkey;
        this.isVideo = isVideo;
        this.uploadImgApi = uploadImgApi;
        this.defaultMap = defaultMap;
        Object.keys(this.defaultMap).map(key => {
            const itemKey = this.defaultMap[key];
            Object.keys(itemKey).map(k => {
                this.formData.map[key][k] = itemKey[k];
            });
        });
        switch (type) {
            case "txt":
                return this.cruI18nTxt(h);
            case "img":
                return this.cruI18nImg(h);
            case "option":
                return this.cruI18nOption(h);
            default:
                return <div>unsupported i18n type</div>;
        }
    }

    /**
     * 修改多语言文字
     * @param h
     * @returns {*}
     */
    cruI18nTxt(h) {
        return (
            <el-form class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                {
                    this.lanList.map(o => (
                        <el-form-item label={`${o.name}${this.label}`}>
                            <el-input value={this.formData.map[this.i18nkey][o.language]} placeholder={`请输入${o.name}${this.label}`} onChange={v => this.formData.map[this.i18nkey][o.language] = v}/>
                        </el-form-item>
                    ))
                }
                <el-form-item>
                    <el-button type="primary" onClick={this.submitFormI18n}>提交</el-button>
                    <el-button onClick={() => {
                        this.pageBack();
                    }}>取消</el-button>
                </el-form-item>
            </el-form>
        );
    }

    /**
     * 修改多语言图片
     * @param h
     * @returns {*}
     */
    cruI18nImg(h) {
        const uploadImgApi = this.i18nUploadImgApi || (Const.BASE_API + '/' + apiUrl.API_PRODUCT_SAVE_IMAGE);
        return (
            <el-form class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                {
                    this.lanList.map(o => (
                        <el-form-item label={`${o.name}${this.label}`}>
                            <uploadImg defaultImg={this.formData.map[this.i18nkey] && this.formData.map[this.i18nkey][o.language]} actionUrl={uploadImgApi} name={v => this.formData.map[this.i18nkey][o.language] = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true} isVideo={this.isVideo}/>
                        </el-form-item>
                    ))
                }
                <el-form-item>
                    <el-button type="primary" onClick={this.submitFormI18n}>提交</el-button>
                    <el-button onClick={this.pageBack}>取消</el-button>
                </el-form-item>
            </el-form>
        );
    }

    /**
     * 多语言下拉选择
     * @param h
     * @returns {*}
     */
    cruI18nOption(h) {
        return (
            <el-form v-loading={this.loading} class="small-space" key={JSON.stringify(this.formData.map.epgIndexKey)} model={this.formData}
                     ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                {
                    this.showI18nObj.map(o => (
                        (o.optionData && o.optionData.length > 0) ? <el-form-item label={o.label}>
                            <el-select placeholder="请选择" value={o.getValue()} onHandleOptionClick={f => {
                                this.refreshViewNumber = Math.random();
                                o.setValue(f.value);
                            }} >
                                <el-option label="无" value="" key=""/>
                                {
                                    o.optionData && o.optionData.map(opt => (
                                        <el-option label={opt[o.optionKey]} value={opt[o.optionValueKey]} key={opt[o.optionValueKey]}>
                                            {
                                                o.optionTemplate ? o.optionTemplate(opt) : ""
                                            }
                                        </el-option>
                                    ))
                                }
                            </el-select>
                        </el-form-item> : ""
                    ))
                }
                <el-form-item>
                    <el-button type="primary" onClick={this.submitFormI18n}>提交</el-button>
                    <el-button onClick={this.pageBack}>取消</el-button>
                </el-form-item>
            </el-form>
        );
    }

    /**
     * 提交多语言表单
     */
    submitFormI18n() {
        const i18nFormData = Object.assign({}, {map: defaultMap}, this.formData);
        this.formData.name = i18nFormData.map.nameKey.cn;
        this.formData.ottPic = i18nFormData.map.ottPicKey.cn;
        this.formData.wxPic = i18nFormData.map.wxPicKey.cn;
        this.formData.image = i18nFormData.map.imageKey.cn;
        this.formData.epgIndexId = i18nFormData.map.epgIndexKey.cn;

        this.formData.nameKey = i18nFormData.map.nameKey.key;
        this.formData.ottPicKey = i18nFormData.map.ottPicKey.key;
        this.formData.wxPicKey = i18nFormData.map.wxPicKey.key;
        this.formData.imageKey = i18nFormData.map.imageKey.key;
        this.formData.epgIndexKey = i18nFormData.map.epgIndexKey.key;

        if (this.formData.map && this.formData.map.nameKey) this.formData.map.nameKey.type = Const.TYPE_I18N_KEY_TXT;
        if (this.formData.map && this.formData.map.ottPicKey) this.formData.map.ottPicKey.type = Const.TYPE_I18N_KEY_IMG;
        if (this.formData.map && this.formData.map.wxPicKey) this.formData.map.wxPicKey.type = Const.TYPE_I18N_KEY_IMG;
        if (this.formData.map && this.formData.map.epgIndexKey) this.formData.map.epgIndexKey.type = Const.TYPE_I18N_KEY_EPG;
        if (this.formData.map && this.formData.map.loadKey) this.formData.map.loadKey.type = Const.TYPE_I18N_KEY_LOAD;
        this.applyApiDurFun(saveLanguage, res => {
            const {name, nameKey, ottPic, ottPicKey, wxPic, wxPicKey, image, imageKey, epgIndexKey} = res;
            nameKey && (this.formData.nameKey = this.formData.map.nameKey.key = nameKey);
            ottPicKey && (this.formData.ottPicKey = this.formData.map.ottPicKey.key = ottPicKey);
            wxPicKey && (this.formData.wxPicKey = this.formData.map.wxPicKey.key = wxPicKey);
            imageKey && (this.formData.imageKey = this.formData.map.imageKey.key = imageKey);
            epgIndexKey && (this.formData.epgIndexKey = this.formData.map.epgIndexKey.key = epgIndexKey);
            this.changePrePageData(this.formData);
            this.pageBack();
        });
    }

}
