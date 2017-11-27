import apiUrl from "../../api/apiUrl";
import {getToken} from '../../utils/auth';
export default {
    render(h) {
        return (
            <el-upload
                class="upload-demo"
                headers={{token: getToken()}}
                action={"http://192.168.1.138:8080/system/upgrade/saveImg"}
                list-type="picture"
                onSuccess={(response, file, fileList) => {
                    console.log(response);
                    console.log(file);
                }}
                >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        );
    }
};
