<!--
  - Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: singleExcel.vue @author: walljack@163.com @date: 18-3-21 下午5:56 @version: 1.0
  -->

<template>
    <div class="el-upload-container singleExcel">
        <el-upload ref="singleExcel" :multiple="false" :show-file-list="true" :headers='headers' :on-error="handelErr"
                   :action="actionUrl" :auto-upload="true" list-type="text" :before-upload="handelBeforeUpload"
                   :on-change="handleChange" :on-remove="handelRemove" :on-success="handleImageSuccess" :on-progress="handleProgress">
            <el-button ref="chooseBtn" slot="trigger" size="small" type="primary">选取文件</el-button>
            <div v-if="showProgress" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" class="el-progress custom-progrssbar el-progress--line el-progress--text-inside">
                <div class="el-progress-bar">
                    <div class="el-progress-bar__outer" style="height: 18px;">
                        <div class="el-progress-bar__inner" :style="{'width': percentage+'%'}">
                            <div class="el-progress-bar__innerText">{{percentage === 100 ? "等待处理中" : percentage.toFixed(2) + '%'}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-upload>
    </div>
</template>

<script>
import {getToken} from '../../utils/auth';
import Const from "../../utils/const";

export default {
    name: 'singleExcelUpload',
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
            percentage: 0,
            showProgress: false
        };
    },
    methods: {
        handleImageSuccess(res) {
            const {msg, status, data} = res;
            if (status === Const.CODE_SUCCESS) {
                this.uploadSuccess && this.uploadSuccess(data);
            } else {
                this.$refs.singleExcel.clearFiles();
                // this.$refs.chooseBtn.$el.classList.remove("hidden");
                this.uploadFail && this.uploadFail(msg);
            }
            this.showProgress = false;
        },
        handelErr(err) {
            this.$refs.singleExcel.clearFiles();
            // this.$refs.chooseBtn.$el.classList.remove("hidden");
            this.uploadFail && this.uploadFail(err);
            this.showProgress = false;
        },
        handleChange(file, fileList) {
            if (this.singleUp) {
                if (fileList.length > 0) {
                    // this.$refs.chooseBtn.$el.classList.add("hidden");
                }
                if (fileList.length > 1) {
                    fileList.shift();
                }
            }
        },
        handelRemove(file, fileList) {
            if (this.singleUp && fileList.length === 0) {
                // this.$refs.chooseBtn.$el.classList.remove("hidden");
                // this.uploadFail && this.uploadFail();
                this.handelEmpty && this.handelEmpty();
                this.showProgress = false;
            }
        },
        handelBeforeUpload(file) {
            this.showProgress = true;
            if (this.beforeUpload) return this.beforeUpload(file);
            return true;
        },
        handleProgress(ev) {
            this.percentage = ev.percent || 0;
        }
    }
};
</script>

<style>
    .el-upload-container .el-upload{
        display: block;
        float: left;
    }
    .el-upload-container .el-upload .hidden{
        display: none;
    }
    .el-upload-container .el-upload-list__item.is-ready{
        border: none;
        margin: 0;
    }
    .el-upload-container .el-icon-close{
       display: none;
    }
    .el-upload-container ul.el-upload-list{
        top: 0;
        left: 0;
        max-width: 300px;
    }
    .el-upload-container .image-preview-wrapper img{
        max-width: 100%;
        max-height: 100%;
        margin-top: 7px;
    }
    .singleExcel .el-progress{
         display: none;
    }
    .singleExcel .el-progress.custom-progrssbar{
        display: block!important;
    }
    .singleExcel .el-upload-list.el-upload-list--text{
        float: left;
    }
</style>
