<template>
    <div class="el-upload-container">
        <el-upload ref="singleApk" :multiple="false" :show-file-list="true" :headers='headers' :on-error="handelErr"
                   :action="actionUrl" :auto-upload="true" list-type="text" :before-upload="handelBeforeUpload"
                   accept='.apk' :on-change="handleChange" :on-remove="handelRemove" :on-success="handleImageSuccess">
            <el-button ref="chooseBtn" slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
    </div>
</template>

<script>
// 预览效果见付费文章
import {getToken} from '../../utils/auth';
import Const from "../../utils/const";

export default {
    name: 'singleApkUpload',
    props: {
        actionUrl: {
            type: String,
            require: true
        },
        singleUp: {
            type: Boolean,
            default: true
        },
        beforeUpload: {
            type: Function,
            default: f => f
        },
        uploadSuccess: {
            type: Function,
            default: f => f
        },
        uploadFail: {
            type: Function,
            default: f => f
        },
        handelEmpty: {
            type: Function,
            default: f => f
        }
    },
    data() {
        return {
            headers: {
                token: getToken()
            },
            imageUrl: "",
            chooseImg: [],
            sucData: {},
            fail: null,
        };
    },
    methods: {
        handleImageSuccess(res) {
            const {msg, status, data} = res;
            if (status === Const.CODE_SUCCESS) {
                this.uploadSuccess && this.uploadSuccess(data);
            } else {
                this.$refs.singleApk.clearFiles();
                this.$refs.chooseBtn.$el.classList.remove("hidden");
                this.uploadFail && this.uploadFail(msg);
            }
        },
        handelErr(err) {
            this.$refs.singleApk.clearFiles();
            this.$refs.chooseBtn.$el.classList.remove("hidden");
            this.uploadFail && this.uploadFail(err);
        },
        handleChange(file, fileList) {
            if (this.singleUp) {
                if (fileList.length > 0) {
                    this.$refs.chooseBtn.$el.classList.add("hidden");
                }
                if (fileList.length > 1) {
                    fileList.shift();
                }
            }
        },
        handelRemove(file, fileList) {
            if (this.singleUp && fileList.length === 0) {
                this.$refs.chooseBtn.$el.classList.remove("hidden");
                // this.uploadFail && this.uploadFail();
                this.handelEmpty && this.handelEmpty();
            }
        },
        handelBeforeUpload(file) {
            if (this.beforeUpload) return this.beforeUpload(file);
            return true;
        }
    }
};
</script>

<style>
    .el-upload-container .el-upload .hidden{
        display: none;
    }
    .el-upload-container .el-upload-list__item.is-ready{
        border: none;
        margin: 0;
    }
    .el-upload-container .el-icon-close{
        background: red;
        border-radius: 50%;
        padding: 6px;
        z-index: 3;
        left: 1px;
        right: auto!important;
        top: 1px!important;
        color: white!important;
    }
    .el-upload-container ul.el-upload-list{
        top: 0;
        left: 0;
    }
    .el-upload-container .image-preview-wrapper img{
        height: 100%;
        margin-top: 7px;
    }
</style>
