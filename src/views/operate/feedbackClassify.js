import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {feedbackClassifySave, feedbackClassifyDelete} from '../../api/feedback';

const defaultFormData = {
    questionName: '',
    seq: 1,
    status: 1

};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'seq', label: '排序', minWidth: 70},
                {columnKey: 'questionName', label: '问题分类', minWidth: 120},
                {columnKey: 'feedbackNum', label: '反馈数量', minWidth: 120},
                {columnKey: 'status', label: '状态', minWidth: 70, formatter: r => {
                    if (r.status === 1) return '生效';
                    if (r.status === 0) return '禁用';
                }},
                {columnKey: 'createTime', label: '创建时间', minWidth: 170},
                {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
            ],
            validateRule: {
                questionName: [
                    {required: true, message: '请输入问题分类'}
                ],
                seq: [
                    {required: true, message: '请输入排序序号'},
                    {type: 'number', message: '请输入数字'}
                ],
            },
            listDataGetter: function() {
                return this.operate.feedbackClassifyPage;
            },
            pageAction: 'operate/feedback/classify/RefreshPage',
            pageActionSearch: [{
                column: 'questionName', label: '请输入问题分类', type: 'input', value: ''
            }],
            defaultFormData: defaultFormData, // 默认表单值
            formData: {}, // 表单值
            tableCanSelect: false, // 表单项是否可以选择
            delItemFun: feedbackClassifyDelete,
            addItemFun: feedbackClassifySave,
            updateItemFun: feedbackClassifySave
        };
    },

    computed: {
        ...mapGetters(['operate'])
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_CHANNEL_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                     <el-form-item label="问题分类:" prop="questionName">
                         <el-input value={this.formData.questionName} name="questionName"/>
                     </el-form-item>
                    <el-form-item label="状态：">
                         <el-select placeholder="请选择" value={this.formData.status} onHandleOptionClick={f => this.formData.status = f.value} >
                                <el-option label="禁用" value={0} key={0}/>
                                <el-option label="启用" value={1} key={1}/>
                            </el-select>
                     </el-form-item>
                    <el-form-item label="排序：" prop="seq">
                         <el-input value={this.formData.seq} placeholder="" name="seq" number/>
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

    }
});
