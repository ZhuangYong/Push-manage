import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {searchSave, searchDelete} from '../../api/search';

const defaultFormData = {
    seq: 1,
    tag: '',
};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'seq', label: '排序', minWidth: 90, sortable: true},
                {columnKey: 'tag', label: '搜索关键字', minWidth: 180},
                {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
            ],
            validateRule: {
                seq: [
                    {required: true, message: '请输入排序数字'},
                    {type: 'number', message: '必须为数字值'}
                ],
                tag: [
                    {required: true, message: '请输入搜索关键字'},
                    {min: 1, max: 20, message: '请输入1-20位字符'}
                ],
            },
            listDataGetter: function() {
                return this.operate.searchPage;
            },
            pageAction: 'operate/search/RefreshPage',
            pageActionSearch: [{
                column: 'tag', label: '请输入关键字', type: 'input', value: ''
            }],
            defaultFormData: defaultFormData, // 默认表单值
            formData: {}, // 表单值
            tableCanSelect: false, // 表单项是否可以选择
            delItemFun: searchDelete,
            addItemFun: searchSave,
            updateItemFun: searchSave
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
                     <el-form-item label="搜索关键字:" prop="tag">
                         <el-input value={this.formData.tag} name="tag"/>
                     </el-form-item>
                    <el-form-item label="排序：" prop="seq">
                         <el-input value={this.formData.seq} placeholder="设置后不能修改" name="seq" number/>
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
