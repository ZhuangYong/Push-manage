import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import BaseView from "../../components/common/BaseView";
import {add as changeChannel, checkChannelCodeUnique, del as channelDel} from "../../api/channel";
import JPanel from "../../components/panel/JPanel";
import ChannelPage from "../commPages/channelPage";

/**
 * 主视图
 */
@Component({name: "ChannelView"})
export default class ChannelView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditChannelPage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends ChannelPage {

    delItemFun = channelDel;

    created() {
        this.viewRule = this.defaultViewRule.concat([{label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144 }]);
    }

    topButtonHtml(h) {
        return (
            <div class="filter-container table-top-button-container">
                <el-button class="filter-item" onClick={
                    () => {
                        this.goPage("EditChannelPage");
                    }
                } type="primary" icon="edit">添加
                </el-button>
            </div>
        );
    }

    /**
     * 跳向修改分类页面
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditChannelPage", {formData: row});
    }
}

@Component({name: 'EditChannelPage'})
class EditChannelPage extends BasePage {
    defaultFormData = {
        name: '',
        code: '',
        isShare: 0,
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入机型名称'},
            {min: 1, max: 16, message: '请输入1-16位字符'}
        ],
        code: [
            {required: true, message: '请输入机型值'},
            {validator: function (rule, value, callback) {
                    console.log("val", value);
                    if (value === '') {
                        callback(new Error('请输入机型值'));
                    } else {
                        checkChannelCodeUnique(value).then(res => {
                            if (res === "true") { //已经存在
                                callback(new Error('机型值已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                }, trigger: 'blur'},
            {min: 1, max: 20, message: '请输入1-20位字符'}
        ],
    };
    editFun = changeChannel;

    render(h) {

        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}机型`}>
                <el-form className="small-space" model={this.formData} rules={this.validateRule} ref="addForm"
                         label-position="right" label-width="180px">
                    <el-form-item label="是否是共享：" prop="isShare">
                        <el-select placeholder="请选择" value={this.formData.isShare} onHandleOptionClick={f => this.formData.isShare = f.value}>
                            <el-option label="非共享" value={0} key={0}/>
                            <el-option label="共享" value={1} key={1}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机型名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="机型值：" prop={this.formData.id ? "" : "code"}>
                        <el-input value={this.formData.code} placeholder="设置后不能修改" name="code" disabled={!!this.formData.id}/>
                    </el-form-item>
                    <el-form-item label="描述" prop="remark">
                        <el-input type="textarea" rows={2} value={this.formData.remark} name='remark'/>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消</el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }
}
