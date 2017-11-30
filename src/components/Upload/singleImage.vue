<template>
    <div class="el-upload-container">
        <el-upload ref="singleImage" :multiple="false" :show-file-list="true" :headers='headers' :on-error="handelErr"
                   :action="actionUrl" :auto-upload="false" list-type="picture"
                   :on-change="handleChange" :on-remove="handelRemove" :on-success="handleImageScucess">
            <el-button ref="chooseBtn" slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <div class="image-preview">
            <div class="image-preview-wrapper" v-show="defaultImg && defaultImg.length>1 && chooseImg && chooseImg.length === 0">
                <img :src="defaultImg">
            </div>
        </div>
    </div>
</template>

<script>
// 预览效果见付费文章
import {getToken} from '../../utils/auth';
import Const from "../../utils/const";

export default {
    name: 'singleImageUpload',
    props: {
        actionUrl: {
            type: String,
            require: true
        },
        defaultImg: {
            type: String,
            default: ""
        },
        singleUp: {
            type: Boolean,
            default: true
        },
        uploadSuccess: {
            type: Function,
            default: f => f
        },
        uploadFail: {
            type: Function,
            default: f => f
        },
        chooseChange: {
            type: Function,
            default: f => f
        }
    },
    data() {
        return {
//            actionUrl: 'http://120.27.250.104:9010/system/upgrade/saveImg',
            headers: {
                token: getToken()
            },
            imageUrl: "",
            chooseImg: [],
            sucData: null,
            success: null,
            fail: null
        };
    },
    methods: {
        handleImageScucess(res) {
            const {msg, status, data} = res;
            if (status === Const.CODE_SUCCESS) {
                const {imageNet} = data;
                this.imageUrl = imageNet;
                this.sucData = data;
                this.success && this.success(data);
            } else {
//                this.$refs.singleImage.clearFiles();
//                this.$refs.chooseBtn.$el.classList.remove("hidden");
//                this.chooseImg = [];
                this.fail && this.fail(msg);
            }
        },
        handleStart({success, fail}) {
            this.success = success;
            this.fail = fail;
            if (this.chooseImg.length === 0) {
                success && success();
            } if (this.sucData) {
                success && success(this.sucData);
            } else {
                this.submit();
            }

        },
        submit() {
            this.$refs.singleImage.submit();
        },
        handelErr(err) {
            this.fail && this.fail(err);
            this.uploadFail && this.uploadFail(err);
        },
        handleChange(file, fileList) {
            if (this.singleUp) {
                if (fileList.length > 0) {
                    this.$refs.chooseBtn.$el.classList.add("hidden");
                    this.chooseImg = fileList;
                }
                if (fileList.length > 1) {
                    fileList.shift();
                }
            }
            this.chooseChange && this.chooseChange(file, fileList);
        },
        handelRemove(file, fileList) {
            if (this.singleUp && fileList.length === 0) {
                this.$refs.chooseBtn.$el.classList.remove("hidden");
                this.chooseImg = [];
                this.sucData = null;
            }
            this.chooseChange && this.chooseChange(file, fileList);
        },

        beforeUpload() {

        }
    }
};
</script>

<style>
    .el-upload-container .el-upload .hidden,.el-upload-container .el-upload-list__item-status-label{
        display: none!important;
    }
    .el-upload-container .el-upload-list__item.is-ready,.el-upload-container .el-upload-list__item.is-success{
        border: none;
        margin: 0;
    }
    .el-upload-container .el-icon-close{
        background: red;
        border-radius: 50%;
        padding: 6px;
        z-index: 3;
        left: -3px;
        right: auto!important;
        top: -3px!important;
        color: white!important;
    }
    .el-upload-container{
        min-height: 80px;
    }
    .el-upload-container ul.el-upload-list{
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100px;
    }
    .el-upload-container .image-preview-wrapper{
        height: 100px;
    }
    .el-upload-container .image-preview-wrapper img{
        height: 100%;
    }
</style>
