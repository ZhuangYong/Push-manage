"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

webpackJsonp([13], { "C/gx": function CGx(t, e, n) {
    var i = n("Gbd2");"string" == typeof i && (i = [[t.i, i, ""]]), i.locals && (t.exports = i.locals);n("rjj0")("4ccab180", i, !0);
  }, DAYN: function DAYN(t, e, n) {
    "use strict";
    function i(t) {
      if (Array.isArray(t)) {
        for (var e = 0, n = Array(t.length); e < t.length; e++) {
          n[e] = t[e];
        }return n;
      }return (0, _from2.default)(t);
    }var o = _assign2.default || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
      }return t;
    };!function () {
      function e(t) {
        function e(t) {
          t.parentElement.removeChild(t);
        }function n(t, e, n) {
          var i = 0 === n ? t.children[0] : t.children[n - 1].nextSibling;t.insertBefore(e, i);
        }function r(t, e) {
          return t.map(function (t) {
            return t.elm;
          }).indexOf(e);
        }function a(t, e, n) {
          if (!t) return [];var o = t.map(function (t) {
            return t.elm;
          }),
              r = [].concat(i(e)).map(function (t) {
            return o.indexOf(t);
          });return n ? r.filter(function (t) {
            return -1 !== t;
          }) : r;
        }function s(t, e) {
          var n = this;this.$nextTick(function () {
            return n.$emit(t.toLowerCase(), e);
          });
        }function l(t) {
          var e = this;return function (n) {
            null !== e.realList && e["onDrag" + t](n), s.call(e, t, n);
          };
        }var c = ["Start", "Add", "Remove", "Update", "End"],
            d = ["Choose", "Sort", "Filter", "Clone"],
            u = ["Move"].concat(c, d).map(function (t) {
          return "on" + t;
        }),
            h = null;return { name: "draggable", props: { options: Object, list: { type: Array, required: !1, default: null }, value: { type: Array, required: !1, default: null }, noTransitionOnDrag: { type: Boolean, default: !1 }, clone: { type: Function, default: function _default(t) {
                return t;
              } }, element: { type: String, default: "div" }, move: { type: Function, default: null } }, data: function data() {
            return { transitionMode: !1, componentMode: !1 };
          }, render: function render(t) {
            var e = this.$slots.default;if (e && 1 === e.length) {
              var n = e[0];n.componentOptions && "transition-group" === n.componentOptions.tag && (this.transitionMode = !0);
            }var o = e,
                r = this.$slots.footer;return r && (o = e ? [].concat(i(e), i(r)) : [].concat(i(r))), t(this.element, null, o);
          }, mounted: function mounted() {
            var e = this;if (this.componentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase(), this.componentMode && this.transitionMode) throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: " + this.element);var n = {};c.forEach(function (t) {
              n["on" + t] = l.call(e, t);
            }), d.forEach(function (t) {
              n["on" + t] = s.bind(e, t);
            });var i = o({}, this.options, n, { onMove: function onMove(t, n) {
                return e.onDragMove(t, n);
              } });!("draggable" in i) && (i.draggable = ">*"), this._sortable = new t(this.rootContainer, i), this.computeIndexes();
          }, beforeDestroy: function beforeDestroy() {
            this._sortable.destroy();
          }, computed: { rootContainer: function rootContainer() {
              return this.transitionMode ? this.$el.children[0] : this.$el;
            }, isCloning: function isCloning() {
              return !!this.options && !!this.options.group && "clone" === this.options.group.pull;
            }, realList: function realList() {
              return this.list ? this.list : this.value;
            } }, watch: { options: { handler: function handler(t) {
                for (var e in t) {
                  -1 == u.indexOf(e) && this._sortable.option(e, t[e]);
                }
              }, deep: !0 }, realList: function realList() {
              this.computeIndexes();
            } }, methods: { getChildrenNodes: function getChildrenNodes() {
              if (this.componentMode) return this.$children[0].$slots.default;var t = this.$slots.default;return this.transitionMode ? t[0].child.$slots.default : t;
            }, computeIndexes: function computeIndexes() {
              var t = this;this.$nextTick(function () {
                t.visibleIndexes = a(t.getChildrenNodes(), t.rootContainer.children, t.transitionMode);
              });
            }, getUnderlyingVm: function getUnderlyingVm(t) {
              var e = r(this.getChildrenNodes() || [], t);return -1 === e ? null : { index: e, element: this.realList[e] };
            }, getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(t) {
              var e = t.__vue__;return e && e.$options && "transition-group" === e.$options._componentTag ? e.$parent : e;
            }, emitChanges: function emitChanges(t) {
              var e = this;this.$nextTick(function () {
                e.$emit("change", t);
              });
            }, alterList: function alterList(t) {
              if (this.list) t(this.list);else {
                var e = [].concat(i(this.value));t(e), this.$emit("input", e);
              }
            }, spliceList: function spliceList() {
              var t = arguments,
                  e = function e(_e) {
                return _e.splice.apply(_e, t);
              };this.alterList(e);
            }, updatePosition: function updatePosition(t, e) {
              var n = function n(_n) {
                return _n.splice(e, 0, _n.splice(t, 1)[0]);
              };this.alterList(n);
            }, getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(t) {
              var e = t.to,
                  n = t.related,
                  i = this.getUnderlyingPotencialDraggableComponent(e);if (!i) return { component: i };var r = i.realList,
                  a = { list: r, component: i };if (e !== n && r && i.getUnderlyingVm) {
                var s = i.getUnderlyingVm(n);if (s) return o(s, a);
              }return a;
            }, getVmIndex: function getVmIndex(t) {
              var e = this.visibleIndexes,
                  n = e.length;return t > n - 1 ? n : e[t];
            }, getComponent: function getComponent() {
              return this.$slots.default[0].componentInstance;
            }, resetTransitionData: function resetTransitionData(t) {
              if (this.noTransitionOnDrag && this.transitionMode) {
                this.getChildrenNodes()[t].data = null;var e = this.getComponent();e.children = [], e.kept = void 0;
              }
            }, onDragStart: function onDragStart(t) {
              this.context = this.getUnderlyingVm(t.item), t.item._underlying_vm_ = this.clone(this.context.element), h = t.item;
            }, onDragAdd: function onDragAdd(t) {
              var n = t.item._underlying_vm_;if (void 0 !== n) {
                e(t.item);var i = this.getVmIndex(t.newIndex);this.spliceList(i, 0, n), this.computeIndexes();var o = { element: n, newIndex: i };this.emitChanges({ added: o });
              }
            }, onDragRemove: function onDragRemove(t) {
              if (n(this.rootContainer, t.item, t.oldIndex), this.isCloning) return void e(t.clone);var i = this.context.index;this.spliceList(i, 1);var o = { element: this.context.element, oldIndex: i };this.resetTransitionData(i), this.emitChanges({ removed: o });
            }, onDragUpdate: function onDragUpdate(t) {
              e(t.item), n(t.from, t.item, t.oldIndex);var i = this.context.index,
                  o = this.getVmIndex(t.newIndex);this.updatePosition(i, o);var r = { element: this.context.element, oldIndex: i, newIndex: o };this.emitChanges({ moved: r });
            }, computeFutureIndex: function computeFutureIndex(t, e) {
              if (!t.element) return 0;var n = [].concat(i(e.to.children)).filter(function (t) {
                return "none" !== t.style.display;
              }),
                  o = n.indexOf(e.related),
                  r = t.component.getVmIndex(o);return -1 == n.indexOf(h) && e.willInsertAfter ? r + 1 : r;
            }, onDragMove: function onDragMove(t, e) {
              var n = this.move;if (!n || !this.realList) return !0;var i = this.getRelatedContextFromMoveEvent(t),
                  r = this.context,
                  a = this.computeFutureIndex(i, t);return o(r, { futureIndex: a }), o(t, { relatedContext: i, draggedContext: r }), n(t, e);
            }, onDragEnd: function onDragEnd(t) {
              this.computeIndexes(), h = null;
            } } };
      }_from2.default || (Array.from = function (t) {
        return [].slice.call(t);
      });var r = n("guG4");t.exports = e(r);
    }();
  }, Gbd2: function Gbd2(t, e, n) {
    e = t.exports = n("FZ+f")(!1), e.push([t.i, '.twoDndList[data-v-1361f327]{background:#fff;padding-bottom:40px}.twoDndList[data-v-1361f327]:after{content:"";display:table;clear:both}.twoDndList .twoDndList-list[data-v-1361f327]{float:left;padding-bottom:30px}.twoDndList .twoDndList-list[data-v-1361f327]:first-of-type{margin-right:2%}.twoDndList .twoDndList-list .dragArea[data-v-1361f327]{margin-top:15px;min-height:50px;padding-bottom:30px}.list-complete-item[data-v-1361f327]{cursor:pointer;position:relative;font-size:14px;padding:5px 12px;margin-top:4px;border:1px solid #bfcbd9;-webkit-transition:all 1s;transition:all 1s}.list-complete-item-handle[data-v-1361f327]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:50px}.list-complete-item-handle2[data-v-1361f327]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:20px}.list-complete-item.sortable-chosen[data-v-1361f327]{background:#4ab7bd}.list-complete-item.sortable-ghost[data-v-1361f327]{background:#30b08f}.list-complete-enter[data-v-1361f327],.list-complete-leave-active[data-v-1361f327]{opacity:0}', ""]);
  }, Uh1i: function Uh1i(t, e, n) {
    "use strict";
    var i = n("wYK6"),
        o = n("viA7");e.a = { components: { DndList: i.a }, data: function data() {
        return { list1: [], list2: [] };
      }, created: function created() {
        this.getData();
      }, methods: { getData: function getData() {
          var t = this;this.listLoading = !0, n.i(o.a)().then(function (e) {
            t.list1 = e.data.items.splice(0, 5), t.list2 = e.data.items;
          });
        } } };
  }, cJoO: function cJoO(t, e, n) {
    "use strict";
    var i = function i() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "components-container" }, [t._m(0), t._v(" "), n("div", { staticClass: "editor-container" }, [n("dnd-list", { attrs: { list1: t.list1, list2: t.list2, list1Title: "头条列表", list2Title: "文章池" } })], 1)]);
    },
        o = [function () {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("code", [t._v("drag-list base on "), n("a", { attrs: { href: "https://github.com/SortableJS/Vue.Draggable", target: "_blank" } }, [t._v("Vue.Draggable")])]);
    }],
        r = { render: i, staticRenderFns: o };e.a = r;
  }, guG4: function guG4(t, e, n) {
    var i, o; /**!
              * Sortable
              * @author	RubaXa   <trash@rubaxa.org>
              * @license MIT
              */
    !function (r) {
      "use strict";
      i = r, void 0 !== (o = "function" == typeof i ? i.call(e, n, e, t) : i) && (t.exports = o);
    }(function () {
      "use strict";
      function t(e, n) {
        if (!e || !e.nodeType || 1 !== e.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(e);this.el = e, this.options = n = _({}, n), e[H] = this;var i = { group: Math.random(), sort: !0, disabled: !1, store: null, handle: null, scroll: !0, scrollSensitivity: 30, scrollSpeed: 10, draggable: /[uo]l/i.test(e.nodeName) ? "li" : ">*", ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", dragClass: "sortable-drag", ignore: "a, img", filter: null, preventOnFilter: !0, animation: 0, setData: function setData(t, e) {
            t.setData("Text", e.textContent);
          }, dropBubble: !1, dragoverBubble: !1, dataIdAttr: "data-id", delay: 0, forceFallback: !1, fallbackClass: "sortable-fallback", fallbackOnBody: !1, fallbackTolerance: 0, fallbackOffset: { x: 0, y: 0 }, supportPointer: !1 !== t.supportPointer };for (var o in i) {
          !(o in n) && (n[o] = i[o]);
        }dt(n);for (var a in this) {
          "_" === a.charAt(0) && "function" == typeof this[a] && (this[a] = this[a].bind(this));
        }this.nativeDraggable = !n.forceFallback && nt, r(e, "mousedown", this._onTapStart), r(e, "touchstart", this._onTapStart), n.supportPointer && r(e, "pointerdown", this._onTapStart), this.nativeDraggable && (r(e, "dragover", this), r(e, "dragenter", this)), lt.push(this._onDragOver), n.store && this.sort(n.store.get(this));
      }function e(t, e) {
        "clone" !== t.lastPullMode && (e = !0), E && E.state !== e && (l(E, "display", e ? "none" : ""), e || E.state && (t.options.group.revertClone ? (I.insertBefore(E, L), t._animate(C, E)) : I.insertBefore(E, C)), E.state = e);
      }function n(t, e, n) {
        if (t) {
          n = n || J;do {
            if (">*" === e && t.parentNode === n || m(t, e)) return t;
          } while (t = i(t));
        }return null;
      }function i(t) {
        var e = t.host;return e && e.nodeType ? e : t.parentNode;
      }function o(t) {
        t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.preventDefault();
      }function r(t, e, n) {
        t.addEventListener(e, n, tt);
      }function a(t, e, n) {
        t.removeEventListener(e, n, tt);
      }function s(t, e, n) {
        if (t) if (t.classList) t.classList[n ? "add" : "remove"](e);else {
          var i = (" " + t.className + " ").replace(q, " ").replace(" " + e + " ", " ");t.className = (i + (n ? " " + e : "")).replace(q, " ");
        }
      }function l(t, e, n) {
        var i = t && t.style;if (i) {
          if (void 0 === n) return J.defaultView && J.defaultView.getComputedStyle ? n = J.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];e in i || (e = "-webkit-" + e), i[e] = n + ("string" == typeof n ? "" : "px");
        }
      }function c(t, e, n) {
        if (t) {
          var i = t.getElementsByTagName(e),
              o = 0,
              r = i.length;if (n) for (; o < r; o++) {
            n(i[o], o);
          }return i;
        }return [];
      }function d(t, e, n, i, o, r, a, s) {
        t = t || e[H];var l = J.createEvent("Event"),
            c = t.options,
            d = "on" + n.charAt(0).toUpperCase() + n.substr(1);l.initEvent(n, !0, !0), l.to = o || e, l.from = r || e, l.item = i || e, l.clone = E, l.oldIndex = a, l.newIndex = s, e.dispatchEvent(l), c[d] && c[d].call(t, l);
      }function u(t, e, n, i, o, r, a, s) {
        var l,
            c,
            d = t[H],
            u = d.options.onMove;return l = J.createEvent("Event"), l.initEvent("move", !0, !0), l.to = e, l.from = t, l.dragged = n, l.draggedRect = i, l.related = o || e, l.relatedRect = r || e.getBoundingClientRect(), l.willInsertAfter = s, t.dispatchEvent(l), u && (c = u.call(d, l, a)), c;
      }function h(t) {
        t.draggable = !1;
      }function f() {
        ot = !1;
      }function p(t, e) {
        var n = t.lastElementChild,
            i = n.getBoundingClientRect();return e.clientY - (i.top + i.height) > 5 || e.clientX - (i.left + i.width) > 5;
      }function g(t) {
        for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, i = 0; n--;) {
          i += e.charCodeAt(n);
        }return i.toString(36);
      }function v(t, e) {
        var n = 0;if (!t || !t.parentNode) return -1;for (; t && (t = t.previousElementSibling);) {
          "TEMPLATE" === t.nodeName.toUpperCase() || ">*" !== e && !m(t, e) || n++;
        }return n;
      }function m(t, e) {
        if (t) {
          e = e.split(".");var n = e.shift().toUpperCase(),
              i = new RegExp("\\s(" + e.join("|") + ")(?=\\s)", "g");return !("" !== n && t.nodeName.toUpperCase() != n || e.length && ((" " + t.className + " ").match(i) || []).length != e.length);
        }return !1;
      }function b(t, e) {
        var n, i;return function () {
          void 0 === n && (n = arguments, i = this, K(function () {
            1 === n.length ? t.call(i, n[0]) : t.apply(i, n), n = void 0;
          }, e));
        };
      }function _(t, e) {
        if (t && e) for (var n in e) {
          e.hasOwnProperty(n) && (t[n] = e[n]);
        }return t;
      }function y(t) {
        return Q && Q.dom ? Q.dom(t).cloneNode(!0) : Z ? Z(t).clone(!0)[0] : t.cloneNode(!0);
      }function D(t) {
        for (var e = t.getElementsByTagName("input"), n = e.length; n--;) {
          var i = e[n];i.checked && st.push(i);
        }
      }function x(t) {
        return K(t, 0);
      }function w(t) {
        return clearTimeout(t);
      }if ("undefined" == typeof window || !window.document) return function () {
        throw new Error("Sortable.js requires a window with a document");
      };var C,
          T,
          S,
          E,
          I,
          L,
          k,
          N,
          O,
          A,
          M,
          P,
          B,
          Y,
          R,
          $,
          X,
          U,
          F,
          V,
          j = {},
          q = /\s+/g,
          G = /left|right|inline/,
          H = "Sortable" + new Date().getTime(),
          W = window,
          J = W.document,
          z = W.parseInt,
          K = W.setTimeout,
          Z = W.jQuery || W.Zepto,
          Q = W.Polymer,
          tt = !1,
          et = !1,
          nt = "draggable" in J.createElement("div"),
          it = function (t) {
        return !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) && (t = J.createElement("x"), t.style.cssText = "pointer-events:auto", "auto" === t.style.pointerEvents);
      }(),
          ot = !1,
          rt = Math.abs,
          at = Math.min,
          st = [],
          lt = [],
          ct = b(function (t, e, n) {
        if (n && e.scroll) {
          var i,
              o,
              r,
              a,
              s,
              l,
              c = n[H],
              d = e.scrollSensitivity,
              u = e.scrollSpeed,
              h = t.clientX,
              f = t.clientY,
              p = window.innerWidth,
              g = window.innerHeight;if (O !== n && (N = e.scroll, O = n, A = e.scrollFn, !0 === N)) {
            N = n;do {
              if (N.offsetWidth < N.scrollWidth || N.offsetHeight < N.scrollHeight) break;
            } while (N = N.parentNode);
          }N && (i = N, o = N.getBoundingClientRect(), r = (rt(o.right - h) <= d) - (rt(o.left - h) <= d), a = (rt(o.bottom - f) <= d) - (rt(o.top - f) <= d)), r || a || (r = (p - h <= d) - (h <= d), a = (g - f <= d) - (f <= d), (r || a) && (i = W)), j.vx === r && j.vy === a && j.el === i || (j.el = i, j.vx = r, j.vy = a, clearInterval(j.pid), i && (j.pid = setInterval(function () {
            if (l = a ? a * u : 0, s = r ? r * u : 0, "function" == typeof A) return A.call(c, s, l, t);i === W ? W.scrollTo(W.pageXOffset + s, W.pageYOffset + l) : (i.scrollTop += l, i.scrollLeft += s);
          }, 24)));
        }
      }, 30),
          dt = function dt(t) {
        function e(t, e) {
          return void 0 !== t && !0 !== t || (t = n.name), "function" == typeof t ? t : function (n, i) {
            var o = i.options.group.name;return e ? t : t && (t.join ? t.indexOf(o) > -1 : o == t);
          };
        }var n = {},
            i = t.group;i && "object" == (typeof i === "undefined" ? "undefined" : (0, _typeof3.default)(i)) || (i = { name: i }), n.name = i.name, n.checkPull = e(i.pull, !0), n.checkPut = e(i.put), n.revertClone = i.revertClone, t.group = n;
      };try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function get() {
            et = !1, tt = { capture: !1, passive: et };
          } }));
      } catch (t) {}return t.prototype = { constructor: t, _onTapStart: function _onTapStart(t) {
          var e,
              i = this,
              o = this.el,
              r = this.options,
              a = r.preventOnFilter,
              s = t.type,
              l = t.touches && t.touches[0],
              c = (l || t).target,
              u = t.target.shadowRoot && t.path && t.path[0] || c,
              h = r.filter;if (D(o), !C && !(/mousedown|pointerdown/.test(s) && 0 !== t.button || r.disabled) && !u.isContentEditable && (c = n(c, r.draggable, o)) && k !== c) {
            if (e = v(c, r.draggable), "function" == typeof h) {
              if (h.call(this, t, c, this)) return d(i, u, "filter", c, o, o, e), void (a && t.preventDefault());
            } else if (h && (h = h.split(",").some(function (t) {
              if (t = n(u, t.trim(), o)) return d(i, t, "filter", c, o, o, e), !0;
            }))) return void (a && t.preventDefault());r.handle && !n(u, r.handle, o) || this._prepareDragStart(t, l, c, e);
          }
        }, _prepareDragStart: function _prepareDragStart(t, e, n, i) {
          var o,
              a = this,
              l = a.el,
              u = a.options,
              f = l.ownerDocument;n && !C && n.parentNode === l && (U = t, I = l, C = n, T = C.parentNode, L = C.nextSibling, k = n, $ = u.group, Y = i, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, C.style["will-change"] = "all", o = function o() {
            a._disableDelayedDrag(), C.draggable = a.nativeDraggable, s(C, u.chosenClass, !0), a._triggerDragStart(t, e), d(a, I, "choose", C, I, I, Y);
          }, u.ignore.split(",").forEach(function (t) {
            c(C, t.trim(), h);
          }), r(f, "mouseup", a._onDrop), r(f, "touchend", a._onDrop), r(f, "touchcancel", a._onDrop), r(f, "selectstart", a), u.supportPointer && r(f, "pointercancel", a._onDrop), u.delay ? (r(f, "mouseup", a._disableDelayedDrag), r(f, "touchend", a._disableDelayedDrag), r(f, "touchcancel", a._disableDelayedDrag), r(f, "mousemove", a._disableDelayedDrag), r(f, "touchmove", a._disableDelayedDrag), u.supportPointer && r(f, "pointermove", a._disableDelayedDrag), a._dragStartTimer = K(o, u.delay)) : o());
        }, _disableDelayedDrag: function _disableDelayedDrag() {
          var t = this.el.ownerDocument;clearTimeout(this._dragStartTimer), a(t, "mouseup", this._disableDelayedDrag), a(t, "touchend", this._disableDelayedDrag), a(t, "touchcancel", this._disableDelayedDrag), a(t, "mousemove", this._disableDelayedDrag), a(t, "touchmove", this._disableDelayedDrag), a(t, "pointermove", this._disableDelayedDrag);
        }, _triggerDragStart: function _triggerDragStart(t, e) {
          e = e || ("touch" == t.pointerType ? t : null), e ? (U = { target: C, clientX: e.clientX, clientY: e.clientY }, this._onDragStart(U, "touch")) : this.nativeDraggable ? (r(C, "dragend", this), r(I, "dragstart", this._onDragStart)) : this._onDragStart(U, !0);try {
            J.selection ? x(function () {
              J.selection.empty();
            }) : window.getSelection().removeAllRanges();
          } catch (t) {}
        }, _dragStarted: function _dragStarted() {
          if (I && C) {
            var e = this.options;s(C, e.ghostClass, !0), s(C, e.dragClass, !1), t.active = this, d(this, I, "start", C, I, I, Y);
          } else this._nulling();
        }, _emulateDragOver: function _emulateDragOver() {
          if (F) {
            if (this._lastX === F.clientX && this._lastY === F.clientY) return;this._lastX = F.clientX, this._lastY = F.clientY, it || l(S, "display", "none");var t = J.elementFromPoint(F.clientX, F.clientY),
                e = t,
                n = lt.length;if (t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(F.clientX, F.clientY), e = t), e) do {
              if (e[H]) {
                for (; n--;) {
                  lt[n]({ clientX: F.clientX, clientY: F.clientY, target: t, rootEl: e });
                }break;
              }t = e;
            } while (e = e.parentNode);it || l(S, "display", "");
          }
        }, _onTouchMove: function _onTouchMove(e) {
          if (U) {
            var n = this.options,
                i = n.fallbackTolerance,
                o = n.fallbackOffset,
                r = e.touches ? e.touches[0] : e,
                a = r.clientX - U.clientX + o.x,
                s = r.clientY - U.clientY + o.y,
                c = e.touches ? "translate3d(" + a + "px," + s + "px,0)" : "translate(" + a + "px," + s + "px)";if (!t.active) {
              if (i && at(rt(r.clientX - this._lastX), rt(r.clientY - this._lastY)) < i) return;this._dragStarted();
            }this._appendGhost(), V = !0, F = r, l(S, "webkitTransform", c), l(S, "mozTransform", c), l(S, "msTransform", c), l(S, "transform", c), e.preventDefault();
          }
        }, _appendGhost: function _appendGhost() {
          if (!S) {
            var t,
                e = C.getBoundingClientRect(),
                n = l(C),
                i = this.options;S = C.cloneNode(!0), s(S, i.ghostClass, !1), s(S, i.fallbackClass, !0), s(S, i.dragClass, !0), l(S, "top", e.top - z(n.marginTop, 10)), l(S, "left", e.left - z(n.marginLeft, 10)), l(S, "width", e.width), l(S, "height", e.height), l(S, "opacity", "0.8"), l(S, "position", "fixed"), l(S, "zIndex", "100000"), l(S, "pointerEvents", "none"), i.fallbackOnBody && J.body.appendChild(S) || I.appendChild(S), t = S.getBoundingClientRect(), l(S, "width", 2 * e.width - t.width), l(S, "height", 2 * e.height - t.height);
          }
        }, _onDragStart: function _onDragStart(t, e) {
          var n = this,
              i = t.dataTransfer,
              o = n.options;n._offUpEvents(), $.checkPull(n, n, C, t) && (E = y(C), E.draggable = !1, E.style["will-change"] = "", l(E, "display", "none"), s(E, n.options.chosenClass, !1), n._cloneId = x(function () {
            I.insertBefore(E, C), d(n, I, "clone", C);
          })), s(C, o.dragClass, !0), e ? ("touch" === e ? (r(J, "touchmove", n._onTouchMove), r(J, "touchend", n._onDrop), r(J, "touchcancel", n._onDrop), o.supportPointer && (r(J, "pointermove", n._onTouchMove), r(J, "pointerup", n._onDrop))) : (r(J, "mousemove", n._onTouchMove), r(J, "mouseup", n._onDrop)), n._loopId = setInterval(n._emulateDragOver, 50)) : (i && (i.effectAllowed = "move", o.setData && o.setData.call(n, i, C)), r(J, "drop", n), n._dragStartId = x(n._dragStarted));
        }, _onDragOver: function _onDragOver(i) {
          var o,
              r,
              a,
              s,
              c = this.el,
              d = this.options,
              h = d.group,
              g = t.active,
              v = $ === h,
              m = !1,
              b = d.sort;if (void 0 !== i.preventDefault && (i.preventDefault(), !d.dragoverBubble && i.stopPropagation()), !C.animated && (V = !0, g && !d.disabled && (v ? b || (s = !I.contains(C)) : X === this || (g.lastPullMode = $.checkPull(this, g, C, i)) && h.checkPut(this, g, C, i)) && (void 0 === i.rootEl || i.rootEl === this.el))) {
            if (ct(i, d, this.el), ot) return;if (o = n(i.target, d.draggable, c), r = C.getBoundingClientRect(), X !== this && (X = this, m = !0), s) return e(g, !0), T = I, void (E || L ? I.insertBefore(C, E || L) : b || I.appendChild(C));if (0 === c.children.length || c.children[0] === S || c === i.target && p(c, i)) {
              if (0 !== c.children.length && c.children[0] !== S && c === i.target && (o = c.lastElementChild), o) {
                if (o.animated) return;a = o.getBoundingClientRect();
              }e(g, v), !1 !== u(I, c, C, r, o, a, i) && (C.contains(c) || (c.appendChild(C), T = c), this._animate(r, C), o && this._animate(a, o));
            } else if (o && !o.animated && o !== C && void 0 !== o.parentNode[H]) {
              M !== o && (M = o, P = l(o), B = l(o.parentNode)), a = o.getBoundingClientRect();var _ = a.right - a.left,
                  y = a.bottom - a.top,
                  D = G.test(P.cssFloat + P.display) || "flex" == B.display && 0 === B["flex-direction"].indexOf("row"),
                  x = o.offsetWidth > C.offsetWidth,
                  w = o.offsetHeight > C.offsetHeight,
                  k = (D ? (i.clientX - a.left) / _ : (i.clientY - a.top) / y) > .5,
                  N = o.nextElementSibling,
                  O = !1;if (D) {
                var A = C.offsetTop,
                    Y = o.offsetTop;O = A === Y ? o.previousElementSibling === C && !x || k && x : o.previousElementSibling === C || C.previousElementSibling === o ? (i.clientY - a.top) / y > .5 : Y > A;
              } else m || (O = N !== C && !w || k && w);var R = u(I, c, C, r, o, a, i, O);!1 !== R && (1 !== R && -1 !== R || (O = 1 === R), ot = !0, K(f, 30), e(g, v), C.contains(c) || (O && !N ? c.appendChild(C) : o.parentNode.insertBefore(C, O ? N : o)), T = C.parentNode, this._animate(r, C), this._animate(a, o));
            }
          }
        }, _animate: function _animate(t, e) {
          var n = this.options.animation;if (n) {
            var i = e.getBoundingClientRect();1 === t.nodeType && (t = t.getBoundingClientRect()), l(e, "transition", "none"), l(e, "transform", "translate3d(" + (t.left - i.left) + "px," + (t.top - i.top) + "px,0)"), e.offsetWidth, l(e, "transition", "all " + n + "ms"), l(e, "transform", "translate3d(0,0,0)"), clearTimeout(e.animated), e.animated = K(function () {
              l(e, "transition", ""), l(e, "transform", ""), e.animated = !1;
            }, n);
          }
        }, _offUpEvents: function _offUpEvents() {
          var t = this.el.ownerDocument;a(J, "touchmove", this._onTouchMove), a(J, "pointermove", this._onTouchMove), a(t, "mouseup", this._onDrop), a(t, "touchend", this._onDrop), a(t, "pointerup", this._onDrop), a(t, "touchcancel", this._onDrop), a(t, "pointercancel", this._onDrop), a(t, "selectstart", this);
        }, _onDrop: function _onDrop(e) {
          var n = this.el,
              i = this.options;clearInterval(this._loopId), clearInterval(j.pid), clearTimeout(this._dragStartTimer), w(this._cloneId), w(this._dragStartId), a(J, "mouseover", this), a(J, "mousemove", this._onTouchMove), this.nativeDraggable && (a(J, "drop", this), a(n, "dragstart", this._onDragStart)), this._offUpEvents(), e && (V && (e.preventDefault(), !i.dropBubble && e.stopPropagation()), S && S.parentNode && S.parentNode.removeChild(S), I !== T && "clone" === t.active.lastPullMode || E && E.parentNode && E.parentNode.removeChild(E), C && (this.nativeDraggable && a(C, "dragend", this), h(C), C.style["will-change"] = "", s(C, this.options.ghostClass, !1), s(C, this.options.chosenClass, !1), d(this, I, "unchoose", C, T, I, Y), I !== T ? (R = v(C, i.draggable)) >= 0 && (d(null, T, "add", C, T, I, Y, R), d(this, I, "remove", C, T, I, Y, R), d(null, T, "sort", C, T, I, Y, R), d(this, I, "sort", C, T, I, Y, R)) : C.nextSibling !== L && (R = v(C, i.draggable)) >= 0 && (d(this, I, "update", C, T, I, Y, R), d(this, I, "sort", C, T, I, Y, R)), t.active && (null != R && -1 !== R || (R = Y), d(this, I, "end", C, T, I, Y, R), this.save()))), this._nulling();
        }, _nulling: function _nulling() {
          I = C = T = S = L = E = k = N = O = U = F = V = R = M = P = X = $ = t.active = null, st.forEach(function (t) {
            t.checked = !0;
          }), st.length = 0;
        }, handleEvent: function handleEvent(t) {
          switch (t.type) {case "drop":case "dragend":
              this._onDrop(t);break;case "dragover":case "dragenter":
              C && (this._onDragOver(t), o(t));break;case "mouseover":
              this._onDrop(t);break;case "selectstart":
              t.preventDefault();}
        }, toArray: function toArray() {
          for (var t, e = [], i = this.el.children, o = 0, r = i.length, a = this.options; o < r; o++) {
            t = i[o], n(t, a.draggable, this.el) && e.push(t.getAttribute(a.dataIdAttr) || g(t));
          }return e;
        }, sort: function sort(t) {
          var e = {},
              i = this.el;this.toArray().forEach(function (t, o) {
            var r = i.children[o];n(r, this.options.draggable, i) && (e[t] = r);
          }, this), t.forEach(function (t) {
            e[t] && (i.removeChild(e[t]), i.appendChild(e[t]));
          });
        }, save: function save() {
          var t = this.options.store;t && t.set(this);
        }, closest: function closest(t, e) {
          return n(t, e || this.options.draggable, this.el);
        }, option: function option(t, e) {
          var n = this.options;if (void 0 === e) return n[t];n[t] = e, "group" === t && dt(n);
        }, destroy: function destroy() {
          var t = this.el;t[H] = null, a(t, "mousedown", this._onTapStart), a(t, "touchstart", this._onTapStart), a(t, "pointerdown", this._onTapStart), this.nativeDraggable && (a(t, "dragover", this), a(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function (t) {
            t.removeAttribute("draggable");
          }), lt.splice(lt.indexOf(this._onDragOver), 1), this._onDrop(), this.el = t = null;
        } }, r(J, "touchmove", function (e) {
        t.active && e.preventDefault();
      }), t.utils = { on: r, off: a, css: l, find: c, is: function is(t, e) {
          return !!n(t, e, t);
        }, extend: _, throttle: b, closest: n, toggleClass: s, clone: y, index: v, nextTick: x, cancelNextTick: w }, t.create = function (e, n) {
        return new t(e, n);
      }, t.version = "1.7.0", t;
    });
  }, h6Vq: function h6Vq(t, e, n) {
    "use strict";
    var i = n("BO1k"),
        o = n.n(i),
        r = n("DAYN"),
        a = n.n(r);e.a = { name: "twoDndList", components: { draggable: a.a }, computed: { filterList2: function filterList2() {
          var t = this;return this.list2.filter(function (e) {
            return !!t.isNotInList1(e) && e;
          });
        } }, props: { list1: { type: Array, default: function _default() {
            return [];
          } }, list2: { type: Array, default: function _default() {
            return [];
          } }, list1Title: { type: String, default: "list1" }, list2Title: { type: String, default: "list2" }, width1: { type: String, default: "48%" }, width2: { type: String, default: "48%" } }, methods: { isNotInList1: function isNotInList1(t) {
          return this.list1.every(function (e) {
            return t.id !== e.id;
          });
        }, isNotInList2: function isNotInList2(t) {
          return this.list2.every(function (e) {
            return t.id !== e.id;
          });
        }, deleteEle: function deleteEle(t) {
          var e = !0,
              n = !1,
              i = void 0;try {
            for (var r, a = o()(this.list1); !(e = (r = a.next()).done); e = !0) {
              var s = r.value;if (s.id === t.id) {
                var l = this.list1.indexOf(s);this.list1.splice(l, 1);break;
              }
            }
          } catch (t) {
            n = !0, i = t;
          } finally {
            try {
              !e && a.return && a.return();
            } finally {
              if (n) throw i;
            }
          }this.isNotInList2(t) && this.list2.unshift(t);
        }, pushEle: function pushEle(t) {
          this.list1.push(t);
        } } };
  }, mhIu: function mhIu(t, e, n) {
    "use strict";
    var i = function i() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "twoDndList" }, [n("div", { staticClass: "twoDndList-list", style: { width: t.width1 } }, [n("h3", [t._v(t._s(t.list1Title))]), t._v(" "), n("draggable", { staticClass: "dragArea", attrs: { list: t.list1, options: { group: "article" } } }, t._l(t.list1, function (e) {
        return n("div", { key: e.id, staticClass: "list-complete-item" }, [n("div", { staticClass: "list-complete-item-handle" }, [t._v("[" + t._s(e.author) + "] " + t._s(e.title))]), t._v(" "), n("div", { staticStyle: { position: "absolute", right: "0px" } }, [n("span", { staticStyle: { float: "right", "margin-top": "-20px", "margin-right": "5px" }, on: { click: function click(n) {
              t.deleteEle(e);
            } } }, [n("i", { staticClass: "el-icon-delete", staticStyle: { color: "#ff4949" } })])])]);
      }))], 1), t._v(" "), n("div", { staticClass: "twoDndList-list", style: { width: t.width2 } }, [n("h3", [t._v(t._s(t.list2Title))]), t._v(" "), n("draggable", { staticClass: "dragArea", attrs: { list: t.filterList2, options: { group: "article" } } }, t._l(t.filterList2, function (e) {
        return n("div", { key: e.id, staticClass: "list-complete-item" }, [n("div", { staticClass: "list-complete-item-handle2", on: { click: function click(n) {
              t.pushEle(e);
            } } }, [t._v(" [" + t._s(e.author) + "] " + t._s(e.title))])]);
      }))], 1)]);
    },
        o = [],
        r = { render: i, staticRenderFns: o };e.a = r;
  }, qhpN: function qhpN(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = n("Uh1i"),
        o = n("cJoO"),
        r = n("VU/8"),
        a = r(i.a, o.a, null, null, null);e.default = a.exports;
  }, viA7: function viA7(t, e, n) {
    "use strict";
    function i(t) {
      return n.i(a.a)({ url: "/article/list", method: "get", params: t });
    }function o() {
      return n.i(a.a)({ url: "/article/detail", method: "get" });
    }function r(t) {
      return n.i(a.a)({ url: "/article/pv", method: "get", params: { pv: t } });
    }e.a = i, e.c = o, e.b = r;var a = n("Vo7i");
  }, wYK6: function wYK6(t, e, n) {
    "use strict";
    function i(t) {
      n("C/gx");
    }var o = n("h6Vq"),
        r = n("mhIu"),
        a = n("VU/8"),
        s = i,
        l = a(o.a, r.a, s, "data-v-1361f327", null);e.a = l.exports;
  } });
//# sourceMappingURL=13.99b433873a88800a0187.js.map