/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: JPanel.js @author: walljack@163.com @date: 18-3-8 下午6:56 @version: 1.0
 */

import {Vue, Component} from "vue-property-decorator";

@Component({
    name: "JPanel",
    props: {
        title: {
            type: String,
            default: ""
        }
    }
})
export default class JPanel extends Vue {

    render() {
        return <div class="panel panel-default">
            <div class="panel-heading panel-handle panel-colorize">
                <div class="panel-title">
                    {this.title}
                </div>
            </div>
            {
                this.$slots.default
            }
        </div>;
    }
}
