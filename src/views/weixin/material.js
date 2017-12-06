import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as saveMaterialFun, materialDelete, materialSingleDelete} from '../../api/weixinMaterial';

const imgFormat = (r, h) => {
    if (r.freeBgImg) return (<img src={r.freeBgImg} style="height: 30px; margin-top: 6px;"/>);
    return '';
};
const defaultData = {
    defaultFormData: {
        name: '',
        title: '',
        ossImage: '',
        image: '',
        remark: '',
        url: '',
        children: []
    },
    viewRule: [
        {columnKey: 'name', label: '图文消息名称', minWidth: 170},
        {columnKey: 'image', label: '头图', minWidth: 120, imgColumn: 'ossImage'},
        {columnKey: 'title', label: '头图标题', minWidth: 120},
        {columnKey: 'url', label: 'URL', minWidth: 120},
        {columnKey: 'remark', label: '摘要', minWidth: 120},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入图文消息名称'}
        ],
        title: [
            {required: true, message: '请输入标题'},
        ],
        url: [
            {required: true, message: '请输入链接地址'},
        ]
    },
    listDataGetter: function() {
        return this.weixin.materialPage;
    },
    pageAction: 'weixin/material/RefreshPage',
    pageActionSearchColumn: [],
    editFun: saveMaterialFun,
    delItemFun: materialDelete
};
export default BaseListView.extend({
    name: 'materialIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null,
            pageAction: _defaultData.pageAction
        };
    },

    computed: {
        ...mapGetters(['weixin'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="top" label-width="120px">
                    <el-form-item label="图文消息名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <div style="border: 1px solid #dedede; padding: 2rem; margin-bottom: 1rem;">
                        <el-form-item label="头标题：" prop="title">
                            <el-input value={this.formData.title} name="title"/>
                        </el-form-item>
                        <el-form-item label="图片：" prop="ossImage">
                            <el-input style="display: none;" type="hidden" value={this.formData.ossImage} name="ossImage"/>
                            <uploadImg ref="upload" defaultImg={this.formData.ossImage} actionUrl={uploadImgApi} autoUpload={true} uploadSuccess={r => {
                                console.log(r);
                                if (r) {
                                    const {imageNet, imgPath} = r;
                                    this.formData.ossImage = imageNet;
                                    this.formData.image = imgPath;
                                }
                            }}/>
                         </el-form-item>
                        <el-form-item label="URL地址：" prop="url">
                            <el-input value={this.formData.url} placeholder="" name="url"/>
                        </el-form-item>
                        <el-form-item label="摘要：">
                            <el-input type="textarea" row={4} value={this.formData.remark} placeholder="" name="remark"/>
                        </el-form-item>
                    </div>
                    {
                        this.formData.children && this.formData.children.map(child => (
                            <div style="border: 1px solid #dedede; padding: 2rem; margin-bottom: 1rem;">
                                <el-form-item label="头标题：">
                                    <el-input value={child.title} onChange={v => {
                                        child.title = v;
                                    }}/>
                                </el-form-item>
                                <el-form-item label="图片：">
                                    <el-input style="display: none;" type="hidden" value={child.ossImage} name="ossImage" />
                                    <uploadImg ref="upload" defaultImg={child.ossImage} actionUrl={uploadImgApi} autoUpload={true} uploadSuccess={r => {
                                        console.log(r);
                                        if (r) {
                                            const {imageNet, imgPath} = r;
                                            child.ossImage = imageNet;
                                            child.image = imgPath;
                                        }
                                    }}/>
                                 </el-form-item>
                                <el-form-item label="URL地址：">
                                    <el-input value={child.url} placeholder="" onChange={v => {
                                        child.url = v;
                                    }}/>
                                </el-form-item>
                                <el-form-item label="摘要：">
                                    <el-input type="textarea" row={4} value={child.remark} placeholder="" onChange={v => {
                                        child.remark = v;
                                    }}/>
                                </el-form-item>
                                {
                                    child.id ? <el-form-item>
                                                    <el-button type="primary" onClick={f => {
                                                        this.submitLoading = true;
                                                        materialSingleDelete(child.id).then(res => {
                                                            this.submitLoading = false;
                                                            this.formData.children = this.formData.children.filter(_child => _child.id !== child.id);
                                                            this.$message({
                                                                message: `操作成功`,
                                                                type: "success"
                                                            });
                                                        }).catch(err => {
                                                            this.submitLoading = false;
                                                            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                                                        });
                                                    }}>删除</el-button>
                                                </el-form-item> : ""
                                }

                            </div>
                        ))
                    }

                    <el-form-item>
                        <el-button type="primary" onClick={f => {
                            this.formData.children.push({
                                title: '',
                                ossImage: '',
                                image: '',
                                remark: '',
                                url: '',
                            });
                        }}>增加副标题</el-button>
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

        topButtonHtml: function (h) {
            return (
                this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                                console.log(this.formData);
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
                    this.$refs.upload.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.formData.ossImage = imageNet;
                                this.formData.image = imgPath;
                            }
                            this.submitForm();
                        }, fail: err => {
                            this.formData.ossImage = '';
                            this.formData.image = '';
                            this.submitLoading = false;
                            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        submitForm() {
            this.submitLoading = true;
            this.editFun && this.editFun(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.status = 'list';
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },
    }
});
