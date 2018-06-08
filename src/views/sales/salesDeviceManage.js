/*
 * 销售方设备列表管理
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesDeviceManage.js @author: walljack@163.com @date: 18-3-1 下午4:23 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import SalesDevicePage from "../commPages/salesDevicePage";

@Component({name: "salesDeviceManageView"})
export default class salesDeviceManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends SalesDevicePage {}
