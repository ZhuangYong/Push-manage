import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView1';
import {save as configSave} from '../../api/config';

const defaultFormData = {
    confName: '',
    confValue: '',
    type: 1
};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'id', label: 'ID', minWidth: 60},
                {columnKey: 'confName', label: '配置名称', minWidth: 120},
                {columnKey: 'confValue', label: '配置值'},
                {columnKey: 'type', label: '类型', formatter: r => {
                    if (r.type === 1) return '系统配置';
                    if (r.type === 2) return '会员配置';
                    if (r.type === 3) return '支付配置';
                }}
            ],
            validateRule: {
                confName: [
                    {required: true, message: '请输入配置名称'},
                    {min: 2, max: 16, message: '请输入2-16位字符'}
                ],
                confValue: [
                    {required: true, message: '请输入配置值'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ]
            },
            listDataGetter: function() {
                return this.system.configManage;
            },
            pageAction: 'config/RefreshPage',
            defaultFormData: defaultFormData, // 默认表单值
            tableCanSelect: false, // 表单项是否可以选择
            formData: {} // 表单值
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
                    <el-form-item label="配置名称" prop="confName">
                        <el-input value={this.formData.confName} name="confName"/>
                    </el-form-item>
                    <el-form-item label="配置值" prop="confValue">
                        <el-input value={this.formData.confValue} name="confValue"/>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} name='type'>
                            <el-option
                                value={1}
                                label="系统配置"
                                key={1}>
                            </el-option>
                            <el-option
                                value={2}
                                label="会员配置"
                                key={2}>
                            </el-option>
                            <el-option
                                value={3}
                                label="支付配置"
                                key={3}>
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
                </el-form>
            );
        },
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        configSave(this.formData).then(response => {
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
