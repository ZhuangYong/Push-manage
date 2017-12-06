import {mapGetters} from "vuex";
import {updatePic, updateRank, updateRecommend, updateClass, save} from '../../api/leike';
import ConfirmDialog from '../../components/confirm';
import {bindData} from "../../utils/index";

const viewRule = [
    {columnKey: 'id', label: 'ID', minWidth: 60},
    {columnKey: 'confName', label: '名称', minWidth: 120},
    {columnKey: 'confValue', label: '版本号'},
    {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '从雷克更新输数据', type: 'update'}]}
];

const defaultFormData = {
    confName: '',
    confValue: '',
    type: 1
};

export default {
    data() {
        return {
            status: 'list',
            formData: defaultFormData,
            loading: false,
            submitLoading: false,
            pageAction: 'leike/RefreshPage',
            viewRule: viewRule,
            disabled: [false, false, false, false],
            buttons: ["从雷克更新输数据", "从雷克更新输数据", "从雷克更新输数据", "从雷克更新输数据"],
            validateRule: {
                confName: [
                    {required: true, message: '请输入配置名称'},
                    {min: 2, max: 16, message: '请输入2-16位字符'}
                ],
                confValue: [
                    {required: true, message: '请输入版本号'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ]
            }
        };
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    created: function () {
        this.pageAction && this.refreshData();
    },
    computed: {
        ...mapGetters(['system']),

    },
    render(h) {
        return (
            <el-row>
                {
                    this.status === 'list' ? <el-table
                        border
                        data={(this.system.leiKeManage).data}
                        v-loading={this.loading}
                        ref="multipleTable"
                        tooltip-effect="dark"
                        style="width: 100%">
                        {
                            this.viewRule && this.viewRule.map((viewRuleItem) => (
                                <el-table-column
                                    prop={viewRuleItem.columnKey}
                                    scope="scope"
                                    label={viewRuleItem.label || viewRuleItem.columnKey}
                                    width={viewRuleItem.width || ''}
                                    min-width={viewRuleItem.minWidth || 100}
                                    fixed={viewRuleItem.fixed || false}
                                    formatter={viewRuleItem.buttons ? (row) => {
                                        return (
                                            viewRuleItem.buttons.map(button => (
                                                <el-button
                                                    size="mini"
                                                    type={(button.type === "edit" && "success") || (button.type === "update" && "plain")}
                                                    onClick={
                                                        () => {
                                                            this.$emit(button.type, row);

                                                        }
                                                    }
                                                    disabled={
                                                        (button.type === 'update') && (this.system.leiKeManage.judyData[row.num].confValue === "0")
                                                    }
                                                >
                                                    {
                                                        button.type === 'update' ? (
                                                            this.system.leiKeManage.judyData && this.system.leiKeManage.judyData.map(item => {
                                                                if (row.num === item.num) {
                                                                    if (item.confValue === "0") {
                                                                        this.disabled[row.num] = true;
                                                                        this.buttons[row.num] = "更新中...";
                                                                        return this.buttons[row.num];
                                                                    } else if (item.confValue === "1") {
                                                                        this.disabled[row.num] = false;
                                                                        this.buttons[row.num] = "从雷克更新输数据";
                                                                        return this.buttons[row.num];
                                                                    }
                                                                }
                                                            })
                                                        ) : button.label
                                                    }

                                                </el-button>
                                            ))
                                        );
                                    } : (viewRuleItem.formatter ? (row) => {
                                        return viewRuleItem.formatter(row, h);
                                    } : null)}>
                                </el-table-column>
                            ))
                        }
                    </el-table> : this.cruHtml(h)
                }

            </el-row>
        );
    },
    methods: {
        refreshData: function () {
            this.loading = true;
            this.$store.dispatch(this.pageAction).then((res) => {
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="配置名称" prop="confName">
                        <el-input value={this.formData.confName} name="confName"/>
                    </el-form-item>
                    <el-form-item label="版本号" prop="confValue">
                        <el-input value={this.formData.confValue} name="confValue"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },
        updateView: function() {
            switch (this.status) {
                case 'list':
                    this.$on('edit', (row) => {
                       this.status = "edit";
                       this.formData = row;
                    });


                    this.$on('update', (row) => {
                        const id = row.id;
                        if (id === 4) {
                            updatePic().then(res => {
                                this.system.leiKeManage.judyData[row.num].confValue = "0";
                            }).catch(err => {
                            });
                        } else if (id === 5) {
                            updateRank().then(res => {
                                this.system.leiKeManage.judyData[row.num].confValue = "0";
                            }).catch(err => {
                            });
                        } else if (id === 6) {
                            updateRecommend().then(res => {
                                this.system.leiKeManage.judyData[row.num].confValue = "0";
                            }).catch(err => {
                            });
                        } else if (id === 7) {
                            updateClass().then(res => {
                                this.system.leiKeManage.judyData[row.num].confValue = "0";
                            }).catch(err => {
                            });
                        }
                    });

                    break;
                case 'add':
                    break;
                case 'edit':
                    break;
                default:
                    break;
            }
        },
        submitAddOrUpdate: function() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        save(this.formData).then(response => {
                            this.$message({
                                message: this.status === 'add' ? "添加成功" : "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        }

    }
};
