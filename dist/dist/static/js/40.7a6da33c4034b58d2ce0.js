"use strict";

webpackJsonp([40], { E0HR: function E0HR(a, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = t("L3SD"),
        l = t("JLJt"),
        r = t("VU/8"),
        o = r(n.a, l.a, null, null, null);e.default = o.exports;
  }, JLJt: function JLJt(a, e, t) {
    "use strict";
    var n = function n() {
      var a = this,
          e = a.$createElement,
          t = a._self._c || e;return t("div", { staticClass: "app-container" }, [t("div", { staticClass: "filter-container" }, [t("el-checkbox-group", { model: { value: a.formThead, callback: function callback(e) {
            a.formThead = e;
          }, expression: "formThead" } }, [t("el-checkbox", { attrs: { label: "apple" } }, [a._v("apple")]), a._v(" "), t("el-checkbox", { attrs: { label: "banana" } }, [a._v("banana")]), a._v(" "), t("el-checkbox", { attrs: { label: "orange" } }, [a._v("orange")])], 1)], 1), a._v(" "), t("el-table", { staticStyle: { width: "100%" }, attrs: { data: a.tableData } }, [t("el-table-column", { attrs: { prop: "name", label: "fruitName", width: "180" } }), a._v(" "), a._l(a.formThead, function (e, n) {
        return t("el-table-column", { key: e, attrs: { label: e }, scopedSlots: a._u([{ key: "default", fn: function fn(t) {
              return [a._v("\n        " + a._s(t.row[e]) + "\n      ")];
            } }]) });
      })], 2)], 1);
    },
        l = [],
        r = { render: n, staticRenderFns: l };e.a = r;
  }, L3SD: function L3SD(a, e, t) {
    "use strict";
    e.a = { data: function data() {
        return { tableData: [{ name: "fruit-1", apple: "apple-10", banana: "banana-10", orange: "orange-10" }, { name: "fruit-2", apple: "apple-20", banana: "banana-20", orange: "orange-20" }], formThead: ["apple", "banana"] };
      } };
  } });
//# sourceMappingURL=40.7a6da33c4034b58d2ce0.js.map