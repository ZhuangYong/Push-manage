"use strict";

webpackJsonp([42], { "0kv5": function kv5(t, e, a) {
    "use strict";

    var n = a("XLwt"),
        i = a.n(n);a("tcAE"), e.a = { props: { className: { type: String, default: "chart" }, width: { type: String, default: "100%" }, height: { type: String, default: "300px" } }, data: function data() {
        return { chart: null };
      }, mounted: function mounted() {
        this.initChart();
      }, beforeDestroy: function beforeDestroy() {
        this.chart && (this.chart.dispose(), this.chart = null);
      }, methods: { initChart: function initChart() {
          this.chart = i.a.init(this.$el, "macarons"), this.chart.setOption({ title: { text: "WEEKLY WRITE ARTICLES", x: "center" }, tooltip: { trigger: "item", formatter: "{a} <br/>{b} : {c} ({d}%)" }, legend: { x: "center", y: "bottom", data: ["industries", "technology", "forex", "gold", "forecasts", "markets"] }, calculable: !0, series: [{ name: "WEEKLY WRITE ARTICLES", type: "pie", roseType: "radius", data: [{ value: 320, name: "industries" }, { value: 240, name: "technology" }, { value: 149, name: "forex" }, { value: 100, name: "gold" }, { value: 59, name: "forecasts" }, { value: 49, name: "markets" }], animationEasing: "cubicInOut", animationDuration: 2600 }] });
        } } };
  }, IKLf: function IKLf(t, e, a) {
    "use strict";

    Object.defineProperty(e, "__esModule", { value: !0 });var n = a("0kv5"),
        i = a("rGfA"),
        r = a("VU/8"),
        s = r(n.a, i.a, null, null, null);e.default = s.exports;
  }, rGfA: function rGfA(t, e, a) {
    "use strict";

    var n = function n() {
      var t = this,
          e = t.$createElement;return (t._self._c || e)("div", { class: t.className, style: { height: t.height, width: t.width } });
    },
        i = [],
        r = { render: n, staticRenderFns: i };e.a = r;
  } });
//# sourceMappingURL=42.ebf02afb1eed45347ef5.js.map