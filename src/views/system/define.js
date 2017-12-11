import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView1';
import {save as defineSave, del as delItemFun} from '../../api/define';

const defaultFormData = {
    name: '',
    identify: '',
    namespace: '',
    type: 1
};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'name', label: '数据名称', minWidth: 120},
                {columnKey: 'identify', label: '标志'},
                {columnKey: 'namespace', label: '命名空间'},
                {columnKey: 'type', label: '类型', formatter: r => {
                    if (r.type === 1) return '详情';
                    if (r.type === 2) return '列表';
                }},
                {columnKey: 'createName', label: '创建人'},
                {columnKey: 'createTime', label: '创建日期', minWidth: 170},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
            ],
            validateRule: {
                name: [
                    {required: true, message: '请输入数据名称'},
                    {min: 4, max: 16, message: '请输入4-16位字符'}
                ],
                identify: [
                    {required: true, message: '请输入标志'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ],
                namespace: [
                    {required: true, message: '请输入命名空间'},
                    {min: 1, max: 20, message: '请输入1-20位字符'}
                ]

            },
            listDataGetter: function() {
                return this.system.defineManage;
            },
            pageAction: 'define/RefreshPage',
            defaultFormData: defaultFormData, // 默认表单值
            tableCanSelect: false, // 表单项是否可以选择
            formData: {}, // 表单值
            delItemFun: delItemFun,
            filters: {
                name: ''
            }
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
        filterHtml: function(h) {
            return (
                <el-form model={this.filters} inline ref="filterData">
                    <el-form-item>
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, this.defaultFormData);
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </el-form-item>
                    <el-form-item label="" prop="name">
                        <el-input value={this.filters.name} placeholder="请输入名称" name="name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.$refs.Vtable.refreshData({
                                currentPage: 1,
                                name: this.filters.name
                            });
                        }}>搜索</el-button>
                    </el-form-item>

                </el-form>
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
