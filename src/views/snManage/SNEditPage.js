/**
 * Created by Zed on 2018/5/12.
 */

import BasePage from "../../components/common/BasePage";
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import JPanel from "../../components/panel/JPanel";
import {snSave} from "../../api/snManage";

@Component({name: "SNEditPage", components: {JPanel}})
export default class SNEditPage extends BasePage {

    defaultFormData = {
        number: '',
        manufacturer: '',
        productModel: '',
        batch: '',
        wifimacType: 1,
        macType: 1,
        remark: '',
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
        manufacturer: [
            {required: true, message: '请输入生成厂家'},
            {validator: (rule, value, callback) => {
                    if (/^[A-Z]{2}$/.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入2位大写字母'));
                    }
                }, trigger: 'blur'},
        ],
        productModel: [
            {required: true, message: '请输入产品型号'},
            {validator: (rule, value, callback) => {
                    if (/^[A-Z]{2}\d{2}$/.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入2位大写字母加2位数字'));
                    }
                }, trigger: 'blur'},
        ],
        batch: [
            {required: true, message: '请输入批次'},
            {validator: (rule, value, callback) => {
                    if (/^\d{2}$/.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入2位数字'));
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = snSave;

    constructor() {
        super();
    }

    created() {

    }

    render() {
        return (
            <JPanel title={`生成SN号`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="数量：" prop="number">
                        <el-input value={this.formData.number} name="number"/>
                    </el-form-item>

                    <el-form-item label="生产厂家：" prop="manufacturer">
                        <el-input value={this.formData.manufacturer} name="manufacturer"/>
                    </el-form-item>

                    <el-form-item label="产品型号：" prop="productModel">
                        <el-input value={this.formData.productModel} name="productModel"/>
                    </el-form-item>

                    <el-form-item label="批次：" prop="batch">
                        <el-input value={this.formData.batch} name="batch"/>
                    </el-form-item>

                    <el-form-item label="WIFIMAC：" prop="wifimacType">
                        <el-radio-group value={this.formData.wifimacType} name="wifimacType">
                            <el-radio value={1} label={1}>真实</el-radio>
                            <el-radio value={2} label={2}>虚拟</el-radio>
                            <el-radio value={3} label={3}>不生成</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="MAC：" prop="macType">
                        <el-radio-group value={this.formData.macType} name="macType">
                            <el-radio value={1} label={1}>真实</el-radio>
                            <el-radio value={2} label={2}>虚拟</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.formData.remark} name='remark'/>
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
