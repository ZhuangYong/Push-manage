/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: subPageRouter.js @author: walljack@163.com @date: 18-2-8 下午8:52 @version: 1.0
 */
export default class SubPageRouter {
    context = null;
    page2Path = null;
    gost4page = [];
    pathStack = [];
    constructor(context, pages) {
        this.context = context;
        this.routerPage2Path(pages);
    }
    routerPage2Path(pages) {
        if (pages) {
            this.page2Path = {};
            pages.map(p => {
                const path = p.componentOptions.Ctor.extendOptions.name;
                this.page2Path[path] = p;
                p.pageName = path;
            });
        }
    }

    getPageFromKey(pageName) {
        return this.page2Path[pageName];
    }

    goPage(pageName, leftPageData, extraData) {
        const nextPage = this.getPageFromKey(pageName);
        if (!nextPage) {
            throw new Error(`can not find page: ${pageName}  (registered pages ：${this.page2Path.length > 0 ? this.page2Path : "null"})`);
        }
        nextPage.leftPageData = leftPageData;
        nextPage.extraData = extraData;
        nextPage.ghostPageData = "";
        this.pathStack.push(this.context.currentPage);
        this.context.currentPage = nextPage;
    }

    pageBack(rightPageData, leftPageData, extraData) {
        const returnPage = this.pathStack.pop();
        if (!returnPage) {
            console.error("no where to go");
            return;
        }
        returnPage.rightPageData = rightPageData;
        returnPage.ghostPageData = leftPageData;
        returnPage.extraData = extraData;
        this.context.currentPage = returnPage;
    }

    pageBackTo(pageName, rightPageData, leftPageData, extraData) {
        let returnPage;
        while (this.pathStack.length > 0) {
            const _returnPage = this.pathStack.pop();
            if (_returnPage.pageName === pageName) returnPage = _returnPage;
        }
        if (!returnPage) throw new Error(`页面${pageName}不存在！`);
        returnPage.rightPageData = rightPageData;
        returnPage.ghostPageData = leftPageData;
        returnPage.extraData = extraData;
        this.context.currentPage = returnPage;
    }

    pageCanBack() {
        return this.pathStack.length > 0;
    }
}
