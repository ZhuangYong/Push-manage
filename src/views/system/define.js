import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {save as defineSave, del as delItemFun} from '../../api/define';
import JPanel from "../../components/panel/JPanel";

const defaultFormData = {
    name: '',
    identify: '',
    namespace: '',
    type: 1 //1列表，2详情
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
                    if (r.type === 1) return '列表';
                    if (r.type === 2) return '详情';
                }},
                {columnKey: 'createName', label: '创建者', sortable: true, inDetail: true},
                {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
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
            editFun: defineSave,
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
                <JPanel title={`${this.formData.id ? "修改" : "添加"}数据定义`}>
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
                                    this.goPage(this.PAGE_LIST);
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                </JPanel>
            );
        },
        topButtonHtml: function(h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, this.defaultFormData);
                            this.owned = [];
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },
    }
});
