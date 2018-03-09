/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: dataRangePicker.js @author: walljack@163.com @date: 18-3-9 下午5:32 @version: 1.0
 */
import {Vue, Component} from "vue-property-decorator";
import Const from "../../utils/const";
import {isMobile} from "../../utils";

@Component({
    name: "dataRangePicker",
    props: {
        effectTime: {
            type: Array,
            default() {
                return [];
            }
        },
        handelChange: {
            type: Function,
            default: f => f
        },
        vModel: {
            type: String
        }
    }
})
export default class dataRangePicker extends Vue {
    currentEffectTime = this.effectTime;
    render() {
        return isMobile() ? this.mobile() : this.pc();
    }

    pc() {
        return <el-date-picker
            class="table-top-item"
            style="max-width: 300px;"
            type="daterange"
            picker-options={Const.dataRangerOption}
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            value={this.currentEffectTime}
            onInput={v => {
                this.currentEffectTime = v || [];
                const vModel = this.vModel;
                if (vModel) {
                    const elForm = this.$parent.elForm || {};
                    const model = this.$parent.model || elForm.model || {};
                    model[vModel] = this.currentEffectTime;
                }
                this.handelChange(this.currentEffectTime);
            }}
            align="left">
        </el-date-picker>;
    }

    mobile() {
        return <div>
            <el-date-picker
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                value={this.currentEffectTime[0]}
                onInput={v => {
                    this.currentEffectTime[0] = v;
                    const vModel = this.vModel;
                    if (vModel) {
                        const elForm = this.$parent.elForm || {};
                        const model = this.$parent.model || elForm.model || {};
                        model[vModel] = this.currentEffectTime;
                    }
                    this.handelChange(this.currentEffectTime);
                }}
                placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                value={this.currentEffectTime[1]}
                onInput={v => {
                    this.currentEffectTime[1] = v;
                    const vModel = this.vModel;
                    if (vModel) {
                        const elForm = this.$parent.elForm || {};
                        const model = this.$parent.model || elForm.model || {};
                        model[vModel] = this.currentEffectTime;
                    }
                    this.handelChange(this.currentEffectTime);
                }}
                placeholder="结束日期">
            </el-date-picker>
        </div>;
    }
}
