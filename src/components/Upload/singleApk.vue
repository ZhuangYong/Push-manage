<template>
    <div class="el-upload-container gingleApk">
        <el-upload ref="singleApk" :multiple="false" :show-file-list="true" :headers='headers' :data="uploadData" :on-error="handelErr"
                   :action="actionUrl" :auto-upload="true" list-type="text" :before-upload="handelBeforeUpload"
                   :on-change="handleChange" :on-remove="handelRemove" :on-success="handleImageSuccess" :on-progress="handleProgress">
            <el-button ref="chooseBtn" slot="trigger" size="small" type="primary">选取文件</el-button>
            <div v-if="showProgress" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" class="el-progress custom-progrssbar el-progress--line el-progress--text-inside">
                <div class="el-progress-bar">
                    <div class="el-progress-bar__outer" style="height: 18px;">
                        <div class="el-progress-bar__inner" :style="{'width': percentage+'%'}">
                            <div class="el-progress-bar__innerText">{{percentage.toFixed(2) + '%'}}</div>
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
import {getUploadProgress} from "../../api/common";

// 失败时请求进度最高次数限制
const COUNT_GET_PROGRESS = 3;

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
            percentage: 0,
            uploadData: {
                progressKey: new Date().getTime(),
            },
            updateProgressTimer: null,
            countGetProgress: 0,
            showProgress: false
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
            this.showProgress = false;
        },
        handelErr(err) {
            this.$refs.singleApk.clearFiles();
            this.$refs.chooseBtn.$el.classList.remove("hidden");
            this.uploadFail && this.uploadFail(err);
            this.showProgress = false;
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
                this.showProgress = false;
            }
        },
        handelBeforeUpload(file) {
            this.countGetProgress = 0;
            this.showProgress = true;
            if (this.beforeUpload) return this.beforeUpload(file);
            return true;
        },
        handleProgress(ev) {
            const percent = ev.percent || 0;
            this.percentage = percent * 0.5;
            if (percent >= 100) this.updateProgressFromServer();
        },
        updateProgressFromServer: function() {
            getUploadProgress(this.uploadData).then(res => {
                console.log(res);
                this.countGetProgress = 0;
                const percent = res || 0;
                this.percentage = (100 + percent) * 0.5;
                if (this.percentage < 100) this.updateProgressFromServer();
            }).catch(err => {
                if (this.countGetProgress <= COUNT_GET_PROGRESS) {
                    if (this.percentage < 100) this.updateProgressFromServer();
                    this.countGetProgress += 1;
                }
            });
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
        max-width: 300px;
    }
    .el-upload-container .image-preview-wrapper img{
        max-width: 100%;
        max-height: 100%;
        margin-top: 7px;
    }
    .gingleApk .el-progress{
         display: none;
    }
    .gingleApk .el-progress.custom-progrssbar{
        display: block!important;
        position: absolute;
        width: 300px;
        top: 37px;
    }
</style>
