/*
 * 销售方订单管理
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesOrderManage.js @author: walljack@163.com @date: 18-3-1 下午4:31 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import SalesOrderPage from "../commPages/salesOrderPage";

@Component({name: "salesOrderManageView"})
export default class salesOrderManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends SalesOrderPage {}
