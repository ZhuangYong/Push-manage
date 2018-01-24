import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {feedbackClassifySave, feedbackClassifyDelete, feedbackReply} from '../../api/feedback';
import {languageList} from "../../api/language";

const defaultData = {
        viewRule: [
            {columnKey: 'seq', label: '排序', minWidth: 90, sortable: true},
            {columnKey: 'name', label: '问题分类', minWidth: 120},
            {columnKey: 'feedbackNum', label: '反馈数量', minWidth: 120},
            {columnKey: 'status', label: '状态', minWidth: 70, formatter: r => {
                if (r.isEnabled === 1) return '生效';
                if (r.isEnabled === 0) return '禁用';
            }},
            {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
            {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
        ],
        validateRule: {
            name: [
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
            column: 'name', label: '请输入问题分类', type: 'input', value: ''
        }],
        pageActionSearchColumn: [],
        defaultFormData: {
            name: '',
            nameKey: '',
            seq: 1,
            isEnabled: 1,
            map: {
                nameKey: {},
            },
        }, // 默认表单值
        formData: {}, // 表单值
        tableCanSelect: false, // 表单项是否可以选择
};

export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            tableCanSelect: false,
            pageAction: _defaultData.pageAction,
            validateRule: _defaultData.validateRule,
            selectItems: [],
            delItemFun: feedbackClassifyDelete,
            editFun: feedbackClassifySave,
        };
    },

    computed: {
        ...mapGetters(['operate'])
    },
    created() {
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_CHANNEL_SAVE_IMAGE;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    {
                        this.lanList.length > 0 ? <el-form-item label="问题分类：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("txt",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "名称：",
                                                    getValue: v => this.formData.map.nameKey[lanItem.language],
                                                    onChange: v => this.formData.map.nameKey[lanItem.language] = v,
                                                    placeholder: `请输入${lanItem.name}名称`,
                                                };
                                            })
                                        )} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }
                    <el-form-item label="状态：">
                         <el-select placeholder="请选择" value={this.formData.isEnabled} onHandleOptionClick={f => this.formData.isEnabled = f.value} >
                                <el-option label="禁用" value={0} key={0}/>
                                <el-option label="启用" value={1} key={1}/>
                            </el-select>
                     </el-form-item>
                    <el-form-item label="排序：" prop="seq">
                         <el-input value={this.formData.seq} onChange={v => this.formData.seq = parseInt(v, 10)} number/>
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
            );
        },
        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ''
            );
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },
        showList: function () {
            setTimeout(f => {
                let _thisData = defaultData[this.listStatus + 'Data'];
                const id = this.listStatus !== 'list' ? this.selectItems.id : null;
                for (let key in _thisData) {
                    this[key] = _thisData[key];
                }
                this.enableDefaultCurrentPage = !id;
                if (this.listStatus !== 'list') {
                    this.pageActionSearchColumn = [{
                        id: id
                    }];
                }
            }, 50);
        },
        historyBack: function () {
            const lastPage = this.preStatus.pop();
            this.listStatus = lastPage;
            this.showList();
        },
    }
});
