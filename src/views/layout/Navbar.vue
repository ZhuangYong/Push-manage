<template>
    <el-menu class="navbar" mode="horizontal" background-color="#fdfdfd">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <levelbar></levelbar>
        <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>

        <!--<span @click="logout" style="float: right; cursor: pointer; margin: 0 1rem;">注销</span>-->
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img class="user-avatar" :src="user.avatar ? user.avatar+'?imageView2/1/w/80/h/80' : defaultAvatar">
                <span class="user-name">{{user.name}}</span>
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">

                <router-link class='inlineBlock' to="/pwdModify">
                    <el-dropdown-item>修改密码</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided><span @click="logout" style="display:block;">注销</span></el-dropdown-item>
                <el-dropdown-item divided><span style="display: block;cursor: auto">
                    <p>版本信息：</p>
                    <p>接口：{{user.version}}</p>
                </span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <screenfull class='screenfull'></screenfull>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Levelbar from './Levelbar';
    import TabsView from './TabsView';
    import Hamburger from 'components/Hamburger';
    import Screenfull from 'components/Screenfull';
    import ErrorLog from 'components/ErrLog';
    import errLogStore from 'store/errLog';
    import defaultImg from '../../assets/images/common/Faces_Users_1.png';

    export default {
        components: {
            Levelbar,
            Hamburger,
            ErrorLog,
            Screenfull,
            TabsView
        },
        data() {
            return {
                log: errLogStore.state.errLog,
                defaultAvatar: defaultImg,
                deviceWidth: false, //false隐藏,true显示,
                changeIng: false
            };
        },
        created() {
            const width = window.innerWidth;
            if (width > 700) {
                this.deviceWidth = true;
            } else {
                this.deviceWidth = false;
            }
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                const width = window.innerWidth;
                if (width > 700) {
                    that.deviceWidth = true;
                } else {
                    that.deviceWidth = false;
                }
            };
            document.querySelector(".menu-show-cover").addEventListener("touchstart", this.hideSideBar);
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'user'
            ])
        },
        methods: {
            hideSideBar() {
                this.changeIng = true;
                this.$store.dispatch('HideSideBar');
                setTimeout(() => this.changeIng = false, 500);
            },
            toggleSideBar() {
                if (this.changeIng) return;
                this.$store.dispatch('ToggleSideBar');
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            float: right;
            margin-right: 22px;
            margin-top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            float: right;
            margin-right: 22px;
            top: 0px;
            .avatar-wrapper {
                display: inline-flex;
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .user-name{
                    margin-left: 12px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
