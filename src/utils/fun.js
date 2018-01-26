export function getPageFun(pageSateName, pageApiFun, commitKey) {
    return ({commit, state}, filter = {}) => {
        const param = Object.assign({}, {
            currentPage: state[pageSateName].currentPage,
            pageSize: state[pageSateName].pageSize,
        }, filter);
        return new Promise((resolve, reject) => {
            pageApiFun(param).then(response => {
                commit(commitKey, Object.assign({}, response.data ? response : {data: response}, {currentPage: response.currentPage + 1}));
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        });
    };
}

export function getDefaultPageData() {
    return {
        currentPage: 0,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0,
        data: []
    };
}

