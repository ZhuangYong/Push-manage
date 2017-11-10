"use strict";

webpackJsonp([39], { V9V6: function V9V6(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", { value: !0 });var r = n("r1MR"),
        a = n("hZ0g"),
        o = n("VU/8"),
        i = o(r.a, a.a, null, null, null);t.default = i.exports;
  }, hZ0g: function hZ0g(e, t, n) {
    "use strict";

    var r = function r() {
      var e = this,
          t = e.$createElement,
          n = e._self._c || t;return n("div", { staticClass: "app-container" }, [n("div", { staticStyle: { "margin-bottom": "15px" } }, [e._v("你的权限： " + e._s(e.roles))]), e._v("\n  切换权限：\n  "), n("el-radio-group", { model: { value: e.role, callback: function callback(t) {
            e.role = t;
          }, expression: "role" } }, [n("el-radio-button", { attrs: { label: "editor" } })], 1)], 1);
    },
        a = [],
        o = { render: r, staticRenderFns: a };t.a = o;
  }, r1MR: function r1MR(e, t, n) {
    "use strict";

    var r = n("Dd8w"),
        a = n.n(r),
        o = n("NYxO");t.a = { data: function data() {
        return { role: "" };
      }, computed: a()({}, n.i(o.b)(["roles"])), watch: { role: function role(e) {
          var t = this;this.$store.dispatch("ChangeRole", e).then(function () {
            t.$router.push({ path: "/permission/index?" + +new Date() });
          });
        } } };
  } });
//# sourceMappingURL=39.4258bc0cab394247a151.js.map