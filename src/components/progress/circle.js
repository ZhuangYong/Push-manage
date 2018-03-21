/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: circle.js @author: walljack@163.com @date: 18-3-21 下午2:55 @version: 1.0
 */
import {Vue, Component} from "vue-property-decorator";

@Component({
    name: "CircleProgress",
    props: {
        percentage: {
            type: Number,
            default: 0
        },
    }
})
export default class CircleProgress extends Vue {
    render() {
        const innerTxt = this.percentage === 100 ? "等待OSS上传中" : "100%";
        return <div role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line el-progress--text-inside">
            <div class="el-progress-bar">
                <div class="el-progress-bar__outer" style="height: 18px;">
                    <div class="el-progress-bar__inner" style={`width: ${this.percentage}%;`}>
                        <div class="el-progress-bar__innerText">{innerTxt}</div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
