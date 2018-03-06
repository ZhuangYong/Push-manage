/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: select.js @author: walljack@163.com @date: 18-3-1 下午7:37 @version: 1.0
 */
import _ from "lodash";
import {Component, Vue, Watch} from "vue-property-decorator";

@Component({
    name: "select",
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        value: {
            type: String | Number,
            default: ""
        },
        emptyLabel: {
            type: String,
            default: ""
        },
        options: {
            type: Array,
            default: () => []
        },
        "v-model": {
            type: String
        },
        multiple: {
            type: Boolean,
            default: false
        },
        handelSelectChange: {
            type: Function,
            default: f => f
        }
    }
})
export default class Select extends Vue {
    currentValue = this.value || this.multiple ? [] : "";

    @Watch("options", {immediate: true, deep: true})
    onOptionChange(v, ov) {
        if (!_.isEqual(v, ov)) this.currentValue = this.multiple ? [] : "";
    }

    render() {
        return <el-select value={this.currentValue} placeholder={this.placeholder || "请选择"} onInput={f => {
            const vModel = this.vModel;
            this.currentValue = f;
            if (vModel) {
                const elForm = this.$parent.elForm || {};
                const model = this.$parent.model || elForm.model || {};
                model[vModel] = f;
            }
            this.handelSelectChange(f);
        }} multiple={this.multiple}>
            {
                !this.multiple && !_.isEmpty(this.currentValue) && !_.isEmpty(this.emptyLabel) ? <el-option label="" value="" key="">{this.emptyLabel}</el-option> : ""
            }
            {
                this.options.map(u => (
                    <el-option label={u.label} value={u.value} key={u.value}/>
                ))
            }
        </el-select>;
    }
}
