import fileupload from '../../components/Upload/singleImage.vue';

export default {
    components: {
        fileupload
    },
    data() {
        return {
        };
    },
    mounted() {
        // this.$refs.fileUpload['on-success'] = this.onSuccess;
        // console.log('-----');
    },
    render(h) {
        return (
            <div>
                <fileupload ref="upload" />
                {/*<el-upload
                    class="upload-demo"
                    ref="fileUpload"
                    headers={{token: getToken()}}
                    action={"http://192.168.1.138:8080/system/upgrade/saveImg"}
                    list-type="picture"
                    on-success= {f => f}
                >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>*/}


                <el-button onClick={this.submit}>
                    上传
                </el-button>
            </div>

        );
    },
    methods: {
        submit() {
            console.log('-----------');
            this.$refs.upload.handleStart({
                success: f => {
                    console.log(f);
                }
            });
        }
    }
};
