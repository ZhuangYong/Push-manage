/**
 * Created by Zed on 2018/5/18.
 */

import BasePage from "../../../components/common/BasePage";
import {save as editMedia} from "../../../api/media";
import Const from "../../../utils/const";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import apiUrl from "../../../api/apiUrl";
import uploadImg from '../../../components/Upload/singleImage.vue';
import JPanel from "../../../components/panel/JPanel";
import {save as saveRecommend} from "../../../api/recommend";
import {languageList} from "../../../api/language";

@Component({
    name: "EditRecommendPage",
    components: {
        uploadImg
    }
})
export default class EditRecommendPage extends BasePage {

    defaultFormData = {
        id: '',
        name: '',
        isEnabled: 1, //是否使用, 1启用，2禁用
        sort: 1,
        map: {
            nameKey: {type: Const.TYPE_I18N_KEY_TXT},
            ottPicKey: {type: Const.TYPE_I18N_KEY_IMG},
            wxPicKey: {type: Const.TYPE_I18N_KEY_IMG},
        },
    };
    validateRule = {
        name: [
            {required: true, message: '请输入推荐名称'}
            ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字'},
            ],
    };

    // 修改歌星方法
    editFun = saveRecommend;

    created() {
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(err => this.loading = false);
    }

    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_TYPE_SAVE_IMG;
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}推荐`}>
                <el-form className="small-space" model={this.formData} ref="addForm" rules={this.validateRule}
                         label-position="right" label-width="190px">
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} onInput={v => this.formData.isEnabled = v}>
                            <el-radio label={1} value={1}>是</el-radio>
                            <el-radio label={2} value={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序：" prop="sort">
                        <el-input value={this.formData.sort} number onChange={v => this.formData.sort = parseInt(v, 10)}/>
                    </el-form-item>

                    {
                        this.lanList.length > 0 ? <el-form-item label="推荐名称：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v} disabled={!!this.formData.id}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {type: 'txt', i18nObj: {label: "名称", i18nkey: "nameKey", lanList: this.lanList, defaultMap: this.formData.map}})} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    {
                        this.lanList.length > 0 ? <el-form-item label="微信图片(300*180)：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.wxPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.wxPicKey[this.lanList[0].language] = this.formData.wxPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
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
                        this.lanList.length > 0 ? <el-form-item label="ott图片(280*280 280*580 580*280 580*580)：" required>
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
            </JPanel>
        );
    }
}
