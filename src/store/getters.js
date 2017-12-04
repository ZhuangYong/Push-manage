const getters = {
    sidebar: state => state.app.sidebar,
    visitedViews: state => state.app.visitedViews,
    // token: state => state.user.token,
    // avatar: state => state.user.avatar,
    // name: state => state.user.name,
    // introduction: state => state.user.introduction,
    // status: state => state.user.status,
    // roles: state => state.user.roles,
    // setting: state => state.user.setting,
    user: state => state.user,
    userList: state => state.userList,
    resource: state => state.resource,
    role: state => state.role,
    system: state => state.system,
    permission: state => state.permission,
    functions: state => state.functions,
    epgMange: state => state.epgMange,
    activate: state => state.activate,
    channel: state => state.channel,
    // permissionRouters: state => state.permission.routers,
    // addRouters: state => state.permission.addRouters
    userManage: state => state.userManage
};
export default getters;
