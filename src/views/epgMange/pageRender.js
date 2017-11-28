import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {del as deleteScreen, save as saveScreen} from "../../api/screen";
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import uploadImg from '../../components/Upload/singleImage.vue';

const viewRule = [
    {columnKey: 'name', label: '名称', minWidth: 140},
    {columnKey: 'defineName', label: '数据绑定'},
    {columnKey: 'epgVersionName', label: '背景', formatter: (r, h) => {
        if (r.imageNet) return (<img src={r.imageNet} style="height: 30px; margin-top: 6px;"/>);
        return '';
    }},
    {columnKey: 'status', label: '状态', formatter: r => {
        if (r.status === 1) return '生效';
        if (r.status === 2) return '禁用';
        if (r.status === 3) return '删除';
    }},
    {columnKey: 'createTime', label: '创建日期', minWidth: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const defaultFormData = {
    name: '',
    defineId: '',
    imageNet: '',
    image: '',
    sort: '',
    remark: '',
    status: 2, // 1 生效 2 禁用
};
const validRules = {
    channelCode: [
        {required: true, message: '请选择', trigger: 'blur'},
    ]
};
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            formData: defaultFormData, // 表单数据
            userGroup: [],
            upgrade: [],
            romList: [],
            appList: [],
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
        };
    },
    computed: {
        ...mapGetters(['epgMange', 'system'])
    },
    created() {
        this.refreshPageList();
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = defaultFormData;
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'screen/RefreshPage'} data={this.epgMange.screenPage}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
                }
                <ConfirmDialog
                    visible={this.dialogVisible}
                    tipTxt={this.tipTxt}
                    handelSure={this.sureCallbacks}
                    handelCancel={() => {
                        this.dialogVisible = false;
                    }}
                />
            </el-row>
        );
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="left" label-width="70px">
                     <el-form-item label="名称" props="name">
                         <el-input value={this.formData.name} name="name"/>
                     </el-form-item>

                    <el-form-item label="数据绑定" props="defineId">
                        <el-select placeholder="请选择" value={this.formData.defineId} name='defineId'>
                            {
                                this.system.funpageList && this.system.funpageList.map(u => (
                                    <el-option label={u.name} value={u.id} key={u.id}/>
                                ))
                            }
                            </el-select>
                    </el-form-item>
                    <el-form-item label="背景">
                         <uploadImg ref="upload" defaultImg={this.formData.imageNet}/>
                     </el-form-item>
                    <el-form-item label="排序" props="sort">
                         <el-input value={this.formData.sort} name="sort"/>
                     </el-form-item>
                    <el-form-item label="状态" props="status">
                        <el-radio-group value={this.formData.status} name='status'>
                            <el-radio value={1} label={1}>生效</el-radio>
                            <el-radio value={2} label={2}>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} value={this.formData.remark} name='remark'/>
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

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                        this.$refs.upload.handleStart({
                            success: r => {
                                if (r) {
                                    const {imageNet, imgPath} = r;
                                    this.formData.imageNet = imageNet;
                                    this.formData.image = imgPath;
                                }
                                saveScreen(this.formData).then(res => {
                                    this.$message({
                                        message: "添加成功",
                                        type: "success"
                                    });
                                    this.submitLoading = false;
                                    this.status = 'list';
                                }).catch(err => {
                                    this.submitLoading = false;
                                });
                            }, fail: err => {
                                this.formData.imageNet = '';
                                this.formData.image = '';
                                this.submitLoading = false;
                            }
                        });
                } else {
                    return false;
                }
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const id = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                deleteScreen(id).then(response => {
                    this.loading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        refreshPageList() {
            this.loading = true;
            this.$store.dispatch("fun/pageList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        }
    }
};
