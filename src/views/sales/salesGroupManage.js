/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesGroupManage.js @author: walljack@163.com @date: 18-3-1 下午2:20 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delSalesGroup, delUser, saveUser} from "../../api/salesGroup";
import {State} from "vuex-class/lib/index";
import EditSaleGroupPage from "./editPages/editSaleGroupPage";
import EditSaleDeviceGroupPage from "./editPages/editSaleDeviceGroupPage";
import DevicePage from "../commPages/devicePage";
import SalesGroupPage from "../commPages/salesGroupPage";
import salesDeviceGroupPage from "../commPages/salesDeviceGroupPage";

@Component({name: "salesGroupManageView"})
export default class salesGroupManageView extends BaseView {
    created() {
        this.initialPages([<SalesGroupPage/>, <EditSaleDeviceGroupPage/>, <EditSaleGroupPage/>, <DeviceGroupPage/>, <ChooseDevicePage/>]);
    }
}

@Component({name: "DeviceGroupPage"})
class DeviceGroupPage extends salesDeviceGroupPage {}

/**
 * 选择歌曲页面
 */
@Component({name: "ChooseDevicePage"})
class ChooseDevicePage extends DevicePage {
    targetId = "";
    tableCanSelect = true;

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveDevices} type="primary">
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveDevices() {
        this.submitLoading = true;
        saveUser({deviceUuids: this.formData.deviceUuids, groupUuid: this.groupUuid}, this.targetId).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(() => this.submitLoading = false);
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.formData.deviceUuids = [];
        if (selectedItems.length > 0) {
            let deviceUuids = [];
            selectedItems.map(s => {
                deviceUuids.push(s.deviceUuid);
            });
            this.formData.deviceUuids = deviceUuids;
        }
    }
}
