/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editDevicePage.js @author: walljack@163.com @date: 18-4-18 下午7:17 @version: 1.0
 */
import uploadImg from '../../../components/Upload/singleImage.vue';
import JSelect from "../../../components/select/select";
import BasePage from "../../../components/common/BasePage";
import Const from "../../../utils/const";
import apiUrl from "../../../api/apiUrl";
import {edit as editDevice} from "../../../api/device";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {languageList} from "../../../api/language";
import {getShareProduct} from "../../../api/userManage";
import JPanel from "../../../components/panel/JPanel";

/**
 * actor page
 */
@Component({
    name: "EditDevicePage",
    components: {
        JSelect,
        uploadImg
    }})
export default class EditDevicePage extends BasePage {
    activateDays = [];
    lanList = [];
    defaultFormData = {
        groupName: '',
        codeAutoDay: 1,
        freeBgImg: '',
        map: {
            imageKey: {type: Const.TYPE_I18N_KEY_IMG},
        },
    };
    validateRule = {
        groupName: [
            {required: true, message: '请输入分组名称'}
        ],
        freeBgImg: [
            {required: true, message: '请选择免费激活背景图片'},
        ]
    };

    editFun = editDevice;

    created() {
        this.getActivateDays();
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    }

    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_PRODUCT_SAVE_IMAGE;
        return (
            <JPanel title={`${this.formData.id ? "结算设置" : "新增分组列表"}`}>
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right"
                         label-width="180px">
                    <el-form-item label="分组名称：" prop="groupName">
                        <el-input value={this.formData.groupName} placeholder="" name="groupName"/>
                    </el-form-item>
                    <el-form-item label="激活码天数(天)：" prop="codeAutoDay">
                        <el-select value={this.formData.codeAutoDay}
                                   onHandleOptionClick={f => this.formData.codeAutoDay = f.value}>
                            {
                                this.activateDays.map(day =>
                                    <el-option label={day.remark} value={day.day} key={day.day}/>
                                )
                            }
                        </el-select>
                    </el-form-item>
                    {
                        this.lanList.length ? <el-form-item label="免费激活背景图片：">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.imageKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => {
                                            this.formData.map.imageKey[this.lanList[0].language] = v;
                                            this.formData.image = v;
                                        }} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {type: 'img', i18nObj: {label: "图片", i18nkey: "imageKey", lanList: this.lanList, defaultMap: this.formData.map, uploadImgApi: uploadImgApi}})} plain size="small">点击编辑多语言</el-button>
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
                        <el-button onClick={
                            () => {
                                this.pageBack();
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }

    getActivateDays() {
        this.loading = true;
        getShareProduct("").then(res => {
            this.activateDays = res;
            this.loading = false;
        }).catch(err => this.loading = false);
    }
}
