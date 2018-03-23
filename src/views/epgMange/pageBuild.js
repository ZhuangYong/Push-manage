import {mapGetters} from "vuex";
import {add as addPage, del as delPage, edit as editPage} from '../../api/pageBuild';
import BaseListView from "../../components/common/BaseListView";
import JPanel from "../../components/panel/JPanel";

const defaultData = {
    viewRule: [
        {columnKey: 'versionName', label: '版本名称', minWidth: 220, sortable: true},
        {columnKey: 'remark', label: '备注信息', minWidth: 120, sortable: true},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 170, sortable: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    defaultFormData: {
        remark: '',
        screenIds: []
    },
    validRules: {
        versionName: [
            {required: true, message: '请输入版本名称'},
            {min: 1, max: 50, message: '请输入1-50位字符'}
        ],
        remark: [
            {required: true, message: '请输入别名'},
            {min: 1, max: 50, message: '请输入1-50位字符'}
        ],
        screenIds: [
            {required: true, message: '请选择模板'},
        ],
    }
};
export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            selectItems: [], // 选择列
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData, // 表单数据
            defaultCurrentPage: 1,
            viewRule: _defaultData.viewRule,
            validRules: _defaultData.validRules,
            pageActionSearch: [
                {column: 'versionName', label: '请输入版本名称', type: 'input', value: ''},
            ],
            listDataGetter: function() {
                return this.epgMange.epgPage;
            },
            tableCanSelect: false,
            pageAction: 'buildPage/RefreshPage',
            editFun: editPage,
            delItemFun: delPage
        };
    },
    computed: {
        ...mapGetters(['epgMange'])
    },
    created() {
        this.loading = true;
        this.$store.dispatch("screen/list").then((res) => {
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <div>
                     {
                         this.currentPage === this.PAGE_ADD ? <el-row>
                             <el-col xs={24} sm={12}>
                                 <el-card class="box-card" style="margin: .5rem; min-height: 18rem;">
                                    <div slot="header" class="clearfix">
                                        <span>选择模板：</span>
                                    </div>
                                    <div key={JSON.stringify(this.formData.screenIds)}>
                                        {
                                            this.epgMange.screenList && this.epgMange.screenList.map(screen => (
                                                <el-checkbox checked={!!this.formData.screenIds.find(_id => _id === screen.id)} label={screen.id} onChange={(checked, e) => {
                                                    let {value} = e.target;
                                                    value = parseInt(value, 10);
                                                    if (checked) {
                                                        if (!this.formData.screenIds.find(v => v === value)) {
                                                            this.formData.screenIds.push(value);
                                                        }
                                                    } else {
                                                        this.formData.screenIds = this.formData.screenIds.filter(v => v !== value);
                                                    }
                                                    this.$refs.addForm.validateField("screenIds");
                                                }} style="min-width: 7rem; margin: .5rem 0; float: left; ">
                                                    {screen.name}（{screen.remark}）
                                               </el-checkbox>
                                            ))
                                        }
                                   </div>
                                </el-card>
                             </el-col>
                             <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                      ref="addForm" rules={this.validRules} label-position="right" label-width="90px">
                                 <el-col xs={24} sm={12}>
                                    <el-card class="box-card" style="margin: .5rem; min-height: 18rem;">
                                        <div slot="header" class="clearfix">
                                            <span>排序后的顺序：</span>
                                        </div>
                                        <div class="text item">
                                            {
                                                this.formData.screenIds && this.formData.screenIds.map((id, index) => (
                                                    <el-tag
                                                        disable-transitions={false}
                                                        style="color: black; background-color: white; margin: .5rem; border: 1px solid gray;"
                                                        onClose={f => {
                                                            this.formData.screenIds = this.formData.screenIds.filter(_id => _id !== id);
                                                        }}
                                                    >
                                                        {index + 1}.
                                                        {(this.epgMange.screenList.find(s => s.id === id) || {}).name || ""}
                                                    </el-tag>
                                                ))
                                            }
                                        </div>
                                        <el-form-item label-width="0" prop="screenIds"/>
                                    </el-card>
                                 </el-col>
                                 <el-form-item label="别名：" prop="remark">
                                     <el-col xs={24}>
                                         <el-input value={this.formData.remark}onChange={v => this.formData.remark = v}/>
                                     </el-col>
                                 </el-form-item>
                             </el-form>
                         </el-row> : <el-row>
                             <JPanel title={`${this.formData.id ? "修改" : "添加"}EPG信息`}>
                                 <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                       ref="addForm" rules={this.rules} label-position="right" label-width="90px">
                                     <el-form-item label="版本名称" prop="versionName">
                                         <el-input value={this.formData.versionName} name='versionName'/>
                                     </el-form-item>
                                     <el-form-item label="Json Data" prop="data">
                                         <el-input value={this.formData.data} name='data' disabled={true}/>
                                     </el-form-item>
                                     <el-form-item label="别名：" prop="remark">
                                         <el-input value={this.formData.remark} name='remark'/>
                                     </el-form-item>
                                 </el-form>
                             </JPanel>
                         </el-row>
                     }
                    <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                    <el-button onClick={
                        () => {
                            this.pageBack();
                        }
                    }>取消
                    </el-button>
                </div>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, this.defaultFormData);
                            this.formData.screenIds = [];
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.submitLoading = true;
            if (this.currentPage === this.PAGE_EDIT) {
                editPage(this.formData).then(res => {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                    this.submitLoading = false;
                    this.goPage(this.PAGE_LIST);
                }).catch(err => {
                    this.submitLoading = false;
                });
            } else if (this.currentPage === this.PAGE_ADD) {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        addPage(Object.assign({}, this.formData)).then(res => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.goPage(this.PAGE_LIST);
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    } else {
                        this.submitLoading = false;
                    }
                });

            }
        },
    }
});
