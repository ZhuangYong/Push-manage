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
import {save as saveRank} from "../../../api/rank";
import {adminTypeGroupSave} from "../../../api/typeGroupManage";

@Component({
    name: "EditTypeGroupPage",
    components: {
        uploadImg
    }
})
export default class EditTypeGroupPage extends BasePage {

    defaultFormData = {
        id: null,
        name: null,
        isEnabled: 1,
        sort: 1,
        isLeike: null,
        map: {
            nameKey: {},
        },
    };
    validateRule = {
        name: [
            {required: true, message: '分组名称不能为空', trigger: 'blur'},
            {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
        ]
    };

    // 修改歌星方法
    editFun = adminTypeGroupSave;

    created() {
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(err => this.loading = false);
    }

    render() {
        const options = [
            {isEnabled: 1, label: "生效"},
            {isEnabled: 2, label: "禁用"}
        ];
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}分类组`}>
                <el-form className="small-space" model={this.formData} ref="addForm" rules={this.validateRule}
                         label-position="right" label-width="190px">

                    {
                        this.lanList.length > 0 ? <el-form-item label="分组名称：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
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
                    <el-form-item label="状态：">
                        {/*<el-select placeholder={'请选择'} value={this.formData.isEnabled} name='isEnabled' disabled={parseInt(this.formData.isLeike, 10) === 1}>*/}
                        <el-select placeholder={'请选择'} value={this.formData.isEnabled} name='isEnabled' onHandleOptionClick={f => this.formData.isEnabled = f.value}>
                            {
                                options.map(item => <el-option
                                    key={item.isEnabled}
                                    label={item.label}
                                    value={item.isEnabled}>
                                </el-option>)
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="排序" prop="sort">
                        <el-input value={this.formData.sort} name='sort' placeholder="请输入排序数" onChange={v => this.formData.sort = parseInt(v, 10)}/>
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
