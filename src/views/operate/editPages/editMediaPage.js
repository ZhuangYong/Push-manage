/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editMediaPage.js @author: walljack@163.com @date: 18-2-6 下午12:52 @version: 1.0
 */

import BasePage from "../../../components/common/BasePage";
import {save as editMedia} from "../../../api/media";
import Const from "../../../utils/const";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import apiUrl from "../../../api/apiUrl";
import uploadImg from '../../../components/Upload/singleImage.vue';

@Component({
    name: "EditMediaPage",
    components: {
        uploadImg
    }
})
export default class EditMediaPage extends BasePage {

    // 修改歌星方法
    editFun = editMedia;

    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_TYPE_SAVE_IMG;
        return <el-form class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
            <el-input type="hidden" value={this.formData.id} name="id"/>
            <el-form-item label="歌曲名称：">
                {this.formData.nameNorm}
            </el-form-item>
            <el-form-item label="微信自定义图片(64*48或者等比例图片)：" prop="wxImg">
                <uploadImg ref="upload1" defaultImg={this.formData.wxPic} actionUrl={uploadImgApi} name="wxPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
            </el-form-item>
            <el-form-item label="ott自定义图片(64*48或者等比例图片)：" prop="ottImg">
                <uploadImg ref="upload2" defaultImg={this.formData.ottPic} actionUrl={uploadImgApi} name="ottPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
            </el-form-item>
            <el-form-item label="是否开启：">
                <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                    <el-radio value={1} label={1}>是</el-radio>
                    <el-radio value={0} label={0}>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自定义原伴唱：">
                <el-radio-group value={this.formData.orgMy} name="orgMy">
                    <el-radio value={2} label={2}>2</el-radio>
                    <el-radio value={1} label={1}>1</el-radio>
                    <el-radio value={0} label={0}>0</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" onClick={() => {
                    this.submitAddOrUpdate(() => {
                        this.pageBack();
                    });
                }}>提交
                </el-button>
                <el-button onClick={this.pageBack}>取消
                </el-button>
            </el-form-item>
        </el-form>;
    }
}
