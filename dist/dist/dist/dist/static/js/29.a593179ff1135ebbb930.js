"use strict";

webpackJsonp([29], { "6Gwn": function Gwn(t, a, e) {
    "use strict";

    var i = e("MOmO"),
        r = e.n(i);a.a = { data: function data() {
        return { errGif: r.a + "?" + +new Date(), ewizardClap: "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646", dialogVisible: !1 };
      }, methods: { back: function back() {
          this.$route.query.noGoBack ? this.$router.push({ path: "/dashboard" }) : this.$router.go(-1);
        } } };
  }, MOmO: function MOmO(t, a, e) {
    t.exports = e.p + "static/img/401.089007e.gif";
  }, XqdR: function XqdR(t, a, e) {
    a = t.exports = e("FZ+f")(!1), a.push([t.i, ".errPage-container[data-v-2e32034a]{width:800px;margin:100px auto}.errPage-container .pan-back-btn[data-v-2e32034a]{background:#008489;color:#fff}.errPage-container .pan-gif[data-v-2e32034a],.errPage-container .pan-img[data-v-2e32034a]{margin:0 auto;display:block}.errPage-container .text-jumbo[data-v-2e32034a]{font-size:60px;font-weight:700;color:#484848}.errPage-container .list-unstyled[data-v-2e32034a]{font-size:14px}.errPage-container .list-unstyled li[data-v-2e32034a]{padding-bottom:5px}.errPage-container .list-unstyled a[data-v-2e32034a]{color:#008489;text-decoration:none}.errPage-container .list-unstyled a[data-v-2e32034a]:hover{text-decoration:underline}", ""]);
  }, eRLo: function eRLo(t, a, e) {
    "use strict";

    function i(t) {
      e("pYj6");
    }Object.defineProperty(a, "__esModule", { value: !0 });var r = e("6Gwn"),
        n = e("mySg"),
        o = e("VU/8"),
        s = i,
        l = o(r.a, n.a, s, "data-v-2e32034a", null);a.default = l.exports;
  }, mySg: function mySg(t, a, e) {
    "use strict";

    var i = function i() {
      var t = this,
          a = t.$createElement,
          e = t._self._c || a;return e("div", { staticClass: "errPage-container" }, [e("el-button", { staticClass: "pan-back-btn", attrs: { icon: "arrow-left" }, on: { click: t.back } }, [t._v("返回")]), t._v(" "), e("el-row", [e("el-col", { attrs: { span: 12 } }, [e("h1", { staticClass: "text-jumbo text-ginormous" }, [t._v("Oops!")]), t._v("\n      gif来源"), e("a", { attrs: { href: "https://zh.airbnb.com/", target: "_blank" } }, [t._v("airbnb")]), t._v(" 页面\n      "), e("h2", [t._v("你没有权限去该页面")]), t._v(" "), e("h6", [t._v("如有不满请联系你领导")]), t._v(" "), e("ul", { staticClass: "list-unstyled" }, [e("li", [t._v("或者你可以去:")]), t._v(" "), e("li", { staticClass: "link-type" }, [e("router-link", { attrs: { to: "/dashboard" } }, [t._v("回首页")])], 1), t._v(" "), e("li", { staticClass: "link-type" }, [e("a", { attrs: { href: "https://www.taobao.com/" } }, [t._v("随便看看")])]), t._v(" "), e("li", [e("a", { attrs: { href: "#" }, on: { click: function click(a) {
            a.preventDefault(), t.dialogVisible = !0;
          } } }, [t._v("点我看图")])])])]), t._v(" "), e("el-col", { attrs: { span: 12 } }, [e("img", { attrs: { src: t.errGif, width: "313", height: "428", alt: "Girl has dropped her ice cream." } })])], 1), t._v(" "), e("el-dialog", { attrs: { title: "随便看", visible: t.dialogVisible, size: "large" }, on: { "update:visible": function updateVisible(a) {
            t.dialogVisible = a;
          } } }, [e("img", { staticClass: "pan-img", attrs: { src: t.ewizardClap } })])], 1);
    },
        r = [],
        n = { render: i, staticRenderFns: r };a.a = n;
  }, pYj6: function pYj6(t, a, e) {
    var i = e("XqdR");"string" == typeof i && (i = [[t.i, i, ""]]), i.locals && (t.exports = i.locals);e("rjj0")("27ef928a", i, !0);
  } });
//# sourceMappingURL=29.a593179ff1135ebbb930.js.map