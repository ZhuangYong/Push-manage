import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {save as defineSave, del as delItemFun} from '../../api/define';

const defaultFormData = {
    name: '',
    identify: '',
    namespace: '',
    type: 1 //1详情，2列表
};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'name', label: '数据名称', minWidth: 140, sortable: true},
                {columnKey: 'identify', label: '标志', sortable: true},
                {columnKey: 'namespace', label: '命名空间', minWidth: 140, sortable: true},
                {columnKey: 'type', label: '类型', formatter: r => {
                    if (r.type === 1) return '详情';
                    if (r.type === 2) return '列表';
                }},
                {columnKey: 'createName', label: '创建人', sortable: true},
                {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
            ],
            validateRule: {
                name: [
                    {required: true, message: '请输入数据名称'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ],
                identify: [
                    {required: true, message: '请输入标志'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ],
                namespace: [
                    {required: true, message: '请输入命名空间'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ]

            },
            listDataGetter: function() {
                return this.system.defineManage;
            },
            pageActionSearch: [
                {column: 'name', label: '请输入名称', type: 'input', value: ''},
            ],
            pageAction: 'define/RefreshPage',
            defaultFormData: defaultFormData, // 默认表单值
            tableCanSelect: false, // 表单项是否可以选择
            formData: {}, // 表单值
            delItemFun: delItemFun
        };
    },

    computed: {
        ...mapGetters(['system'])
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="数据名称" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="标志" prop="identify">
                        <el-input value={this.formData.identify} name="identify"/>
                    </el-form-item>
                    <el-form-item label="命名空间" prop="namespace">
                        <el-input value={this.formData.namespace} name="namespace"/>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} name='type'>
                            <el-option
                                value={1}
                                label="列表"
                                key={1}>
                            </el-option>
                            <el-option
                                value={2}
                                label="详情"
                                key={2}>
                            </el-option>
                        </el-select>
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
        topButtonHtml: function(h) {
            return (
                this.status === "list" ? <div class="filter-container" style="float: left;margin: 12px 12px 12px 0;">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, this.defaultFormData);
                            this.owned = [];
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        defineSave(this.formData).then(response => {
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
});
