/**
 * Created by Zed on 2018/5/12.
 */

import BasePage from "../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import JPanel from "../../components/panel/JPanel";
import {macSave} from "../../api/snManage";

@Component({name: "MACEditPage", components: {JPanel}})
export default class MACEditPage extends BasePage {

    defaultFormData = {
        number: '',
    };
    validateRule = {
        number: [
            {required: true, message: '请输入数量'},
            {validator: (rule, value, callback) => {
                    const v = parseInt(value, 10);
                    if (v > 0 && v < 999999) {
                        callback();
                    } else {
                        callback(new Error('请输入1~999999内的数字'));
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = macSave;

    constructor() {
        super();
    }

    created() {

    }

    render() {
        return (
            <JPanel title={`生成虚拟MAC地址`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="数量：" prop="number">
                        <el-input value={this.formData.number} name="number"/>
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
