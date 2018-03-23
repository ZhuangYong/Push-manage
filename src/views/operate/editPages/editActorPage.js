/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: editActorPage.js @author: walljack@163.com @date: 18-2-6 下午12:52 @version: 1.0
 */
import BasePage from "../../../components/common/BasePage";
import {save as editActor} from "../../../api/actor";
import Const from "../../../utils/const";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import apiUrl from "../../../api/apiUrl";
import uploadImg from '../../../components/Upload/singleImage.vue';
import JPanel from "../../../components/panel/JPanel";

@Component({
    name: "EditActorPage",
    components: {
        uploadImg
    }
})
export default class EditActorPage extends BasePage {

    // 修改歌星方法
    editFun = editActor;

    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_TYPE_SAVE_IMG;
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}歌星`}>
                <el-form class="small-space" model={this.formData} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="歌星名称：">
                        {this.formData.nameNorm}
                    </el-form-item>
                    <el-form-item label="微信自定义图片(300*180)：" prop="wxImgEcs">
                        <el-input style="display: none;" type="hidden" value={this.formData.wxPic} name="wxPic"/>
                        <uploadImg ref="upload1" defaultImg={this.formData.wxPic} actionUrl={uploadImgApi} name="wxPic"
                                   chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess}
                                   beforeUpload={this.beforeUpload} autoUpload={true}/>
                    </el-form-item>
                    <el-form-item label="ott自定义图片(280*280 280*580 580*280 580*580)：" prop="ottImg">
                        <el-input style="display: none;" type="hidden" value={this.formData.ottPic} name="ottPic"/>
                        <uploadImg ref="upload2" defaultImg={this.formData.ottPic} actionUrl={uploadImgApi} name="ottPic"
                                   chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess}
                                   beforeUpload={this.beforeUpload} autoUpload={true}/>
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
                </el-form>
            </JPanel>);
    }
}
