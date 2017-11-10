"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

webpackJsonp([10], { "Bj/7": function Bj7(t, e, n) {
    function r(t, e, n) {
      if (!t && !e && !n) throw new Error("Missing required arguments");if (!c.string(e)) throw new TypeError("Second argument must be a String");if (!c.fn(n)) throw new TypeError("Third argument must be a Function");if (c.node(t)) return o(t, e, n);if (c.nodeList(t)) return i(t, e, n);if (c.string(t)) return a(t, e, n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
    }function o(t, e, n) {
      return t.addEventListener(e, n), { destroy: function destroy() {
          t.removeEventListener(e, n);
        } };
    }function i(t, e, n) {
      return Array.prototype.forEach.call(t, function (t) {
        t.addEventListener(e, n);
      }), { destroy: function destroy() {
          Array.prototype.forEach.call(t, function (t) {
            t.removeEventListener(e, n);
          });
        } };
    }function a(t, e, n) {
      return s(document.body, t, e, n);
    }var c = n("iDEd"),
        s = n("ZE5A");t.exports = r;
  }, FRo8: function FRo8(t, e, n) {
    "use strict";

    var r = n("qorP"),
        o = n("KI+6");e.a = { directives: { clipboard: o.a }, data: function data() {
        return { activeName: "directly", inputData: "https://github.com/PanJiaChen/vue-element-admin" };
      }, methods: { handleCopy: function handleCopy(t, e) {
          n.i(r.a)(t, e);
        }, clipboardSuccess: function clipboardSuccess() {
          this.$message({ message: "复制成功", type: "success", duration: 1500 });
        } } };
  }, I1DG: function I1DG(t, e, n) {
    "use strict";

    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "app-container" }, [n("el-tabs", { model: { value: t.activeName, callback: function callback(e) {
            t.activeName = e;
          }, expression: "activeName" } }, [n("el-tab-pane", { attrs: { label: "use clipboard  directly", name: "directly" } }, [n("el-input", { staticStyle: { width: "400px" }, attrs: { placeholder: "请输入内容" }, model: { value: t.inputData, callback: function callback(e) {
            t.inputData = e;
          }, expression: "inputData" } }), t._v(" "), n("el-button", { attrs: { type: "primary", icon: "document" }, on: { click: function click(e) {
            t.handleCopy(t.inputData, e);
          } } }, [t._v("copy")])], 1), t._v(" "), n("el-tab-pane", { attrs: { label: "use clipboard by v-directive", name: "v-directive" } }, [n("el-input", { staticStyle: { width: "400px" }, attrs: { placeholder: "请输入内容" }, model: { value: t.inputData, callback: function callback(e) {
            t.inputData = e;
          }, expression: "inputData" } }), t._v(" "), n("el-button", { directives: [{ name: "clipboard", rawName: "v-clipboard:copy", value: t.inputData, expression: "inputData", arg: "copy" }, { name: "clipboard", rawName: "v-clipboard:success", value: t.clipboardSuccess, expression: "clipboardSuccess", arg: "success" }], attrs: { type: "primary", icon: "document" } }, [t._v("copy")])], 1)], 1)], 1);
    },
        o = [],
        i = { render: r, staticRenderFns: o };e.a = i;
  }, Jssu: function Jssu(t, e) {
    function n(t, e) {
      for (; t && t.nodeType !== r;) {
        if ("function" == typeof t.matches && t.matches(e)) return t;t = t.parentNode;
      }
    }var r = 9;if ("undefined" != typeof Element && !Element.prototype.matches) {
      var o = Element.prototype;o.matches = o.matchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.webkitMatchesSelector;
    }t.exports = n;
  }, "KI+6": function KI6(t, e, n) {
    "use strict";

    var r = n("XBnJ"),
        o = function o(t) {
      t.directive("Clipboard", r.a);
    };window.Vue && (window.clipboard = r.a, Vue.use(o)), r.a.install = o, e.a = r.a;
  }, "LF/X": function LFX(t, e, n) {
    var r, o, i;!function (a, c) {
      o = [t, n("SPM9")], r = c, void 0 !== (i = "function" == typeof r ? r.apply(e, o) : r) && (t.exports = i);
    }(0, function (t, e) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var r = function (t) {
        return t && t.__esModule ? t : { default: t };
      }(e),
          o = "function" == typeof _symbol2.default && "symbol" == (0, _typeof3.default)(_iterator2.default) ? function (t) {
        return typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t);
      } : function (t) {
        return t && "function" == typeof _symbol2.default && t.constructor === _symbol2.default && t !== _symbol2.default.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t);
      },
          i = function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, _defineProperty2.default)(t, r.key, r);
          }
        }return function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        };
      }(),
          a = function () {
        function t(e) {
          n(this, t), this.resolveOptions(e), this.initSelection();
        }return i(t, [{ key: "resolveOptions", value: function value() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = "";
          } }, { key: "initSelection", value: function value() {
            this.text ? this.selectFake() : this.target && this.selectTarget();
          } }, { key: "selectFake", value: function value() {
            var t = this,
                e = "rtl" == document.documentElement.getAttribute("dir");this.removeFake(), this.fakeHandlerCallback = function () {
              return t.removeFake();
            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";var n = window.pageYOffset || document.documentElement.scrollTop;this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, r.default)(this.fakeElem), this.copyText();
          } }, { key: "removeFake", value: function value() {
            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null);
          } }, { key: "selectTarget", value: function value() {
            this.selectedText = (0, r.default)(this.target), this.copyText();
          } }, { key: "copyText", value: function value() {
            var t = void 0;try {
              t = document.execCommand(this.action);
            } catch (e) {
              t = !1;
            }this.handleResult(t);
          } }, { key: "handleResult", value: function value(t) {
            this.emitter.emit(t ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) });
          } }, { key: "clearSelection", value: function value() {
            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
          } }, { key: "destroy", value: function value() {
            this.removeFake();
          } }, { key: "action", set: function set() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
          }, get: function get() {
            return this._action;
          } }, { key: "target", set: function set(t) {
            if (void 0 !== t) {
              if (!t || "object" !== (void 0 === t ? "undefined" : o(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target = t;
            }
          }, get: function get() {
            return this._target;
          } }]), t;
      }();t.exports = a;
    });
  }, SPM9: function SPM9(t, e) {
    function n(t) {
      var e;if ("SELECT" === t.nodeName) t.focus(), e = t.value;else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
        var n = t.hasAttribute("readonly");n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value;
      } else {
        t.hasAttribute("contenteditable") && t.focus();var r = window.getSelection(),
            o = document.createRange();o.selectNodeContents(t), r.removeAllRanges(), r.addRange(o), e = r.toString();
      }return e;
    }t.exports = n;
  }, V33R: function V33R(t, e, n) {
    var r, o, i;!function (a, c) {
      o = [t, n("LF/X"), n("WreF"), n("Bj/7")], r = c, void 0 !== (i = "function" == typeof r ? r.apply(e, o) : r) && (t.exports = i);
    }(0, function (t, e, n, r) {
      "use strict";

      function o(t) {
        return t && t.__esModule ? t : { default: t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }function a(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) && "function" != typeof e ? t : e;
      }function c(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)));t.prototype = (0, _create2.default)(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(t, e) : t.__proto__ = e);
      }function s(t, e) {
        var n = "data-clipboard-" + t;if (e.hasAttribute(n)) return e.getAttribute(n);
      }var u = o(e),
          l = o(n),
          f = o(r),
          d = "function" == typeof _symbol2.default && "symbol" == (0, _typeof3.default)(_iterator2.default) ? function (t) {
        return typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t);
      } : function (t) {
        return t && "function" == typeof _symbol2.default && t.constructor === _symbol2.default && t !== _symbol2.default.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t);
      },
          p = function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, _defineProperty2.default)(t, r.key, r);
          }
        }return function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        };
      }(),
          h = function (t) {
        function e(t, n) {
          i(this, e);var r = a(this, (e.__proto__ || (0, _getPrototypeOf2.default)(e)).call(this));return r.resolveOptions(n), r.listenClick(t), r;
        }return c(e, t), p(e, [{ key: "resolveOptions", value: function value() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === d(t.container) ? t.container : document.body;
          } }, { key: "listenClick", value: function value(t) {
            var e = this;this.listener = (0, f.default)(t, "click", function (t) {
              return e.onClick(t);
            });
          } }, { key: "onClick", value: function value(t) {
            var e = t.delegateTarget || t.currentTarget;this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new u.default({ action: this.action(e), target: this.target(e), text: this.text(e), container: this.container, trigger: e, emitter: this });
          } }, { key: "defaultAction", value: function value(t) {
            return s("action", t);
          } }, { key: "defaultTarget", value: function value(t) {
            var e = s("target", t);if (e) return document.querySelector(e);
          } }, { key: "defaultText", value: function value(t) {
            return s("text", t);
          } }, { key: "destroy", value: function value() {
            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null);
          } }], [{ key: "isSupported", value: function value() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                e = "string" == typeof t ? [t] : t,
                n = !!document.queryCommandSupported;return e.forEach(function (t) {
              n = n && !!document.queryCommandSupported(t);
            }), n;
          } }]), e;
      }(l.default);t.exports = h;
    });
  }, "Va4+": function Va4(t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", { value: !0 });var r = n("FRo8"),
        o = n("I1DG"),
        i = n("VU/8"),
        a = i(r.a, o.a, null, null, null);e.default = a.exports;
  }, WreF: function WreF(t, e) {
    function n() {}n.prototype = { on: function on(t, e, n) {
        var r = this.e || (this.e = {});return (r[t] || (r[t] = [])).push({ fn: e, ctx: n }), this;
      }, once: function once(t, e, n) {
        function r() {
          o.off(t, r), e.apply(n, arguments);
        }var o = this;return r._ = e, this.on(t, r, n);
      }, emit: function emit(t) {
        var e = [].slice.call(arguments, 1),
            n = ((this.e || (this.e = {}))[t] || []).slice(),
            r = 0,
            o = n.length;for (r; r < o; r++) {
          n[r].fn.apply(n[r].ctx, e);
        }return this;
      }, off: function off(t, e) {
        var n = this.e || (this.e = {}),
            r = n[t],
            o = [];if (r && e) for (var i = 0, a = r.length; i < a; i++) {
          r[i].fn !== e && r[i].fn._ !== e && o.push(r[i]);
        }return o.length ? n[t] = o : delete n[t], this;
      } }, t.exports = n;
  }, XBnJ: function XBnJ(t, e, n) {
    "use strict";

    var r = n("V33R");if (!r) throw new Error("you shold npm install `clipboard` --save at first ");e.a = { bind: function bind(t, e) {
        if ("success" === e.arg) t._v_clipboard_success = e.value;else if ("error" === e.arg) t._v_clipboard_error = e.value;else {
          var n = new r(t, { text: function text() {
              return e.value;
            }, action: function action() {
              return "cut" === e.arg ? "cut" : "copy";
            } });n.on("success", function (e) {
            var n = t._v_clipboard_success;n && n(e);
          }), n.on("error", function (e) {
            var n = t._v_clipboard_error;n && n(e);
          }), t._v_clipboard = n;
        }
      }, update: function update(t, e) {
        "success" === e.arg ? t._v_clipboard_success = e.value : "error" === e.arg ? t._v_clipboard_error = e.value : (t._v_clipboard.text = function () {
          return e.value;
        }, t._v_clipboard.action = function () {
          return "cut" === e.arg ? "cut" : "copy";
        });
      }, unbind: function unbind(t, e) {
        "success" === e.arg ? delete t._v_clipboard_success : "error" === e.arg ? delete t._v_clipboard_error : (t._v_clipboard.destroy(), delete t._v_clipboard);
      } };
  }, ZE5A: function ZE5A(t, e, n) {
    function r(t, e, n, r, i) {
      var a = o.apply(this, arguments);return t.addEventListener(n, a, i), { destroy: function destroy() {
          t.removeEventListener(n, a, i);
        } };
    }function o(t, e, n, r) {
      return function (n) {
        n.delegateTarget = i(n.target, e), n.delegateTarget && r.call(t, n);
      };
    }var i = n("Jssu");t.exports = r;
  }, iDEd: function iDEd(t, e) {
    e.node = function (t) {
      return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
    }, e.nodeList = function (t) {
      var n = Object.prototype.toString.call(t);return void 0 !== t && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in t && (0 === t.length || e.node(t[0]));
    }, e.string = function (t) {
      return "string" == typeof t || t instanceof String;
    }, e.fn = function (t) {
      return "[object Function]" === Object.prototype.toString.call(t);
    };
  }, qorP: function qorP(t, e, n) {
    "use strict";

    function r() {
      s.default.prototype.$message({ message: "复制成功", type: "success", duration: 1500 });
    }function o() {
      s.default.prototype.$message({ message: "复制失败", type: "error" });
    }function i(t, e) {
      var n = new c.a(e.target, { text: function text() {
          return t;
        } });n.on("success", function () {
        r(), n.off("error"), n.off("success"), n.destroy();
      }), n.on("error", function () {
        o(), n.off("error"), n.off("success"), n.destroy();
      }), n.onClick(e);
    }n.d(e, "a", function () {
      return i;
    });var a = n("V33R"),
        c = n.n(a),
        s = n("7+uW");
  } });
//# sourceMappingURL=10.eac5d81fab7037aeff33.js.map