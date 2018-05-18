/**
 * Created by Zed on 2018/5/18.
 */

import BasePage from "../../../components/common/BasePage";
import Const from "../../../utils/const";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import apiUrl from "../../../api/apiUrl";
import uploadImg from '../../../components/Upload/singleImage.vue';
import JPanel from "../../../components/panel/JPanel";
import {languageList} from "../../../api/language";
import {save as editGroup} from "../../../api/group";

@Component({
    name: "EditGroupPage",
    components: {
        uploadImg
    }
})
export default class EditGroupPage extends BasePage {

    defaultFormData = {
        id: '',
        name: '',
        seq: '',
        isEnabled: 1,
        map: {
            nameKey: {},
            ottPicKey: {},
            wxPicKey: {},
        },
        actorNos: []
    };
    validateRule = {
        name: [
            {required: true, message: '名称'}
        ],
        seq: [
            {required: true, message: '请输入排序序列号'},
            {type: 'number', message: '必须为数字值'}
        ],
        ottpic: [
            {required: true, message: '请选择ott自定义图片'},
        ],
        wxpic: [
            {required: true, message: '请选择微信自定义图片'},
        ],
    };

    // 修改歌星方法
    editFun = editGroup;

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
            <JPanel title={`${this.formData.id ? "修改" : "添加"}歌星分组`}>
                <el-form className="small-space" model={this.formData} ref="addForm" rules={this.validateRule}
                         label-position="right" label-width="190px">
                    {
                        this.lanList.length > 0 ? <el-form-item label="名称：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={6}>
                                    <el-form-item prop="x">
                                        <el-input
                                            value={this.formData.map.nameKey[this.lanList[0].language]}
                                            placeholder="中文名称"
                                            onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={6}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {type: 'txt', i18nObj: {label: "名称", i18nkey: "nameKey", lanList: this.lanList, defaultMap: this.formData.map}})} plain size="small">点击编辑多语言
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ''
                    }

                    <el-form-item label="排序：" prop="seq">
                        <el-input value={this.formData.seq} placeholder=""
                                  onChange={v => this.formData.seq = parseInt(v, 10)} number/>
                    </el-form-item>

                    <el-form-item label="状态：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled'
                                        onInput={v => this.formData.isEnabled = v}>
                            <el-radio value={1} label={1}>启用</el-radio>
                            <el-radio value={2} label={2}>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>

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
