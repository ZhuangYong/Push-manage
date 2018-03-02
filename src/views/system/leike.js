import {mapGetters} from "vuex";
import {updatePic, updateRank, updateRecommend, updateClass, save, leikeGetMediaDb} from '../../api/leike';
import ConfirmDialog from '../../components/confirm';
import {bindData} from "../../utils/index";

const viewRule = [
    {columnKey: 'id', label: 'ID', minWidth: 60, sortable: true},
    {columnKey: 'confName', label: '名称', minWidth: 120, sortable: true},
    {columnKey: 'confValue', label: '版本号', sortable: true},
    {columnKey: 'comment', label: '备注', minWidth: 140},
    {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '从雷客更新数据', type: 'update'}], minWidth: 220}
];

const defaultFormData = {
    confName: '',
    confValue: '',
    comment: ''
};

const topViewRule = [
    {columnKey: 'picture', label: '图片资源版本', minWidth: 140},
    {columnKey: 'rank', label: '榜单资源版本', minWidth: 140},
    {columnKey: 'type', label: '分类资源版本', minWidth: 140},
    {columnKey: 'media', label: '歌星歌曲数据库版本', minWidth: 140, formatter: (r, h) => {
        return <div>
            <span>{r.media}</span>
            <el-button
                size="mini"
                type="primary"
                style={{marginLeft: '10px'}}
                onClick={() => {
                    // console.log('lalallalal');
                    leikeGetMediaDb().then(res => {
                        // console.log(res);
                        location.href = res;
                    }).catch(err => {
                    });
                }}
            >下载</el-button>
        </div>;
    }},
    {columnKey: 'push', label: '推荐资源版本', minWidth: 140},
];

export default {
    data() {
        return {
            status: 'list',
            formData: defaultFormData,
            loading: false,
            submitLoading: false,
            pageAction: 'leike/RefreshPage',
            viewRule: viewRule,
            upgradingIds: [],
            validateRule: {
                confName: [
                    {required: true, message: '请输入配置名称'},
                    {min: 1, max: 16, message: '请输入2-16位字符'}
                ],
                confValue: [
                    {required: true, message: '请输入版本号'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ]
            },
        };
    },
    mounted() {
        this.updateView();
    },
    created: function () {
        this.pageAction && this.refreshData();
    },
    computed: {
        ...mapGetters(['system']),

    },
    render(h) {
        const { data } = this.system.leiKeManage;
        const { configList } = data;

        return (
            <el-row v-loading={ this.submitLoading }>
                {
                    this.status === 'list' ? <div>
                        {this.cacheTableHtml(h, [data], topViewRule)}

                        <el-table
                            border
                            data={configList || []}
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
                                                            (button.type === 'update') &&
                                                            this.isAbleUpgrade(row)
                                                        }>

                                                        {
                                                            button.type === 'update' ? (
                                                                this.isAbleUpgrade(row) ? '更新中...' : '从雷客更新数据'
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
                        </el-table>
                    </div> : this.cruHtml(h)
                }

            </el-row>
        );
    },
    methods: {
        refreshData: function () {
            this.loading = true;
            this.$store.dispatch(this.pageAction).then((res) => {
                this.loading = false;
                this.upgradingIds = [];
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
                    <el-form-item label="备注" prop="comment">
                        <el-input value={this.formData.comment} name="comment"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                                this.refreshData();
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
                        this.submitLoading = true;
                        const { confName, id } = row;
                        const configListConfNames = {
                            'picturesVersion': updatePic,
                            'rankVersion': updateRank,
                            'recommendVersion': updateRecommend,
                            'typeVersion': updateClass,
                        };

                        const { data } = this.system.leiKeManage;
                        const { picture, rank, type, media, push } = data;
                        const upgradeFormData = { picture, rank, type, media, push };

                        configListConfNames[confName](upgradeFormData).then(res => {
                            this.submitLoading = false;
                            this.upgradingIds.push(id);
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    });
                    break;
                case 'add':
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
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
        },

        /**
         * 判断是否可以点击升级按钮
         * @param row
         * @returns {boolean}
         */
        isAbleUpgrade(row) {
            const { data } = this.system.leiKeManage;
            const { judyData } = data;
            if (this.upgradingIds.indexOf(row.id) === -1) {
                const { confValue } = judyData[row.confName] || {confValue: 0};
                return parseInt(confValue, 10) === 0;
            }

            return true;
        },

        /**
         * 返回表格HTML代码段
         * @param h
         * @param data
         * @param viewRule
         * @returns {XML}
         */
        cacheTableHtml(h, data, viewRule) {
            return <div class="table" style="inline;">
                <el-table
                    border
                    data={data}
                    v-loading={this.loading}
                    filter-multiple={this['filter-multiple']}
                    ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%">

                    {
                        viewRule && viewRule.map((viewRuleItem) => (
                            <el-table-column
                                key={this.pageAction + viewRuleItem.columnKey}
                                prop={viewRuleItem.columnKey}
                                sortable={!!viewRuleItem.sortable}
                                scope="scope"
                                label={viewRuleItem.label || viewRuleItem.columnKey}
                                width={viewRuleItem.width || ''}
                                min-width={viewRuleItem.minWidth || 100}
                                fixed={viewRuleItem.fixed || false}
                                formatter={viewRuleItem.buttons ? (row) => {
                                    return (
                                        viewRuleItem.buttons.map(button => (
                                            (!button.condition || (typeof button.condition === "function" && button.condition(row))) && <el-button
                                                size="mini"
                                                type={(button.type === "edit" && "success") || (button.type === "del" && "danger") || (button.type === "auth" && "plain") || "primary"}
                                                onClick={
                                                    () => {
                                                        this.$emit(button.type, row);

                                                    }
                                                }>{button.label}</el-button>
                                        ))
                                    );
                                } : (viewRuleItem.formatter ? (row) => {
                                    return viewRuleItem.formatter(row, h);
                                } : (viewRuleItem.imgColumn ? (row) => {
                                    const _img = typeof viewRuleItem.imgColumn === "function" ? viewRuleItem.imgColumn(row) : row[viewRuleItem.imgColumn] || (row.tails && row.tails[viewRuleItem.imgColumn]);
                                    if (_img) return (<img src={_img} style="height: 30px; margin-top: 6px;"/>);
                                    return '';
                                } : null))}>
                            </el-table-column>
                        ))
                    }
                </el-table>
            </div>;
        },

    }
};
