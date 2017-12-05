import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {feedbackSave, feedbackDelete} from '../../api/feedback';

const defaultFormData = {
    id: '',
    remark: '',
    content: ''

};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'nickname', label: '昵称', minWidth: 120},
                {columnKey: 'tails', label: '问题类型', minWidth: 180, formatter: r => r.tails.questionName},
                {columnKey: 'questionDesc', label: '问题描述', minWidth: 180},
                {columnKey: 'deviceUuid', label: '设备编号', minWidth: 220},
                {columnKey: 'channelName', label: '机型', minWidth: 180},
                {columnKey: 'submitTime', label: '提交时间', minWidth: 170},
                {columnKey: 'remark', label: '备注', minWidth: 180},
                {columnKey: 'replyStatus', label: '回复状态', minWidth: 100},
                {label: '操作', buttons: [{label: '回复/备注', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 150}
            ],
            validateRule: {
                remark: [
                    {required: true, message: '请输入备注'}
                ],
                content: [
                    {required: true, message: '请输入回复'}
                ],
            },
            listDataGetter: function() {
                return this.operate.feedbackPage;
            },
            pageAction: 'operate/feedback/RefreshPage',
            defaultFormData: defaultFormData, // 默认表单值
            formData: {}, // 表单值
            tableCanSelect: false, // 表单项是否可以选择
            delItemFun: feedbackDelete,
            updateItemFun: feedbackSave
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
                         <el-input style="display: none;" type="hidden" value={this.formData.id} name="tag"/>
                     <el-form-item label="问题分类:">
                         <el-input value={this.formData.tails.questionName} disabled={true}/>
                     </el-form-item>
                    <el-form-item label="问题描述：">
                         <el-input value={this.formData.questionDesc} placeholder="设置后不能修改" disabled={true}/>
                     </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                         <el-input type="textarea" rows={4} value={this.formData.remark} placeholder="" name="remark"/>
                     </el-form-item>
                    <el-form-item label="回复：" prop="content">
                         <el-input type="textarea" rows={4} value={this.formData.content} placeholder="" name="content"/>
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

        topButtonHtml: f => ""
    }
});
