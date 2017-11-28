<template>
    <div class="el-upload-container">
        <el-upload ref="singleImage" :multiple="false" :show-file-list="true" :headers='headers'
                   :action="actionUrl" :auto-upload="false" list-type="picture" :on-preview="handlePreview"
                   :on-change="handleChange" :on-remove="handelRemove" :on-success="handleImageScucess">
            <el-button ref="chooseBtn" slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <div class="image-preview">
            <div class="image-preview-wrapper" v-show="defaultImg.length>1 && chooseImg.length === 0">
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
        defaultImg: {
            type: String
        },
        singleUp: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            actionUrl: 'http://120.27.250.104:9010/system/upgrade/saveImg',
            headers: {
                token: getToken()
            },
            imageUrl: "",
            chooseImg: [],
            sucData: {},
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
                this.success && this.success(data);
            } else {
                this.fail && this.fail(msg);
            }
        },
        handleStart({success, fail}) {
            this.success = success;
            this.fail = fail;
            if (this.chooseImg.length === 0) {
                success && success();
            } else {
                this.submit();
            }

        },
        submit() {
            this.$refs.singleImage.submit();
        },
        handlePreview(file) {
            console.log(file);
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

        },
        handelRemove(file, fileList) {
            if (this.singleUp && fileList.length === 0) {
                this.$refs.chooseBtn.$el.classList.remove("hidden");
                this.chooseImg = [];
            }
        },

        beforeUpload() {

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
