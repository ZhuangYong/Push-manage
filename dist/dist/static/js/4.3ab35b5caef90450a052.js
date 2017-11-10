"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

webpackJsonp([4], { "0tbE": function tbE(e, t, r) {
    var n = r("irzF");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("037bc92a", n, !0);
  }, "4/hK": function hK(e, t, r) {
    var n = r("BsEP");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("5e9a0932", n, !0);
  }, "4IWT": function IWT(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";
      e.registerHelper("lint", "json", function (t) {
        var r = [];jsonlint.parseError = function (t, n) {
          var i = n.loc;r.push({ from: e.Pos(i.first_line - 1, i.first_column), to: e.Pos(i.last_line - 1, i.last_column), message: t });
        };try {
          jsonlint.parse(t);
        } catch (e) {}return r;
      });
    });
  }, "5IAE": function IAE(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";
      function t(e, t, r) {
        return (/^(?:operator|sof|keyword c|case|new|export|default|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (r || 0)))
        );
      }e.defineMode("javascript", function (r, n) {
        function i(e) {
          for (var t, r = !1, n = !1; null != (t = e.next());) {
            if (!r) {
              if ("/" == t && !n) return;"[" == t ? n = !0 : n && "]" == t && (n = !1);
            }r = !r && "\\" == t;
          }
        }function o(e, t, r) {
          return Se = e, Me = r, t;
        }function l(e, r) {
          var n = e.next();if ('"' == n || "'" == n) return r.tokenize = a(n), r.tokenize(e, r);if ("." == n && e.match(/^\d+(?:[eE][+\-]?\d+)?/)) return o("number", "number");if ("." == n && e.match("..")) return o("spread", "meta");if (/[\[\]{}\(\),;\:\.]/.test(n)) return o(n);if ("=" == n && e.eat(">")) return o("=>", "operator");if ("0" == n && e.eat(/x/i)) return e.eatWhile(/[\da-f]/i), o("number", "number");if ("0" == n && e.eat(/o/i)) return e.eatWhile(/[0-7]/i), o("number", "number");if ("0" == n && e.eat(/b/i)) return e.eatWhile(/[01]/i), o("number", "number");if (/\d/.test(n)) return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), o("number", "number");if ("/" == n) return e.eat("*") ? (r.tokenize = s, s(e, r)) : e.eat("/") ? (e.skipToEnd(), o("comment", "comment")) : t(e, r, 1) ? (i(e), e.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/), o("regexp", "string-2")) : (e.eatWhile(Ie), o("operator", "operator", e.current()));if ("`" == n) return r.tokenize = c, c(e, r);if ("#" == n) return e.skipToEnd(), o("error", "error");if (Ie.test(n)) return ">" == n && r.lexical && ">" == r.lexical.type || e.eatWhile(Ie), o("operator", "operator", e.current());if (De.test(n)) {
            e.eatWhile(De);var l = e.current(),
                u = We.propertyIsEnumerable(l) && We[l];return u && "." != r.lastType ? o(u.type, u.style, l) : o("variable", "variable", l);
          }
        }function a(e) {
          return function (t, r) {
            var n,
                i = !1;if (Ne && "@" == t.peek() && t.match(He)) return r.tokenize = l, o("jsonld-keyword", "meta");for (; null != (n = t.next()) && (n != e || i);) {
              i = !i && "\\" == n;
            }return i || (r.tokenize = l), o("string", "string");
          };
        }function s(e, t) {
          for (var r, n = !1; r = e.next();) {
            if ("/" == r && n) {
              t.tokenize = l;break;
            }n = "*" == r;
          }return o("comment", "comment");
        }function c(e, t) {
          for (var r, n = !1; null != (r = e.next());) {
            if (!n && ("`" == r || "$" == r && e.eat("{"))) {
              t.tokenize = l;break;
            }n = !n && "\\" == r;
          }return o("quasi", "string-2", e.current());
        }function u(e, t) {
          t.fatArrowAt && (t.fatArrowAt = null);var r = e.string.indexOf("=>", e.start);if (!(r < 0)) {
            if (Ee) {
              var n = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, r));n && (r = n.index);
            }for (var i = 0, o = !1, l = r - 1; l >= 0; --l) {
              var a = e.string.charAt(l),
                  s = Re.indexOf(a);if (s >= 0 && s < 3) {
                if (!i) {
                  ++l;break;
                }if (0 == --i) {
                  "(" == a && (o = !0);break;
                }
              } else if (s >= 3 && s < 6) ++i;else if (De.test(a)) o = !0;else {
                if (/["'\/]/.test(a)) return;if (o && !i) {
                  ++l;break;
                }
              }
            }o && !i && (t.fatArrowAt = l);
          }
        }function f(e, t, r, n, i, o) {
          this.indented = e, this.column = t, this.type = r, this.prev = i, this.info = o, null != n && (this.align = n);
        }function d(e, t) {
          for (var r = e.localVars; r; r = r.next) {
            if (r.name == t) return !0;
          }for (var n = e.context; n; n = n.prev) {
            for (var r = n.vars; r; r = r.next) {
              if (r.name == t) return !0;
            }
          }
        }function h(e, t, r, n, i) {
          var o = e.cc;for (Fe.state = e, Fe.stream = i, Fe.marked = null, Fe.cc = o, Fe.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;) {
            if ((o.length ? o.pop() : Oe ? k : C)(r, n)) {
              for (; o.length && o[o.length - 1].lex;) {
                o.pop()();
              }return Fe.marked ? Fe.marked : "variable" == r && d(e, n) ? "variable-2" : t;
            }
          }
        }function p() {
          for (var e = arguments.length - 1; e >= 0; e--) {
            Fe.cc.push(arguments[e]);
          }
        }function g() {
          return p.apply(null, arguments), !0;
        }function m(e) {
          function t(t) {
            for (var r = t; r; r = r.next) {
              if (r.name == e) return !0;
            }return !1;
          }var r = Fe.state;if (Fe.marked = "def", r.context) {
            if (t(r.localVars)) return;r.localVars = { name: e, next: r.localVars };
          } else {
            if (t(r.globalVars)) return;n.globalVars && (r.globalVars = { name: e, next: r.globalVars });
          }
        }function v() {
          Fe.state.context = { prev: Fe.state.context, vars: Fe.state.localVars }, Fe.state.localVars = Pe;
        }function y() {
          Fe.state.localVars = Fe.state.context.vars, Fe.state.context = Fe.state.context.prev;
        }function b(e, t) {
          var r = function r() {
            var r = Fe.state,
                n = r.indented;if ("stat" == r.lexical.type) n = r.lexical.indented;else for (var i = r.lexical; i && ")" == i.type && i.align; i = i.prev) {
              n = i.indented;
            }r.lexical = new f(n, Fe.stream.column(), e, null, r.lexical, t);
          };return r.lex = !0, r;
        }function x() {
          var e = Fe.state;e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev);
        }function w(e) {
          function t(r) {
            return r == e ? g() : ";" == e ? p() : g(t);
          }return t;
        }function C(e, t) {
          return "var" == e ? g(b("vardef", t.length), q, w(";"), x) : "keyword a" == e ? g(b("form"), S, C, x) : "keyword b" == e ? g(b("form"), C, x) : "{" == e ? g(b("}"), V, x) : ";" == e ? g() : "if" == e ? ("else" == Fe.state.lexical.info && Fe.state.cc[Fe.state.cc.length - 1] == x && Fe.state.cc.pop()(), g(b("form"), S, C, x, ne)) : "function" == e ? g(ce) : "for" == e ? g(b("form"), ie, C, x) : "variable" == e ? Ee && "type" == t ? (Fe.marked = "keyword", g(K, w("operator"), K, w(";"))) : g(b("stat"), F) : "switch" == e ? g(b("form"), S, w("{"), b("}", "switch"), V, x, x) : "case" == e ? g(k, w(":")) : "default" == e ? g(w(":")) : "catch" == e ? g(b("form"), v, w("("), ue, w(")"), C, x, y) : "class" == e ? g(b("form"), de, x) : "export" == e ? g(b("stat"), me, x) : "import" == e ? g(b("stat"), ye, x) : "module" == e ? g(b("form"), Z, w("{"), b("}"), V, x, x) : "async" == e ? g(C) : "@" == t ? g(k, C) : p(b("stat"), k, w(";"), x);
        }function k(e) {
          return M(e, !1);
        }function A(e) {
          return M(e, !0);
        }function S(e) {
          return "(" != e ? p() : g(b(")"), k, w(")"), x);
        }function M(e, t) {
          if (Fe.state.fatArrowAt == Fe.stream.start) {
            var r = t ? I : W;if ("(" == e) return g(v, b(")"), $(Z, ")"), x, w("=>"), r, y);if ("variable" == e) return p(v, Z, w("=>"), r, y);
          }var n = t ? O : N;return ze.hasOwnProperty(e) ? g(n) : "function" == e ? g(ce, n) : "class" == e ? g(b("form"), fe, x) : "keyword c" == e || "async" == e ? g(t ? T : L) : "(" == e ? g(b(")"), L, w(")"), x, n) : "operator" == e || "spread" == e ? g(t ? A : k) : "[" == e ? g(b("]"), ke, x, n) : "{" == e ? j(B, "}", null, n) : "quasi" == e ? p(E, n) : "new" == e ? g(H(t)) : g();
        }function L(e) {
          return e.match(/[;\}\)\],]/) ? p() : p(k);
        }function T(e) {
          return e.match(/[;\}\)\],]/) ? p() : p(A);
        }function N(e, t) {
          return "," == e ? g(k) : O(e, t, !1);
        }function O(e, t, r) {
          var n = 0 == r ? N : O,
              i = 0 == r ? k : A;return "=>" == e ? g(v, r ? I : W, y) : "operator" == e ? /\+\+|--/.test(t) ? g(n) : "?" == t ? g(k, w(":"), i) : g(i) : "quasi" == e ? p(E, n) : ";" != e ? "(" == e ? j(A, ")", "call", n) : "." == e ? g(P, n) : "[" == e ? g(b("]"), L, w("]"), x, n) : void 0 : void 0;
        }function E(e, t) {
          return "quasi" != e ? p() : "${" != t.slice(t.length - 2) ? g(E) : g(k, D);
        }function D(e) {
          if ("}" == e) return Fe.marked = "string-2", Fe.state.tokenize = c, g(E);
        }function W(e) {
          return u(Fe.stream, Fe.state), p("{" == e ? C : k);
        }function I(e) {
          return u(Fe.stream, Fe.state), p("{" == e ? C : A);
        }function H(e) {
          return function (t) {
            return "." == t ? g(e ? z : R) : p(e ? A : k);
          };
        }function R(e, t) {
          if ("target" == t) return Fe.marked = "keyword", g(N);
        }function z(e, t) {
          if ("target" == t) return Fe.marked = "keyword", g(O);
        }function F(e) {
          return ":" == e ? g(x, C) : p(N, w(";"), x);
        }function P(e) {
          if ("variable" == e) return Fe.marked = "property", g();
        }function B(e, t) {
          return "async" == e ? (Fe.marked = "property", g(B)) : "variable" == e || "keyword" == Fe.style ? (Fe.marked = "property", g("get" == t || "set" == t ? _ : U)) : "number" == e || "string" == e ? (Fe.marked = Ne ? "property" : Fe.style + " property", g(U)) : "jsonld-keyword" == e ? g(U) : "modifier" == e ? g(B) : "[" == e ? g(k, w("]"), U) : "spread" == e ? g(k) : ":" == e ? p(U) : void 0;
        }function _(e) {
          return "variable" != e ? p(U) : (Fe.marked = "property", g(ce));
        }function U(e) {
          return ":" == e ? g(A) : "(" == e ? p(ce) : void 0;
        }function $(e, t, r) {
          function n(i, o) {
            if (r ? r.indexOf(i) > -1 : "," == i) {
              var l = Fe.state.lexical;return "call" == l.info && (l.pos = (l.pos || 0) + 1), g(function (r, n) {
                return r == t || n == t ? p() : p(e);
              }, n);
            }return i == t || o == t ? g() : g(w(t));
          }return function (r, i) {
            return r == t || i == t ? g() : p(e, n);
          };
        }function j(e, t, r) {
          for (var n = 3; n < arguments.length; n++) {
            Fe.cc.push(arguments[n]);
          }return g(b(t, r), $(e, t), x);
        }function V(e) {
          return "}" == e ? g() : p(C, V);
        }function G(e, t) {
          if (Ee) {
            if (":" == e) return g(K);if ("?" == t) return g(G);
          }
        }function K(e) {
          return "variable" == e ? (Fe.marked = "variable-3", g(J)) : "string" == e || "number" == e || "atom" == e ? g(J) : "{" == e ? g(b("}"), $(Y, "}", ",;"), x, J) : "(" == e ? g($(Q, ")"), X) : void 0;
        }function X(e) {
          if ("=>" == e) return g(K);
        }function Y(e, t) {
          return "variable" == e || "keyword" == Fe.style ? (Fe.marked = "property", g(Y)) : "?" == t ? g(Y) : ":" == e ? g(K) : "[" == e ? g(k, G, w("]"), Y) : void 0;
        }function Q(e) {
          return "variable" == e ? g(Q) : ":" == e ? g(K) : void 0;
        }function J(e, t) {
          return "<" == t ? g(b(">"), $(K, ">"), x, J) : "|" == t || "." == e ? g(K) : "[" == e ? g(w("]"), J) : "extends" == t ? g(K) : void 0;
        }function q() {
          return p(Z, G, te, re);
        }function Z(e, t) {
          return "modifier" == e ? g(Z) : "variable" == e ? (m(t), g()) : "spread" == e ? g(Z) : "[" == e ? j(Z, "]") : "{" == e ? j(ee, "}") : void 0;
        }function ee(e, t) {
          return "variable" != e || Fe.stream.match(/^\s*:/, !1) ? ("variable" == e && (Fe.marked = "property"), "spread" == e ? g(Z) : "}" == e ? p() : g(w(":"), Z, te)) : (m(t), g(te));
        }function te(e, t) {
          if ("=" == t) return g(A);
        }function re(e) {
          if ("," == e) return g(q);
        }function ne(e, t) {
          if ("keyword b" == e && "else" == t) return g(b("form", "else"), C, x);
        }function ie(e) {
          if ("(" == e) return g(b(")"), oe, w(")"), x);
        }function oe(e) {
          return "var" == e ? g(q, w(";"), ae) : ";" == e ? g(ae) : "variable" == e ? g(le) : p(k, w(";"), ae);
        }function le(e, t) {
          return "in" == t || "of" == t ? (Fe.marked = "keyword", g(k)) : g(N, ae);
        }function ae(e, t) {
          return ";" == e ? g(se) : "in" == t || "of" == t ? (Fe.marked = "keyword", g(k)) : p(k, w(";"), se);
        }function se(e) {
          ")" != e && g(k);
        }function ce(e, t) {
          return "*" == t ? (Fe.marked = "keyword", g(ce)) : "variable" == e ? (m(t), g(ce)) : "(" == e ? g(v, b(")"), $(ue, ")"), x, G, C, y) : Ee && "<" == t ? g(b(">"), $(K, ">"), x, ce) : void 0;
        }function ue(e) {
          return "spread" == e ? g(ue) : p(Z, G, te);
        }function fe(e, t) {
          return "variable" == e ? de(e, t) : he(e, t);
        }function de(e, t) {
          if ("variable" == e) return m(t), g(he);
        }function he(e, t) {
          return "<" == t ? g(b(">"), $(K, ">"), x, he) : "extends" == t || "implements" == t || Ee && "," == e ? g(Ee ? K : k, he) : "{" == e ? g(b("}"), pe, x) : void 0;
        }function pe(e, t) {
          return "variable" == e || "keyword" == Fe.style ? ("async" == t || "static" == t || "get" == t || "set" == t || Ee && ("public" == t || "private" == t || "protected" == t || "readonly" == t || "abstract" == t)) && Fe.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (Fe.marked = "keyword", g(pe)) : (Fe.marked = "property", g(Ee ? ge : ce, pe)) : "[" == e ? g(k, w("]"), Ee ? ge : ce, pe) : "*" == t ? (Fe.marked = "keyword", g(pe)) : ";" == e ? g(pe) : "}" == e ? g() : "@" == t ? g(k, pe) : void 0;
        }function ge(e, t) {
          return "?" == t ? g(ge) : ":" == e ? g(K, te) : "=" == t ? g(A) : p(ce);
        }function me(e, t) {
          return "*" == t ? (Fe.marked = "keyword", g(Ce, w(";"))) : "default" == t ? (Fe.marked = "keyword", g(k, w(";"))) : "{" == e ? g($(ve, "}"), Ce, w(";")) : p(C);
        }function ve(e, t) {
          return "as" == t ? (Fe.marked = "keyword", g(w("variable"))) : "variable" == e ? p(A, ve) : void 0;
        }function ye(e) {
          return "string" == e ? g() : p(be, xe, Ce);
        }function be(e, t) {
          return "{" == e ? j(be, "}") : ("variable" == e && m(t), "*" == t && (Fe.marked = "keyword"), g(we));
        }function xe(e) {
          if ("," == e) return g(be, xe);
        }function we(e, t) {
          if ("as" == t) return Fe.marked = "keyword", g(be);
        }function Ce(e, t) {
          if ("from" == t) return Fe.marked = "keyword", g(k);
        }function ke(e) {
          return "]" == e ? g() : p($(A, "]"));
        }function Ae(e, t) {
          return "operator" == e.lastType || "," == e.lastType || Ie.test(t.charAt(0)) || /[,.]/.test(t.charAt(0));
        }var Se,
            Me,
            Le = r.indentUnit,
            Te = n.statementIndent,
            Ne = n.jsonld,
            Oe = n.json || Ne,
            Ee = n.typescript,
            De = n.wordCharacters || /[\w$\xa1-\uffff]/,
            We = function () {
          function e(e) {
            return { type: e, style: "keyword" };
          }var t = e("keyword a"),
              r = e("keyword b"),
              n = e("keyword c"),
              i = e("operator"),
              o = { type: "atom", style: "atom" },
              l = { if: e("if"), while: t, with: t, else: r, do: r, try: r, finally: r, return: n, break: n, continue: n, new: e("new"), delete: n, throw: n, debugger: n, var: e("var"), const: e("var"), let: e("var"), function: e("function"), catch: e("catch"), for: e("for"), switch: e("switch"), case: e("case"), default: e("default"), in: i, typeof: i, instanceof: i, true: o, false: o, null: o, undefined: o, NaN: o, Infinity: o, this: e("this"), class: e("class"), super: e("atom"), yield: n, export: e("export"), import: e("import"), extends: n, await: n, async: e("async") };if (Ee) {
            var a = { type: "variable", style: "variable-3" },
                s = { interface: e("class"), implements: n, namespace: n, module: e("module"), enum: e("module"), public: e("modifier"), private: e("modifier"), protected: e("modifier"), abstract: e("modifier"), as: i, string: a, number: a, boolean: a, any: a };for (var c in s) {
              l[c] = s[c];
            }
          }return l;
        }(),
            Ie = /[+\-*&%=<>!?|~^@]/,
            He = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
            Re = "([{}])",
            ze = { atom: !0, number: !0, variable: !0, string: !0, regexp: !0, this: !0, "jsonld-keyword": !0 },
            Fe = { state: null, column: null, marked: null, cc: null },
            Pe = { name: "this", next: { name: "arguments" } };return x.lex = !0, { startState: function startState(e) {
            var t = { tokenize: l, lastType: "sof", cc: [], lexical: new f((e || 0) - Le, 0, "block", !1), localVars: n.localVars, context: n.localVars && { vars: n.localVars }, indented: e || 0 };return n.globalVars && "object" == (0, _typeof3.default)(n.globalVars) && (t.globalVars = n.globalVars), t;
          }, token: function token(e, t) {
            if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), u(e, t)), t.tokenize != s && e.eatSpace()) return null;var r = t.tokenize(e, t);return "comment" == Se ? r : (t.lastType = "operator" != Se || "++" != Me && "--" != Me ? Se : "incdec", h(t, r, Se, Me, e));
          }, indent: function indent(t, r) {
            if (t.tokenize == s) return e.Pass;if (t.tokenize != l) return 0;var i,
                o = r && r.charAt(0),
                a = t.lexical;if (!/^\s*else\b/.test(r)) for (var c = t.cc.length - 1; c >= 0; --c) {
              var u = t.cc[c];if (u == x) a = a.prev;else if (u != ne) break;
            }for (; ("stat" == a.type || "form" == a.type) && ("}" == o || (i = t.cc[t.cc.length - 1]) && (i == N || i == O) && !/^[,\.=+\-*:?[\(]/.test(r));) {
              a = a.prev;
            }Te && ")" == a.type && "stat" == a.prev.type && (a = a.prev);var f = a.type,
                d = o == f;return "vardef" == f ? a.indented + ("operator" == t.lastType || "," == t.lastType ? a.info + 1 : 0) : "form" == f && "{" == o ? a.indented : "form" == f ? a.indented + Le : "stat" == f ? a.indented + (Ae(t, r) ? Te || Le : 0) : "switch" != a.info || d || 0 == n.doubleIndentSwitch ? a.align ? a.column + (d ? 0 : 1) : a.indented + (d ? 0 : Le) : a.indented + (/^(?:case|default)\b/.test(r) ? Le : 2 * Le);
          }, electricInput: /^\s*(?:case .*?:|default:|\{|\})$/, blockCommentStart: Oe ? null : "/*", blockCommentEnd: Oe ? null : "*/", lineComment: Oe ? null : "//", fold: "brace", closeBrackets: "()[]{}''\"\"``", helperType: Oe ? "json" : "javascript", jsonldMode: Ne, jsonMode: Oe, expressionAllowed: t, skipExpression: function skipExpression(e) {
            var t = e.cc[e.cc.length - 1];t != k && t != A || e.cc.pop();
          } };
      }), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", { name: "javascript", json: !0 }), e.defineMIME("application/x-json", { name: "javascript", json: !0 }), e.defineMIME("application/ld+json", { name: "javascript", jsonld: !0 }), e.defineMIME("text/typescript", { name: "javascript", typescript: !0 }), e.defineMIME("application/typescript", { name: "javascript", typescript: !0 });
    });
  }, "61lE": function lE(e, t, r) {
    var n = r("PmcG");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("2f579f3a", n, !0);
  }, "8U58": function U58(e, t, r) {
    !function (t, r) {
      e.exports = r();
    }(0, function () {
      "use strict";
      function e(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
      }function t(e) {
        for (var t = e.childNodes.length; t > 0; --t) {
          e.removeChild(e.firstChild);
        }return e;
      }function r(e, r) {
        return t(e).appendChild(r);
      }function n(e, t, r, n) {
        var i = document.createElement(e);if (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t) i.appendChild(document.createTextNode(t));else if (t) for (var o = 0; o < t.length; ++o) {
          i.appendChild(t[o]);
        }return i;
      }function i(e, t, r, i) {
        var o = n(e, t, r, i);return o.setAttribute("role", "presentation"), o;
      }function o(e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);do {
          if (11 == t.nodeType && (t = t.host), t == e) return !0;
        } while (t = t.parentNode);
      }function l() {
        var e;try {
          e = document.activeElement;
        } catch (t) {
          e = document.body || null;
        }for (; e && e.shadowRoot && e.shadowRoot.activeElement;) {
          e = e.shadowRoot.activeElement;
        }return e;
      }function a(t, r) {
        var n = t.className;e(r).test(n) || (t.className += (n ? " " : "") + r);
      }function s(t, r) {
        for (var n = t.split(" "), i = 0; i < n.length; i++) {
          n[i] && !e(n[i]).test(r) && (r += " " + n[i]);
        }return r;
      }function c(e) {
        var t = Array.prototype.slice.call(arguments, 1);return function () {
          return e.apply(null, t);
        };
      }function u(e, t, r) {
        t || (t = {});for (var n in e) {
          !e.hasOwnProperty(n) || !1 === r && t.hasOwnProperty(n) || (t[n] = e[n]);
        }return t;
      }function f(e, t, r, n, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);for (var o = n || 0, l = i || 0;;) {
          var a = e.indexOf("\t", o);if (a < 0 || a >= t) return l + (t - o);l += a - o, l += r - l % r, o = a + 1;
        }
      }function d(e, t) {
        for (var r = 0; r < e.length; ++r) {
          if (e[r] == t) return r;
        }return -1;
      }function h(e, t, r) {
        for (var n = 0, i = 0;;) {
          var o = e.indexOf("\t", n);-1 == o && (o = e.length);var l = o - n;if (o == e.length || i + l >= t) return n + Math.min(l, t - i);if (i += o - n, i += r - i % r, n = o + 1, i >= t) return n;
        }
      }function p(e) {
        for (; Dl.length <= e;) {
          Dl.push(g(Dl) + " ");
        }return Dl[e];
      }function g(e) {
        return e[e.length - 1];
      }function m(e, t) {
        for (var r = [], n = 0; n < e.length; n++) {
          r[n] = t(e[n], n);
        }return r;
      }function v(e, t, r) {
        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i;) {
          n++;
        }e.splice(n, 0, t);
      }function y() {}function b(e, t) {
        var r;return _create2.default ? r = (0, _create2.default)(e) : (y.prototype = e, r = new y()), t && u(t, r), r;
      }function x(e) {
        return (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Wl.test(e))
        );
      }function w(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && x(e)) || t.test(e) : x(e);
      }function C(e) {
        for (var t in e) {
          if (e.hasOwnProperty(t) && e[t]) return !1;
        }return !0;
      }function k(e) {
        return e.charCodeAt(0) >= 768 && Il.test(e);
      }function A(e, t, r) {
        for (; (r < 0 ? t > 0 : t < e.length) && k(e.charAt(t));) {
          t += r;
        }return t;
      }function S(e, t, r) {
        for (;;) {
          if (Math.abs(t - r) <= 1) return e(t) ? t : r;var n = Math.floor((t + r) / 2);e(n) ? r = n : t = n;
        }
      }function M(e, t, r) {
        var o = this;this.input = r, o.scrollbarFiller = n("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = n("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = i("div", null, "CodeMirror-code"), o.selectionDiv = n("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = n("div", null, "CodeMirror-cursors"), o.measure = n("div", null, "CodeMirror-measure"), o.lineMeasure = n("div", null, "CodeMirror-measure"), o.lineSpace = i("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");var l = i("div", [o.lineSpace], "CodeMirror-lines");o.mover = n("div", [l], null, "position: relative"), o.sizer = n("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = n("div", null, null, "position: absolute; height: " + Ll + "px; width: 1px;"), o.gutters = n("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = n("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = n("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), nl && il < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), ol || Zo && pl || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, r.init(o);
      }function L(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");for (var r = e; !r.lines;) {
          for (var n = 0;; ++n) {
            var i = r.children[n],
                o = i.chunkSize();if (t < o) {
              r = i;break;
            }t -= o;
          }
        }return r.lines[t];
      }function T(e, t, r) {
        var n = [],
            i = t.line;return e.iter(t.line, r.line + 1, function (e) {
          var o = e.text;i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i;
        }), n;
      }function N(e, t, r) {
        var n = [];return e.iter(t, r, function (e) {
          n.push(e.text);
        }), n;
      }function O(e, t) {
        var r = t - e.height;if (r) for (var n = e; n; n = n.parent) {
          n.height += r;
        }
      }function E(e) {
        if (null == e.parent) return null;for (var t = e.parent, r = d(t.lines, e), n = t.parent; n; t = n, n = n.parent) {
          for (var i = 0; n.children[i] != t; ++i) {
            r += n.children[i].chunkSize();
          }
        }return r + t.first;
      }function D(e, t) {
        var r = e.first;e: do {
          for (var n = 0; n < e.children.length; ++n) {
            var i = e.children[n],
                o = i.height;if (t < o) {
              e = i;continue e;
            }t -= o, r += i.chunkSize();
          }return r;
        } while (!e.lines);for (var l = 0; l < e.lines.length; ++l) {
          var a = e.lines[l],
              s = a.height;if (t < s) break;t -= s;
        }return r + l;
      }function W(e, t) {
        return t >= e.first && t < e.first + e.size;
      }function I(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }function H(e, t, r) {
        if (void 0 === r && (r = null), !(this instanceof H)) return new H(e, t, r);this.line = e, this.ch = t, this.sticky = r;
      }function R(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }function z(e, t) {
        return e.sticky == t.sticky && 0 == R(e, t);
      }function F(e) {
        return H(e.line, e.ch);
      }function P(e, t) {
        return R(e, t) < 0 ? t : e;
      }function B(e, t) {
        return R(e, t) < 0 ? e : t;
      }function _(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }function U(e, t) {
        if (t.line < e.first) return H(e.first, 0);var r = e.first + e.size - 1;return t.line > r ? H(r, L(e, r).text.length) : $(t, L(e, t.line).text.length);
      }function $(e, t) {
        var r = e.ch;return null == r || r > t ? H(e.line, t) : r < 0 ? H(e.line, 0) : e;
      }function j(e, t) {
        for (var r = [], n = 0; n < t.length; n++) {
          r[n] = U(e, t[n]);
        }return r;
      }function V() {
        Hl = !0;
      }function G() {
        Rl = !0;
      }function K(e, t, r) {
        this.marker = e, this.from = t, this.to = r;
      }function X(e, t) {
        if (e) for (var r = 0; r < e.length; ++r) {
          var n = e[r];if (n.marker == t) return n;
        }
      }function Y(e, t) {
        for (var r, n = 0; n < e.length; ++n) {
          e[n] != t && (r || (r = [])).push(e[n]);
        }return r;
      }function Q(e, t) {
        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e);
      }function J(e, t, r) {
        var n;if (e) for (var i = 0; i < e.length; ++i) {
          var o = e[i],
              l = o.marker,
              a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);if (a || o.from == t && "bookmark" == l.type && (!r || !o.marker.insertLeft)) {
            var s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);(n || (n = [])).push(new K(l, o.from, s ? null : o.to));
          }
        }return n;
      }function q(e, t, r) {
        var n;if (e) for (var i = 0; i < e.length; ++i) {
          var o = e[i],
              l = o.marker,
              a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);if (a || o.from == t && "bookmark" == l.type && (!r || o.marker.insertLeft)) {
            var s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);(n || (n = [])).push(new K(l, s ? null : o.from - t, null == o.to ? null : o.to - t));
          }
        }return n;
      }function Z(e, t) {
        if (t.full) return null;var r = W(e, t.from.line) && L(e, t.from.line).markedSpans,
            n = W(e, t.to.line) && L(e, t.to.line).markedSpans;if (!r && !n) return null;var i = t.from.ch,
            o = t.to.ch,
            l = 0 == R(t.from, t.to),
            a = J(r, i, l),
            s = q(n, o, l),
            c = 1 == t.text.length,
            u = g(t.text).length + (c ? i : 0);if (a) for (var f = 0; f < a.length; ++f) {
          var d = a[f];if (null == d.to) {
            var h = X(s, d.marker);h ? c && (d.to = null == h.to ? null : h.to + u) : d.to = i;
          }
        }if (s) for (var p = 0; p < s.length; ++p) {
          var m = s[p];if (null != m.to && (m.to += u), null == m.from) {
            var v = X(a, m.marker);v || (m.from = u, c && (a || (a = [])).push(m));
          } else m.from += u, c && (a || (a = [])).push(m);
        }a && (a = ee(a)), s && s != a && (s = ee(s));var y = [a];if (!c) {
          var b,
              x = t.text.length - 2;if (x > 0 && a) for (var w = 0; w < a.length; ++w) {
            null == a[w].to && (b || (b = [])).push(new K(a[w].marker, null, null));
          }for (var C = 0; C < x; ++C) {
            y.push(b);
          }y.push(s);
        }return y;
      }function ee(e) {
        for (var t = 0; t < e.length; ++t) {
          var r = e[t];null != r.from && r.from == r.to && !1 !== r.marker.clearWhenEmpty && e.splice(t--, 1);
        }return e.length ? e : null;
      }function te(e, t, r) {
        var n = null;if (e.iter(t.line, r.line + 1, function (e) {
          if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
            var r = e.markedSpans[t].marker;!r.readOnly || n && -1 != d(n, r) || (n || (n = [])).push(r);
          }
        }), !n) return null;for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o) {
          for (var l = n[o], a = l.find(0), s = 0; s < i.length; ++s) {
            var c = i[s];if (!(R(c.to, a.from) < 0 || R(c.from, a.to) > 0)) {
              var u = [s, 1],
                  f = R(c.from, a.from),
                  h = R(c.to, a.to);(f < 0 || !l.inclusiveLeft && !f) && u.push({ from: c.from, to: a.from }), (h > 0 || !l.inclusiveRight && !h) && u.push({ from: a.to, to: c.to }), i.splice.apply(i, u), s += u.length - 3;
            }
          }
        }return i;
      }function re(e) {
        var t = e.markedSpans;if (t) {
          for (var r = 0; r < t.length; ++r) {
            t[r].marker.detachLine(e);
          }e.markedSpans = null;
        }
      }function ne(e, t) {
        if (t) {
          for (var r = 0; r < t.length; ++r) {
            t[r].marker.attachLine(e);
          }e.markedSpans = t;
        }
      }function ie(e) {
        return e.inclusiveLeft ? -1 : 0;
      }function oe(e) {
        return e.inclusiveRight ? 1 : 0;
      }function le(e, t) {
        var r = e.lines.length - t.lines.length;if (0 != r) return r;var n = e.find(),
            i = t.find(),
            o = R(n.from, i.from) || ie(e) - ie(t);if (o) return -o;var l = R(n.to, i.to) || oe(e) - oe(t);return l || t.id - e.id;
      }function ae(e, t) {
        var r,
            n = Rl && e.markedSpans;if (n) for (var i = void 0, o = 0; o < n.length; ++o) {
          i = n[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!r || le(r, i.marker) < 0) && (r = i.marker);
        }return r;
      }function se(e) {
        return ae(e, !0);
      }function ce(e) {
        return ae(e, !1);
      }function ue(e, t, r, n, i) {
        var o = L(e, t),
            l = Rl && o.markedSpans;if (l) for (var a = 0; a < l.length; ++a) {
          var s = l[a];if (s.marker.collapsed) {
            var c = s.marker.find(0),
                u = R(c.from, r) || ie(s.marker) - ie(i),
                f = R(c.to, n) || oe(s.marker) - oe(i);if (!(u >= 0 && f <= 0 || u <= 0 && f >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? R(c.to, r) >= 0 : R(c.to, r) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? R(c.from, n) <= 0 : R(c.from, n) < 0))) return !0;
          }
        }
      }function fe(e) {
        for (var t; t = se(e);) {
          e = t.find(-1, !0).line;
        }return e;
      }function de(e) {
        for (var t; t = ce(e);) {
          e = t.find(1, !0).line;
        }return e;
      }function he(e) {
        for (var t, r; t = ce(e);) {
          e = t.find(1, !0).line, (r || (r = [])).push(e);
        }return r;
      }function pe(e, t) {
        var r = L(e, t),
            n = fe(r);return r == n ? t : E(n);
      }function ge(e, t) {
        if (t > e.lastLine()) return t;var r,
            n = L(e, t);if (!me(e, n)) return t;for (; r = ce(n);) {
          n = r.find(1, !0).line;
        }return E(n) + 1;
      }function me(e, t) {
        var r = Rl && t.markedSpans;if (r) for (var n = void 0, i = 0; i < r.length; ++i) {
          if (n = r[i], n.marker.collapsed) {
            if (null == n.from) return !0;if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && ve(e, t, n)) return !0;
          }
        }
      }function ve(e, t, r) {
        if (null == r.to) {
          var n = r.marker.find(1, !0);return ve(e, n.line, X(n.line.markedSpans, r.marker));
        }if (r.marker.inclusiveRight && r.to == t.text.length) return !0;for (var i = void 0, o = 0; o < t.markedSpans.length; ++o) {
          if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && ve(e, t, i)) return !0;
        }
      }function ye(e) {
        e = fe(e);for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
          var i = r.lines[n];if (i == e) break;t += i.height;
        }for (var o = r.parent; o; r = o, o = r.parent) {
          for (var l = 0; l < o.children.length; ++l) {
            var a = o.children[l];if (a == r) break;t += a.height;
          }
        }return t;
      }function be(e) {
        if (0 == e.height) return 0;for (var t, r = e.text.length, n = e; t = se(n);) {
          var i = t.find(0, !0);n = i.from.line, r += i.from.ch - i.to.ch;
        }for (n = e; t = ce(n);) {
          var o = t.find(0, !0);r -= n.text.length - o.from.ch, n = o.to.line, r += n.text.length - o.to.ch;
        }return r;
      }function xe(e) {
        var t = e.display,
            r = e.doc;t.maxLine = L(r, r.first), t.maxLineLength = be(t.maxLine), t.maxLineChanged = !0, r.iter(function (e) {
          var r = be(e);r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e);
        });
      }function we(e, t, r, n) {
        if (!e) return n(t, r, "ltr");for (var i = !1, o = 0; o < e.length; ++o) {
          var l = e[o];(l.from < r && l.to > t || t == r && l.to == t) && (n(Math.max(l.from, t), Math.min(l.to, r), 1 == l.level ? "rtl" : "ltr"), i = !0);
        }i || n(t, r, "ltr");
      }function Ce(e, t, r) {
        var n;zl = null;for (var i = 0; i < e.length; ++i) {
          var o = e[i];if (o.from < t && o.to > t) return i;o.to == t && (o.from != o.to && "before" == r ? n = i : zl = i), o.from == t && (o.from != o.to && "before" != r ? n = i : zl = i);
        }return null != n ? n : zl;
      }function ke(e, t) {
        var r = e.order;return null == r && (r = e.order = Fl(e.text, t)), r;
      }function Ae(e, t, r) {
        var n = A(e.text, t + r, r);return n < 0 || n > e.text.length ? null : n;
      }function Se(e, t, r) {
        var n = Ae(e, t.ch, r);return null == n ? null : new H(t.line, n, r < 0 ? "after" : "before");
      }function Me(e, t, r, n, i) {
        if (e) {
          var o = ke(r, t.doc.direction);if (o) {
            var l,
                a = i < 0 ? g(o) : o[0],
                s = i < 0 == (1 == a.level),
                c = s ? "after" : "before";if (a.level > 0) {
              var u = Qt(t, r);l = i < 0 ? r.text.length - 1 : 0;var f = Jt(t, u, l).top;l = S(function (e) {
                return Jt(t, u, e).top == f;
              }, i < 0 == (1 == a.level) ? a.from : a.to - 1, l), "before" == c && (l = Ae(r, l, 1));
            } else l = i < 0 ? a.to : a.from;return new H(n, l, c);
          }
        }return new H(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after");
      }function Le(e, t, r, n) {
        var i = ke(t, e.doc.direction);if (!i) return Se(t, r, n);r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");var o = Ce(i, r.ch, r.sticky),
            l = i[o];if ("ltr" == e.doc.direction && l.level % 2 == 0 && (n > 0 ? l.to > r.ch : l.from < r.ch)) return Se(t, r, n);var a,
            s = function s(e, r) {
          return Ae(t, e instanceof H ? e.ch : e, r);
        },
            c = function c(r) {
          return e.options.lineWrapping ? (a = a || Qt(e, t), gr(e, t, a, r)) : { begin: 0, end: t.text.length };
        },
            u = c("before" == r.sticky ? s(r, -1) : r.ch);if ("rtl" == e.doc.direction || 1 == l.level) {
          var f = 1 == l.level == n < 0,
              d = s(r, f ? 1 : -1);if (null != d && (f ? d <= l.to && d <= u.end : d >= l.from && d >= u.begin)) {
            var h = f ? "before" : "after";return new H(r.line, d, h);
          }
        }var p = function p(e, t, n) {
          for (var o = function o(e, t) {
            return t ? new H(r.line, s(e, 1), "before") : new H(r.line, e, "after");
          }; e >= 0 && e < i.length; e += t) {
            var l = i[e],
                a = t > 0 == (1 != l.level),
                c = a ? n.begin : s(n.end, -1);if (l.from <= c && c < l.to) return o(c, a);if (c = a ? l.from : s(l.to, -1), n.begin <= c && c < n.end) return o(c, a);
          }
        },
            g = p(o + n, n, u);if (g) return g;var m = n > 0 ? u.end : s(u.begin, -1);return null == m || n > 0 && m == t.text.length || !(g = p(n > 0 ? 0 : i.length - 1, n, c(m))) ? null : g;
      }function Te(e, t) {
        return e._handlers && e._handlers[t] || Pl;
      }function Ne(e, t, r) {
        if (e.removeEventListener) e.removeEventListener(t, r, !1);else if (e.detachEvent) e.detachEvent("on" + t, r);else {
          var n = e._handlers,
              i = n && n[t];if (i) {
            var o = d(i, r);o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)));
          }
        }
      }function Oe(e, t) {
        var r = Te(e, t);if (r.length) for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) {
          r[i].apply(null, n);
        }
      }function Ee(e, t, r) {
        return "string" == typeof t && (t = { type: t, preventDefault: function preventDefault() {
            this.defaultPrevented = !0;
          } }), Oe(e, r || t.type, e, t), ze(t) || t.codemirrorIgnore;
      }function De(e) {
        var t = e._handlers && e._handlers.cursorActivity;if (t) for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) {
          -1 == d(r, t[n]) && r.push(t[n]);
        }
      }function We(e, t) {
        return Te(e, t).length > 0;
      }function Ie(e) {
        e.prototype.on = function (e, t) {
          Bl(this, e, t);
        }, e.prototype.off = function (e, t) {
          Ne(this, e, t);
        };
      }function He(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }function Re(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }function ze(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
      }function Fe(e) {
        He(e), Re(e);
      }function Pe(e) {
        return e.target || e.srcElement;
      }function Be(e) {
        var t = e.which;return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), gl && e.ctrlKey && 1 == t && (t = 3), t;
      }function _e(e) {
        if (null == Sl) {
          var t = n("span", "​");r(e, n("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Sl = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(nl && il < 8));
        }var i = Sl ? n("span", "​") : n("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");return i.setAttribute("cm-text", ""), i;
      }function Ue(e) {
        if (null != Ml) return Ml;var n = r(e, document.createTextNode("AخA")),
            i = bl(n, 0, 1).getBoundingClientRect(),
            o = bl(n, 1, 2).getBoundingClientRect();return t(e), !(!i || i.left == i.right) && (Ml = o.right - i.right < 3);
      }function $e(e) {
        if (null != Vl) return Vl;var t = r(e, n("span", "x")),
            i = t.getBoundingClientRect(),
            o = bl(t, 0, 1).getBoundingClientRect();return Vl = Math.abs(i.left - o.left) > 1;
      }function je(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), Gl[e] = t;
      }function Ve(e, t) {
        Kl[e] = t;
      }function Ge(e) {
        if ("string" == typeof e && Kl.hasOwnProperty(e)) e = Kl[e];else if (e && "string" == typeof e.name && Kl.hasOwnProperty(e.name)) {
          var t = Kl[e.name];"string" == typeof t && (t = { name: t }), e = b(t, e), e.name = t.name;
        } else {
          if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return Ge("application/xml");if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return Ge("application/json");
        }return "string" == typeof e ? { name: e } : e || { name: "null" };
      }function Ke(e, t) {
        t = Ge(t);var r = Gl[t.name];if (!r) return Ke(e, "text/plain");var n = r(e, t);if (Xl.hasOwnProperty(t.name)) {
          var i = Xl[t.name];for (var o in i) {
            i.hasOwnProperty(o) && (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o]);
          }
        }if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps) for (var l in t.modeProps) {
          n[l] = t.modeProps[l];
        }return n;
      }function Xe(e, t) {
        u(t, Xl.hasOwnProperty(e) ? Xl[e] : Xl[e] = {});
      }function Ye(e, t) {
        if (!0 === t) return t;if (e.copyState) return e.copyState(t);var r = {};for (var n in t) {
          var i = t[n];i instanceof Array && (i = i.concat([])), r[n] = i;
        }return r;
      }function Qe(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e;) {
          t = r.state, e = r.mode;
        }return r || { mode: e, state: t };
      }function Je(e, t, r) {
        return !e.startState || e.startState(t, r);
      }function qe(e, t, r, n) {
        var i = [e.state.modeGen],
            o = {};lt(e, t.text, e.doc.mode, r, function (e, t) {
          return i.push(e, t);
        }, o, n);for (var l = 0; l < e.state.overlays.length; ++l) {
          !function (r) {
            var n = e.state.overlays[r],
                l = 1,
                a = 0;lt(e, t.text, n.mode, !0, function (e, t) {
              for (var r = l; a < e;) {
                var o = i[l];o > e && i.splice(l, 1, e, i[l + 1], o), l += 2, a = Math.min(e, o);
              }if (t) if (n.opaque) i.splice(r, l - r, e, "overlay " + t), l = r + 2;else for (; r < l; r += 2) {
                var s = i[r + 1];i[r + 1] = (s ? s + " " : "") + "overlay " + t;
              }
            }, o);
          }(l);
        }return { styles: i, classes: o.bgClass || o.textClass ? o : null };
      }function Ze(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var n = et(e, E(t)),
              i = qe(e, t, t.text.length > e.options.maxHighlightLength ? Ye(e.doc.mode, n) : n);t.stateAfter = n, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.frontier && e.doc.frontier++;
        }return t.styles;
      }function et(e, t, r) {
        var n = e.doc,
            i = e.display;if (!n.mode.startState) return !0;var o = at(e, t, r),
            l = o > n.first && L(n, o - 1).stateAfter;return l = l ? Ye(n.mode, l) : Je(n.mode), n.iter(o, t, function (r) {
          tt(e, r.text, l);var a = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;r.stateAfter = a ? Ye(n.mode, l) : null, ++o;
        }), r && (n.frontier = o), l;
      }function tt(e, t, r, n) {
        var i = e.doc.mode,
            o = new Yl(t, e.options.tabSize);for (o.start = o.pos = n || 0, "" == t && rt(i, r); !o.eol();) {
          nt(i, o, r), o.start = o.pos;
        }
      }function rt(e, t) {
        if (e.blankLine) return e.blankLine(t);if (e.innerMode) {
          var r = Qe(e, t);return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0;
        }
      }function nt(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
          n && (n[0] = Qe(e, r).mode);var o = e.token(t, r);if (t.pos > t.start) return o;
        }throw new Error("Mode " + e.name + " failed to advance stream.");
      }function it(e, t, r, n) {
        var i,
            o = function o(e) {
          return { start: f.start, end: f.pos, string: f.current(), type: i || null, state: e ? Ye(l.mode, u) : u };
        },
            l = e.doc,
            a = l.mode;t = U(l, t);var s,
            c = L(l, t.line),
            u = et(e, t.line, r),
            f = new Yl(c.text, e.options.tabSize);for (n && (s = []); (n || f.pos < t.ch) && !f.eol();) {
          f.start = f.pos, i = nt(a, f, u), n && s.push(o(!0));
        }return n ? s : o();
      }function ot(e, t) {
        if (e) for (;;) {
          var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);if (!r) break;e = e.slice(0, r.index) + e.slice(r.index + r[0].length);var n = r[1] ? "bgClass" : "textClass";null == t[n] ? t[n] = r[2] : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) || (t[n] += " " + r[2]);
        }return e;
      }function lt(e, t, r, n, i, o, l) {
        var a = r.flattenSpans;null == a && (a = e.options.flattenSpans);var s,
            c = 0,
            u = null,
            f = new Yl(t, e.options.tabSize),
            d = e.options.addModeClass && [null];for ("" == t && ot(rt(r, n), o); !f.eol();) {
          if (f.pos > e.options.maxHighlightLength ? (a = !1, l && tt(e, t, n, f.pos), f.pos = t.length, s = null) : s = ot(nt(r, f, n, d), o), d) {
            var h = d[0].name;h && (s = "m-" + (s ? h + " " + s : h));
          }if (!a || u != s) {
            for (; c < f.start;) {
              c = Math.min(f.start, c + 5e3), i(c, u);
            }u = s;
          }f.start = f.pos;
        }for (; c < f.pos;) {
          var p = Math.min(f.pos, c + 5e3);i(p, u), c = p;
        }
      }function at(e, t, r) {
        for (var n, i, o = e.doc, l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > l; --a) {
          if (a <= o.first) return o.first;var s = L(o, a - 1);if (s.stateAfter && (!r || a <= o.frontier)) return a;var c = f(s.text, null, e.options.tabSize);(null == i || n > c) && (i = a - 1, n = c);
        }return i;
      }function st(e, t, r, n) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), re(e), ne(e, r);var i = n ? n(e) : 1;i != e.height && O(e, i);
      }function ct(e) {
        e.parent = null, re(e);
      }function ut(e, t) {
        if (!e || /^\s*$/.test(e)) return null;var r = t.addModeClass ? Zl : ql;return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
      }function ft(e, t) {
        var r = i("span", null, null, ol ? "padding-right: .1px" : null),
            n = { pre: i("pre", [r], "CodeMirror-line"), content: r, col: 0, pos: 0, cm: e, trailingSpace: !1, splitSpaces: (nl || ol) && e.getOption("lineWrapping") };t.measure = {};for (var o = 0; o <= (t.rest ? t.rest.length : 0); o++) {
          var l = o ? t.rest[o - 1] : t.line,
              a = void 0;n.pos = 0, n.addToken = ht, Ue(e.display.measure) && (a = ke(l, e.doc.direction)) && (n.addToken = gt(n.addToken, a)), n.map = [];vt(l, n, Ze(e, l, t != e.display.externalMeasured && E(l))), l.styleClasses && (l.styleClasses.bgClass && (n.bgClass = s(l.styleClasses.bgClass, n.bgClass || "")), l.styleClasses.textClass && (n.textClass = s(l.styleClasses.textClass, n.textClass || ""))), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(_e(e.display.measure))), 0 == o ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }if (ol) {
          var c = n.content.lastChild;(/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack");
        }return Oe(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = s(n.pre.className, n.textClass || "")), n;
      }function dt(e) {
        var t = n("span", "•", "cm-invalidchar");return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }function ht(e, t, r, i, o, l, a) {
        if (t) {
          var s,
              c = e.splitSpaces ? pt(t, e.trailingSpace) : t,
              u = e.cm.state.specialChars,
              f = !1;if (u.test(t)) {
            s = document.createDocumentFragment();for (var d = 0;;) {
              u.lastIndex = d;var h = u.exec(t),
                  g = h ? h.index - d : t.length - d;if (g) {
                var m = document.createTextNode(c.slice(d, d + g));nl && il < 9 ? s.appendChild(n("span", [m])) : s.appendChild(m), e.map.push(e.pos, e.pos + g, m), e.col += g, e.pos += g;
              }if (!h) break;d += g + 1;var v = void 0;if ("\t" == h[0]) {
                var y = e.cm.options.tabSize,
                    b = y - e.col % y;v = s.appendChild(n("span", p(b), "cm-tab")), v.setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += b;
              } else "\r" == h[0] || "\n" == h[0] ? (v = s.appendChild(n("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar")), v.setAttribute("cm-text", h[0]), e.col += 1) : (v = e.cm.options.specialCharPlaceholder(h[0]), v.setAttribute("cm-text", h[0]), nl && il < 9 ? s.appendChild(n("span", [v])) : s.appendChild(v), e.col += 1);e.map.push(e.pos, e.pos + 1, v), e.pos++;
            }
          } else e.col += t.length, s = document.createTextNode(c), e.map.push(e.pos, e.pos + t.length, s), nl && il < 9 && (f = !0), e.pos += t.length;if (e.trailingSpace = 32 == c.charCodeAt(t.length - 1), r || i || o || f || a) {
            var x = r || "";i && (x += i), o && (x += o);var w = n("span", [s], x, a);return l && (w.title = l), e.content.appendChild(w);
          }e.content.appendChild(s);
        }
      }function pt(e, t) {
        if (e.length > 1 && !/  /.test(e)) return e;for (var r = t, n = "", i = 0; i < e.length; i++) {
          var o = e.charAt(i);" " != o || !r || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), n += o, r = " " == o;
        }return n;
      }function gt(e, t) {
        return function (r, n, i, o, l, a, s) {
          i = i ? i + " cm-force-border" : "cm-force-border";for (var c = r.pos, u = c + n.length;;) {
            for (var f = void 0, d = 0; d < t.length && (f = t[d], !(f.to > c && f.from <= c)); d++) {}if (f.to >= u) return e(r, n, i, o, l, a, s);e(r, n.slice(0, f.to - c), i, o, null, a, s), o = null, n = n.slice(f.to - c), c = f.to;
          }
        };
      }function mt(e, t, r, n) {
        var i = !n && r.widgetNode;i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }function vt(e, t, r) {
        var n = e.markedSpans,
            i = e.text,
            o = 0;if (n) for (var l, a, s, c, u, f, d, h = i.length, p = 0, g = 1, m = "", v = 0;;) {
          if (v == p) {
            s = c = u = f = a = "", d = null, v = 1 / 0;for (var y = [], b = void 0, x = 0; x < n.length; ++x) {
              var w = n[x],
                  C = w.marker;"bookmark" == C.type && w.from == p && C.widgetNode ? y.push(C) : w.from <= p && (null == w.to || w.to > p || C.collapsed && w.to == p && w.from == p) ? (null != w.to && w.to != p && v > w.to && (v = w.to, c = ""), C.className && (s += " " + C.className), C.css && (a = (a ? a + ";" : "") + C.css), C.startStyle && w.from == p && (u += " " + C.startStyle), C.endStyle && w.to == v && (b || (b = [])).push(C.endStyle, w.to), C.title && !f && (f = C.title), C.collapsed && (!d || le(d.marker, C) < 0) && (d = w)) : w.from > p && v > w.from && (v = w.from);
            }if (b) for (var k = 0; k < b.length; k += 2) {
              b[k + 1] == v && (c += " " + b[k]);
            }if (!d || d.from == p) for (var A = 0; A < y.length; ++A) {
              mt(t, 0, y[A]);
            }if (d && (d.from || 0) == p) {
              if (mt(t, (null == d.to ? h + 1 : d.to) - p, d.marker, null == d.from), null == d.to) return;d.to == p && (d = !1);
            }
          }if (p >= h) break;for (var S = Math.min(h, v);;) {
            if (m) {
              var M = p + m.length;if (!d) {
                var L = M > S ? m.slice(0, S - p) : m;t.addToken(t, L, l ? l + s : s, u, p + L.length == v ? c : "", f, a);
              }if (M >= S) {
                m = m.slice(S - p), p = S;break;
              }p = M, u = "";
            }m = i.slice(o, o = r[g++]), l = ut(r[g++], t.cm.options);
          }
        } else for (var T = 1; T < r.length; T += 2) {
          t.addToken(t, i.slice(o, o = r[T]), ut(r[T + 1], t.cm.options));
        }
      }function yt(e, t, r) {
        this.line = t, this.rest = he(t), this.size = this.rest ? E(g(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = me(e, t);
      }function bt(e, t, r) {
        for (var n, i = [], o = t; o < r; o = n) {
          var l = new yt(e.doc, L(e.doc, o), o);n = o + l.size, i.push(l);
        }return i;
      }function xt(e) {
        ea ? ea.ops.push(e) : e.ownsGroup = ea = { ops: [e], delayedCallbacks: [] };
      }function wt(e) {
        var t = e.delayedCallbacks,
            r = 0;do {
          for (; r < t.length; r++) {
            t[r].call(null);
          }for (var n = 0; n < e.ops.length; n++) {
            var i = e.ops[n];if (i.cursorActivityHandlers) for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) {
              i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
            }
          }
        } while (r < t.length);
      }function Ct(e, t) {
        var r = e.ownsGroup;if (r) try {
          wt(r);
        } finally {
          ea = null, t(r);
        }
      }function kt(e, t) {
        var r = Te(e, t);if (r.length) {
          var n,
              i = Array.prototype.slice.call(arguments, 2);ea ? n = ea.delayedCallbacks : ta ? n = ta : (n = ta = [], setTimeout(At, 0));for (var o = 0; o < r.length; ++o) {
            !function (e) {
              n.push(function () {
                return r[e].apply(null, i);
              });
            }(o);
          }
        }
      }function At() {
        var e = ta;ta = null;for (var t = 0; t < e.length; ++t) {
          e[t]();
        }
      }function St(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
          var o = t.changes[i];"text" == o ? Nt(e, t) : "gutter" == o ? Et(e, t, r, n) : "class" == o ? Ot(e, t) : "widget" == o && Dt(e, t, n);
        }t.changes = null;
      }function Mt(e) {
        return e.node == e.text && (e.node = n("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), nl && il < 8 && (e.node.style.zIndex = 2)), e.node;
      }function Lt(e, t) {
        var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;if (r && (r += " CodeMirror-linebackground"), t.background) r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);else if (r) {
          var i = Mt(t);t.background = i.insertBefore(n("div", null, r), i.firstChild), e.display.input.setUneditable(t.background);
        }
      }function Tt(e, t) {
        var r = e.display.externalMeasured;return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : ft(e, t);
      }function Nt(e, t) {
        var r = t.text.className,
            n = Tt(e, t);t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, Ot(e, t)) : r && (t.text.className = r);
      }function Ot(e, t) {
        Lt(e, t), t.line.wrapClass ? Mt(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;t.text.className = r || "";
      }function Et(e, t, r, i) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var o = Mt(t);t.gutterBackground = n("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), o.insertBefore(t.gutterBackground, t.text);
        }var l = t.line.gutterMarkers;if (e.options.lineNumbers || l) {
          var a = Mt(t),
              s = t.gutter = n("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px");if (e.display.input.setUneditable(s), a.insertBefore(s, t.text), t.line.gutterClass && (s.className += " " + t.line.gutterClass), !e.options.lineNumbers || l && l["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(n("div", I(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), l) for (var c = 0; c < e.options.gutters.length; ++c) {
            var u = e.options.gutters[c],
                f = l.hasOwnProperty(u) && l[u];f && s.appendChild(n("div", [f], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[u] + "px; width: " + i.gutterWidth[u] + "px"));
          }
        }
      }function Dt(e, t, r) {
        t.alignable && (t.alignable = null);for (var n = t.node.firstChild, i = void 0; n; n = i) {
          i = n.nextSibling, "CodeMirror-linewidget" == n.className && t.node.removeChild(n);
        }It(e, t, r);
      }function Wt(e, t, r, n) {
        var i = Tt(e, t);return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), Ot(e, t), Et(e, t, r, n), It(e, t, n), t.node;
      }function It(e, t, r) {
        if (Ht(e, t.line, t, r, !0), t.rest) for (var n = 0; n < t.rest.length; n++) {
          Ht(e, t.rest[n], t, r, !1);
        }
      }function Ht(e, t, r, i, o) {
        if (t.widgets) for (var l = Mt(r), a = 0, s = t.widgets; a < s.length; ++a) {
          var c = s[a],
              u = n("div", [c.node], "CodeMirror-linewidget");c.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Rt(c, u, r, i), e.display.input.setUneditable(u), o && c.above ? l.insertBefore(u, r.gutter || r.text) : l.appendChild(u), kt(c, "redraw");
        }
      }function Rt(e, t, r, n) {
        if (e.noHScroll) {
          (r.alignable || (r.alignable = [])).push(t);var i = n.wrapperWidth;t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px";
        }e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
      }function zt(e) {
        if (null != e.height) return e.height;var t = e.doc.cm;if (!t) return 0;if (!o(document.body, e.node)) {
          var i = "position: relative;";e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), r(t.display.measure, n("div", [e.node], null, i));
        }return e.height = e.node.parentNode.offsetHeight;
      }function Ft(e, t) {
        for (var r = Pe(t); r != e.wrapper; r = r.parentNode) {
          if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0;
        }
      }function Pt(e) {
        return e.lineSpace.offsetTop;
      }function Bt(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }function _t(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;var t = r(e.measure, n("pre", "x")),
            i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            o = { left: parseInt(i.paddingLeft), right: parseInt(i.paddingRight) };return isNaN(o.left) || isNaN(o.right) || (e.cachedPaddingH = o), o;
      }function Ut(e) {
        return Ll - e.display.nativeBarWidth;
      }function $t(e) {
        return e.display.scroller.clientWidth - Ut(e) - e.display.barWidth;
      }function jt(e) {
        return e.display.scroller.clientHeight - Ut(e) - e.display.barHeight;
      }function Vt(e, t, r) {
        var n = e.options.lineWrapping,
            i = n && $t(e);if (!t.measure.heights || n && t.measure.width != i) {
          var o = t.measure.heights = [];if (n) {
            t.measure.width = i;for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
              var s = l[a],
                  c = l[a + 1];Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - r.top);
            }
          }o.push(r.bottom - r.top);
        }
      }function Gt(e, t, r) {
        if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };for (var n = 0; n < e.rest.length; n++) {
          if (e.rest[n] == t) return { map: e.measure.maps[n], cache: e.measure.caches[n] };
        }for (var i = 0; i < e.rest.length; i++) {
          if (E(e.rest[i]) > r) return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
        }
      }function Kt(e, t) {
        t = fe(t);var n = E(t),
            i = e.display.externalMeasured = new yt(e.doc, t, n);i.lineN = n;var o = i.built = ft(e, i);return i.text = o.pre, r(e.display.lineMeasure, o.pre), i;
      }function Xt(e, t, r, n) {
        return Jt(e, Qt(e, t), r, n);
      }function Yt(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[Ar(e, t)];var r = e.display.externalMeasured;return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0;
      }function Qt(e, t) {
        var r = E(t),
            n = Yt(e, r);n && !n.text ? n = null : n && n.changes && (St(e, n, r, br(e)), e.curOp.forceUpdate = !0), n || (n = Kt(e, t));var i = Gt(n, t, r);return { line: t, view: n, rect: null, map: i.map, cache: i.cache, before: i.before, hasHeights: !1 };
      }function Jt(e, t, r, n, i) {
        t.before && (r = -1);var o,
            l = r + (n || "");return t.cache.hasOwnProperty(l) ? o = t.cache[l] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Vt(e, t.view, t.rect), t.hasHeights = !0), o = er(e, t, r, n), o.bogus || (t.cache[l] = o)), { left: o.left, right: o.right, top: i ? o.rtop : o.top, bottom: i ? o.rbottom : o.bottom };
      }function qt(e, t, r) {
        for (var n, i, o, l, a, s, c = 0; c < e.length; c += 3) {
          if (a = e[c], s = e[c + 1], t < a ? (i = 0, o = 1, l = "left") : t < s ? (i = t - a, o = i + 1) : (c == e.length - 3 || t == s && e[c + 3] > t) && (o = s - a, i = o - 1, t >= s && (l = "right")), null != i) {
            if (n = e[c + 2], a == s && r == (n.insertLeft ? "left" : "right") && (l = r), "left" == r && 0 == i) for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) {
              n = e[2 + (c -= 3)], l = "left";
            }if ("right" == r && i == s - a) for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) {
              n = e[(c += 3) + 2], l = "right";
            }break;
          }
        }return { node: n, start: i, end: o, collapse: l, coverStart: a, coverEnd: s };
      }function Zt(e, t) {
        var r = ra;if ("left" == t) for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++) {} else for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--) {}return r;
      }function er(e, t, r, n) {
        var i,
            o = qt(t.map, r, n),
            l = o.node,
            a = o.start,
            s = o.end,
            c = o.collapse;if (3 == l.nodeType) {
          for (var u = 0; u < 4; u++) {
            for (; a && k(t.line.text.charAt(o.coverStart + a));) {
              --a;
            }for (; o.coverStart + s < o.coverEnd && k(t.line.text.charAt(o.coverStart + s));) {
              ++s;
            }if (i = nl && il < 9 && 0 == a && s == o.coverEnd - o.coverStart ? l.parentNode.getBoundingClientRect() : Zt(bl(l, a, s).getClientRects(), n), i.left || i.right || 0 == a) break;s = a, a -= 1, c = "right";
          }nl && il < 11 && (i = tr(e.display.measure, i));
        } else {
          a > 0 && (c = n = "right");var f;i = e.options.lineWrapping && (f = l.getClientRects()).length > 1 ? f["right" == n ? f.length - 1 : 0] : l.getBoundingClientRect();
        }if (nl && il < 9 && !a && (!i || !i.left && !i.right)) {
          var d = l.parentNode.getClientRects()[0];i = d ? { left: d.left, right: d.left + yr(e.display), top: d.top, bottom: d.bottom } : ra;
        }for (var h = i.top - t.rect.top, p = i.bottom - t.rect.top, g = (h + p) / 2, m = t.view.measure.heights, v = 0; v < m.length - 1 && !(g < m[v]); v++) {}var y = v ? m[v - 1] : 0,
            b = m[v],
            x = { left: ("right" == c ? i.right : i.left) - t.rect.left, right: ("left" == c ? i.left : i.right) - t.rect.left, top: y, bottom: b };return i.left || i.right || (x.bogus = !0), e.options.singleCursorHeightPerLine || (x.rtop = h, x.rbottom = p), x;
      }function tr(e, t) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !$e(e)) return t;var r = screen.logicalXDPI / screen.deviceXDPI,
            n = screen.logicalYDPI / screen.deviceYDPI;return { left: t.left * r, right: t.right * r, top: t.top * n, bottom: t.bottom * n };
      }function rr(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest)) for (var t = 0; t < e.rest.length; t++) {
          e.measure.caches[t] = {};
        }
      }function nr(e) {
        e.display.externalMeasure = null, t(e.display.lineMeasure);for (var r = 0; r < e.display.view.length; r++) {
          rr(e.display.view[r]);
        }
      }function ir(e) {
        nr(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
      }function or() {
        return al && hl ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft;
      }function lr() {
        return al && hl ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop;
      }function ar(e, t, r, n, i) {
        if (!i && t.widgets) for (var o = 0; o < t.widgets.length; ++o) {
          if (t.widgets[o].above) {
            var l = zt(t.widgets[o]);r.top += l, r.bottom += l;
          }
        }if ("line" == n) return r;n || (n = "local");var a = ye(t);if ("local" == n ? a += Pt(e.display) : a -= e.display.viewOffset, "page" == n || "window" == n) {
          var s = e.display.lineSpace.getBoundingClientRect();a += s.top + ("window" == n ? 0 : lr());var c = s.left + ("window" == n ? 0 : or());r.left += c, r.right += c;
        }return r.top += a, r.bottom += a, r;
      }function sr(e, t, r) {
        if ("div" == r) return t;var n = t.left,
            i = t.top;if ("page" == r) n -= or(), i -= lr();else if ("local" == r || !r) {
          var o = e.display.sizer.getBoundingClientRect();n += o.left, i += o.top;
        }var l = e.display.lineSpace.getBoundingClientRect();return { left: n - l.left, top: i - l.top };
      }function cr(e, t, r, n, i) {
        return n || (n = L(e.doc, t.line)), ar(e, n, Xt(e, n, t.ch, i), r);
      }function ur(e, t, r, n, i, o) {
        function l(t, l) {
          var a = Jt(e, i, t, l ? "right" : "left", o);return l ? a.left = a.right : a.right = a.left, ar(e, n, a, r);
        }function a(e, t, r) {
          var n = s[t],
              i = n.level % 2 != 0;return l(r ? e - 1 : e, i != r);
        }n = n || L(e.doc, t.line), i || (i = Qt(e, n));var s = ke(n, e.doc.direction),
            c = t.ch,
            u = t.sticky;if (c >= n.text.length ? (c = n.text.length, u = "before") : c <= 0 && (c = 0, u = "after"), !s) return l("before" == u ? c - 1 : c, "before" == u);var f = Ce(s, c, u),
            d = zl,
            h = a(c, f, "before" == u);return null != d && (h.other = a(c, d, "before" != u)), h;
      }function fr(e, t) {
        var r = 0;t = U(e.doc, t), e.options.lineWrapping || (r = yr(e.display) * t.ch);var n = L(e.doc, t.line),
            i = ye(n) + Pt(e.display);return { left: r, right: r, top: i, bottom: i + n.height };
      }function dr(e, t, r, n, i) {
        var o = H(e, t, r);return o.xRel = i, n && (o.outside = !0), o;
      }function hr(e, t, r) {
        var n = e.doc;if ((r += e.display.viewOffset) < 0) return dr(n.first, 0, null, !0, -1);var i = D(n, r),
            o = n.first + n.size - 1;if (i > o) return dr(n.first + n.size - 1, L(n, o).text.length, null, !0, 1);t < 0 && (t = 0);for (var l = L(n, i);;) {
          var a = mr(e, l, i, t, r),
              s = ce(l),
              c = s && s.find(0, !0);if (!s || !(a.ch > c.from.ch || a.ch == c.from.ch && a.xRel > 0)) return a;i = E(l = c.to.line);
        }
      }function pr(e, t, r, n) {
        var i = function i(n) {
          return ar(e, t, Jt(e, r, n), "line");
        },
            o = t.text.length,
            l = S(function (e) {
          return i(e - 1).bottom <= n;
        }, o, 0);return o = S(function (e) {
          return i(e).top > n;
        }, l, o), { begin: l, end: o };
      }function gr(e, t, r, n) {
        return pr(e, t, r, ar(e, t, Jt(e, r, n), "line").top);
      }function mr(e, t, r, n, i) {
        i -= ye(t);var o,
            l = 0,
            a = t.text.length,
            s = Qt(e, t);if (ke(t, e.doc.direction)) {
          if (e.options.lineWrapping) {
            var c;c = pr(e, t, s, i), l = c.begin, a = c.end;
          }o = new H(r, l);var u,
              f,
              d = ur(e, o, "line", t, s).left,
              h = d < n ? 1 : -1,
              p = d - n;do {
            if (u = p, f = o, null == (o = Le(e, t, o, h)) || o.ch < l || a <= ("before" == o.sticky ? o.ch - 1 : o.ch)) {
              o = f;break;
            }p = ur(e, o, "line", t, s).left - n;
          } while (h < 0 != p < 0 && Math.abs(p) <= Math.abs(u));if (Math.abs(p) > Math.abs(u)) {
            if (p < 0 == u < 0) throw new Error("Broke out of infinite loop in coordsCharInner");o = f;
          }
        } else {
          var g = S(function (r) {
            var o = ar(e, t, Jt(e, s, r), "line");return o.top > i ? (a = Math.min(r, a), !0) : !(o.bottom <= i) && (o.left > n || !(o.right < n) && n - o.left < o.right - n);
          }, l, a);g = A(t.text, g, 1), o = new H(r, g, g == a ? "before" : "after");
        }var m = ur(e, o, "line", t, s);return (i < m.top || m.bottom < i) && (o.outside = !0), o.xRel = n < m.left ? -1 : n > m.right ? 1 : 0, o;
      }function vr(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;if (null == Jl) {
          Jl = n("pre");for (var i = 0; i < 49; ++i) {
            Jl.appendChild(document.createTextNode("x")), Jl.appendChild(n("br"));
          }Jl.appendChild(document.createTextNode("x"));
        }r(e.measure, Jl);var o = Jl.offsetHeight / 50;return o > 3 && (e.cachedTextHeight = o), t(e.measure), o || 1;
      }function yr(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;var t = n("span", "xxxxxxxxxx"),
            i = n("pre", [t]);r(e.measure, i);var o = t.getBoundingClientRect(),
            l = (o.right - o.left) / 10;return l > 2 && (e.cachedCharWidth = l), l || 10;
      }function br(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
          r[e.options.gutters[l]] = o.offsetLeft + o.clientLeft + i, n[e.options.gutters[l]] = o.clientWidth;
        }return { fixedPos: xr(t), gutterTotalWidth: t.gutters.offsetWidth, gutterLeft: r, gutterWidth: n, wrapperWidth: t.wrapper.clientWidth };
      }function xr(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }function wr(e) {
        var t = vr(e.display),
            r = e.options.lineWrapping,
            n = r && Math.max(5, e.display.scroller.clientWidth / yr(e.display) - 3);return function (i) {
          if (me(e.doc, i)) return 0;var o = 0;if (i.widgets) for (var l = 0; l < i.widgets.length; l++) {
            i.widgets[l].height && (o += i.widgets[l].height);
          }return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
        };
      }function Cr(e) {
        var t = e.doc,
            r = wr(e);t.iter(function (e) {
          var t = r(e);t != e.height && O(e, t);
        });
      }function kr(e, t, r, n) {
        var i = e.display;if (!r && "true" == Pe(t).getAttribute("cm-not-content")) return null;var o,
            l,
            a = i.lineSpace.getBoundingClientRect();try {
          o = t.clientX - a.left, l = t.clientY - a.top;
        } catch (t) {
          return null;
        }var s,
            c = hr(e, o, l);if (n && 1 == c.xRel && (s = L(e.doc, c.line).text).length == c.ch) {
          var u = f(s, s.length, e.options.tabSize) - s.length;c = H(c.line, Math.max(0, Math.round((o - _t(e.display).left) / yr(e.display)) - u));
        }return c;
      }function Ar(e, t) {
        if (t >= e.display.viewTo) return null;if ((t -= e.display.viewFrom) < 0) return null;for (var r = e.display.view, n = 0; n < r.length; n++) {
          if ((t -= r[n].size) < 0) return n;
        }
      }function Sr(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }function Mr(e, t) {
        for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), l = 0; l < r.sel.ranges.length; l++) {
          if (!1 !== t || l != r.sel.primIndex) {
            var a = r.sel.ranges[l];if (!(a.from().line >= e.display.viewTo || a.to().line < e.display.viewFrom)) {
              var s = a.empty();(s || e.options.showCursorWhenSelecting) && Lr(e, a.head, i), s || Tr(e, a, o);
            }
          }
        }return n;
      }function Lr(e, t, r) {
        var i = ur(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            o = r.appendChild(n("div", " ", "CodeMirror-cursor"));if (o.style.left = i.left + "px", o.style.top = i.top + "px", o.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px", i.other) {
          var l = r.appendChild(n("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));l.style.display = "", l.style.left = i.other.left + "px", l.style.top = i.other.top + "px", l.style.height = .85 * (i.other.bottom - i.other.top) + "px";
        }
      }function Tr(e, t, r) {
        function i(e, t, r, i) {
          t < 0 && (t = 0), t = Math.round(t), i = Math.round(i), s.appendChild(n("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == r ? f - e : r) + "px;\n                             height: " + (i - t) + "px"));
        }function o(t, r, n) {
          function o(r, n) {
            return cr(e, H(t, r), "div", c, n);
          }var l,
              s,
              c = L(a, t),
              d = c.text.length;return we(ke(c, a.direction), r || 0, null == n ? d : n, function (e, t, a) {
            var c,
                h,
                p,
                g = o(e, "left");if (e == t) c = g, h = p = g.left;else {
              if (c = o(t - 1, "right"), "rtl" == a) {
                var m = g;g = c, c = m;
              }h = g.left, p = c.right;
            }null == r && 0 == e && (h = u), c.top - g.top > 3 && (i(h, g.top, null, g.bottom), h = u, g.bottom < c.top && i(h, g.bottom, null, c.top)), null == n && t == d && (p = f), (!l || g.top < l.top || g.top == l.top && g.left < l.left) && (l = g), (!s || c.bottom > s.bottom || c.bottom == s.bottom && c.right > s.right) && (s = c), h < u + 1 && (h = u), i(h, c.top, p - h, c.bottom);
          }), { start: l, end: s };
        }var l = e.display,
            a = e.doc,
            s = document.createDocumentFragment(),
            c = _t(e.display),
            u = c.left,
            f = Math.max(l.sizerWidth, $t(e) - l.sizer.offsetLeft) - c.right,
            d = t.from(),
            h = t.to();if (d.line == h.line) o(d.line, d.ch, h.ch);else {
          var p = L(a, d.line),
              g = L(a, h.line),
              m = fe(p) == fe(g),
              v = o(d.line, d.ch, m ? p.text.length + 1 : null).end,
              y = o(h.line, m ? 0 : null, h.ch).start;m && (v.top < y.top - 2 ? (i(v.right, v.top, null, v.bottom), i(u, y.top, y.left, y.bottom)) : i(v.right, v.top, y.left - v.right, v.bottom)), v.bottom < y.top && i(u, v.bottom, null, y.top);
        }r.appendChild(s);
      }function Nr(e) {
        if (e.state.focused) {
          var t = e.display;clearInterval(t.blinker);var r = !0;t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function () {
            return t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }function Or(e) {
        e.state.focused || (e.display.input.focus(), Dr(e));
      }function Er(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function () {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, Wr(e));
        }, 100);
      }function Dr(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Oe(e, "focus", e, t), e.state.focused = !0, a(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), ol && setTimeout(function () {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), Nr(e));
      }function Wr(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (Oe(e, "blur", e, t), e.state.focused = !1, Cl(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function () {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }function Ir(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
          var i = t.view[n],
              o = void 0;if (!i.hidden) {
            if (nl && il < 8) {
              var l = i.node.offsetTop + i.node.offsetHeight;o = l - r, r = l;
            } else {
              var a = i.node.getBoundingClientRect();o = a.bottom - a.top;
            }var s = i.line.height - o;if (o < 2 && (o = vr(t)), (s > .001 || s < -.001) && (O(i.line, o), Hr(i.line), i.rest)) for (var c = 0; c < i.rest.length; c++) {
              Hr(i.rest[c]);
            }
          }
        }
      }function Hr(e) {
        if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) {
          e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight;
        }
      }function Rr(e, t, r) {
        var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;n = Math.floor(n - Pt(e));var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = D(t, n),
            l = D(t, i);if (r && r.ensure) {
          var a = r.ensure.from.line,
              s = r.ensure.to.line;a < o ? (o = a, l = D(t, ye(L(t, a)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= l && (o = D(t, ye(L(t, s)) - e.wrapper.clientHeight), l = s);
        }return { from: o, to: Math.max(l, o + 1) };
      }function zr(e) {
        var t = e.display,
            r = t.view;if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
          for (var n = xr(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", l = 0; l < r.length; l++) {
            if (!r[l].hidden) {
              e.options.fixedGutter && (r[l].gutter && (r[l].gutter.style.left = o), r[l].gutterBackground && (r[l].gutterBackground.style.left = o));var a = r[l].alignable;if (a) for (var s = 0; s < a.length; s++) {
                a[s].style.left = o;
              }
            }
          }e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
        }
      }function Fr(e) {
        if (!e.options.lineNumbers) return !1;var t = e.doc,
            r = I(e.options, t.first + t.size - 1),
            i = e.display;if (r.length != i.lineNumChars) {
          var o = i.measure.appendChild(n("div", [n("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
              l = o.firstChild.offsetWidth,
              a = o.offsetWidth - l;return i.lineGutter.style.width = "", i.lineNumInnerWidth = Math.max(l, i.lineGutter.offsetWidth - a) + 1, i.lineNumWidth = i.lineNumInnerWidth + a, i.lineNumChars = i.lineNumInnerWidth ? r.length : -1, i.lineGutter.style.width = i.lineNumWidth + "px", On(e), !0;
        }return !1;
      }function Pr(e, t) {
        if (!Ee(e, "scrollCursorIntoView")) {
          var r = e.display,
              i = r.sizer.getBoundingClientRect(),
              o = null;if (t.top + i.top < 0 ? o = !0 : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (o = !1), null != o && !fl) {
            var l = n("div", "​", null, "position: absolute;\n                         top: " + (t.top - r.viewOffset - Pt(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Ut(e) + r.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");e.display.lineSpace.appendChild(l), l.scrollIntoView(o), e.display.lineSpace.removeChild(l);
          }
        }
      }function Br(e, t, r, n) {
        null == n && (n = 0);for (var i, o = 0; o < 5; o++) {
          var l = !1,
              a = ur(e, t),
              s = r && r != t ? ur(e, r) : a;i = { left: Math.min(a.left, s.left), top: Math.min(a.top, s.top) - n, right: Math.max(a.left, s.left), bottom: Math.max(a.bottom, s.bottom) + n };var c = Ur(e, i),
              u = e.doc.scrollTop,
              f = e.doc.scrollLeft;if (null != c.scrollTop && (Yr(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (l = !0)), null != c.scrollLeft && (Jr(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - f) > 1 && (l = !0)), !l) break;
        }return i;
      }function _r(e, t) {
        var r = Ur(e, t);null != r.scrollTop && Yr(e, r.scrollTop), null != r.scrollLeft && Jr(e, r.scrollLeft);
      }function Ur(e, t) {
        var r = e.display,
            n = vr(e.display);t.top < 0 && (t.top = 0);var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : r.scroller.scrollTop,
            o = jt(e),
            l = {};t.bottom - t.top > o && (t.bottom = t.top + o);var a = e.doc.height + Bt(r),
            s = t.top < n,
            c = t.bottom > a - n;if (t.top < i) l.scrollTop = s ? 0 : t.top;else if (t.bottom > i + o) {
          var u = Math.min(t.top, (c ? a : t.bottom) - o);u != i && (l.scrollTop = u);
        }var f = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : r.scroller.scrollLeft,
            d = $t(e) - (e.options.fixedGutter ? r.gutters.offsetWidth : 0),
            h = t.right - t.left > d;return h && (t.right = t.left + d), t.left < 10 ? l.scrollLeft = 0 : t.left < f ? l.scrollLeft = Math.max(0, t.left - (h ? 0 : 10)) : t.right > d + f - 3 && (l.scrollLeft = t.right + (h ? 0 : 10) - d), l;
      }function $r(e, t) {
        null != t && (Kr(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }function jr(e) {
        Kr(e);var t = e.getCursor(),
            r = t,
            n = t;e.options.lineWrapping || (r = t.ch ? H(t.line, t.ch - 1) : t, n = H(t.line, t.ch + 1)), e.curOp.scrollToPos = { from: r, to: n, margin: e.options.cursorScrollMargin };
      }function Vr(e, t, r) {
        null == t && null == r || Kr(e), null != t && (e.curOp.scrollLeft = t), null != r && (e.curOp.scrollTop = r);
      }function Gr(e, t) {
        Kr(e), e.curOp.scrollToPos = t;
      }function Kr(e) {
        var t = e.curOp.scrollToPos;if (t) {
          e.curOp.scrollToPos = null;Xr(e, fr(e, t.from), fr(e, t.to), t.margin);
        }
      }function Xr(e, t, r, n) {
        var i = Ur(e, { left: Math.min(t.left, r.left), top: Math.min(t.top, r.top) - n, right: Math.max(t.right, r.right), bottom: Math.max(t.bottom, r.bottom) + n });Vr(e, i.scrollLeft, i.scrollTop);
      }function Yr(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (Zo || Tn(e, { top: t }), Qr(e, t, !0), Zo && Tn(e), wn(e, 100));
      }function Qr(e, t, r) {
        t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t), (e.display.scroller.scrollTop != t || r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }function Jr(e, t, r, n) {
        t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n || (e.doc.scrollLeft = t, zr(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }function qr(e) {
        var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + Bt(e.display));return { clientHeight: t.scroller.clientHeight, viewHeight: t.wrapper.clientHeight, scrollWidth: t.scroller.scrollWidth, clientWidth: t.scroller.clientWidth, viewWidth: t.wrapper.clientWidth, barLeft: e.options.fixedGutter ? r : 0, docHeight: n, scrollHeight: n + Ut(e) + t.barHeight, nativeBarWidth: t.nativeBarWidth, gutterWidth: r };
      }function Zr(e, t) {
        t || (t = qr(e));var r = e.display.barWidth,
            n = e.display.barHeight;en(e, t);for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++) {
          r != e.display.barWidth && e.options.lineWrapping && Ir(e), en(e, qr(e)), r = e.display.barWidth, n = e.display.barHeight;
        }
      }function en(e, t) {
        var r = e.display,
            n = r.scrollbars.update(t);r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = "";
      }function tn(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && Cl(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new oa[e.options.scrollbarStyle](function (t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), Bl(t, "mousedown", function () {
            e.state.focused && setTimeout(function () {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function (t, r) {
          "horizontal" == r ? Jr(e, t) : Yr(e, t);
        }, e), e.display.scrollbars.addClass && a(e.display.wrapper, e.display.scrollbars.addClass);
      }function rn(e) {
        e.curOp = { cm: e, viewChanged: !1, startHeight: e.doc.height, forceUpdate: !1, updateInput: null, typing: !1, changeObjs: null, cursorActivityHandlers: null, cursorActivityCalled: 0, selectionChanged: !1, updateMaxLine: !1, scrollLeft: null, scrollTop: null, scrollToPos: null, focus: !1, id: ++la }, xt(e.curOp);
      }function nn(e) {
        Ct(e.curOp, function (e) {
          for (var t = 0; t < e.ops.length; t++) {
            e.ops[t].cm.curOp = null;
          }on(e);
        });
      }function on(e) {
        for (var t = e.ops, r = 0; r < t.length; r++) {
          ln(t[r]);
        }for (var n = 0; n < t.length; n++) {
          an(t[n]);
        }for (var i = 0; i < t.length; i++) {
          sn(t[i]);
        }for (var o = 0; o < t.length; o++) {
          cn(t[o]);
        }for (var l = 0; l < t.length; l++) {
          un(t[l]);
        }
      }function ln(e) {
        var t = e.cm,
            r = t.display;kn(t), e.updateMaxLine && xe(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new aa(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }function an(e) {
        e.updatedDisplay = e.mustUpdate && Mn(e.cm, e.update);
      }function sn(e) {
        var t = e.cm,
            r = t.display;e.updatedDisplay && Ir(t), e.barMeasure = qr(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Xt(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + Ut(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - $t(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection(e.focus));
      }function cn(e) {
        var t = e.cm;null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Jr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);var r = e.focus && e.focus == l() && (!document.hasFocus || document.hasFocus());e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && Zr(t, e.barMeasure), e.updatedDisplay && En(t, e.barMeasure), e.selectionChanged && Nr(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && Or(e.cm);
      }function un(e) {
        var t = e.cm,
            r = t.display,
            n = t.doc;if (e.updatedDisplay && Ln(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && Qr(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && Jr(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          Pr(t, Br(t, U(n, e.scrollToPos.from), U(n, e.scrollToPos.to), e.scrollToPos.margin));
        }var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;if (i) for (var l = 0; l < i.length; ++l) {
          i[l].lines.length || Oe(i[l], "hide");
        }if (o) for (var a = 0; a < o.length; ++a) {
          o[a].lines.length && Oe(o[a], "unhide");
        }r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Oe(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }function fn(e, t) {
        if (e.curOp) return t();rn(e);try {
          return t();
        } finally {
          nn(e);
        }
      }function dn(e, t) {
        return function () {
          if (e.curOp) return t.apply(e, arguments);rn(e);try {
            return t.apply(e, arguments);
          } finally {
            nn(e);
          }
        };
      }function hn(e) {
        return function () {
          if (this.curOp) return e.apply(this, arguments);rn(this);try {
            return e.apply(this, arguments);
          } finally {
            nn(this);
          }
        };
      }function pn(e) {
        return function () {
          var t = this.cm;if (!t || t.curOp) return e.apply(this, arguments);rn(t);try {
            return e.apply(this, arguments);
          } finally {
            nn(t);
          }
        };
      }function gn(e, t, r, n) {
        null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);var i = e.display;if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Rl && pe(e.doc, t) < i.viewTo && vn(e);else if (r <= i.viewFrom) Rl && ge(e.doc, r + n) > i.viewFrom ? vn(e) : (i.viewFrom += n, i.viewTo += n);else if (t <= i.viewFrom && r >= i.viewTo) vn(e);else if (t <= i.viewFrom) {
          var o = yn(e, r, r + n, 1);o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : vn(e);
        } else if (r >= i.viewTo) {
          var l = yn(e, t, t, -1);l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : vn(e);
        } else {
          var a = yn(e, t, t, -1),
              s = yn(e, r, r + n, 1);a && s ? (i.view = i.view.slice(0, a.index).concat(bt(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += n) : vn(e);
        }var c = i.externalMeasured;c && (r < c.lineN ? c.lineN += n : t < c.lineN + c.size && (i.externalMeasured = null));
      }function mn(e, t, r) {
        e.curOp.viewChanged = !0;var n = e.display,
            i = e.display.externalMeasured;if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
          var o = n.view[Ar(e, t)];if (null != o.node) {
            var l = o.changes || (o.changes = []);-1 == d(l, r) && l.push(r);
          }
        }
      }function vn(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }function yn(e, t, r, n) {
        var i,
            o = Ar(e, t),
            l = e.display.view;if (!Rl || r == e.doc.first + e.doc.size) return { index: o, lineN: r };for (var a = e.display.viewFrom, s = 0; s < o; s++) {
          a += l[s].size;
        }if (a != t) {
          if (n > 0) {
            if (o == l.length - 1) return null;i = a + l[o].size - t, o++;
          } else i = a - t;t += i, r += i;
        }for (; pe(e.doc, r) != r;) {
          if (o == (n < 0 ? 0 : l.length - 1)) return null;r += n * l[o - (n < 0 ? 1 : 0)].size, o += n;
        }return { index: o, lineN: r };
      }function bn(e, t, r) {
        var n = e.display;0 == n.view.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = bt(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = bt(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(Ar(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(bt(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, Ar(e, r)))), n.viewTo = r;
      }function xn(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
          var i = t[n];i.hidden || i.node && !i.changes || ++r;
        }return r;
      }function wn(e, t) {
        e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, c(Cn, e));
      }function Cn(e) {
        var t = e.doc;if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
          var r = +new Date() + e.options.workTime,
              n = Ye(t.mode, et(e, t.frontier)),
              i = [];t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
            if (t.frontier >= e.display.viewFrom) {
              var l = o.styles,
                  a = o.text.length > e.options.maxHighlightLength,
                  s = qe(e, o, a ? Ye(t.mode, n) : n, !0);o.styles = s.styles;var c = o.styleClasses,
                  u = s.classes;u ? o.styleClasses = u : c && (o.styleClasses = null);for (var f = !l || l.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), d = 0; !f && d < l.length; ++d) {
                f = l[d] != o.styles[d];
              }f && i.push(t.frontier), o.stateAfter = a ? n : Ye(t.mode, n);
            } else o.text.length <= e.options.maxHighlightLength && tt(e, o.text, n), o.stateAfter = t.frontier % 5 == 0 ? Ye(t.mode, n) : null;if (++t.frontier, +new Date() > r) return wn(e, e.options.workDelay), !0;
          }), i.length && fn(e, function () {
            for (var t = 0; t < i.length; t++) {
              mn(e, i[t], "text");
            }
          });
        }
      }function kn(e) {
        var t = e.display;!t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Ut(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Ut(e) + "px", t.scrollbarsClipped = !0);
      }function An(e) {
        if (e.hasFocus()) return null;var t = l();if (!t || !o(e.display.lineDiv, t)) return null;var r = { activeElt: t };if (window.getSelection) {
          var n = window.getSelection();n.anchorNode && n.extend && o(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset);
        }return r;
      }function Sn(e) {
        if (e && e.activeElt && e.activeElt != l() && (e.activeElt.focus(), e.anchorNode && o(document.body, e.anchorNode) && o(document.body, e.focusNode))) {
          var t = window.getSelection(),
              r = document.createRange();r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), t.removeAllRanges(), t.addRange(r), t.extend(e.focusNode, e.focusOffset);
        }
      }function Mn(e, r) {
        var n = e.display,
            i = e.doc;if (r.editorIsHidden) return vn(e), !1;if (!r.force && r.visible.from >= n.viewFrom && r.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == xn(e)) return !1;Fr(e) && (vn(e), r.dims = br(e));var o = i.first + i.size,
            l = Math.max(r.visible.from - e.options.viewportMargin, i.first),
            a = Math.min(o, r.visible.to + e.options.viewportMargin);n.viewFrom < l && l - n.viewFrom < 20 && (l = Math.max(i.first, n.viewFrom)), n.viewTo > a && n.viewTo - a < 20 && (a = Math.min(o, n.viewTo)), Rl && (l = pe(e.doc, l), a = ge(e.doc, a));var s = l != n.viewFrom || a != n.viewTo || n.lastWrapHeight != r.wrapperHeight || n.lastWrapWidth != r.wrapperWidth;bn(e, l, a), n.viewOffset = ye(L(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";var c = xn(e);if (!s && 0 == c && !r.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;var u = An(e);return c > 4 && (n.lineDiv.style.display = "none"), Nn(e, n.updateLineNumbers, r.dims), c > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, Sn(u), t(n.cursorDiv), t(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, s && (n.lastWrapHeight = r.wrapperHeight, n.lastWrapWidth = r.wrapperWidth, wn(e, 400)), n.updateLineNumbers = null, !0;
      }function Ln(e, t) {
        for (var r = t.viewport, n = !0; (n && e.options.lineWrapping && t.oldDisplayWidth != $t(e) || (r && null != r.top && (r = { top: Math.min(e.doc.height + Bt(e.display) - jt(e), r.top) }), t.visible = Rr(e.display, e.doc, r), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && Mn(e, t); n = !1) {
          Ir(e);var i = qr(e);Sr(e), Zr(e, i), En(e, i);
        }t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }function Tn(e, t) {
        var r = new aa(e, t);if (Mn(e, r)) {
          Ir(e), Ln(e, r);var n = qr(e);Sr(e), Zr(e, n), En(e, n), r.finish();
        }
      }function Nn(e, r, n) {
        function i(t) {
          var r = t.nextSibling;return ol && gl && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r;
        }for (var o = e.display, l = e.options.lineNumbers, a = o.lineDiv, s = a.firstChild, c = o.view, u = o.viewFrom, f = 0; f < c.length; f++) {
          var h = c[f];if (h.hidden) ;else if (h.node && h.node.parentNode == a) {
            for (; s != h.node;) {
              s = i(s);
            }var p = l && null != r && r <= u && h.lineNumber;h.changes && (d(h.changes, "gutter") > -1 && (p = !1), St(e, h, u, n)), p && (t(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(I(e.options, u)))), s = h.node.nextSibling;
          } else {
            var g = Wt(e, h, u, n);a.insertBefore(g, s);
          }u += h.size;
        }for (; s;) {
          s = i(s);
        }
      }function On(e) {
        var t = e.display.gutters.offsetWidth;e.display.sizer.style.marginLeft = t + "px";
      }function En(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ut(e) + "px";
      }function Dn(e) {
        var r = e.display.gutters,
            i = e.options.gutters;t(r);for (var o = 0; o < i.length; ++o) {
          var l = i[o],
              a = r.appendChild(n("div", null, "CodeMirror-gutter " + l));"CodeMirror-linenumbers" == l && (e.display.lineGutter = a, a.style.width = (e.display.lineNumWidth || 1) + "px");
        }r.style.display = o ? "" : "none", On(e);
      }function Wn(e) {
        var t = d(e.gutters, "CodeMirror-linenumbers");-1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1));
      }function In(e) {
        var t = e.wheelDeltaX,
            r = e.wheelDeltaY;return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), { x: t, y: r };
      }function Hn(e) {
        var t = In(e);return t.x *= ca, t.y *= ca, t;
      }function Rn(e, t) {
        var r = In(t),
            n = r.x,
            i = r.y,
            o = e.display,
            l = o.scroller,
            a = l.scrollWidth > l.clientWidth,
            s = l.scrollHeight > l.clientHeight;if (n && a || i && s) {
          if (i && gl && ol) e: for (var c = t.target, u = o.view; c != l; c = c.parentNode) {
            for (var f = 0; f < u.length; f++) {
              if (u[f].node == c) {
                e.display.currentWheelTarget = c;break e;
              }
            }
          }if (n && !Zo && !sl && null != ca) return i && s && Yr(e, Math.max(0, l.scrollTop + i * ca)), Jr(e, Math.max(0, l.scrollLeft + n * ca)), (!i || i && s) && He(t), void (o.wheelStartX = null);if (i && null != ca) {
            var d = i * ca,
                h = e.doc.scrollTop,
                p = h + o.wrapper.clientHeight;d < 0 ? h = Math.max(0, h + d - 50) : p = Math.min(e.doc.height, p + d + 50), Tn(e, { top: h, bottom: p });
          }sa < 20 && (null == o.wheelStartX ? (o.wheelStartX = l.scrollLeft, o.wheelStartY = l.scrollTop, o.wheelDX = n, o.wheelDY = i, setTimeout(function () {
            if (null != o.wheelStartX) {
              var e = l.scrollLeft - o.wheelStartX,
                  t = l.scrollTop - o.wheelStartY,
                  r = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;o.wheelStartX = o.wheelStartY = null, r && (ca = (ca * sa + r) / (sa + 1), ++sa);
            }
          }, 200)) : (o.wheelDX += n, o.wheelDY += i));
        }
      }function zn(e, t) {
        var r = e[t];e.sort(function (e, t) {
          return R(e.from(), t.from());
        }), t = d(e, r);for (var n = 1; n < e.length; n++) {
          var i = e[n],
              o = e[n - 1];if (R(o.to(), i.from()) >= 0) {
            var l = B(o.from(), i.from()),
                a = P(o.to(), i.to()),
                s = o.empty() ? i.from() == i.head : o.from() == o.head;n <= t && --t, e.splice(--n, 2, new fa(s ? a : l, s ? l : a));
          }
        }return new ua(e, t);
      }function Fn(e, t) {
        return new ua([new fa(e, t || e)], 0);
      }function Pn(e) {
        return e.text ? H(e.from.line + e.text.length - 1, g(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
      }function Bn(e, t) {
        if (R(e, t.from) < 0) return e;if (R(e, t.to) <= 0) return Pn(t);var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;return e.line == t.to.line && (n += Pn(t).ch - t.to.ch), H(r, n);
      }function _n(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
          var i = e.sel.ranges[n];r.push(new fa(Bn(i.anchor, t), Bn(i.head, t)));
        }return zn(r, e.sel.primIndex);
      }function Un(e, t, r) {
        return e.line == t.line ? H(r.line, e.ch - t.ch + r.ch) : H(r.line + (e.line - t.line), e.ch);
      }function $n(e, t, r) {
        for (var n = [], i = H(e.first, 0), o = i, l = 0; l < t.length; l++) {
          var a = t[l],
              s = Un(a.from, i, o),
              c = Un(Pn(a), i, o);if (i = a.to, o = c, "around" == r) {
            var u = e.sel.ranges[l],
                f = R(u.head, u.anchor) < 0;n[l] = new fa(f ? c : s, f ? s : c);
          } else n[l] = new fa(s, s);
        }return new ua(n, e.sel.primIndex);
      }function jn(e) {
        e.doc.mode = Ke(e.options, e.doc.modeOption), Vn(e);
      }function Vn(e) {
        e.doc.iter(function (e) {
          e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
        }), e.doc.frontier = e.doc.first, wn(e, 100), e.state.modeGen++, e.curOp && gn(e);
      }function Gn(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == g(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }function Kn(e, t, r, n) {
        function i(e) {
          return r ? r[e] : null;
        }function o(e, r, i) {
          st(e, r, i, n), kt(e, "change", e, t);
        }function l(e, t) {
          for (var r = [], o = e; o < t; ++o) {
            r.push(new Ql(c[o], i(o), n));
          }return r;
        }var a = t.from,
            s = t.to,
            c = t.text,
            u = L(e, a.line),
            f = L(e, s.line),
            d = g(c),
            h = i(c.length - 1),
            p = s.line - a.line;if (t.full) e.insert(0, l(0, c.length)), e.remove(c.length, e.size - c.length);else if (Gn(e, t)) {
          var m = l(0, c.length - 1);o(f, f.text, h), p && e.remove(a.line, p), m.length && e.insert(a.line, m);
        } else if (u == f) {
          if (1 == c.length) o(u, u.text.slice(0, a.ch) + d + u.text.slice(s.ch), h);else {
            var v = l(1, c.length - 1);v.push(new Ql(d + u.text.slice(s.ch), h, n)), o(u, u.text.slice(0, a.ch) + c[0], i(0)), e.insert(a.line + 1, v);
          }
        } else if (1 == c.length) o(u, u.text.slice(0, a.ch) + c[0] + f.text.slice(s.ch), i(0)), e.remove(a.line + 1, p);else {
          o(u, u.text.slice(0, a.ch) + c[0], i(0)), o(f, d + f.text.slice(s.ch), h);var y = l(1, c.length - 1);p > 1 && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, y);
        }kt(e, "change", e, t);
      }function Xn(e, t, r) {
        function n(e, i, o) {
          if (e.linked) for (var l = 0; l < e.linked.length; ++l) {
            var a = e.linked[l];if (a.doc != i) {
              var s = o && a.sharedHist;r && !s || (t(a.doc, s), n(a.doc, e, s));
            }
          }
        }n(e, null, !0);
      }function Yn(e, t) {
        if (t.cm) throw new Error("This document is already in use.");e.doc = t, t.cm = e, Cr(e), jn(e), Qn(e), e.options.lineWrapping || xe(e), e.options.mode = t.modeOption, gn(e);
      }function Qn(e) {
        ("rtl" == e.doc.direction ? a : Cl)(e.display.lineDiv, "CodeMirror-rtl");
      }function Jn(e) {
        fn(e, function () {
          Qn(e), gn(e);
        });
      }function qn(e) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1;
      }function Zn(e, t) {
        var r = { from: F(t.from), to: Pn(t), text: T(e, t.from, t.to) };return li(e, r, t.from.line, t.to.line + 1), Xn(e, function (e) {
          return li(e, r, t.from.line, t.to.line + 1);
        }, !0), r;
      }function ei(e) {
        for (; e.length;) {
          if (!g(e).ranges) break;e.pop();
        }
      }function ti(e, t) {
        return t ? (ei(e.done), g(e.done)) : e.done.length && !g(e.done).ranges ? g(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), g(e.done)) : void 0;
      }function ri(e, t, r, n) {
        var i = e.history;i.undone.length = 0;var o,
            l,
            a = +new Date();if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > a - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = ti(i, i.lastOp == n))) l = g(o.changes), 0 == R(t.from, t.to) && 0 == R(t.from, l.to) ? l.to = Pn(t) : o.changes.push(Zn(e, t));else {
          var s = g(i.done);for (s && s.ranges || oi(e.sel, i.done), o = { changes: [Zn(e, t)], generation: i.generation }, i.done.push(o); i.done.length > i.undoDepth;) {
            i.done.shift(), i.done[0].ranges || i.done.shift();
          }
        }i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = a, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, l || Oe(e, "historyAdded");
      }function ni(e, t, r, n) {
        var i = t.charAt(0);return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }function ii(e, t, r, n) {
        var i = e.history,
            o = n && n.origin;r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ni(e, o, g(i.done), t)) ? i.done[i.done.length - 1] = t : oi(t, i.done), i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = r, n && !1 !== n.clearRedo && ei(i.undone);
      }function oi(e, t) {
        var r = g(t);r && r.ranges && r.equals(e) || t.push(e);
      }function li(e, t, r, n) {
        var i = t["spans_" + e.id],
            o = 0;e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function (r) {
          r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o;
        });
      }function ai(e) {
        if (!e) return null;for (var t, r = 0; r < e.length; ++r) {
          e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        }return t ? t.length ? t : null : e;
      }function si(e, t) {
        var r = t["spans_" + e.id];if (!r) return null;for (var n = [], i = 0; i < t.text.length; ++i) {
          n.push(ai(r[i]));
        }return n;
      }function ci(e, t) {
        var r = si(e, t),
            n = Z(e, t);if (!r) return n;if (!n) return r;for (var i = 0; i < r.length; ++i) {
          var o = r[i],
              l = n[i];if (o && l) e: for (var a = 0; a < l.length; ++a) {
            for (var s = l[a], c = 0; c < o.length; ++c) {
              if (o[c].marker == s.marker) continue e;
            }o.push(s);
          } else l && (r[i] = l);
        }return r;
      }function ui(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
          var o = e[i];if (o.ranges) n.push(r ? ua.prototype.deepCopy.call(o) : o);else {
            var l = o.changes,
                a = [];n.push({ changes: a });for (var s = 0; s < l.length; ++s) {
              var c = l[s],
                  u = void 0;if (a.push({ from: c.from, to: c.to, text: c.text }), t) for (var f in c) {
                (u = f.match(/^spans_(\d+)$/)) && d(t, Number(u[1])) > -1 && (g(a)[f] = c[f], delete c[f]);
              }
            }
          }
        }return n;
      }function fi(e, t, r, n) {
        if (e.cm && e.cm.display.shift || e.extend) {
          var i = t.anchor;if (n) {
            var o = R(r, i) < 0;o != R(n, i) < 0 ? (i = r, r = n) : o != R(r, n) < 0 && (r = n);
          }return new fa(i, r);
        }return new fa(n || r, r);
      }function di(e, t, r, n) {
        yi(e, new ua([fi(e, e.sel.primary(), t, r)], 0), n);
      }function hi(e, t, r) {
        for (var n = [], i = 0; i < e.sel.ranges.length; i++) {
          n[i] = fi(e, e.sel.ranges[i], t[i], null);
        }yi(e, zn(n, e.sel.primIndex), r);
      }function pi(e, t, r, n) {
        var i = e.sel.ranges.slice(0);i[t] = r, yi(e, zn(i, e.sel.primIndex), n);
      }function gi(e, t, r, n) {
        yi(e, Fn(t, r), n);
      }function mi(e, t, r) {
        var n = { ranges: t.ranges, update: function update(t) {
            var r = this;this.ranges = [];for (var n = 0; n < t.length; n++) {
              r.ranges[n] = new fa(U(e, t[n].anchor), U(e, t[n].head));
            }
          }, origin: r && r.origin };return Oe(e, "beforeSelectionChange", e, n), e.cm && Oe(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? zn(n.ranges, n.ranges.length - 1) : t;
      }function vi(e, t, r) {
        var n = e.history.done,
            i = g(n);i && i.ranges ? (n[n.length - 1] = t, bi(e, t, r)) : yi(e, t, r);
      }function yi(e, t, r) {
        bi(e, t, r), ii(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
      }function bi(e, t, r) {
        (We(e, "beforeSelectionChange") || e.cm && We(e.cm, "beforeSelectionChange")) && (t = mi(e, t, r)), xi(e, Ci(e, t, r && r.bias || (R(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)), r && !1 === r.scroll || !e.cm || jr(e.cm);
      }function xi(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, De(e.cm)), kt(e, "cursorActivity", e));
      }function wi(e) {
        xi(e, Ci(e, e.sel, null, !1));
      }function Ci(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
          var l = t.ranges[o],
              a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
              s = Ai(e, l.anchor, a && a.anchor, r, n),
              c = Ai(e, l.head, a && a.head, r, n);(i || s != l.anchor || c != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new fa(s, c));
        }return i ? zn(i, t.primIndex) : t;
      }function ki(e, t, r, n, i) {
        var o = L(e, t.line);if (o.markedSpans) for (var l = 0; l < o.markedSpans.length; ++l) {
          var a = o.markedSpans[l],
              s = a.marker;if ((null == a.from || (s.inclusiveLeft ? a.from <= t.ch : a.from < t.ch)) && (null == a.to || (s.inclusiveRight ? a.to >= t.ch : a.to > t.ch))) {
            if (i && (Oe(s, "beforeCursorEnter"), s.explicitlyCleared)) {
              if (o.markedSpans) {
                --l;continue;
              }break;
            }if (!s.atomic) continue;if (r) {
              var c = s.find(n < 0 ? 1 : -1),
                  u = void 0;if ((n < 0 ? s.inclusiveRight : s.inclusiveLeft) && (c = Si(e, c, -n, c && c.line == t.line ? o : null)), c && c.line == t.line && (u = R(c, r)) && (n < 0 ? u < 0 : u > 0)) return ki(e, c, t, n, i);
            }var f = s.find(n < 0 ? -1 : 1);return (n < 0 ? s.inclusiveLeft : s.inclusiveRight) && (f = Si(e, f, n, f.line == t.line ? o : null)), f ? ki(e, f, t, n, i) : null;
          }
        }return t;
      }function Ai(e, t, r, n, i) {
        var o = n || 1,
            l = ki(e, t, r, o, i) || !i && ki(e, t, r, o, !0) || ki(e, t, r, -o, i) || !i && ki(e, t, r, -o, !0);return l || (e.cantEdit = !0, H(e.first, 0));
      }function Si(e, t, r, n) {
        return r < 0 && 0 == t.ch ? t.line > e.first ? U(e, H(t.line - 1)) : null : r > 0 && t.ch == (n || L(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? H(t.line + 1, 0) : null : new H(t.line, t.ch + r);
      }function Mi(e) {
        e.setSelection(H(e.firstLine(), 0), H(e.lastLine()), Nl);
      }function Li(e, t, r) {
        var n = { canceled: !1, from: t.from, to: t.to, text: t.text, origin: t.origin, cancel: function cancel() {
            return n.canceled = !0;
          } };return r && (n.update = function (t, r, i, o) {
          t && (n.from = U(e, t)), r && (n.to = U(e, r)), i && (n.text = i), void 0 !== o && (n.origin = o);
        }), Oe(e, "beforeChange", e, n), e.cm && Oe(e.cm, "beforeChange", e.cm, n), n.canceled ? null : { from: n.from, to: n.to, text: n.text, origin: n.origin };
      }function Ti(e, t, r) {
        if (e.cm) {
          if (!e.cm.curOp) return dn(e.cm, Ti)(e, t, r);if (e.cm.state.suppressEdits) return;
        }if (!(We(e, "beforeChange") || e.cm && We(e.cm, "beforeChange")) || (t = Li(e, t, !0))) {
          var n = Hl && !r && te(e, t.from, t.to);if (n) for (var i = n.length - 1; i >= 0; --i) {
            Ni(e, { from: n[i].from, to: n[i].to, text: i ? [""] : t.text });
          } else Ni(e, t);
        }
      }function Ni(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != R(t.from, t.to)) {
          var r = _n(e, t);ri(e, t, r, e.cm ? e.cm.curOp.id : NaN), Di(e, t, r, Z(e, t));var n = [];Xn(e, function (e, r) {
            r || -1 != d(n, e.history) || (zi(e.history, t), n.push(e.history)), Di(e, t, null, Z(e, t));
          });
        }
      }function Oi(e, t, r) {
        if (!e.cm || !e.cm.state.suppressEdits || r) {
          for (var n, i = e.history, o = e.sel, l = "undo" == t ? i.done : i.undone, a = "undo" == t ? i.undone : i.done, s = 0; s < l.length && (n = l[s], r ? !n.ranges || n.equals(e.sel) : n.ranges); s++) {}if (s != l.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; n = l.pop(), n.ranges;) {
              if (oi(n, a), r && !n.equals(e.sel)) return void yi(e, n, { clearRedo: !1 });o = n;
            }var c = [];oi(o, a), a.push({ changes: c, generation: i.generation }), i.generation = n.generation || ++i.maxGeneration;for (var u = We(e, "beforeChange") || e.cm && We(e.cm, "beforeChange"), f = n.changes.length - 1; f >= 0; --f) {
              var h = function (r) {
                var i = n.changes[r];if (i.origin = t, u && !Li(e, i, !1)) return l.length = 0, {};c.push(Zn(e, i));var o = r ? _n(e, i) : g(l);Di(e, i, o, ci(e, i)), !r && e.cm && e.cm.scrollIntoView({ from: i.from, to: Pn(i) });var a = [];Xn(e, function (e, t) {
                  t || -1 != d(a, e.history) || (zi(e.history, i), a.push(e.history)), Di(e, i, null, ci(e, i));
                });
              }(f);if (h) return h.v;
            }
          }
        }
      }function Ei(e, t) {
        if (0 != t && (e.first += t, e.sel = new ua(m(e.sel.ranges, function (e) {
          return new fa(H(e.anchor.line + t, e.anchor.ch), H(e.head.line + t, e.head.ch));
        }), e.sel.primIndex), e.cm)) {
          gn(e.cm, e.first, e.first - t, t);for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) {
            mn(e.cm, n, "gutter");
          }
        }
      }function Di(e, t, r, n) {
        if (e.cm && !e.cm.curOp) return dn(e.cm, Di)(e, t, r, n);if (t.to.line < e.first) return void Ei(e, t.text.length - 1 - (t.to.line - t.from.line));if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);Ei(e, i), t = { from: H(e.first, 0), to: H(t.to.line + i, t.to.ch), text: [g(t.text)], origin: t.origin };
          }var o = e.lastLine();t.to.line > o && (t = { from: t.from, to: H(o, L(e, o).text.length), text: [t.text[0]], origin: t.origin }), t.removed = T(e, t.from, t.to), r || (r = _n(e, t)), e.cm ? Wi(e.cm, t, n) : Kn(e, t, n), bi(e, r, Nl);
        }
      }function Wi(e, t, r) {
        var n = e.doc,
            i = e.display,
            o = t.from,
            l = t.to,
            a = !1,
            s = o.line;e.options.lineWrapping || (s = E(fe(L(n, o.line))), n.iter(s, l.line + 1, function (e) {
          if (e == i.maxLine) return a = !0, !0;
        })), n.sel.contains(t.from, t.to) > -1 && De(e), Kn(n, t, r, wr(e)), e.options.lineWrapping || (n.iter(s, o.line + t.text.length, function (e) {
          var t = be(e);t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, a = !1);
        }), a && (e.curOp.updateMaxLine = !0)), n.frontier = Math.min(n.frontier, o.line), wn(e, 400);var c = t.text.length - (l.line - o.line) - 1;t.full ? gn(e) : o.line != l.line || 1 != t.text.length || Gn(e.doc, t) ? gn(e, o.line, l.line + 1, c) : mn(e, o.line, "text");var u = We(e, "changes"),
            f = We(e, "change");if (f || u) {
          var d = { from: o, to: l, text: t.text, removed: t.removed, origin: t.origin };f && kt(e, "change", e, d), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(d);
        }e.display.selForContextMenu = null;
      }function Ii(e, t, r, n, i) {
        if (n || (n = r), R(n, r) < 0) {
          var o = n;n = r, r = o;
        }"string" == typeof t && (t = e.splitLines(t)), Ti(e, { from: r, to: n, text: t, origin: i });
      }function Hi(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0);
      }function Ri(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
          var o = e[i],
              l = !0;if (o.ranges) {
            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);for (var a = 0; a < o.ranges.length; a++) {
              Hi(o.ranges[a].anchor, t, r, n), Hi(o.ranges[a].head, t, r, n);
            }
          } else {
            for (var s = 0; s < o.changes.length; ++s) {
              var c = o.changes[s];if (r < c.from.line) c.from = H(c.from.line + n, c.from.ch), c.to = H(c.to.line + n, c.to.ch);else if (t <= c.to.line) {
                l = !1;break;
              }
            }l || (e.splice(0, i + 1), i = 0);
          }
        }
      }function zi(e, t) {
        var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;Ri(e.done, r, n, i), Ri(e.undone, r, n, i);
      }function Fi(e, t, r, n) {
        var i = t,
            o = t;return "number" == typeof t ? o = L(e, _(e, t)) : i = E(t), null == i ? null : (n(o, i) && e.cm && mn(e.cm, i, r), o);
      }function Pi(e, t, r) {
        ye(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && $r(e, r);
      }function Bi(e, t, r, n) {
        var i = new pa(e, r, n),
            o = e.cm;return o && i.noHScroll && (o.display.alignWidgets = !0), Fi(e, t, "widget", function (t) {
          var r = t.widgets || (t.widgets = []);if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !me(e, t)) {
            var n = ye(t) < e.scrollTop;O(t, t.height + zt(i)), n && $r(o, i.height), o.curOp.forceUpdate = !0;
          }return !0;
        }), kt(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : E(t)), i;
      }function _i(e, t, r, n, o) {
        if (n && n.shared) return Ui(e, t, r, n, o);if (e.cm && !e.cm.curOp) return dn(e.cm, _i)(e, t, r, n, o);var l = new ma(e, o),
            a = R(t, r);if (n && u(n, l, !1), a > 0 || 0 == a && !1 !== l.clearWhenEmpty) return l;if (l.replacedWith && (l.collapsed = !0, l.widgetNode = i("span", [l.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || l.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (l.widgetNode.insertLeft = !0)), l.collapsed) {
          if (ue(e, t.line, t, r, l) || t.line != r.line && ue(e, r.line, t, r, l)) throw new Error("Inserting collapsed marker partially overlapping an existing one");G();
        }l.addToHistory && ri(e, { from: t, to: r, origin: "markText" }, e.sel, NaN);var s,
            c = t.line,
            f = e.cm;if (e.iter(c, r.line + 1, function (e) {
          f && l.collapsed && !f.options.lineWrapping && fe(e) == f.display.maxLine && (s = !0), l.collapsed && c != t.line && O(e, 0), Q(e, new K(l, c == t.line ? t.ch : null, c == r.line ? r.ch : null)), ++c;
        }), l.collapsed && e.iter(t.line, r.line + 1, function (t) {
          me(e, t) && O(t, 0);
        }), l.clearOnEnter && Bl(l, "beforeCursorEnter", function () {
          return l.clear();
        }), l.readOnly && (V(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), l.collapsed && (l.id = ++ga, l.atomic = !0), f) {
          if (s && (f.curOp.updateMaxLine = !0), l.collapsed) gn(f, t.line, r.line + 1);else if (l.className || l.title || l.startStyle || l.endStyle || l.css) for (var d = t.line; d <= r.line; d++) {
            mn(f, d, "text");
          }l.atomic && wi(f.doc), kt(f, "markerAdded", f, l);
        }return l;
      }function Ui(e, t, r, n, i) {
        n = u(n), n.shared = !1;var o = [_i(e, t, r, n, i)],
            l = o[0],
            a = n.widgetNode;return Xn(e, function (e) {
          a && (n.widgetNode = a.cloneNode(!0)), o.push(_i(e, U(e, t), U(e, r), n, i));for (var s = 0; s < e.linked.length; ++s) {
            if (e.linked[s].isParent) return;
          }l = g(o);
        }), new va(o, l);
      }function $i(e) {
        return e.findMarks(H(e.first, 0), e.clipPos(H(e.lastLine())), function (e) {
          return e.parent;
        });
      }function ji(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r],
              i = n.find(),
              o = e.clipPos(i.from),
              l = e.clipPos(i.to);if (R(o, l)) {
            var a = _i(e, o, l, n.primary, n.primary.type);n.markers.push(a), a.parent = n;
          }
        }
      }function Vi(e) {
        for (var t = 0; t < e.length; t++) {
          !function (t) {
            var r = e[t],
                n = [r.primary.doc];Xn(r.primary.doc, function (e) {
              return n.push(e);
            });for (var i = 0; i < r.markers.length; i++) {
              var o = r.markers[i];-1 == d(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1));
            }
          }(t);
        }
      }function Gi(e) {
        var t = this;if (Yi(t), !Ee(t, e) && !Ft(t.display, e)) {
          He(e), nl && (xa = +new Date());var r = kr(t, e, !0),
              n = e.dataTransfer.files;if (r && !t.isReadOnly()) if (n && n.length && window.FileReader && window.File) for (var i = n.length, o = Array(i), l = 0, a = 0; a < i; ++a) {
            !function (e, n) {
              if (!t.options.allowDropFileTypes || -1 != d(t.options.allowDropFileTypes, e.type)) {
                var a = new FileReader();a.onload = dn(t, function () {
                  var e = a.result;if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[n] = e, ++l == i) {
                    r = U(t.doc, r);var s = { from: r, to: r, text: t.doc.splitLines(o.join(t.doc.lineSeparator())), origin: "paste" };Ti(t.doc, s), vi(t.doc, Fn(r, Pn(s)));
                  }
                }), a.readAsText(e);
              }
            }(n[a], a);
          } else {
            if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(function () {
              return t.display.input.focus();
            }, 20);try {
              var s = e.dataTransfer.getData("Text");if (s) {
                var c;if (t.state.draggingText && !t.state.draggingText.copy && (c = t.listSelections()), bi(t.doc, Fn(r, r)), c) for (var u = 0; u < c.length; ++u) {
                  Ii(t.doc, "", c[u].anchor, c[u].head, "drag");
                }t.replaceSelection(s, "around", "paste"), t.display.input.focus();
              }
            } catch (e) {}
          }
        }
      }function Ki(e, t) {
        if (nl && (!e.state.draggingText || +new Date() - xa < 100)) return void Fe(t);if (!Ee(e, t) && !Ft(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !cl)) {
          var r = n("img", null, null, "position: fixed; left: 0; top: 0;");r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", sl && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), sl && r.parentNode.removeChild(r);
        }
      }function Xi(e, t) {
        var i = kr(e, t);if (i) {
          var o = document.createDocumentFragment();Lr(e, i, o), e.display.dragCursor || (e.display.dragCursor = n("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), r(e.display.dragCursor, o);
        }
      }function Yi(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }function Qi(e) {
        if (document.body.getElementsByClassName) for (var t = document.body.getElementsByClassName("CodeMirror"), r = 0; r < t.length; r++) {
          var n = t[r].CodeMirror;n && e(n);
        }
      }function Ji() {
        wa || (qi(), wa = !0);
      }function qi() {
        var e;Bl(window, "resize", function () {
          null == e && (e = setTimeout(function () {
            e = null, Qi(Zi);
          }, 100));
        }), Bl(window, "blur", function () {
          return Qi(Wr);
        });
      }function Zi(e) {
        var t = e.display;t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize());
      }function eo(e) {
        var t = e.split(/-(?!$)/);e = t[t.length - 1];for (var r, n, i, o, l = 0; l < t.length - 1; l++) {
          var a = t[l];if (/^(cmd|meta|m)$/i.test(a)) o = !0;else if (/^a(lt)?$/i.test(a)) r = !0;else if (/^(c|ctrl|control)$/i.test(a)) n = !0;else {
            if (!/^s(hift)?$/i.test(a)) throw new Error("Unrecognized modifier name: " + a);i = !0;
          }
        }return r && (e = "Alt-" + e), n && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }function to(e) {
        var t = {};for (var r in e) {
          if (e.hasOwnProperty(r)) {
            var n = e[r];if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;if ("..." == n) {
              delete e[r];continue;
            }for (var i = m(r.split(" "), eo), o = 0; o < i.length; o++) {
              var l = void 0,
                  a = void 0;o == i.length - 1 ? (a = i.join(" "), l = n) : (a = i.slice(0, o + 1).join(" "), l = "...");var s = t[a];if (s) {
                if (s != l) throw new Error("Inconsistent bindings for " + a);
              } else t[a] = l;
            }delete e[r];
          }
        }for (var c in t) {
          e[c] = t[c];
        }return e;
      }function ro(e, t, r, n) {
        t = oo(t);var i = t.call ? t.call(e, n) : t[e];if (!1 === i) return "nothing";if ("..." === i) return "multi";if (null != i && r(i)) return "handled";if (t.fallthrough) {
          if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return ro(e, t.fallthrough, r, n);for (var o = 0; o < t.fallthrough.length; o++) {
            var l = ro(e, t.fallthrough[o], r, n);if (l) return l;
          }
        }
      }function no(e) {
        var t = "string" == typeof e ? e : Ca[e.keyCode];return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
      }function io(e, t) {
        if (sl && 34 == e.keyCode && e.char) return !1;var r = Ca[e.keyCode],
            n = r;return null != n && !e.altGraphKey && (e.altKey && "Alt" != r && (n = "Alt-" + n), (xl ? e.metaKey : e.ctrlKey) && "Ctrl" != r && (n = "Ctrl-" + n), (xl ? e.ctrlKey : e.metaKey) && "Cmd" != r && (n = "Cmd-" + n), !t && e.shiftKey && "Shift" != r && (n = "Shift-" + n), n);
      }function oo(e) {
        return "string" == typeof e ? Ma[e] : e;
      }function lo(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
          for (var o = t(r[i]); n.length && R(o.from, g(n).to) <= 0;) {
            var l = n.pop();if (R(l.from, o.from) < 0) {
              o.from = l.from;break;
            }
          }n.push(o);
        }fn(e, function () {
          for (var t = n.length - 1; t >= 0; t--) {
            Ii(e.doc, "", n[t].from, n[t].to, "+delete");
          }jr(e);
        });
      }function ao(e, t) {
        var r = L(e.doc, t),
            n = fe(r);return n != r && (t = E(n)), Me(!0, e, n, t, 1);
      }function so(e, t) {
        var r = L(e.doc, t),
            n = de(r);return n != r && (t = E(n)), Me(!0, e, r, t, -1);
      }function co(e, t) {
        var r = ao(e, t.line),
            n = L(e.doc, r.line),
            i = ke(n, e.doc.direction);if (!i || 0 == i[0].level) {
          var o = Math.max(0, n.text.search(/\S/)),
              l = t.line == r.line && t.ch <= o && t.ch;return H(r.line, l ? 0 : o, r.sticky);
        }return r;
      }function uo(e, t, r) {
        if ("string" == typeof t && !(t = Na[t])) return !1;e.display.input.ensurePolled();var n = e.display.shift,
            i = !1;try {
          e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != Tl;
        } finally {
          e.display.shift = n, e.state.suppressEdits = !1;
        }return i;
      }function fo(e, t, r) {
        for (var n = 0; n < e.state.keyMaps.length; n++) {
          var i = ro(t, e.state.keyMaps[n], r, e);if (i) return i;
        }return e.options.extraKeys && ro(t, e.options.extraKeys, r, e) || ro(t, e.options.keyMap, r, e);
      }function ho(e, t, r, n) {
        var i = e.state.keySeq;if (i) {
          if (no(t)) return "handled";Oa.set(50, function () {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), t = i + " " + t;
        }var o = fo(e, t, n);return "multi" == o && (e.state.keySeq = t), "handled" == o && kt(e, "keyHandled", e, t, r), "handled" != o && "multi" != o || (He(r), Nr(e)), i && !o && /\'$/.test(t) ? (He(r), !0) : !!o;
      }function po(e, t) {
        var r = io(t, !0);return !!r && (t.shiftKey && !e.state.keySeq ? ho(e, "Shift-" + r, t, function (t) {
          return uo(e, t, !0);
        }) || ho(e, r, t, function (t) {
          if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return uo(e, t);
        }) : ho(e, r, t, function (t) {
          return uo(e, t);
        }));
      }function go(e, t, r) {
        return ho(e, "'" + r + "'", t, function (t) {
          return uo(e, t, !0);
        });
      }function mo(e) {
        var t = this;if (t.curOp.focus = l(), !Ee(t, e)) {
          nl && il < 11 && 27 == e.keyCode && (e.returnValue = !1);var r = e.keyCode;t.display.shift = 16 == r || e.shiftKey;var n = po(t, e);sl && (Ea = n ? r : null, !n && 88 == r && !jl && (gl ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != r || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || vo(t);
        }
      }function vo(e) {
        function t(e) {
          18 != e.keyCode && e.altKey || (Cl(r, "CodeMirror-crosshair"), Ne(document, "keyup", t), Ne(document, "mouseover", t));
        }var r = e.display.lineDiv;a(r, "CodeMirror-crosshair"), Bl(document, "keyup", t), Bl(document, "mouseover", t);
      }function yo(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), Ee(this, e);
      }function bo(e) {
        var t = this;if (!(Ft(t.display, e) || Ee(t, e) || e.ctrlKey && !e.altKey || gl && e.metaKey)) {
          var r = e.keyCode,
              n = e.charCode;if (sl && r == Ea) return Ea = null, void He(e);if (!sl || e.which && !(e.which < 10) || !po(t, e)) {
            var i = String.fromCharCode(null == n ? r : n);"\b" != i && (go(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }function xo(e) {
        var t = this,
            r = t.display;if (!(Ee(t, e) || r.activeTouch && r.input.supportsTouch())) {
          if (r.input.ensurePolled(), r.shift = e.shiftKey, Ft(r, e)) return void (ol || (r.scroller.draggable = !1, setTimeout(function () {
            return r.scroller.draggable = !0;
          }, 100)));if (!So(t, e)) {
            var n = kr(t, e);switch (window.focus(), Be(e)) {case 1:
                t.state.selectingText ? t.state.selectingText(e) : n ? wo(t, e, n) : Pe(e) == r.scroller && He(e);break;case 2:
                ol && (t.state.lastMiddleDown = +new Date()), n && di(t.doc, n), setTimeout(function () {
                  return r.input.focus();
                }, 20), He(e);break;case 3:
                wl ? Mo(t, e) : Er(t);}
          }
        }
      }function wo(e, t, r) {
        nl ? setTimeout(c(Or, e), 0) : e.curOp.focus = l();var n,
            i = +new Date();Ta && Ta.time > i - 400 && 0 == R(Ta.pos, r) ? n = "triple" : La && La.time > i - 400 && 0 == R(La.pos, r) ? (n = "double", Ta = { time: i, pos: r }) : (n = "single", La = { time: i, pos: r });var o,
            a = e.doc.sel,
            s = gl ? t.metaKey : t.ctrlKey;e.options.dragDrop && _l && !e.isReadOnly() && "single" == n && (o = a.contains(r)) > -1 && (R((o = a.ranges[o]).from(), r) < 0 || r.xRel > 0) && (R(o.to(), r) > 0 || r.xRel < 0) ? Co(e, t, r, s) : ko(e, t, r, n, s);
      }function Co(e, t, r, n) {
        var i = e.display,
            o = !1,
            l = dn(e, function (t) {
          ol && (i.scroller.draggable = !1), e.state.draggingText = !1, Ne(document, "mouseup", l), Ne(document, "mousemove", a), Ne(i.scroller, "dragstart", s), Ne(i.scroller, "drop", l), o || (He(t), n || di(e.doc, r), ol || nl && 9 == il ? setTimeout(function () {
            document.body.focus(), i.input.focus();
          }, 20) : i.input.focus());
        }),
            a = function a(e) {
          o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10;
        },
            s = function s() {
          return o = !0;
        };ol && (i.scroller.draggable = !0), e.state.draggingText = l, l.copy = gl ? t.altKey : t.ctrlKey, i.scroller.dragDrop && i.scroller.dragDrop(), Bl(document, "mouseup", l), Bl(document, "mousemove", a), Bl(i.scroller, "dragstart", s), Bl(i.scroller, "drop", l), Er(e), setTimeout(function () {
          return i.input.focus();
        }, 20);
      }function ko(e, t, r, n, i) {
        function o(t) {
          if (0 != R(b, t)) if (b = t, "rect" == n) {
            for (var i = [], o = e.options.tabSize, l = f(L(u, r.line).text, r.ch, o), a = f(L(u, t.line).text, t.ch, o), s = Math.min(l, a), c = Math.max(l, a), m = Math.min(r.line, t.line), v = Math.min(e.lastLine(), Math.max(r.line, t.line)); m <= v; m++) {
              var y = L(u, m).text,
                  x = h(y, s, o);s == c ? i.push(new fa(H(m, x), H(m, x))) : y.length > x && i.push(new fa(H(m, x), H(m, h(y, c, o))));
            }i.length || i.push(new fa(r, r)), yi(u, zn(g.ranges.slice(0, p).concat(i), p), { origin: "*mouse", scroll: !1 }), e.scrollIntoView(t);
          } else {
            var w = d,
                C = w.anchor,
                k = t;if ("single" != n) {
              var A;A = "double" == n ? e.findWordAt(t) : new fa(H(t.line, 0), U(u, H(t.line + 1, 0))), R(A.anchor, C) > 0 ? (k = A.head, C = B(w.from(), A.anchor)) : (k = A.anchor, C = P(w.to(), A.head));
            }var S = g.ranges.slice(0);S[p] = new fa(U(u, C), k), yi(u, zn(S, p), Ol);
          }
        }function a(t) {
          var r = ++w,
              i = kr(e, t, !0, "rect" == n);if (i) if (0 != R(i, b)) {
            e.curOp.focus = l(), o(i);var s = Rr(c, u);(i.line >= s.to || i.line < s.from) && setTimeout(dn(e, function () {
              w == r && a(t);
            }), 150);
          } else {
            var f = t.clientY < x.top ? -20 : t.clientY > x.bottom ? 20 : 0;f && setTimeout(dn(e, function () {
              w == r && (c.scroller.scrollTop += f, a(t));
            }), 50);
          }
        }function s(t) {
          e.state.selectingText = !1, w = 1 / 0, He(t), c.input.focus(), Ne(document, "mousemove", C), Ne(document, "mouseup", k), u.history.lastSelOrigin = null;
        }var c = e.display,
            u = e.doc;He(t);var d,
            p,
            g = u.sel,
            m = g.ranges;if (i && !t.shiftKey ? (p = u.sel.contains(r), d = p > -1 ? m[p] : new fa(r, r)) : (d = u.sel.primary(), p = u.sel.primIndex), ml ? t.shiftKey && t.metaKey : t.altKey) n = "rect", i || (d = new fa(r, r)), r = kr(e, t, !0, !0), p = -1;else if ("double" == n) {
          var v = e.findWordAt(r);d = e.display.shift || u.extend ? fi(u, d, v.anchor, v.head) : v;
        } else if ("triple" == n) {
          var y = new fa(H(r.line, 0), U(u, H(r.line + 1, 0)));d = e.display.shift || u.extend ? fi(u, d, y.anchor, y.head) : y;
        } else d = fi(u, d, r);i ? -1 == p ? (p = m.length, yi(u, zn(m.concat([d]), p), { scroll: !1, origin: "*mouse" })) : m.length > 1 && m[p].empty() && "single" == n && !t.shiftKey ? (yi(u, zn(m.slice(0, p).concat(m.slice(p + 1)), 0), { scroll: !1, origin: "*mouse" }), g = u.sel) : pi(u, p, d, Ol) : (p = 0, yi(u, new ua([d], 0), Ol), g = u.sel);var b = r,
            x = c.wrapper.getBoundingClientRect(),
            w = 0,
            C = dn(e, function (e) {
          Be(e) ? a(e) : s(e);
        }),
            k = dn(e, s);e.state.selectingText = k, Bl(document, "mousemove", C), Bl(document, "mouseup", k);
      }function Ao(e, t, r, n) {
        var i, o;try {
          i = t.clientX, o = t.clientY;
        } catch (t) {
          return !1;
        }if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;n && He(t);var l = e.display,
            a = l.lineDiv.getBoundingClientRect();if (o > a.bottom || !We(e, r)) return ze(t);o -= a.top - l.viewOffset;for (var s = 0; s < e.options.gutters.length; ++s) {
          var c = l.gutters.childNodes[s];if (c && c.getBoundingClientRect().right >= i) {
            return Oe(e, r, e, D(e.doc, o), e.options.gutters[s], t), ze(t);
          }
        }
      }function So(e, t) {
        return Ao(e, t, "gutterClick", !0);
      }function Mo(e, t) {
        Ft(e.display, t) || Lo(e, t) || Ee(e, t, "contextmenu") || e.display.input.onContextMenu(t);
      }function Lo(e, t) {
        return !!We(e, "gutterContextMenu") && Ao(e, t, "gutterContextMenu", !1);
      }function To(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), ir(e);
      }function No(e) {
        Dn(e), gn(e), zr(e);
      }function Oo(e, t, r) {
        if (!t != !(r && r != Da)) {
          var n = e.display.dragFunctions,
              i = t ? Bl : Ne;i(e.display.scroller, "dragstart", n.start), i(e.display.scroller, "dragenter", n.enter), i(e.display.scroller, "dragover", n.over), i(e.display.scroller, "dragleave", n.leave), i(e.display.scroller, "drop", n.drop);
        }
      }function Eo(e) {
        e.options.lineWrapping ? (a(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Cl(e.display.wrapper, "CodeMirror-wrap"), xe(e)), Cr(e), gn(e), ir(e), setTimeout(function () {
          return Zr(e);
        }, 100);
      }function Do(e, t) {
        var r = this;if (!(this instanceof Do)) return new Do(e, t);this.options = t = t ? u(t) : {}, u(Wa, t, !1), Wn(t);var n = t.value;"string" == typeof n && (n = new ba(n, t.mode, null, t.lineSeparator, t.direction)), this.doc = n;var i = new Do.inputStyles[t.inputStyle](this),
            o = this.display = new M(e, n, i);o.wrapper.CodeMirror = this, Dn(this), To(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), tn(this), this.state = { keyMaps: [], overlays: [], modeGen: 0, overwrite: !1, delayingBlurEvent: !1, focused: !1, suppressEdits: !1, pasteIncoming: !1, cutIncoming: !1, selectingText: !1, draggingText: !1, highlight: new Al(), keySeq: null, specialChars: null }, t.autofocus && !pl && o.input.focus(), nl && il < 11 && setTimeout(function () {
          return r.display.input.reset(!0);
        }, 20), Wo(this), Ji(), rn(this), this.curOp.forceUpdate = !0, Yn(this, n), t.autofocus && !pl || this.hasFocus() ? setTimeout(c(Dr, this), 20) : Wr(this);for (var l in Ia) {
          Ia.hasOwnProperty(l) && Ia[l](r, t[l], Da);
        }Fr(this), t.finishInit && t.finishInit(this);for (var a = 0; a < Ha.length; ++a) {
          Ha[a](r);
        }nn(this), ol && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto");
      }function Wo(e) {
        function t() {
          i.activeTouch && (o = setTimeout(function () {
            return i.activeTouch = null;
          }, 1e3), l = i.activeTouch, l.end = +new Date());
        }function r(e) {
          if (1 != e.touches.length) return !1;var t = e.touches[0];return t.radiusX <= 1 && t.radiusY <= 1;
        }function n(e, t) {
          if (null == t.left) return !0;var r = t.left - e.left,
              n = t.top - e.top;return r * r + n * n > 400;
        }var i = e.display;Bl(i.scroller, "mousedown", dn(e, xo)), nl && il < 11 ? Bl(i.scroller, "dblclick", dn(e, function (t) {
          if (!Ee(e, t)) {
            var r = kr(e, t);if (r && !So(e, t) && !Ft(e.display, t)) {
              He(t);var n = e.findWordAt(r);di(e.doc, n.anchor, n.head);
            }
          }
        })) : Bl(i.scroller, "dblclick", function (t) {
          return Ee(e, t) || He(t);
        }), wl || Bl(i.scroller, "contextmenu", function (t) {
          return Mo(e, t);
        });var o,
            l = { end: 0 };Bl(i.scroller, "touchstart", function (t) {
          if (!Ee(e, t) && !r(t)) {
            i.input.ensurePolled(), clearTimeout(o);var n = +new Date();i.activeTouch = { start: n, moved: !1, prev: n - l.end <= 300 ? l : null }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY);
          }
        }), Bl(i.scroller, "touchmove", function () {
          i.activeTouch && (i.activeTouch.moved = !0);
        }), Bl(i.scroller, "touchend", function (r) {
          var o = i.activeTouch;if (o && !Ft(i, r) && null != o.left && !o.moved && new Date() - o.start < 300) {
            var l,
                a = e.coordsChar(i.activeTouch, "page");l = !o.prev || n(o, o.prev) ? new fa(a, a) : !o.prev.prev || n(o, o.prev.prev) ? e.findWordAt(a) : new fa(H(a.line, 0), U(e.doc, H(a.line + 1, 0))), e.setSelection(l.anchor, l.head), e.focus(), He(r);
          }t();
        }), Bl(i.scroller, "touchcancel", t), Bl(i.scroller, "scroll", function () {
          i.scroller.clientHeight && (Yr(e, i.scroller.scrollTop), Jr(e, i.scroller.scrollLeft, !0), Oe(e, "scroll", e));
        }), Bl(i.scroller, "mousewheel", function (t) {
          return Rn(e, t);
        }), Bl(i.scroller, "DOMMouseScroll", function (t) {
          return Rn(e, t);
        }), Bl(i.wrapper, "scroll", function () {
          return i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
        }), i.dragFunctions = { enter: function enter(t) {
            Ee(e, t) || Fe(t);
          }, over: function over(t) {
            Ee(e, t) || (Xi(e, t), Fe(t));
          }, start: function start(t) {
            return Ki(e, t);
          }, drop: dn(e, Gi), leave: function leave(t) {
            Ee(e, t) || Yi(e);
          } };var a = i.input.getField();Bl(a, "keyup", function (t) {
          return yo.call(e, t);
        }), Bl(a, "keydown", dn(e, mo)), Bl(a, "keypress", dn(e, bo)), Bl(a, "focus", function (t) {
          return Dr(e, t);
        }), Bl(a, "blur", function (t) {
          return Wr(e, t);
        });
      }function Io(e, t, r, n) {
        var i,
            o = e.doc;null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = et(e, t) : r = "prev");var l = e.options.tabSize,
            a = L(o, t),
            s = f(a.text, null, l);a.stateAfter && (a.stateAfter = null);var c,
            u = a.text.match(/^\s*/)[0];if (n || /\S/.test(a.text)) {
          if ("smart" == r && ((c = o.mode.indent(i, a.text.slice(u.length), a.text)) == Tl || c > 150)) {
            if (!n) return;r = "prev";
          }
        } else c = 0, r = "not";"prev" == r ? c = t > o.first ? f(L(o, t - 1).text, null, l) : 0 : "add" == r ? c = s + e.options.indentUnit : "subtract" == r ? c = s - e.options.indentUnit : "number" == typeof r && (c = s + r), c = Math.max(0, c);var d = "",
            h = 0;if (e.options.indentWithTabs) for (var g = Math.floor(c / l); g; --g) {
          h += l, d += "\t";
        }if (h < c && (d += p(c - h)), d != u) return Ii(o, d, H(t, 0), H(t, u.length), "+input"), a.stateAfter = null, !0;for (var m = 0; m < o.sel.ranges.length; m++) {
          var v = o.sel.ranges[m];if (v.head.line == t && v.head.ch < u.length) {
            var y = H(t, u.length);pi(o, m, new fa(y, y));break;
          }
        }
      }function Ho(e) {
        Ra = e;
      }function Ro(e, t, r, n, i) {
        var o = e.doc;e.display.shift = !1, n || (n = o.sel);var l = e.state.pasteIncoming || "paste" == i,
            a = Ul(t),
            s = null;if (l && n.ranges.length > 1) if (Ra && Ra.text.join("\n") == t) {
          if (n.ranges.length % Ra.text.length == 0) {
            s = [];for (var c = 0; c < Ra.text.length; c++) {
              s.push(o.splitLines(Ra.text[c]));
            }
          }
        } else a.length == n.ranges.length && (s = m(a, function (e) {
          return [e];
        }));for (var u, f = n.ranges.length - 1; f >= 0; f--) {
          var d = n.ranges[f],
              h = d.from(),
              p = d.to();d.empty() && (r && r > 0 ? h = H(h.line, h.ch - r) : e.state.overwrite && !l ? p = H(p.line, Math.min(L(o, p.line).text.length, p.ch + g(a).length)) : Ra && Ra.lineWise && Ra.text.join("\n") == t && (h = p = H(h.line, 0))), u = e.curOp.updateInput;var v = { from: h, to: p, text: s ? s[f % s.length] : a, origin: i || (l ? "paste" : e.state.cutIncoming ? "cut" : "+input") };Ti(e.doc, v), kt(e, "inputRead", e, v);
        }t && !l && Fo(e, t), jr(e), e.curOp.updateInput = u, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1;
      }function zo(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");if (r) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || fn(t, function () {
          return Ro(t, r, 0, null, "paste");
        }), !0;
      }function Fo(e, t) {
        if (e.options.electricChars && e.options.smartIndent) for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
          var i = r.ranges[n];if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
            var o = e.getModeAt(i.head),
                l = !1;if (o.electricChars) {
              for (var a = 0; a < o.electricChars.length; a++) {
                if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                  l = Io(e, i.head.line, "smart");break;
                }
              }
            } else o.electricInput && o.electricInput.test(L(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = Io(e, i.head.line, "smart"));l && kt(e, "electricInput", e, i.head.line);
          }
        }
      }function Po(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
          var i = e.doc.sel.ranges[n].head.line,
              o = { anchor: H(i, 0), head: H(i + 1, 0) };r.push(o), t.push(e.getRange(o.anchor, o.head));
        }return { text: t, ranges: r };
      }function Bo(e, t) {
        e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", !!t);
      }function _o() {
        var e = n("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = n("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");return ol ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), dl && (e.style.border = "1px solid black"), Bo(e), t;
      }function Uo(e, t, r, n, i) {
        function o() {
          var n = t.line + r;return !(n < e.first || n >= e.first + e.size) && (t = new H(n, t.ch, t.sticky), c = L(e, n));
        }function l(n) {
          var l;if (null == (l = i ? Le(e.cm, c, t, r) : Se(c, t, r))) {
            if (n || !o()) return !1;t = Me(i, e.cm, c, t.line, r);
          } else t = l;return !0;
        }var a = t,
            s = r,
            c = L(e, t.line);if ("char" == n) l();else if ("column" == n) l(!0);else if ("word" == n || "group" == n) for (var u = null, f = "group" == n, d = e.cm && e.cm.getHelper(t, "wordChars"), h = !0; !(r < 0) || l(!h); h = !1) {
          var p = c.text.charAt(t.ch) || "\n",
              g = w(p, d) ? "w" : f && "\n" == p ? "n" : !f || /\s/.test(p) ? null : "p";if (!f || h || g || (g = "s"), u && u != g) {
            r < 0 && (r = 1, l(), t.sticky = "after");break;
          }if (g && (u = g), r > 0 && !l(!h)) break;
        }var m = Ai(e, t, a, s, !0);return z(a, m) && (m.hitSide = !0), m;
      }function $o(e, t, r, n) {
        var i,
            o = e.doc,
            l = t.left;if ("page" == n) {
          var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
              s = Math.max(a - .5 * vr(e.display), 3);i = (r > 0 ? t.bottom : t.top) + r * s;
        } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);for (var c; c = hr(e, l, i), c.outside;) {
          if (r < 0 ? i <= 0 : i >= o.height) {
            c.hitSide = !0;break;
          }i += 5 * r;
        }return c;
      }function jo(e, t) {
        var r = Yt(e, t.line);if (!r || r.hidden) return null;var n = L(e.doc, t.line),
            i = Gt(r, n, t.line),
            o = ke(n, e.doc.direction),
            l = "left";if (o) {
          l = Ce(o, t.ch) % 2 ? "right" : "left";
        }var a = qt(i.map, t.ch, l);return a.offset = "right" == a.collapse ? a.end : a.start, a;
      }function Vo(e) {
        for (var t = e; t; t = t.parentNode) {
          if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
        }return !1;
      }function Go(e, t) {
        return t && (e.bad = !0), e;
      }function Ko(e, t, r, n, i) {
        function o(e) {
          return function (t) {
            return t.id == e;
          };
        }function l() {
          u && (c += f, u = !1);
        }function a(e) {
          e && (l(), c += e);
        }function s(t) {
          if (1 == t.nodeType) {
            var r = t.getAttribute("cm-text");if (null != r) return void a(r || t.textContent.replace(/\u200b/g, ""));var c,
                d = t.getAttribute("cm-marker");if (d) {
              var h = e.findMarks(H(n, 0), H(i + 1, 0), o(+d));return void (h.length && (c = h[0].find()) && a(T(e.doc, c.from, c.to).join(f)));
            }if ("false" == t.getAttribute("contenteditable")) return;var p = /^(pre|div|p)$/i.test(t.nodeName);p && l();for (var g = 0; g < t.childNodes.length; g++) {
              s(t.childNodes[g]);
            }p && (u = !0);
          } else 3 == t.nodeType && a(t.nodeValue);
        }for (var c = "", u = !1, f = e.doc.lineSeparator(); s(t), t != r;) {
          t = t.nextSibling;
        }return c;
      }function Xo(e, t, r) {
        var n;if (t == e.display.lineDiv) {
          if (!(n = e.display.lineDiv.childNodes[r])) return Go(e.clipPos(H(e.display.viewTo - 1)), !0);t = null, r = 0;
        } else for (n = t;; n = n.parentNode) {
          if (!n || n == e.display.lineDiv) return null;if (n.parentNode && n.parentNode == e.display.lineDiv) break;
        }for (var i = 0; i < e.display.view.length; i++) {
          var o = e.display.view[i];if (o.node == n) return Yo(o, t, r);
        }
      }function Yo(e, t, r) {
        function n(t, r, n) {
          for (var i = -1; i < (f ? f.length : 0); i++) {
            for (var o = i < 0 ? u.map : f[i], l = 0; l < o.length; l += 3) {
              var a = o[l + 2];if (a == t || a == r) {
                var s = E(i < 0 ? e.line : e.rest[i]),
                    c = o[l] + n;return (n < 0 || a != t) && (c = o[l + (n ? 1 : 0)]), H(s, c);
              }
            }
          }
        }var i = e.text.firstChild,
            l = !1;if (!t || !o(i, t)) return Go(H(E(e.line), 0), !0);if (t == i && (l = !0, t = i.childNodes[r], r = 0, !t)) {
          var a = e.rest ? g(e.rest) : e.line;return Go(H(E(a), a.text.length), l);
        }var s = 3 == t.nodeType ? t : null,
            c = t;for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, r && (r = s.nodeValue.length)); c.parentNode != i;) {
          c = c.parentNode;
        }var u = e.measure,
            f = u.maps,
            d = n(s, c, r);if (d) return Go(d, l);for (var h = c.nextSibling, p = s ? s.nodeValue.length - r : 0; h; h = h.nextSibling) {
          if (d = n(h, h.firstChild, 0)) return Go(H(d.line, d.ch - p), l);p += h.textContent.length;
        }for (var m = c.previousSibling, v = r; m; m = m.previousSibling) {
          if (d = n(m, m.firstChild, -1)) return Go(H(d.line, d.ch + v), l);v += m.textContent.length;
        }
      }function Qo(e, t) {
        function r() {
          e.value = s.getValue();
        }if (t = t ? u(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
          var n = l();t.autofocus = n == e || null != e.getAttribute("autofocus") && n == document.body;
        }var i;if (e.form && (Bl(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
          var o = e.form;i = o.submit;try {
            var a = o.submit = function () {
              r(), o.submit = i, o.submit(), o.submit = a;
            };
          } catch (e) {}
        }t.finishInit = function (t) {
          t.save = r, t.getTextArea = function () {
            return e;
          }, t.toTextArea = function () {
            t.toTextArea = isNaN, r(), e.parentNode.removeChild(t.getWrapperElement()), e.style.display = "", e.form && (Ne(e.form, "submit", r), "function" == typeof e.form.submit && (e.form.submit = i));
          };
        }, e.style.display = "none";var s = Do(function (t) {
          return e.parentNode.insertBefore(t, e.nextSibling);
        }, t);return s;
      }var Jo = navigator.userAgent,
          qo = navigator.platform,
          Zo = /gecko\/\d/i.test(Jo),
          el = /MSIE \d/.test(Jo),
          tl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Jo),
          rl = /Edge\/(\d+)/.exec(Jo),
          nl = el || tl || rl,
          il = nl && (el ? document.documentMode || 6 : +(rl || tl)[1]),
          ol = !rl && /WebKit\//.test(Jo),
          ll = ol && /Qt\/\d+\.\d+/.test(Jo),
          al = !rl && /Chrome\//.test(Jo),
          sl = /Opera\//.test(Jo),
          cl = /Apple Computer/.test(navigator.vendor),
          ul = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(Jo),
          fl = /PhantomJS/.test(Jo),
          dl = !rl && /AppleWebKit/.test(Jo) && /Mobile\/\w+/.test(Jo),
          hl = /Android/.test(Jo),
          pl = dl || hl || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(Jo),
          gl = dl || /Mac/.test(qo),
          ml = /\bCrOS\b/.test(Jo),
          vl = /win/i.test(qo),
          yl = sl && Jo.match(/Version\/(\d*\.\d*)/);yl && (yl = Number(yl[1])), yl && yl >= 15 && (sl = !1, ol = !0);var bl,
          xl = gl && (ll || sl && (null == yl || yl < 12.11)),
          wl = Zo || nl && il >= 9,
          Cl = function Cl(t, r) {
        var n = t.className,
            i = e(r).exec(n);if (i) {
          var o = n.slice(i.index + i[0].length);t.className = n.slice(0, i.index) + (o ? i[1] + o : "");
        }
      };bl = document.createRange ? function (e, t, r, n) {
        var i = document.createRange();return i.setEnd(n || e, r), i.setStart(e, t), i;
      } : function (e, t, r) {
        var n = document.body.createTextRange();try {
          n.moveToElementText(e.parentNode);
        } catch (e) {
          return n;
        }return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n;
      };var kl = function kl(e) {
        e.select();
      };dl ? kl = function kl(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : nl && (kl = function kl(e) {
        try {
          e.select();
        } catch (e) {}
      });var Al = function Al() {
        this.id = null;
      };Al.prototype.set = function (e, t) {
        clearTimeout(this.id), this.id = setTimeout(t, e);
      };var Sl,
          Ml,
          Ll = 30,
          Tl = { toString: function toString() {
          return "CodeMirror.Pass";
        } },
          Nl = { scroll: !1 },
          Ol = { origin: "*mouse" },
          El = { origin: "+move" },
          Dl = [""],
          Wl = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
          Il = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
          Hl = !1,
          Rl = !1,
          zl = null,
          Fl = function () {
        function e(e) {
          return e <= 247 ? r.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1785 ? n.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L";
        }function t(e, t, r) {
          this.level = e, this.from = t, this.to = r;
        }var r = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            n = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",
            i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            o = /[stwN]/,
            l = /[LRr]/,
            a = /[Lb1n]/,
            s = /[1n]/;return function (r, n) {
          var c = "ltr" == n ? "L" : "R";if (0 == r.length || "ltr" == n && !i.test(r)) return !1;for (var u = r.length, f = [], d = 0; d < u; ++d) {
            f.push(e(r.charCodeAt(d)));
          }for (var h = 0, p = c; h < u; ++h) {
            var m = f[h];"m" == m ? f[h] = p : p = m;
          }for (var v = 0, y = c; v < u; ++v) {
            var b = f[v];"1" == b && "r" == y ? f[v] = "n" : l.test(b) && (y = b, "r" == b && (f[v] = "R"));
          }for (var x = 1, w = f[0]; x < u - 1; ++x) {
            var C = f[x];"+" == C && "1" == w && "1" == f[x + 1] ? f[x] = "1" : "," != C || w != f[x + 1] || "1" != w && "n" != w || (f[x] = w), w = C;
          }for (var k = 0; k < u; ++k) {
            var A = f[k];if ("," == A) f[k] = "N";else if ("%" == A) {
              var S = void 0;for (S = k + 1; S < u && "%" == f[S]; ++S) {}for (var M = k && "!" == f[k - 1] || S < u && "1" == f[S] ? "1" : "N", L = k; L < S; ++L) {
                f[L] = M;
              }k = S - 1;
            }
          }for (var T = 0, N = c; T < u; ++T) {
            var O = f[T];"L" == N && "1" == O ? f[T] = "L" : l.test(O) && (N = O);
          }for (var E = 0; E < u; ++E) {
            if (o.test(f[E])) {
              var D = void 0;for (D = E + 1; D < u && o.test(f[D]); ++D) {}for (var W = "L" == (E ? f[E - 1] : c), I = "L" == (D < u ? f[D] : c), H = W == I ? W ? "L" : "R" : c, R = E; R < D; ++R) {
                f[R] = H;
              }E = D - 1;
            }
          }for (var z, F = [], P = 0; P < u;) {
            if (a.test(f[P])) {
              var B = P;for (++P; P < u && a.test(f[P]); ++P) {}F.push(new t(0, B, P));
            } else {
              var _ = P,
                  U = F.length;for (++P; P < u && "L" != f[P]; ++P) {}for (var $ = _; $ < P;) {
                if (s.test(f[$])) {
                  _ < $ && F.splice(U, 0, new t(1, _, $));var j = $;for (++$; $ < P && s.test(f[$]); ++$) {}F.splice(U, 0, new t(2, j, $)), _ = $;
                } else ++$;
              }_ < P && F.splice(U, 0, new t(1, _, P));
            }
          }return 1 == F[0].level && (z = r.match(/^\s+/)) && (F[0].from = z[0].length, F.unshift(new t(0, 0, z[0].length))), 1 == g(F).level && (z = r.match(/\s+$/)) && (g(F).to -= z[0].length, F.push(new t(0, u - z[0].length, u))), "rtl" == n ? F.reverse() : F;
        };
      }(),
          Pl = [],
          Bl = function Bl(e, t, r) {
        if (e.addEventListener) e.addEventListener(t, r, !1);else if (e.attachEvent) e.attachEvent("on" + t, r);else {
          var n = e._handlers || (e._handlers = {});n[t] = (n[t] || Pl).concat(r);
        }
      },
          _l = function () {
        if (nl && il < 9) return !1;var e = n("div");return "draggable" in e || "dragDrop" in e;
      }(),
          Ul = 3 != "\n\nb".split(/\n/).length ? function (e) {
        for (var t = 0, r = [], n = e.length; t <= n;) {
          var i = e.indexOf("\n", t);-1 == i && (i = e.length);var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
              l = o.indexOf("\r");-1 != l ? (r.push(o.slice(0, l)), t += l + 1) : (r.push(o), t = i + 1);
        }return r;
      } : function (e) {
        return e.split(/\r\n?|\n/);
      },
          $l = window.getSelection ? function (e) {
        try {
          return e.selectionStart != e.selectionEnd;
        } catch (e) {
          return !1;
        }
      } : function (e) {
        var t;try {
          t = e.ownerDocument.selection.createRange();
        } catch (e) {}return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t);
      },
          jl = function () {
        var e = n("div");return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
      }(),
          Vl = null,
          Gl = {},
          Kl = {},
          Xl = {},
          Yl = function Yl(e, t) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0;
      };Yl.prototype.eol = function () {
        return this.pos >= this.string.length;
      }, Yl.prototype.sol = function () {
        return this.pos == this.lineStart;
      }, Yl.prototype.peek = function () {
        return this.string.charAt(this.pos) || void 0;
      }, Yl.prototype.next = function () {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++);
      }, Yl.prototype.eat = function (e) {
        var t = this.string.charAt(this.pos);if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t;
      }, Yl.prototype.eatWhile = function (e) {
        for (var t = this.pos; this.eat(e);) {}return this.pos > t;
      }, Yl.prototype.eatSpace = function () {
        for (var e = this, t = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));) {
          ++e.pos;
        }return this.pos > t;
      }, Yl.prototype.skipToEnd = function () {
        this.pos = this.string.length;
      }, Yl.prototype.skipTo = function (e) {
        var t = this.string.indexOf(e, this.pos);if (t > -1) return this.pos = t, !0;
      }, Yl.prototype.backUp = function (e) {
        this.pos -= e;
      }, Yl.prototype.column = function () {
        return this.lastColumnPos < this.start && (this.lastColumnValue = f(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? f(this.string, this.lineStart, this.tabSize) : 0);
      }, Yl.prototype.indentation = function () {
        return f(this.string, null, this.tabSize) - (this.lineStart ? f(this.string, this.lineStart, this.tabSize) : 0);
      }, Yl.prototype.match = function (e, t, r) {
        if ("string" != typeof e) {
          var n = this.string.slice(this.pos).match(e);return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n);
        }var i = function i(e) {
          return r ? e.toLowerCase() : e;
        };if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0;
      }, Yl.prototype.current = function () {
        return this.string.slice(this.start, this.pos);
      }, Yl.prototype.hideFirstChars = function (e, t) {
        this.lineStart += e;try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      };var Ql = function Ql(e, t, r) {
        this.text = e, ne(this, t), this.height = r ? r(this) : 1;
      };Ql.prototype.lineNo = function () {
        return E(this);
      }, Ie(Ql);var Jl,
          ql = {},
          Zl = {},
          ea = null,
          ta = null,
          ra = { left: 0, right: 0, top: 0, bottom: 0 },
          na = function na(e, t, r) {
        this.cm = r;var i = this.vert = n("div", [n("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
            o = this.horiz = n("div", [n("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");e(i), e(o), Bl(i, "scroll", function () {
          i.clientHeight && t(i.scrollTop, "vertical");
        }), Bl(o, "scroll", function () {
          o.clientWidth && t(o.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, nl && il < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };na.prototype.update = function (e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;if (r) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";var i = e.viewHeight - (t ? n : 0);this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";var o = e.viewWidth - e.barLeft - (r ? n : 0);this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: r ? n : 0, bottom: t ? n : 0 };
      }, na.prototype.setScrollLeft = function (e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, na.prototype.setScrollTop = function (e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, na.prototype.zeroWidthHack = function () {
        var e = gl && !ul ? "12px" : "18px";this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new Al(), this.disableVert = new Al();
      }, na.prototype.enableZeroWidthBar = function (e, t, r) {
        function n() {
          var i = e.getBoundingClientRect();("vert" == r ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, n);
        }e.style.pointerEvents = "auto", t.set(1e3, n);
      }, na.prototype.clear = function () {
        var e = this.horiz.parentNode;e.removeChild(this.horiz), e.removeChild(this.vert);
      };var ia = function ia() {};ia.prototype.update = function () {
        return { bottom: 0, right: 0 };
      }, ia.prototype.setScrollLeft = function () {}, ia.prototype.setScrollTop = function () {}, ia.prototype.clear = function () {};var oa = { native: na, null: ia },
          la = 0,
          aa = function aa(e, t, r) {
        var n = e.display;this.viewport = t, this.visible = Rr(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = $t(e), this.force = r, this.dims = br(e), this.events = [];
      };aa.prototype.signal = function (e, t) {
        We(e, t) && this.events.push(arguments);
      }, aa.prototype.finish = function () {
        for (var e = this, t = 0; t < this.events.length; t++) {
          Oe.apply(null, e.events[t]);
        }
      };var sa = 0,
          ca = null;nl ? ca = -.53 : Zo ? ca = 15 : al ? ca = -.7 : cl && (ca = -1 / 3);var ua = function ua(e, t) {
        this.ranges = e, this.primIndex = t;
      };ua.prototype.primary = function () {
        return this.ranges[this.primIndex];
      }, ua.prototype.equals = function (e) {
        var t = this;if (e == this) return !0;if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;for (var r = 0; r < this.ranges.length; r++) {
          var n = t.ranges[r],
              i = e.ranges[r];if (!z(n.anchor, i.anchor) || !z(n.head, i.head)) return !1;
        }return !0;
      }, ua.prototype.deepCopy = function () {
        for (var e = this, t = [], r = 0; r < this.ranges.length; r++) {
          t[r] = new fa(F(e.ranges[r].anchor), F(e.ranges[r].head));
        }return new ua(t, this.primIndex);
      }, ua.prototype.somethingSelected = function () {
        for (var e = this, t = 0; t < this.ranges.length; t++) {
          if (!e.ranges[t].empty()) return !0;
        }return !1;
      }, ua.prototype.contains = function (e, t) {
        var r = this;t || (t = e);for (var n = 0; n < this.ranges.length; n++) {
          var i = r.ranges[n];if (R(t, i.from()) >= 0 && R(e, i.to()) <= 0) return n;
        }return -1;
      };var fa = function fa(e, t) {
        this.anchor = e, this.head = t;
      };fa.prototype.from = function () {
        return B(this.anchor, this.head);
      }, fa.prototype.to = function () {
        return P(this.anchor, this.head);
      }, fa.prototype.empty = function () {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };var da = function da(e) {
        var t = this;this.lines = e, this.parent = null;for (var r = 0, n = 0; n < e.length; ++n) {
          e[n].parent = t, r += e[n].height;
        }this.height = r;
      };da.prototype.chunkSize = function () {
        return this.lines.length;
      }, da.prototype.removeInner = function (e, t) {
        for (var r = this, n = e, i = e + t; n < i; ++n) {
          var o = r.lines[n];r.height -= o.height, ct(o), kt(o, "delete");
        }this.lines.splice(e, t);
      }, da.prototype.collapse = function (e) {
        e.push.apply(e, this.lines);
      }, da.prototype.insertInner = function (e, t, r) {
        var n = this;this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));for (var i = 0; i < t.length; ++i) {
          t[i].parent = n;
        }
      }, da.prototype.iterN = function (e, t, r) {
        for (var n = this, i = e + t; e < i; ++e) {
          if (r(n.lines[e])) return !0;
        }
      };var ha = function ha(e) {
        var t = this;this.children = e;for (var r = 0, n = 0, i = 0; i < e.length; ++i) {
          var o = e[i];r += o.chunkSize(), n += o.height, o.parent = t;
        }this.size = r, this.height = n, this.parent = null;
      };ha.prototype.chunkSize = function () {
        return this.size;
      }, ha.prototype.removeInner = function (e, t) {
        var r = this;this.size -= t;for (var n = 0; n < this.children.length; ++n) {
          var i = r.children[n],
              o = i.chunkSize();if (e < o) {
            var l = Math.min(t, o - e),
                a = i.height;if (i.removeInner(e, l), r.height -= a - i.height, o == l && (r.children.splice(n--, 1), i.parent = null), 0 == (t -= l)) break;e = 0;
          } else e -= o;
        }if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof da))) {
          var s = [];this.collapse(s), this.children = [new da(s)], this.children[0].parent = this;
        }
      }, ha.prototype.collapse = function (e) {
        for (var t = this, r = 0; r < this.children.length; ++r) {
          t.children[r].collapse(e);
        }
      }, ha.prototype.insertInner = function (e, t, r) {
        var n = this;this.size += t.length, this.height += r;for (var i = 0; i < this.children.length; ++i) {
          var o = n.children[i],
              l = o.chunkSize();if (e <= l) {
            if (o.insertInner(e, t, r), o.lines && o.lines.length > 50) {
              for (var a = o.lines.length % 25 + 25, s = a; s < o.lines.length;) {
                var c = new da(o.lines.slice(s, s += 25));o.height -= c.height, n.children.splice(++i, 0, c), c.parent = n;
              }o.lines = o.lines.slice(0, a), n.maybeSpill();
            }break;
          }e -= l;
        }
      }, ha.prototype.maybeSpill = function () {
        if (!(this.children.length <= 10)) {
          var e = this;do {
            var t = e.children.splice(e.children.length - 5, 5),
                r = new ha(t);if (e.parent) {
              e.size -= r.size, e.height -= r.height;var n = d(e.parent.children, e);e.parent.children.splice(n + 1, 0, r);
            } else {
              var i = new ha(e.children);i.parent = e, e.children = [i, r], e = i;
            }r.parent = e.parent;
          } while (e.children.length > 10);e.parent.maybeSpill();
        }
      }, ha.prototype.iterN = function (e, t, r) {
        for (var n = this, i = 0; i < this.children.length; ++i) {
          var o = n.children[i],
              l = o.chunkSize();if (e < l) {
            var a = Math.min(t, l - e);if (o.iterN(e, a, r)) return !0;if (0 == (t -= a)) break;e = 0;
          } else e -= l;
        }
      };var pa = function pa(e, t, r) {
        var n = this;if (r) for (var i in r) {
          r.hasOwnProperty(i) && (n[i] = r[i]);
        }this.doc = e, this.node = t;
      };pa.prototype.clear = function () {
        var e = this,
            t = this.doc.cm,
            r = this.line.widgets,
            n = this.line,
            i = E(n);if (null != i && r) {
          for (var o = 0; o < r.length; ++o) {
            r[o] == e && r.splice(o--, 1);
          }r.length || (n.widgets = null);var l = zt(this);O(n, Math.max(0, n.height - l)), t && (fn(t, function () {
            Pi(t, n, -l), mn(t, i, "widget");
          }), kt(t, "lineWidgetCleared", t, this, i));
        }
      }, pa.prototype.changed = function () {
        var e = this,
            t = this.height,
            r = this.doc.cm,
            n = this.line;this.height = null;var i = zt(this) - t;i && (O(n, n.height + i), r && fn(r, function () {
          r.curOp.forceUpdate = !0, Pi(r, n, i), kt(r, "lineWidgetChanged", r, e, E(n));
        }));
      }, Ie(pa);var ga = 0,
          ma = function ma(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++ga;
      };ma.prototype.clear = function () {
        var e = this;if (!this.explicitlyCleared) {
          var t = this.doc.cm,
              r = t && !t.curOp;if (r && rn(t), We(this, "clear")) {
            var n = this.find();n && kt(this, "clear", n.from, n.to);
          }for (var i = null, o = null, l = 0; l < this.lines.length; ++l) {
            var a = e.lines[l],
                s = X(a.markedSpans, e);t && !e.collapsed ? mn(t, E(a), "text") : t && (null != s.to && (o = E(a)), null != s.from && (i = E(a))), a.markedSpans = Y(a.markedSpans, s), null == s.from && e.collapsed && !me(e.doc, a) && t && O(a, vr(t.display));
          }if (t && this.collapsed && !t.options.lineWrapping) for (var c = 0; c < this.lines.length; ++c) {
            var u = fe(e.lines[c]),
                f = be(u);f > t.display.maxLineLength && (t.display.maxLine = u, t.display.maxLineLength = f, t.display.maxLineChanged = !0);
          }null != i && t && this.collapsed && gn(t, i, o + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && wi(t.doc)), t && kt(t, "markerCleared", t, this, i, o), r && nn(t), this.parent && this.parent.clear();
        }
      }, ma.prototype.find = function (e, t) {
        var r = this;null == e && "bookmark" == this.type && (e = 1);for (var n, i, o = 0; o < this.lines.length; ++o) {
          var l = r.lines[o],
              a = X(l.markedSpans, r);if (null != a.from && (n = H(t ? l : E(l), a.from), -1 == e)) return n;if (null != a.to && (i = H(t ? l : E(l), a.to), 1 == e)) return i;
        }return n && { from: n, to: i };
      }, ma.prototype.changed = function () {
        var e = this,
            t = this.find(-1, !0),
            r = this,
            n = this.doc.cm;t && n && fn(n, function () {
          var i = t.line,
              o = E(t.line),
              l = Yt(n, o);if (l && (rr(l), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !me(r.doc, i) && null != r.height) {
            var a = r.height;r.height = null;var s = zt(r) - a;s && O(i, i.height + s);
          }kt(n, "markerChanged", n, e);
        });
      }, ma.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;t.maybeHiddenMarkers && -1 != d(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }this.lines.push(e);
      }, ma.prototype.detachLine = function (e) {
        if (this.lines.splice(d(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;(t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, Ie(ma);var va = function va(e, t) {
        var r = this;this.markers = e, this.primary = t;for (var n = 0; n < e.length; ++n) {
          e[n].parent = r;
        }
      };va.prototype.clear = function () {
        var e = this;if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;for (var t = 0; t < this.markers.length; ++t) {
            e.markers[t].clear();
          }kt(this, "clear");
        }
      }, va.prototype.find = function (e, t) {
        return this.primary.find(e, t);
      }, Ie(va);var ya = 0,
          ba = function ba(e, t, r, n, i) {
        if (!(this instanceof ba)) return new ba(e, t, r, n, i);null == r && (r = 0), ha.call(this, [new da([new Ql("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = r;var o = H(r, 0);this.sel = Fn(o), this.history = new qn(null), this.id = ++ya, this.modeOption = t, this.lineSep = n, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Kn(this, { from: o, to: o, text: e }), yi(this, Fn(o), Nl);
      };ba.prototype = b(ha.prototype, { constructor: ba, iter: function iter(e, t, r) {
          r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e);
        }, insert: function insert(e, t) {
          for (var r = 0, n = 0; n < t.length; ++n) {
            r += t[n].height;
          }this.insertInner(e - this.first, t, r);
        }, remove: function remove(e, t) {
          this.removeInner(e - this.first, t);
        }, getValue: function getValue(e) {
          var t = N(this, this.first, this.first + this.size);return !1 === e ? t : t.join(e || this.lineSeparator());
        }, setValue: pn(function (e) {
          var t = H(this.first, 0),
              r = this.first + this.size - 1;Ti(this, { from: t, to: H(r, L(this, r).text.length), text: this.splitLines(e), origin: "setValue", full: !0 }, !0), this.cm && Vr(this.cm, 0, 0), yi(this, Fn(t), Nl);
        }), replaceRange: function replaceRange(e, t, r, n) {
          t = U(this, t), r = r ? U(this, r) : t, Ii(this, e, t, r, n);
        }, getRange: function getRange(e, t, r) {
          var n = T(this, U(this, e), U(this, t));return !1 === r ? n : n.join(r || this.lineSeparator());
        }, getLine: function getLine(e) {
          var t = this.getLineHandle(e);return t && t.text;
        }, getLineHandle: function getLineHandle(e) {
          if (W(this, e)) return L(this, e);
        }, getLineNumber: function getLineNumber(e) {
          return E(e);
        }, getLineHandleVisualStart: function getLineHandleVisualStart(e) {
          return "number" == typeof e && (e = L(this, e)), fe(e);
        }, lineCount: function lineCount() {
          return this.size;
        }, firstLine: function firstLine() {
          return this.first;
        }, lastLine: function lastLine() {
          return this.first + this.size - 1;
        }, clipPos: function clipPos(e) {
          return U(this, e);
        }, getCursor: function getCursor(e) {
          var t = this.sel.primary();return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from();
        }, listSelections: function listSelections() {
          return this.sel.ranges;
        }, somethingSelected: function somethingSelected() {
          return this.sel.somethingSelected();
        }, setCursor: pn(function (e, t, r) {
          gi(this, U(this, "number" == typeof e ? H(e, t || 0) : e), null, r);
        }), setSelection: pn(function (e, t, r) {
          gi(this, U(this, e), U(this, t || e), r);
        }), extendSelection: pn(function (e, t, r) {
          di(this, U(this, e), t && U(this, t), r);
        }), extendSelections: pn(function (e, t) {
          hi(this, j(this, e), t);
        }), extendSelectionsBy: pn(function (e, t) {
          hi(this, j(this, m(this.sel.ranges, e)), t);
        }), setSelections: pn(function (e, t, r) {
          var n = this;if (e.length) {
            for (var i = [], o = 0; o < e.length; o++) {
              i[o] = new fa(U(n, e[o].anchor), U(n, e[o].head));
            }null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), yi(this, zn(i, t), r);
          }
        }), addSelection: pn(function (e, t, r) {
          var n = this.sel.ranges.slice(0);n.push(new fa(U(this, e), U(this, t || e))), yi(this, zn(n, n.length - 1), r);
        }), getSelection: function getSelection(e) {
          for (var t, r = this, n = this.sel.ranges, i = 0; i < n.length; i++) {
            var o = T(r, n[i].from(), n[i].to());t = t ? t.concat(o) : o;
          }return !1 === e ? t : t.join(e || this.lineSeparator());
        }, getSelections: function getSelections(e) {
          for (var t = this, r = [], n = this.sel.ranges, i = 0; i < n.length; i++) {
            var o = T(t, n[i].from(), n[i].to());!1 !== e && (o = o.join(e || t.lineSeparator())), r[i] = o;
          }return r;
        }, replaceSelection: function replaceSelection(e, t, r) {
          for (var n = [], i = 0; i < this.sel.ranges.length; i++) {
            n[i] = e;
          }this.replaceSelections(n, t, r || "+input");
        }, replaceSelections: pn(function (e, t, r) {
          for (var n = this, i = [], o = this.sel, l = 0; l < o.ranges.length; l++) {
            var a = o.ranges[l];i[l] = { from: a.from(), to: a.to(), text: n.splitLines(e[l]), origin: r };
          }for (var s = t && "end" != t && $n(this, i, t), c = i.length - 1; c >= 0; c--) {
            Ti(n, i[c]);
          }s ? vi(this, s) : this.cm && jr(this.cm);
        }), undo: pn(function () {
          Oi(this, "undo");
        }), redo: pn(function () {
          Oi(this, "redo");
        }), undoSelection: pn(function () {
          Oi(this, "undo", !0);
        }), redoSelection: pn(function () {
          Oi(this, "redo", !0);
        }), setExtending: function setExtending(e) {
          this.extend = e;
        }, getExtending: function getExtending() {
          return this.extend;
        }, historySize: function historySize() {
          for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++) {
            e.done[n].ranges || ++t;
          }for (var i = 0; i < e.undone.length; i++) {
            e.undone[i].ranges || ++r;
          }return { undo: t, redo: r };
        }, clearHistory: function clearHistory() {
          this.history = new qn(this.history.maxGeneration);
        }, markClean: function markClean() {
          this.cleanGeneration = this.changeGeneration(!0);
        }, changeGeneration: function changeGeneration(e) {
          return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
        }, isClean: function isClean(e) {
          return this.history.generation == (e || this.cleanGeneration);
        }, getHistory: function getHistory() {
          return { done: ui(this.history.done), undone: ui(this.history.undone) };
        }, setHistory: function setHistory(e) {
          var t = this.history = new qn(this.history.maxGeneration);t.done = ui(e.done.slice(0), null, !0), t.undone = ui(e.undone.slice(0), null, !0);
        }, setGutterMarker: pn(function (e, t, r) {
          return Fi(this, e, "gutter", function (e) {
            var n = e.gutterMarkers || (e.gutterMarkers = {});return n[t] = r, !r && C(n) && (e.gutterMarkers = null), !0;
          });
        }), clearGutter: pn(function (e) {
          var t = this;this.iter(function (r) {
            r.gutterMarkers && r.gutterMarkers[e] && Fi(t, r, "gutter", function () {
              return r.gutterMarkers[e] = null, C(r.gutterMarkers) && (r.gutterMarkers = null), !0;
            });
          });
        }), lineInfo: function lineInfo(e) {
          var t;if ("number" == typeof e) {
            if (!W(this, e)) return null;if (t = e, !(e = L(this, e))) return null;
          } else if (null == (t = E(e))) return null;return { line: t, handle: e, text: e.text, gutterMarkers: e.gutterMarkers, textClass: e.textClass, bgClass: e.bgClass, wrapClass: e.wrapClass, widgets: e.widgets };
        }, addLineClass: pn(function (t, r, n) {
          return Fi(this, t, "gutter" == r ? "gutter" : "class", function (t) {
            var i = "text" == r ? "textClass" : "background" == r ? "bgClass" : "gutter" == r ? "gutterClass" : "wrapClass";if (t[i]) {
              if (e(n).test(t[i])) return !1;t[i] += " " + n;
            } else t[i] = n;return !0;
          });
        }), removeLineClass: pn(function (t, r, n) {
          return Fi(this, t, "gutter" == r ? "gutter" : "class", function (t) {
            var i = "text" == r ? "textClass" : "background" == r ? "bgClass" : "gutter" == r ? "gutterClass" : "wrapClass",
                o = t[i];if (!o) return !1;if (null == n) t[i] = null;else {
              var l = o.match(e(n));if (!l) return !1;var a = l.index + l[0].length;t[i] = o.slice(0, l.index) + (l.index && a != o.length ? " " : "") + o.slice(a) || null;
            }return !0;
          });
        }), addLineWidget: pn(function (e, t, r) {
          return Bi(this, e, t, r);
        }), removeLineWidget: function removeLineWidget(e) {
          e.clear();
        }, markText: function markText(e, t, r) {
          return _i(this, U(this, e), U(this, t), r, r && r.type || "range");
        }, setBookmark: function setBookmark(e, t) {
          var r = { replacedWith: t && (null == t.nodeType ? t.widget : t), insertLeft: t && t.insertLeft, clearWhenEmpty: !1, shared: t && t.shared, handleMouseEvents: t && t.handleMouseEvents };return e = U(this, e), _i(this, e, e, r, "bookmark");
        }, findMarksAt: function findMarksAt(e) {
          e = U(this, e);var t = [],
              r = L(this, e.line).markedSpans;if (r) for (var n = 0; n < r.length; ++n) {
            var i = r[n];(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
          }return t;
        }, findMarks: function findMarks(e, t, r) {
          e = U(this, e), t = U(this, t);var n = [],
              i = e.line;return this.iter(e.line, t.line + 1, function (o) {
            var l = o.markedSpans;if (l) for (var a = 0; a < l.length; a++) {
              var s = l[a];null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || r && !r(s.marker) || n.push(s.marker.parent || s.marker);
            }++i;
          }), n;
        }, getAllMarks: function getAllMarks() {
          var e = [];return this.iter(function (t) {
            var r = t.markedSpans;if (r) for (var n = 0; n < r.length; ++n) {
              null != r[n].from && e.push(r[n].marker);
            }
          }), e;
        }, posFromIndex: function posFromIndex(e) {
          var t,
              r = this.first,
              n = this.lineSeparator().length;return this.iter(function (i) {
            var o = i.text.length + n;if (o > e) return t = e, !0;e -= o, ++r;
          }), U(this, H(r, t));
        }, indexFromPos: function indexFromPos(e) {
          e = U(this, e);var t = e.ch;if (e.line < this.first || e.ch < 0) return 0;var r = this.lineSeparator().length;return this.iter(this.first, e.line, function (e) {
            t += e.text.length + r;
          }), t;
        }, copy: function copy(e) {
          var t = new ba(N(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
        }, linkedDoc: function linkedDoc(e) {
          e || (e = {});var t = this.first,
              r = this.first + this.size;null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);var n = new ba(N(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({ doc: n, sharedHist: e.sharedHist }), n.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], ji(n, $i(this)), n;
        }, unlinkDoc: function unlinkDoc(e) {
          var t = this;if (e instanceof Do && (e = e.doc), this.linked) for (var r = 0; r < this.linked.length; ++r) {
            var n = t.linked[r];if (n.doc == e) {
              t.linked.splice(r, 1), e.unlinkDoc(t), Vi($i(t));break;
            }
          }if (e.history == this.history) {
            var i = [e.id];Xn(e, function (e) {
              return i.push(e.id);
            }, !0), e.history = new qn(null), e.history.done = ui(this.history.done, i), e.history.undone = ui(this.history.undone, i);
          }
        }, iterLinkedDocs: function iterLinkedDocs(e) {
          Xn(this, e);
        }, getMode: function getMode() {
          return this.mode;
        }, getEditor: function getEditor() {
          return this.cm;
        }, splitLines: function splitLines(e) {
          return this.lineSep ? e.split(this.lineSep) : Ul(e);
        }, lineSeparator: function lineSeparator() {
          return this.lineSep || "\n";
        }, setDirection: pn(function (e) {
          "rtl" != e && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function (e) {
            return e.order = null;
          }), this.cm && Jn(this.cm));
        }) }), ba.prototype.eachLine = ba.prototype.iter;for (var xa = 0, wa = !1, Ca = { 3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert", 46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete", 63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert" }, ka = 0; ka < 10; ka++) {
        Ca[ka + 48] = Ca[ka + 96] = String(ka);
      }for (var Aa = 65; Aa <= 90; Aa++) {
        Ca[Aa] = String.fromCharCode(Aa);
      }for (var Sa = 1; Sa <= 12; Sa++) {
        Ca[Sa + 111] = Ca[Sa + 63235] = "F" + Sa;
      }var Ma = {};Ma.basic = { Left: "goCharLeft", Right: "goCharRight", Up: "goLineUp", Down: "goLineDown", End: "goLineEnd", Home: "goLineStartSmart", PageUp: "goPageUp", PageDown: "goPageDown", Delete: "delCharAfter", Backspace: "delCharBefore", "Shift-Backspace": "delCharBefore", Tab: "defaultTab", "Shift-Tab": "indentAuto", Enter: "newlineAndIndent", Insert: "toggleOverwrite", Esc: "singleSelection" }, Ma.pcDefault = { "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo", "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown", "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd", "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find", "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll", "Ctrl-[": "indentLess", "Ctrl-]": "indentMore", "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection", fallthrough: "basic" }, Ma.emacsy = { "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown", "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd", "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore", "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars", "Ctrl-O": "openLine" }, Ma.macDefault = { "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo", "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft", "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore", "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find", "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll", "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight", "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd", fallthrough: ["basic", "emacsy"] }, Ma.default = gl ? Ma.macDefault : Ma.pcDefault;var La,
          Ta,
          Na = { selectAll: Mi, singleSelection: function singleSelection(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Nl);
        }, killLine: function killLine(e) {
          return lo(e, function (t) {
            if (t.empty()) {
              var r = L(e.doc, t.head.line).text.length;return t.head.ch == r && t.head.line < e.lastLine() ? { from: t.head, to: H(t.head.line + 1, 0) } : { from: t.head, to: H(t.head.line, r) };
            }return { from: t.from(), to: t.to() };
          });
        }, deleteLine: function deleteLine(e) {
          return lo(e, function (t) {
            return { from: H(t.from().line, 0), to: U(e.doc, H(t.to().line + 1, 0)) };
          });
        }, delLineLeft: function delLineLeft(e) {
          return lo(e, function (e) {
            return { from: H(e.from().line, 0), to: e.from() };
          });
        }, delWrappedLineLeft: function delWrappedLineLeft(e) {
          return lo(e, function (t) {
            var r = e.charCoords(t.head, "div").top + 5;return { from: e.coordsChar({ left: 0, top: r }, "div"), to: t.from() };
          });
        }, delWrappedLineRight: function delWrappedLineRight(e) {
          return lo(e, function (t) {
            var r = e.charCoords(t.head, "div").top + 5,
                n = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: r }, "div");return { from: t.from(), to: n };
          });
        }, undo: function undo(e) {
          return e.undo();
        }, redo: function redo(e) {
          return e.redo();
        }, undoSelection: function undoSelection(e) {
          return e.undoSelection();
        }, redoSelection: function redoSelection(e) {
          return e.redoSelection();
        }, goDocStart: function goDocStart(e) {
          return e.extendSelection(H(e.firstLine(), 0));
        }, goDocEnd: function goDocEnd(e) {
          return e.extendSelection(H(e.lastLine()));
        }, goLineStart: function goLineStart(e) {
          return e.extendSelectionsBy(function (t) {
            return ao(e, t.head.line);
          }, { origin: "+move", bias: 1 });
        }, goLineStartSmart: function goLineStartSmart(e) {
          return e.extendSelectionsBy(function (t) {
            return co(e, t.head);
          }, { origin: "+move", bias: 1 });
        }, goLineEnd: function goLineEnd(e) {
          return e.extendSelectionsBy(function (t) {
            return so(e, t.head.line);
          }, { origin: "+move", bias: -1 });
        }, goLineRight: function goLineRight(e) {
          return e.extendSelectionsBy(function (t) {
            var r = e.charCoords(t.head, "div").top + 5;return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: r }, "div");
          }, El);
        }, goLineLeft: function goLineLeft(e) {
          return e.extendSelectionsBy(function (t) {
            var r = e.charCoords(t.head, "div").top + 5;return e.coordsChar({ left: 0, top: r }, "div");
          }, El);
        }, goLineLeftSmart: function goLineLeftSmart(e) {
          return e.extendSelectionsBy(function (t) {
            var r = e.charCoords(t.head, "div").top + 5,
                n = e.coordsChar({ left: 0, top: r }, "div");return n.ch < e.getLine(n.line).search(/\S/) ? co(e, t.head) : n;
          }, El);
        }, goLineUp: function goLineUp(e) {
          return e.moveV(-1, "line");
        }, goLineDown: function goLineDown(e) {
          return e.moveV(1, "line");
        }, goPageUp: function goPageUp(e) {
          return e.moveV(-1, "page");
        }, goPageDown: function goPageDown(e) {
          return e.moveV(1, "page");
        }, goCharLeft: function goCharLeft(e) {
          return e.moveH(-1, "char");
        }, goCharRight: function goCharRight(e) {
          return e.moveH(1, "char");
        }, goColumnLeft: function goColumnLeft(e) {
          return e.moveH(-1, "column");
        }, goColumnRight: function goColumnRight(e) {
          return e.moveH(1, "column");
        }, goWordLeft: function goWordLeft(e) {
          return e.moveH(-1, "word");
        }, goGroupRight: function goGroupRight(e) {
          return e.moveH(1, "group");
        }, goGroupLeft: function goGroupLeft(e) {
          return e.moveH(-1, "group");
        }, goWordRight: function goWordRight(e) {
          return e.moveH(1, "word");
        }, delCharBefore: function delCharBefore(e) {
          return e.deleteH(-1, "char");
        }, delCharAfter: function delCharAfter(e) {
          return e.deleteH(1, "char");
        }, delWordBefore: function delWordBefore(e) {
          return e.deleteH(-1, "word");
        }, delWordAfter: function delWordAfter(e) {
          return e.deleteH(1, "word");
        }, delGroupBefore: function delGroupBefore(e) {
          return e.deleteH(-1, "group");
        }, delGroupAfter: function delGroupAfter(e) {
          return e.deleteH(1, "group");
        }, indentAuto: function indentAuto(e) {
          return e.indentSelection("smart");
        }, indentMore: function indentMore(e) {
          return e.indentSelection("add");
        }, indentLess: function indentLess(e) {
          return e.indentSelection("subtract");
        }, insertTab: function insertTab(e) {
          return e.replaceSelection("\t");
        }, insertSoftTab: function insertSoftTab(e) {
          for (var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0; i < r.length; i++) {
            var o = r[i].from(),
                l = f(e.getLine(o.line), o.ch, n);t.push(p(n - l % n));
          }e.replaceSelections(t);
        }, defaultTab: function defaultTab(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        }, transposeChars: function transposeChars(e) {
          return fn(e, function () {
            for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++) {
              if (t[n].empty()) {
                var i = t[n].head,
                    o = L(e.doc, i.line).text;if (o) if (i.ch == o.length && (i = new H(i.line, i.ch - 1)), i.ch > 0) i = new H(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), H(i.line, i.ch - 2), i, "+transpose");else if (i.line > e.doc.first) {
                  var l = L(e.doc, i.line - 1).text;l && (i = new H(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + l.charAt(l.length - 1), H(i.line - 1, l.length - 1), i, "+transpose"));
                }r.push(new fa(i, i));
              }
            }e.setSelections(r);
          });
        }, newlineAndIndent: function newlineAndIndent(e) {
          return fn(e, function () {
            for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--) {
              e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
            }t = e.listSelections();for (var n = 0; n < t.length; n++) {
              e.indentLine(t[n].from().line, null, !0);
            }jr(e);
          });
        }, openLine: function openLine(e) {
          return e.replaceSelection("\n", "start");
        }, toggleOverwrite: function toggleOverwrite(e) {
          return e.toggleOverwrite();
        } },
          Oa = new Al(),
          Ea = null,
          Da = { toString: function toString() {
          return "CodeMirror.Init";
        } },
          Wa = {},
          Ia = {};Do.defaults = Wa, Do.optionHandlers = Ia;var Ha = [];Do.defineInitHook = function (e) {
        return Ha.push(e);
      };var Ra = null,
          za = function za(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Al(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };za.prototype.init = function (e) {
        function t(e) {
          if (!Ee(i, e)) {
            if (i.somethingSelected()) Ho({ lineWise: !1, text: i.getSelections() }), "cut" == e.type && i.replaceSelection("", null, "cut");else {
              if (!i.options.lineWiseCopyCut) return;var t = Po(i);Ho({ lineWise: !0, text: t.text }), "cut" == e.type && i.operation(function () {
                i.setSelections(t.ranges, 0, Nl), i.replaceSelection("", null, "cut");
              });
            }if (e.clipboardData) {
              e.clipboardData.clearData();var r = Ra.text.join("\n");if (e.clipboardData.setData("Text", r), e.clipboardData.getData("Text") == r) return void e.preventDefault();
            }var l = _o(),
                a = l.firstChild;i.display.lineSpace.insertBefore(l, i.display.lineSpace.firstChild), a.value = Ra.text.join("\n");var s = document.activeElement;kl(a), setTimeout(function () {
              i.display.lineSpace.removeChild(l), s.focus(), s == o && n.showPrimarySelection();
            }, 50);
          }
        }var r = this,
            n = this,
            i = n.cm,
            o = n.div = e.lineDiv;Bo(o, i.options.spellcheck), Bl(o, "paste", function (e) {
          Ee(i, e) || zo(e, i) || il <= 11 && setTimeout(dn(i, function () {
            return r.updateFromDOM();
          }), 20);
        }), Bl(o, "compositionstart", function (e) {
          r.composing = { data: e.data, done: !1 };
        }), Bl(o, "compositionupdate", function (e) {
          r.composing || (r.composing = { data: e.data, done: !1 });
        }), Bl(o, "compositionend", function (e) {
          r.composing && (e.data != r.composing.data && r.readFromDOMSoon(), r.composing.done = !0);
        }), Bl(o, "touchstart", function () {
          return n.forceCompositionEnd();
        }), Bl(o, "input", function () {
          r.composing || r.readFromDOMSoon();
        }), Bl(o, "copy", t), Bl(o, "cut", t);
      }, za.prototype.prepareSelection = function () {
        var e = Mr(this.cm, !1);return e.focus = this.cm.state.focused, e;
      }, za.prototype.showSelection = function (e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, za.prototype.showPrimarySelection = function () {
        var e = window.getSelection(),
            t = this.cm,
            r = t.doc.sel.primary(),
            n = r.from(),
            i = r.to();if (t.display.viewTo == t.display.viewFrom || n.line >= t.display.viewTo || i.line < t.display.viewFrom) return void e.removeAllRanges();var o = Xo(t, e.anchorNode, e.anchorOffset),
            l = Xo(t, e.focusNode, e.focusOffset);if (!o || o.bad || !l || l.bad || 0 != R(B(o, l), n) || 0 != R(P(o, l), i)) {
          var a = t.display.view,
              s = n.line >= t.display.viewFrom && jo(t, n) || { node: a[0].measure.map[2], offset: 0 },
              c = i.line < t.display.viewTo && jo(t, i);if (!c) {
            var u = a[a.length - 1].measure,
                f = u.maps ? u.maps[u.maps.length - 1] : u.map;c = { node: f[f.length - 1], offset: f[f.length - 2] - f[f.length - 3] };
          }if (!s || !c) return void e.removeAllRanges();var d,
              h = e.rangeCount && e.getRangeAt(0);try {
            d = bl(s.node, s.offset, c.offset, c.node);
          } catch (e) {}d && (!Zo && t.state.focused ? (e.collapse(s.node, s.offset), d.collapsed || (e.removeAllRanges(), e.addRange(d))) : (e.removeAllRanges(), e.addRange(d)), h && null == e.anchorNode ? e.addRange(h) : Zo && this.startGracePeriod()), this.rememberSelection();
        }
      }, za.prototype.startGracePeriod = function () {
        var e = this;clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function () {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function () {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, za.prototype.showMultipleSelections = function (e) {
        r(this.cm.display.cursorDiv, e.cursors), r(this.cm.display.selectionDiv, e.selection);
      }, za.prototype.rememberSelection = function () {
        var e = window.getSelection();this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, za.prototype.selectionInEditor = function () {
        var e = window.getSelection();if (!e.rangeCount) return !1;var t = e.getRangeAt(0).commonAncestorContainer;return o(this.div, t);
      }, za.prototype.focus = function () {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, za.prototype.blur = function () {
        this.div.blur();
      }, za.prototype.getField = function () {
        return this.div;
      }, za.prototype.supportsTouch = function () {
        return !0;
      }, za.prototype.receivedFocus = function () {
        function e() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
        }var t = this;this.selectionInEditor() ? this.pollSelection() : fn(this.cm, function () {
          return t.cm.curOp.selectionChanged = !0;
        }), this.polling.set(this.cm.options.pollInterval, e);
      }, za.prototype.selectionChanged = function () {
        var e = window.getSelection();return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, za.prototype.pollSelection = function () {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
          var e = window.getSelection(),
              t = this.cm;if (hl && al && this.cm.options.gutters.length && Vo(e.anchorNode)) return this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), void this.focus();if (!this.composing) {
            this.rememberSelection();var r = Xo(t, e.anchorNode, e.anchorOffset),
                n = Xo(t, e.focusNode, e.focusOffset);r && n && fn(t, function () {
              yi(t.doc, Fn(r, n), Nl), (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, za.prototype.pollContent = function () {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);var e = this.cm,
            t = e.display,
            r = e.doc.sel.primary(),
            n = r.from(),
            i = r.to();if (0 == n.ch && n.line > e.firstLine() && (n = H(n.line - 1, L(e.doc, n.line - 1).length)), i.ch == L(e.doc, i.line).text.length && i.line < e.lastLine() && (i = H(i.line + 1, 0)), n.line < t.viewFrom || i.line > t.viewTo - 1) return !1;var o, l, a;n.line == t.viewFrom || 0 == (o = Ar(e, n.line)) ? (l = E(t.view[0].line), a = t.view[0].node) : (l = E(t.view[o].line), a = t.view[o - 1].node.nextSibling);var s,
            c,
            u = Ar(e, i.line);if (u == t.view.length - 1 ? (s = t.viewTo - 1, c = t.lineDiv.lastChild) : (s = E(t.view[u + 1].line) - 1, c = t.view[u + 1].node.previousSibling), !a) return !1;for (var f = e.doc.splitLines(Ko(e, a, c, l, s)), d = T(e.doc, H(l, 0), H(s, L(e.doc, s).text.length)); f.length > 1 && d.length > 1;) {
          if (g(f) == g(d)) f.pop(), d.pop(), s--;else {
            if (f[0] != d[0]) break;f.shift(), d.shift(), l++;
          }
        }for (var h = 0, p = 0, m = f[0], v = d[0], y = Math.min(m.length, v.length); h < y && m.charCodeAt(h) == v.charCodeAt(h);) {
          ++h;
        }for (var b = g(f), x = g(d), w = Math.min(b.length - (1 == f.length ? h : 0), x.length - (1 == d.length ? h : 0)); p < w && b.charCodeAt(b.length - p - 1) == x.charCodeAt(x.length - p - 1);) {
          ++p;
        }if (1 == f.length && 1 == d.length && l == n.line) for (; h && h > n.ch && b.charCodeAt(b.length - p - 1) == x.charCodeAt(x.length - p - 1);) {
          h--, p++;
        }f[f.length - 1] = b.slice(0, b.length - p).replace(/^\u200b+/, ""), f[0] = f[0].slice(h).replace(/\u200b+$/, "");var C = H(l, h),
            k = H(s, d.length ? g(d).length - p : 0);return f.length > 1 || f[0] || R(C, k) ? (Ii(e.doc, f, C, k, "+input"), !0) : void 0;
      }, za.prototype.ensurePolled = function () {
        this.forceCompositionEnd();
      }, za.prototype.reset = function () {
        this.forceCompositionEnd();
      }, za.prototype.forceCompositionEnd = function () {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, za.prototype.readFromDOMSoon = function () {
        var e = this;null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function () {
          if (e.readDOMTimeout = null, e.composing) {
            if (!e.composing.done) return;e.composing = null;
          }e.updateFromDOM();
        }, 80));
      }, za.prototype.updateFromDOM = function () {
        var e = this;!this.cm.isReadOnly() && this.pollContent() || fn(this.cm, function () {
          return gn(e.cm);
        });
      }, za.prototype.setUneditable = function (e) {
        e.contentEditable = "false";
      }, za.prototype.onKeyPress = function (e) {
        0 != e.charCode && (e.preventDefault(), this.cm.isReadOnly() || dn(this.cm, Ro)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0));
      }, za.prototype.readOnlyChanged = function (e) {
        this.div.contentEditable = String("nocursor" != e);
      }, za.prototype.onContextMenu = function () {}, za.prototype.resetPosition = function () {}, za.prototype.needsContentAttribute = !0;var Fa = function Fa(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Al(), this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null;
      };Fa.prototype.init = function (e) {
        function t(e) {
          if (!Ee(i, e)) {
            if (i.somethingSelected()) Ho({ lineWise: !1, text: i.getSelections() }), n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, l.value = Ra.text.join("\n"), kl(l));else {
              if (!i.options.lineWiseCopyCut) return;var t = Po(i);Ho({ lineWise: !0, text: t.text }), "cut" == e.type ? i.setSelections(t.ranges, null, Nl) : (n.prevInput = "", l.value = t.text.join("\n"), kl(l));
            }"cut" == e.type && (i.state.cutIncoming = !0);
          }
        }var r = this,
            n = this,
            i = this.cm,
            o = this.wrapper = _o(),
            l = this.textarea = o.firstChild;e.wrapper.insertBefore(o, e.wrapper.firstChild), dl && (l.style.width = "0px"), Bl(l, "input", function () {
          nl && il >= 9 && r.hasSelection && (r.hasSelection = null), n.poll();
        }), Bl(l, "paste", function (e) {
          Ee(i, e) || zo(e, i) || (i.state.pasteIncoming = !0, n.fastPoll());
        }), Bl(l, "cut", t), Bl(l, "copy", t), Bl(e.scroller, "paste", function (t) {
          Ft(e, t) || Ee(i, t) || (i.state.pasteIncoming = !0, n.focus());
        }), Bl(e.lineSpace, "selectstart", function (t) {
          Ft(e, t) || He(t);
        }), Bl(l, "compositionstart", function () {
          var e = i.getCursor("from");n.composing && n.composing.range.clear(), n.composing = { start: e, range: i.markText(e, i.getCursor("to"), { className: "CodeMirror-composing" }) };
        }), Bl(l, "compositionend", function () {
          n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
        });
      }, Fa.prototype.prepareSelection = function () {
        var e = this.cm,
            t = e.display,
            r = e.doc,
            n = Mr(e);if (e.options.moveInputWithCursor) {
          var i = ur(e, r.sel.primary().head, "div"),
              o = t.wrapper.getBoundingClientRect(),
              l = t.lineDiv.getBoundingClientRect();n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)), n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left));
        }return n;
      }, Fa.prototype.showSelection = function (e) {
        var t = this.cm,
            n = t.display;r(n.cursorDiv, e.cursors), r(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, Fa.prototype.reset = function (e) {
        if (!this.contextMenuPending && !this.composing) {
          var t,
              r,
              n = this.cm,
              i = n.doc;if (n.somethingSelected()) {
            this.prevInput = "";var o = i.sel.primary();t = jl && (o.to().line - o.from().line > 100 || (r = n.getSelection()).length > 1e3);var l = t ? "-" : r || n.getSelection();this.textarea.value = l, n.state.focused && kl(this.textarea), nl && il >= 9 && (this.hasSelection = l);
          } else e || (this.prevInput = this.textarea.value = "", nl && il >= 9 && (this.hasSelection = null));this.inaccurateSelection = t;
        }
      }, Fa.prototype.getField = function () {
        return this.textarea;
      }, Fa.prototype.supportsTouch = function () {
        return !1;
      }, Fa.prototype.focus = function () {
        if ("nocursor" != this.cm.options.readOnly && (!pl || l() != this.textarea)) try {
          this.textarea.focus();
        } catch (e) {}
      }, Fa.prototype.blur = function () {
        this.textarea.blur();
      }, Fa.prototype.resetPosition = function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, Fa.prototype.receivedFocus = function () {
        this.slowPoll();
      }, Fa.prototype.slowPoll = function () {
        var e = this;this.pollingFast || this.polling.set(this.cm.options.pollInterval, function () {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, Fa.prototype.fastPoll = function () {
        function e() {
          r.poll() || t ? (r.pollingFast = !1, r.slowPoll()) : (t = !0, r.polling.set(60, e));
        }var t = !1,
            r = this;r.pollingFast = !0, r.polling.set(20, e);
      }, Fa.prototype.poll = function () {
        var e = this,
            t = this.cm,
            r = this.textarea,
            n = this.prevInput;if (this.contextMenuPending || !t.state.focused || $l(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;var i = r.value;if (i == n && !t.somethingSelected()) return !1;if (nl && il >= 9 && this.hasSelection === i || gl && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);if (8203 != o || n || (n = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo");
        }for (var l = 0, a = Math.min(n.length, i.length); l < a && n.charCodeAt(l) == i.charCodeAt(l);) {
          ++l;
        }return fn(t, function () {
          Ro(t, i.slice(l), n.length - l, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), { className: "CodeMirror-composing" }));
        }), !0;
      }, Fa.prototype.ensurePolled = function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, Fa.prototype.onKeyPress = function () {
        nl && il >= 9 && (this.hasSelection = null), this.fastPoll();
      }, Fa.prototype.onContextMenu = function (e) {
        function t() {
          if (null != l.selectionStart) {
            var e = i.somethingSelected(),
                t = "​" + (e ? l.value : "");l.value = "⇚", l.value = t, n.prevInput = e ? "" : "​", l.selectionStart = 1, l.selectionEnd = t.length, o.selForContextMenu = i.doc.sel;
          }
        }function r() {
          if (n.contextMenuPending = !1, n.wrapper.style.cssText = u, l.style.cssText = c, nl && il < 9 && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != l.selectionStart) {
            (!nl || nl && il < 9) && t();var e = 0,
                r = function r() {
              o.selForContextMenu == i.doc.sel && 0 == l.selectionStart && l.selectionEnd > 0 && "​" == n.prevInput ? dn(i, Mi)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(r, 500) : (o.selForContextMenu = null, o.input.reset());
            };o.detectingSelectAll = setTimeout(r, 200);
          }
        }var n = this,
            i = n.cm,
            o = i.display,
            l = n.textarea,
            a = kr(i, e),
            s = o.scroller.scrollTop;if (a && !sl) {
          i.options.resetSelectionOnContextMenu && -1 == i.doc.sel.contains(a) && dn(i, yi)(i.doc, Fn(a), Nl);var c = l.style.cssText,
              u = n.wrapper.style.cssText;n.wrapper.style.cssText = "position: absolute";var f = n.wrapper.getBoundingClientRect();l.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - f.top - 5) + "px; left: " + (e.clientX - f.left - 5) + "px;\n      z-index: 1000; background: " + (nl ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";var d;if (ol && (d = window.scrollY), o.input.focus(), ol && window.scrollTo(null, d), o.input.reset(), i.somethingSelected() || (l.value = n.prevInput = " "), n.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), nl && il >= 9 && t(), wl) {
            Fe(e);var h = function h() {
              Ne(window, "mouseup", h), setTimeout(r, 20);
            };Bl(window, "mouseup", h);
          } else setTimeout(r, 50);
        }
      }, Fa.prototype.readOnlyChanged = function (e) {
        e || this.reset();
      }, Fa.prototype.setUneditable = function () {}, Fa.prototype.needsContentAttribute = !1, function (e) {
        function t(t, n, i, o) {
          e.defaults[t] = n, i && (r[t] = o ? function (e, t, r) {
            r != Da && i(e, t, r);
          } : i);
        }var r = e.optionHandlers;e.defineOption = t, e.Init = Da, t("value", "", function (e, t) {
          return e.setValue(t);
        }, !0), t("mode", null, function (e, t) {
          e.doc.modeOption = t, jn(e);
        }, !0), t("indentUnit", 2, jn, !0), t("indentWithTabs", !1), t("smartIndent", !0), t("tabSize", 4, function (e) {
          Vn(e), ir(e), gn(e);
        }, !0), t("lineSeparator", null, function (e, t) {
          if (e.doc.lineSep = t, t) {
            var r = [],
                n = e.doc.first;e.doc.iter(function (e) {
              for (var i = 0;;) {
                var o = e.text.indexOf(t, i);if (-1 == o) break;i = o + t.length, r.push(H(n, o));
              }n++;
            });for (var i = r.length - 1; i >= 0; i--) {
              Ii(e.doc, t, r[i], H(r[i].line, r[i].ch + t.length));
            }
          }
        }), t("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (e, t, r) {
          e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), r != Da && e.refresh();
        }), t("specialCharPlaceholder", dt, function (e) {
          return e.refresh();
        }, !0), t("electricChars", !0), t("inputStyle", pl ? "contenteditable" : "textarea", function () {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), t("spellcheck", !1, function (e, t) {
          return e.getInputField().spellcheck = t;
        }, !0), t("rtlMoveVisually", !vl), t("wholeLineUpdateBefore", !0), t("theme", "default", function (e) {
          To(e), No(e);
        }, !0), t("keyMap", "default", function (e, t, r) {
          var n = oo(t),
              i = r != Da && oo(r);i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null);
        }), t("extraKeys", null), t("lineWrapping", !1, Eo, !0), t("gutters", [], function (e) {
          Wn(e.options), No(e);
        }, !0), t("fixedGutter", !0, function (e, t) {
          e.display.gutters.style.left = t ? xr(e.display) + "px" : "0", e.refresh();
        }, !0), t("coverGutterNextToScrollbar", !1, function (e) {
          return Zr(e);
        }, !0), t("scrollbarStyle", "native", function (e) {
          tn(e), Zr(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
        }, !0), t("lineNumbers", !1, function (e) {
          Wn(e.options), No(e);
        }, !0), t("firstLineNumber", 1, No, !0), t("lineNumberFormatter", function (e) {
          return e;
        }, No, !0), t("showCursorWhenSelecting", !1, Sr, !0), t("resetSelectionOnContextMenu", !0), t("lineWiseCopyCut", !0), t("readOnly", !1, function (e, t) {
          "nocursor" == t ? (Wr(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, e.display.input.readOnlyChanged(t);
        }), t("disableInput", !1, function (e, t) {
          t || e.display.input.reset();
        }, !0), t("dragDrop", !0, Oo), t("allowDropFileTypes", null), t("cursorBlinkRate", 530), t("cursorScrollMargin", 0), t("cursorHeight", 1, Sr, !0), t("singleCursorHeightPerLine", !0, Sr, !0), t("workTime", 100), t("workDelay", 100), t("flattenSpans", !0, Vn, !0), t("addModeClass", !1, Vn, !0), t("pollInterval", 100), t("undoDepth", 200, function (e, t) {
          return e.doc.history.undoDepth = t;
        }), t("historyEventDelay", 1250), t("viewportMargin", 10, function (e) {
          return e.refresh();
        }, !0), t("maxHighlightLength", 1e4, Vn, !0), t("moveInputWithCursor", !0, function (e, t) {
          t || e.display.input.resetPosition();
        }), t("tabindex", null, function (e, t) {
          return e.display.input.getField().tabIndex = t || "";
        }), t("autofocus", null), t("direction", "ltr", function (e, t) {
          return e.doc.setDirection(t);
        }, !0);
      }(Do), function (e) {
        var t = e.optionHandlers,
            r = e.helpers = {};e.prototype = { constructor: e, focus: function focus() {
            window.focus(), this.display.input.focus();
          }, setOption: function setOption(e, r) {
            var n = this.options,
                i = n[e];n[e] == r && "mode" != e || (n[e] = r, t.hasOwnProperty(e) && dn(this, t[e])(this, r, i), Oe(this, "optionChange", this, e));
          }, getOption: function getOption(e) {
            return this.options[e];
          }, getDoc: function getDoc() {
            return this.doc;
          }, addKeyMap: function addKeyMap(e, t) {
            this.state.keyMaps[t ? "push" : "unshift"](oo(e));
          }, removeKeyMap: function removeKeyMap(e) {
            for (var t = this.state.keyMaps, r = 0; r < t.length; ++r) {
              if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0;
            }
          }, addOverlay: hn(function (t, r) {
            var n = t.token ? t : e.getMode(this.options, t);if (n.startState) throw new Error("Overlays may not be stateful.");v(this.state.overlays, { mode: n, modeSpec: t, opaque: r && r.opaque, priority: r && r.priority || 0 }, function (e) {
              return e.priority;
            }), this.state.modeGen++, gn(this);
          }), removeOverlay: hn(function (e) {
            for (var t = this, r = this.state.overlays, n = 0; n < r.length; ++n) {
              var i = r[n].modeSpec;if (i == e || "string" == typeof e && i.name == e) return r.splice(n, 1), t.state.modeGen++, void gn(t);
            }
          }), indentLine: hn(function (e, t, r) {
            "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), W(this.doc, e) && Io(this, e, t, r);
          }), indentSelection: hn(function (e) {
            for (var t = this, r = this.doc.sel.ranges, n = -1, i = 0; i < r.length; i++) {
              var o = r[i];if (o.empty()) o.head.line > n && (Io(t, o.head.line, e, !0), n = o.head.line, i == t.doc.sel.primIndex && jr(t));else {
                var l = o.from(),
                    a = o.to(),
                    s = Math.max(n, l.line);n = Math.min(t.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;for (var c = s; c < n; ++c) {
                  Io(t, c, e);
                }var u = t.doc.sel.ranges;0 == l.ch && r.length == u.length && u[i].from().ch > 0 && pi(t.doc, i, new fa(l, u[i].to()), Nl);
              }
            }
          }), getTokenAt: function getTokenAt(e, t) {
            return it(this, e, t);
          }, getLineTokens: function getLineTokens(e, t) {
            return it(this, H(e), t, !0);
          }, getTokenTypeAt: function getTokenTypeAt(e) {
            e = U(this.doc, e);var t,
                r = Ze(this, L(this.doc, e.line)),
                n = 0,
                i = (r.length - 1) / 2,
                o = e.ch;if (0 == o) t = r[2];else for (;;) {
              var l = n + i >> 1;if ((l ? r[2 * l - 1] : 0) >= o) i = l;else {
                if (!(r[2 * l + 1] < o)) {
                  t = r[2 * l + 2];break;
                }n = l + 1;
              }
            }var a = t ? t.indexOf("overlay ") : -1;return a < 0 ? t : 0 == a ? null : t.slice(0, a - 1);
          }, getModeAt: function getModeAt(t) {
            var r = this.doc.mode;return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r;
          }, getHelper: function getHelper(e, t) {
            return this.getHelpers(e, t)[0];
          }, getHelpers: function getHelpers(e, t) {
            var n = this,
                i = [];if (!r.hasOwnProperty(t)) return i;var o = r[t],
                l = this.getModeAt(e);if ("string" == typeof l[t]) o[l[t]] && i.push(o[l[t]]);else if (l[t]) for (var a = 0; a < l[t].length; a++) {
              var s = o[l[t][a]];s && i.push(s);
            } else l.helperType && o[l.helperType] ? i.push(o[l.helperType]) : o[l.name] && i.push(o[l.name]);for (var c = 0; c < o._global.length; c++) {
              var u = o._global[c];u.pred(l, n) && -1 == d(i, u.val) && i.push(u.val);
            }return i;
          }, getStateAfter: function getStateAfter(e, t) {
            var r = this.doc;return e = _(r, null == e ? r.first + r.size - 1 : e), et(this, e + 1, t);
          }, cursorCoords: function cursorCoords(e, t) {
            var r,
                n = this.doc.sel.primary();return r = null == e ? n.head : "object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) ? U(this.doc, e) : e ? n.from() : n.to(), ur(this, r, t || "page");
          }, charCoords: function charCoords(e, t) {
            return cr(this, U(this.doc, e), t || "page");
          }, coordsChar: function coordsChar(e, t) {
            return e = sr(this, e, t || "page"), hr(this, e.left, e.top);
          }, lineAtHeight: function lineAtHeight(e, t) {
            return e = sr(this, { top: e, left: 0 }, t || "page").top, D(this.doc, e + this.display.viewOffset);
          }, heightAtLine: function heightAtLine(e, t, r) {
            var n,
                i = !1;if ("number" == typeof e) {
              var o = this.doc.first + this.doc.size - 1;e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), n = L(this.doc, e);
            } else n = e;return ar(this, n, { top: 0, left: 0 }, t || "page", r || i).top + (i ? this.doc.height - ye(n) : 0);
          }, defaultTextHeight: function defaultTextHeight() {
            return vr(this.display);
          }, defaultCharWidth: function defaultCharWidth() {
            return yr(this.display);
          }, getViewport: function getViewport() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          }, addWidget: function addWidget(e, t, r, n, i) {
            var o = this.display;e = ur(this, U(this.doc, e));var l = e.bottom,
                a = e.left;if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == n) l = e.top;else if ("above" == n || "near" == n) {
              var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                  c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);("above" == n || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? l = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (l = e.bottom), a + t.offsetWidth > c && (a = c - t.offsetWidth);
            }t.style.top = l + "px", t.style.left = t.style.right = "", "right" == i ? (a = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = a + "px"), r && _r(this, { left: a, top: l, right: a + t.offsetWidth, bottom: l + t.offsetHeight });
          }, triggerOnKeyDown: hn(mo), triggerOnKeyPress: hn(bo), triggerOnKeyUp: yo, execCommand: function execCommand(e) {
            if (Na.hasOwnProperty(e)) return Na[e].call(null, this);
          }, triggerElectric: hn(function (e) {
            Fo(this, e);
          }), findPosH: function findPosH(e, t, r, n) {
            var i = this,
                o = 1;t < 0 && (o = -1, t = -t);for (var l = U(this.doc, e), a = 0; a < t && (l = Uo(i.doc, l, o, r, n), !l.hitSide); ++a) {}return l;
          }, moveH: hn(function (e, t) {
            var r = this;this.extendSelectionsBy(function (n) {
              return r.display.shift || r.doc.extend || n.empty() ? Uo(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to();
            }, El);
          }), deleteH: hn(function (e, t) {
            var r = this.doc.sel,
                n = this.doc;r.somethingSelected() ? n.replaceSelection("", null, "+delete") : lo(this, function (r) {
              var i = Uo(n, r.head, e, t, !1);return e < 0 ? { from: i, to: r.head } : { from: r.head, to: i };
            });
          }), findPosV: function findPosV(e, t, r, n) {
            var i = this,
                o = 1,
                l = n;t < 0 && (o = -1, t = -t);for (var a = U(this.doc, e), s = 0; s < t; ++s) {
              var c = ur(i, a, "div");if (null == l ? l = c.left : c.left = l, a = $o(i, c, o, r), a.hitSide) break;
            }return a;
          }, moveV: hn(function (e, t) {
            var r = this,
                n = this.doc,
                i = [],
                o = !this.display.shift && !n.extend && n.sel.somethingSelected();if (n.extendSelectionsBy(function (l) {
              if (o) return e < 0 ? l.from() : l.to();var a = ur(r, l.head, "div");null != l.goalColumn && (a.left = l.goalColumn), i.push(a.left);var s = $o(r, a, e, t);return "page" == t && l == n.sel.primary() && $r(r, cr(r, s, "div").top - a.top), s;
            }, El), i.length) for (var l = 0; l < n.sel.ranges.length; l++) {
              n.sel.ranges[l].goalColumn = i[l];
            }
          }), findWordAt: function findWordAt(e) {
            var t = this.doc,
                r = L(t, e.line).text,
                n = e.ch,
                i = e.ch;if (r) {
              var o = this.getHelper(e, "wordChars");"before" != e.sticky && i != r.length || !n ? ++i : --n;for (var l = r.charAt(n), a = w(l, o) ? function (e) {
                return w(e, o);
              } : /\s/.test(l) ? function (e) {
                return (/\s/.test(e)
                );
              } : function (e) {
                return !/\s/.test(e) && !w(e);
              }; n > 0 && a(r.charAt(n - 1));) {
                --n;
              }for (; i < r.length && a(r.charAt(i));) {
                ++i;
              }
            }return new fa(H(e.line, n), H(e.line, i));
          }, toggleOverwrite: function toggleOverwrite(e) {
            null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? a(this.display.cursorDiv, "CodeMirror-overwrite") : Cl(this.display.cursorDiv, "CodeMirror-overwrite"), Oe(this, "overwriteToggle", this, this.state.overwrite));
          }, hasFocus: function hasFocus() {
            return this.display.input.getField() == l();
          }, isReadOnly: function isReadOnly() {
            return !(!this.options.readOnly && !this.doc.cantEdit);
          }, scrollTo: hn(function (e, t) {
            Vr(this, e, t);
          }), getScrollInfo: function getScrollInfo() {
            var e = this.display.scroller;return { left: e.scrollLeft, top: e.scrollTop, height: e.scrollHeight - Ut(this) - this.display.barHeight, width: e.scrollWidth - Ut(this) - this.display.barWidth, clientHeight: jt(this), clientWidth: $t(this) };
          }, scrollIntoView: hn(function (e, t) {
            null == e ? (e = { from: this.doc.sel.primary().head, to: null }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = { from: H(e, 0), to: null } : null == e.from && (e = { from: e, to: null }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? Gr(this, e) : Xr(this, e.from, e.to, e.margin);
          }), setSize: hn(function (e, t) {
            var r = this,
                n = function n(e) {
              return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
            };null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && nr(this);var i = this.display.viewFrom;this.doc.iter(i, this.display.viewTo, function (e) {
              if (e.widgets) for (var t = 0; t < e.widgets.length; t++) {
                if (e.widgets[t].noHScroll) {
                  mn(r, i, "widget");break;
                }
              }++i;
            }), this.curOp.forceUpdate = !0, Oe(this, "refresh", this);
          }), operation: function operation(e) {
            return fn(this, e);
          }, refresh: hn(function () {
            var e = this.display.cachedTextHeight;gn(this), this.curOp.forceUpdate = !0, ir(this), Vr(this, this.doc.scrollLeft, this.doc.scrollTop), On(this), (null == e || Math.abs(e - vr(this.display)) > .5) && Cr(this), Oe(this, "refresh", this);
          }), swapDoc: hn(function (e) {
            var t = this.doc;return t.cm = null, Yn(this, e), ir(this), this.display.input.reset(), Vr(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, kt(this, "swapDoc", this, t), t;
          }), getInputField: function getInputField() {
            return this.display.input.getField();
          }, getWrapperElement: function getWrapperElement() {
            return this.display.wrapper;
          }, getScrollerElement: function getScrollerElement() {
            return this.display.scroller;
          }, getGutterElement: function getGutterElement() {
            return this.display.gutters;
          } }, Ie(e), e.registerHelper = function (t, n, i) {
          r.hasOwnProperty(t) || (r[t] = e[t] = { _global: [] }), r[t][n] = i;
        }, e.registerGlobalHelper = function (t, n, i, o) {
          e.registerHelper(t, n, o), r[t]._global.push({ pred: i, val: o });
        };
      }(Do);var Pa = "iter insert remove copy getEditor constructor".split(" ");for (var Ba in ba.prototype) {
        ba.prototype.hasOwnProperty(Ba) && d(Pa, Ba) < 0 && (Do.prototype[Ba] = function (e) {
          return function () {
            return e.apply(this.doc, arguments);
          };
        }(ba.prototype[Ba]));
      }return Ie(ba), Do.inputStyles = { textarea: Fa, contenteditable: za }, Do.defineMode = function (e) {
        Do.defaults.mode || "null" == e || (Do.defaults.mode = e), je.apply(this, arguments);
      }, Do.defineMIME = Ve, Do.defineMode("null", function () {
        return { token: function token(e) {
            return e.skipToEnd();
          } };
      }), Do.defineMIME("text/plain", "null"), Do.defineExtension = function (e, t) {
        Do.prototype[e] = t;
      }, Do.defineDocExtension = function (e, t) {
        ba.prototype[e] = t;
      }, Do.fromTextArea = Qo, function (e) {
        e.off = Ne, e.on = Bl, e.wheelEventPixels = Hn, e.Doc = ba, e.splitLines = Ul, e.countColumn = f, e.findColumn = h, e.isWordChar = x, e.Pass = Tl, e.signal = Oe, e.Line = Ql, e.changeEnd = Pn, e.scrollbarModel = oa, e.Pos = H, e.cmpPos = R, e.modes = Gl, e.mimeModes = Kl, e.resolveMode = Ge, e.getMode = Ke, e.modeExtensions = Xl, e.extendMode = Xe, e.copyState = Ye, e.startState = Je, e.innerMode = Qe, e.commands = Na, e.keyMap = Ma, e.keyName = io, e.isModifierKey = no, e.lookupKey = ro, e.normalizeKeyMap = to, e.StringStream = Yl, e.SharedTextMarker = va, e.TextMarker = ma, e.LineWidget = pa, e.e_preventDefault = He, e.e_stopPropagation = Re, e.e_stop = Fe, e.addClass = a, e.contains = o, e.rmClass = Cl, e.keyNames = Ca;
      }(Do), Do.version = "5.26.0", Do;
    });
  }, BsEP: function BsEP(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, '.CodeMirror{font-family:monospace;height:300px;color:#000}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:-20px;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:blue}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0f0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#f22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background:#ffa;background:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:""}span.CodeMirror-selectedtext{background:none}', ""]);
  }, EJ1H: function EJ1H(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, ".editor-container[data-v-8bab9de8]{position:relative;height:100%}", ""]);
  }, GUiZ: function GUiZ(e, t, r) {
    var n = r("nfUu");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("812d1ef8", n, !0);
  }, HQXN: function HQXN(e, t, r) {
    "use strict";
    var n = r("rdDl");t.a = { components: { jsonEditor: n.a }, data: function data() {
        return { value: JSON.parse('[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]') };
      } };
  }, LnSQ: function LnSQ(e, t, r) {
    var n = r("EJ1H");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("3f367748", n, !0);
  }, OCSE: function OCSE(e, t, r) {
    "use strict";
    var n = function n() {
      var e = this,
          t = e.$createElement,
          r = e._self._c || t;return r("div", { staticClass: "components-container", staticStyle: { height: "100vh" } }, [e._m(0), e._v(" "), r("div", { staticClass: "editor-container" }, [r("json-editor", { ref: "jsonEditor", model: { value: e.value, callback: function callback(t) {
            e.value = t;
          }, expression: "value" } })], 1)]);
    },
        i = [function () {
      var e = this,
          t = e.$createElement,
          r = e._self._c || t;return r("code", [e._v("jsonEditor is base on  "), r("a", { attrs: { href: "https://github.com/codemirror/CodeMirror", target: "_blank" } }, [e._v("CodeMirrorr")]), e._v(" , lint base on json-lint ")]);
    }],
        o = { render: n, staticRenderFns: i };t.a = o;
  }, "P+fo": function PFo(e, t) {
    e.exports = function (e) {
      "undefined" != typeof execScript ? execScript(e) : eval.call(null, e);
    };
  }, PmcG: function PmcG(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, ".CodeMirror{height:100%}.json-editor .cm-s-rubyblue span.cm-string{color:#f08047}", ""]);
  }, Zbun: function Zbun(e, t, r) {
    var n = r("iANj"),
        i = n.JSON || (n.JSON = { stringify: _stringify2.default });e.exports = function (e) {
      return i.stringify.apply(i, arguments);
    };
  }, aOjs: function aOjs(e, t, r) {
    r("P+fo")(r("cdEH"));
  }, cdEH: function cdEH(e, t) {
    e.exports = "/* Jison generated parser */\nvar jsonlint = (function(){\nvar parser = {trace: function trace() { },\nyy: {},\nsymbols_: {\"error\":2,\"JSONString\":3,\"STRING\":4,\"JSONNumber\":5,\"NUMBER\":6,\"JSONNullLiteral\":7,\"NULL\":8,\"JSONBooleanLiteral\":9,\"TRUE\":10,\"FALSE\":11,\"JSONText\":12,\"JSONValue\":13,\"EOF\":14,\"JSONObject\":15,\"JSONArray\":16,\"{\":17,\"}\":18,\"JSONMemberList\":19,\"JSONMember\":20,\":\":21,\",\":22,\"[\":23,\"]\":24,\"JSONElementList\":25,\"$accept\":0,\"$end\":1},\nterminals_: {2:\"error\",4:\"STRING\",6:\"NUMBER\",8:\"NULL\",10:\"TRUE\",11:\"FALSE\",14:\"EOF\",17:\"{\",18:\"}\",21:\":\",22:\",\",23:\"[\",24:\"]\"},\nproductions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],\nperformAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {\n\nvar $0 = $$.length - 1;\nswitch (yystate) {\ncase 1: // replace escaped characters with actual character\n          this.$ = yytext.replace(/\\\\(\\\\|\")/g, \"$\"+\"1\")\n                     .replace(/\\\\n/g,'\\n')\n                     .replace(/\\\\r/g,'\\r')\n                     .replace(/\\\\t/g,'\\t')\n                     .replace(/\\\\v/g,'\\v')\n                     .replace(/\\\\f/g,'\\f')\n                     .replace(/\\\\b/g,'\\b');\n        \nbreak;\ncase 2:this.$ = Number(yytext);\nbreak;\ncase 3:this.$ = null;\nbreak;\ncase 4:this.$ = true;\nbreak;\ncase 5:this.$ = false;\nbreak;\ncase 6:return this.$ = $$[$0-1];\nbreak;\ncase 13:this.$ = {};\nbreak;\ncase 14:this.$ = $$[$0-1];\nbreak;\ncase 15:this.$ = [$$[$0-2], $$[$0]];\nbreak;\ncase 16:this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];\nbreak;\ncase 17:this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];\nbreak;\ncase 18:this.$ = [];\nbreak;\ncase 19:this.$ = $$[$0-1];\nbreak;\ncase 20:this.$ = [$$[$0]];\nbreak;\ncase 21:this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);\nbreak;\n}\n},\ntable: [{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],12:1,13:2,15:7,16:8,17:[1,14],23:[1,15]},{1:[3]},{14:[1,16]},{14:[2,7],18:[2,7],22:[2,7],24:[2,7]},{14:[2,8],18:[2,8],22:[2,8],24:[2,8]},{14:[2,9],18:[2,9],22:[2,9],24:[2,9]},{14:[2,10],18:[2,10],22:[2,10],24:[2,10]},{14:[2,11],18:[2,11],22:[2,11],24:[2,11]},{14:[2,12],18:[2,12],22:[2,12],24:[2,12]},{14:[2,3],18:[2,3],22:[2,3],24:[2,3]},{14:[2,4],18:[2,4],22:[2,4],24:[2,4]},{14:[2,5],18:[2,5],22:[2,5],24:[2,5]},{14:[2,1],18:[2,1],21:[2,1],22:[2,1],24:[2,1]},{14:[2,2],18:[2,2],22:[2,2],24:[2,2]},{3:20,4:[1,12],18:[1,17],19:18,20:19},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:23,15:7,16:8,17:[1,14],23:[1,15],24:[1,21],25:22},{1:[2,6]},{14:[2,13],18:[2,13],22:[2,13],24:[2,13]},{18:[1,24],22:[1,25]},{18:[2,16],22:[2,16]},{21:[1,26]},{14:[2,18],18:[2,18],22:[2,18],24:[2,18]},{22:[1,28],24:[1,27]},{22:[2,20],24:[2,20]},{14:[2,14],18:[2,14],22:[2,14],24:[2,14]},{3:20,4:[1,12],20:29},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:30,15:7,16:8,17:[1,14],23:[1,15]},{14:[2,19],18:[2,19],22:[2,19],24:[2,19]},{3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:31,15:7,16:8,17:[1,14],23:[1,15]},{18:[2,17],22:[2,17]},{18:[2,15],22:[2,15]},{22:[2,21],24:[2,21]}],\ndefaultActions: {16:[2,6]},\nparseError: function parseError(str, hash) {\n    throw new Error(str);\n},\nparse: function parse(input) {\n    var self = this,\n        stack = [0],\n        vstack = [null], // semantic value stack\n        lstack = [], // location stack\n        table = this.table,\n        yytext = '',\n        yylineno = 0,\n        yyleng = 0,\n        recovering = 0,\n        TERROR = 2,\n        EOF = 1;\n\n    //this.reductionCount = this.shiftCount = 0;\n\n    this.lexer.setInput(input);\n    this.lexer.yy = this.yy;\n    this.yy.lexer = this.lexer;\n    if (typeof this.lexer.yylloc == 'undefined')\n        this.lexer.yylloc = {};\n    var yyloc = this.lexer.yylloc;\n    lstack.push(yyloc);\n\n    if (typeof this.yy.parseError === 'function')\n        this.parseError = this.yy.parseError;\n\n    function popStack (n) {\n        stack.length = stack.length - 2*n;\n        vstack.length = vstack.length - n;\n        lstack.length = lstack.length - n;\n    }\n\n    function lex() {\n        var token;\n        token = self.lexer.lex() || 1; // $end = 1\n        // if token isn't its numeric value, convert\n        if (typeof token !== 'number') {\n            token = self.symbols_[token] || token;\n        }\n        return token;\n    }\n\n    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;\n    while (true) {\n        // retreive state number from top of stack\n        state = stack[stack.length-1];\n\n        // use default actions if available\n        if (this.defaultActions[state]) {\n            action = this.defaultActions[state];\n        } else {\n            if (symbol == null)\n                symbol = lex();\n            // read action for current state and first input\n            action = table[state] && table[state][symbol];\n        }\n\n        // handle parse error\n        _handle_error:\n        if (typeof action === 'undefined' || !action.length || !action[0]) {\n\n            if (!recovering) {\n                // Report error\n                expected = [];\n                for (p in table[state]) if (this.terminals_[p] && p > 2) {\n                    expected.push(\"'\"+this.terminals_[p]+\"'\");\n                }\n                var errStr = '';\n                if (this.lexer.showPosition) {\n                    errStr = 'Parse error on line '+(yylineno+1)+\":\\n\"+this.lexer.showPosition()+\"\\nExpecting \"+expected.join(', ') + \", got '\" + this.terminals_[symbol]+ \"'\";\n                } else {\n                    errStr = 'Parse error on line '+(yylineno+1)+\": Unexpected \" +\n                                  (symbol == 1 /*EOF*/ ? \"end of input\" :\n                                              (\"'\"+(this.terminals_[symbol] || symbol)+\"'\"));\n                }\n                this.parseError(errStr,\n                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});\n            }\n\n            // just recovered from another error\n            if (recovering == 3) {\n                if (symbol == EOF) {\n                    throw new Error(errStr || 'Parsing halted.');\n                }\n\n                // discard current lookahead and grab another\n                yyleng = this.lexer.yyleng;\n                yytext = this.lexer.yytext;\n                yylineno = this.lexer.yylineno;\n                yyloc = this.lexer.yylloc;\n                symbol = lex();\n            }\n\n            // try to recover from error\n            while (1) {\n                // check for error recovery rule in this state\n                if ((TERROR.toString()) in table[state]) {\n                    break;\n                }\n                if (state == 0) {\n                    throw new Error(errStr || 'Parsing halted.');\n                }\n                popStack(1);\n                state = stack[stack.length-1];\n            }\n\n            preErrorSymbol = symbol; // save the lookahead token\n            symbol = TERROR;         // insert generic error symbol as new lookahead\n            state = stack[stack.length-1];\n            action = table[state] && table[state][TERROR];\n            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error\n        }\n\n        // this shouldn't happen, unless resolve defaults are off\n        if (action[0] instanceof Array && action.length > 1) {\n            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);\n        }\n\n        switch (action[0]) {\n\n            case 1: // shift\n                //this.shiftCount++;\n\n                stack.push(symbol);\n                vstack.push(this.lexer.yytext);\n                lstack.push(this.lexer.yylloc);\n                stack.push(action[1]); // push state\n                symbol = null;\n                if (!preErrorSymbol) { // normal execution/no error\n                    yyleng = this.lexer.yyleng;\n                    yytext = this.lexer.yytext;\n                    yylineno = this.lexer.yylineno;\n                    yyloc = this.lexer.yylloc;\n                    if (recovering > 0)\n                        recovering--;\n                } else { // error just occurred, resume old lookahead f/ before error\n                    symbol = preErrorSymbol;\n                    preErrorSymbol = null;\n                }\n                break;\n\n            case 2: // reduce\n                //this.reductionCount++;\n\n                len = this.productions_[action[1]][1];\n\n                // perform semantic action\n                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1\n                // default location, uses first token for firsts, last for lasts\n                yyval._$ = {\n                    first_line: lstack[lstack.length-(len||1)].first_line,\n                    last_line: lstack[lstack.length-1].last_line,\n                    first_column: lstack[lstack.length-(len||1)].first_column,\n                    last_column: lstack[lstack.length-1].last_column\n                };\n                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);\n\n                if (typeof r !== 'undefined') {\n                    return r;\n                }\n\n                // pop off stack\n                if (len) {\n                    stack = stack.slice(0,-1*len*2);\n                    vstack = vstack.slice(0, -1*len);\n                    lstack = lstack.slice(0, -1*len);\n                }\n\n                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)\n                vstack.push(yyval.$);\n                lstack.push(yyval._$);\n                // goto new state = table[STATE][NONTERMINAL]\n                newState = table[stack[stack.length-2]][stack[stack.length-1]];\n                stack.push(newState);\n                break;\n\n            case 3: // accept\n                return true;\n        }\n\n    }\n\n    return true;\n}};\n/* Jison generated lexer */\nvar lexer = (function(){\nvar lexer = ({EOF:1,\nparseError:function parseError(str, hash) {\n        if (this.yy.parseError) {\n            this.yy.parseError(str, hash);\n        } else {\n            throw new Error(str);\n        }\n    },\nsetInput:function (input) {\n        this._input = input;\n        this._more = this._less = this.done = false;\n        this.yylineno = this.yyleng = 0;\n        this.yytext = this.matched = this.match = '';\n        this.conditionStack = ['INITIAL'];\n        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};\n        return this;\n    },\ninput:function () {\n        var ch = this._input[0];\n        this.yytext+=ch;\n        this.yyleng++;\n        this.match+=ch;\n        this.matched+=ch;\n        var lines = ch.match(/\\n/);\n        if (lines) this.yylineno++;\n        this._input = this._input.slice(1);\n        return ch;\n    },\nunput:function (ch) {\n        this._input = ch + this._input;\n        return this;\n    },\nmore:function () {\n        this._more = true;\n        return this;\n    },\nless:function (n) {\n        this._input = this.match.slice(n) + this._input;\n    },\npastInput:function () {\n        var past = this.matched.substr(0, this.matched.length - this.match.length);\n        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\\n/g, \"\");\n    },\nupcomingInput:function () {\n        var next = this.match;\n        if (next.length < 20) {\n            next += this._input.substr(0, 20-next.length);\n        }\n        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\\n/g, \"\");\n    },\nshowPosition:function () {\n        var pre = this.pastInput();\n        var c = new Array(pre.length + 1).join(\"-\");\n        return pre + this.upcomingInput() + \"\\n\" + c+\"^\";\n    },\nnext:function () {\n        if (this.done) {\n            return this.EOF;\n        }\n        if (!this._input) this.done = true;\n\n        var token,\n            match,\n            tempMatch,\n            index,\n            col,\n            lines;\n        if (!this._more) {\n            this.yytext = '';\n            this.match = '';\n        }\n        var rules = this._currentRules();\n        for (var i=0;i < rules.length; i++) {\n            tempMatch = this._input.match(this.rules[rules[i]]);\n            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {\n                match = tempMatch;\n                index = i;\n                if (!this.options.flex) break;\n            }\n        }\n        if (match) {\n            lines = match[0].match(/\\n.*/g);\n            if (lines) this.yylineno += lines.length;\n            this.yylloc = {first_line: this.yylloc.last_line,\n                           last_line: this.yylineno+1,\n                           first_column: this.yylloc.last_column,\n                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}\n            this.yytext += match[0];\n            this.match += match[0];\n            this.yyleng = this.yytext.length;\n            this._more = false;\n            this._input = this._input.slice(match[0].length);\n            this.matched += match[0];\n            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);\n            if (this.done && this._input) this.done = false;\n            if (token) return token;\n            else return;\n        }\n        if (this._input === \"\") {\n            return this.EOF;\n        } else {\n            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\\n'+this.showPosition(), \n                    {text: \"\", token: null, line: this.yylineno});\n        }\n    },\nlex:function lex() {\n        var r = this.next();\n        if (typeof r !== 'undefined') {\n            return r;\n        } else {\n            return this.lex();\n        }\n    },\nbegin:function begin(condition) {\n        this.conditionStack.push(condition);\n    },\npopState:function popState() {\n        return this.conditionStack.pop();\n    },\n_currentRules:function _currentRules() {\n        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;\n    },\ntopState:function () {\n        return this.conditionStack[this.conditionStack.length-2];\n    },\npushState:function begin(condition) {\n        this.begin(condition);\n    }});\nlexer.options = {};\nlexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {\n\nvar YYSTATE=YY_START\nswitch($avoiding_name_collisions) {\ncase 0:/* skip whitespace */\nbreak;\ncase 1:return 6\nbreak;\ncase 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4\nbreak;\ncase 3:return 17\nbreak;\ncase 4:return 18\nbreak;\ncase 5:return 23\nbreak;\ncase 6:return 24\nbreak;\ncase 7:return 22\nbreak;\ncase 8:return 21\nbreak;\ncase 9:return 10\nbreak;\ncase 10:return 11\nbreak;\ncase 11:return 8\nbreak;\ncase 12:return 14\nbreak;\ncase 13:return 'INVALID'\nbreak;\n}\n};\nlexer.rules = [/^(?:\\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\\.[0-9]+)?([eE][-+]?[0-9]+)?\\b)/,/^(?:\"(?:\\\\[\\\\\"bfnrt/]|\\\\u[a-fA-F0-9]{4}|[^\\\\\\0-\\x09\\x0a-\\x1f\"])*\")/,/^(?:\\{)/,/^(?:\\})/,/^(?:\\[)/,/^(?:\\])/,/^(?:,)/,/^(?::)/,/^(?:true\\b)/,/^(?:false\\b)/,/^(?:null\\b)/,/^(?:$)/,/^(?:.)/];\nlexer.conditions = {\"INITIAL\":{\"rules\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],\"inclusive\":true}};\n\n\n;\nreturn lexer;})()\nparser.lexer = lexer;\nreturn parser;\n})();\nif (typeof require !== 'undefined' && typeof exports !== 'undefined') {\nexports.parser = jsonlint;\nexports.parse = function () { return jsonlint.parse.apply(jsonlint, arguments); }\nexports.main = function commonjsMain(args) {\n    if (!args[1])\n        throw new Error('Usage: '+args[0]+' FILE');\n    if (typeof process !== 'undefined') {\n        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), \"utf8\");\n    } else {\n        var cwd = require(\"file\").path(require(\"file\").cwd());\n        var source = cwd.join(args[1]).read({charset: \"utf-8\"});\n    }\n    return exports.parser.parse(source);\n}\nif (typeof module !== 'undefined' && require.main === module) {\n  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require(\"system\").args);\n}\n}";
  }, d2zE: function d2zE(e, t, r) {
    "use strict";
    var n = r("mvHQ"),
        i = r.n(n),
        o = r("8U58"),
        l = r.n(o),
        a = r("GUiZ"),
        s = (r.n(a), r("4/hK")),
        c = (r.n(s), r("0tbE")),
        u = (r.n(c), r("5IAE")),
        f = (r.n(u), r("ryyk")),
        d = (r.n(f), r("4IWT"));r.n(d);r("aOjs"), t.a = { name: "jsonEditor", data: function data() {
        return { jsonEditor: !1 };
      }, props: ["value"], watch: { value: function value(e) {
          e !== this.jsonEditor.getValue() && this.jsonEditor.setValue(i()(this.value, null, 2));
        } }, mounted: function mounted() {
        var e = this;this.jsonEditor = l.a.fromTextArea(this.$refs.textarea, { lineNumbers: !0, mode: "application/json", gutters: ["CodeMirror-lint-markers"], theme: "rubyblue", lint: !0 }), this.jsonEditor.setValue(i()(this.value, null, 2)), this.jsonEditor.on("change", function (t) {
          e.$emit("changed", t.getValue()), e.$emit("input", t.getValue());
        });
      }, methods: { getValue: function getValue() {
          return this.jsonEditor.getValue();
        } } };
  }, irzF: function irzF(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, ".cm-s-rubyblue.CodeMirror{background:#112435;color:#fff}.cm-s-rubyblue div.CodeMirror-selected{background:#38566f}.cm-s-rubyblue .CodeMirror-line::selection,.cm-s-rubyblue .CodeMirror-line>span::selection,.cm-s-rubyblue .CodeMirror-line>span>span::selection{background:rgba(56,86,111,.99)}.cm-s-rubyblue .CodeMirror-line::-moz-selection,.cm-s-rubyblue .CodeMirror-line>span::-moz-selection,.cm-s-rubyblue .CodeMirror-line>span>span::-moz-selection{background:rgba(56,86,111,.99)}.cm-s-rubyblue .CodeMirror-gutters{background:#1f4661;border-right:7px solid #3e7087}.cm-s-rubyblue .CodeMirror-guttermarker{color:#fff}.cm-s-rubyblue .CodeMirror-guttermarker-subtle{color:#3e7087}.cm-s-rubyblue .CodeMirror-linenumber{color:#fff}.cm-s-rubyblue .CodeMirror-cursor{border-left:1px solid #fff}.cm-s-rubyblue span.cm-comment{color:#999;font-style:italic;line-height:1em}.cm-s-rubyblue span.cm-atom{color:#f4c20b}.cm-s-rubyblue span.cm-attribute,.cm-s-rubyblue span.cm-number{color:#82c6e0}.cm-s-rubyblue span.cm-keyword{color:#f0f}.cm-s-rubyblue span.cm-string{color:#f08047}.cm-s-rubyblue span.cm-meta{color:#f0f}.cm-s-rubyblue span.cm-tag,.cm-s-rubyblue span.cm-variable-2{color:#7bd827}.cm-s-rubyblue span.cm-def,.cm-s-rubyblue span.cm-variable-3{color:#fff}.cm-s-rubyblue span.cm-bracket{color:#f0f}.cm-s-rubyblue span.cm-link{color:#f4c20b}.cm-s-rubyblue span.CodeMirror-matchingbracket{color:#f0f!important}.cm-s-rubyblue span.cm-builtin,.cm-s-rubyblue span.cm-special{color:#ff9d00}.cm-s-rubyblue span.cm-error{color:#af2018}.cm-s-rubyblue .CodeMirror-activeline-background{background:#173047}", ""]);
  }, jOUq: function jOUq(e, t, r) {
    "use strict";
    function n(e) {
      r("LnSQ");
    }Object.defineProperty(t, "__esModule", { value: !0 });var i = r("HQXN"),
        o = r("OCSE"),
        l = r("VU/8"),
        a = n,
        s = l(i.a, o.a, a, "data-v-8bab9de8", null);t.default = s.exports;
  }, mvHQ: function mvHQ(e, t, r) {
    e.exports = { default: r("Zbun"), __esModule: !0 };
  }, nfUu: function nfUu(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, '.CodeMirror-lint-markers{width:16px}.CodeMirror-lint-tooltip{background-color:#ffd;border:1px solid #000;border-radius:4px 4px 4px 4px;color:#000;font-family:monospace;font-size:10pt;overflow:hidden;padding:2px 5px;position:fixed;white-space:pre;white-space:pre-wrap;z-index:100;max-width:600px;opacity:0;transition:opacity .4s;-moz-transition:opacity .4s;-webkit-transition:opacity .4s;-o-transition:opacity .4s;-ms-transition:opacity .4s}.CodeMirror-lint-mark-error,.CodeMirror-lint-mark-warning{background-position:0 100%;background-repeat:repeat-x}.CodeMirror-lint-mark-error{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==")}.CodeMirror-lint-mark-warning{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=")}.CodeMirror-lint-marker-error,.CodeMirror-lint-marker-warning{background-position:50%;background-repeat:no-repeat;cursor:pointer;display:inline-block;height:16px;width:16px;vertical-align:middle;position:relative}.CodeMirror-lint-message-error,.CodeMirror-lint-message-warning{padding-left:18px;background-position:0 0;background-repeat:no-repeat}.CodeMirror-lint-marker-error,.CodeMirror-lint-message-error{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAHlBMVEW7AAC7AACxAAC7AAC7AAAAAAC4AAC5AAD///+7AAAUdclpAAAABnRSTlMXnORSiwCK0ZKSAAAATUlEQVR42mWPOQ7AQAgDuQLx/z8csYRmPRIFIwRGnosRrpamvkKi0FTIiMASR3hhKW+hAN6/tIWhu9PDWiTGNEkTtIOucA5Oyr9ckPgAWm0GPBog6v4AAAAASUVORK5CYII=")}.CodeMirror-lint-marker-warning,.CodeMirror-lint-message-warning{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEX/uwDvrwD/uwD/uwD/uwD/uwD/uwD/uwD/uwD6twD/uwAAAADurwD2tQD7uAD+ugAAAAD/uwDhmeTRAAAADHRSTlMJ8mN1EYcbmiixgACm7WbuAAAAVklEQVR42n3PUQqAIBBFUU1LLc3u/jdbOJoW1P08DA9Gba8+YWJ6gNJoNYIBzAA2chBth5kLmG9YUoG0NHAUwFXwO9LuBQL1giCQb8gC9Oro2vp5rncCIY8L8uEx5ZkAAAAASUVORK5CYII=")}.CodeMirror-lint-marker-multiple{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAACVBMVEUAAAAAAAC/v7914kyHAAAAAXRSTlMAQObYZgAAACNJREFUeNo1ioEJAAAIwmz/H90iFFSGJgFMe3gaLZ0od+9/AQZ0ADosbYraAAAAAElFTkSuQmCC");background-repeat:no-repeat;background-position:100% 100%;width:100%;height:100%}', ""]);
  }, rdDl: function rdDl(e, t, r) {
    "use strict";
    function n(e) {
      r("61lE");
    }var i = r("d2zE"),
        o = r("ynaI"),
        l = r("VU/8"),
        a = n,
        s = l(i.a, o.a, a, null, null);t.a = s.exports;
  }, ryyk: function ryyk(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";
      function t(t, r) {
        function n(t) {
          if (!i.parentNode) return e.off(document, "mousemove", n);i.style.top = Math.max(0, t.clientY - i.offsetHeight - 5) + "px", i.style.left = t.clientX + 5 + "px";
        }var i = document.createElement("div");return i.className = "CodeMirror-lint-tooltip", i.appendChild(r.cloneNode(!0)), document.body.appendChild(i), e.on(document, "mousemove", n), n(t), null != i.style.opacity && (i.style.opacity = 1), i;
      }function r(e) {
        e.parentNode && e.parentNode.removeChild(e);
      }function n(e) {
        e.parentNode && (null == e.style.opacity && r(e), e.style.opacity = 0, setTimeout(function () {
          r(e);
        }, 600));
      }function i(r, i, o) {
        function l() {
          e.off(o, "mouseout", l), a && (n(a), a = null);
        }var a = t(r, i),
            s = setInterval(function () {
          if (a) for (var e = o;; e = e.parentNode) {
            if (e && 11 == e.nodeType && (e = e.host), e == document.body) return;if (!e) {
              l();break;
            }
          }if (!a) return clearInterval(s);
        }, 400);e.on(o, "mouseout", l);
      }function o(e, t, r) {
        this.marked = [], this.options = t, this.timeout = null, this.hasGutter = r, this.onMouseOver = function (t) {
          v(e, t);
        }, this.waitingFor = 0;
      }function l(e, t) {
        return t instanceof Function ? { getAnnotations: t } : (t && !0 !== t || (t = {}), t);
      }function a(e) {
        var t = e.state.lint;t.hasGutter && e.clearGutter(y);for (var r = 0; r < t.marked.length; ++r) {
          t.marked[r].clear();
        }t.marked.length = 0;
      }function s(t, r, n, o) {
        var l = document.createElement("div"),
            a = l;return l.className = "CodeMirror-lint-marker-" + r, n && (a = l.appendChild(document.createElement("div")), a.className = "CodeMirror-lint-marker-multiple"), 0 != o && e.on(a, "mouseover", function (e) {
          i(e, t, a);
        }), l;
      }function c(e, t) {
        return "error" == e ? e : t;
      }function u(e) {
        for (var t = [], r = 0; r < e.length; ++r) {
          var n = e[r],
              i = n.from.line;(t[i] || (t[i] = [])).push(n);
        }return t;
      }function f(e) {
        var t = e.severity;t || (t = "error");var r = document.createElement("div");return r.className = "CodeMirror-lint-message-" + t, r.appendChild(document.createTextNode(e.message)), r;
      }function d(t, r, n) {
        function i() {
          l = -1, t.off("change", i);
        }var o = t.state.lint,
            l = ++o.waitingFor;t.on("change", i), r(t.getValue(), function (r, n) {
          t.off("change", i), o.waitingFor == l && (n && r instanceof e && (r = n), p(t, r));
        }, n, t);
      }function h(t) {
        var r = t.state.lint,
            n = r.options,
            i = n.options || n,
            o = n.getAnnotations || t.getHelper(e.Pos(0, 0), "lint");if (o) if (n.async || o.async) d(t, o, i);else {
          var l = o(t.getValue(), i, t);if (!l) return;l.then ? l.then(function (e) {
            p(t, e);
          }) : p(t, l);
        }
      }function p(e, t) {
        a(e);for (var r = e.state.lint, n = r.options, i = u(t), o = 0; o < i.length; ++o) {
          var l = i[o];if (l) {
            for (var d = null, h = r.hasGutter && document.createDocumentFragment(), p = 0; p < l.length; ++p) {
              var g = l[p],
                  m = g.severity;m || (m = "error"), d = c(d, m), n.formatAnnotation && (g = n.formatAnnotation(g)), r.hasGutter && h.appendChild(f(g)), g.to && r.marked.push(e.markText(g.from, g.to, { className: "CodeMirror-lint-mark-" + m, __annotation: g }));
            }r.hasGutter && e.setGutterMarker(o, y, s(h, d, l.length > 1, r.options.tooltips));
          }
        }n.onUpdateLinting && n.onUpdateLinting(t, i, e);
      }function g(e) {
        var t = e.state.lint;t && (clearTimeout(t.timeout), t.timeout = setTimeout(function () {
          h(e);
        }, t.options.delay || 500));
      }function m(e, t) {
        for (var r = t.target || t.srcElement, n = document.createDocumentFragment(), o = 0; o < e.length; o++) {
          var l = e[o];n.appendChild(f(l));
        }i(t, n, r);
      }function v(e, t) {
        var r = t.target || t.srcElement;if (/\bCodeMirror-lint-mark-/.test(r.className)) {
          for (var n = r.getBoundingClientRect(), i = (n.left + n.right) / 2, o = (n.top + n.bottom) / 2, l = e.findMarksAt(e.coordsChar({ left: i, top: o }, "client")), a = [], s = 0; s < l.length; ++s) {
            var c = l[s].__annotation;c && a.push(c);
          }a.length && m(a, t);
        }
      }var y = "CodeMirror-lint-markers";e.defineOption("lint", !1, function (t, r, n) {
        if (n && n != e.Init && (a(t), !1 !== t.state.lint.options.lintOnChange && t.off("change", g), e.off(t.getWrapperElement(), "mouseover", t.state.lint.onMouseOver), clearTimeout(t.state.lint.timeout), delete t.state.lint), r) {
          for (var i = t.getOption("gutters"), s = !1, c = 0; c < i.length; ++c) {
            i[c] == y && (s = !0);
          }var u = t.state.lint = new o(t, l(t, r), s);!1 !== u.options.lintOnChange && t.on("change", g), 0 != u.options.tooltips && "gutter" != u.options.tooltips && e.on(t.getWrapperElement(), "mouseover", u.onMouseOver), h(t);
        }
      }), e.defineExtension("performLint", function () {
        this.state.lint && h(this);
      });
    });
  }, ynaI: function ynaI(e, t, r) {
    "use strict";
    var n = function n() {
      var e = this,
          t = e.$createElement,
          r = e._self._c || t;return r("div", { staticClass: "json-editor" }, [r("textarea", { ref: "textarea" })]);
    },
        i = [],
        o = { render: n, staticRenderFns: i };t.a = o;
  } });
//# sourceMappingURL=4.3ab35b5caef90450a052.js.map