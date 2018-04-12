/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: treeSelect.js @author: walljack@163.com @date: 18-4-12 下午3:30 @version: 1.0
 */

import _ from "lodash";
import {Component, Vue, Watch} from "vue-property-decorator";

@Component({
    name: "TreeSelect",
    props: {
        handelNodeClick: {
            type: Function,
            default: f => f
        },
        treeData: {
            type: Array,
            default: () => []
        },
        childrenKey: {
            type: String,
            default: "children"
        },
        labelKey: {
            type: String,
            default: "name"
        },
        valueKey: {
            type: String,
            default: ""
        },
        multiple: {
            type: Boolean,
            default: false
        },
        placeHolder: {
            type: String,
            default: "请选择"
        }
    }
})
export default class TreeSelect extends Vue {
    checkArr = [];
    usedArr = [];
    render() {
        return <el-dropdown
            trigger="click"
            hide-on-click={false}
            ref="dropMenu"
            onVisible-change={v => {
                v && this.multiple && this.$refs.tree && this.$refs.tree.setCheckedNodes(this.usedArr);
            }}
            placement="bottom-start">
            <el-button type="primary" style={`background-color: white; padding: 11px 20px; border-color: #dddfe6;color: ${this.usedArr.length ? "black;" : "#c1c4cc"}`}>
                <font style="max-width: 100px; text-overflow: ellipsis; overflow: hidden; display: inline-block;">{this.usedArr.length ? this.usedArr.map(item => item[this.labelKey]).join(",") : this.placeHolder}</font>
                <i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="background: white;">
                    {
                        this.treeData.length ? <el-tree
                            style="min-height: 300px; min-width: 260px; overflow: auto; border: 1px solid #d1dbe5;border-top:1px solid whitesmoke;"
                            data={this.treeData}
                            check-strictly={true}
                            expand-on-click-node={true}
                            show-checkbox
                            node-key="id"
                            props={{
                                children: this.childrenKey,
                                label: this.labelKey
                            }}
                            ref="tree"
                            default-checked-keys={this.defaultChecked}
                            // onNode-click={date => {
                            //     this.$refs.dropMenu.$emit("visible", false);
                            //     !this.multiple && this.handelNodeClick(date);
                            // }}
                            onCheck-change={(data, checked) => {
                                if (!this.multiple) {
                                    if (checked) {
                                        this.$refs.tree.setCheckedNodes([data]);
                                    }
                                }
                                if (checked) {
                                    !this.checkArr.some(checkedItem => _.isEqual(checkedItem, data)) && this.checkArr.push(data);
                                } else {
                                    this.checkArr = this.checkArr.filter(checkedItem => !_.isEqual(checkedItem, data));
                                }
                            }}
                            highlight-current
                            default-expand-all>
                        </el-tree> : <p class="el-select-dropdown__empty" style="min-height: 300px;">暂无数据</p>
                    }
                </el-dropdown-item>
                {
                    this.treeData.length ? <el-dropdown-item style="margin: 10px 0; float: right; background: white;">
                        <el-button onClick={() => {
                            this.$refs.dropMenu.hide();
                        }}>取消</el-button>
                        <el-button type="primary" onClick={() => {
                            this.$refs.dropMenu.hide();
                            if (!this.multiple) {
                                if (this.checkArr.length) {
                                    this.handelNodeClick(this.valueKey ? this.checkArr[0][this.valueKey] : this.checkArr[0]);
                                } else {
                                    this.handelNodeClick(this.valueKey ? "" : {});
                                }
                            } else {
                                if (this.valueKey) {
                                    this.handelNodeClick(this.checkArr.map(i => i[this.valueKey]));
                                } else {
                                    this.handelNodeClick(this.checkArr);
                                }
                            }
                            this.usedArr = _.cloneDeep(this.checkArr);
                        }}>确定</el-button>
                    </el-dropdown-item> : ""
                }
            </el-dropdown-menu>
        </el-dropdown>;
    }
}
