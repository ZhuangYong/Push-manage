"use strict";

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _species = require("babel-runtime/core-js/symbol/species");

var _species2 = _interopRequireDefault(_species);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

webpackJsonp([3], { "+/qx": function qx(e, t, r) {
    "use strict";

    var n = r("ZYIx");t.a = { components: { MdEditor: n.a }, data: function data() {
        return { content: "## Simplemde", html: "" };
      }, methods: { markdown2Html: function markdown2Html() {
          var e = this;r.e(56).then(r.bind(null, "HKE2")).then(function (t) {
            var r = new t.Converter();e.html = r.makeHtml(e.content);
          });
        } } };
  }, "+fCR": function fCR(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";

      e.modeInfo = [{ name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"] }, { name: "PGP", mimes: ["application/pgp", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["pgp"] }, { name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"] }, { name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i }, { name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"] }, { name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"] }, { name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"] }, { name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy"] }, { name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp"] }, { name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj", "cljc", "cljx"] }, { name: "ClojureScript", mime: "text/x-clojurescript", mode: "clojure", ext: ["cljs"] }, { name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"] }, { name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists.txt$/ }, { name: "CoffeeScript", mime: "text/x-coffeescript", mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"] }, { name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"] }, { name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"] }, { name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"] }, { name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"] }, { name: "CSS", mime: "text/css", mode: "css", ext: ["css"] }, { name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"] }, { name: "D", mime: "text/x-d", mode: "d", ext: ["d"] }, { name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"] }, { name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"] }, { name: "Django", mime: "text/x-django", mode: "django" }, { name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/ }, { name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"] }, { name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"] }, { name: "EBNF", mime: "text/x-ebnf", mode: "ebnf" }, { name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"] }, { name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"] }, { name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"] }, { name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"] }, { name: "Embedded Javascript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"] }, { name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"] }, { name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"] }, { name: "Factor", mime: "text/x-factor", mode: "factor", ext: ["factor"] }, { name: "FCL", mime: "text/x-fcl", mode: "fcl" }, { name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"] }, { name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90"] }, { name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"] }, { name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"] }, { name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"] }, { name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history).md$/i }, { name: "Go", mime: "text/x-go", mode: "go", ext: ["go"] }, { name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy", "gradle"], file: /^Jenkinsfile$/ }, { name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"] }, { name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"] }, { name: "Haskell (Literate)", mime: "text/x-literate-haskell", mode: "haskell-literate", ext: ["lhs"] }, { name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"] }, { name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"] }, { name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"] }, { name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm"], alias: ["xhtml"] }, { name: "HTTP", mime: "message/http", mode: "http" }, { name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"] }, { name: "Pug", mime: "text/x-pug", mode: "pug", ext: ["jade", "pug"], alias: ["jade"] }, { name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"] }, { name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"] }, { name: "JavaScript", mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"], mode: "javascript", ext: ["js"], alias: ["ecmascript", "js", "node"] }, { name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"] }, { name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"] }, { name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"] }, { name: "Jinja2", mime: "null", mode: "jinja2" }, { name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"] }, { name: "Kotlin", mime: "text/x-kotlin", mode: "clike", ext: ["kt"] }, { name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"] }, { name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"] }, { name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"] }, { name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"] }, { name: "mIRC", mime: "text/mirc", mode: "mirc" }, { name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql" }, { name: "Mathematica", mime: "text/x-mathematica", mode: "mathematica", ext: ["m", "nb"] }, { name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"] }, { name: "MUMPS", mime: "text/x-mumps", mode: "mumps", ext: ["mps"] }, { name: "MS SQL", mime: "text/x-mssql", mode: "sql" }, { name: "mbox", mime: "application/mbox", mode: "mbox", ext: ["mbox"] }, { name: "MySQL", mime: "text/x-mysql", mode: "sql" }, { name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i }, { name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"] }, { name: "NTriples", mime: "text/n-triples", mode: "ntriples", ext: ["nt"] }, { name: "Objective C", mime: "text/x-objectivec", mode: "clike", ext: ["m", "mm"], alias: ["objective-c", "objc"] }, { name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"] }, { name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"] }, { name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"] }, { name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"] }, { name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"] }, { name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"] }, { name: "PHP", mime: "application/x-httpd-php", mode: "php", ext: ["php", "php3", "php4", "php5", "phtml"] }, { name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"] }, { name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"] }, { name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"] }, { name: "PowerShell", mime: "application/x-powershell", mode: "powershell", ext: ["ps1", "psd1", "psm1"] }, { name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"] }, { name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"] }, { name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/ }, { name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"] }, { name: "Q", mime: "text/x-q", mode: "q", ext: ["q"] }, { name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r", "R"], alias: ["rscript"] }, { name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"] }, { name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm" }, { name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"] }, { name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"] }, { name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"] }, { name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"] }, { name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"] }, { name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"] }, { name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"] }, { name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"] }, { name: "Shell", mime: "text/x-sh", mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"], file: /^PKGBUILD$/ }, { name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"] }, { name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"] }, { name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"] }, { name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"] }, { name: "Solr", mime: "text/x-solr", mode: "solr" }, { name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"] }, { name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"] }, { name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"] }, { name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"] }, { name: "SQLite", mime: "text/x-sqlite", mode: "sql" }, { name: "Squirrel", mime: "text/x-squirrel", mode: "clike", ext: ["nut"] }, { name: "Stylus", mime: "text/x-styl", mode: "stylus", ext: ["styl"] }, { name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"] }, { name: "sTeX", mime: "text/x-stex", mode: "stex" }, { name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx"], alias: ["tex"] }, { name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v"] }, { name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"] }, { name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"] }, { name: "TiddlyWiki ", mime: "text/x-tiddlywiki", mode: "tiddlywiki" }, { name: "Tiki wiki", mime: "text/tiki", mode: "tiki" }, { name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"] }, { name: "Tornado", mime: "text/x-tornado", mode: "tornado" }, { name: "troff", mime: "text/troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }, { name: "TTCN", mime: "text/x-ttcn", mode: "ttcn", ext: ["ttcn", "ttcn3", "ttcnpp"] }, { name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"] }, { name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"] }, { name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"] }, { name: "TypeScript-JSX", mime: "text/typescript-jsx", mode: "jsx", ext: ["tsx"], alias: ["tsx"] }, { name: "Twig", mime: "text/x-twig", mode: "twig" }, { name: "Web IDL", mime: "text/x-webidl", mode: "webidl", ext: ["webidl"] }, { name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"] }, { name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"] }, { name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"] }, { name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"] }, { name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"] }, { name: "Vue.js Component", mimes: ["script/x-vue", "text/x-vue"], mode: "vue", ext: ["vue"] }, { name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd", "svg"], alias: ["rss", "wsdl", "xsd"] }, { name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"] }, { name: "Yacas", mime: "text/x-yacas", mode: "yacas", ext: ["ys"] }, { name: "YAML", mimes: ["text/x-yaml", "text/yaml"], mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"] }, { name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"] }, { name: "mscgen", mime: "text/x-mscgen", mode: "mscgen", ext: ["mscgen", "mscin", "msc"] }, { name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"] }, { name: "msgenny", mime: "text/x-msgenny", mode: "mscgen", ext: ["msgenny"] }];for (var t = 0; t < e.modeInfo.length; t++) {
        var r = e.modeInfo[t];r.mimes && (r.mime = r.mimes[0]);
      }e.findModeByMIME = function (t) {
        t = t.toLowerCase();for (var r = 0; r < e.modeInfo.length; r++) {
          var n = e.modeInfo[r];if (n.mime == t) return n;if (n.mimes) for (var i = 0; i < n.mimes.length; i++) {
            if (n.mimes[i] == t) return n;
          }
        }return (/\+xml$/.test(t) ? e.findModeByMIME("application/xml") : /\+json$/.test(t) ? e.findModeByMIME("application/json") : void 0
        );
      }, e.findModeByExtension = function (t) {
        for (var r = 0; r < e.modeInfo.length; r++) {
          var n = e.modeInfo[r];if (n.ext) for (var i = 0; i < n.ext.length; i++) {
            if (n.ext[i] == t) return n;
          }
        }
      }, e.findModeByFileName = function (t) {
        for (var r = 0; r < e.modeInfo.length; r++) {
          var n = e.modeInfo[r];if (n.file && n.file.test(t)) return n;
        }var i = t.lastIndexOf("."),
            o = i > -1 && t.substring(i + 1, t.length);if (o) return e.findModeByExtension(o);
      }, e.findModeByName = function (t) {
        t = t.toLowerCase();for (var r = 0; r < e.modeInfo.length; r++) {
          var n = e.modeInfo[r];if (n.name.toLowerCase() == t) return n;if (n.alias) for (var i = 0; i < n.alias.length; i++) {
            if (n.alias[i].toLowerCase() == t) return n;
          }
        }
      };
    });
  }, "34l8": function l8(e, t, r) {
    var n = r("xxKP");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("dcd3b490", n, !0);
  }, 4: function _(e, t) {}, "45G4": function G4(e, t, r) {
    (function (t, n) {
      var i;!function () {
        "use strict";

        i = function i(e, r, n, _i2) {
          function o(e, t) {
            var r = p._readFile(e, null, _i2.asyncLoad);_i2.asyncLoad ? r.then(function (e) {
              t(e);
            }) : t(r);
          }function a(e) {
            r = e, n && s();
          }function l(e) {
            n = e, r && s();
          }function s() {
            for (p.rules = p._parseAFF(r), p.compoundRuleCodes = {}, u = 0, f = p.compoundRules.length; u < f; u++) {
              var e = p.compoundRules[u];for (d = 0, h = e.length; d < h; d++) {
                p.compoundRuleCodes[e[d]] = [];
              }
            }"ONLYINCOMPOUND" in p.flags && (p.compoundRuleCodes[p.flags.ONLYINCOMPOUND] = []), p.dictionaryTable = p._parseDIC(n);for (u in p.compoundRuleCodes) {
              0 === p.compoundRuleCodes[u].length && delete p.compoundRuleCodes[u];
            }for (u = 0, f = p.compoundRules.length; u < f; u++) {
              var t = p.compoundRules[u],
                  o = "";for (d = 0, h = t.length; d < h; d++) {
                var a = t[d];a in p.compoundRuleCodes ? o += "(" + p.compoundRuleCodes[a].join("|") + ")" : o += a;
              }p.compoundRules[u] = new RegExp(o, "i");
            }p.loaded = !0, _i2.asyncLoad && _i2.loadedCallback && _i2.loadedCallback(p);
          }_i2 = _i2 || {}, this.dictionary = null, this.rules = {}, this.dictionaryTable = {}, this.compoundRules = [], this.compoundRuleCodes = {}, this.replacementTable = [], this.flags = _i2.flags || {}, this.memoized = {}, this.loaded = !1;var c,
              u,
              d,
              f,
              h,
              p = this;return e && (p.dictionary = e, r && n ? s() : "undefined" != typeof window && "chrome" in window && "extension" in window.chrome && "getURL" in window.chrome.extension ? (c = _i2.dictionaryPath ? _i2.dictionaryPath : "typo/dictionaries", r || o(chrome.extension.getURL(c + "/" + e + "/" + e + ".aff"), a), n || o(chrome.extension.getURL(c + "/" + e + "/" + e + ".dic"), l)) : (c = _i2.dictionaryPath ? _i2.dictionaryPath : t + "/dictionaries", r || o(c + "/" + e + "/" + e + ".aff", a), n || o(c + "/" + e + "/" + e + ".dic", l))), this;
        }, i.prototype = { load: function load(e) {
            for (var t in e) {
              e.hasOwnProperty(t) && (this[t] = e[t]);
            }return this;
          }, _readFile: function _readFile(e, t, i) {
            if (t = t || "utf8", "undefined" != typeof XMLHttpRequest) {
              var o,
                  a = new XMLHttpRequest();return a.open("GET", e, i), i && (o = new _promise2.default(function (e, t) {
                a.onload = function () {
                  200 === a.status ? e(a.responseText) : t(a.statusText);
                }, a.onerror = function () {
                  t(a.statusText);
                };
              })), a.overrideMimeType && a.overrideMimeType("text/plain; charset=" + t), a.send(null), i ? o : a.responseText;
            }var l = r(4);try {
              if (l.existsSync(e)) {
                var s = l.statSync(e),
                    c = l.openSync(e, "r"),
                    u = new n(s.size);return l.readSync(c, u, 0, u.length, null), u.toString(t, 0, u.length);
              }console.log("Path " + e + " does not exist.");
            } catch (e) {
              return console.log(e), "";
            }
          }, _parseAFF: function _parseAFF(e) {
            var t,
                r,
                n,
                i,
                o,
                a,
                l,
                s,
                c = {};e = this._removeAffixComments(e);var u = e.split("\n");for (o = 0, l = u.length; o < l; o++) {
              t = u[o];var d = t.split(/\s+/),
                  f = d[0];if ("PFX" == f || "SFX" == f) {
                var h = d[1],
                    p = d[2];n = parseInt(d[3], 10);var m = [];for (a = o + 1, s = o + 1 + n; a < s; a++) {
                  r = u[a], i = r.split(/\s+/);var g = i[2],
                      v = i[3].split("/"),
                      y = v[0];"0" === y && (y = "");var x = this.parseRuleCodes(v[1]),
                      b = i[4],
                      w = {};w.add = y, x.length > 0 && (w.continuationClasses = x), "." !== b && (w.match = "SFX" === f ? new RegExp(b + "$") : new RegExp("^" + b)), "0" != g && (w.remove = "SFX" === f ? new RegExp(g + "$") : g), m.push(w);
                }c[h] = { type: f, combineable: "Y" == p, entries: m }, o += n;
              } else if ("COMPOUNDRULE" === f) {
                for (n = parseInt(d[1], 10), a = o + 1, s = o + 1 + n; a < s; a++) {
                  t = u[a], i = t.split(/\s+/), this.compoundRules.push(i[1]);
                }o += n;
              } else "REP" === f ? (i = t.split(/\s+/), 3 === i.length && this.replacementTable.push([i[1], i[2]])) : this.flags[f] = d[1];
            }return c;
          }, _removeAffixComments: function _removeAffixComments(e) {
            return e = e.replace(/^\s*#.*$/gm, ""), e = e.replace(/^\s\s*/m, "").replace(/\s\s*$/m, ""), e = e.replace(/\n{2,}/g, "\n"), e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
          }, _parseDIC: function _parseDIC(e) {
            function t(e, t) {
              n.hasOwnProperty(e) || (n[e] = null), t.length > 0 && (null === n[e] && (n[e] = []), n[e].push(t));
            }e = this._removeDicComments(e);for (var r = e.split("\n"), n = {}, i = 1, o = r.length; i < o; i++) {
              var a = r[i],
                  l = a.split("/", 2),
                  s = l[0];if (l.length > 1) {
                var c = this.parseRuleCodes(l[1]);"NEEDAFFIX" in this.flags && -1 != c.indexOf(this.flags.NEEDAFFIX) || t(s, c);for (var u = 0, d = c.length; u < d; u++) {
                  var f = c[u],
                      h = this.rules[f];if (h) for (var p = this._applyRule(s, h), m = 0, g = p.length; m < g; m++) {
                    var v = p[m];if (t(v, []), h.combineable) for (var y = u + 1; y < d; y++) {
                      var x = c[y],
                          b = this.rules[x];if (b && b.combineable && h.type != b.type) for (var w = this._applyRule(v, b), k = 0, C = w.length; k < C; k++) {
                        var S = w[k];t(S, []);
                      }
                    }
                  }f in this.compoundRuleCodes && this.compoundRuleCodes[f].push(s);
                }
              } else t(s.trim(), []);
            }return n;
          }, _removeDicComments: function _removeDicComments(e) {
            return e = e.replace(/^\t.*$/gm, "");
          }, parseRuleCodes: function parseRuleCodes(e) {
            if (!e) return [];if (!("FLAG" in this.flags)) return e.split("");if ("long" === this.flags.FLAG) {
              for (var t = [], r = 0, n = e.length; r < n; r += 2) {
                t.push(e.substr(r, 2));
              }return t;
            }return "num" === this.flags.FLAG ? e.split(",") : void 0;
          }, _applyRule: function _applyRule(e, t) {
            for (var r = t.entries, n = [], i = 0, o = r.length; i < o; i++) {
              var a = r[i];if (!a.match || e.match(a.match)) {
                var l = e;if (a.remove && (l = l.replace(a.remove, "")), "SFX" === t.type ? l += a.add : l = a.add + l, n.push(l), "continuationClasses" in a) for (var s = 0, c = a.continuationClasses.length; s < c; s++) {
                  var u = this.rules[a.continuationClasses[s]];u && (n = n.concat(this._applyRule(l, u)));
                }
              }
            }return n;
          }, check: function check(e) {
            if (!this.loaded) throw "Dictionary not loaded.";var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");if (this.checkExact(t)) return !0;if (t.toUpperCase() === t) {
              var r = t[0] + t.substring(1).toLowerCase();if (this.hasFlag(r, "KEEPCASE")) return !1;if (this.checkExact(r)) return !0;
            }var n = t.toLowerCase();if (n !== t) {
              if (this.hasFlag(n, "KEEPCASE")) return !1;if (this.checkExact(n)) return !0;
            }return !1;
          }, checkExact: function checkExact(e) {
            if (!this.loaded) throw "Dictionary not loaded.";var t,
                r,
                n = this.dictionaryTable[e];if (void 0 === n) {
              if ("COMPOUNDMIN" in this.flags && e.length >= this.flags.COMPOUNDMIN) for (t = 0, r = this.compoundRules.length; t < r; t++) {
                if (e.match(this.compoundRules[t])) return !0;
              }
            } else {
              if (null === n) return !0;if ("object" == (typeof n === "undefined" ? "undefined" : (0, _typeof3.default)(n))) for (t = 0, r = n.length; t < r; t++) {
                if (!this.hasFlag(e, "ONLYINCOMPOUND", n[t])) return !0;
              }
            }return !1;
          }, hasFlag: function hasFlag(e, t, r) {
            if (!this.loaded) throw "Dictionary not loaded.";return !!(t in this.flags && (void 0 === r && (r = Array.prototype.concat.apply([], this.dictionaryTable[e])), r && -1 !== r.indexOf(this.flags[t])));
          }, alphabet: "", suggest: function suggest(e, t) {
            function r(e) {
              var t,
                  r,
                  n,
                  i,
                  o,
                  a,
                  l = [];for (t = 0, i = e.length; t < i; t++) {
                var s = e[t];for (r = 0, o = s.length + 1; r < o; r++) {
                  var u = [s.substring(0, r), s.substring(r)];if (u[1] && l.push(u[0] + u[1].substring(1)), u[1].length > 1 && u[1][1] !== u[1][0] && l.push(u[0] + u[1][1] + u[1][0] + u[1].substring(2)), u[1]) for (n = 0, a = c.alphabet.length; n < a; n++) {
                    c.alphabet[n] != u[1].substring(0, 1) && l.push(u[0] + c.alphabet[n] + u[1].substring(1));
                  }if (u[1]) for (n = 0, a = c.alphabet.length; n < a; n++) {
                    l.push(u[0] + c.alphabet[n] + u[1]);
                  }
                }
              }return l;
            }function n(e) {
              for (var t = [], r = 0, n = e.length; r < n; r++) {
                c.check(e[r]) && t.push(e[r]);
              }return t;
            }if (!this.loaded) throw "Dictionary not loaded.";if (t = t || 5, this.memoized.hasOwnProperty(e)) {
              var i = this.memoized[e].limit;if (t <= i || this.memoized[e].suggestions.length < i) return this.memoized[e].suggestions.slice(0, t);
            }if (this.check(e)) return [];for (var o = 0, a = this.replacementTable.length; o < a; o++) {
              var l = this.replacementTable[o];if (-1 !== e.indexOf(l[0])) {
                var s = e.replace(l[0], l[1]);if (this.check(s)) return [s];
              }
            }var c = this;return c.alphabet = "abcdefghijklmnopqrstuvwxyz", this.memoized[e] = { suggestions: function (e) {
                function i(e, t) {
                  return e[1] < t[1] ? -1 : 1;
                }var o,
                    a,
                    l = r([e]),
                    s = r(l),
                    u = n(l.concat(s)),
                    d = {};for (o = 0, a = u.length; o < a; o++) {
                  u[o] in d ? d[u[o]] += 1 : d[u[o]] = 1;
                }var f = [];for (o in d) {
                  d.hasOwnProperty(o) && f.push([o, d[o]]);
                }f.sort(i).reverse();var h = [],
                    p = "lowercase";for (e.toUpperCase() === e ? p = "uppercase" : e.substr(0, 1).toUpperCase() + e.substr(1).toLowerCase() === e && (p = "capitalized"), o = 0, a = Math.min(t, f.length); o < a; o++) {
                  "uppercase" === p ? f[o][0] = f[o][0].toUpperCase() : "capitalized" === p && (f[o][0] = f[o][0].substr(0, 1).toUpperCase() + f[o][0].substr(1)), c.hasFlag(f[o][0], "NOSUGGEST") || h.push(f[o][0]);
                }return h;
              }(e), limit: t }, this.memoized[e].suggestions;
          } };
      }(), e.exports = i;
    }).call(t, "/", r("EuP9").Buffer);
  }, "5x2J": function x2J(e, t, r) {
    "use strict";

    function n(e) {
      return e = j ? e.replace("Ctrl", "Cmd") : e.replace("Cmd", "Ctrl");
    }function i(e, t, r) {
      e = e || {};var n = document.createElement("a");return t = void 0 == t || t, e.title && t && (n.title = a(e.title, e.action, r), j && (n.title = n.title.replace("Ctrl", "⌘"), n.title = n.title.replace("Alt", "⌥"))), n.tabIndex = -1, n.className = e.className, n;
    }function o() {
      var e = document.createElement("i");return e.className = "separator", e.innerHTML = "|", e;
    }function a(e, t, r) {
      var i,
          o = e;return t && (i = $(t), r[i] && (o += " (" + n(r[i]) + ")")), o;
    }function l(e, t) {
      t = t || e.getCursor("start");var r = e.getTokenAt(t);if (!r.type) return {};for (var n, i, o = r.type.split(" "), a = {}, l = 0; l < o.length; l++) {
        n = o[l], "strong" === n ? a.bold = !0 : "variable-2" === n ? (i = e.getLine(t.line), /^\s*\d+\.\s/.test(i) ? a["ordered-list"] = !0 : a["unordered-list"] = !0) : "atom" === n ? a.quote = !0 : "em" === n ? a.italic = !0 : "quote" === n ? a.quote = !0 : "strikethrough" === n ? a.strikethrough = !0 : "comment" === n ? a.code = !0 : "link" === n ? a.link = !0 : "tag" === n ? a.image = !0 : n.match(/^header(\-[1-6])?$/) && (a[n.replace("header", "heading")] = !0);
      }return a;
    }function s(e) {
      var t = e.codemirror;t.setOption("fullScreen", !t.getOption("fullScreen")), t.getOption("fullScreen") ? (V = document.body.style.overflow, document.body.style.overflow = "hidden") : document.body.style.overflow = V;var r = t.getWrapperElement();/fullscreen/.test(r.previousSibling.className) ? r.previousSibling.className = r.previousSibling.className.replace(/\s*fullscreen\b/, "") : r.previousSibling.className += " fullscreen";var n = e.toolbarElements.fullscreen;/active/.test(n.className) ? n.className = n.className.replace(/\s*active\s*/g, "") : n.className += " active", /editor-preview-active-side/.test(t.getWrapperElement().nextSibling.className) && N(e);
    }function c(e) {
      R(e, "bold", e.options.blockStyles.bold);
    }function u(e) {
      R(e, "italic", e.options.blockStyles.italic);
    }function d(e) {
      R(e, "strikethrough", "~~");
    }function f(e) {
      function t(e) {
        if ("object" != (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e))) throw "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) + ": " + e;return e.styles && e.styles[2] && -1 !== e.styles[2].indexOf("formatting-code-block");
      }function r(e) {
        return e.state.base.base || e.state.base;
      }function n(e, n, i, o, a) {
        i = i || e.getLineHandle(n), o = o || e.getTokenAt({ line: n, ch: 1 }), a = a || !!i.text && e.getTokenAt({ line: n, ch: i.text.length - 1 });var l = o.type ? o.type.split(" ") : [];return a && r(a).indentedCode ? "indented" : -1 !== l.indexOf("comment") && (r(o).fencedChars || r(a).fencedChars || t(i) ? "fenced" : "single");
      }var i,
          o,
          a,
          l = e.options.blockStyles.code,
          s = e.codemirror,
          c = s.getCursor("start"),
          u = s.getCursor("end"),
          d = s.getTokenAt({ line: c.line, ch: c.ch || 1 }),
          f = s.getLineHandle(c.line),
          h = n(s, c.line, f, d);if ("single" === h) {
        var p = f.text.slice(0, c.ch).replace("`", ""),
            m = f.text.slice(c.ch).replace("`", "");s.replaceRange(p + m, { line: c.line, ch: 0 }, { line: c.line, ch: 99999999999999 }), c.ch--, c !== u && u.ch--, s.setSelection(c, u), s.focus();
      } else if ("fenced" === h) {
        if (c.line !== u.line || c.ch !== u.ch) {
          for (i = c.line; i >= 0 && (f = s.getLineHandle(i), !t(f)); i--) {}var g,
              v,
              y,
              x,
              b = s.getTokenAt({ line: i, ch: 1 }),
              w = r(b).fencedChars;t(s.getLineHandle(c.line)) ? (g = "", v = c.line) : t(s.getLineHandle(c.line - 1)) ? (g = "", v = c.line - 1) : (g = w + "\n", v = c.line), t(s.getLineHandle(u.line)) ? (y = "", x = u.line, 0 === u.ch && (x += 1)) : 0 !== u.ch && t(s.getLineHandle(u.line + 1)) ? (y = "", x = u.line + 1) : (y = w + "\n", x = u.line + 1), 0 === u.ch && (x -= 1), s.operation(function () {
            s.replaceRange(y, { line: x, ch: 0 }, { line: x + (y ? 0 : 1), ch: 0 }), s.replaceRange(g, { line: v, ch: 0 }, { line: v + (g ? 0 : 1), ch: 0 });
          }), s.setSelection({ line: v + (g ? 1 : 0), ch: 0 }, { line: x + (g ? 1 : -1), ch: 0 }), s.focus();
        } else {
          var k = c.line;if (t(s.getLineHandle(c.line)) && ("fenced" === n(s, c.line + 1) ? (i = c.line, k = c.line + 1) : (o = c.line, k = c.line - 1)), void 0 === i) for (i = k; i >= 0 && (f = s.getLineHandle(i), !t(f)); i--) {}if (void 0 === o) for (a = s.lineCount(), o = k; o < a && (f = s.getLineHandle(o), !t(f)); o++) {}s.operation(function () {
            s.replaceRange("", { line: i, ch: 0 }, { line: i + 1, ch: 0 }), s.replaceRange("", { line: o - 1, ch: 0 }, { line: o, ch: 0 });
          }), s.focus();
        }
      } else if ("indented" === h) {
        if (c.line !== u.line || c.ch !== u.ch) i = c.line, o = u.line, 0 === u.ch && o--;else {
          for (i = c.line; i >= 0; i--) {
            if (f = s.getLineHandle(i), !f.text.match(/^\s*$/) && "indented" !== n(s, i, f)) {
              i += 1;break;
            }
          }for (a = s.lineCount(), o = c.line; o < a; o++) {
            if (f = s.getLineHandle(o), !f.text.match(/^\s*$/) && "indented" !== n(s, o, f)) {
              o -= 1;break;
            }
          }
        }var C = s.getLineHandle(o + 1),
            S = C && s.getTokenAt({ line: o + 1, ch: C.text.length - 1 }),
            M = S && r(S).indentedCode;M && s.replaceRange("\n", { line: o + 1, ch: 0 });for (var L = i; L <= o; L++) {
          s.indentLine(L, "subtract");
        }s.focus();
      } else {
        var T = c.line === u.line && c.ch === u.ch && 0 === c.ch,
            N = c.line !== u.line;T || N ? function (e, t, r, n) {
          var i = t.line + 1,
              o = r.line + 1,
              a = t.line !== r.line,
              l = n + "\n",
              s = "\n" + n;a && o++, a && 0 === r.ch && (s = n + "\n", o--), E(e, !1, [l, s]), e.setSelection({ line: i, ch: 0 }, { line: o, ch: 0 });
        }(s, c, u, l) : E(s, !1, ["`", "`"]);
      }
    }function h(e) {
      I(e.codemirror, "quote");
    }function p(e) {
      O(e.codemirror, "smaller");
    }function m(e) {
      O(e.codemirror, "bigger");
    }function g(e) {
      O(e.codemirror, void 0, 1);
    }function v(e) {
      O(e.codemirror, void 0, 2);
    }function y(e) {
      O(e.codemirror, void 0, 3);
    }function x(e) {
      I(e.codemirror, "unordered-list");
    }function b(e) {
      I(e.codemirror, "ordered-list");
    }function w(e) {
      P(e.codemirror);
    }function k(e) {
      var t = e.codemirror,
          r = l(t),
          n = e.options,
          i = "http://";if (n.promptURLs && !(i = prompt(n.promptTexts.link))) return !1;E(t, r.link, n.insertTexts.link, i);
    }function C(e) {
      var t = e.codemirror,
          r = l(t),
          n = e.options,
          i = "http://";if (n.promptURLs && !(i = prompt(n.promptTexts.image))) return !1;E(t, r.image, n.insertTexts.image, i);
    }function S(e) {
      var t = e.codemirror,
          r = l(t),
          n = e.options;E(t, r.table, n.insertTexts.table);
    }function M(e) {
      var t = e.codemirror,
          r = l(t),
          n = e.options;E(t, r.image, n.insertTexts.horizontalRule);
    }function L(e) {
      var t = e.codemirror;t.undo(), t.focus();
    }function T(e) {
      var t = e.codemirror;t.redo(), t.focus();
    }function N(e) {
      var t = e.codemirror,
          r = t.getWrapperElement(),
          n = r.nextSibling,
          i = e.toolbarElements["side-by-side"],
          o = !1;/editor-preview-active-side/.test(n.className) ? (n.className = n.className.replace(/\s*editor-preview-active-side\s*/g, ""), i.className = i.className.replace(/\s*active\s*/g, ""), r.className = r.className.replace(/\s*CodeMirror-sided\s*/g, " ")) : (setTimeout(function () {
        t.getOption("fullScreen") || s(e), n.className += " editor-preview-active-side";
      }, 1), i.className += " active", r.className += " CodeMirror-sided", o = !0);var a = r.lastChild;if (/editor-preview-active/.test(a.className)) {
        a.className = a.className.replace(/\s*editor-preview-active\s*/g, "");var l = e.toolbarElements.preview,
            c = r.previousSibling;l.className = l.className.replace(/\s*active\s*/g, ""), c.className = c.className.replace(/\s*disabled-for-preview*/g, "");
      }var u = function u() {
        n.innerHTML = e.options.previewRender(e.value(), n);
      };t.sideBySideRenderingFunction || (t.sideBySideRenderingFunction = u), o ? (n.innerHTML = e.options.previewRender(e.value(), n), t.on("update", t.sideBySideRenderingFunction)) : t.off("update", t.sideBySideRenderingFunction), t.refresh();
    }function A(e) {
      var t = e.codemirror,
          r = t.getWrapperElement(),
          n = r.previousSibling,
          i = !!e.options.toolbar && e.toolbarElements.preview,
          o = r.lastChild;o && /editor-preview/.test(o.className) || (o = document.createElement("div"), o.className = "editor-preview", r.appendChild(o)), /editor-preview-active/.test(o.className) ? (o.className = o.className.replace(/\s*editor-preview-active\s*/g, ""), i && (i.className = i.className.replace(/\s*active\s*/g, ""), n.className = n.className.replace(/\s*disabled-for-preview*/g, ""))) : (setTimeout(function () {
        o.className += " editor-preview-active";
      }, 1), i && (i.className += " active", n.className += " disabled-for-preview")), o.innerHTML = e.options.previewRender(e.value(), o), /editor-preview-active-side/.test(t.getWrapperElement().nextSibling.className) && N(e);
    }function E(e, t, r, n) {
      if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
        var i,
            o = r[0],
            a = r[1],
            l = e.getCursor("start"),
            s = e.getCursor("end");n && (a = a.replace("#url#", n)), t ? (i = e.getLine(l.line), o = i.slice(0, l.ch), a = i.slice(l.ch), e.replaceRange(o + a, { line: l.line, ch: 0 })) : (i = e.getSelection(), e.replaceSelection(o + i + a), l.ch += o.length, l !== s && (s.ch += o.length)), e.setSelection(l, s), e.focus();
      }
    }function O(e, t, r) {
      if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
        for (var n = e.getCursor("start"), i = e.getCursor("end"), o = n.line; o <= i.line; o++) {
          !function (n) {
            var i = e.getLine(n),
                o = i.search(/[^#]/);i = void 0 !== t ? o <= 0 ? "bigger" == t ? "###### " + i : "# " + i : 6 == o && "smaller" == t ? i.substr(7) : 1 == o && "bigger" == t ? i.substr(2) : "bigger" == t ? i.substr(1) : "#" + i : 1 == r ? o <= 0 ? "# " + i : o == r ? i.substr(o + 1) : "# " + i.substr(o + 1) : 2 == r ? o <= 0 ? "## " + i : o == r ? i.substr(o + 1) : "## " + i.substr(o + 1) : o <= 0 ? "### " + i : o == r ? i.substr(o + 1) : "### " + i.substr(o + 1), e.replaceRange(i, { line: n, ch: 0 }, { line: n, ch: 99999999999999 });
          }(o);
        }e.focus();
      }
    }function I(e, t) {
      if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) {
        for (var r = l(e), n = e.getCursor("start"), i = e.getCursor("end"), o = { quote: /^(\s*)\>\s+/, "unordered-list": /^(\s*)(\*|\-|\+)\s+/, "ordered-list": /^(\s*)\d+\.\s+/ }, a = { quote: "> ", "unordered-list": "* ", "ordered-list": "1. " }, s = n.line; s <= i.line; s++) {
          !function (n) {
            var i = e.getLine(n);i = r[t] ? i.replace(o[t], "$1") : a[t] + i, e.replaceRange(i, { line: n, ch: 0 }, { line: n, ch: 99999999999999 });
          }(s);
        }e.focus();
      }
    }function R(e, t, r, n) {
      if (!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)) {
        n = void 0 === n ? r : n;var i,
            o = e.codemirror,
            a = l(o),
            s = r,
            c = n,
            u = o.getCursor("start"),
            d = o.getCursor("end");a[t] ? (i = o.getLine(u.line), s = i.slice(0, u.ch), c = i.slice(u.ch), "bold" == t ? (s = s.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, ""), c = c.replace(/(\*\*|__)/, "")) : "italic" == t ? (s = s.replace(/(\*|_)(?![\s\S]*(\*|_))/, ""), c = c.replace(/(\*|_)/, "")) : "strikethrough" == t && (s = s.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, ""), c = c.replace(/(\*\*|~~)/, "")), o.replaceRange(s + c, { line: u.line, ch: 0 }, { line: u.line, ch: 99999999999999 }), "bold" == t || "strikethrough" == t ? (u.ch -= 2, u !== d && (d.ch -= 2)) : "italic" == t && (u.ch -= 1, u !== d && (d.ch -= 1))) : (i = o.getSelection(), "bold" == t ? (i = i.split("**").join(""), i = i.split("__").join("")) : "italic" == t ? (i = i.split("*").join(""), i = i.split("_").join("")) : "strikethrough" == t && (i = i.split("~~").join("")), o.replaceSelection(s + i + c), u.ch += r.length, d.ch = u.ch + i.length), o.setSelection(u, d), o.focus();
      }
    }function P(e) {
      if (!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)) for (var t, r = e.getCursor("start"), n = e.getCursor("end"), i = r.line; i <= n.line; i++) {
        t = e.getLine(i), t = t.replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/, ""), e.replaceRange(t, { line: i, ch: 0 }, { line: i, ch: 99999999999999 });
      }
    }function D(e, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (t[r] instanceof Array ? e[r] = t[r].concat(e[r] instanceof Array ? e[r] : []) : null !== t[r] && "object" == (0, _typeof3.default)(t[r]) && t[r].constructor === Object ? e[r] = D(e[r] || {}, t[r]) : e[r] = t[r]);
      }return e;
    }function H(e) {
      for (var t = 1; t < arguments.length; t++) {
        e = D(e, arguments[t]);
      }return e;
    }function z(e) {
      var t = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,
          r = e.match(t),
          n = 0;if (null === r) return n;for (var i = 0; i < r.length; i++) {
        r[i].charCodeAt(0) >= 19968 ? n += r[i].length : n += 1;
      }return n;
    }function _(e) {
      e = e || {}, e.parent = this;var t = !0;if (!1 === e.autoDownloadFontAwesome && (t = !1), !0 !== e.autoDownloadFontAwesome) for (var r = document.styleSheets, n = 0; n < r.length; n++) {
        r[n].href && r[n].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1 && (t = !1);
      }if (t) {
        var i = document.createElement("link");i.rel = "stylesheet", i.href = "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css", document.getElementsByTagName("head")[0].appendChild(i);
      }if (e.element) this.element = e.element;else if (null === e.element) return void console.log("SimpleMDE: Error. No element was found.");if (void 0 === e.toolbar) {
        e.toolbar = [];for (var o in K) {
          K.hasOwnProperty(o) && (-1 != o.indexOf("separator-") && e.toolbar.push("|"), (!0 === K[o].default || e.showIcons && e.showIcons.constructor === Array && -1 != e.showIcons.indexOf(o)) && e.toolbar.push(o));
        }
      }e.hasOwnProperty("status") || (e.status = ["autosave", "lines", "words", "cursor"]), e.previewRender || (e.previewRender = function (e) {
        return this.parent.markdown(e);
      }), e.parsingConfig = H({ highlightFormatting: !0 }, e.parsingConfig || {}), e.insertTexts = H({}, X, e.insertTexts || {}), e.promptTexts = Z, e.blockStyles = H({}, Q, e.blockStyles || {}), e.shortcuts = H({}, G, e.shortcuts || {}), void 0 != e.autosave && void 0 != e.autosave.unique_id && "" != e.autosave.unique_id && (e.autosave.uniqueId = e.autosave.unique_id), this.options = e, this.render(), !e.initialValue || this.options.autosave && !0 === this.options.autosave.foundSavedValue || this.value(e.initialValue);
    }function B() {
      if ("object" != (typeof localStorage === "undefined" ? "undefined" : (0, _typeof3.default)(localStorage))) return !1;try {
        localStorage.setItem("smde_localStorage", 1), localStorage.removeItem("smde_localStorage");
      } catch (e) {
        return !1;
      }return !0;
    }var W = r("8U58");r("Ar2w"), r("9G1F"), r("zdrL"), r("f6fj"), r("jz+E"), r("afnM"), r("U80t"), r("bWRU"), r("ezqs");var F = r("h6VQ"),
        U = r("EFqf"),
        j = /Mac/.test(navigator.platform),
        q = { toggleBold: c, toggleItalic: u, drawLink: k, toggleHeadingSmaller: p, toggleHeadingBigger: m, drawImage: C, toggleBlockquote: h, toggleOrderedList: b, toggleUnorderedList: x, toggleCodeBlock: f, togglePreview: A, toggleStrikethrough: d, toggleHeading1: g, toggleHeading2: v, toggleHeading3: y, cleanBlock: w, drawTable: S, drawHorizontalRule: M, undo: L, redo: T, toggleSideBySide: N, toggleFullScreen: s },
        G = { toggleBold: "Cmd-B", toggleItalic: "Cmd-I", drawLink: "Cmd-K", toggleHeadingSmaller: "Cmd-H", toggleHeadingBigger: "Shift-Cmd-H", cleanBlock: "Cmd-E", drawImage: "Cmd-Alt-I", toggleBlockquote: "Cmd-'", toggleOrderedList: "Cmd-Alt-L", toggleUnorderedList: "Cmd-L", toggleCodeBlock: "Cmd-Alt-C", togglePreview: "Cmd-P", toggleSideBySide: "F9", toggleFullScreen: "F11" },
        $ = function $(e) {
      for (var t in q) {
        if (q[t] === e) return t;
      }return null;
    },
        Y = function Y() {
      var e = !1;return function (t) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0);
      }(navigator.userAgent || navigator.vendor || window.opera), e;
    },
        V = "",
        K = { bold: { name: "bold", action: c, className: "fa fa-bold", title: "Bold", default: !0 }, italic: { name: "italic", action: u, className: "fa fa-italic", title: "Italic", default: !0 }, strikethrough: { name: "strikethrough", action: d, className: "fa fa-strikethrough", title: "Strikethrough" }, heading: { name: "heading", action: p, className: "fa fa-header", title: "Heading", default: !0 }, "heading-smaller": { name: "heading-smaller", action: p, className: "fa fa-header fa-header-x fa-header-smaller", title: "Smaller Heading" }, "heading-bigger": { name: "heading-bigger", action: m, className: "fa fa-header fa-header-x fa-header-bigger", title: "Bigger Heading" }, "heading-1": { name: "heading-1", action: g, className: "fa fa-header fa-header-x fa-header-1", title: "Big Heading" }, "heading-2": { name: "heading-2", action: v, className: "fa fa-header fa-header-x fa-header-2", title: "Medium Heading" }, "heading-3": { name: "heading-3", action: y, className: "fa fa-header fa-header-x fa-header-3", title: "Small Heading" }, "separator-1": { name: "separator-1" }, code: { name: "code", action: f, className: "fa fa-code", title: "Code" }, quote: { name: "quote", action: h, className: "fa fa-quote-left", title: "Quote", default: !0 }, "unordered-list": { name: "unordered-list", action: x, className: "fa fa-list-ul", title: "Generic List", default: !0 }, "ordered-list": { name: "ordered-list", action: b, className: "fa fa-list-ol", title: "Numbered List", default: !0 }, "clean-block": { name: "clean-block", action: w, className: "fa fa-eraser fa-clean-block", title: "Clean block" }, "separator-2": { name: "separator-2" }, link: { name: "link", action: k, className: "fa fa-link", title: "Create Link", default: !0 }, image: { name: "image", action: C, className: "fa fa-picture-o", title: "Insert Image", default: !0 }, table: { name: "table", action: S, className: "fa fa-table", title: "Insert Table" }, "horizontal-rule": { name: "horizontal-rule", action: M, className: "fa fa-minus", title: "Insert Horizontal Line" }, "separator-3": { name: "separator-3" }, preview: { name: "preview", action: A, className: "fa fa-eye no-disable", title: "Toggle Preview", default: !0 }, "side-by-side": { name: "side-by-side", action: N, className: "fa fa-columns no-disable no-mobile", title: "Toggle Side by Side", default: !0 }, fullscreen: { name: "fullscreen", action: s, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen", default: !0 }, "separator-4": { name: "separator-4" }, guide: { name: "guide", action: "https://simplemde.com/markdown-guide", className: "fa fa-question-circle", title: "Markdown Guide", default: !0 }, "separator-5": { name: "separator-5" }, undo: { name: "undo", action: L, className: "fa fa-undo no-disable", title: "Undo" }, redo: { name: "redo", action: T, className: "fa fa-repeat no-disable", title: "Redo" } },
        X = { link: ["[", "](#url#)"], image: ["![](", "#url#)"], table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"], horizontalRule: ["", "\n\n-----\n\n"] },
        Z = { link: "URL for the link:", image: "URL of the image:" },
        Q = { bold: "**", code: "```", italic: "*" };_.prototype.markdown = function (e) {
      if (U) {
        var t = {};return this.options && this.options.renderingConfig && !1 === this.options.renderingConfig.singleLineBreaks ? t.breaks = !1 : t.breaks = !0, this.options && this.options.renderingConfig && !0 === this.options.renderingConfig.codeSyntaxHighlighting && window.hljs && (t.highlight = function (e) {
          return window.hljs.highlightAuto(e).value;
        }), U.setOptions(t), U(e);
      }
    }, _.prototype.render = function (e) {
      if (e || (e = this.element || document.getElementsByTagName("textarea")[0]), !this._rendered || this._rendered !== e) {
        this.element = e;var t = this.options,
            r = this,
            i = {};for (var o in t.shortcuts) {
          null !== t.shortcuts[o] && null !== q[o] && function (e) {
            i[n(t.shortcuts[e])] = function () {
              q[e](r);
            };
          }(o);
        }i.Enter = "newlineAndIndentContinueMarkdownList", i.Tab = "tabAndIndentMarkdownList", i["Shift-Tab"] = "shiftTabAndUnindentMarkdownList", i.Esc = function (e) {
          e.getOption("fullScreen") && s(r);
        }, document.addEventListener("keydown", function (e) {
          e = e || window.event, 27 == e.keyCode && r.codemirror.getOption("fullScreen") && s(r);
        }, !1);var a, l;if (!1 !== t.spellChecker ? (a = "spell-checker", l = t.parsingConfig, l.name = "gfm", l.gitHubSpice = !1, F({ codeMirrorInstance: W })) : (a = t.parsingConfig, a.name = "gfm", a.gitHubSpice = !1), this.codemirror = W.fromTextArea(e, { mode: a, backdrop: l, theme: "paper", tabSize: void 0 != t.tabSize ? t.tabSize : 2, indentUnit: void 0 != t.tabSize ? t.tabSize : 2, indentWithTabs: !1 !== t.indentWithTabs, lineNumbers: !1, autofocus: !0 === t.autofocus, extraKeys: i, lineWrapping: !1 !== t.lineWrapping, allowDropFileTypes: ["text/plain"], placeholder: t.placeholder || e.getAttribute("placeholder") || "", styleSelectedText: void 0 == t.styleSelectedText || t.styleSelectedText }), !0 === t.forceSync) {
          var c = this.codemirror;c.on("change", function () {
            c.save();
          });
        }this.gui = {}, !1 !== t.toolbar && (this.gui.toolbar = this.createToolbar()), !1 !== t.status && (this.gui.statusbar = this.createStatusbar()), void 0 != t.autosave && !0 === t.autosave.enabled && this.autosave(), this.gui.sideBySide = this.createSideBySide(), this._rendered = this.element;var u = this.codemirror;setTimeout(function () {
          u.refresh();
        }.bind(u), 0);
      }
    }, _.prototype.autosave = function () {
      if (B()) {
        var e = this;if (void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");null != e.element.form && void 0 != e.element.form && e.element.form.addEventListener("submit", function () {
          localStorage.removeItem("smde_" + e.options.autosave.uniqueId);
        }), !0 !== this.options.autosave.loaded && ("string" == typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) && "" != localStorage.getItem("smde_" + this.options.autosave.uniqueId) && (this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId)), this.options.autosave.foundSavedValue = !0), this.options.autosave.loaded = !0), localStorage.setItem("smde_" + this.options.autosave.uniqueId, e.value());var t = document.getElementById("autosaved");if (null != t && void 0 != t && "" != t) {
          var r = new Date(),
              n = r.getHours(),
              i = r.getMinutes(),
              o = "am",
              a = n;a >= 12 && (a = n - 12, o = "pm"), 0 == a && (a = 12), i = i < 10 ? "0" + i : i, t.innerHTML = "Autosaved: " + a + ":" + i + " " + o;
        }this.autosaveTimeoutId = setTimeout(function () {
          e.autosave();
        }, this.options.autosave.delay || 1e4);
      } else console.log("SimpleMDE: localStorage not available, cannot autosave");
    }, _.prototype.clearAutosavedValue = function () {
      if (B()) {
        if (void 0 == this.options.autosave || void 0 == this.options.autosave.uniqueId || "" == this.options.autosave.uniqueId) return void console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");localStorage.removeItem("smde_" + this.options.autosave.uniqueId);
      } else console.log("SimpleMDE: localStorage not available, cannot autosave");
    }, _.prototype.createSideBySide = function () {
      var e = this.codemirror,
          t = e.getWrapperElement(),
          r = t.nextSibling;r && /editor-preview-side/.test(r.className) || (r = document.createElement("div"), r.className = "editor-preview-side", t.parentNode.insertBefore(r, t.nextSibling));var n = !1,
          i = !1;return e.on("scroll", function (e) {
        if (n) return void (n = !1);i = !0;var t = e.getScrollInfo().height - e.getScrollInfo().clientHeight,
            o = parseFloat(e.getScrollInfo().top) / t,
            a = (r.scrollHeight - r.clientHeight) * o;r.scrollTop = a;
      }), r.onscroll = function () {
        if (i) return void (i = !1);n = !0;var t = r.scrollHeight - r.clientHeight,
            o = parseFloat(r.scrollTop) / t,
            a = (e.getScrollInfo().height - e.getScrollInfo().clientHeight) * o;e.scrollTo(0, a);
      }, r;
    }, _.prototype.createToolbar = function (e) {
      if ((e = e || this.options.toolbar) && 0 !== e.length) {
        var t;for (t = 0; t < e.length; t++) {
          void 0 != K[e[t]] && (e[t] = K[e[t]]);
        }var r = document.createElement("div");r.className = "editor-toolbar";var n = this,
            a = {};for (n.toolbar = e, t = 0; t < e.length; t++) {
          if (("guide" != e[t].name || !1 !== n.options.toolbarGuideIcon) && !(n.options.hideIcons && -1 != n.options.hideIcons.indexOf(e[t].name) || ("fullscreen" == e[t].name || "side-by-side" == e[t].name) && Y())) {
            if ("|" === e[t]) {
              for (var s = !1, c = t + 1; c < e.length; c++) {
                "|" === e[c] || n.options.hideIcons && -1 != n.options.hideIcons.indexOf(e[c].name) || (s = !0);
              }if (!s) continue;
            }!function (e) {
              var t;t = "|" === e ? o() : i(e, n.options.toolbarTips, n.options.shortcuts), e.action && ("function" == typeof e.action ? t.onclick = function (t) {
                t.preventDefault(), e.action(n);
              } : "string" == typeof e.action && (t.href = e.action, t.target = "_blank")), a[e.name || e] = t, r.appendChild(t);
            }(e[t]);
          }
        }n.toolbarElements = a;var u = this.codemirror;u.on("cursorActivity", function () {
          var e = l(u);for (var t in a) {
            !function (t) {
              var r = a[t];e[t] ? r.className += " active" : "fullscreen" != t && "side-by-side" != t && (r.className = r.className.replace(/\s*active\s*/g, ""));
            }(t);
          }
        });var d = u.getWrapperElement();return d.parentNode.insertBefore(r, d), r;
      }
    }, _.prototype.createStatusbar = function (e) {
      e = e || this.options.status;var t = this.options,
          r = this.codemirror;if (e && 0 !== e.length) {
        var n,
            i,
            o,
            a = [];for (n = 0; n < e.length; n++) {
          if (i = void 0, o = void 0, "object" == (0, _typeof3.default)(e[n])) a.push({ className: e[n].className, defaultValue: e[n].defaultValue, onUpdate: e[n].onUpdate });else {
            var l = e[n];"words" === l ? (o = function o(e) {
              e.innerHTML = z(r.getValue());
            }, i = function i(e) {
              e.innerHTML = z(r.getValue());
            }) : "lines" === l ? (o = function o(e) {
              e.innerHTML = r.lineCount();
            }, i = function i(e) {
              e.innerHTML = r.lineCount();
            }) : "cursor" === l ? (o = function o(e) {
              e.innerHTML = "0:0";
            }, i = function i(e) {
              var t = r.getCursor();e.innerHTML = t.line + ":" + t.ch;
            }) : "autosave" === l && (o = function o(e) {
              void 0 != t.autosave && !0 === t.autosave.enabled && e.setAttribute("id", "autosaved");
            }), a.push({ className: l, defaultValue: o, onUpdate: i });
          }
        }var s = document.createElement("div");for (s.className = "editor-statusbar", n = 0; n < a.length; n++) {
          var c = a[n],
              u = document.createElement("span");u.className = c.className, "function" == typeof c.defaultValue && c.defaultValue(u), "function" == typeof c.onUpdate && this.codemirror.on("update", function (e, t) {
            return function () {
              t.onUpdate(e);
            };
          }(u, c)), s.appendChild(u);
        }var d = this.codemirror.getWrapperElement();return d.parentNode.insertBefore(s, d.nextSibling), s;
      }
    }, _.prototype.value = function (e) {
      return void 0 === e ? this.codemirror.getValue() : (this.codemirror.getDoc().setValue(e), this);
    }, _.toggleBold = c, _.toggleItalic = u, _.toggleStrikethrough = d, _.toggleBlockquote = h, _.toggleHeadingSmaller = p, _.toggleHeadingBigger = m, _.toggleHeading1 = g, _.toggleHeading2 = v, _.toggleHeading3 = y, _.toggleCodeBlock = f, _.toggleUnorderedList = x, _.toggleOrderedList = b, _.cleanBlock = w, _.drawLink = k, _.drawImage = C, _.drawTable = S, _.drawHorizontalRule = M, _.undo = L, _.redo = T, _.togglePreview = A, _.toggleSideBySide = N, _.toggleFullScreen = s, _.prototype.toggleBold = function () {
      c(this);
    }, _.prototype.toggleItalic = function () {
      u(this);
    }, _.prototype.toggleStrikethrough = function () {
      d(this);
    }, _.prototype.toggleBlockquote = function () {
      h(this);
    }, _.prototype.toggleHeadingSmaller = function () {
      p(this);
    }, _.prototype.toggleHeadingBigger = function () {
      m(this);
    }, _.prototype.toggleHeading1 = function () {
      g(this);
    }, _.prototype.toggleHeading2 = function () {
      v(this);
    }, _.prototype.toggleHeading3 = function () {
      y(this);
    }, _.prototype.toggleCodeBlock = function () {
      f(this);
    }, _.prototype.toggleUnorderedList = function () {
      x(this);
    }, _.prototype.toggleOrderedList = function () {
      b(this);
    }, _.prototype.cleanBlock = function () {
      w(this);
    }, _.prototype.drawLink = function () {
      k(this);
    }, _.prototype.drawImage = function () {
      C(this);
    }, _.prototype.drawTable = function () {
      S(this);
    }, _.prototype.drawHorizontalRule = function () {
      M(this);
    }, _.prototype.undo = function () {
      L(this);
    }, _.prototype.redo = function () {
      T(this);
    }, _.prototype.togglePreview = function () {
      A(this);
    }, _.prototype.toggleSideBySide = function () {
      N(this);
    }, _.prototype.toggleFullScreen = function () {
      s(this);
    }, _.prototype.isPreviewActive = function () {
      return (/editor-preview-active/.test(this.codemirror.getWrapperElement().lastChild.className)
      );
    }, _.prototype.isSideBySideActive = function () {
      return (/editor-preview-active-side/.test(this.codemirror.getWrapperElement().nextSibling.className)
      );
    }, _.prototype.isFullscreenActive = function () {
      return this.codemirror.getOption("fullScreen");
    }, _.prototype.getState = function () {
      return l(this.codemirror);
    }, _.prototype.toTextArea = function () {
      var e = this.codemirror,
          t = e.getWrapperElement();t.parentNode && (this.gui.toolbar && t.parentNode.removeChild(this.gui.toolbar), this.gui.statusbar && t.parentNode.removeChild(this.gui.statusbar), this.gui.sideBySide && t.parentNode.removeChild(this.gui.sideBySide)), e.toTextArea(), this.autosaveTimeoutId && (clearTimeout(this.autosaveTimeoutId), this.autosaveTimeoutId = void 0, this.clearAutosavedValue());
    }, e.exports = _;
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
      }function a() {
        var e;try {
          e = document.activeElement;
        } catch (t) {
          e = document.body || null;
        }for (; e && e.shadowRoot && e.shadowRoot.activeElement;) {
          e = e.shadowRoot.activeElement;
        }return e;
      }function l(t, r) {
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
      }function d(e, t, r, n, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);for (var o = n || 0, a = i || 0;;) {
          var l = e.indexOf("\t", o);if (l < 0 || l >= t) return a + (t - o);a += l - o, a += r - a % r, o = l + 1;
        }
      }function f(e, t) {
        for (var r = 0; r < e.length; ++r) {
          if (e[r] == t) return r;
        }return -1;
      }function h(e, t, r) {
        for (var n = 0, i = 0;;) {
          var o = e.indexOf("\t", n);-1 == o && (o = e.length);var a = o - n;if (o == e.length || i + a >= t) return n + Math.min(a, t - i);if (i += o - n, i += r - i % r, n = o + 1, i >= t) return n;
        }
      }function p(e) {
        for (; Ia.length <= e;) {
          Ia.push(m(Ia) + " ");
        }return Ia[e];
      }function m(e) {
        return e[e.length - 1];
      }function g(e, t) {
        for (var r = [], n = 0; n < e.length; n++) {
          r[n] = t(e[n], n);
        }return r;
      }function v(e, t, r) {
        for (var n = 0, i = r(t); n < e.length && r(e[n]) <= i;) {
          n++;
        }e.splice(n, 0, t);
      }function y() {}function x(e, t) {
        var r;return _create2.default ? r = (0, _create2.default)(e) : (y.prototype = e, r = new y()), t && u(t, r), r;
      }function b(e) {
        return (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Ra.test(e))
        );
      }function w(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && b(e)) || t.test(e) : b(e);
      }function k(e) {
        for (var t in e) {
          if (e.hasOwnProperty(t) && e[t]) return !1;
        }return !0;
      }function C(e) {
        return e.charCodeAt(0) >= 768 && Pa.test(e);
      }function S(e, t, r) {
        for (; (r < 0 ? t > 0 : t < e.length) && C(e.charAt(t));) {
          t += r;
        }return t;
      }function M(e, t, r) {
        for (;;) {
          if (Math.abs(t - r) <= 1) return e(t) ? t : r;var n = Math.floor((t + r) / 2);e(n) ? r = n : t = n;
        }
      }function L(e, t, r) {
        var o = this;this.input = r, o.scrollbarFiller = n("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = n("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = i("div", null, "CodeMirror-code"), o.selectionDiv = n("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = n("div", null, "CodeMirror-cursors"), o.measure = n("div", null, "CodeMirror-measure"), o.lineMeasure = n("div", null, "CodeMirror-measure"), o.lineSpace = i("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");var a = i("div", [o.lineSpace], "CodeMirror-lines");o.mover = n("div", [a], null, "position: relative"), o.sizer = n("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = n("div", null, null, "position: absolute; height: " + Ta + "px; width: 1px;"), o.gutters = n("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = n("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = n("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), na && ia < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), oa || Jo && pa || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, r.init(o);
      }function T(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");for (var r = e; !r.lines;) {
          for (var n = 0;; ++n) {
            var i = r.children[n],
                o = i.chunkSize();if (t < o) {
              r = i;break;
            }t -= o;
          }
        }return r.lines[t];
      }function N(e, t, r) {
        var n = [],
            i = t.line;return e.iter(t.line, r.line + 1, function (e) {
          var o = e.text;i == r.line && (o = o.slice(0, r.ch)), i == t.line && (o = o.slice(t.ch)), n.push(o), ++i;
        }), n;
      }function A(e, t, r) {
        var n = [];return e.iter(t, r, function (e) {
          n.push(e.text);
        }), n;
      }function E(e, t) {
        var r = t - e.height;if (r) for (var n = e; n; n = n.parent) {
          n.height += r;
        }
      }function O(e) {
        if (null == e.parent) return null;for (var t = e.parent, r = f(t.lines, e), n = t.parent; n; t = n, n = n.parent) {
          for (var i = 0; n.children[i] != t; ++i) {
            r += n.children[i].chunkSize();
          }
        }return r + t.first;
      }function I(e, t) {
        var r = e.first;e: do {
          for (var n = 0; n < e.children.length; ++n) {
            var i = e.children[n],
                o = i.height;if (t < o) {
              e = i;continue e;
            }t -= o, r += i.chunkSize();
          }return r;
        } while (!e.lines);for (var a = 0; a < e.lines.length; ++a) {
          var l = e.lines[a],
              s = l.height;if (t < s) break;t -= s;
        }return r + a;
      }function R(e, t) {
        return t >= e.first && t < e.first + e.size;
      }function P(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber));
      }function D(e, t, r) {
        if (void 0 === r && (r = null), !(this instanceof D)) return new D(e, t, r);this.line = e, this.ch = t, this.sticky = r;
      }function H(e, t) {
        return e.line - t.line || e.ch - t.ch;
      }function z(e, t) {
        return e.sticky == t.sticky && 0 == H(e, t);
      }function _(e) {
        return D(e.line, e.ch);
      }function B(e, t) {
        return H(e, t) < 0 ? t : e;
      }function W(e, t) {
        return H(e, t) < 0 ? e : t;
      }function F(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1));
      }function U(e, t) {
        if (t.line < e.first) return D(e.first, 0);var r = e.first + e.size - 1;return t.line > r ? D(r, T(e, r).text.length) : j(t, T(e, t.line).text.length);
      }function j(e, t) {
        var r = e.ch;return null == r || r > t ? D(e.line, t) : r < 0 ? D(e.line, 0) : e;
      }function q(e, t) {
        for (var r = [], n = 0; n < t.length; n++) {
          r[n] = U(e, t[n]);
        }return r;
      }function G() {
        Da = !0;
      }function $() {
        Ha = !0;
      }function Y(e, t, r) {
        this.marker = e, this.from = t, this.to = r;
      }function V(e, t) {
        if (e) for (var r = 0; r < e.length; ++r) {
          var n = e[r];if (n.marker == t) return n;
        }
      }function K(e, t) {
        for (var r, n = 0; n < e.length; ++n) {
          e[n] != t && (r || (r = [])).push(e[n]);
        }return r;
      }function X(e, t) {
        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e);
      }function Z(e, t, r) {
        var n;if (e) for (var i = 0; i < e.length; ++i) {
          var o = e[i],
              a = o.marker,
              l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);if (l || o.from == t && "bookmark" == a.type && (!r || !o.marker.insertLeft)) {
            var s = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);(n || (n = [])).push(new Y(a, o.from, s ? null : o.to));
          }
        }return n;
      }function Q(e, t, r) {
        var n;if (e) for (var i = 0; i < e.length; ++i) {
          var o = e[i],
              a = o.marker,
              l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);if (l || o.from == t && "bookmark" == a.type && (!r || o.marker.insertLeft)) {
            var s = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);(n || (n = [])).push(new Y(a, s ? null : o.from - t, null == o.to ? null : o.to - t));
          }
        }return n;
      }function J(e, t) {
        if (t.full) return null;var r = R(e, t.from.line) && T(e, t.from.line).markedSpans,
            n = R(e, t.to.line) && T(e, t.to.line).markedSpans;if (!r && !n) return null;var i = t.from.ch,
            o = t.to.ch,
            a = 0 == H(t.from, t.to),
            l = Z(r, i, a),
            s = Q(n, o, a),
            c = 1 == t.text.length,
            u = m(t.text).length + (c ? i : 0);if (l) for (var d = 0; d < l.length; ++d) {
          var f = l[d];if (null == f.to) {
            var h = V(s, f.marker);h ? c && (f.to = null == h.to ? null : h.to + u) : f.to = i;
          }
        }if (s) for (var p = 0; p < s.length; ++p) {
          var g = s[p];if (null != g.to && (g.to += u), null == g.from) {
            var v = V(l, g.marker);v || (g.from = u, c && (l || (l = [])).push(g));
          } else g.from += u, c && (l || (l = [])).push(g);
        }l && (l = ee(l)), s && s != l && (s = ee(s));var y = [l];if (!c) {
          var x,
              b = t.text.length - 2;if (b > 0 && l) for (var w = 0; w < l.length; ++w) {
            null == l[w].to && (x || (x = [])).push(new Y(l[w].marker, null, null));
          }for (var k = 0; k < b; ++k) {
            y.push(x);
          }y.push(s);
        }return y;
      }function ee(e) {
        for (var t = 0; t < e.length; ++t) {
          var r = e[t];null != r.from && r.from == r.to && !1 !== r.marker.clearWhenEmpty && e.splice(t--, 1);
        }return e.length ? e : null;
      }function te(e, t, r) {
        var n = null;if (e.iter(t.line, r.line + 1, function (e) {
          if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
            var r = e.markedSpans[t].marker;!r.readOnly || n && -1 != f(n, r) || (n || (n = [])).push(r);
          }
        }), !n) return null;for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o) {
          for (var a = n[o], l = a.find(0), s = 0; s < i.length; ++s) {
            var c = i[s];if (!(H(c.to, l.from) < 0 || H(c.from, l.to) > 0)) {
              var u = [s, 1],
                  d = H(c.from, l.from),
                  h = H(c.to, l.to);(d < 0 || !a.inclusiveLeft && !d) && u.push({ from: c.from, to: l.from }), (h > 0 || !a.inclusiveRight && !h) && u.push({ from: l.to, to: c.to }), i.splice.apply(i, u), s += u.length - 3;
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
      }function ae(e, t) {
        var r = e.lines.length - t.lines.length;if (0 != r) return r;var n = e.find(),
            i = t.find(),
            o = H(n.from, i.from) || ie(e) - ie(t);if (o) return -o;var a = H(n.to, i.to) || oe(e) - oe(t);return a || t.id - e.id;
      }function le(e, t) {
        var r,
            n = Ha && e.markedSpans;if (n) for (var i = void 0, o = 0; o < n.length; ++o) {
          i = n[o], i.marker.collapsed && null == (t ? i.from : i.to) && (!r || ae(r, i.marker) < 0) && (r = i.marker);
        }return r;
      }function se(e) {
        return le(e, !0);
      }function ce(e) {
        return le(e, !1);
      }function ue(e, t, r, n, i) {
        var o = T(e, t),
            a = Ha && o.markedSpans;if (a) for (var l = 0; l < a.length; ++l) {
          var s = a[l];if (s.marker.collapsed) {
            var c = s.marker.find(0),
                u = H(c.from, r) || ie(s.marker) - ie(i),
                d = H(c.to, n) || oe(s.marker) - oe(i);if (!(u >= 0 && d <= 0 || u <= 0 && d >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? H(c.to, r) >= 0 : H(c.to, r) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? H(c.from, n) <= 0 : H(c.from, n) < 0))) return !0;
          }
        }
      }function de(e) {
        for (var t; t = se(e);) {
          e = t.find(-1, !0).line;
        }return e;
      }function fe(e) {
        for (var t; t = ce(e);) {
          e = t.find(1, !0).line;
        }return e;
      }function he(e) {
        for (var t, r; t = ce(e);) {
          e = t.find(1, !0).line, (r || (r = [])).push(e);
        }return r;
      }function pe(e, t) {
        var r = T(e, t),
            n = de(r);return r == n ? t : O(n);
      }function me(e, t) {
        if (t > e.lastLine()) return t;var r,
            n = T(e, t);if (!ge(e, n)) return t;for (; r = ce(n);) {
          n = r.find(1, !0).line;
        }return O(n) + 1;
      }function ge(e, t) {
        var r = Ha && t.markedSpans;if (r) for (var n = void 0, i = 0; i < r.length; ++i) {
          if (n = r[i], n.marker.collapsed) {
            if (null == n.from) return !0;if (!n.marker.widgetNode && 0 == n.from && n.marker.inclusiveLeft && ve(e, t, n)) return !0;
          }
        }
      }function ve(e, t, r) {
        if (null == r.to) {
          var n = r.marker.find(1, !0);return ve(e, n.line, V(n.line.markedSpans, r.marker));
        }if (r.marker.inclusiveRight && r.to == t.text.length) return !0;for (var i = void 0, o = 0; o < t.markedSpans.length; ++o) {
          if (i = t.markedSpans[o], i.marker.collapsed && !i.marker.widgetNode && i.from == r.to && (null == i.to || i.to != r.from) && (i.marker.inclusiveLeft || r.marker.inclusiveRight) && ve(e, t, i)) return !0;
        }
      }function ye(e) {
        e = de(e);for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
          var i = r.lines[n];if (i == e) break;t += i.height;
        }for (var o = r.parent; o; r = o, o = r.parent) {
          for (var a = 0; a < o.children.length; ++a) {
            var l = o.children[a];if (l == r) break;t += l.height;
          }
        }return t;
      }function xe(e) {
        if (0 == e.height) return 0;for (var t, r = e.text.length, n = e; t = se(n);) {
          var i = t.find(0, !0);n = i.from.line, r += i.from.ch - i.to.ch;
        }for (n = e; t = ce(n);) {
          var o = t.find(0, !0);r -= n.text.length - o.from.ch, n = o.to.line, r += n.text.length - o.to.ch;
        }return r;
      }function be(e) {
        var t = e.display,
            r = e.doc;t.maxLine = T(r, r.first), t.maxLineLength = xe(t.maxLine), t.maxLineChanged = !0, r.iter(function (e) {
          var r = xe(e);r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e);
        });
      }function we(e, t, r, n) {
        if (!e) return n(t, r, "ltr");for (var i = !1, o = 0; o < e.length; ++o) {
          var a = e[o];(a.from < r && a.to > t || t == r && a.to == t) && (n(Math.max(a.from, t), Math.min(a.to, r), 1 == a.level ? "rtl" : "ltr"), i = !0);
        }i || n(t, r, "ltr");
      }function ke(e, t, r) {
        var n;za = null;for (var i = 0; i < e.length; ++i) {
          var o = e[i];if (o.from < t && o.to > t) return i;o.to == t && (o.from != o.to && "before" == r ? n = i : za = i), o.from == t && (o.from != o.to && "before" != r ? n = i : za = i);
        }return null != n ? n : za;
      }function Ce(e, t) {
        var r = e.order;return null == r && (r = e.order = _a(e.text, t)), r;
      }function Se(e, t, r) {
        var n = S(e.text, t + r, r);return n < 0 || n > e.text.length ? null : n;
      }function Me(e, t, r) {
        var n = Se(e, t.ch, r);return null == n ? null : new D(t.line, n, r < 0 ? "after" : "before");
      }function Le(e, t, r, n, i) {
        if (e) {
          var o = Ce(r, t.doc.direction);if (o) {
            var a,
                l = i < 0 ? m(o) : o[0],
                s = i < 0 == (1 == l.level),
                c = s ? "after" : "before";if (l.level > 0) {
              var u = Xt(t, r);a = i < 0 ? r.text.length - 1 : 0;var d = Zt(t, u, a).top;a = M(function (e) {
                return Zt(t, u, e).top == d;
              }, i < 0 == (1 == l.level) ? l.from : l.to - 1, a), "before" == c && (a = Se(r, a, 1));
            } else a = i < 0 ? l.to : l.from;return new D(n, a, c);
          }
        }return new D(n, i < 0 ? r.text.length : 0, i < 0 ? "before" : "after");
      }function Te(e, t, r, n) {
        var i = Ce(t, e.doc.direction);if (!i) return Me(t, r, n);r.ch >= t.text.length ? (r.ch = t.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");var o = ke(i, r.ch, r.sticky),
            a = i[o];if ("ltr" == e.doc.direction && a.level % 2 == 0 && (n > 0 ? a.to > r.ch : a.from < r.ch)) return Me(t, r, n);var l,
            s = function s(e, r) {
          return Se(t, e instanceof D ? e.ch : e, r);
        },
            c = function c(r) {
          return e.options.lineWrapping ? (l = l || Xt(e, t), mr(e, t, l, r)) : { begin: 0, end: t.text.length };
        },
            u = c("before" == r.sticky ? s(r, -1) : r.ch);if ("rtl" == e.doc.direction || 1 == a.level) {
          var d = 1 == a.level == n < 0,
              f = s(r, d ? 1 : -1);if (null != f && (d ? f <= a.to && f <= u.end : f >= a.from && f >= u.begin)) {
            var h = d ? "before" : "after";return new D(r.line, f, h);
          }
        }var p = function p(e, t, n) {
          for (var o = function o(e, t) {
            return t ? new D(r.line, s(e, 1), "before") : new D(r.line, e, "after");
          }; e >= 0 && e < i.length; e += t) {
            var a = i[e],
                l = t > 0 == (1 != a.level),
                c = l ? n.begin : s(n.end, -1);if (a.from <= c && c < a.to) return o(c, l);if (c = l ? a.from : s(a.to, -1), n.begin <= c && c < n.end) return o(c, l);
          }
        },
            m = p(o + n, n, u);if (m) return m;var g = n > 0 ? u.end : s(u.begin, -1);return null == g || n > 0 && g == t.text.length || !(m = p(n > 0 ? 0 : i.length - 1, n, c(g))) ? null : m;
      }function Ne(e, t) {
        return e._handlers && e._handlers[t] || Ba;
      }function Ae(e, t, r) {
        if (e.removeEventListener) e.removeEventListener(t, r, !1);else if (e.detachEvent) e.detachEvent("on" + t, r);else {
          var n = e._handlers,
              i = n && n[t];if (i) {
            var o = f(i, r);o > -1 && (n[t] = i.slice(0, o).concat(i.slice(o + 1)));
          }
        }
      }function Ee(e, t) {
        var r = Ne(e, t);if (r.length) for (var n = Array.prototype.slice.call(arguments, 2), i = 0; i < r.length; ++i) {
          r[i].apply(null, n);
        }
      }function Oe(e, t, r) {
        return "string" == typeof t && (t = { type: t, preventDefault: function preventDefault() {
            this.defaultPrevented = !0;
          } }), Ee(e, r || t.type, e, t), ze(t) || t.codemirrorIgnore;
      }function Ie(e) {
        var t = e._handlers && e._handlers.cursorActivity;if (t) for (var r = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), n = 0; n < t.length; ++n) {
          -1 == f(r, t[n]) && r.push(t[n]);
        }
      }function Re(e, t) {
        return Ne(e, t).length > 0;
      }function Pe(e) {
        e.prototype.on = function (e, t) {
          Wa(this, e, t);
        }, e.prototype.off = function (e, t) {
          Ae(this, e, t);
        };
      }function De(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }function He(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
      }function ze(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
      }function _e(e) {
        De(e), He(e);
      }function Be(e) {
        return e.target || e.srcElement;
      }function We(e) {
        var t = e.which;return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), ma && e.ctrlKey && 1 == t && (t = 3), t;
      }function Fe(e) {
        if (null == Ma) {
          var t = n("span", "​");r(e, n("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Ma = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(na && ia < 8));
        }var i = Ma ? n("span", "​") : n("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");return i.setAttribute("cm-text", ""), i;
      }function Ue(e) {
        if (null != La) return La;var n = r(e, document.createTextNode("AخA")),
            i = xa(n, 0, 1).getBoundingClientRect(),
            o = xa(n, 1, 2).getBoundingClientRect();return t(e), !(!i || i.left == i.right) && (La = o.right - i.right < 3);
      }function je(e) {
        if (null != Ga) return Ga;var t = r(e, n("span", "x")),
            i = t.getBoundingClientRect(),
            o = xa(t, 0, 1).getBoundingClientRect();return Ga = Math.abs(i.left - o.left) > 1;
      }function qe(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), $a[e] = t;
      }function Ge(e, t) {
        Ya[e] = t;
      }function $e(e) {
        if ("string" == typeof e && Ya.hasOwnProperty(e)) e = Ya[e];else if (e && "string" == typeof e.name && Ya.hasOwnProperty(e.name)) {
          var t = Ya[e.name];"string" == typeof t && (t = { name: t }), e = x(t, e), e.name = t.name;
        } else {
          if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return $e("application/xml");if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return $e("application/json");
        }return "string" == typeof e ? { name: e } : e || { name: "null" };
      }function Ye(e, t) {
        t = $e(t);var r = $a[t.name];if (!r) return Ye(e, "text/plain");var n = r(e, t);if (Va.hasOwnProperty(t.name)) {
          var i = Va[t.name];for (var o in i) {
            i.hasOwnProperty(o) && (n.hasOwnProperty(o) && (n["_" + o] = n[o]), n[o] = i[o]);
          }
        }if (n.name = t.name, t.helperType && (n.helperType = t.helperType), t.modeProps) for (var a in t.modeProps) {
          n[a] = t.modeProps[a];
        }return n;
      }function Ve(e, t) {
        u(t, Va.hasOwnProperty(e) ? Va[e] : Va[e] = {});
      }function Ke(e, t) {
        if (!0 === t) return t;if (e.copyState) return e.copyState(t);var r = {};for (var n in t) {
          var i = t[n];i instanceof Array && (i = i.concat([])), r[n] = i;
        }return r;
      }function Xe(e, t) {
        for (var r; e.innerMode && (r = e.innerMode(t)) && r.mode != e;) {
          t = r.state, e = r.mode;
        }return r || { mode: e, state: t };
      }function Ze(e, t, r) {
        return !e.startState || e.startState(t, r);
      }function Qe(e, t, r, n) {
        var i = [e.state.modeGen],
            o = {};at(e, t.text, e.doc.mode, r, function (e, t) {
          return i.push(e, t);
        }, o, n);for (var a = 0; a < e.state.overlays.length; ++a) {
          !function (r) {
            var n = e.state.overlays[r],
                a = 1,
                l = 0;at(e, t.text, n.mode, !0, function (e, t) {
              for (var r = a; l < e;) {
                var o = i[a];o > e && i.splice(a, 1, e, i[a + 1], o), a += 2, l = Math.min(e, o);
              }if (t) if (n.opaque) i.splice(r, a - r, e, "overlay " + t), a = r + 2;else for (; r < a; r += 2) {
                var s = i[r + 1];i[r + 1] = (s ? s + " " : "") + "overlay " + t;
              }
            }, o);
          }(a);
        }return { styles: i, classes: o.bgClass || o.textClass ? o : null };
      }function Je(e, t, r) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
          var n = et(e, O(t)),
              i = Qe(e, t, t.text.length > e.options.maxHighlightLength ? Ke(e.doc.mode, n) : n);t.stateAfter = n, t.styles = i.styles, i.classes ? t.styleClasses = i.classes : t.styleClasses && (t.styleClasses = null), r === e.doc.frontier && e.doc.frontier++;
        }return t.styles;
      }function et(e, t, r) {
        var n = e.doc,
            i = e.display;if (!n.mode.startState) return !0;var o = lt(e, t, r),
            a = o > n.first && T(n, o - 1).stateAfter;return a = a ? Ke(n.mode, a) : Ze(n.mode), n.iter(o, t, function (r) {
          tt(e, r.text, a);var l = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;r.stateAfter = l ? Ke(n.mode, a) : null, ++o;
        }), r && (n.frontier = o), a;
      }function tt(e, t, r, n) {
        var i = e.doc.mode,
            o = new Ka(t, e.options.tabSize);for (o.start = o.pos = n || 0, "" == t && rt(i, r); !o.eol();) {
          nt(i, o, r), o.start = o.pos;
        }
      }function rt(e, t) {
        if (e.blankLine) return e.blankLine(t);if (e.innerMode) {
          var r = Xe(e, t);return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0;
        }
      }function nt(e, t, r, n) {
        for (var i = 0; i < 10; i++) {
          n && (n[0] = Xe(e, r).mode);var o = e.token(t, r);if (t.pos > t.start) return o;
        }throw new Error("Mode " + e.name + " failed to advance stream.");
      }function it(e, t, r, n) {
        var i,
            o = function o(e) {
          return { start: d.start, end: d.pos, string: d.current(), type: i || null, state: e ? Ke(a.mode, u) : u };
        },
            a = e.doc,
            l = a.mode;t = U(a, t);var s,
            c = T(a, t.line),
            u = et(e, t.line, r),
            d = new Ka(c.text, e.options.tabSize);for (n && (s = []); (n || d.pos < t.ch) && !d.eol();) {
          d.start = d.pos, i = nt(l, d, u), n && s.push(o(!0));
        }return n ? s : o();
      }function ot(e, t) {
        if (e) for (;;) {
          var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);if (!r) break;e = e.slice(0, r.index) + e.slice(r.index + r[0].length);var n = r[1] ? "bgClass" : "textClass";null == t[n] ? t[n] = r[2] : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) || (t[n] += " " + r[2]);
        }return e;
      }function at(e, t, r, n, i, o, a) {
        var l = r.flattenSpans;null == l && (l = e.options.flattenSpans);var s,
            c = 0,
            u = null,
            d = new Ka(t, e.options.tabSize),
            f = e.options.addModeClass && [null];for ("" == t && ot(rt(r, n), o); !d.eol();) {
          if (d.pos > e.options.maxHighlightLength ? (l = !1, a && tt(e, t, n, d.pos), d.pos = t.length, s = null) : s = ot(nt(r, d, n, f), o), f) {
            var h = f[0].name;h && (s = "m-" + (s ? h + " " + s : h));
          }if (!l || u != s) {
            for (; c < d.start;) {
              c = Math.min(d.start, c + 5e3), i(c, u);
            }u = s;
          }d.start = d.pos;
        }for (; c < d.pos;) {
          var p = Math.min(d.pos, c + 5e3);i(p, u), c = p;
        }
      }function lt(e, t, r) {
        for (var n, i, o = e.doc, a = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
          if (l <= o.first) return o.first;var s = T(o, l - 1);if (s.stateAfter && (!r || l <= o.frontier)) return l;var c = d(s.text, null, e.options.tabSize);(null == i || n > c) && (i = l - 1, n = c);
        }return i;
      }function st(e, t, r, n) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), re(e), ne(e, r);var i = n ? n(e) : 1;i != e.height && E(e, i);
      }function ct(e) {
        e.parent = null, re(e);
      }function ut(e, t) {
        if (!e || /^\s*$/.test(e)) return null;var r = t.addModeClass ? Ja : Qa;return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
      }function dt(e, t) {
        var r = i("span", null, null, oa ? "padding-right: .1px" : null),
            n = { pre: i("pre", [r], "CodeMirror-line"), content: r, col: 0, pos: 0, cm: e, trailingSpace: !1, splitSpaces: (na || oa) && e.getOption("lineWrapping") };t.measure = {};for (var o = 0; o <= (t.rest ? t.rest.length : 0); o++) {
          var a = o ? t.rest[o - 1] : t.line,
              l = void 0;n.pos = 0, n.addToken = ht, Ue(e.display.measure) && (l = Ce(a, e.doc.direction)) && (n.addToken = mt(n.addToken, l)), n.map = [];vt(a, n, Je(e, a, t != e.display.externalMeasured && O(a))), a.styleClasses && (a.styleClasses.bgClass && (n.bgClass = s(a.styleClasses.bgClass, n.bgClass || "")), a.styleClasses.textClass && (n.textClass = s(a.styleClasses.textClass, n.textClass || ""))), 0 == n.map.length && n.map.push(0, 0, n.content.appendChild(Fe(e.display.measure))), 0 == o ? (t.measure.map = n.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(n.map), (t.measure.caches || (t.measure.caches = [])).push({}));
        }if (oa) {
          var c = n.content.lastChild;(/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (n.content.className = "cm-tab-wrap-hack");
        }return Ee(e, "renderLine", e, t.line, n.pre), n.pre.className && (n.textClass = s(n.pre.className, n.textClass || "")), n;
      }function ft(e) {
        var t = n("span", "•", "cm-invalidchar");return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t;
      }function ht(e, t, r, i, o, a, l) {
        if (t) {
          var s,
              c = e.splitSpaces ? pt(t, e.trailingSpace) : t,
              u = e.cm.state.specialChars,
              d = !1;if (u.test(t)) {
            s = document.createDocumentFragment();for (var f = 0;;) {
              u.lastIndex = f;var h = u.exec(t),
                  m = h ? h.index - f : t.length - f;if (m) {
                var g = document.createTextNode(c.slice(f, f + m));na && ia < 9 ? s.appendChild(n("span", [g])) : s.appendChild(g), e.map.push(e.pos, e.pos + m, g), e.col += m, e.pos += m;
              }if (!h) break;f += m + 1;var v = void 0;if ("\t" == h[0]) {
                var y = e.cm.options.tabSize,
                    x = y - e.col % y;v = s.appendChild(n("span", p(x), "cm-tab")), v.setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += x;
              } else "\r" == h[0] || "\n" == h[0] ? (v = s.appendChild(n("span", "\r" == h[0] ? "␍" : "␤", "cm-invalidchar")), v.setAttribute("cm-text", h[0]), e.col += 1) : (v = e.cm.options.specialCharPlaceholder(h[0]), v.setAttribute("cm-text", h[0]), na && ia < 9 ? s.appendChild(n("span", [v])) : s.appendChild(v), e.col += 1);e.map.push(e.pos, e.pos + 1, v), e.pos++;
            }
          } else e.col += t.length, s = document.createTextNode(c), e.map.push(e.pos, e.pos + t.length, s), na && ia < 9 && (d = !0), e.pos += t.length;if (e.trailingSpace = 32 == c.charCodeAt(t.length - 1), r || i || o || d || l) {
            var b = r || "";i && (b += i), o && (b += o);var w = n("span", [s], b, l);return a && (w.title = a), e.content.appendChild(w);
          }e.content.appendChild(s);
        }
      }function pt(e, t) {
        if (e.length > 1 && !/  /.test(e)) return e;for (var r = t, n = "", i = 0; i < e.length; i++) {
          var o = e.charAt(i);" " != o || !r || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = " "), n += o, r = " " == o;
        }return n;
      }function mt(e, t) {
        return function (r, n, i, o, a, l, s) {
          i = i ? i + " cm-force-border" : "cm-force-border";for (var c = r.pos, u = c + n.length;;) {
            for (var d = void 0, f = 0; f < t.length && (d = t[f], !(d.to > c && d.from <= c)); f++) {}if (d.to >= u) return e(r, n, i, o, a, l, s);e(r, n.slice(0, d.to - c), i, o, null, l, s), o = null, n = n.slice(d.to - c), c = d.to;
          }
        };
      }function gt(e, t, r, n) {
        var i = !n && r.widgetNode;i && e.map.push(e.pos, e.pos + t, i), !n && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", r.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1;
      }function vt(e, t, r) {
        var n = e.markedSpans,
            i = e.text,
            o = 0;if (n) for (var a, l, s, c, u, d, f, h = i.length, p = 0, m = 1, g = "", v = 0;;) {
          if (v == p) {
            s = c = u = d = l = "", f = null, v = 1 / 0;for (var y = [], x = void 0, b = 0; b < n.length; ++b) {
              var w = n[b],
                  k = w.marker;"bookmark" == k.type && w.from == p && k.widgetNode ? y.push(k) : w.from <= p && (null == w.to || w.to > p || k.collapsed && w.to == p && w.from == p) ? (null != w.to && w.to != p && v > w.to && (v = w.to, c = ""), k.className && (s += " " + k.className), k.css && (l = (l ? l + ";" : "") + k.css), k.startStyle && w.from == p && (u += " " + k.startStyle), k.endStyle && w.to == v && (x || (x = [])).push(k.endStyle, w.to), k.title && !d && (d = k.title), k.collapsed && (!f || ae(f.marker, k) < 0) && (f = w)) : w.from > p && v > w.from && (v = w.from);
            }if (x) for (var C = 0; C < x.length; C += 2) {
              x[C + 1] == v && (c += " " + x[C]);
            }if (!f || f.from == p) for (var S = 0; S < y.length; ++S) {
              gt(t, 0, y[S]);
            }if (f && (f.from || 0) == p) {
              if (gt(t, (null == f.to ? h + 1 : f.to) - p, f.marker, null == f.from), null == f.to) return;f.to == p && (f = !1);
            }
          }if (p >= h) break;for (var M = Math.min(h, v);;) {
            if (g) {
              var L = p + g.length;if (!f) {
                var T = L > M ? g.slice(0, M - p) : g;t.addToken(t, T, a ? a + s : s, u, p + T.length == v ? c : "", d, l);
              }if (L >= M) {
                g = g.slice(M - p), p = M;break;
              }p = L, u = "";
            }g = i.slice(o, o = r[m++]), a = ut(r[m++], t.cm.options);
          }
        } else for (var N = 1; N < r.length; N += 2) {
          t.addToken(t, i.slice(o, o = r[N]), ut(r[N + 1], t.cm.options));
        }
      }function yt(e, t, r) {
        this.line = t, this.rest = he(t), this.size = this.rest ? O(m(this.rest)) - r + 1 : 1, this.node = this.text = null, this.hidden = ge(e, t);
      }function xt(e, t, r) {
        for (var n, i = [], o = t; o < r; o = n) {
          var a = new yt(e.doc, T(e.doc, o), o);n = o + a.size, i.push(a);
        }return i;
      }function bt(e) {
        el ? el.ops.push(e) : e.ownsGroup = el = { ops: [e], delayedCallbacks: [] };
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
      }function kt(e, t) {
        var r = e.ownsGroup;if (r) try {
          wt(r);
        } finally {
          el = null, t(r);
        }
      }function Ct(e, t) {
        var r = Ne(e, t);if (r.length) {
          var n,
              i = Array.prototype.slice.call(arguments, 2);el ? n = el.delayedCallbacks : tl ? n = tl : (n = tl = [], setTimeout(St, 0));for (var o = 0; o < r.length; ++o) {
            !function (e) {
              n.push(function () {
                return r[e].apply(null, i);
              });
            }(o);
          }
        }
      }function St() {
        var e = tl;tl = null;for (var t = 0; t < e.length; ++t) {
          e[t]();
        }
      }function Mt(e, t, r, n) {
        for (var i = 0; i < t.changes.length; i++) {
          var o = t.changes[i];"text" == o ? At(e, t) : "gutter" == o ? Ot(e, t, r, n) : "class" == o ? Et(e, t) : "widget" == o && It(e, t, n);
        }t.changes = null;
      }function Lt(e) {
        return e.node == e.text && (e.node = n("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), na && ia < 8 && (e.node.style.zIndex = 2)), e.node;
      }function Tt(e, t) {
        var r = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;if (r && (r += " CodeMirror-linebackground"), t.background) r ? t.background.className = r : (t.background.parentNode.removeChild(t.background), t.background = null);else if (r) {
          var i = Lt(t);t.background = i.insertBefore(n("div", null, r), i.firstChild), e.display.input.setUneditable(t.background);
        }
      }function Nt(e, t) {
        var r = e.display.externalMeasured;return r && r.line == t.line ? (e.display.externalMeasured = null, t.measure = r.measure, r.built) : dt(e, t);
      }function At(e, t) {
        var r = t.text.className,
            n = Nt(e, t);t.text == t.node && (t.node = n.pre), t.text.parentNode.replaceChild(n.pre, t.text), t.text = n.pre, n.bgClass != t.bgClass || n.textClass != t.textClass ? (t.bgClass = n.bgClass, t.textClass = n.textClass, Et(e, t)) : r && (t.text.className = r);
      }function Et(e, t) {
        Tt(e, t), t.line.wrapClass ? Lt(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");var r = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;t.text.className = r || "";
      }function Ot(e, t, r, i) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
          var o = Lt(t);t.gutterBackground = n("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), o.insertBefore(t.gutterBackground, t.text);
        }var a = t.line.gutterMarkers;if (e.options.lineNumbers || a) {
          var l = Lt(t),
              s = t.gutter = n("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px");if (e.display.input.setUneditable(s), l.insertBefore(s, t.text), t.line.gutterClass && (s.className += " " + t.line.gutterClass), !e.options.lineNumbers || a && a["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(n("div", P(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), a) for (var c = 0; c < e.options.gutters.length; ++c) {
            var u = e.options.gutters[c],
                d = a.hasOwnProperty(u) && a[u];d && s.appendChild(n("div", [d], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[u] + "px; width: " + i.gutterWidth[u] + "px"));
          }
        }
      }function It(e, t, r) {
        t.alignable && (t.alignable = null);for (var n = t.node.firstChild, i = void 0; n; n = i) {
          i = n.nextSibling, "CodeMirror-linewidget" == n.className && t.node.removeChild(n);
        }Pt(e, t, r);
      }function Rt(e, t, r, n) {
        var i = Nt(e, t);return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), Et(e, t), Ot(e, t, r, n), Pt(e, t, n), t.node;
      }function Pt(e, t, r) {
        if (Dt(e, t.line, t, r, !0), t.rest) for (var n = 0; n < t.rest.length; n++) {
          Dt(e, t.rest[n], t, r, !1);
        }
      }function Dt(e, t, r, i, o) {
        if (t.widgets) for (var a = Lt(r), l = 0, s = t.widgets; l < s.length; ++l) {
          var c = s[l],
              u = n("div", [c.node], "CodeMirror-linewidget");c.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Ht(c, u, r, i), e.display.input.setUneditable(u), o && c.above ? a.insertBefore(u, r.gutter || r.text) : a.appendChild(u), Ct(c, "redraw");
        }
      }function Ht(e, t, r, n) {
        if (e.noHScroll) {
          (r.alignable || (r.alignable = [])).push(t);var i = n.wrapperWidth;t.style.left = n.fixedPos + "px", e.coverGutter || (i -= n.gutterTotalWidth, t.style.paddingLeft = n.gutterTotalWidth + "px"), t.style.width = i + "px";
        }e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
      }function zt(e) {
        if (null != e.height) return e.height;var t = e.doc.cm;if (!t) return 0;if (!o(document.body, e.node)) {
          var i = "position: relative;";e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), r(t.display.measure, n("div", [e.node], null, i));
        }return e.height = e.node.parentNode.offsetHeight;
      }function _t(e, t) {
        for (var r = Be(t); r != e.wrapper; r = r.parentNode) {
          if (!r || 1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events") || r.parentNode == e.sizer && r != e.mover) return !0;
        }
      }function Bt(e) {
        return e.lineSpace.offsetTop;
      }function Wt(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight;
      }function Ft(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;var t = r(e.measure, n("pre", "x")),
            i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            o = { left: parseInt(i.paddingLeft), right: parseInt(i.paddingRight) };return isNaN(o.left) || isNaN(o.right) || (e.cachedPaddingH = o), o;
      }function Ut(e) {
        return Ta - e.display.nativeBarWidth;
      }function jt(e) {
        return e.display.scroller.clientWidth - Ut(e) - e.display.barWidth;
      }function qt(e) {
        return e.display.scroller.clientHeight - Ut(e) - e.display.barHeight;
      }function Gt(e, t, r) {
        var n = e.options.lineWrapping,
            i = n && jt(e);if (!t.measure.heights || n && t.measure.width != i) {
          var o = t.measure.heights = [];if (n) {
            t.measure.width = i;for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
              var s = a[l],
                  c = a[l + 1];Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - r.top);
            }
          }o.push(r.bottom - r.top);
        }
      }function $t(e, t, r) {
        if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };for (var n = 0; n < e.rest.length; n++) {
          if (e.rest[n] == t) return { map: e.measure.maps[n], cache: e.measure.caches[n] };
        }for (var i = 0; i < e.rest.length; i++) {
          if (O(e.rest[i]) > r) return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 };
        }
      }function Yt(e, t) {
        t = de(t);var n = O(t),
            i = e.display.externalMeasured = new yt(e.doc, t, n);i.lineN = n;var o = i.built = dt(e, i);return i.text = o.pre, r(e.display.lineMeasure, o.pre), i;
      }function Vt(e, t, r, n) {
        return Zt(e, Xt(e, t), r, n);
      }function Kt(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[Sr(e, t)];var r = e.display.externalMeasured;return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0;
      }function Xt(e, t) {
        var r = O(t),
            n = Kt(e, r);n && !n.text ? n = null : n && n.changes && (Mt(e, n, r, xr(e)), e.curOp.forceUpdate = !0), n || (n = Yt(e, t));var i = $t(n, t, r);return { line: t, view: n, rect: null, map: i.map, cache: i.cache, before: i.before, hasHeights: !1 };
      }function Zt(e, t, r, n, i) {
        t.before && (r = -1);var o,
            a = r + (n || "");return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (Gt(e, t.view, t.rect), t.hasHeights = !0), o = er(e, t, r, n), o.bogus || (t.cache[a] = o)), { left: o.left, right: o.right, top: i ? o.rtop : o.top, bottom: i ? o.rbottom : o.bottom };
      }function Qt(e, t, r) {
        for (var n, i, o, a, l, s, c = 0; c < e.length; c += 3) {
          if (l = e[c], s = e[c + 1], t < l ? (i = 0, o = 1, a = "left") : t < s ? (i = t - l, o = i + 1) : (c == e.length - 3 || t == s && e[c + 3] > t) && (o = s - l, i = o - 1, t >= s && (a = "right")), null != i) {
            if (n = e[c + 2], l == s && r == (n.insertLeft ? "left" : "right") && (a = r), "left" == r && 0 == i) for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) {
              n = e[2 + (c -= 3)], a = "left";
            }if ("right" == r && i == s - l) for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) {
              n = e[(c += 3) + 2], a = "right";
            }break;
          }
        }return { node: n, start: i, end: o, collapse: a, coverStart: l, coverEnd: s };
      }function Jt(e, t) {
        var r = rl;if ("left" == t) for (var n = 0; n < e.length && (r = e[n]).left == r.right; n++) {} else for (var i = e.length - 1; i >= 0 && (r = e[i]).left == r.right; i--) {}return r;
      }function er(e, t, r, n) {
        var i,
            o = Qt(t.map, r, n),
            a = o.node,
            l = o.start,
            s = o.end,
            c = o.collapse;if (3 == a.nodeType) {
          for (var u = 0; u < 4; u++) {
            for (; l && C(t.line.text.charAt(o.coverStart + l));) {
              --l;
            }for (; o.coverStart + s < o.coverEnd && C(t.line.text.charAt(o.coverStart + s));) {
              ++s;
            }if (i = na && ia < 9 && 0 == l && s == o.coverEnd - o.coverStart ? a.parentNode.getBoundingClientRect() : Jt(xa(a, l, s).getClientRects(), n), i.left || i.right || 0 == l) break;s = l, l -= 1, c = "right";
          }na && ia < 11 && (i = tr(e.display.measure, i));
        } else {
          l > 0 && (c = n = "right");var d;i = e.options.lineWrapping && (d = a.getClientRects()).length > 1 ? d["right" == n ? d.length - 1 : 0] : a.getBoundingClientRect();
        }if (na && ia < 9 && !l && (!i || !i.left && !i.right)) {
          var f = a.parentNode.getClientRects()[0];i = f ? { left: f.left, right: f.left + yr(e.display), top: f.top, bottom: f.bottom } : rl;
        }for (var h = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (h + p) / 2, g = t.view.measure.heights, v = 0; v < g.length - 1 && !(m < g[v]); v++) {}var y = v ? g[v - 1] : 0,
            x = g[v],
            b = { left: ("right" == c ? i.right : i.left) - t.rect.left, right: ("left" == c ? i.left : i.right) - t.rect.left, top: y, bottom: x };return i.left || i.right || (b.bogus = !0), e.options.singleCursorHeightPerLine || (b.rtop = h, b.rbottom = p), b;
      }function tr(e, t) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !je(e)) return t;var r = screen.logicalXDPI / screen.deviceXDPI,
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
        return la && ha ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft;
      }function ar() {
        return la && ha ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop;
      }function lr(e, t, r, n, i) {
        if (!i && t.widgets) for (var o = 0; o < t.widgets.length; ++o) {
          if (t.widgets[o].above) {
            var a = zt(t.widgets[o]);r.top += a, r.bottom += a;
          }
        }if ("line" == n) return r;n || (n = "local");var l = ye(t);if ("local" == n ? l += Bt(e.display) : l -= e.display.viewOffset, "page" == n || "window" == n) {
          var s = e.display.lineSpace.getBoundingClientRect();l += s.top + ("window" == n ? 0 : ar());var c = s.left + ("window" == n ? 0 : or());r.left += c, r.right += c;
        }return r.top += l, r.bottom += l, r;
      }function sr(e, t, r) {
        if ("div" == r) return t;var n = t.left,
            i = t.top;if ("page" == r) n -= or(), i -= ar();else if ("local" == r || !r) {
          var o = e.display.sizer.getBoundingClientRect();n += o.left, i += o.top;
        }var a = e.display.lineSpace.getBoundingClientRect();return { left: n - a.left, top: i - a.top };
      }function cr(e, t, r, n, i) {
        return n || (n = T(e.doc, t.line)), lr(e, n, Vt(e, n, t.ch, i), r);
      }function ur(e, t, r, n, i, o) {
        function a(t, a) {
          var l = Zt(e, i, t, a ? "right" : "left", o);return a ? l.left = l.right : l.right = l.left, lr(e, n, l, r);
        }function l(e, t, r) {
          var n = s[t],
              i = n.level % 2 != 0;return a(r ? e - 1 : e, i != r);
        }n = n || T(e.doc, t.line), i || (i = Xt(e, n));var s = Ce(n, e.doc.direction),
            c = t.ch,
            u = t.sticky;if (c >= n.text.length ? (c = n.text.length, u = "before") : c <= 0 && (c = 0, u = "after"), !s) return a("before" == u ? c - 1 : c, "before" == u);var d = ke(s, c, u),
            f = za,
            h = l(c, d, "before" == u);return null != f && (h.other = l(c, f, "before" != u)), h;
      }function dr(e, t) {
        var r = 0;t = U(e.doc, t), e.options.lineWrapping || (r = yr(e.display) * t.ch);var n = T(e.doc, t.line),
            i = ye(n) + Bt(e.display);return { left: r, right: r, top: i, bottom: i + n.height };
      }function fr(e, t, r, n, i) {
        var o = D(e, t, r);return o.xRel = i, n && (o.outside = !0), o;
      }function hr(e, t, r) {
        var n = e.doc;if ((r += e.display.viewOffset) < 0) return fr(n.first, 0, null, !0, -1);var i = I(n, r),
            o = n.first + n.size - 1;if (i > o) return fr(n.first + n.size - 1, T(n, o).text.length, null, !0, 1);t < 0 && (t = 0);for (var a = T(n, i);;) {
          var l = gr(e, a, i, t, r),
              s = ce(a),
              c = s && s.find(0, !0);if (!s || !(l.ch > c.from.ch || l.ch == c.from.ch && l.xRel > 0)) return l;i = O(a = c.to.line);
        }
      }function pr(e, t, r, n) {
        var i = function i(n) {
          return lr(e, t, Zt(e, r, n), "line");
        },
            o = t.text.length,
            a = M(function (e) {
          return i(e - 1).bottom <= n;
        }, o, 0);return o = M(function (e) {
          return i(e).top > n;
        }, a, o), { begin: a, end: o };
      }function mr(e, t, r, n) {
        return pr(e, t, r, lr(e, t, Zt(e, r, n), "line").top);
      }function gr(e, t, r, n, i) {
        i -= ye(t);var o,
            a = 0,
            l = t.text.length,
            s = Xt(e, t);if (Ce(t, e.doc.direction)) {
          if (e.options.lineWrapping) {
            var c;c = pr(e, t, s, i), a = c.begin, l = c.end;
          }o = new D(r, a);var u,
              d,
              f = ur(e, o, "line", t, s).left,
              h = f < n ? 1 : -1,
              p = f - n;do {
            if (u = p, d = o, null == (o = Te(e, t, o, h)) || o.ch < a || l <= ("before" == o.sticky ? o.ch - 1 : o.ch)) {
              o = d;break;
            }p = ur(e, o, "line", t, s).left - n;
          } while (h < 0 != p < 0 && Math.abs(p) <= Math.abs(u));if (Math.abs(p) > Math.abs(u)) {
            if (p < 0 == u < 0) throw new Error("Broke out of infinite loop in coordsCharInner");o = d;
          }
        } else {
          var m = M(function (r) {
            var o = lr(e, t, Zt(e, s, r), "line");return o.top > i ? (l = Math.min(r, l), !0) : !(o.bottom <= i) && (o.left > n || !(o.right < n) && n - o.left < o.right - n);
          }, a, l);m = S(t.text, m, 1), o = new D(r, m, m == l ? "before" : "after");
        }var g = ur(e, o, "line", t, s);return (i < g.top || g.bottom < i) && (o.outside = !0), o.xRel = n < g.left ? -1 : n > g.right ? 1 : 0, o;
      }function vr(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;if (null == Za) {
          Za = n("pre");for (var i = 0; i < 49; ++i) {
            Za.appendChild(document.createTextNode("x")), Za.appendChild(n("br"));
          }Za.appendChild(document.createTextNode("x"));
        }r(e.measure, Za);var o = Za.offsetHeight / 50;return o > 3 && (e.cachedTextHeight = o), t(e.measure), o || 1;
      }function yr(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;var t = n("span", "xxxxxxxxxx"),
            i = n("pre", [t]);r(e.measure, i);var o = t.getBoundingClientRect(),
            a = (o.right - o.left) / 10;return a > 2 && (e.cachedCharWidth = a), a || 10;
      }function xr(e) {
        for (var t = e.display, r = {}, n = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) {
          r[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + i, n[e.options.gutters[a]] = o.clientWidth;
        }return { fixedPos: br(t), gutterTotalWidth: t.gutters.offsetWidth, gutterLeft: r, gutterWidth: n, wrapperWidth: t.wrapper.clientWidth };
      }function br(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
      }function wr(e) {
        var t = vr(e.display),
            r = e.options.lineWrapping,
            n = r && Math.max(5, e.display.scroller.clientWidth / yr(e.display) - 3);return function (i) {
          if (ge(e.doc, i)) return 0;var o = 0;if (i.widgets) for (var a = 0; a < i.widgets.length; a++) {
            i.widgets[a].height && (o += i.widgets[a].height);
          }return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
        };
      }function kr(e) {
        var t = e.doc,
            r = wr(e);t.iter(function (e) {
          var t = r(e);t != e.height && E(e, t);
        });
      }function Cr(e, t, r, n) {
        var i = e.display;if (!r && "true" == Be(t).getAttribute("cm-not-content")) return null;var o,
            a,
            l = i.lineSpace.getBoundingClientRect();try {
          o = t.clientX - l.left, a = t.clientY - l.top;
        } catch (t) {
          return null;
        }var s,
            c = hr(e, o, a);if (n && 1 == c.xRel && (s = T(e.doc, c.line).text).length == c.ch) {
          var u = d(s, s.length, e.options.tabSize) - s.length;c = D(c.line, Math.max(0, Math.round((o - Ft(e.display).left) / yr(e.display)) - u));
        }return c;
      }function Sr(e, t) {
        if (t >= e.display.viewTo) return null;if ((t -= e.display.viewFrom) < 0) return null;for (var r = e.display.view, n = 0; n < r.length; n++) {
          if ((t -= r[n].size) < 0) return n;
        }
      }function Mr(e) {
        e.display.input.showSelection(e.display.input.prepareSelection());
      }function Lr(e, t) {
        for (var r = e.doc, n = {}, i = n.cursors = document.createDocumentFragment(), o = n.selection = document.createDocumentFragment(), a = 0; a < r.sel.ranges.length; a++) {
          if (!1 !== t || a != r.sel.primIndex) {
            var l = r.sel.ranges[a];if (!(l.from().line >= e.display.viewTo || l.to().line < e.display.viewFrom)) {
              var s = l.empty();(s || e.options.showCursorWhenSelecting) && Tr(e, l.head, i), s || Nr(e, l, o);
            }
          }
        }return n;
      }function Tr(e, t, r) {
        var i = ur(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            o = r.appendChild(n("div", " ", "CodeMirror-cursor"));if (o.style.left = i.left + "px", o.style.top = i.top + "px", o.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px", i.other) {
          var a = r.appendChild(n("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));a.style.display = "", a.style.left = i.other.left + "px", a.style.top = i.other.top + "px", a.style.height = .85 * (i.other.bottom - i.other.top) + "px";
        }
      }function Nr(e, t, r) {
        function i(e, t, r, i) {
          t < 0 && (t = 0), t = Math.round(t), i = Math.round(i), s.appendChild(n("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == r ? d - e : r) + "px;\n                             height: " + (i - t) + "px"));
        }function o(t, r, n) {
          function o(r, n) {
            return cr(e, D(t, r), "div", c, n);
          }var a,
              s,
              c = T(l, t),
              f = c.text.length;return we(Ce(c, l.direction), r || 0, null == n ? f : n, function (e, t, l) {
            var c,
                h,
                p,
                m = o(e, "left");if (e == t) c = m, h = p = m.left;else {
              if (c = o(t - 1, "right"), "rtl" == l) {
                var g = m;m = c, c = g;
              }h = m.left, p = c.right;
            }null == r && 0 == e && (h = u), c.top - m.top > 3 && (i(h, m.top, null, m.bottom), h = u, m.bottom < c.top && i(h, m.bottom, null, c.top)), null == n && t == f && (p = d), (!a || m.top < a.top || m.top == a.top && m.left < a.left) && (a = m), (!s || c.bottom > s.bottom || c.bottom == s.bottom && c.right > s.right) && (s = c), h < u + 1 && (h = u), i(h, c.top, p - h, c.bottom);
          }), { start: a, end: s };
        }var a = e.display,
            l = e.doc,
            s = document.createDocumentFragment(),
            c = Ft(e.display),
            u = c.left,
            d = Math.max(a.sizerWidth, jt(e) - a.sizer.offsetLeft) - c.right,
            f = t.from(),
            h = t.to();if (f.line == h.line) o(f.line, f.ch, h.ch);else {
          var p = T(l, f.line),
              m = T(l, h.line),
              g = de(p) == de(m),
              v = o(f.line, f.ch, g ? p.text.length + 1 : null).end,
              y = o(h.line, g ? 0 : null, h.ch).start;g && (v.top < y.top - 2 ? (i(v.right, v.top, null, v.bottom), i(u, y.top, y.left, y.bottom)) : i(v.right, v.top, y.left - v.right, v.bottom)), v.bottom < y.top && i(u, v.bottom, null, y.top);
        }r.appendChild(s);
      }function Ar(e) {
        if (e.state.focused) {
          var t = e.display;clearInterval(t.blinker);var r = !0;t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function () {
            return t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden";
          }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
        }
      }function Er(e) {
        e.state.focused || (e.display.input.focus(), Ir(e));
      }function Or(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function () {
          e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, Rr(e));
        }, 100);
      }function Ir(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Ee(e, "focus", e, t), e.state.focused = !0, l(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), oa && setTimeout(function () {
          return e.display.input.reset(!0);
        }, 20)), e.display.input.receivedFocus()), Ar(e));
      }function Rr(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (Ee(e, "blur", e, t), e.state.focused = !1, ka(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function () {
          e.state.focused || (e.display.shift = !1);
        }, 150));
      }function Pr(e) {
        for (var t = e.display, r = t.lineDiv.offsetTop, n = 0; n < t.view.length; n++) {
          var i = t.view[n],
              o = void 0;if (!i.hidden) {
            if (na && ia < 8) {
              var a = i.node.offsetTop + i.node.offsetHeight;o = a - r, r = a;
            } else {
              var l = i.node.getBoundingClientRect();o = l.bottom - l.top;
            }var s = i.line.height - o;if (o < 2 && (o = vr(t)), (s > .001 || s < -.001) && (E(i.line, o), Dr(i.line), i.rest)) for (var c = 0; c < i.rest.length; c++) {
              Dr(i.rest[c]);
            }
          }
        }
      }function Dr(e) {
        if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) {
          e.widgets[t].height = e.widgets[t].node.parentNode.offsetHeight;
        }
      }function Hr(e, t, r) {
        var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;n = Math.floor(n - Bt(e));var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
            o = I(t, n),
            a = I(t, i);if (r && r.ensure) {
          var l = r.ensure.from.line,
              s = r.ensure.to.line;l < o ? (o = l, a = I(t, ye(T(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = I(t, ye(T(t, s)) - e.wrapper.clientHeight), a = s);
        }return { from: o, to: Math.max(a, o + 1) };
      }function zr(e) {
        var t = e.display,
            r = t.view;if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
          for (var n = br(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = n + "px", a = 0; a < r.length; a++) {
            if (!r[a].hidden) {
              e.options.fixedGutter && (r[a].gutter && (r[a].gutter.style.left = o), r[a].gutterBackground && (r[a].gutterBackground.style.left = o));var l = r[a].alignable;if (l) for (var s = 0; s < l.length; s++) {
                l[s].style.left = o;
              }
            }
          }e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
        }
      }function _r(e) {
        if (!e.options.lineNumbers) return !1;var t = e.doc,
            r = P(e.options, t.first + t.size - 1),
            i = e.display;if (r.length != i.lineNumChars) {
          var o = i.measure.appendChild(n("div", [n("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
              a = o.firstChild.offsetWidth,
              l = o.offsetWidth - a;return i.lineGutter.style.width = "", i.lineNumInnerWidth = Math.max(a, i.lineGutter.offsetWidth - l) + 1, i.lineNumWidth = i.lineNumInnerWidth + l, i.lineNumChars = i.lineNumInnerWidth ? r.length : -1, i.lineGutter.style.width = i.lineNumWidth + "px", En(e), !0;
        }return !1;
      }function Br(e, t) {
        if (!Oe(e, "scrollCursorIntoView")) {
          var r = e.display,
              i = r.sizer.getBoundingClientRect(),
              o = null;if (t.top + i.top < 0 ? o = !0 : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (o = !1), null != o && !da) {
            var a = n("div", "​", null, "position: absolute;\n                         top: " + (t.top - r.viewOffset - Bt(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Ut(e) + r.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");e.display.lineSpace.appendChild(a), a.scrollIntoView(o), e.display.lineSpace.removeChild(a);
          }
        }
      }function Wr(e, t, r, n) {
        null == n && (n = 0);for (var i, o = 0; o < 5; o++) {
          var a = !1,
              l = ur(e, t),
              s = r && r != t ? ur(e, r) : l;i = { left: Math.min(l.left, s.left), top: Math.min(l.top, s.top) - n, right: Math.max(l.left, s.left), bottom: Math.max(l.bottom, s.bottom) + n };var c = Ur(e, i),
              u = e.doc.scrollTop,
              d = e.doc.scrollLeft;if (null != c.scrollTop && (Kr(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)), null != c.scrollLeft && (Zr(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - d) > 1 && (a = !0)), !a) break;
        }return i;
      }function Fr(e, t) {
        var r = Ur(e, t);null != r.scrollTop && Kr(e, r.scrollTop), null != r.scrollLeft && Zr(e, r.scrollLeft);
      }function Ur(e, t) {
        var r = e.display,
            n = vr(e.display);t.top < 0 && (t.top = 0);var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : r.scroller.scrollTop,
            o = qt(e),
            a = {};t.bottom - t.top > o && (t.bottom = t.top + o);var l = e.doc.height + Wt(r),
            s = t.top < n,
            c = t.bottom > l - n;if (t.top < i) a.scrollTop = s ? 0 : t.top;else if (t.bottom > i + o) {
          var u = Math.min(t.top, (c ? l : t.bottom) - o);u != i && (a.scrollTop = u);
        }var d = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : r.scroller.scrollLeft,
            f = jt(e) - (e.options.fixedGutter ? r.gutters.offsetWidth : 0),
            h = t.right - t.left > f;return h && (t.right = t.left + f), t.left < 10 ? a.scrollLeft = 0 : t.left < d ? a.scrollLeft = Math.max(0, t.left - (h ? 0 : 10)) : t.right > f + d - 3 && (a.scrollLeft = t.right + (h ? 0 : 10) - f), a;
      }function jr(e, t) {
        null != t && (Yr(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t);
      }function qr(e) {
        Yr(e);var t = e.getCursor(),
            r = t,
            n = t;e.options.lineWrapping || (r = t.ch ? D(t.line, t.ch - 1) : t, n = D(t.line, t.ch + 1)), e.curOp.scrollToPos = { from: r, to: n, margin: e.options.cursorScrollMargin };
      }function Gr(e, t, r) {
        null == t && null == r || Yr(e), null != t && (e.curOp.scrollLeft = t), null != r && (e.curOp.scrollTop = r);
      }function $r(e, t) {
        Yr(e), e.curOp.scrollToPos = t;
      }function Yr(e) {
        var t = e.curOp.scrollToPos;if (t) {
          e.curOp.scrollToPos = null;Vr(e, dr(e, t.from), dr(e, t.to), t.margin);
        }
      }function Vr(e, t, r, n) {
        var i = Ur(e, { left: Math.min(t.left, r.left), top: Math.min(t.top, r.top) - n, right: Math.max(t.right, r.right), bottom: Math.max(t.bottom, r.bottom) + n });Gr(e, i.scrollLeft, i.scrollTop);
      }function Kr(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (Jo || Nn(e, { top: t }), Xr(e, t, !0), Jo && Nn(e), wn(e, 100));
      }function Xr(e, t, r) {
        t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t), (e.display.scroller.scrollTop != t || r) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
      }function Zr(e, t, r, n) {
        t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !n || (e.doc.scrollLeft = t, zr(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t));
      }function Qr(e) {
        var t = e.display,
            r = t.gutters.offsetWidth,
            n = Math.round(e.doc.height + Wt(e.display));return { clientHeight: t.scroller.clientHeight, viewHeight: t.wrapper.clientHeight, scrollWidth: t.scroller.scrollWidth, clientWidth: t.scroller.clientWidth, viewWidth: t.wrapper.clientWidth, barLeft: e.options.fixedGutter ? r : 0, docHeight: n, scrollHeight: n + Ut(e) + t.barHeight, nativeBarWidth: t.nativeBarWidth, gutterWidth: r };
      }function Jr(e, t) {
        t || (t = Qr(e));var r = e.display.barWidth,
            n = e.display.barHeight;en(e, t);for (var i = 0; i < 4 && r != e.display.barWidth || n != e.display.barHeight; i++) {
          r != e.display.barWidth && e.options.lineWrapping && Pr(e), en(e, Qr(e)), r = e.display.barWidth, n = e.display.barHeight;
        }
      }function en(e, t) {
        var r = e.display,
            n = r.scrollbars.update(t);r.sizer.style.paddingRight = (r.barWidth = n.right) + "px", r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px", r.heightForcer.style.borderBottom = n.bottom + "px solid transparent", n.right && n.bottom ? (r.scrollbarFiller.style.display = "block", r.scrollbarFiller.style.height = n.bottom + "px", r.scrollbarFiller.style.width = n.right + "px") : r.scrollbarFiller.style.display = "", n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (r.gutterFiller.style.display = "block", r.gutterFiller.style.height = n.bottom + "px", r.gutterFiller.style.width = t.gutterWidth + "px") : r.gutterFiller.style.display = "";
      }function tn(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && ka(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new ol[e.options.scrollbarStyle](function (t) {
          e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), Wa(t, "mousedown", function () {
            e.state.focused && setTimeout(function () {
              return e.display.input.focus();
            }, 0);
          }), t.setAttribute("cm-not-content", "true");
        }, function (t, r) {
          "horizontal" == r ? Zr(e, t) : Kr(e, t);
        }, e), e.display.scrollbars.addClass && l(e.display.wrapper, e.display.scrollbars.addClass);
      }function rn(e) {
        e.curOp = { cm: e, viewChanged: !1, startHeight: e.doc.height, forceUpdate: !1, updateInput: null, typing: !1, changeObjs: null, cursorActivityHandlers: null, cursorActivityCalled: 0, selectionChanged: !1, updateMaxLine: !1, scrollLeft: null, scrollTop: null, scrollToPos: null, focus: !1, id: ++al }, bt(e.curOp);
      }function nn(e) {
        kt(e.curOp, function (e) {
          for (var t = 0; t < e.ops.length; t++) {
            e.ops[t].cm.curOp = null;
          }on(e);
        });
      }function on(e) {
        for (var t = e.ops, r = 0; r < t.length; r++) {
          an(t[r]);
        }for (var n = 0; n < t.length; n++) {
          ln(t[n]);
        }for (var i = 0; i < t.length; i++) {
          sn(t[i]);
        }for (var o = 0; o < t.length; o++) {
          cn(t[o]);
        }for (var a = 0; a < t.length; a++) {
          un(t[a]);
        }
      }function an(e) {
        var t = e.cm,
            r = t.display;Cn(t), e.updateMaxLine && be(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < r.viewFrom || e.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new ll(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate);
      }function ln(e) {
        e.updatedDisplay = e.mustUpdate && Ln(e.cm, e.update);
      }function sn(e) {
        var t = e.cm,
            r = t.display;e.updatedDisplay && Pr(t), e.barMeasure = Qr(t), r.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Vt(t, r.maxLine, r.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(r.scroller.clientWidth, r.sizer.offsetLeft + e.adjustWidthTo + Ut(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, r.sizer.offsetLeft + e.adjustWidthTo - jt(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = r.input.prepareSelection(e.focus));
      }function cn(e) {
        var t = e.cm;null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && Zr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);var r = e.focus && e.focus == a() && (!document.hasFocus || document.hasFocus());e.preparedSelection && t.display.input.showSelection(e.preparedSelection, r), (e.updatedDisplay || e.startHeight != t.doc.height) && Jr(t, e.barMeasure), e.updatedDisplay && On(t, e.barMeasure), e.selectionChanged && Ar(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), r && Er(e.cm);
      }function un(e) {
        var t = e.cm,
            r = t.display,
            n = t.doc;if (e.updatedDisplay && Tn(t, e.update), null == r.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && Xr(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && Zr(t, e.scrollLeft, !0, !0), e.scrollToPos) {
          Br(t, Wr(t, U(n, e.scrollToPos.from), U(n, e.scrollToPos.to), e.scrollToPos.margin));
        }var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;if (i) for (var a = 0; a < i.length; ++a) {
          i[a].lines.length || Ee(i[a], "hide");
        }if (o) for (var l = 0; l < o.length; ++l) {
          o[l].lines.length && Ee(o[l], "unhide");
        }r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Ee(t, "changes", t, e.changeObjs), e.update && e.update.finish();
      }function dn(e, t) {
        if (e.curOp) return t();rn(e);try {
          return t();
        } finally {
          nn(e);
        }
      }function fn(e, t) {
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
      }function mn(e, t, r, n) {
        null == t && (t = e.doc.first), null == r && (r = e.doc.first + e.doc.size), n || (n = 0);var i = e.display;if (n && r < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) Ha && pe(e.doc, t) < i.viewTo && vn(e);else if (r <= i.viewFrom) Ha && me(e.doc, r + n) > i.viewFrom ? vn(e) : (i.viewFrom += n, i.viewTo += n);else if (t <= i.viewFrom && r >= i.viewTo) vn(e);else if (t <= i.viewFrom) {
          var o = yn(e, r, r + n, 1);o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += n) : vn(e);
        } else if (r >= i.viewTo) {
          var a = yn(e, t, t, -1);a ? (i.view = i.view.slice(0, a.index), i.viewTo = a.lineN) : vn(e);
        } else {
          var l = yn(e, t, t, -1),
              s = yn(e, r, r + n, 1);l && s ? (i.view = i.view.slice(0, l.index).concat(xt(e, l.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += n) : vn(e);
        }var c = i.externalMeasured;c && (r < c.lineN ? c.lineN += n : t < c.lineN + c.size && (i.externalMeasured = null));
      }function gn(e, t, r) {
        e.curOp.viewChanged = !0;var n = e.display,
            i = e.display.externalMeasured;if (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null), !(t < n.viewFrom || t >= n.viewTo)) {
          var o = n.view[Sr(e, t)];if (null != o.node) {
            var a = o.changes || (o.changes = []);-1 == f(a, r) && a.push(r);
          }
        }
      }function vn(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
      }function yn(e, t, r, n) {
        var i,
            o = Sr(e, t),
            a = e.display.view;if (!Ha || r == e.doc.first + e.doc.size) return { index: o, lineN: r };for (var l = e.display.viewFrom, s = 0; s < o; s++) {
          l += a[s].size;
        }if (l != t) {
          if (n > 0) {
            if (o == a.length - 1) return null;i = l + a[o].size - t, o++;
          } else i = l - t;t += i, r += i;
        }for (; pe(e.doc, r) != r;) {
          if (o == (n < 0 ? 0 : a.length - 1)) return null;r += n * a[o - (n < 0 ? 1 : 0)].size, o += n;
        }return { index: o, lineN: r };
      }function xn(e, t, r) {
        var n = e.display;0 == n.view.length || t >= n.viewTo || r <= n.viewFrom ? (n.view = xt(e, t, r), n.viewFrom = t) : (n.viewFrom > t ? n.view = xt(e, t, n.viewFrom).concat(n.view) : n.viewFrom < t && (n.view = n.view.slice(Sr(e, t))), n.viewFrom = t, n.viewTo < r ? n.view = n.view.concat(xt(e, n.viewTo, r)) : n.viewTo > r && (n.view = n.view.slice(0, Sr(e, r)))), n.viewTo = r;
      }function bn(e) {
        for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
          var i = t[n];i.hidden || i.node && !i.changes || ++r;
        }return r;
      }function wn(e, t) {
        e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, c(kn, e));
      }function kn(e) {
        var t = e.doc;if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.viewTo)) {
          var r = +new Date() + e.options.workTime,
              n = Ke(t.mode, et(e, t.frontier)),
              i = [];t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
            if (t.frontier >= e.display.viewFrom) {
              var a = o.styles,
                  l = o.text.length > e.options.maxHighlightLength,
                  s = Qe(e, o, l ? Ke(t.mode, n) : n, !0);o.styles = s.styles;var c = o.styleClasses,
                  u = s.classes;u ? o.styleClasses = u : c && (o.styleClasses = null);for (var d = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), f = 0; !d && f < a.length; ++f) {
                d = a[f] != o.styles[f];
              }d && i.push(t.frontier), o.stateAfter = l ? n : Ke(t.mode, n);
            } else o.text.length <= e.options.maxHighlightLength && tt(e, o.text, n), o.stateAfter = t.frontier % 5 == 0 ? Ke(t.mode, n) : null;if (++t.frontier, +new Date() > r) return wn(e, e.options.workDelay), !0;
          }), i.length && dn(e, function () {
            for (var t = 0; t < i.length; t++) {
              gn(e, i[t], "text");
            }
          });
        }
      }function Cn(e) {
        var t = e.display;!t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Ut(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Ut(e) + "px", t.scrollbarsClipped = !0);
      }function Sn(e) {
        if (e.hasFocus()) return null;var t = a();if (!t || !o(e.display.lineDiv, t)) return null;var r = { activeElt: t };if (window.getSelection) {
          var n = window.getSelection();n.anchorNode && n.extend && o(e.display.lineDiv, n.anchorNode) && (r.anchorNode = n.anchorNode, r.anchorOffset = n.anchorOffset, r.focusNode = n.focusNode, r.focusOffset = n.focusOffset);
        }return r;
      }function Mn(e) {
        if (e && e.activeElt && e.activeElt != a() && (e.activeElt.focus(), e.anchorNode && o(document.body, e.anchorNode) && o(document.body, e.focusNode))) {
          var t = window.getSelection(),
              r = document.createRange();r.setEnd(e.anchorNode, e.anchorOffset), r.collapse(!1), t.removeAllRanges(), t.addRange(r), t.extend(e.focusNode, e.focusOffset);
        }
      }function Ln(e, r) {
        var n = e.display,
            i = e.doc;if (r.editorIsHidden) return vn(e), !1;if (!r.force && r.visible.from >= n.viewFrom && r.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == bn(e)) return !1;_r(e) && (vn(e), r.dims = xr(e));var o = i.first + i.size,
            a = Math.max(r.visible.from - e.options.viewportMargin, i.first),
            l = Math.min(o, r.visible.to + e.options.viewportMargin);n.viewFrom < a && a - n.viewFrom < 20 && (a = Math.max(i.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(o, n.viewTo)), Ha && (a = pe(e.doc, a), l = me(e.doc, l));var s = a != n.viewFrom || l != n.viewTo || n.lastWrapHeight != r.wrapperHeight || n.lastWrapWidth != r.wrapperWidth;xn(e, a, l), n.viewOffset = ye(T(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";var c = bn(e);if (!s && 0 == c && !r.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;var u = Sn(e);return c > 4 && (n.lineDiv.style.display = "none"), An(e, n.updateLineNumbers, r.dims), c > 4 && (n.lineDiv.style.display = ""), n.renderedView = n.view, Mn(u), t(n.cursorDiv), t(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, s && (n.lastWrapHeight = r.wrapperHeight, n.lastWrapWidth = r.wrapperWidth, wn(e, 400)), n.updateLineNumbers = null, !0;
      }function Tn(e, t) {
        for (var r = t.viewport, n = !0; (n && e.options.lineWrapping && t.oldDisplayWidth != jt(e) || (r && null != r.top && (r = { top: Math.min(e.doc.height + Wt(e.display) - qt(e), r.top) }), t.visible = Hr(e.display, e.doc, r), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && Ln(e, t); n = !1) {
          Pr(e);var i = Qr(e);Mr(e), Jr(e, i), On(e, i);
        }t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
      }function Nn(e, t) {
        var r = new ll(e, t);if (Ln(e, r)) {
          Pr(e), Tn(e, r);var n = Qr(e);Mr(e), Jr(e, n), On(e, n), r.finish();
        }
      }function An(e, r, n) {
        function i(t) {
          var r = t.nextSibling;return oa && ma && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), r;
        }for (var o = e.display, a = e.options.lineNumbers, l = o.lineDiv, s = l.firstChild, c = o.view, u = o.viewFrom, d = 0; d < c.length; d++) {
          var h = c[d];if (h.hidden) ;else if (h.node && h.node.parentNode == l) {
            for (; s != h.node;) {
              s = i(s);
            }var p = a && null != r && r <= u && h.lineNumber;h.changes && (f(h.changes, "gutter") > -1 && (p = !1), Mt(e, h, u, n)), p && (t(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(P(e.options, u)))), s = h.node.nextSibling;
          } else {
            var m = Rt(e, h, u, n);l.insertBefore(m, s);
          }u += h.size;
        }for (; s;) {
          s = i(s);
        }
      }function En(e) {
        var t = e.display.gutters.offsetWidth;e.display.sizer.style.marginLeft = t + "px";
      }function On(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Ut(e) + "px";
      }function In(e) {
        var r = e.display.gutters,
            i = e.options.gutters;t(r);for (var o = 0; o < i.length; ++o) {
          var a = i[o],
              l = r.appendChild(n("div", null, "CodeMirror-gutter " + a));"CodeMirror-linenumbers" == a && (e.display.lineGutter = l, l.style.width = (e.display.lineNumWidth || 1) + "px");
        }r.style.display = o ? "" : "none", En(e);
      }function Rn(e) {
        var t = f(e.gutters, "CodeMirror-linenumbers");-1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1));
      }function Pn(e) {
        var t = e.wheelDeltaX,
            r = e.wheelDeltaY;return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == r && e.detail && e.axis == e.VERTICAL_AXIS ? r = e.detail : null == r && (r = e.wheelDelta), { x: t, y: r };
      }function Dn(e) {
        var t = Pn(e);return t.x *= cl, t.y *= cl, t;
      }function Hn(e, t) {
        var r = Pn(t),
            n = r.x,
            i = r.y,
            o = e.display,
            a = o.scroller,
            l = a.scrollWidth > a.clientWidth,
            s = a.scrollHeight > a.clientHeight;if (n && l || i && s) {
          if (i && ma && oa) e: for (var c = t.target, u = o.view; c != a; c = c.parentNode) {
            for (var d = 0; d < u.length; d++) {
              if (u[d].node == c) {
                e.display.currentWheelTarget = c;break e;
              }
            }
          }if (n && !Jo && !sa && null != cl) return i && s && Kr(e, Math.max(0, a.scrollTop + i * cl)), Zr(e, Math.max(0, a.scrollLeft + n * cl)), (!i || i && s) && De(t), void (o.wheelStartX = null);if (i && null != cl) {
            var f = i * cl,
                h = e.doc.scrollTop,
                p = h + o.wrapper.clientHeight;f < 0 ? h = Math.max(0, h + f - 50) : p = Math.min(e.doc.height, p + f + 50), Nn(e, { top: h, bottom: p });
          }sl < 20 && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = n, o.wheelDY = i, setTimeout(function () {
            if (null != o.wheelStartX) {
              var e = a.scrollLeft - o.wheelStartX,
                  t = a.scrollTop - o.wheelStartY,
                  r = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;o.wheelStartX = o.wheelStartY = null, r && (cl = (cl * sl + r) / (sl + 1), ++sl);
            }
          }, 200)) : (o.wheelDX += n, o.wheelDY += i));
        }
      }function zn(e, t) {
        var r = e[t];e.sort(function (e, t) {
          return H(e.from(), t.from());
        }), t = f(e, r);for (var n = 1; n < e.length; n++) {
          var i = e[n],
              o = e[n - 1];if (H(o.to(), i.from()) >= 0) {
            var a = W(o.from(), i.from()),
                l = B(o.to(), i.to()),
                s = o.empty() ? i.from() == i.head : o.from() == o.head;n <= t && --t, e.splice(--n, 2, new dl(s ? l : a, s ? a : l));
          }
        }return new ul(e, t);
      }function _n(e, t) {
        return new ul([new dl(e, t || e)], 0);
      }function Bn(e) {
        return e.text ? D(e.from.line + e.text.length - 1, m(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
      }function Wn(e, t) {
        if (H(e, t.from) < 0) return e;if (H(e, t.to) <= 0) return Bn(t);var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            n = e.ch;return e.line == t.to.line && (n += Bn(t).ch - t.to.ch), D(r, n);
      }function Fn(e, t) {
        for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
          var i = e.sel.ranges[n];r.push(new dl(Wn(i.anchor, t), Wn(i.head, t)));
        }return zn(r, e.sel.primIndex);
      }function Un(e, t, r) {
        return e.line == t.line ? D(r.line, e.ch - t.ch + r.ch) : D(r.line + (e.line - t.line), e.ch);
      }function jn(e, t, r) {
        for (var n = [], i = D(e.first, 0), o = i, a = 0; a < t.length; a++) {
          var l = t[a],
              s = Un(l.from, i, o),
              c = Un(Bn(l), i, o);if (i = l.to, o = c, "around" == r) {
            var u = e.sel.ranges[a],
                d = H(u.head, u.anchor) < 0;n[a] = new dl(d ? c : s, d ? s : c);
          } else n[a] = new dl(s, s);
        }return new ul(n, e.sel.primIndex);
      }function qn(e) {
        e.doc.mode = Ye(e.options, e.doc.modeOption), Gn(e);
      }function Gn(e) {
        e.doc.iter(function (e) {
          e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
        }), e.doc.frontier = e.doc.first, wn(e, 100), e.state.modeGen++, e.curOp && mn(e);
      }function $n(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == m(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
      }function Yn(e, t, r, n) {
        function i(e) {
          return r ? r[e] : null;
        }function o(e, r, i) {
          st(e, r, i, n), Ct(e, "change", e, t);
        }function a(e, t) {
          for (var r = [], o = e; o < t; ++o) {
            r.push(new Xa(c[o], i(o), n));
          }return r;
        }var l = t.from,
            s = t.to,
            c = t.text,
            u = T(e, l.line),
            d = T(e, s.line),
            f = m(c),
            h = i(c.length - 1),
            p = s.line - l.line;if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);else if ($n(e, t)) {
          var g = a(0, c.length - 1);o(d, d.text, h), p && e.remove(l.line, p), g.length && e.insert(l.line, g);
        } else if (u == d) {
          if (1 == c.length) o(u, u.text.slice(0, l.ch) + f + u.text.slice(s.ch), h);else {
            var v = a(1, c.length - 1);v.push(new Xa(f + u.text.slice(s.ch), h, n)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, v);
          }
        } else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + d.text.slice(s.ch), i(0)), e.remove(l.line + 1, p);else {
          o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(d, f + d.text.slice(s.ch), h);var y = a(1, c.length - 1);p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, y);
        }Ct(e, "change", e, t);
      }function Vn(e, t, r) {
        function n(e, i, o) {
          if (e.linked) for (var a = 0; a < e.linked.length; ++a) {
            var l = e.linked[a];if (l.doc != i) {
              var s = o && l.sharedHist;r && !s || (t(l.doc, s), n(l.doc, e, s));
            }
          }
        }n(e, null, !0);
      }function Kn(e, t) {
        if (t.cm) throw new Error("This document is already in use.");e.doc = t, t.cm = e, kr(e), qn(e), Xn(e), e.options.lineWrapping || be(e), e.options.mode = t.modeOption, mn(e);
      }function Xn(e) {
        ("rtl" == e.doc.direction ? l : ka)(e.display.lineDiv, "CodeMirror-rtl");
      }function Zn(e) {
        dn(e, function () {
          Xn(e), mn(e);
        });
      }function Qn(e) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1;
      }function Jn(e, t) {
        var r = { from: _(t.from), to: Bn(t), text: N(e, t.from, t.to) };return ai(e, r, t.from.line, t.to.line + 1), Vn(e, function (e) {
          return ai(e, r, t.from.line, t.to.line + 1);
        }, !0), r;
      }function ei(e) {
        for (; e.length;) {
          if (!m(e).ranges) break;e.pop();
        }
      }function ti(e, t) {
        return t ? (ei(e.done), m(e.done)) : e.done.length && !m(e.done).ranges ? m(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), m(e.done)) : void 0;
      }function ri(e, t, r, n) {
        var i = e.history;i.undone.length = 0;var o,
            a,
            l = +new Date();if ((i.lastOp == n || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > l - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = ti(i, i.lastOp == n))) a = m(o.changes), 0 == H(t.from, t.to) && 0 == H(t.from, a.to) ? a.to = Bn(t) : o.changes.push(Jn(e, t));else {
          var s = m(i.done);for (s && s.ranges || oi(e.sel, i.done), o = { changes: [Jn(e, t)], generation: i.generation }, i.done.push(o); i.done.length > i.undoDepth;) {
            i.done.shift(), i.done[0].ranges || i.done.shift();
          }
        }i.done.push(r), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = n, i.lastOrigin = i.lastSelOrigin = t.origin, a || Ee(e, "historyAdded");
      }function ni(e, t, r, n) {
        var i = t.charAt(0);return "*" == i || "+" == i && r.ranges.length == n.ranges.length && r.somethingSelected() == n.somethingSelected() && new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500);
      }function ii(e, t, r, n) {
        var i = e.history,
            o = n && n.origin;r == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ni(e, o, m(i.done), t)) ? i.done[i.done.length - 1] = t : oi(t, i.done), i.lastSelTime = +new Date(), i.lastSelOrigin = o, i.lastSelOp = r, n && !1 !== n.clearRedo && ei(i.undone);
      }function oi(e, t) {
        var r = m(t);r && r.ranges && r.equals(e) || t.push(e);
      }function ai(e, t, r, n) {
        var i = t["spans_" + e.id],
            o = 0;e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function (r) {
          r.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans), ++o;
        });
      }function li(e) {
        if (!e) return null;for (var t, r = 0; r < e.length; ++r) {
          e[r].marker.explicitlyCleared ? t || (t = e.slice(0, r)) : t && t.push(e[r]);
        }return t ? t.length ? t : null : e;
      }function si(e, t) {
        var r = t["spans_" + e.id];if (!r) return null;for (var n = [], i = 0; i < t.text.length; ++i) {
          n.push(li(r[i]));
        }return n;
      }function ci(e, t) {
        var r = si(e, t),
            n = J(e, t);if (!r) return n;if (!n) return r;for (var i = 0; i < r.length; ++i) {
          var o = r[i],
              a = n[i];if (o && a) e: for (var l = 0; l < a.length; ++l) {
            for (var s = a[l], c = 0; c < o.length; ++c) {
              if (o[c].marker == s.marker) continue e;
            }o.push(s);
          } else a && (r[i] = a);
        }return r;
      }function ui(e, t, r) {
        for (var n = [], i = 0; i < e.length; ++i) {
          var o = e[i];if (o.ranges) n.push(r ? ul.prototype.deepCopy.call(o) : o);else {
            var a = o.changes,
                l = [];n.push({ changes: l });for (var s = 0; s < a.length; ++s) {
              var c = a[s],
                  u = void 0;if (l.push({ from: c.from, to: c.to, text: c.text }), t) for (var d in c) {
                (u = d.match(/^spans_(\d+)$/)) && f(t, Number(u[1])) > -1 && (m(l)[d] = c[d], delete c[d]);
              }
            }
          }
        }return n;
      }function di(e, t, r, n) {
        if (e.cm && e.cm.display.shift || e.extend) {
          var i = t.anchor;if (n) {
            var o = H(r, i) < 0;o != H(n, i) < 0 ? (i = r, r = n) : o != H(r, n) < 0 && (r = n);
          }return new dl(i, r);
        }return new dl(n || r, r);
      }function fi(e, t, r, n) {
        yi(e, new ul([di(e, e.sel.primary(), t, r)], 0), n);
      }function hi(e, t, r) {
        for (var n = [], i = 0; i < e.sel.ranges.length; i++) {
          n[i] = di(e, e.sel.ranges[i], t[i], null);
        }yi(e, zn(n, e.sel.primIndex), r);
      }function pi(e, t, r, n) {
        var i = e.sel.ranges.slice(0);i[t] = r, yi(e, zn(i, e.sel.primIndex), n);
      }function mi(e, t, r, n) {
        yi(e, _n(t, r), n);
      }function gi(e, t, r) {
        var n = { ranges: t.ranges, update: function update(t) {
            var r = this;this.ranges = [];for (var n = 0; n < t.length; n++) {
              r.ranges[n] = new dl(U(e, t[n].anchor), U(e, t[n].head));
            }
          }, origin: r && r.origin };return Ee(e, "beforeSelectionChange", e, n), e.cm && Ee(e.cm, "beforeSelectionChange", e.cm, n), n.ranges != t.ranges ? zn(n.ranges, n.ranges.length - 1) : t;
      }function vi(e, t, r) {
        var n = e.history.done,
            i = m(n);i && i.ranges ? (n[n.length - 1] = t, xi(e, t, r)) : yi(e, t, r);
      }function yi(e, t, r) {
        xi(e, t, r), ii(e, e.sel, e.cm ? e.cm.curOp.id : NaN, r);
      }function xi(e, t, r) {
        (Re(e, "beforeSelectionChange") || e.cm && Re(e.cm, "beforeSelectionChange")) && (t = gi(e, t, r)), bi(e, ki(e, t, r && r.bias || (H(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)), r && !1 === r.scroll || !e.cm || qr(e.cm);
      }function bi(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, Ie(e.cm)), Ct(e, "cursorActivity", e));
      }function wi(e) {
        bi(e, ki(e, e.sel, null, !1));
      }function ki(e, t, r, n) {
        for (var i, o = 0; o < t.ranges.length; o++) {
          var a = t.ranges[o],
              l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
              s = Si(e, a.anchor, l && l.anchor, r, n),
              c = Si(e, a.head, l && l.head, r, n);(i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new dl(s, c));
        }return i ? zn(i, t.primIndex) : t;
      }function Ci(e, t, r, n, i) {
        var o = T(e, t.line);if (o.markedSpans) for (var a = 0; a < o.markedSpans.length; ++a) {
          var l = o.markedSpans[a],
              s = l.marker;if ((null == l.from || (s.inclusiveLeft ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (s.inclusiveRight ? l.to >= t.ch : l.to > t.ch))) {
            if (i && (Ee(s, "beforeCursorEnter"), s.explicitlyCleared)) {
              if (o.markedSpans) {
                --a;continue;
              }break;
            }if (!s.atomic) continue;if (r) {
              var c = s.find(n < 0 ? 1 : -1),
                  u = void 0;if ((n < 0 ? s.inclusiveRight : s.inclusiveLeft) && (c = Mi(e, c, -n, c && c.line == t.line ? o : null)), c && c.line == t.line && (u = H(c, r)) && (n < 0 ? u < 0 : u > 0)) return Ci(e, c, t, n, i);
            }var d = s.find(n < 0 ? -1 : 1);return (n < 0 ? s.inclusiveLeft : s.inclusiveRight) && (d = Mi(e, d, n, d.line == t.line ? o : null)), d ? Ci(e, d, t, n, i) : null;
          }
        }return t;
      }function Si(e, t, r, n, i) {
        var o = n || 1,
            a = Ci(e, t, r, o, i) || !i && Ci(e, t, r, o, !0) || Ci(e, t, r, -o, i) || !i && Ci(e, t, r, -o, !0);return a || (e.cantEdit = !0, D(e.first, 0));
      }function Mi(e, t, r, n) {
        return r < 0 && 0 == t.ch ? t.line > e.first ? U(e, D(t.line - 1)) : null : r > 0 && t.ch == (n || T(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? D(t.line + 1, 0) : null : new D(t.line, t.ch + r);
      }function Li(e) {
        e.setSelection(D(e.firstLine(), 0), D(e.lastLine()), Aa);
      }function Ti(e, t, r) {
        var n = { canceled: !1, from: t.from, to: t.to, text: t.text, origin: t.origin, cancel: function cancel() {
            return n.canceled = !0;
          } };return r && (n.update = function (t, r, i, o) {
          t && (n.from = U(e, t)), r && (n.to = U(e, r)), i && (n.text = i), void 0 !== o && (n.origin = o);
        }), Ee(e, "beforeChange", e, n), e.cm && Ee(e.cm, "beforeChange", e.cm, n), n.canceled ? null : { from: n.from, to: n.to, text: n.text, origin: n.origin };
      }function Ni(e, t, r) {
        if (e.cm) {
          if (!e.cm.curOp) return fn(e.cm, Ni)(e, t, r);if (e.cm.state.suppressEdits) return;
        }if (!(Re(e, "beforeChange") || e.cm && Re(e.cm, "beforeChange")) || (t = Ti(e, t, !0))) {
          var n = Da && !r && te(e, t.from, t.to);if (n) for (var i = n.length - 1; i >= 0; --i) {
            Ai(e, { from: n[i].from, to: n[i].to, text: i ? [""] : t.text });
          } else Ai(e, t);
        }
      }function Ai(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != H(t.from, t.to)) {
          var r = Fn(e, t);ri(e, t, r, e.cm ? e.cm.curOp.id : NaN), Ii(e, t, r, J(e, t));var n = [];Vn(e, function (e, r) {
            r || -1 != f(n, e.history) || (zi(e.history, t), n.push(e.history)), Ii(e, t, null, J(e, t));
          });
        }
      }function Ei(e, t, r) {
        if (!e.cm || !e.cm.state.suppressEdits || r) {
          for (var n, i = e.history, o = e.sel, a = "undo" == t ? i.done : i.undone, l = "undo" == t ? i.undone : i.done, s = 0; s < a.length && (n = a[s], r ? !n.ranges || n.equals(e.sel) : n.ranges); s++) {}if (s != a.length) {
            for (i.lastOrigin = i.lastSelOrigin = null; n = a.pop(), n.ranges;) {
              if (oi(n, l), r && !n.equals(e.sel)) return void yi(e, n, { clearRedo: !1 });o = n;
            }var c = [];oi(o, l), l.push({ changes: c, generation: i.generation }), i.generation = n.generation || ++i.maxGeneration;for (var u = Re(e, "beforeChange") || e.cm && Re(e.cm, "beforeChange"), d = n.changes.length - 1; d >= 0; --d) {
              var h = function (r) {
                var i = n.changes[r];if (i.origin = t, u && !Ti(e, i, !1)) return a.length = 0, {};c.push(Jn(e, i));var o = r ? Fn(e, i) : m(a);Ii(e, i, o, ci(e, i)), !r && e.cm && e.cm.scrollIntoView({ from: i.from, to: Bn(i) });var l = [];Vn(e, function (e, t) {
                  t || -1 != f(l, e.history) || (zi(e.history, i), l.push(e.history)), Ii(e, i, null, ci(e, i));
                });
              }(d);if (h) return h.v;
            }
          }
        }
      }function Oi(e, t) {
        if (0 != t && (e.first += t, e.sel = new ul(g(e.sel.ranges, function (e) {
          return new dl(D(e.anchor.line + t, e.anchor.ch), D(e.head.line + t, e.head.ch));
        }), e.sel.primIndex), e.cm)) {
          mn(e.cm, e.first, e.first - t, t);for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++) {
            gn(e.cm, n, "gutter");
          }
        }
      }function Ii(e, t, r, n) {
        if (e.cm && !e.cm.curOp) return fn(e.cm, Ii)(e, t, r, n);if (t.to.line < e.first) return void Oi(e, t.text.length - 1 - (t.to.line - t.from.line));if (!(t.from.line > e.lastLine())) {
          if (t.from.line < e.first) {
            var i = t.text.length - 1 - (e.first - t.from.line);Oi(e, i), t = { from: D(e.first, 0), to: D(t.to.line + i, t.to.ch), text: [m(t.text)], origin: t.origin };
          }var o = e.lastLine();t.to.line > o && (t = { from: t.from, to: D(o, T(e, o).text.length), text: [t.text[0]], origin: t.origin }), t.removed = N(e, t.from, t.to), r || (r = Fn(e, t)), e.cm ? Ri(e.cm, t, n) : Yn(e, t, n), xi(e, r, Aa);
        }
      }function Ri(e, t, r) {
        var n = e.doc,
            i = e.display,
            o = t.from,
            a = t.to,
            l = !1,
            s = o.line;e.options.lineWrapping || (s = O(de(T(n, o.line))), n.iter(s, a.line + 1, function (e) {
          if (e == i.maxLine) return l = !0, !0;
        })), n.sel.contains(t.from, t.to) > -1 && Ie(e), Yn(n, t, r, wr(e)), e.options.lineWrapping || (n.iter(s, o.line + t.text.length, function (e) {
          var t = xe(e);t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1);
        }), l && (e.curOp.updateMaxLine = !0)), n.frontier = Math.min(n.frontier, o.line), wn(e, 400);var c = t.text.length - (a.line - o.line) - 1;t.full ? mn(e) : o.line != a.line || 1 != t.text.length || $n(e.doc, t) ? mn(e, o.line, a.line + 1, c) : gn(e, o.line, "text");var u = Re(e, "changes"),
            d = Re(e, "change");if (d || u) {
          var f = { from: o, to: a, text: t.text, removed: t.removed, origin: t.origin };d && Ct(e, "change", e, f), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f);
        }e.display.selForContextMenu = null;
      }function Pi(e, t, r, n, i) {
        if (n || (n = r), H(n, r) < 0) {
          var o = n;n = r, r = o;
        }"string" == typeof t && (t = e.splitLines(t)), Ni(e, { from: r, to: n, text: t, origin: i });
      }function Di(e, t, r, n) {
        r < e.line ? e.line += n : t < e.line && (e.line = t, e.ch = 0);
      }function Hi(e, t, r, n) {
        for (var i = 0; i < e.length; ++i) {
          var o = e[i],
              a = !0;if (o.ranges) {
            o.copied || (o = e[i] = o.deepCopy(), o.copied = !0);for (var l = 0; l < o.ranges.length; l++) {
              Di(o.ranges[l].anchor, t, r, n), Di(o.ranges[l].head, t, r, n);
            }
          } else {
            for (var s = 0; s < o.changes.length; ++s) {
              var c = o.changes[s];if (r < c.from.line) c.from = D(c.from.line + n, c.from.ch), c.to = D(c.to.line + n, c.to.ch);else if (t <= c.to.line) {
                a = !1;break;
              }
            }a || (e.splice(0, i + 1), i = 0);
          }
        }
      }function zi(e, t) {
        var r = t.from.line,
            n = t.to.line,
            i = t.text.length - (n - r) - 1;Hi(e.done, r, n, i), Hi(e.undone, r, n, i);
      }function _i(e, t, r, n) {
        var i = t,
            o = t;return "number" == typeof t ? o = T(e, F(e, t)) : i = O(t), null == i ? null : (n(o, i) && e.cm && gn(e.cm, i, r), o);
      }function Bi(e, t, r) {
        ye(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && jr(e, r);
      }function Wi(e, t, r, n) {
        var i = new pl(e, r, n),
            o = e.cm;return o && i.noHScroll && (o.display.alignWidgets = !0), _i(e, t, "widget", function (t) {
          var r = t.widgets || (t.widgets = []);if (null == i.insertAt ? r.push(i) : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !ge(e, t)) {
            var n = ye(t) < e.scrollTop;E(t, t.height + zt(i)), n && jr(o, i.height), o.curOp.forceUpdate = !0;
          }return !0;
        }), Ct(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : O(t)), i;
      }function Fi(e, t, r, n, o) {
        if (n && n.shared) return Ui(e, t, r, n, o);if (e.cm && !e.cm.curOp) return fn(e.cm, Fi)(e, t, r, n, o);var a = new gl(e, o),
            l = H(t, r);if (n && u(n, a, !1), l > 0 || 0 == l && !1 !== a.clearWhenEmpty) return a;if (a.replacedWith && (a.collapsed = !0, a.widgetNode = i("span", [a.replacedWith], "CodeMirror-widget"), n.handleMouseEvents || a.widgetNode.setAttribute("cm-ignore-events", "true"), n.insertLeft && (a.widgetNode.insertLeft = !0)), a.collapsed) {
          if (ue(e, t.line, t, r, a) || t.line != r.line && ue(e, r.line, t, r, a)) throw new Error("Inserting collapsed marker partially overlapping an existing one");$();
        }a.addToHistory && ri(e, { from: t, to: r, origin: "markText" }, e.sel, NaN);var s,
            c = t.line,
            d = e.cm;if (e.iter(c, r.line + 1, function (e) {
          d && a.collapsed && !d.options.lineWrapping && de(e) == d.display.maxLine && (s = !0), a.collapsed && c != t.line && E(e, 0), X(e, new Y(a, c == t.line ? t.ch : null, c == r.line ? r.ch : null)), ++c;
        }), a.collapsed && e.iter(t.line, r.line + 1, function (t) {
          ge(e, t) && E(t, 0);
        }), a.clearOnEnter && Wa(a, "beforeCursorEnter", function () {
          return a.clear();
        }), a.readOnly && (G(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), a.collapsed && (a.id = ++ml, a.atomic = !0), d) {
          if (s && (d.curOp.updateMaxLine = !0), a.collapsed) mn(d, t.line, r.line + 1);else if (a.className || a.title || a.startStyle || a.endStyle || a.css) for (var f = t.line; f <= r.line; f++) {
            gn(d, f, "text");
          }a.atomic && wi(d.doc), Ct(d, "markerAdded", d, a);
        }return a;
      }function Ui(e, t, r, n, i) {
        n = u(n), n.shared = !1;var o = [Fi(e, t, r, n, i)],
            a = o[0],
            l = n.widgetNode;return Vn(e, function (e) {
          l && (n.widgetNode = l.cloneNode(!0)), o.push(Fi(e, U(e, t), U(e, r), n, i));for (var s = 0; s < e.linked.length; ++s) {
            if (e.linked[s].isParent) return;
          }a = m(o);
        }), new vl(o, a);
      }function ji(e) {
        return e.findMarks(D(e.first, 0), e.clipPos(D(e.lastLine())), function (e) {
          return e.parent;
        });
      }function qi(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r],
              i = n.find(),
              o = e.clipPos(i.from),
              a = e.clipPos(i.to);if (H(o, a)) {
            var l = Fi(e, o, a, n.primary, n.primary.type);n.markers.push(l), l.parent = n;
          }
        }
      }function Gi(e) {
        for (var t = 0; t < e.length; t++) {
          !function (t) {
            var r = e[t],
                n = [r.primary.doc];Vn(r.primary.doc, function (e) {
              return n.push(e);
            });for (var i = 0; i < r.markers.length; i++) {
              var o = r.markers[i];-1 == f(n, o.doc) && (o.parent = null, r.markers.splice(i--, 1));
            }
          }(t);
        }
      }function $i(e) {
        var t = this;if (Ki(t), !Oe(t, e) && !_t(t.display, e)) {
          De(e), na && (bl = +new Date());var r = Cr(t, e, !0),
              n = e.dataTransfer.files;if (r && !t.isReadOnly()) if (n && n.length && window.FileReader && window.File) for (var i = n.length, o = Array(i), a = 0, l = 0; l < i; ++l) {
            !function (e, n) {
              if (!t.options.allowDropFileTypes || -1 != f(t.options.allowDropFileTypes, e.type)) {
                var l = new FileReader();l.onload = fn(t, function () {
                  var e = l.result;if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[n] = e, ++a == i) {
                    r = U(t.doc, r);var s = { from: r, to: r, text: t.doc.splitLines(o.join(t.doc.lineSeparator())), origin: "paste" };Ni(t.doc, s), vi(t.doc, _n(r, Bn(s)));
                  }
                }), l.readAsText(e);
              }
            }(n[l], l);
          } else {
            if (t.state.draggingText && t.doc.sel.contains(r) > -1) return t.state.draggingText(e), void setTimeout(function () {
              return t.display.input.focus();
            }, 20);try {
              var s = e.dataTransfer.getData("Text");if (s) {
                var c;if (t.state.draggingText && !t.state.draggingText.copy && (c = t.listSelections()), xi(t.doc, _n(r, r)), c) for (var u = 0; u < c.length; ++u) {
                  Pi(t.doc, "", c[u].anchor, c[u].head, "drag");
                }t.replaceSelection(s, "around", "paste"), t.display.input.focus();
              }
            } catch (e) {}
          }
        }
      }function Yi(e, t) {
        if (na && (!e.state.draggingText || +new Date() - bl < 100)) return void _e(t);if (!Oe(e, t) && !_t(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !ca)) {
          var r = n("img", null, null, "position: fixed; left: 0; top: 0;");r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", sa && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), sa && r.parentNode.removeChild(r);
        }
      }function Vi(e, t) {
        var i = Cr(e, t);if (i) {
          var o = document.createDocumentFragment();Tr(e, i, o), e.display.dragCursor || (e.display.dragCursor = n("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), r(e.display.dragCursor, o);
        }
      }function Ki(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null);
      }function Xi(e) {
        if (document.body.getElementsByClassName) for (var t = document.body.getElementsByClassName("CodeMirror"), r = 0; r < t.length; r++) {
          var n = t[r].CodeMirror;n && e(n);
        }
      }function Zi() {
        wl || (Qi(), wl = !0);
      }function Qi() {
        var e;Wa(window, "resize", function () {
          null == e && (e = setTimeout(function () {
            e = null, Xi(Ji);
          }, 100));
        }), Wa(window, "blur", function () {
          return Xi(Rr);
        });
      }function Ji(e) {
        var t = e.display;t.lastWrapHeight == t.wrapper.clientHeight && t.lastWrapWidth == t.wrapper.clientWidth || (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize());
      }function eo(e) {
        var t = e.split(/-(?!$)/);e = t[t.length - 1];for (var r, n, i, o, a = 0; a < t.length - 1; a++) {
          var l = t[a];if (/^(cmd|meta|m)$/i.test(l)) o = !0;else if (/^a(lt)?$/i.test(l)) r = !0;else if (/^(c|ctrl|control)$/i.test(l)) n = !0;else {
            if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);i = !0;
          }
        }return r && (e = "Alt-" + e), n && (e = "Ctrl-" + e), o && (e = "Cmd-" + e), i && (e = "Shift-" + e), e;
      }function to(e) {
        var t = {};for (var r in e) {
          if (e.hasOwnProperty(r)) {
            var n = e[r];if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;if ("..." == n) {
              delete e[r];continue;
            }for (var i = g(r.split(" "), eo), o = 0; o < i.length; o++) {
              var a = void 0,
                  l = void 0;o == i.length - 1 ? (l = i.join(" "), a = n) : (l = i.slice(0, o + 1).join(" "), a = "...");var s = t[l];if (s) {
                if (s != a) throw new Error("Inconsistent bindings for " + l);
              } else t[l] = a;
            }delete e[r];
          }
        }for (var c in t) {
          e[c] = t[c];
        }return e;
      }function ro(e, t, r, n) {
        t = oo(t);var i = t.call ? t.call(e, n) : t[e];if (!1 === i) return "nothing";if ("..." === i) return "multi";if (null != i && r(i)) return "handled";if (t.fallthrough) {
          if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return ro(e, t.fallthrough, r, n);for (var o = 0; o < t.fallthrough.length; o++) {
            var a = ro(e, t.fallthrough[o], r, n);if (a) return a;
          }
        }
      }function no(e) {
        var t = "string" == typeof e ? e : kl[e.keyCode];return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
      }function io(e, t) {
        if (sa && 34 == e.keyCode && e.char) return !1;var r = kl[e.keyCode],
            n = r;return null != n && !e.altGraphKey && (e.altKey && "Alt" != r && (n = "Alt-" + n), (ba ? e.metaKey : e.ctrlKey) && "Ctrl" != r && (n = "Ctrl-" + n), (ba ? e.ctrlKey : e.metaKey) && "Cmd" != r && (n = "Cmd-" + n), !t && e.shiftKey && "Shift" != r && (n = "Shift-" + n), n);
      }function oo(e) {
        return "string" == typeof e ? Ll[e] : e;
      }function ao(e, t) {
        for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
          for (var o = t(r[i]); n.length && H(o.from, m(n).to) <= 0;) {
            var a = n.pop();if (H(a.from, o.from) < 0) {
              o.from = a.from;break;
            }
          }n.push(o);
        }dn(e, function () {
          for (var t = n.length - 1; t >= 0; t--) {
            Pi(e.doc, "", n[t].from, n[t].to, "+delete");
          }qr(e);
        });
      }function lo(e, t) {
        var r = T(e.doc, t),
            n = de(r);return n != r && (t = O(n)), Le(!0, e, n, t, 1);
      }function so(e, t) {
        var r = T(e.doc, t),
            n = fe(r);return n != r && (t = O(n)), Le(!0, e, r, t, -1);
      }function co(e, t) {
        var r = lo(e, t.line),
            n = T(e.doc, r.line),
            i = Ce(n, e.doc.direction);if (!i || 0 == i[0].level) {
          var o = Math.max(0, n.text.search(/\S/)),
              a = t.line == r.line && t.ch <= o && t.ch;return D(r.line, a ? 0 : o, r.sticky);
        }return r;
      }function uo(e, t, r) {
        if ("string" == typeof t && !(t = Al[t])) return !1;e.display.input.ensurePolled();var n = e.display.shift,
            i = !1;try {
          e.isReadOnly() && (e.state.suppressEdits = !0), r && (e.display.shift = !1), i = t(e) != Na;
        } finally {
          e.display.shift = n, e.state.suppressEdits = !1;
        }return i;
      }function fo(e, t, r) {
        for (var n = 0; n < e.state.keyMaps.length; n++) {
          var i = ro(t, e.state.keyMaps[n], r, e);if (i) return i;
        }return e.options.extraKeys && ro(t, e.options.extraKeys, r, e) || ro(t, e.options.keyMap, r, e);
      }function ho(e, t, r, n) {
        var i = e.state.keySeq;if (i) {
          if (no(t)) return "handled";El.set(50, function () {
            e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
          }), t = i + " " + t;
        }var o = fo(e, t, n);return "multi" == o && (e.state.keySeq = t), "handled" == o && Ct(e, "keyHandled", e, t, r), "handled" != o && "multi" != o || (De(r), Ar(e)), i && !o && /\'$/.test(t) ? (De(r), !0) : !!o;
      }function po(e, t) {
        var r = io(t, !0);return !!r && (t.shiftKey && !e.state.keySeq ? ho(e, "Shift-" + r, t, function (t) {
          return uo(e, t, !0);
        }) || ho(e, r, t, function (t) {
          if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return uo(e, t);
        }) : ho(e, r, t, function (t) {
          return uo(e, t);
        }));
      }function mo(e, t, r) {
        return ho(e, "'" + r + "'", t, function (t) {
          return uo(e, t, !0);
        });
      }function go(e) {
        var t = this;if (t.curOp.focus = a(), !Oe(t, e)) {
          na && ia < 11 && 27 == e.keyCode && (e.returnValue = !1);var r = e.keyCode;t.display.shift = 16 == r || e.shiftKey;var n = po(t, e);sa && (Ol = n ? r : null, !n && 88 == r && !qa && (ma ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != r || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || vo(t);
        }
      }function vo(e) {
        function t(e) {
          18 != e.keyCode && e.altKey || (ka(r, "CodeMirror-crosshair"), Ae(document, "keyup", t), Ae(document, "mouseover", t));
        }var r = e.display.lineDiv;l(r, "CodeMirror-crosshair"), Wa(document, "keyup", t), Wa(document, "mouseover", t);
      }function yo(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), Oe(this, e);
      }function xo(e) {
        var t = this;if (!(_t(t.display, e) || Oe(t, e) || e.ctrlKey && !e.altKey || ma && e.metaKey)) {
          var r = e.keyCode,
              n = e.charCode;if (sa && r == Ol) return Ol = null, void De(e);if (!sa || e.which && !(e.which < 10) || !po(t, e)) {
            var i = String.fromCharCode(null == n ? r : n);"\b" != i && (mo(t, e, i) || t.display.input.onKeyPress(e));
          }
        }
      }function bo(e) {
        var t = this,
            r = t.display;if (!(Oe(t, e) || r.activeTouch && r.input.supportsTouch())) {
          if (r.input.ensurePolled(), r.shift = e.shiftKey, _t(r, e)) return void (oa || (r.scroller.draggable = !1, setTimeout(function () {
            return r.scroller.draggable = !0;
          }, 100)));if (!Mo(t, e)) {
            var n = Cr(t, e);switch (window.focus(), We(e)) {case 1:
                t.state.selectingText ? t.state.selectingText(e) : n ? wo(t, e, n) : Be(e) == r.scroller && De(e);break;case 2:
                oa && (t.state.lastMiddleDown = +new Date()), n && fi(t.doc, n), setTimeout(function () {
                  return r.input.focus();
                }, 20), De(e);break;case 3:
                wa ? Lo(t, e) : Or(t);}
          }
        }
      }function wo(e, t, r) {
        na ? setTimeout(c(Er, e), 0) : e.curOp.focus = a();var n,
            i = +new Date();Nl && Nl.time > i - 400 && 0 == H(Nl.pos, r) ? n = "triple" : Tl && Tl.time > i - 400 && 0 == H(Tl.pos, r) ? (n = "double", Nl = { time: i, pos: r }) : (n = "single", Tl = { time: i, pos: r });var o,
            l = e.doc.sel,
            s = ma ? t.metaKey : t.ctrlKey;e.options.dragDrop && Fa && !e.isReadOnly() && "single" == n && (o = l.contains(r)) > -1 && (H((o = l.ranges[o]).from(), r) < 0 || r.xRel > 0) && (H(o.to(), r) > 0 || r.xRel < 0) ? ko(e, t, r, s) : Co(e, t, r, n, s);
      }function ko(e, t, r, n) {
        var i = e.display,
            o = !1,
            a = fn(e, function (t) {
          oa && (i.scroller.draggable = !1), e.state.draggingText = !1, Ae(document, "mouseup", a), Ae(document, "mousemove", l), Ae(i.scroller, "dragstart", s), Ae(i.scroller, "drop", a), o || (De(t), n || fi(e.doc, r), oa || na && 9 == ia ? setTimeout(function () {
            document.body.focus(), i.input.focus();
          }, 20) : i.input.focus());
        }),
            l = function l(e) {
          o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10;
        },
            s = function s() {
          return o = !0;
        };oa && (i.scroller.draggable = !0), e.state.draggingText = a, a.copy = ma ? t.altKey : t.ctrlKey, i.scroller.dragDrop && i.scroller.dragDrop(), Wa(document, "mouseup", a), Wa(document, "mousemove", l), Wa(i.scroller, "dragstart", s), Wa(i.scroller, "drop", a), Or(e), setTimeout(function () {
          return i.input.focus();
        }, 20);
      }function Co(e, t, r, n, i) {
        function o(t) {
          if (0 != H(x, t)) if (x = t, "rect" == n) {
            for (var i = [], o = e.options.tabSize, a = d(T(u, r.line).text, r.ch, o), l = d(T(u, t.line).text, t.ch, o), s = Math.min(a, l), c = Math.max(a, l), g = Math.min(r.line, t.line), v = Math.min(e.lastLine(), Math.max(r.line, t.line)); g <= v; g++) {
              var y = T(u, g).text,
                  b = h(y, s, o);s == c ? i.push(new dl(D(g, b), D(g, b))) : y.length > b && i.push(new dl(D(g, b), D(g, h(y, c, o))));
            }i.length || i.push(new dl(r, r)), yi(u, zn(m.ranges.slice(0, p).concat(i), p), { origin: "*mouse", scroll: !1 }), e.scrollIntoView(t);
          } else {
            var w = f,
                k = w.anchor,
                C = t;if ("single" != n) {
              var S;S = "double" == n ? e.findWordAt(t) : new dl(D(t.line, 0), U(u, D(t.line + 1, 0))), H(S.anchor, k) > 0 ? (C = S.head, k = W(w.from(), S.anchor)) : (C = S.anchor, k = B(w.to(), S.head));
            }var M = m.ranges.slice(0);M[p] = new dl(U(u, k), C), yi(u, zn(M, p), Ea);
          }
        }function l(t) {
          var r = ++w,
              i = Cr(e, t, !0, "rect" == n);if (i) if (0 != H(i, x)) {
            e.curOp.focus = a(), o(i);var s = Hr(c, u);(i.line >= s.to || i.line < s.from) && setTimeout(fn(e, function () {
              w == r && l(t);
            }), 150);
          } else {
            var d = t.clientY < b.top ? -20 : t.clientY > b.bottom ? 20 : 0;d && setTimeout(fn(e, function () {
              w == r && (c.scroller.scrollTop += d, l(t));
            }), 50);
          }
        }function s(t) {
          e.state.selectingText = !1, w = 1 / 0, De(t), c.input.focus(), Ae(document, "mousemove", k), Ae(document, "mouseup", C), u.history.lastSelOrigin = null;
        }var c = e.display,
            u = e.doc;De(t);var f,
            p,
            m = u.sel,
            g = m.ranges;if (i && !t.shiftKey ? (p = u.sel.contains(r), f = p > -1 ? g[p] : new dl(r, r)) : (f = u.sel.primary(), p = u.sel.primIndex), ga ? t.shiftKey && t.metaKey : t.altKey) n = "rect", i || (f = new dl(r, r)), r = Cr(e, t, !0, !0), p = -1;else if ("double" == n) {
          var v = e.findWordAt(r);f = e.display.shift || u.extend ? di(u, f, v.anchor, v.head) : v;
        } else if ("triple" == n) {
          var y = new dl(D(r.line, 0), U(u, D(r.line + 1, 0)));f = e.display.shift || u.extend ? di(u, f, y.anchor, y.head) : y;
        } else f = di(u, f, r);i ? -1 == p ? (p = g.length, yi(u, zn(g.concat([f]), p), { scroll: !1, origin: "*mouse" })) : g.length > 1 && g[p].empty() && "single" == n && !t.shiftKey ? (yi(u, zn(g.slice(0, p).concat(g.slice(p + 1)), 0), { scroll: !1, origin: "*mouse" }), m = u.sel) : pi(u, p, f, Ea) : (p = 0, yi(u, new ul([f], 0), Ea), m = u.sel);var x = r,
            b = c.wrapper.getBoundingClientRect(),
            w = 0,
            k = fn(e, function (e) {
          We(e) ? l(e) : s(e);
        }),
            C = fn(e, s);e.state.selectingText = C, Wa(document, "mousemove", k), Wa(document, "mouseup", C);
      }function So(e, t, r, n) {
        var i, o;try {
          i = t.clientX, o = t.clientY;
        } catch (t) {
          return !1;
        }if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;n && De(t);var a = e.display,
            l = a.lineDiv.getBoundingClientRect();if (o > l.bottom || !Re(e, r)) return ze(t);o -= l.top - a.viewOffset;for (var s = 0; s < e.options.gutters.length; ++s) {
          var c = a.gutters.childNodes[s];if (c && c.getBoundingClientRect().right >= i) {
            return Ee(e, r, e, I(e.doc, o), e.options.gutters[s], t), ze(t);
          }
        }
      }function Mo(e, t) {
        return So(e, t, "gutterClick", !0);
      }function Lo(e, t) {
        _t(e.display, t) || To(e, t) || Oe(e, t, "contextmenu") || e.display.input.onContextMenu(t);
      }function To(e, t) {
        return !!Re(e, "gutterContextMenu") && So(e, t, "gutterContextMenu", !1);
      }function No(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), ir(e);
      }function Ao(e) {
        In(e), mn(e), zr(e);
      }function Eo(e, t, r) {
        if (!t != !(r && r != Il)) {
          var n = e.display.dragFunctions,
              i = t ? Wa : Ae;i(e.display.scroller, "dragstart", n.start), i(e.display.scroller, "dragenter", n.enter), i(e.display.scroller, "dragover", n.over), i(e.display.scroller, "dragleave", n.leave), i(e.display.scroller, "drop", n.drop);
        }
      }function Oo(e) {
        e.options.lineWrapping ? (l(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (ka(e.display.wrapper, "CodeMirror-wrap"), be(e)), kr(e), mn(e), ir(e), setTimeout(function () {
          return Jr(e);
        }, 100);
      }function Io(e, t) {
        var r = this;if (!(this instanceof Io)) return new Io(e, t);this.options = t = t ? u(t) : {}, u(Rl, t, !1), Rn(t);var n = t.value;"string" == typeof n && (n = new xl(n, t.mode, null, t.lineSeparator, t.direction)), this.doc = n;var i = new Io.inputStyles[t.inputStyle](this),
            o = this.display = new L(e, n, i);o.wrapper.CodeMirror = this, In(this), No(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), tn(this), this.state = { keyMaps: [], overlays: [], modeGen: 0, overwrite: !1, delayingBlurEvent: !1, focused: !1, suppressEdits: !1, pasteIncoming: !1, cutIncoming: !1, selectingText: !1, draggingText: !1, highlight: new Sa(), keySeq: null, specialChars: null }, t.autofocus && !pa && o.input.focus(), na && ia < 11 && setTimeout(function () {
          return r.display.input.reset(!0);
        }, 20), Ro(this), Zi(), rn(this), this.curOp.forceUpdate = !0, Kn(this, n), t.autofocus && !pa || this.hasFocus() ? setTimeout(c(Ir, this), 20) : Rr(this);for (var a in Pl) {
          Pl.hasOwnProperty(a) && Pl[a](r, t[a], Il);
        }_r(this), t.finishInit && t.finishInit(this);for (var l = 0; l < Dl.length; ++l) {
          Dl[l](r);
        }nn(this), oa && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto");
      }function Ro(e) {
        function t() {
          i.activeTouch && (o = setTimeout(function () {
            return i.activeTouch = null;
          }, 1e3), a = i.activeTouch, a.end = +new Date());
        }function r(e) {
          if (1 != e.touches.length) return !1;var t = e.touches[0];return t.radiusX <= 1 && t.radiusY <= 1;
        }function n(e, t) {
          if (null == t.left) return !0;var r = t.left - e.left,
              n = t.top - e.top;return r * r + n * n > 400;
        }var i = e.display;Wa(i.scroller, "mousedown", fn(e, bo)), na && ia < 11 ? Wa(i.scroller, "dblclick", fn(e, function (t) {
          if (!Oe(e, t)) {
            var r = Cr(e, t);if (r && !Mo(e, t) && !_t(e.display, t)) {
              De(t);var n = e.findWordAt(r);fi(e.doc, n.anchor, n.head);
            }
          }
        })) : Wa(i.scroller, "dblclick", function (t) {
          return Oe(e, t) || De(t);
        }), wa || Wa(i.scroller, "contextmenu", function (t) {
          return Lo(e, t);
        });var o,
            a = { end: 0 };Wa(i.scroller, "touchstart", function (t) {
          if (!Oe(e, t) && !r(t)) {
            i.input.ensurePolled(), clearTimeout(o);var n = +new Date();i.activeTouch = { start: n, moved: !1, prev: n - a.end <= 300 ? a : null }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY);
          }
        }), Wa(i.scroller, "touchmove", function () {
          i.activeTouch && (i.activeTouch.moved = !0);
        }), Wa(i.scroller, "touchend", function (r) {
          var o = i.activeTouch;if (o && !_t(i, r) && null != o.left && !o.moved && new Date() - o.start < 300) {
            var a,
                l = e.coordsChar(i.activeTouch, "page");a = !o.prev || n(o, o.prev) ? new dl(l, l) : !o.prev.prev || n(o, o.prev.prev) ? e.findWordAt(l) : new dl(D(l.line, 0), U(e.doc, D(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), De(r);
          }t();
        }), Wa(i.scroller, "touchcancel", t), Wa(i.scroller, "scroll", function () {
          i.scroller.clientHeight && (Kr(e, i.scroller.scrollTop), Zr(e, i.scroller.scrollLeft, !0), Ee(e, "scroll", e));
        }), Wa(i.scroller, "mousewheel", function (t) {
          return Hn(e, t);
        }), Wa(i.scroller, "DOMMouseScroll", function (t) {
          return Hn(e, t);
        }), Wa(i.wrapper, "scroll", function () {
          return i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
        }), i.dragFunctions = { enter: function enter(t) {
            Oe(e, t) || _e(t);
          }, over: function over(t) {
            Oe(e, t) || (Vi(e, t), _e(t));
          }, start: function start(t) {
            return Yi(e, t);
          }, drop: fn(e, $i), leave: function leave(t) {
            Oe(e, t) || Ki(e);
          } };var l = i.input.getField();Wa(l, "keyup", function (t) {
          return yo.call(e, t);
        }), Wa(l, "keydown", fn(e, go)), Wa(l, "keypress", fn(e, xo)), Wa(l, "focus", function (t) {
          return Ir(e, t);
        }), Wa(l, "blur", function (t) {
          return Rr(e, t);
        });
      }function Po(e, t, r, n) {
        var i,
            o = e.doc;null == r && (r = "add"), "smart" == r && (o.mode.indent ? i = et(e, t) : r = "prev");var a = e.options.tabSize,
            l = T(o, t),
            s = d(l.text, null, a);l.stateAfter && (l.stateAfter = null);var c,
            u = l.text.match(/^\s*/)[0];if (n || /\S/.test(l.text)) {
          if ("smart" == r && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == Na || c > 150)) {
            if (!n) return;r = "prev";
          }
        } else c = 0, r = "not";"prev" == r ? c = t > o.first ? d(T(o, t - 1).text, null, a) : 0 : "add" == r ? c = s + e.options.indentUnit : "subtract" == r ? c = s - e.options.indentUnit : "number" == typeof r && (c = s + r), c = Math.max(0, c);var f = "",
            h = 0;if (e.options.indentWithTabs) for (var m = Math.floor(c / a); m; --m) {
          h += a, f += "\t";
        }if (h < c && (f += p(c - h)), f != u) return Pi(o, f, D(t, 0), D(t, u.length), "+input"), l.stateAfter = null, !0;for (var g = 0; g < o.sel.ranges.length; g++) {
          var v = o.sel.ranges[g];if (v.head.line == t && v.head.ch < u.length) {
            var y = D(t, u.length);pi(o, g, new dl(y, y));break;
          }
        }
      }function Do(e) {
        Hl = e;
      }function Ho(e, t, r, n, i) {
        var o = e.doc;e.display.shift = !1, n || (n = o.sel);var a = e.state.pasteIncoming || "paste" == i,
            l = Ua(t),
            s = null;if (a && n.ranges.length > 1) if (Hl && Hl.text.join("\n") == t) {
          if (n.ranges.length % Hl.text.length == 0) {
            s = [];for (var c = 0; c < Hl.text.length; c++) {
              s.push(o.splitLines(Hl.text[c]));
            }
          }
        } else l.length == n.ranges.length && (s = g(l, function (e) {
          return [e];
        }));for (var u, d = n.ranges.length - 1; d >= 0; d--) {
          var f = n.ranges[d],
              h = f.from(),
              p = f.to();f.empty() && (r && r > 0 ? h = D(h.line, h.ch - r) : e.state.overwrite && !a ? p = D(p.line, Math.min(T(o, p.line).text.length, p.ch + m(l).length)) : Hl && Hl.lineWise && Hl.text.join("\n") == t && (h = p = D(h.line, 0))), u = e.curOp.updateInput;var v = { from: h, to: p, text: s ? s[d % s.length] : l, origin: i || (a ? "paste" : e.state.cutIncoming ? "cut" : "+input") };Ni(e.doc, v), Ct(e, "inputRead", e, v);
        }t && !a && _o(e, t), qr(e), e.curOp.updateInput = u, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1;
      }function zo(e, t) {
        var r = e.clipboardData && e.clipboardData.getData("Text");if (r) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || dn(t, function () {
          return Ho(t, r, 0, null, "paste");
        }), !0;
      }function _o(e, t) {
        if (e.options.electricChars && e.options.smartIndent) for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
          var i = r.ranges[n];if (!(i.head.ch > 100 || n && r.ranges[n - 1].head.line == i.head.line)) {
            var o = e.getModeAt(i.head),
                a = !1;if (o.electricChars) {
              for (var l = 0; l < o.electricChars.length; l++) {
                if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                  a = Po(e, i.head.line, "smart");break;
                }
              }
            } else o.electricInput && o.electricInput.test(T(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Po(e, i.head.line, "smart"));a && Ct(e, "electricInput", e, i.head.line);
          }
        }
      }function Bo(e) {
        for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
          var i = e.doc.sel.ranges[n].head.line,
              o = { anchor: D(i, 0), head: D(i + 1, 0) };r.push(o), t.push(e.getRange(o.anchor, o.head));
        }return { text: t, ranges: r };
      }function Wo(e, t) {
        e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", !!t);
      }function Fo() {
        var e = n("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = n("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");return oa ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), fa && (e.style.border = "1px solid black"), Wo(e), t;
      }function Uo(e, t, r, n, i) {
        function o() {
          var n = t.line + r;return !(n < e.first || n >= e.first + e.size) && (t = new D(n, t.ch, t.sticky), c = T(e, n));
        }function a(n) {
          var a;if (null == (a = i ? Te(e.cm, c, t, r) : Me(c, t, r))) {
            if (n || !o()) return !1;t = Le(i, e.cm, c, t.line, r);
          } else t = a;return !0;
        }var l = t,
            s = r,
            c = T(e, t.line);if ("char" == n) a();else if ("column" == n) a(!0);else if ("word" == n || "group" == n) for (var u = null, d = "group" == n, f = e.cm && e.cm.getHelper(t, "wordChars"), h = !0; !(r < 0) || a(!h); h = !1) {
          var p = c.text.charAt(t.ch) || "\n",
              m = w(p, f) ? "w" : d && "\n" == p ? "n" : !d || /\s/.test(p) ? null : "p";if (!d || h || m || (m = "s"), u && u != m) {
            r < 0 && (r = 1, a(), t.sticky = "after");break;
          }if (m && (u = m), r > 0 && !a(!h)) break;
        }var g = Si(e, t, l, s, !0);return z(l, g) && (g.hitSide = !0), g;
      }function jo(e, t, r, n) {
        var i,
            o = e.doc,
            a = t.left;if ("page" == n) {
          var l = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
              s = Math.max(l - .5 * vr(e.display), 3);i = (r > 0 ? t.bottom : t.top) + r * s;
        } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);for (var c; c = hr(e, a, i), c.outside;) {
          if (r < 0 ? i <= 0 : i >= o.height) {
            c.hitSide = !0;break;
          }i += 5 * r;
        }return c;
      }function qo(e, t) {
        var r = Kt(e, t.line);if (!r || r.hidden) return null;var n = T(e.doc, t.line),
            i = $t(r, n, t.line),
            o = Ce(n, e.doc.direction),
            a = "left";if (o) {
          a = ke(o, t.ch) % 2 ? "right" : "left";
        }var l = Qt(i.map, t.ch, a);return l.offset = "right" == l.collapse ? l.end : l.start, l;
      }function Go(e) {
        for (var t = e; t; t = t.parentNode) {
          if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
        }return !1;
      }function $o(e, t) {
        return t && (e.bad = !0), e;
      }function Yo(e, t, r, n, i) {
        function o(e) {
          return function (t) {
            return t.id == e;
          };
        }function a() {
          u && (c += d, u = !1);
        }function l(e) {
          e && (a(), c += e);
        }function s(t) {
          if (1 == t.nodeType) {
            var r = t.getAttribute("cm-text");if (null != r) return void l(r || t.textContent.replace(/\u200b/g, ""));var c,
                f = t.getAttribute("cm-marker");if (f) {
              var h = e.findMarks(D(n, 0), D(i + 1, 0), o(+f));return void (h.length && (c = h[0].find()) && l(N(e.doc, c.from, c.to).join(d)));
            }if ("false" == t.getAttribute("contenteditable")) return;var p = /^(pre|div|p)$/i.test(t.nodeName);p && a();for (var m = 0; m < t.childNodes.length; m++) {
              s(t.childNodes[m]);
            }p && (u = !0);
          } else 3 == t.nodeType && l(t.nodeValue);
        }for (var c = "", u = !1, d = e.doc.lineSeparator(); s(t), t != r;) {
          t = t.nextSibling;
        }return c;
      }function Vo(e, t, r) {
        var n;if (t == e.display.lineDiv) {
          if (!(n = e.display.lineDiv.childNodes[r])) return $o(e.clipPos(D(e.display.viewTo - 1)), !0);t = null, r = 0;
        } else for (n = t;; n = n.parentNode) {
          if (!n || n == e.display.lineDiv) return null;if (n.parentNode && n.parentNode == e.display.lineDiv) break;
        }for (var i = 0; i < e.display.view.length; i++) {
          var o = e.display.view[i];if (o.node == n) return Ko(o, t, r);
        }
      }function Ko(e, t, r) {
        function n(t, r, n) {
          for (var i = -1; i < (d ? d.length : 0); i++) {
            for (var o = i < 0 ? u.map : d[i], a = 0; a < o.length; a += 3) {
              var l = o[a + 2];if (l == t || l == r) {
                var s = O(i < 0 ? e.line : e.rest[i]),
                    c = o[a] + n;return (n < 0 || l != t) && (c = o[a + (n ? 1 : 0)]), D(s, c);
              }
            }
          }
        }var i = e.text.firstChild,
            a = !1;if (!t || !o(i, t)) return $o(D(O(e.line), 0), !0);if (t == i && (a = !0, t = i.childNodes[r], r = 0, !t)) {
          var l = e.rest ? m(e.rest) : e.line;return $o(D(O(l), l.text.length), a);
        }var s = 3 == t.nodeType ? t : null,
            c = t;for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, r && (r = s.nodeValue.length)); c.parentNode != i;) {
          c = c.parentNode;
        }var u = e.measure,
            d = u.maps,
            f = n(s, c, r);if (f) return $o(f, a);for (var h = c.nextSibling, p = s ? s.nodeValue.length - r : 0; h; h = h.nextSibling) {
          if (f = n(h, h.firstChild, 0)) return $o(D(f.line, f.ch - p), a);p += h.textContent.length;
        }for (var g = c.previousSibling, v = r; g; g = g.previousSibling) {
          if (f = n(g, g.firstChild, -1)) return $o(D(f.line, f.ch + v), a);v += g.textContent.length;
        }
      }function Xo(e, t) {
        function r() {
          e.value = s.getValue();
        }if (t = t ? u(t) : {}, t.value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
          var n = a();t.autofocus = n == e || null != e.getAttribute("autofocus") && n == document.body;
        }var i;if (e.form && (Wa(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
          var o = e.form;i = o.submit;try {
            var l = o.submit = function () {
              r(), o.submit = i, o.submit(), o.submit = l;
            };
          } catch (e) {}
        }t.finishInit = function (t) {
          t.save = r, t.getTextArea = function () {
            return e;
          }, t.toTextArea = function () {
            t.toTextArea = isNaN, r(), e.parentNode.removeChild(t.getWrapperElement()), e.style.display = "", e.form && (Ae(e.form, "submit", r), "function" == typeof e.form.submit && (e.form.submit = i));
          };
        }, e.style.display = "none";var s = Io(function (t) {
          return e.parentNode.insertBefore(t, e.nextSibling);
        }, t);return s;
      }var Zo = navigator.userAgent,
          Qo = navigator.platform,
          Jo = /gecko\/\d/i.test(Zo),
          ea = /MSIE \d/.test(Zo),
          ta = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Zo),
          ra = /Edge\/(\d+)/.exec(Zo),
          na = ea || ta || ra,
          ia = na && (ea ? document.documentMode || 6 : +(ra || ta)[1]),
          oa = !ra && /WebKit\//.test(Zo),
          aa = oa && /Qt\/\d+\.\d+/.test(Zo),
          la = !ra && /Chrome\//.test(Zo),
          sa = /Opera\//.test(Zo),
          ca = /Apple Computer/.test(navigator.vendor),
          ua = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(Zo),
          da = /PhantomJS/.test(Zo),
          fa = !ra && /AppleWebKit/.test(Zo) && /Mobile\/\w+/.test(Zo),
          ha = /Android/.test(Zo),
          pa = fa || ha || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(Zo),
          ma = fa || /Mac/.test(Qo),
          ga = /\bCrOS\b/.test(Zo),
          va = /win/i.test(Qo),
          ya = sa && Zo.match(/Version\/(\d*\.\d*)/);ya && (ya = Number(ya[1])), ya && ya >= 15 && (sa = !1, oa = !0);var xa,
          ba = ma && (aa || sa && (null == ya || ya < 12.11)),
          wa = Jo || na && ia >= 9,
          ka = function ka(t, r) {
        var n = t.className,
            i = e(r).exec(n);if (i) {
          var o = n.slice(i.index + i[0].length);t.className = n.slice(0, i.index) + (o ? i[1] + o : "");
        }
      };xa = document.createRange ? function (e, t, r, n) {
        var i = document.createRange();return i.setEnd(n || e, r), i.setStart(e, t), i;
      } : function (e, t, r) {
        var n = document.body.createTextRange();try {
          n.moveToElementText(e.parentNode);
        } catch (e) {
          return n;
        }return n.collapse(!0), n.moveEnd("character", r), n.moveStart("character", t), n;
      };var Ca = function Ca(e) {
        e.select();
      };fa ? Ca = function Ca(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length;
      } : na && (Ca = function Ca(e) {
        try {
          e.select();
        } catch (e) {}
      });var Sa = function Sa() {
        this.id = null;
      };Sa.prototype.set = function (e, t) {
        clearTimeout(this.id), this.id = setTimeout(t, e);
      };var Ma,
          La,
          Ta = 30,
          Na = { toString: function toString() {
          return "CodeMirror.Pass";
        } },
          Aa = { scroll: !1 },
          Ea = { origin: "*mouse" },
          Oa = { origin: "+move" },
          Ia = [""],
          Ra = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
          Pa = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
          Da = !1,
          Ha = !1,
          za = null,
          _a = function () {
        function e(e) {
          return e <= 247 ? r.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1785 ? n.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L";
        }function t(e, t, r) {
          this.level = e, this.from = t, this.to = r;
        }var r = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            n = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",
            i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            o = /[stwN]/,
            a = /[LRr]/,
            l = /[Lb1n]/,
            s = /[1n]/;return function (r, n) {
          var c = "ltr" == n ? "L" : "R";if (0 == r.length || "ltr" == n && !i.test(r)) return !1;for (var u = r.length, d = [], f = 0; f < u; ++f) {
            d.push(e(r.charCodeAt(f)));
          }for (var h = 0, p = c; h < u; ++h) {
            var g = d[h];"m" == g ? d[h] = p : p = g;
          }for (var v = 0, y = c; v < u; ++v) {
            var x = d[v];"1" == x && "r" == y ? d[v] = "n" : a.test(x) && (y = x, "r" == x && (d[v] = "R"));
          }for (var b = 1, w = d[0]; b < u - 1; ++b) {
            var k = d[b];"+" == k && "1" == w && "1" == d[b + 1] ? d[b] = "1" : "," != k || w != d[b + 1] || "1" != w && "n" != w || (d[b] = w), w = k;
          }for (var C = 0; C < u; ++C) {
            var S = d[C];if ("," == S) d[C] = "N";else if ("%" == S) {
              var M = void 0;for (M = C + 1; M < u && "%" == d[M]; ++M) {}for (var L = C && "!" == d[C - 1] || M < u && "1" == d[M] ? "1" : "N", T = C; T < M; ++T) {
                d[T] = L;
              }C = M - 1;
            }
          }for (var N = 0, A = c; N < u; ++N) {
            var E = d[N];"L" == A && "1" == E ? d[N] = "L" : a.test(E) && (A = E);
          }for (var O = 0; O < u; ++O) {
            if (o.test(d[O])) {
              var I = void 0;for (I = O + 1; I < u && o.test(d[I]); ++I) {}for (var R = "L" == (O ? d[O - 1] : c), P = "L" == (I < u ? d[I] : c), D = R == P ? R ? "L" : "R" : c, H = O; H < I; ++H) {
                d[H] = D;
              }O = I - 1;
            }
          }for (var z, _ = [], B = 0; B < u;) {
            if (l.test(d[B])) {
              var W = B;for (++B; B < u && l.test(d[B]); ++B) {}_.push(new t(0, W, B));
            } else {
              var F = B,
                  U = _.length;for (++B; B < u && "L" != d[B]; ++B) {}for (var j = F; j < B;) {
                if (s.test(d[j])) {
                  F < j && _.splice(U, 0, new t(1, F, j));var q = j;for (++j; j < B && s.test(d[j]); ++j) {}_.splice(U, 0, new t(2, q, j)), F = j;
                } else ++j;
              }F < B && _.splice(U, 0, new t(1, F, B));
            }
          }return 1 == _[0].level && (z = r.match(/^\s+/)) && (_[0].from = z[0].length, _.unshift(new t(0, 0, z[0].length))), 1 == m(_).level && (z = r.match(/\s+$/)) && (m(_).to -= z[0].length, _.push(new t(0, u - z[0].length, u))), "rtl" == n ? _.reverse() : _;
        };
      }(),
          Ba = [],
          Wa = function Wa(e, t, r) {
        if (e.addEventListener) e.addEventListener(t, r, !1);else if (e.attachEvent) e.attachEvent("on" + t, r);else {
          var n = e._handlers || (e._handlers = {});n[t] = (n[t] || Ba).concat(r);
        }
      },
          Fa = function () {
        if (na && ia < 9) return !1;var e = n("div");return "draggable" in e || "dragDrop" in e;
      }(),
          Ua = 3 != "\n\nb".split(/\n/).length ? function (e) {
        for (var t = 0, r = [], n = e.length; t <= n;) {
          var i = e.indexOf("\n", t);-1 == i && (i = e.length);var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
              a = o.indexOf("\r");-1 != a ? (r.push(o.slice(0, a)), t += a + 1) : (r.push(o), t = i + 1);
        }return r;
      } : function (e) {
        return e.split(/\r\n?|\n/);
      },
          ja = window.getSelection ? function (e) {
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
          qa = function () {
        var e = n("div");return "oncopy" in e || (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
      }(),
          Ga = null,
          $a = {},
          Ya = {},
          Va = {},
          Ka = function Ka(e, t) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0;
      };Ka.prototype.eol = function () {
        return this.pos >= this.string.length;
      }, Ka.prototype.sol = function () {
        return this.pos == this.lineStart;
      }, Ka.prototype.peek = function () {
        return this.string.charAt(this.pos) || void 0;
      }, Ka.prototype.next = function () {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++);
      }, Ka.prototype.eat = function (e) {
        var t = this.string.charAt(this.pos);if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t;
      }, Ka.prototype.eatWhile = function (e) {
        for (var t = this.pos; this.eat(e);) {}return this.pos > t;
      }, Ka.prototype.eatSpace = function () {
        for (var e = this, t = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));) {
          ++e.pos;
        }return this.pos > t;
      }, Ka.prototype.skipToEnd = function () {
        this.pos = this.string.length;
      }, Ka.prototype.skipTo = function (e) {
        var t = this.string.indexOf(e, this.pos);if (t > -1) return this.pos = t, !0;
      }, Ka.prototype.backUp = function (e) {
        this.pos -= e;
      }, Ka.prototype.column = function () {
        return this.lastColumnPos < this.start && (this.lastColumnValue = d(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? d(this.string, this.lineStart, this.tabSize) : 0);
      }, Ka.prototype.indentation = function () {
        return d(this.string, null, this.tabSize) - (this.lineStart ? d(this.string, this.lineStart, this.tabSize) : 0);
      }, Ka.prototype.match = function (e, t, r) {
        if ("string" != typeof e) {
          var n = this.string.slice(this.pos).match(e);return n && n.index > 0 ? null : (n && !1 !== t && (this.pos += n[0].length), n);
        }var i = function i(e) {
          return r ? e.toLowerCase() : e;
        };if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0;
      }, Ka.prototype.current = function () {
        return this.string.slice(this.start, this.pos);
      }, Ka.prototype.hideFirstChars = function (e, t) {
        this.lineStart += e;try {
          return t();
        } finally {
          this.lineStart -= e;
        }
      };var Xa = function Xa(e, t, r) {
        this.text = e, ne(this, t), this.height = r ? r(this) : 1;
      };Xa.prototype.lineNo = function () {
        return O(this);
      }, Pe(Xa);var Za,
          Qa = {},
          Ja = {},
          el = null,
          tl = null,
          rl = { left: 0, right: 0, top: 0, bottom: 0 },
          nl = function nl(e, t, r) {
        this.cm = r;var i = this.vert = n("div", [n("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
            o = this.horiz = n("div", [n("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");e(i), e(o), Wa(i, "scroll", function () {
          i.clientHeight && t(i.scrollTop, "vertical");
        }), Wa(o, "scroll", function () {
          o.clientWidth && t(o.scrollLeft, "horizontal");
        }), this.checkedZeroWidth = !1, na && ia < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
      };nl.prototype.update = function (e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            r = e.scrollHeight > e.clientHeight + 1,
            n = e.nativeBarWidth;if (r) {
          this.vert.style.display = "block", this.vert.style.bottom = t ? n + "px" : "0";var i = e.viewHeight - (t ? n : 0);this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";if (t) {
          this.horiz.style.display = "block", this.horiz.style.right = r ? n + "px" : "0", this.horiz.style.left = e.barLeft + "px";var o = e.viewWidth - e.barLeft - (r ? n : 0);this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == n && this.zeroWidthHack(), this.checkedZeroWidth = !0), { right: r ? n : 0, bottom: t ? n : 0 };
      }, nl.prototype.setScrollLeft = function (e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }, nl.prototype.setScrollTop = function (e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }, nl.prototype.zeroWidthHack = function () {
        var e = ma && !ua ? "12px" : "18px";this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new Sa(), this.disableVert = new Sa();
      }, nl.prototype.enableZeroWidthBar = function (e, t, r) {
        function n() {
          var i = e.getBoundingClientRect();("vert" == r ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, n);
        }e.style.pointerEvents = "auto", t.set(1e3, n);
      }, nl.prototype.clear = function () {
        var e = this.horiz.parentNode;e.removeChild(this.horiz), e.removeChild(this.vert);
      };var il = function il() {};il.prototype.update = function () {
        return { bottom: 0, right: 0 };
      }, il.prototype.setScrollLeft = function () {}, il.prototype.setScrollTop = function () {}, il.prototype.clear = function () {};var ol = { native: nl, null: il },
          al = 0,
          ll = function ll(e, t, r) {
        var n = e.display;this.viewport = t, this.visible = Hr(n, e.doc, t), this.editorIsHidden = !n.wrapper.offsetWidth, this.wrapperHeight = n.wrapper.clientHeight, this.wrapperWidth = n.wrapper.clientWidth, this.oldDisplayWidth = jt(e), this.force = r, this.dims = xr(e), this.events = [];
      };ll.prototype.signal = function (e, t) {
        Re(e, t) && this.events.push(arguments);
      }, ll.prototype.finish = function () {
        for (var e = this, t = 0; t < this.events.length; t++) {
          Ee.apply(null, e.events[t]);
        }
      };var sl = 0,
          cl = null;na ? cl = -.53 : Jo ? cl = 15 : la ? cl = -.7 : ca && (cl = -1 / 3);var ul = function ul(e, t) {
        this.ranges = e, this.primIndex = t;
      };ul.prototype.primary = function () {
        return this.ranges[this.primIndex];
      }, ul.prototype.equals = function (e) {
        var t = this;if (e == this) return !0;if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;for (var r = 0; r < this.ranges.length; r++) {
          var n = t.ranges[r],
              i = e.ranges[r];if (!z(n.anchor, i.anchor) || !z(n.head, i.head)) return !1;
        }return !0;
      }, ul.prototype.deepCopy = function () {
        for (var e = this, t = [], r = 0; r < this.ranges.length; r++) {
          t[r] = new dl(_(e.ranges[r].anchor), _(e.ranges[r].head));
        }return new ul(t, this.primIndex);
      }, ul.prototype.somethingSelected = function () {
        for (var e = this, t = 0; t < this.ranges.length; t++) {
          if (!e.ranges[t].empty()) return !0;
        }return !1;
      }, ul.prototype.contains = function (e, t) {
        var r = this;t || (t = e);for (var n = 0; n < this.ranges.length; n++) {
          var i = r.ranges[n];if (H(t, i.from()) >= 0 && H(e, i.to()) <= 0) return n;
        }return -1;
      };var dl = function dl(e, t) {
        this.anchor = e, this.head = t;
      };dl.prototype.from = function () {
        return W(this.anchor, this.head);
      }, dl.prototype.to = function () {
        return B(this.anchor, this.head);
      }, dl.prototype.empty = function () {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };var fl = function fl(e) {
        var t = this;this.lines = e, this.parent = null;for (var r = 0, n = 0; n < e.length; ++n) {
          e[n].parent = t, r += e[n].height;
        }this.height = r;
      };fl.prototype.chunkSize = function () {
        return this.lines.length;
      }, fl.prototype.removeInner = function (e, t) {
        for (var r = this, n = e, i = e + t; n < i; ++n) {
          var o = r.lines[n];r.height -= o.height, ct(o), Ct(o, "delete");
        }this.lines.splice(e, t);
      }, fl.prototype.collapse = function (e) {
        e.push.apply(e, this.lines);
      }, fl.prototype.insertInner = function (e, t, r) {
        var n = this;this.height += r, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));for (var i = 0; i < t.length; ++i) {
          t[i].parent = n;
        }
      }, fl.prototype.iterN = function (e, t, r) {
        for (var n = this, i = e + t; e < i; ++e) {
          if (r(n.lines[e])) return !0;
        }
      };var hl = function hl(e) {
        var t = this;this.children = e;for (var r = 0, n = 0, i = 0; i < e.length; ++i) {
          var o = e[i];r += o.chunkSize(), n += o.height, o.parent = t;
        }this.size = r, this.height = n, this.parent = null;
      };hl.prototype.chunkSize = function () {
        return this.size;
      }, hl.prototype.removeInner = function (e, t) {
        var r = this;this.size -= t;for (var n = 0; n < this.children.length; ++n) {
          var i = r.children[n],
              o = i.chunkSize();if (e < o) {
            var a = Math.min(t, o - e),
                l = i.height;if (i.removeInner(e, a), r.height -= l - i.height, o == a && (r.children.splice(n--, 1), i.parent = null), 0 == (t -= a)) break;e = 0;
          } else e -= o;
        }if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof fl))) {
          var s = [];this.collapse(s), this.children = [new fl(s)], this.children[0].parent = this;
        }
      }, hl.prototype.collapse = function (e) {
        for (var t = this, r = 0; r < this.children.length; ++r) {
          t.children[r].collapse(e);
        }
      }, hl.prototype.insertInner = function (e, t, r) {
        var n = this;this.size += t.length, this.height += r;for (var i = 0; i < this.children.length; ++i) {
          var o = n.children[i],
              a = o.chunkSize();if (e <= a) {
            if (o.insertInner(e, t, r), o.lines && o.lines.length > 50) {
              for (var l = o.lines.length % 25 + 25, s = l; s < o.lines.length;) {
                var c = new fl(o.lines.slice(s, s += 25));o.height -= c.height, n.children.splice(++i, 0, c), c.parent = n;
              }o.lines = o.lines.slice(0, l), n.maybeSpill();
            }break;
          }e -= a;
        }
      }, hl.prototype.maybeSpill = function () {
        if (!(this.children.length <= 10)) {
          var e = this;do {
            var t = e.children.splice(e.children.length - 5, 5),
                r = new hl(t);if (e.parent) {
              e.size -= r.size, e.height -= r.height;var n = f(e.parent.children, e);e.parent.children.splice(n + 1, 0, r);
            } else {
              var i = new hl(e.children);i.parent = e, e.children = [i, r], e = i;
            }r.parent = e.parent;
          } while (e.children.length > 10);e.parent.maybeSpill();
        }
      }, hl.prototype.iterN = function (e, t, r) {
        for (var n = this, i = 0; i < this.children.length; ++i) {
          var o = n.children[i],
              a = o.chunkSize();if (e < a) {
            var l = Math.min(t, a - e);if (o.iterN(e, l, r)) return !0;if (0 == (t -= l)) break;e = 0;
          } else e -= a;
        }
      };var pl = function pl(e, t, r) {
        var n = this;if (r) for (var i in r) {
          r.hasOwnProperty(i) && (n[i] = r[i]);
        }this.doc = e, this.node = t;
      };pl.prototype.clear = function () {
        var e = this,
            t = this.doc.cm,
            r = this.line.widgets,
            n = this.line,
            i = O(n);if (null != i && r) {
          for (var o = 0; o < r.length; ++o) {
            r[o] == e && r.splice(o--, 1);
          }r.length || (n.widgets = null);var a = zt(this);E(n, Math.max(0, n.height - a)), t && (dn(t, function () {
            Bi(t, n, -a), gn(t, i, "widget");
          }), Ct(t, "lineWidgetCleared", t, this, i));
        }
      }, pl.prototype.changed = function () {
        var e = this,
            t = this.height,
            r = this.doc.cm,
            n = this.line;this.height = null;var i = zt(this) - t;i && (E(n, n.height + i), r && dn(r, function () {
          r.curOp.forceUpdate = !0, Bi(r, n, i), Ct(r, "lineWidgetChanged", r, e, O(n));
        }));
      }, Pe(pl);var ml = 0,
          gl = function gl(e, t) {
        this.lines = [], this.type = t, this.doc = e, this.id = ++ml;
      };gl.prototype.clear = function () {
        var e = this;if (!this.explicitlyCleared) {
          var t = this.doc.cm,
              r = t && !t.curOp;if (r && rn(t), Re(this, "clear")) {
            var n = this.find();n && Ct(this, "clear", n.from, n.to);
          }for (var i = null, o = null, a = 0; a < this.lines.length; ++a) {
            var l = e.lines[a],
                s = V(l.markedSpans, e);t && !e.collapsed ? gn(t, O(l), "text") : t && (null != s.to && (o = O(l)), null != s.from && (i = O(l))), l.markedSpans = K(l.markedSpans, s), null == s.from && e.collapsed && !ge(e.doc, l) && t && E(l, vr(t.display));
          }if (t && this.collapsed && !t.options.lineWrapping) for (var c = 0; c < this.lines.length; ++c) {
            var u = de(e.lines[c]),
                d = xe(u);d > t.display.maxLineLength && (t.display.maxLine = u, t.display.maxLineLength = d, t.display.maxLineChanged = !0);
          }null != i && t && this.collapsed && mn(t, i, o + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && wi(t.doc)), t && Ct(t, "markerCleared", t, this, i, o), r && nn(t), this.parent && this.parent.clear();
        }
      }, gl.prototype.find = function (e, t) {
        var r = this;null == e && "bookmark" == this.type && (e = 1);for (var n, i, o = 0; o < this.lines.length; ++o) {
          var a = r.lines[o],
              l = V(a.markedSpans, r);if (null != l.from && (n = D(t ? a : O(a), l.from), -1 == e)) return n;if (null != l.to && (i = D(t ? a : O(a), l.to), 1 == e)) return i;
        }return n && { from: n, to: i };
      }, gl.prototype.changed = function () {
        var e = this,
            t = this.find(-1, !0),
            r = this,
            n = this.doc.cm;t && n && dn(n, function () {
          var i = t.line,
              o = O(t.line),
              a = Kt(n, o);if (a && (rr(a), n.curOp.selectionChanged = n.curOp.forceUpdate = !0), n.curOp.updateMaxLine = !0, !ge(r.doc, i) && null != r.height) {
            var l = r.height;r.height = null;var s = zt(r) - l;s && E(i, i.height + s);
          }Ct(n, "markerChanged", n, e);
        });
      }, gl.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;t.maybeHiddenMarkers && -1 != f(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
        }this.lines.push(e);
      }, gl.prototype.detachLine = function (e) {
        if (this.lines.splice(f(this.lines, e), 1), !this.lines.length && this.doc.cm) {
          var t = this.doc.cm.curOp;(t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
        }
      }, Pe(gl);var vl = function vl(e, t) {
        var r = this;this.markers = e, this.primary = t;for (var n = 0; n < e.length; ++n) {
          e[n].parent = r;
        }
      };vl.prototype.clear = function () {
        var e = this;if (!this.explicitlyCleared) {
          this.explicitlyCleared = !0;for (var t = 0; t < this.markers.length; ++t) {
            e.markers[t].clear();
          }Ct(this, "clear");
        }
      }, vl.prototype.find = function (e, t) {
        return this.primary.find(e, t);
      }, Pe(vl);var yl = 0,
          xl = function xl(e, t, r, n, i) {
        if (!(this instanceof xl)) return new xl(e, t, r, n, i);null == r && (r = 0), hl.call(this, [new fl([new Xa("", null)])]), this.first = r, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = r;var o = D(r, 0);this.sel = _n(o), this.history = new Qn(null), this.id = ++yl, this.modeOption = t, this.lineSep = n, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Yn(this, { from: o, to: o, text: e }), yi(this, _n(o), Aa);
      };xl.prototype = x(hl.prototype, { constructor: xl, iter: function iter(e, t, r) {
          r ? this.iterN(e - this.first, t - e, r) : this.iterN(this.first, this.first + this.size, e);
        }, insert: function insert(e, t) {
          for (var r = 0, n = 0; n < t.length; ++n) {
            r += t[n].height;
          }this.insertInner(e - this.first, t, r);
        }, remove: function remove(e, t) {
          this.removeInner(e - this.first, t);
        }, getValue: function getValue(e) {
          var t = A(this, this.first, this.first + this.size);return !1 === e ? t : t.join(e || this.lineSeparator());
        }, setValue: pn(function (e) {
          var t = D(this.first, 0),
              r = this.first + this.size - 1;Ni(this, { from: t, to: D(r, T(this, r).text.length), text: this.splitLines(e), origin: "setValue", full: !0 }, !0), this.cm && Gr(this.cm, 0, 0), yi(this, _n(t), Aa);
        }), replaceRange: function replaceRange(e, t, r, n) {
          t = U(this, t), r = r ? U(this, r) : t, Pi(this, e, t, r, n);
        }, getRange: function getRange(e, t, r) {
          var n = N(this, U(this, e), U(this, t));return !1 === r ? n : n.join(r || this.lineSeparator());
        }, getLine: function getLine(e) {
          var t = this.getLineHandle(e);return t && t.text;
        }, getLineHandle: function getLineHandle(e) {
          if (R(this, e)) return T(this, e);
        }, getLineNumber: function getLineNumber(e) {
          return O(e);
        }, getLineHandleVisualStart: function getLineHandleVisualStart(e) {
          return "number" == typeof e && (e = T(this, e)), de(e);
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
          mi(this, U(this, "number" == typeof e ? D(e, t || 0) : e), null, r);
        }), setSelection: pn(function (e, t, r) {
          mi(this, U(this, e), U(this, t || e), r);
        }), extendSelection: pn(function (e, t, r) {
          fi(this, U(this, e), t && U(this, t), r);
        }), extendSelections: pn(function (e, t) {
          hi(this, q(this, e), t);
        }), extendSelectionsBy: pn(function (e, t) {
          hi(this, q(this, g(this.sel.ranges, e)), t);
        }), setSelections: pn(function (e, t, r) {
          var n = this;if (e.length) {
            for (var i = [], o = 0; o < e.length; o++) {
              i[o] = new dl(U(n, e[o].anchor), U(n, e[o].head));
            }null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), yi(this, zn(i, t), r);
          }
        }), addSelection: pn(function (e, t, r) {
          var n = this.sel.ranges.slice(0);n.push(new dl(U(this, e), U(this, t || e))), yi(this, zn(n, n.length - 1), r);
        }), getSelection: function getSelection(e) {
          for (var t, r = this, n = this.sel.ranges, i = 0; i < n.length; i++) {
            var o = N(r, n[i].from(), n[i].to());t = t ? t.concat(o) : o;
          }return !1 === e ? t : t.join(e || this.lineSeparator());
        }, getSelections: function getSelections(e) {
          for (var t = this, r = [], n = this.sel.ranges, i = 0; i < n.length; i++) {
            var o = N(t, n[i].from(), n[i].to());!1 !== e && (o = o.join(e || t.lineSeparator())), r[i] = o;
          }return r;
        }, replaceSelection: function replaceSelection(e, t, r) {
          for (var n = [], i = 0; i < this.sel.ranges.length; i++) {
            n[i] = e;
          }this.replaceSelections(n, t, r || "+input");
        }, replaceSelections: pn(function (e, t, r) {
          for (var n = this, i = [], o = this.sel, a = 0; a < o.ranges.length; a++) {
            var l = o.ranges[a];i[a] = { from: l.from(), to: l.to(), text: n.splitLines(e[a]), origin: r };
          }for (var s = t && "end" != t && jn(this, i, t), c = i.length - 1; c >= 0; c--) {
            Ni(n, i[c]);
          }s ? vi(this, s) : this.cm && qr(this.cm);
        }), undo: pn(function () {
          Ei(this, "undo");
        }), redo: pn(function () {
          Ei(this, "redo");
        }), undoSelection: pn(function () {
          Ei(this, "undo", !0);
        }), redoSelection: pn(function () {
          Ei(this, "redo", !0);
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
          this.history = new Qn(this.history.maxGeneration);
        }, markClean: function markClean() {
          this.cleanGeneration = this.changeGeneration(!0);
        }, changeGeneration: function changeGeneration(e) {
          return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation;
        }, isClean: function isClean(e) {
          return this.history.generation == (e || this.cleanGeneration);
        }, getHistory: function getHistory() {
          return { done: ui(this.history.done), undone: ui(this.history.undone) };
        }, setHistory: function setHistory(e) {
          var t = this.history = new Qn(this.history.maxGeneration);t.done = ui(e.done.slice(0), null, !0), t.undone = ui(e.undone.slice(0), null, !0);
        }, setGutterMarker: pn(function (e, t, r) {
          return _i(this, e, "gutter", function (e) {
            var n = e.gutterMarkers || (e.gutterMarkers = {});return n[t] = r, !r && k(n) && (e.gutterMarkers = null), !0;
          });
        }), clearGutter: pn(function (e) {
          var t = this;this.iter(function (r) {
            r.gutterMarkers && r.gutterMarkers[e] && _i(t, r, "gutter", function () {
              return r.gutterMarkers[e] = null, k(r.gutterMarkers) && (r.gutterMarkers = null), !0;
            });
          });
        }), lineInfo: function lineInfo(e) {
          var t;if ("number" == typeof e) {
            if (!R(this, e)) return null;if (t = e, !(e = T(this, e))) return null;
          } else if (null == (t = O(e))) return null;return { line: t, handle: e, text: e.text, gutterMarkers: e.gutterMarkers, textClass: e.textClass, bgClass: e.bgClass, wrapClass: e.wrapClass, widgets: e.widgets };
        }, addLineClass: pn(function (t, r, n) {
          return _i(this, t, "gutter" == r ? "gutter" : "class", function (t) {
            var i = "text" == r ? "textClass" : "background" == r ? "bgClass" : "gutter" == r ? "gutterClass" : "wrapClass";if (t[i]) {
              if (e(n).test(t[i])) return !1;t[i] += " " + n;
            } else t[i] = n;return !0;
          });
        }), removeLineClass: pn(function (t, r, n) {
          return _i(this, t, "gutter" == r ? "gutter" : "class", function (t) {
            var i = "text" == r ? "textClass" : "background" == r ? "bgClass" : "gutter" == r ? "gutterClass" : "wrapClass",
                o = t[i];if (!o) return !1;if (null == n) t[i] = null;else {
              var a = o.match(e(n));if (!a) return !1;var l = a.index + a[0].length;t[i] = o.slice(0, a.index) + (a.index && l != o.length ? " " : "") + o.slice(l) || null;
            }return !0;
          });
        }), addLineWidget: pn(function (e, t, r) {
          return Wi(this, e, t, r);
        }), removeLineWidget: function removeLineWidget(e) {
          e.clear();
        }, markText: function markText(e, t, r) {
          return Fi(this, U(this, e), U(this, t), r, r && r.type || "range");
        }, setBookmark: function setBookmark(e, t) {
          var r = { replacedWith: t && (null == t.nodeType ? t.widget : t), insertLeft: t && t.insertLeft, clearWhenEmpty: !1, shared: t && t.shared, handleMouseEvents: t && t.handleMouseEvents };return e = U(this, e), Fi(this, e, e, r, "bookmark");
        }, findMarksAt: function findMarksAt(e) {
          e = U(this, e);var t = [],
              r = T(this, e.line).markedSpans;if (r) for (var n = 0; n < r.length; ++n) {
            var i = r[n];(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
          }return t;
        }, findMarks: function findMarks(e, t, r) {
          e = U(this, e), t = U(this, t);var n = [],
              i = e.line;return this.iter(e.line, t.line + 1, function (o) {
            var a = o.markedSpans;if (a) for (var l = 0; l < a.length; l++) {
              var s = a[l];null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || r && !r(s.marker) || n.push(s.marker.parent || s.marker);
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
          }), U(this, D(r, t));
        }, indexFromPos: function indexFromPos(e) {
          e = U(this, e);var t = e.ch;if (e.line < this.first || e.ch < 0) return 0;var r = this.lineSeparator().length;return this.iter(this.first, e.line, function (e) {
            t += e.text.length + r;
          }), t;
        }, copy: function copy(e) {
          var t = new xl(A(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t;
        }, linkedDoc: function linkedDoc(e) {
          e || (e = {});var t = this.first,
              r = this.first + this.size;null != e.from && e.from > t && (t = e.from), null != e.to && e.to < r && (r = e.to);var n = new xl(A(this, t, r), e.mode || this.modeOption, t, this.lineSep, this.direction);return e.sharedHist && (n.history = this.history), (this.linked || (this.linked = [])).push({ doc: n, sharedHist: e.sharedHist }), n.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }], qi(n, ji(this)), n;
        }, unlinkDoc: function unlinkDoc(e) {
          var t = this;if (e instanceof Io && (e = e.doc), this.linked) for (var r = 0; r < this.linked.length; ++r) {
            var n = t.linked[r];if (n.doc == e) {
              t.linked.splice(r, 1), e.unlinkDoc(t), Gi(ji(t));break;
            }
          }if (e.history == this.history) {
            var i = [e.id];Vn(e, function (e) {
              return i.push(e.id);
            }, !0), e.history = new Qn(null), e.history.done = ui(this.history.done, i), e.history.undone = ui(this.history.undone, i);
          }
        }, iterLinkedDocs: function iterLinkedDocs(e) {
          Vn(this, e);
        }, getMode: function getMode() {
          return this.mode;
        }, getEditor: function getEditor() {
          return this.cm;
        }, splitLines: function splitLines(e) {
          return this.lineSep ? e.split(this.lineSep) : Ua(e);
        }, lineSeparator: function lineSeparator() {
          return this.lineSep || "\n";
        }, setDirection: pn(function (e) {
          "rtl" != e && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function (e) {
            return e.order = null;
          }), this.cm && Zn(this.cm));
        }) }), xl.prototype.eachLine = xl.prototype.iter;for (var bl = 0, wl = !1, kl = { 3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert", 46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod", 106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete", 173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete", 63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert" }, Cl = 0; Cl < 10; Cl++) {
        kl[Cl + 48] = kl[Cl + 96] = String(Cl);
      }for (var Sl = 65; Sl <= 90; Sl++) {
        kl[Sl] = String.fromCharCode(Sl);
      }for (var Ml = 1; Ml <= 12; Ml++) {
        kl[Ml + 111] = kl[Ml + 63235] = "F" + Ml;
      }var Ll = {};Ll.basic = { Left: "goCharLeft", Right: "goCharRight", Up: "goLineUp", Down: "goLineDown", End: "goLineEnd", Home: "goLineStartSmart", PageUp: "goPageUp", PageDown: "goPageDown", Delete: "delCharAfter", Backspace: "delCharBefore", "Shift-Backspace": "delCharBefore", Tab: "defaultTab", "Shift-Tab": "indentAuto", Enter: "newlineAndIndent", Insert: "toggleOverwrite", Esc: "singleSelection" }, Ll.pcDefault = { "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo", "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown", "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd", "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find", "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll", "Ctrl-[": "indentLess", "Ctrl-]": "indentMore", "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection", fallthrough: "basic" }, Ll.emacsy = { "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown", "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd", "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore", "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars", "Ctrl-O": "openLine" }, Ll.macDefault = { "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo", "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft", "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore", "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find", "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll", "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight", "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd", fallthrough: ["basic", "emacsy"] }, Ll.default = ma ? Ll.macDefault : Ll.pcDefault;var Tl,
          Nl,
          Al = { selectAll: Li, singleSelection: function singleSelection(e) {
          return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Aa);
        }, killLine: function killLine(e) {
          return ao(e, function (t) {
            if (t.empty()) {
              var r = T(e.doc, t.head.line).text.length;return t.head.ch == r && t.head.line < e.lastLine() ? { from: t.head, to: D(t.head.line + 1, 0) } : { from: t.head, to: D(t.head.line, r) };
            }return { from: t.from(), to: t.to() };
          });
        }, deleteLine: function deleteLine(e) {
          return ao(e, function (t) {
            return { from: D(t.from().line, 0), to: U(e.doc, D(t.to().line + 1, 0)) };
          });
        }, delLineLeft: function delLineLeft(e) {
          return ao(e, function (e) {
            return { from: D(e.from().line, 0), to: e.from() };
          });
        }, delWrappedLineLeft: function delWrappedLineLeft(e) {
          return ao(e, function (t) {
            var r = e.charCoords(t.head, "div").top + 5;return { from: e.coordsChar({ left: 0, top: r }, "div"), to: t.from() };
          });
        }, delWrappedLineRight: function delWrappedLineRight(e) {
          return ao(e, function (t) {
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
          return e.extendSelection(D(e.firstLine(), 0));
        }, goDocEnd: function goDocEnd(e) {
          return e.extendSelection(D(e.lastLine()));
        }, goLineStart: function goLineStart(e) {
          return e.extendSelectionsBy(function (t) {
            return lo(e, t.head.line);
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
          }, Oa);
        }, goLineLeft: function goLineLeft(e) {
          return e.extendSelectionsBy(function (t) {
            var r = e.charCoords(t.head, "div").top + 5;return e.coordsChar({ left: 0, top: r }, "div");
          }, Oa);
        }, goLineLeftSmart: function goLineLeftSmart(e) {
          return e.extendSelectionsBy(function (t) {
            var r = e.charCoords(t.head, "div").top + 5,
                n = e.coordsChar({ left: 0, top: r }, "div");return n.ch < e.getLine(n.line).search(/\S/) ? co(e, t.head) : n;
          }, Oa);
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
                a = d(e.getLine(o.line), o.ch, n);t.push(p(n - a % n));
          }e.replaceSelections(t);
        }, defaultTab: function defaultTab(e) {
          e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
        }, transposeChars: function transposeChars(e) {
          return dn(e, function () {
            for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++) {
              if (t[n].empty()) {
                var i = t[n].head,
                    o = T(e.doc, i.line).text;if (o) if (i.ch == o.length && (i = new D(i.line, i.ch - 1)), i.ch > 0) i = new D(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), D(i.line, i.ch - 2), i, "+transpose");else if (i.line > e.doc.first) {
                  var a = T(e.doc, i.line - 1).text;a && (i = new D(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), D(i.line - 1, a.length - 1), i, "+transpose"));
                }r.push(new dl(i, i));
              }
            }e.setSelections(r);
          });
        }, newlineAndIndent: function newlineAndIndent(e) {
          return dn(e, function () {
            for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--) {
              e.replaceRange(e.doc.lineSeparator(), t[r].anchor, t[r].head, "+input");
            }t = e.listSelections();for (var n = 0; n < t.length; n++) {
              e.indentLine(t[n].from().line, null, !0);
            }qr(e);
          });
        }, openLine: function openLine(e) {
          return e.replaceSelection("\n", "start");
        }, toggleOverwrite: function toggleOverwrite(e) {
          return e.toggleOverwrite();
        } },
          El = new Sa(),
          Ol = null,
          Il = { toString: function toString() {
          return "CodeMirror.Init";
        } },
          Rl = {},
          Pl = {};Io.defaults = Rl, Io.optionHandlers = Pl;var Dl = [];Io.defineInitHook = function (e) {
        return Dl.push(e);
      };var Hl = null,
          zl = function zl(e) {
        this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Sa(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
      };zl.prototype.init = function (e) {
        function t(e) {
          if (!Oe(i, e)) {
            if (i.somethingSelected()) Do({ lineWise: !1, text: i.getSelections() }), "cut" == e.type && i.replaceSelection("", null, "cut");else {
              if (!i.options.lineWiseCopyCut) return;var t = Bo(i);Do({ lineWise: !0, text: t.text }), "cut" == e.type && i.operation(function () {
                i.setSelections(t.ranges, 0, Aa), i.replaceSelection("", null, "cut");
              });
            }if (e.clipboardData) {
              e.clipboardData.clearData();var r = Hl.text.join("\n");if (e.clipboardData.setData("Text", r), e.clipboardData.getData("Text") == r) return void e.preventDefault();
            }var a = Fo(),
                l = a.firstChild;i.display.lineSpace.insertBefore(a, i.display.lineSpace.firstChild), l.value = Hl.text.join("\n");var s = document.activeElement;Ca(l), setTimeout(function () {
              i.display.lineSpace.removeChild(a), s.focus(), s == o && n.showPrimarySelection();
            }, 50);
          }
        }var r = this,
            n = this,
            i = n.cm,
            o = n.div = e.lineDiv;Wo(o, i.options.spellcheck), Wa(o, "paste", function (e) {
          Oe(i, e) || zo(e, i) || ia <= 11 && setTimeout(fn(i, function () {
            return r.updateFromDOM();
          }), 20);
        }), Wa(o, "compositionstart", function (e) {
          r.composing = { data: e.data, done: !1 };
        }), Wa(o, "compositionupdate", function (e) {
          r.composing || (r.composing = { data: e.data, done: !1 });
        }), Wa(o, "compositionend", function (e) {
          r.composing && (e.data != r.composing.data && r.readFromDOMSoon(), r.composing.done = !0);
        }), Wa(o, "touchstart", function () {
          return n.forceCompositionEnd();
        }), Wa(o, "input", function () {
          r.composing || r.readFromDOMSoon();
        }), Wa(o, "copy", t), Wa(o, "cut", t);
      }, zl.prototype.prepareSelection = function () {
        var e = Lr(this.cm, !1);return e.focus = this.cm.state.focused, e;
      }, zl.prototype.showSelection = function (e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e));
      }, zl.prototype.showPrimarySelection = function () {
        var e = window.getSelection(),
            t = this.cm,
            r = t.doc.sel.primary(),
            n = r.from(),
            i = r.to();if (t.display.viewTo == t.display.viewFrom || n.line >= t.display.viewTo || i.line < t.display.viewFrom) return void e.removeAllRanges();var o = Vo(t, e.anchorNode, e.anchorOffset),
            a = Vo(t, e.focusNode, e.focusOffset);if (!o || o.bad || !a || a.bad || 0 != H(W(o, a), n) || 0 != H(B(o, a), i)) {
          var l = t.display.view,
              s = n.line >= t.display.viewFrom && qo(t, n) || { node: l[0].measure.map[2], offset: 0 },
              c = i.line < t.display.viewTo && qo(t, i);if (!c) {
            var u = l[l.length - 1].measure,
                d = u.maps ? u.maps[u.maps.length - 1] : u.map;c = { node: d[d.length - 1], offset: d[d.length - 2] - d[d.length - 3] };
          }if (!s || !c) return void e.removeAllRanges();var f,
              h = e.rangeCount && e.getRangeAt(0);try {
            f = xa(s.node, s.offset, c.offset, c.node);
          } catch (e) {}f && (!Jo && t.state.focused ? (e.collapse(s.node, s.offset), f.collapsed || (e.removeAllRanges(), e.addRange(f))) : (e.removeAllRanges(), e.addRange(f)), h && null == e.anchorNode ? e.addRange(h) : Jo && this.startGracePeriod()), this.rememberSelection();
        }
      }, zl.prototype.startGracePeriod = function () {
        var e = this;clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function () {
          e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function () {
            return e.cm.curOp.selectionChanged = !0;
          });
        }, 20);
      }, zl.prototype.showMultipleSelections = function (e) {
        r(this.cm.display.cursorDiv, e.cursors), r(this.cm.display.selectionDiv, e.selection);
      }, zl.prototype.rememberSelection = function () {
        var e = window.getSelection();this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset;
      }, zl.prototype.selectionInEditor = function () {
        var e = window.getSelection();if (!e.rangeCount) return !1;var t = e.getRangeAt(0).commonAncestorContainer;return o(this.div, t);
      }, zl.prototype.focus = function () {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus());
      }, zl.prototype.blur = function () {
        this.div.blur();
      }, zl.prototype.getField = function () {
        return this.div;
      }, zl.prototype.supportsTouch = function () {
        return !0;
      }, zl.prototype.receivedFocus = function () {
        function e() {
          t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
        }var t = this;this.selectionInEditor() ? this.pollSelection() : dn(this.cm, function () {
          return t.cm.curOp.selectionChanged = !0;
        }), this.polling.set(this.cm.options.pollInterval, e);
      }, zl.prototype.selectionChanged = function () {
        var e = window.getSelection();return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
      }, zl.prototype.pollSelection = function () {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
          var e = window.getSelection(),
              t = this.cm;if (ha && la && this.cm.options.gutters.length && Go(e.anchorNode)) return this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }), this.blur(), void this.focus();if (!this.composing) {
            this.rememberSelection();var r = Vo(t, e.anchorNode, e.anchorOffset),
                n = Vo(t, e.focusNode, e.focusOffset);r && n && dn(t, function () {
              yi(t.doc, _n(r, n), Aa), (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
            });
          }
        }
      }, zl.prototype.pollContent = function () {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);var e = this.cm,
            t = e.display,
            r = e.doc.sel.primary(),
            n = r.from(),
            i = r.to();if (0 == n.ch && n.line > e.firstLine() && (n = D(n.line - 1, T(e.doc, n.line - 1).length)), i.ch == T(e.doc, i.line).text.length && i.line < e.lastLine() && (i = D(i.line + 1, 0)), n.line < t.viewFrom || i.line > t.viewTo - 1) return !1;var o, a, l;n.line == t.viewFrom || 0 == (o = Sr(e, n.line)) ? (a = O(t.view[0].line), l = t.view[0].node) : (a = O(t.view[o].line), l = t.view[o - 1].node.nextSibling);var s,
            c,
            u = Sr(e, i.line);if (u == t.view.length - 1 ? (s = t.viewTo - 1, c = t.lineDiv.lastChild) : (s = O(t.view[u + 1].line) - 1, c = t.view[u + 1].node.previousSibling), !l) return !1;for (var d = e.doc.splitLines(Yo(e, l, c, a, s)), f = N(e.doc, D(a, 0), D(s, T(e.doc, s).text.length)); d.length > 1 && f.length > 1;) {
          if (m(d) == m(f)) d.pop(), f.pop(), s--;else {
            if (d[0] != f[0]) break;d.shift(), f.shift(), a++;
          }
        }for (var h = 0, p = 0, g = d[0], v = f[0], y = Math.min(g.length, v.length); h < y && g.charCodeAt(h) == v.charCodeAt(h);) {
          ++h;
        }for (var x = m(d), b = m(f), w = Math.min(x.length - (1 == d.length ? h : 0), b.length - (1 == f.length ? h : 0)); p < w && x.charCodeAt(x.length - p - 1) == b.charCodeAt(b.length - p - 1);) {
          ++p;
        }if (1 == d.length && 1 == f.length && a == n.line) for (; h && h > n.ch && x.charCodeAt(x.length - p - 1) == b.charCodeAt(b.length - p - 1);) {
          h--, p++;
        }d[d.length - 1] = x.slice(0, x.length - p).replace(/^\u200b+/, ""), d[0] = d[0].slice(h).replace(/\u200b+$/, "");var k = D(a, h),
            C = D(s, f.length ? m(f).length - p : 0);return d.length > 1 || d[0] || H(k, C) ? (Pi(e.doc, d, k, C, "+input"), !0) : void 0;
      }, zl.prototype.ensurePolled = function () {
        this.forceCompositionEnd();
      }, zl.prototype.reset = function () {
        this.forceCompositionEnd();
      }, zl.prototype.forceCompositionEnd = function () {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus());
      }, zl.prototype.readFromDOMSoon = function () {
        var e = this;null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function () {
          if (e.readDOMTimeout = null, e.composing) {
            if (!e.composing.done) return;e.composing = null;
          }e.updateFromDOM();
        }, 80));
      }, zl.prototype.updateFromDOM = function () {
        var e = this;!this.cm.isReadOnly() && this.pollContent() || dn(this.cm, function () {
          return mn(e.cm);
        });
      }, zl.prototype.setUneditable = function (e) {
        e.contentEditable = "false";
      }, zl.prototype.onKeyPress = function (e) {
        0 != e.charCode && (e.preventDefault(), this.cm.isReadOnly() || fn(this.cm, Ho)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0));
      }, zl.prototype.readOnlyChanged = function (e) {
        this.div.contentEditable = String("nocursor" != e);
      }, zl.prototype.onContextMenu = function () {}, zl.prototype.resetPosition = function () {}, zl.prototype.needsContentAttribute = !0;var _l = function _l(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new Sa(), this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null;
      };_l.prototype.init = function (e) {
        function t(e) {
          if (!Oe(i, e)) {
            if (i.somethingSelected()) Do({ lineWise: !1, text: i.getSelections() }), n.inaccurateSelection && (n.prevInput = "", n.inaccurateSelection = !1, a.value = Hl.text.join("\n"), Ca(a));else {
              if (!i.options.lineWiseCopyCut) return;var t = Bo(i);Do({ lineWise: !0, text: t.text }), "cut" == e.type ? i.setSelections(t.ranges, null, Aa) : (n.prevInput = "", a.value = t.text.join("\n"), Ca(a));
            }"cut" == e.type && (i.state.cutIncoming = !0);
          }
        }var r = this,
            n = this,
            i = this.cm,
            o = this.wrapper = Fo(),
            a = this.textarea = o.firstChild;e.wrapper.insertBefore(o, e.wrapper.firstChild), fa && (a.style.width = "0px"), Wa(a, "input", function () {
          na && ia >= 9 && r.hasSelection && (r.hasSelection = null), n.poll();
        }), Wa(a, "paste", function (e) {
          Oe(i, e) || zo(e, i) || (i.state.pasteIncoming = !0, n.fastPoll());
        }), Wa(a, "cut", t), Wa(a, "copy", t), Wa(e.scroller, "paste", function (t) {
          _t(e, t) || Oe(i, t) || (i.state.pasteIncoming = !0, n.focus());
        }), Wa(e.lineSpace, "selectstart", function (t) {
          _t(e, t) || De(t);
        }), Wa(a, "compositionstart", function () {
          var e = i.getCursor("from");n.composing && n.composing.range.clear(), n.composing = { start: e, range: i.markText(e, i.getCursor("to"), { className: "CodeMirror-composing" }) };
        }), Wa(a, "compositionend", function () {
          n.composing && (n.poll(), n.composing.range.clear(), n.composing = null);
        });
      }, _l.prototype.prepareSelection = function () {
        var e = this.cm,
            t = e.display,
            r = e.doc,
            n = Lr(e);if (e.options.moveInputWithCursor) {
          var i = ur(e, r.sel.primary().head, "div"),
              o = t.wrapper.getBoundingClientRect(),
              a = t.lineDiv.getBoundingClientRect();n.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), n.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left));
        }return n;
      }, _l.prototype.showSelection = function (e) {
        var t = this.cm,
            n = t.display;r(n.cursorDiv, e.cursors), r(n.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px");
      }, _l.prototype.reset = function (e) {
        if (!this.contextMenuPending && !this.composing) {
          var t,
              r,
              n = this.cm,
              i = n.doc;if (n.somethingSelected()) {
            this.prevInput = "";var o = i.sel.primary();t = qa && (o.to().line - o.from().line > 100 || (r = n.getSelection()).length > 1e3);var a = t ? "-" : r || n.getSelection();this.textarea.value = a, n.state.focused && Ca(this.textarea), na && ia >= 9 && (this.hasSelection = a);
          } else e || (this.prevInput = this.textarea.value = "", na && ia >= 9 && (this.hasSelection = null));this.inaccurateSelection = t;
        }
      }, _l.prototype.getField = function () {
        return this.textarea;
      }, _l.prototype.supportsTouch = function () {
        return !1;
      }, _l.prototype.focus = function () {
        if ("nocursor" != this.cm.options.readOnly && (!pa || a() != this.textarea)) try {
          this.textarea.focus();
        } catch (e) {}
      }, _l.prototype.blur = function () {
        this.textarea.blur();
      }, _l.prototype.resetPosition = function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      }, _l.prototype.receivedFocus = function () {
        this.slowPoll();
      }, _l.prototype.slowPoll = function () {
        var e = this;this.pollingFast || this.polling.set(this.cm.options.pollInterval, function () {
          e.poll(), e.cm.state.focused && e.slowPoll();
        });
      }, _l.prototype.fastPoll = function () {
        function e() {
          r.poll() || t ? (r.pollingFast = !1, r.slowPoll()) : (t = !0, r.polling.set(60, e));
        }var t = !1,
            r = this;r.pollingFast = !0, r.polling.set(20, e);
      }, _l.prototype.poll = function () {
        var e = this,
            t = this.cm,
            r = this.textarea,
            n = this.prevInput;if (this.contextMenuPending || !t.state.focused || ja(r) && !n && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;var i = r.value;if (i == n && !t.somethingSelected()) return !1;if (na && ia >= 9 && this.hasSelection === i || ma && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;if (t.doc.sel == t.display.selForContextMenu) {
          var o = i.charCodeAt(0);if (8203 != o || n || (n = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo");
        }for (var a = 0, l = Math.min(n.length, i.length); a < l && n.charCodeAt(a) == i.charCodeAt(a);) {
          ++a;
        }return dn(t, function () {
          Ho(t, i.slice(a), n.length - a, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? r.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), { className: "CodeMirror-composing" }));
        }), !0;
      }, _l.prototype.ensurePolled = function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      }, _l.prototype.onKeyPress = function () {
        na && ia >= 9 && (this.hasSelection = null), this.fastPoll();
      }, _l.prototype.onContextMenu = function (e) {
        function t() {
          if (null != a.selectionStart) {
            var e = i.somethingSelected(),
                t = "​" + (e ? a.value : "");a.value = "⇚", a.value = t, n.prevInput = e ? "" : "​", a.selectionStart = 1, a.selectionEnd = t.length, o.selForContextMenu = i.doc.sel;
          }
        }function r() {
          if (n.contextMenuPending = !1, n.wrapper.style.cssText = u, a.style.cssText = c, na && ia < 9 && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != a.selectionStart) {
            (!na || na && ia < 9) && t();var e = 0,
                r = function r() {
              o.selForContextMenu == i.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "​" == n.prevInput ? fn(i, Li)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(r, 500) : (o.selForContextMenu = null, o.input.reset());
            };o.detectingSelectAll = setTimeout(r, 200);
          }
        }var n = this,
            i = n.cm,
            o = i.display,
            a = n.textarea,
            l = Cr(i, e),
            s = o.scroller.scrollTop;if (l && !sa) {
          i.options.resetSelectionOnContextMenu && -1 == i.doc.sel.contains(l) && fn(i, yi)(i.doc, _n(l), Aa);var c = a.style.cssText,
              u = n.wrapper.style.cssText;n.wrapper.style.cssText = "position: absolute";var d = n.wrapper.getBoundingClientRect();a.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - d.top - 5) + "px; left: " + (e.clientX - d.left - 5) + "px;\n      z-index: 1000; background: " + (na ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";var f;if (oa && (f = window.scrollY), o.input.focus(), oa && window.scrollTo(null, f), o.input.reset(), i.somethingSelected() || (a.value = n.prevInput = " "), n.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), na && ia >= 9 && t(), wa) {
            _e(e);var h = function h() {
              Ae(window, "mouseup", h), setTimeout(r, 20);
            };Wa(window, "mouseup", h);
          } else setTimeout(r, 50);
        }
      }, _l.prototype.readOnlyChanged = function (e) {
        e || this.reset();
      }, _l.prototype.setUneditable = function () {}, _l.prototype.needsContentAttribute = !1, function (e) {
        function t(t, n, i, o) {
          e.defaults[t] = n, i && (r[t] = o ? function (e, t, r) {
            r != Il && i(e, t, r);
          } : i);
        }var r = e.optionHandlers;e.defineOption = t, e.Init = Il, t("value", "", function (e, t) {
          return e.setValue(t);
        }, !0), t("mode", null, function (e, t) {
          e.doc.modeOption = t, qn(e);
        }, !0), t("indentUnit", 2, qn, !0), t("indentWithTabs", !1), t("smartIndent", !0), t("tabSize", 4, function (e) {
          Gn(e), ir(e), mn(e);
        }, !0), t("lineSeparator", null, function (e, t) {
          if (e.doc.lineSep = t, t) {
            var r = [],
                n = e.doc.first;e.doc.iter(function (e) {
              for (var i = 0;;) {
                var o = e.text.indexOf(t, i);if (-1 == o) break;i = o + t.length, r.push(D(n, o));
              }n++;
            });for (var i = r.length - 1; i >= 0; i--) {
              Pi(e.doc, t, r[i], D(r[i].line, r[i].ch + t.length));
            }
          }
        }), t("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (e, t, r) {
          e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), r != Il && e.refresh();
        }), t("specialCharPlaceholder", ft, function (e) {
          return e.refresh();
        }, !0), t("electricChars", !0), t("inputStyle", pa ? "contenteditable" : "textarea", function () {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, !0), t("spellcheck", !1, function (e, t) {
          return e.getInputField().spellcheck = t;
        }, !0), t("rtlMoveVisually", !va), t("wholeLineUpdateBefore", !0), t("theme", "default", function (e) {
          No(e), Ao(e);
        }, !0), t("keyMap", "default", function (e, t, r) {
          var n = oo(t),
              i = r != Il && oo(r);i && i.detach && i.detach(e, n), n.attach && n.attach(e, i || null);
        }), t("extraKeys", null), t("lineWrapping", !1, Oo, !0), t("gutters", [], function (e) {
          Rn(e.options), Ao(e);
        }, !0), t("fixedGutter", !0, function (e, t) {
          e.display.gutters.style.left = t ? br(e.display) + "px" : "0", e.refresh();
        }, !0), t("coverGutterNextToScrollbar", !1, function (e) {
          return Jr(e);
        }, !0), t("scrollbarStyle", "native", function (e) {
          tn(e), Jr(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
        }, !0), t("lineNumbers", !1, function (e) {
          Rn(e.options), Ao(e);
        }, !0), t("firstLineNumber", 1, Ao, !0), t("lineNumberFormatter", function (e) {
          return e;
        }, Ao, !0), t("showCursorWhenSelecting", !1, Mr, !0), t("resetSelectionOnContextMenu", !0), t("lineWiseCopyCut", !0), t("readOnly", !1, function (e, t) {
          "nocursor" == t ? (Rr(e), e.display.input.blur(), e.display.disabled = !0) : e.display.disabled = !1, e.display.input.readOnlyChanged(t);
        }), t("disableInput", !1, function (e, t) {
          t || e.display.input.reset();
        }, !0), t("dragDrop", !0, Eo), t("allowDropFileTypes", null), t("cursorBlinkRate", 530), t("cursorScrollMargin", 0), t("cursorHeight", 1, Mr, !0), t("singleCursorHeightPerLine", !0, Mr, !0), t("workTime", 100), t("workDelay", 100), t("flattenSpans", !0, Gn, !0), t("addModeClass", !1, Gn, !0), t("pollInterval", 100), t("undoDepth", 200, function (e, t) {
          return e.doc.history.undoDepth = t;
        }), t("historyEventDelay", 1250), t("viewportMargin", 10, function (e) {
          return e.refresh();
        }, !0), t("maxHighlightLength", 1e4, Gn, !0), t("moveInputWithCursor", !0, function (e, t) {
          t || e.display.input.resetPosition();
        }), t("tabindex", null, function (e, t) {
          return e.display.input.getField().tabIndex = t || "";
        }), t("autofocus", null), t("direction", "ltr", function (e, t) {
          return e.doc.setDirection(t);
        }, !0);
      }(Io), function (e) {
        var t = e.optionHandlers,
            r = e.helpers = {};e.prototype = { constructor: e, focus: function focus() {
            window.focus(), this.display.input.focus();
          }, setOption: function setOption(e, r) {
            var n = this.options,
                i = n[e];n[e] == r && "mode" != e || (n[e] = r, t.hasOwnProperty(e) && fn(this, t[e])(this, r, i), Ee(this, "optionChange", this, e));
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
            }), this.state.modeGen++, mn(this);
          }), removeOverlay: hn(function (e) {
            for (var t = this, r = this.state.overlays, n = 0; n < r.length; ++n) {
              var i = r[n].modeSpec;if (i == e || "string" == typeof e && i.name == e) return r.splice(n, 1), t.state.modeGen++, void mn(t);
            }
          }), indentLine: hn(function (e, t, r) {
            "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), R(this.doc, e) && Po(this, e, t, r);
          }), indentSelection: hn(function (e) {
            for (var t = this, r = this.doc.sel.ranges, n = -1, i = 0; i < r.length; i++) {
              var o = r[i];if (o.empty()) o.head.line > n && (Po(t, o.head.line, e, !0), n = o.head.line, i == t.doc.sel.primIndex && qr(t));else {
                var a = o.from(),
                    l = o.to(),
                    s = Math.max(n, a.line);n = Math.min(t.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;for (var c = s; c < n; ++c) {
                  Po(t, c, e);
                }var u = t.doc.sel.ranges;0 == a.ch && r.length == u.length && u[i].from().ch > 0 && pi(t.doc, i, new dl(a, u[i].to()), Aa);
              }
            }
          }), getTokenAt: function getTokenAt(e, t) {
            return it(this, e, t);
          }, getLineTokens: function getLineTokens(e, t) {
            return it(this, D(e), t, !0);
          }, getTokenTypeAt: function getTokenTypeAt(e) {
            e = U(this.doc, e);var t,
                r = Je(this, T(this.doc, e.line)),
                n = 0,
                i = (r.length - 1) / 2,
                o = e.ch;if (0 == o) t = r[2];else for (;;) {
              var a = n + i >> 1;if ((a ? r[2 * a - 1] : 0) >= o) i = a;else {
                if (!(r[2 * a + 1] < o)) {
                  t = r[2 * a + 2];break;
                }n = a + 1;
              }
            }var l = t ? t.indexOf("overlay ") : -1;return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1);
          }, getModeAt: function getModeAt(t) {
            var r = this.doc.mode;return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r;
          }, getHelper: function getHelper(e, t) {
            return this.getHelpers(e, t)[0];
          }, getHelpers: function getHelpers(e, t) {
            var n = this,
                i = [];if (!r.hasOwnProperty(t)) return i;var o = r[t],
                a = this.getModeAt(e);if ("string" == typeof a[t]) o[a[t]] && i.push(o[a[t]]);else if (a[t]) for (var l = 0; l < a[t].length; l++) {
              var s = o[a[t][l]];s && i.push(s);
            } else a.helperType && o[a.helperType] ? i.push(o[a.helperType]) : o[a.name] && i.push(o[a.name]);for (var c = 0; c < o._global.length; c++) {
              var u = o._global[c];u.pred(a, n) && -1 == f(i, u.val) && i.push(u.val);
            }return i;
          }, getStateAfter: function getStateAfter(e, t) {
            var r = this.doc;return e = F(r, null == e ? r.first + r.size - 1 : e), et(this, e + 1, t);
          }, cursorCoords: function cursorCoords(e, t) {
            var r,
                n = this.doc.sel.primary();return r = null == e ? n.head : "object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) ? U(this.doc, e) : e ? n.from() : n.to(), ur(this, r, t || "page");
          }, charCoords: function charCoords(e, t) {
            return cr(this, U(this.doc, e), t || "page");
          }, coordsChar: function coordsChar(e, t) {
            return e = sr(this, e, t || "page"), hr(this, e.left, e.top);
          }, lineAtHeight: function lineAtHeight(e, t) {
            return e = sr(this, { top: e, left: 0 }, t || "page").top, I(this.doc, e + this.display.viewOffset);
          }, heightAtLine: function heightAtLine(e, t, r) {
            var n,
                i = !1;if ("number" == typeof e) {
              var o = this.doc.first + this.doc.size - 1;e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), n = T(this.doc, e);
            } else n = e;return lr(this, n, { top: 0, left: 0 }, t || "page", r || i).top + (i ? this.doc.height - ye(n) : 0);
          }, defaultTextHeight: function defaultTextHeight() {
            return vr(this.display);
          }, defaultCharWidth: function defaultCharWidth() {
            return yr(this.display);
          }, getViewport: function getViewport() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          }, addWidget: function addWidget(e, t, r, n, i) {
            var o = this.display;e = ur(this, U(this.doc, e));var a = e.bottom,
                l = e.left;if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == n) a = e.top;else if ("above" == n || "near" == n) {
              var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                  c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);("above" == n || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (a = e.bottom), l + t.offsetWidth > c && (l = c - t.offsetWidth);
            }t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (l = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? l = 0 : "middle" == i && (l = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = l + "px"), r && Fr(this, { left: l, top: a, right: l + t.offsetWidth, bottom: a + t.offsetHeight });
          }, triggerOnKeyDown: hn(go), triggerOnKeyPress: hn(xo), triggerOnKeyUp: yo, execCommand: function execCommand(e) {
            if (Al.hasOwnProperty(e)) return Al[e].call(null, this);
          }, triggerElectric: hn(function (e) {
            _o(this, e);
          }), findPosH: function findPosH(e, t, r, n) {
            var i = this,
                o = 1;t < 0 && (o = -1, t = -t);for (var a = U(this.doc, e), l = 0; l < t && (a = Uo(i.doc, a, o, r, n), !a.hitSide); ++l) {}return a;
          }, moveH: hn(function (e, t) {
            var r = this;this.extendSelectionsBy(function (n) {
              return r.display.shift || r.doc.extend || n.empty() ? Uo(r.doc, n.head, e, t, r.options.rtlMoveVisually) : e < 0 ? n.from() : n.to();
            }, Oa);
          }), deleteH: hn(function (e, t) {
            var r = this.doc.sel,
                n = this.doc;r.somethingSelected() ? n.replaceSelection("", null, "+delete") : ao(this, function (r) {
              var i = Uo(n, r.head, e, t, !1);return e < 0 ? { from: i, to: r.head } : { from: r.head, to: i };
            });
          }), findPosV: function findPosV(e, t, r, n) {
            var i = this,
                o = 1,
                a = n;t < 0 && (o = -1, t = -t);for (var l = U(this.doc, e), s = 0; s < t; ++s) {
              var c = ur(i, l, "div");if (null == a ? a = c.left : c.left = a, l = jo(i, c, o, r), l.hitSide) break;
            }return l;
          }, moveV: hn(function (e, t) {
            var r = this,
                n = this.doc,
                i = [],
                o = !this.display.shift && !n.extend && n.sel.somethingSelected();if (n.extendSelectionsBy(function (a) {
              if (o) return e < 0 ? a.from() : a.to();var l = ur(r, a.head, "div");null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);var s = jo(r, l, e, t);return "page" == t && a == n.sel.primary() && jr(r, cr(r, s, "div").top - l.top), s;
            }, Oa), i.length) for (var a = 0; a < n.sel.ranges.length; a++) {
              n.sel.ranges[a].goalColumn = i[a];
            }
          }), findWordAt: function findWordAt(e) {
            var t = this.doc,
                r = T(t, e.line).text,
                n = e.ch,
                i = e.ch;if (r) {
              var o = this.getHelper(e, "wordChars");"before" != e.sticky && i != r.length || !n ? ++i : --n;for (var a = r.charAt(n), l = w(a, o) ? function (e) {
                return w(e, o);
              } : /\s/.test(a) ? function (e) {
                return (/\s/.test(e)
                );
              } : function (e) {
                return !/\s/.test(e) && !w(e);
              }; n > 0 && l(r.charAt(n - 1));) {
                --n;
              }for (; i < r.length && l(r.charAt(i));) {
                ++i;
              }
            }return new dl(D(e.line, n), D(e.line, i));
          }, toggleOverwrite: function toggleOverwrite(e) {
            null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? l(this.display.cursorDiv, "CodeMirror-overwrite") : ka(this.display.cursorDiv, "CodeMirror-overwrite"), Ee(this, "overwriteToggle", this, this.state.overwrite));
          }, hasFocus: function hasFocus() {
            return this.display.input.getField() == a();
          }, isReadOnly: function isReadOnly() {
            return !(!this.options.readOnly && !this.doc.cantEdit);
          }, scrollTo: hn(function (e, t) {
            Gr(this, e, t);
          }), getScrollInfo: function getScrollInfo() {
            var e = this.display.scroller;return { left: e.scrollLeft, top: e.scrollTop, height: e.scrollHeight - Ut(this) - this.display.barHeight, width: e.scrollWidth - Ut(this) - this.display.barWidth, clientHeight: qt(this), clientWidth: jt(this) };
          }, scrollIntoView: hn(function (e, t) {
            null == e ? (e = { from: this.doc.sel.primary().head, to: null }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = { from: D(e, 0), to: null } : null == e.from && (e = { from: e, to: null }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? $r(this, e) : Vr(this, e.from, e.to, e.margin);
          }), setSize: hn(function (e, t) {
            var r = this,
                n = function n(e) {
              return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
            };null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && nr(this);var i = this.display.viewFrom;this.doc.iter(i, this.display.viewTo, function (e) {
              if (e.widgets) for (var t = 0; t < e.widgets.length; t++) {
                if (e.widgets[t].noHScroll) {
                  gn(r, i, "widget");break;
                }
              }++i;
            }), this.curOp.forceUpdate = !0, Ee(this, "refresh", this);
          }), operation: function operation(e) {
            return dn(this, e);
          }, refresh: hn(function () {
            var e = this.display.cachedTextHeight;mn(this), this.curOp.forceUpdate = !0, ir(this), Gr(this, this.doc.scrollLeft, this.doc.scrollTop), En(this), (null == e || Math.abs(e - vr(this.display)) > .5) && kr(this), Ee(this, "refresh", this);
          }), swapDoc: hn(function (e) {
            var t = this.doc;return t.cm = null, Kn(this, e), ir(this), this.display.input.reset(), Gr(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, Ct(this, "swapDoc", this, t), t;
          }), getInputField: function getInputField() {
            return this.display.input.getField();
          }, getWrapperElement: function getWrapperElement() {
            return this.display.wrapper;
          }, getScrollerElement: function getScrollerElement() {
            return this.display.scroller;
          }, getGutterElement: function getGutterElement() {
            return this.display.gutters;
          } }, Pe(e), e.registerHelper = function (t, n, i) {
          r.hasOwnProperty(t) || (r[t] = e[t] = { _global: [] }), r[t][n] = i;
        }, e.registerGlobalHelper = function (t, n, i, o) {
          e.registerHelper(t, n, o), r[t]._global.push({ pred: i, val: o });
        };
      }(Io);var Bl = "iter insert remove copy getEditor constructor".split(" ");for (var Wl in xl.prototype) {
        xl.prototype.hasOwnProperty(Wl) && f(Bl, Wl) < 0 && (Io.prototype[Wl] = function (e) {
          return function () {
            return e.apply(this.doc, arguments);
          };
        }(xl.prototype[Wl]));
      }return Pe(xl), Io.inputStyles = { textarea: _l, contenteditable: zl }, Io.defineMode = function (e) {
        Io.defaults.mode || "null" == e || (Io.defaults.mode = e), qe.apply(this, arguments);
      }, Io.defineMIME = Ge, Io.defineMode("null", function () {
        return { token: function token(e) {
            return e.skipToEnd();
          } };
      }), Io.defineMIME("text/plain", "null"), Io.defineExtension = function (e, t) {
        Io.prototype[e] = t;
      }, Io.defineDocExtension = function (e, t) {
        xl.prototype[e] = t;
      }, Io.fromTextArea = Xo, function (e) {
        e.off = Ae, e.on = Wa, e.wheelEventPixels = Dn, e.Doc = xl, e.splitLines = Ua, e.countColumn = d, e.findColumn = h, e.isWordChar = b, e.Pass = Na, e.signal = Ee, e.Line = Xa, e.changeEnd = Bn, e.scrollbarModel = ol, e.Pos = D, e.cmpPos = H, e.modes = $a, e.mimeModes = Ya, e.resolveMode = $e, e.getMode = Ye, e.modeExtensions = Va, e.extendMode = Ve, e.copyState = Ke, e.startState = Ze, e.innerMode = Xe, e.commands = Al, e.keyMap = Ll, e.keyName = io, e.isModifierKey = no, e.lookupKey = ro, e.normalizeKeyMap = to, e.StringStream = Ka, e.SharedTextMarker = vl, e.TextMarker = gl, e.LineWidget = pl, e.e_preventDefault = De, e.e_stopPropagation = He, e.e_stop = _e, e.addClass = l, e.contains = o, e.rmClass = ka, e.keyNames = kl;
      }(Io), Io.version = "5.26.0", Io;
    });
  }, "9G1F": function G1F(e, t, r) {
    var n = r("8U58");n.commands.tabAndIndentMarkdownList = function (e) {
      var t = e.listSelections(),
          r = t[0].head;if (!1 !== e.getStateAfter(r.line).list) return void e.execCommand("indentMore");if (e.options.indentWithTabs) e.execCommand("insertTab");else {
        var n = Array(e.options.tabSize + 1).join(" ");e.replaceSelection(n);
      }
    }, n.commands.shiftTabAndUnindentMarkdownList = function (e) {
      var t = e.listSelections(),
          r = t[0].head;if (!1 !== e.getStateAfter(r.line).list) return void e.execCommand("indentLess");if (e.options.indentWithTabs) e.execCommand("insertTab");else {
        var n = Array(e.options.tabSize + 1).join(" ");e.replaceSelection(n);
      }
    };
  }, Ar2w: function Ar2w(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";

      var t = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,
          r = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,
          n = /[*+-]\s/;e.commands.newlineAndIndentContinueMarkdownList = function (i) {
        if (i.getOption("disableInput")) return e.Pass;for (var o = i.listSelections(), a = [], l = 0; l < o.length; l++) {
          var s = o[l].head,
              c = i.getStateAfter(s.line),
              u = !1 !== c.list,
              d = 0 !== c.quote,
              f = i.getLine(s.line),
              h = t.exec(f);if (!o[l].empty() || !u && !d || !h) return void i.execCommand("newlineAndIndent");if (r.test(f)) />\s*$/.test(f) || i.replaceRange("", { line: s.line, ch: 0 }, { line: s.line, ch: s.ch + 1 }), a[l] = "\n";else {
            var p = h[1],
                m = h[5],
                g = n.test(h[2]) || h[2].indexOf(">") >= 0 ? h[2].replace("x", " ") : parseInt(h[3], 10) + 1 + h[4];a[l] = "\n" + p + g + m;
          }
        }i.replaceSelections(a);
      };
    });
  }, EFqf: function EFqf(e, t, r) {
    (function (t) {
      (function () {
        function t(e) {
          this.tokens = [], this.tokens.links = {}, this.options = e || u.defaults, this.rules = d.normal, this.options.gfm && (this.options.tables ? this.rules = d.tables : this.rules = d.gfm);
        }function r(e, t) {
          if (this.options = t || u.defaults, this.links = e, this.rules = f.normal, this.renderer = this.options.renderer || new n(), this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");this.options.gfm ? this.options.breaks ? this.rules = f.breaks : this.rules = f.gfm : this.options.pedantic && (this.rules = f.pedantic);
        }function n(e) {
          this.options = e || {};
        }function i(e) {
          this.tokens = [], this.token = null, this.options = e || u.defaults, this.options.renderer = this.options.renderer || new n(), this.renderer = this.options.renderer, this.renderer.options = this.options;
        }function o(e, t) {
          return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        }function a(e) {
          return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function (e, t) {
            return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "";
          });
        }function l(e, t) {
          return e = e.source, t = t || "", function r(n, i) {
            return n ? (i = i.source || i, i = i.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(n, i), r) : new RegExp(e, t);
          };
        }function s() {}function c(e) {
          for (var t, r, n = 1; n < arguments.length; n++) {
            t = arguments[n];for (r in t) {
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
          }return e;
        }function u(e, r, n) {
          if (n || "function" == typeof r) {
            n || (n = r, r = null), r = c({}, u.defaults, r || {});var a,
                l,
                s = r.highlight,
                d = 0;try {
              a = t.lex(e, r);
            } catch (e) {
              return n(e);
            }l = a.length;var f = function f(e) {
              if (e) return r.highlight = s, n(e);var t;try {
                t = i.parse(a, r);
              } catch (t) {
                e = t;
              }return r.highlight = s, e ? n(e) : n(null, t);
            };if (!s || s.length < 3) return f();if (delete r.highlight, !l) return f();for (; d < a.length; d++) {
              !function (e) {
                "code" !== e.type ? --l || f() : s(e.text, e.lang, function (t, r) {
                  return t ? f(t) : null == r || r === e.text ? --l || f() : (e.text = r, e.escaped = !0, void (--l || f()));
                });
              }(a[d]);
            }
          } else try {
            return r && (r = c({}, u.defaults, r)), i.parse(t.lex(e, r), r);
          } catch (e) {
            if (e.message += "\nPlease report this to https://github.com/chjj/marked.", (r || u.defaults).silent) return "<p>An error occured:</p><pre>" + o(e.message + "", !0) + "</pre>";throw e;
          }
        }var d = { newline: /^\n+/, code: /^( {4}[^\n]+\n*)+/, fences: s, hr: /^( *[-*_]){3,} *(?:\n+|$)/, heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/, nptable: s, lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/, blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/, list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/, html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/, def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/, table: s, paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/, text: /^[^\n]+/ };d.bullet = /(?:[*+-]|\d+\.)/, d.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, d.item = l(d.item, "gm")(/bull/g, d.bullet)(), d.list = l(d.list)(/bull/g, d.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + d.def.source + ")")(), d.blockquote = l(d.blockquote)("def", d.def)(), d._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", d.html = l(d.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, d._tag)(), d.paragraph = l(d.paragraph)("hr", d.hr)("heading", d.heading)("lheading", d.lheading)("blockquote", d.blockquote)("tag", "<" + d._tag)("def", d.def)(), d.normal = c({}, d), d.gfm = c({}, d.normal, { fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/, paragraph: /^/, heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/ }), d.gfm.paragraph = l(d.paragraph)("(?!", "(?!" + d.gfm.fences.source.replace("\\1", "\\2") + "|" + d.list.source.replace("\\1", "\\3") + "|")(), d.tables = c({}, d.gfm, { nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/, table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/ }), t.rules = d, t.lex = function (e, r) {
          return new t(r).lex(e);
        }, t.prototype.lex = function (e) {
          return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0);
        }, t.prototype.token = function (e, t, r) {
          for (var n, i, o, a, l, s, c, u, f, e = e.replace(/^ +$/gm, ""); e;) {
            if ((o = this.rules.newline.exec(e)) && (e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({ type: "space" })), o = this.rules.code.exec(e)) e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({ type: "code", text: this.options.pedantic ? o : o.replace(/\n+$/, "") });else if (o = this.rules.fences.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "code", lang: o[2], text: o[3] || "" });else if (o = this.rules.heading.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "heading", depth: o[1].length, text: o[2] });else if (t && (o = this.rules.nptable.exec(e))) {
              for (e = e.substring(o[0].length), s = { type: "table", header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: o[3].replace(/\n$/, "").split("\n") }, u = 0; u < s.align.length; u++) {
                /^ *-+: *$/.test(s.align[u]) ? s.align[u] = "right" : /^ *:-+: *$/.test(s.align[u]) ? s.align[u] = "center" : /^ *:-+ *$/.test(s.align[u]) ? s.align[u] = "left" : s.align[u] = null;
              }for (u = 0; u < s.cells.length; u++) {
                s.cells[u] = s.cells[u].split(/ *\| */);
              }this.tokens.push(s);
            } else if (o = this.rules.lheading.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "heading", depth: "=" === o[2] ? 1 : 2, text: o[1] });else if (o = this.rules.hr.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "hr" });else if (o = this.rules.blockquote.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "blockquote_start" }), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, t, !0), this.tokens.push({ type: "blockquote_end" });else if (o = this.rules.list.exec(e)) {
              for (e = e.substring(o[0].length), a = o[2], this.tokens.push({ type: "list_start", ordered: a.length > 1 }), o = o[0].match(this.rules.item), n = !1, f = o.length, u = 0; u < f; u++) {
                s = o[u], c = s.length, s = s.replace(/^ *([*+-]|\d+\.) +/, ""), ~s.indexOf("\n ") && (c -= s.length, s = this.options.pedantic ? s.replace(/^ {1,4}/gm, "") : s.replace(new RegExp("^ {1," + c + "}", "gm"), "")), this.options.smartLists && u !== f - 1 && (l = d.bullet.exec(o[u + 1])[0], a === l || a.length > 1 && l.length > 1 || (e = o.slice(u + 1).join("\n") + e, u = f - 1)), i = n || /\n\n(?!\s*$)/.test(s), u !== f - 1 && (n = "\n" === s.charAt(s.length - 1), i || (i = n)), this.tokens.push({ type: i ? "loose_item_start" : "list_item_start" }), this.token(s, !1, r), this.tokens.push({ type: "list_item_end" });
              }this.tokens.push({ type: "list_end" });
            } else if (o = this.rules.html.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: this.options.sanitize ? "paragraph" : "html", pre: !this.options.sanitizer && ("pre" === o[1] || "script" === o[1] || "style" === o[1]), text: o[0] });else if (!r && t && (o = this.rules.def.exec(e))) e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = { href: o[2], title: o[3] };else if (t && (o = this.rules.table.exec(e))) {
              for (e = e.substring(o[0].length), s = { type: "table", header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n") }, u = 0; u < s.align.length; u++) {
                /^ *-+: *$/.test(s.align[u]) ? s.align[u] = "right" : /^ *:-+: *$/.test(s.align[u]) ? s.align[u] = "center" : /^ *:-+ *$/.test(s.align[u]) ? s.align[u] = "left" : s.align[u] = null;
              }for (u = 0; u < s.cells.length; u++) {
                s.cells[u] = s.cells[u].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
              }this.tokens.push(s);
            } else if (t && (o = this.rules.paragraph.exec(e))) e = e.substring(o[0].length), this.tokens.push({ type: "paragraph", text: "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1] });else if (o = this.rules.text.exec(e)) e = e.substring(o[0].length), this.tokens.push({ type: "text", text: o[0] });else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
          }return this.tokens;
        };var f = { escape: /^\\([\\`*{}\[\]()#+\-.!_>])/, autolink: /^<([^ >]+(@|:\/)[^ >]+)>/, url: s, tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/, link: /^!?\[(inside)\]\(href\)/, reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/, nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/, strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/, em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/, code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, br: /^ {2,}\n(?!\s*$)/, del: s, text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/ };f._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, f._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, f.link = l(f.link)("inside", f._inside)("href", f._href)(), f.reflink = l(f.reflink)("inside", f._inside)(), f.normal = c({}, f), f.pedantic = c({}, f.normal, { strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/ }), f.gfm = c({}, f.normal, { escape: l(f.escape)("])", "~|])")(), url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, del: /^~~(?=\S)([\s\S]*?\S)~~/, text: l(f.text)("]|", "~]|")("|", "|https?://|")() }), f.breaks = c({}, f.gfm, { br: l(f.br)("{2,}", "*")(), text: l(f.gfm.text)("{2,}", "*")() }), r.rules = f, r.output = function (e, t, n) {
          return new r(t, n).output(e);
        }, r.prototype.output = function (e) {
          for (var t, r, n, i, a = ""; e;) {
            if (i = this.rules.escape.exec(e)) e = e.substring(i[0].length), a += i[1];else if (i = this.rules.autolink.exec(e)) e = e.substring(i[0].length), "@" === i[2] ? (r = ":" === i[1].charAt(6) ? this.mangle(i[1].substring(7)) : this.mangle(i[1]), n = this.mangle("mailto:") + r) : (r = o(i[1]), n = r), a += this.renderer.link(n, null, r);else if (this.inLink || !(i = this.rules.url.exec(e))) {
              if (i = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(i[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1), e = e.substring(i[0].length), a += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : o(i[0]) : i[0];else if (i = this.rules.link.exec(e)) e = e.substring(i[0].length), this.inLink = !0, a += this.outputLink(i, { href: i[2], title: i[3] }), this.inLink = !1;else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
                if (e = e.substring(i[0].length), t = (i[2] || i[1]).replace(/\s+/g, " "), !(t = this.links[t.toLowerCase()]) || !t.href) {
                  a += i[0].charAt(0), e = i[0].substring(1) + e;continue;
                }this.inLink = !0, a += this.outputLink(i, t), this.inLink = !1;
              } else if (i = this.rules.strong.exec(e)) e = e.substring(i[0].length), a += this.renderer.strong(this.output(i[2] || i[1]));else if (i = this.rules.em.exec(e)) e = e.substring(i[0].length), a += this.renderer.em(this.output(i[2] || i[1]));else if (i = this.rules.code.exec(e)) e = e.substring(i[0].length), a += this.renderer.codespan(o(i[2], !0));else if (i = this.rules.br.exec(e)) e = e.substring(i[0].length), a += this.renderer.br();else if (i = this.rules.del.exec(e)) e = e.substring(i[0].length), a += this.renderer.del(this.output(i[1]));else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), a += this.renderer.text(o(this.smartypants(i[0])));else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
            } else e = e.substring(i[0].length), r = o(i[1]), n = r, a += this.renderer.link(n, null, r);
          }return a;
        }, r.prototype.outputLink = function (e, t) {
          var r = o(t.href),
              n = t.title ? o(t.title) : null;return "!" !== e[0].charAt(0) ? this.renderer.link(r, n, this.output(e[1])) : this.renderer.image(r, n, o(e[1]));
        }, r.prototype.smartypants = function (e) {
          return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e;
        }, r.prototype.mangle = function (e) {
          if (!this.options.mangle) return e;for (var t, r = "", n = e.length, i = 0; i < n; i++) {
            t = e.charCodeAt(i), Math.random() > .5 && (t = "x" + t.toString(16)), r += "&#" + t + ";";
          }return r;
        }, n.prototype.code = function (e, t, r) {
          if (this.options.highlight) {
            var n = this.options.highlight(e, t);null != n && n !== e && (r = !0, e = n);
          }return t ? '<pre><code class="' + this.options.langPrefix + o(t, !0) + '">' + (r ? e : o(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (r ? e : o(e, !0)) + "\n</code></pre>";
        }, n.prototype.blockquote = function (e) {
          return "<blockquote>\n" + e + "</blockquote>\n";
        }, n.prototype.html = function (e) {
          return e;
        }, n.prototype.heading = function (e, t, r) {
          return "<h" + t + ' id="' + this.options.headerPrefix + r.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n";
        }, n.prototype.hr = function () {
          return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
        }, n.prototype.list = function (e, t) {
          var r = t ? "ol" : "ul";return "<" + r + ">\n" + e + "</" + r + ">\n";
        }, n.prototype.listitem = function (e) {
          return "<li>" + e + "</li>\n";
        }, n.prototype.paragraph = function (e) {
          return "<p>" + e + "</p>\n";
        }, n.prototype.table = function (e, t) {
          return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n";
        }, n.prototype.tablerow = function (e) {
          return "<tr>\n" + e + "</tr>\n";
        }, n.prototype.tablecell = function (e, t) {
          var r = t.header ? "th" : "td";return (t.align ? "<" + r + ' style="text-align:' + t.align + '">' : "<" + r + ">") + e + "</" + r + ">\n";
        }, n.prototype.strong = function (e) {
          return "<strong>" + e + "</strong>";
        }, n.prototype.em = function (e) {
          return "<em>" + e + "</em>";
        }, n.prototype.codespan = function (e) {
          return "<code>" + e + "</code>";
        }, n.prototype.br = function () {
          return this.options.xhtml ? "<br/>" : "<br>";
        }, n.prototype.del = function (e) {
          return "<del>" + e + "</del>";
        }, n.prototype.link = function (e, t, r) {
          if (this.options.sanitize) {
            try {
              var n = decodeURIComponent(a(e)).replace(/[^\w:]/g, "").toLowerCase();
            } catch (e) {
              return "";
            }if (0 === n.indexOf("javascript:") || 0 === n.indexOf("vbscript:")) return "";
          }var i = '<a href="' + e + '"';return t && (i += ' title="' + t + '"'), i += ">" + r + "</a>";
        }, n.prototype.image = function (e, t, r) {
          var n = '<img src="' + e + '" alt="' + r + '"';return t && (n += ' title="' + t + '"'), n += this.options.xhtml ? "/>" : ">";
        }, n.prototype.text = function (e) {
          return e;
        }, i.parse = function (e, t, r) {
          return new i(t, r).parse(e);
        }, i.prototype.parse = function (e) {
          this.inline = new r(e.links, this.options, this.renderer), this.tokens = e.reverse();for (var t = ""; this.next();) {
            t += this.tok();
          }return t;
        }, i.prototype.next = function () {
          return this.token = this.tokens.pop();
        }, i.prototype.peek = function () {
          return this.tokens[this.tokens.length - 1] || 0;
        }, i.prototype.parseText = function () {
          for (var e = this.token.text; "text" === this.peek().type;) {
            e += "\n" + this.next().text;
          }return this.inline.output(e);
        }, i.prototype.tok = function () {
          switch (this.token.type) {case "space":
              return "";case "hr":
              return this.renderer.hr();case "heading":
              return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);case "code":
              return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);case "table":
              var e,
                  t,
                  r,
                  n,
                  i = "",
                  o = "";for (r = "", e = 0; e < this.token.header.length; e++) {
                ({ header: !0, align: this.token.align[e] }), r += this.renderer.tablecell(this.inline.output(this.token.header[e]), { header: !0, align: this.token.align[e] });
              }for (i += this.renderer.tablerow(r), e = 0; e < this.token.cells.length; e++) {
                for (t = this.token.cells[e], r = "", n = 0; n < t.length; n++) {
                  r += this.renderer.tablecell(this.inline.output(t[n]), { header: !1, align: this.token.align[n] });
                }o += this.renderer.tablerow(r);
              }return this.renderer.table(i, o);case "blockquote_start":
              for (var o = ""; "blockquote_end" !== this.next().type;) {
                o += this.tok();
              }return this.renderer.blockquote(o);case "list_start":
              for (var o = "", a = this.token.ordered; "list_end" !== this.next().type;) {
                o += this.tok();
              }return this.renderer.list(o, a);case "list_item_start":
              for (var o = ""; "list_item_end" !== this.next().type;) {
                o += "text" === this.token.type ? this.parseText() : this.tok();
              }return this.renderer.listitem(o);case "loose_item_start":
              for (var o = ""; "list_item_end" !== this.next().type;) {
                o += this.tok();
              }return this.renderer.listitem(o);case "html":
              var l = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);return this.renderer.html(l);case "paragraph":
              return this.renderer.paragraph(this.inline.output(this.token.text));case "text":
              return this.renderer.paragraph(this.parseText());}
        }, s.exec = s, u.options = u.setOptions = function (e) {
          return c(u.defaults, e), u;
        }, u.defaults = { gfm: !0, tables: !0, breaks: !1, pedantic: !1, sanitize: !1, sanitizer: null, mangle: !0, smartLists: !1, silent: !1, highlight: null, langPrefix: "lang-", smartypants: !1, headerPrefix: "", renderer: new n(), xhtml: !1 }, u.Parser = i, u.parser = i.parse, u.Renderer = n, u.Lexer = t, u.lexer = t.lex, u.InlineLexer = r, u.inlineLexer = r.output, u.parse = u, e.exports = u;
      }).call(function () {
        return this || ("undefined" != typeof window ? window : t);
      }());
    }).call(t, r("DuR2"));
  }, EKta: function EKta(e, t, r) {
    "use strict";

    function n(e) {
      var t = e.length;if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0;
    }function i(e) {
      return 3 * e.length / 4 - n(e);
    }function o(e) {
      var t,
          r,
          i,
          o,
          a,
          l = e.length;o = n(e), a = new d(3 * l / 4 - o), r = o > 0 ? l - 4 : l;var s = 0;for (t = 0; t < r; t += 4) {
        i = u[e.charCodeAt(t)] << 18 | u[e.charCodeAt(t + 1)] << 12 | u[e.charCodeAt(t + 2)] << 6 | u[e.charCodeAt(t + 3)], a[s++] = i >> 16 & 255, a[s++] = i >> 8 & 255, a[s++] = 255 & i;
      }return 2 === o ? (i = u[e.charCodeAt(t)] << 2 | u[e.charCodeAt(t + 1)] >> 4, a[s++] = 255 & i) : 1 === o && (i = u[e.charCodeAt(t)] << 10 | u[e.charCodeAt(t + 1)] << 4 | u[e.charCodeAt(t + 2)] >> 2, a[s++] = i >> 8 & 255, a[s++] = 255 & i), a;
    }function a(e) {
      return c[e >> 18 & 63] + c[e >> 12 & 63] + c[e >> 6 & 63] + c[63 & e];
    }function l(e, t, r) {
      for (var n, i = [], o = t; o < r; o += 3) {
        n = (e[o] << 16) + (e[o + 1] << 8) + e[o + 2], i.push(a(n));
      }return i.join("");
    }function s(e) {
      for (var t, r = e.length, n = r % 3, i = "", o = [], a = 0, s = r - n; a < s; a += 16383) {
        o.push(l(e, a, a + 16383 > s ? s : a + 16383));
      }return 1 === n ? (t = e[r - 1], i += c[t >> 2], i += c[t << 4 & 63], i += "==") : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], i += c[t >> 10], i += c[t >> 4 & 63], i += c[t << 2 & 63], i += "="), o.push(i), o.join("");
    }t.byteLength = i, t.toByteArray = o, t.fromByteArray = s;for (var c = [], u = [], d = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = f.length; h < p; ++h) {
      c[h] = f[h], u[f.charCodeAt(h)] = h;
    }u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63;
  }, EuP9: function EuP9(e, t, r) {
    "use strict";

    (function (e) {
      function n() {
        return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }function i(e, t) {
        if (n() < t) throw new RangeError("Invalid typed array length");return o.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = o.prototype) : (null === e && (e = new o(t)), e.length = t), e;
      }function o(e, t, r) {
        if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(e, t, r);if ("number" == typeof e) {
          if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return c(this, e);
        }return a(this, e, t, r);
      }function a(e, t, r, n) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? f(e, t, r, n) : "string" == typeof t ? u(e, t, r) : h(e, t);
      }function l(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');if (e < 0) throw new RangeError('"size" argument must not be negative');
      }function s(e, t, r, n) {
        return l(t), t <= 0 ? i(e, t) : void 0 !== r ? "string" == typeof n ? i(e, t).fill(r, n) : i(e, t).fill(r) : i(e, t);
      }function c(e, t) {
        if (l(t), e = i(e, t < 0 ? 0 : 0 | p(t)), !o.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) {
          e[r] = 0;
        }return e;
      }function u(e, t, r) {
        if ("string" == typeof r && "" !== r || (r = "utf8"), !o.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');var n = 0 | g(t, r);e = i(e, n);var a = e.write(t, r);return a !== n && (e = e.slice(0, a)), e;
      }function d(e, t) {
        var r = t.length < 0 ? 0 : 0 | p(t.length);e = i(e, r);for (var n = 0; n < r; n += 1) {
          e[n] = 255 & t[n];
        }return e;
      }function f(e, t, r, n) {
        if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), o.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = o.prototype) : e = d(e, t), e;
      }function h(e, t) {
        if (o.isBuffer(t)) {
          var r = 0 | p(t.length);return e = i(e, r), 0 === e.length ? e : (t.copy(e, 0, 0, r), e);
        }if (t) {
          if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || K(t.length) ? i(e, 0) : d(e, t);if ("Buffer" === t.type && Q(t.data)) return d(e, t.data);
        }throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }function p(e) {
        if (e >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");return 0 | e;
      }function m(e) {
        return +e != e && (e = 0), o.alloc(+e);
      }function g(e, t) {
        if (o.isBuffer(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var r = e.length;if (0 === r) return 0;for (var n = !1;;) {
          switch (t) {case "ascii":case "latin1":case "binary":
              return r;case "utf8":case "utf-8":case void 0:
              return q(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
              return 2 * r;case "hex":
              return r >>> 1;case "base64":
              return Y(e).length;default:
              if (n) return q(e).length;t = ("" + t).toLowerCase(), n = !0;}
        }
      }function v(e, t, r) {
        var n = !1;if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";if (r >>>= 0, t >>>= 0, r <= t) return "";for (e || (e = "utf8");;) {
          switch (e) {case "hex":
              return I(this, t, r);case "utf8":case "utf-8":
              return N(this, t, r);case "ascii":
              return E(this, t, r);case "latin1":case "binary":
              return O(this, t, r);case "base64":
              return T(this, t, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
              return R(this, t, r);default:
              if (n) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), n = !0;}
        }
      }function y(e, t, r) {
        var n = e[t];e[t] = e[r], e[r] = n;
      }function x(e, t, r, n, i) {
        if (0 === e.length) return -1;if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
          if (i) return -1;r = e.length - 1;
        } else if (r < 0) {
          if (!i) return -1;r = 0;
        }if ("string" == typeof t && (t = o.from(t, n)), o.isBuffer(t)) return 0 === t.length ? -1 : b(e, t, r, n, i);if ("number" == typeof t) return t &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : b(e, [t], r, n, i);throw new TypeError("val must be string, number or Buffer");
      }function b(e, t, r, n, i) {
        function o(e, t) {
          return 1 === a ? e[t] : e.readUInt16BE(t * a);
        }var a = 1,
            l = e.length,
            s = t.length;if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
          if (e.length < 2 || t.length < 2) return -1;a = 2, l /= 2, s /= 2, r /= 2;
        }var c;if (i) {
          var u = -1;for (c = r; c < l; c++) {
            if (o(e, c) === o(t, -1 === u ? 0 : c - u)) {
              if (-1 === u && (u = c), c - u + 1 === s) return u * a;
            } else -1 !== u && (c -= c - u), u = -1;
          }
        } else for (r + s > l && (r = l - s), c = r; c >= 0; c--) {
          for (var d = !0, f = 0; f < s; f++) {
            if (o(e, c + f) !== o(t, f)) {
              d = !1;break;
            }
          }if (d) return c;
        }return -1;
      }function w(e, t, r, n) {
        r = Number(r) || 0;var i = e.length - r;n ? (n = Number(n)) > i && (n = i) : n = i;var o = t.length;if (o % 2 != 0) throw new TypeError("Invalid hex string");n > o / 2 && (n = o / 2);for (var a = 0; a < n; ++a) {
          var l = parseInt(t.substr(2 * a, 2), 16);if (isNaN(l)) return a;e[r + a] = l;
        }return a;
      }function k(e, t, r, n) {
        return V(q(t, e.length - r), e, r, n);
      }function C(e, t, r, n) {
        return V(G(t), e, r, n);
      }function S(e, t, r, n) {
        return C(e, t, r, n);
      }function M(e, t, r, n) {
        return V(Y(t), e, r, n);
      }function L(e, t, r, n) {
        return V($(t, e.length - r), e, r, n);
      }function T(e, t, r) {
        return 0 === t && r === e.length ? X.fromByteArray(e) : X.fromByteArray(e.slice(t, r));
      }function N(e, t, r) {
        r = Math.min(e.length, r);for (var n = [], i = t; i < r;) {
          var o = e[i],
              a = null,
              l = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;if (i + l <= r) {
            var s, c, u, d;switch (l) {case 1:
                o < 128 && (a = o);break;case 2:
                s = e[i + 1], 128 == (192 & s) && (d = (31 & o) << 6 | 63 & s) > 127 && (a = d);break;case 3:
                s = e[i + 1], c = e[i + 2], 128 == (192 & s) && 128 == (192 & c) && (d = (15 & o) << 12 | (63 & s) << 6 | 63 & c) > 2047 && (d < 55296 || d > 57343) && (a = d);break;case 4:
                s = e[i + 1], c = e[i + 2], u = e[i + 3], 128 == (192 & s) && 128 == (192 & c) && 128 == (192 & u) && (d = (15 & o) << 18 | (63 & s) << 12 | (63 & c) << 6 | 63 & u) > 65535 && d < 1114112 && (a = d);}
          }null === a ? (a = 65533, l = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), i += l;
        }return A(n);
      }function A(e) {
        var t = e.length;if (t <= J) return String.fromCharCode.apply(String, e);for (var r = "", n = 0; n < t;) {
          r += String.fromCharCode.apply(String, e.slice(n, n += J));
        }return r;
      }function E(e, t, r) {
        var n = "";r = Math.min(e.length, r);for (var i = t; i < r; ++i) {
          n += String.fromCharCode(127 & e[i]);
        }return n;
      }function O(e, t, r) {
        var n = "";r = Math.min(e.length, r);for (var i = t; i < r; ++i) {
          n += String.fromCharCode(e[i]);
        }return n;
      }function I(e, t, r) {
        var n = e.length;(!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);for (var i = "", o = t; o < r; ++o) {
          i += j(e[o]);
        }return i;
      }function R(e, t, r) {
        for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) {
          i += String.fromCharCode(n[o] + 256 * n[o + 1]);
        }return i;
      }function P(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
      }function D(e, t, r, n, i, a) {
        if (!o.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > i || t < a) throw new RangeError('"value" argument is out of bounds');if (r + n > e.length) throw new RangeError("Index out of range");
      }function H(e, t, r, n) {
        t < 0 && (t = 65535 + t + 1);for (var i = 0, o = Math.min(e.length - r, 2); i < o; ++i) {
          e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
        }
      }function z(e, t, r, n) {
        t < 0 && (t = 4294967295 + t + 1);for (var i = 0, o = Math.min(e.length - r, 4); i < o; ++i) {
          e[r + i] = t >>> 8 * (n ? i : 3 - i) & 255;
        }
      }function _(e, t, r, n, i, o) {
        if (r + n > e.length) throw new RangeError("Index out of range");if (r < 0) throw new RangeError("Index out of range");
      }function B(e, t, r, n, i) {
        return i || _(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), Z.write(e, t, r, n, 23, 4), r + 4;
      }function W(e, t, r, n, i) {
        return i || _(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), Z.write(e, t, r, n, 52, 8), r + 8;
      }function F(e) {
        if (e = U(e).replace(ee, ""), e.length < 2) return "";for (; e.length % 4 != 0;) {
          e += "=";
        }return e;
      }function U(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
      }function j(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16);
      }function q(e, t) {
        t = t || 1 / 0;for (var r, n = e.length, i = null, o = [], a = 0; a < n; ++a) {
          if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);continue;
              }if (a + 1 === n) {
                (t -= 3) > -1 && o.push(239, 191, 189);continue;
              }i = r;continue;
            }if (r < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), i = r;continue;
            }r = 65536 + (i - 55296 << 10 | r - 56320);
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);if (i = null, r < 128) {
            if ((t -= 1) < 0) break;o.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;o.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }return o;
      }function G(e) {
        for (var t = [], r = 0; r < e.length; ++r) {
          t.push(255 & e.charCodeAt(r));
        }return t;
      }function $(e, t) {
        for (var r, n, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) {
          r = e.charCodeAt(a), n = r >> 8, i = r % 256, o.push(i), o.push(n);
        }return o;
      }function Y(e) {
        return X.toByteArray(F(e));
      }function V(e, t, r, n) {
        for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) {
          t[i + r] = e[i];
        }return i;
      }function K(e) {
        return e !== e;
      } /*!
        * The buffer module from node.js, for the browser.
        *
        * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
        * @license  MIT
        */
      var X = r("EKta"),
          Z = r("ujcs"),
          Q = r("sOR5");t.Buffer = o, t.SlowBuffer = m, t.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
        try {
          var e = new Uint8Array(1);return e.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
              return 42;
            } }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
        } catch (e) {
          return !1;
        }
      }(), t.kMaxLength = n(), o.poolSize = 8192, o._augment = function (e) {
        return e.__proto__ = o.prototype, e;
      }, o.from = function (e, t, r) {
        return a(null, e, t, r);
      }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof _symbol2.default && _species2.default && o[_species2.default] === o && (0, _defineProperty2.default)(o, _species2.default, { value: null, configurable: !0 })), o.alloc = function (e, t, r) {
        return s(null, e, t, r);
      }, o.allocUnsafe = function (e) {
        return c(null, e);
      }, o.allocUnsafeSlow = function (e) {
        return c(null, e);
      }, o.isBuffer = function (e) {
        return !(null == e || !e._isBuffer);
      }, o.compare = function (e, t) {
        if (!o.isBuffer(e) || !o.isBuffer(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var r = e.length, n = t.length, i = 0, a = Math.min(r, n); i < a; ++i) {
          if (e[i] !== t[i]) {
            r = e[i], n = t[i];break;
          }
        }return r < n ? -1 : n < r ? 1 : 0;
      }, o.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
            return !0;default:
            return !1;}
      }, o.concat = function (e, t) {
        if (!Q(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return o.alloc(0);var r;if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) {
          t += e[r].length;
        }var n = o.allocUnsafe(t),
            i = 0;for (r = 0; r < e.length; ++r) {
          var a = e[r];if (!o.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');a.copy(n, i), i += a.length;
        }return n;
      }, o.byteLength = g, o.prototype._isBuffer = !0, o.prototype.swap16 = function () {
        var e = this.length;if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {
          y(this, t, t + 1);
        }return this;
      }, o.prototype.swap32 = function () {
        var e = this.length;if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {
          y(this, t, t + 3), y(this, t + 1, t + 2);
        }return this;
      }, o.prototype.swap64 = function () {
        var e = this.length;if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {
          y(this, t, t + 7), y(this, t + 1, t + 6), y(this, t + 2, t + 5), y(this, t + 3, t + 4);
        }return this;
      }, o.prototype.toString = function () {
        var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? N(this, 0, e) : v.apply(this, arguments);
      }, o.prototype.equals = function (e) {
        if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === o.compare(this, e);
      }, o.prototype.inspect = function () {
        var e = "",
            r = t.INSPECT_MAX_BYTES;return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">";
      }, o.prototype.compare = function (e, t, r, n, i) {
        if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");if (n >= i && t >= r) return 0;if (n >= i) return -1;if (t >= r) return 1;if (t >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === e) return 0;for (var a = i - n, l = r - t, s = Math.min(a, l), c = this.slice(n, i), u = e.slice(t, r), d = 0; d < s; ++d) {
          if (c[d] !== u[d]) {
            a = c[d], l = u[d];break;
          }
        }return a < l ? -1 : l < a ? 1 : 0;
      }, o.prototype.includes = function (e, t, r) {
        return -1 !== this.indexOf(e, t, r);
      }, o.prototype.indexOf = function (e, t, r) {
        return x(this, e, t, r, !0);
      }, o.prototype.lastIndexOf = function (e, t, r) {
        return x(this, e, t, r, !1);
      }, o.prototype.write = function (e, t, r, n) {
        if (void 0 === t) n = "utf8", r = this.length, t = 0;else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;else {
          if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
        }var i = this.length - t;if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");n || (n = "utf8");for (var o = !1;;) {
          switch (n) {case "hex":
              return w(this, e, t, r);case "utf8":case "utf-8":
              return k(this, e, t, r);case "ascii":
              return C(this, e, t, r);case "latin1":case "binary":
              return S(this, e, t, r);case "base64":
              return M(this, e, t, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
              return L(this, e, t, r);default:
              if (o) throw new TypeError("Unknown encoding: " + n);n = ("" + n).toLowerCase(), o = !0;}
        }
      }, o.prototype.toJSON = function () {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
      };var J = 4096;o.prototype.slice = function (e, t) {
        var r = this.length;e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);var n;if (o.TYPED_ARRAY_SUPPORT) n = this.subarray(e, t), n.__proto__ = o.prototype;else {
          var i = t - e;n = new o(i, void 0);for (var a = 0; a < i; ++a) {
            n[a] = this[a + e];
          }
        }return n;
      }, o.prototype.readUIntLE = function (e, t, r) {
        e |= 0, t |= 0, r || P(e, t, this.length);for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
          n += this[e + o] * i;
        }return n;
      }, o.prototype.readUIntBE = function (e, t, r) {
        e |= 0, t |= 0, r || P(e, t, this.length);for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) {
          n += this[e + --t] * i;
        }return n;
      }, o.prototype.readUInt8 = function (e, t) {
        return t || P(e, 1, this.length), this[e];
      }, o.prototype.readUInt16LE = function (e, t) {
        return t || P(e, 2, this.length), this[e] | this[e + 1] << 8;
      }, o.prototype.readUInt16BE = function (e, t) {
        return t || P(e, 2, this.length), this[e] << 8 | this[e + 1];
      }, o.prototype.readUInt32LE = function (e, t) {
        return t || P(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
      }, o.prototype.readUInt32BE = function (e, t) {
        return t || P(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
      }, o.prototype.readIntLE = function (e, t, r) {
        e |= 0, t |= 0, r || P(e, t, this.length);for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
          n += this[e + o] * i;
        }return i *= 128, n >= i && (n -= Math.pow(2, 8 * t)), n;
      }, o.prototype.readIntBE = function (e, t, r) {
        e |= 0, t |= 0, r || P(e, t, this.length);for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) {
          o += this[e + --n] * i;
        }return i *= 128, o >= i && (o -= Math.pow(2, 8 * t)), o;
      }, o.prototype.readInt8 = function (e, t) {
        return t || P(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
      }, o.prototype.readInt16LE = function (e, t) {
        t || P(e, 2, this.length);var r = this[e] | this[e + 1] << 8;return 32768 & r ? 4294901760 | r : r;
      }, o.prototype.readInt16BE = function (e, t) {
        t || P(e, 2, this.length);var r = this[e + 1] | this[e] << 8;return 32768 & r ? 4294901760 | r : r;
      }, o.prototype.readInt32LE = function (e, t) {
        return t || P(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
      }, o.prototype.readInt32BE = function (e, t) {
        return t || P(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
      }, o.prototype.readFloatLE = function (e, t) {
        return t || P(e, 4, this.length), Z.read(this, e, !0, 23, 4);
      }, o.prototype.readFloatBE = function (e, t) {
        return t || P(e, 4, this.length), Z.read(this, e, !1, 23, 4);
      }, o.prototype.readDoubleLE = function (e, t) {
        return t || P(e, 8, this.length), Z.read(this, e, !0, 52, 8);
      }, o.prototype.readDoubleBE = function (e, t) {
        return t || P(e, 8, this.length), Z.read(this, e, !1, 52, 8);
      }, o.prototype.writeUIntLE = function (e, t, r, n) {
        if (e = +e, t |= 0, r |= 0, !n) {
          D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        }var i = 1,
            o = 0;for (this[t] = 255 & e; ++o < r && (i *= 256);) {
          this[t + o] = e / i & 255;
        }return t + r;
      }, o.prototype.writeUIntBE = function (e, t, r, n) {
        if (e = +e, t |= 0, r |= 0, !n) {
          D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        }var i = r - 1,
            o = 1;for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) {
          this[t + i] = e / o & 255;
        }return t + r;
      }, o.prototype.writeUInt8 = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
      }, o.prototype.writeUInt16LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : H(this, e, t, !0), t + 2;
      }, o.prototype.writeUInt16BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : H(this, e, t, !1), t + 2;
      }, o.prototype.writeUInt32LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : z(this, e, t, !0), t + 4;
      }, o.prototype.writeUInt32BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : z(this, e, t, !1), t + 4;
      }, o.prototype.writeIntLE = function (e, t, r, n) {
        if (e = +e, t |= 0, !n) {
          var i = Math.pow(2, 8 * r - 1);D(this, e, t, r, i - 1, -i);
        }var o = 0,
            a = 1,
            l = 0;for (this[t] = 255 & e; ++o < r && (a *= 256);) {
          e < 0 && 0 === l && 0 !== this[t + o - 1] && (l = 1), this[t + o] = (e / a >> 0) - l & 255;
        }return t + r;
      }, o.prototype.writeIntBE = function (e, t, r, n) {
        if (e = +e, t |= 0, !n) {
          var i = Math.pow(2, 8 * r - 1);D(this, e, t, r, i - 1, -i);
        }var o = r - 1,
            a = 1,
            l = 0;for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) {
          e < 0 && 0 === l && 0 !== this[t + o + 1] && (l = 1), this[t + o] = (e / a >> 0) - l & 255;
        }return t + r;
      }, o.prototype.writeInt8 = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
      }, o.prototype.writeInt16LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : H(this, e, t, !0), t + 2;
      }, o.prototype.writeInt16BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : H(this, e, t, !1), t + 2;
      }, o.prototype.writeInt32LE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : z(this, e, t, !0), t + 4;
      }, o.prototype.writeInt32BE = function (e, t, r) {
        return e = +e, t |= 0, r || D(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), o.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : z(this, e, t, !1), t + 4;
      }, o.prototype.writeFloatLE = function (e, t, r) {
        return B(this, e, t, !0, r);
      }, o.prototype.writeFloatBE = function (e, t, r) {
        return B(this, e, t, !1, r);
      }, o.prototype.writeDoubleLE = function (e, t, r) {
        return W(this, e, t, !0, r);
      }, o.prototype.writeDoubleBE = function (e, t, r) {
        return W(this, e, t, !1, r);
      }, o.prototype.copy = function (e, t, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;if (0 === e.length || 0 === this.length) return 0;if (t < 0) throw new RangeError("targetStart out of bounds");if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");if (n < 0) throw new RangeError("sourceEnd out of bounds");n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);var i,
            a = n - r;if (this === e && r < t && t < n) for (i = a - 1; i >= 0; --i) {
          e[i + t] = this[i + r];
        } else if (a < 1e3 || !o.TYPED_ARRAY_SUPPORT) for (i = 0; i < a; ++i) {
          e[i + t] = this[i + r];
        } else Uint8Array.prototype.set.call(e, this.subarray(r, r + a), t);return a;
      }, o.prototype.fill = function (e, t, r, n) {
        if ("string" == typeof e) {
          if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === e.length) {
            var i = e.charCodeAt(0);i < 256 && (e = i);
          }if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");if ("string" == typeof n && !o.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
        } else "number" == typeof e && (e &= 255);if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");if (r <= t) return this;t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0);var a;if ("number" == typeof e) for (a = t; a < r; ++a) {
          this[a] = e;
        } else {
          var l = o.isBuffer(e) ? e : q(new o(e, n).toString()),
              s = l.length;for (a = 0; a < r - t; ++a) {
            this[a + t] = l[a % s];
          }
        }return this;
      };var ee = /[^+\/0-9A-Za-z-_]/g;
    }).call(t, r("DuR2"));
  }, MZHO: function MZHO(e, t, r) {
    "use strict";

    var n = function n() {
      var e = this,
          t = e.$createElement,
          r = e._self._c || t;return r("div", { staticClass: "simplemde-container", style: { height: e.height + "px", zIndex: e.zIndex } }, [r("textarea", { attrs: { id: e.id } })]);
    },
        i = [],
        o = { render: n, staticRenderFns: i };t.a = o;
  }, NlNW: function NlNW(e, t, r) {
    "use strict";

    Object.defineProperty(t, "__esModule", { value: !0 });var n = r("+/qx"),
        i = r("PNWU"),
        o = r("VU/8"),
        a = o(n.a, i.a, null, null, null);t.default = a.exports;
  }, PNWU: function PNWU(e, t, r) {
    "use strict";

    var n = function n() {
      var e = this,
          t = e.$createElement,
          r = e._self._c || t;return r("div", { staticClass: "components-container" }, [e._m(0), e._v(" "), r("div", { staticClass: "editor-container" }, [r("md-editor", { ref: "contentEditor", attrs: { id: "contentEditor", height: 300, zIndex: 20 }, model: { value: e.content, callback: function callback(t) {
            e.content = t;
          }, expression: "content" } })], 1), e._v(" "), r("el-button", { staticStyle: { "margin-top": "80px" }, attrs: { type: "primary" }, on: { click: e.markdown2Html } }, [e._v("转为HTML"), r("i", { staticClass: "el-icon-document el-icon--right" })]), e._v(" "), r("div", { domProps: { innerHTML: e._s(e.html) } })], 1);
    },
        i = [function () {
      var e = this,
          t = e.$createElement,
          r = e._self._c || t;return r("code", [e._v("Markdown 我们这里选用了 "), r("a", { attrs: { href: "https://github.com/sparksuite/simplemde-markdown-editor", target: "_blank" } }, [e._v("simplemde-markdown-editor")]), e._v(" ，简单的用vue封装了一下"), r("a", { attrs: { target: "_blank", href: "https://segmentfault.com/a/1190000009762198#articleHeader14" } }, [e._v(" 相关文章 ")])]);
    }],
        o = { render: n, staticRenderFns: i };t.a = o;
  }, U80t: function U80t(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";

      function t(e) {
        e.state.markedSelection && e.operation(function () {
          a(e);
        });
      }function r(e) {
        e.state.markedSelection && e.state.markedSelection.length && e.operation(function () {
          i(e);
        });
      }function n(e, t, r, n) {
        if (0 != c(t, r)) for (var i = e.state.markedSelection, o = e.state.markedSelectionStyle, a = t.line;;) {
          var u = a == t.line ? t : s(a, 0),
              d = a + l,
              f = d >= r.line,
              h = f ? r : s(d, 0),
              p = e.markText(u, h, { className: o });if (null == n ? i.push(p) : i.splice(n++, 0, p), f) break;a = d;
        }
      }function i(e) {
        for (var t = e.state.markedSelection, r = 0; r < t.length; ++r) {
          t[r].clear();
        }t.length = 0;
      }function o(e) {
        i(e);for (var t = e.listSelections(), r = 0; r < t.length; r++) {
          n(e, t[r].from(), t[r].to());
        }
      }function a(e) {
        if (!e.somethingSelected()) return i(e);if (e.listSelections().length > 1) return o(e);var t = e.getCursor("start"),
            r = e.getCursor("end"),
            a = e.state.markedSelection;if (!a.length) return n(e, t, r);var s = a[0].find(),
            u = a[a.length - 1].find();if (!s || !u || r.line - t.line < l || c(t, u.to) >= 0 || c(r, s.from) <= 0) return o(e);for (; c(t, s.from) > 0;) {
          a.shift().clear(), s = a[0].find();
        }for (c(t, s.from) < 0 && (s.to.line - t.line < l ? (a.shift().clear(), n(e, t, s.to, 0)) : n(e, t, s.from, 0)); c(r, u.to) < 0;) {
          a.pop().clear(), u = a[a.length - 1].find();
        }c(r, u.to) > 0 && (r.line - u.from.line < l ? (a.pop().clear(), n(e, u.from, r)) : n(e, u.to, r));
      }e.defineOption("styleSelectedText", !1, function (n, a, l) {
        var s = l && l != e.Init;a && !s ? (n.state.markedSelection = [], n.state.markedSelectionStyle = "string" == typeof a ? a : "CodeMirror-selectedtext", o(n), n.on("cursorActivity", t), n.on("change", r)) : !a && s && (n.off("cursorActivity", t), n.off("change", r), i(n), n.state.markedSelection = n.state.markedSelectionStyle = null);
      });var l = 8,
          s = e.Pos,
          c = e.cmpPos;
    });
  }, ZYIx: function ZYIx(e, t, r) {
    "use strict";

    function n(e) {
      r("34l8");
    }var i = r("gQQn"),
        o = r("MZHO"),
        a = r("VU/8"),
        l = n,
        s = a(i.a, o.a, l, null, null);t.a = s.exports;
  }, afnM: function afnM(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      function t(e) {
        e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null);
      }function r(e) {
        t(e);var r = e.state.placeholder = document.createElement("pre");r.style.cssText = "height: 0; overflow: visible", r.className = "CodeMirror-placeholder";var n = e.getOption("placeholder");"string" == typeof n && (n = document.createTextNode(n)), r.appendChild(n), e.display.lineSpace.insertBefore(r, e.display.lineSpace.firstChild);
      }function n(e) {
        o(e) && r(e);
      }function i(e) {
        var n = e.getWrapperElement(),
            i = o(e);n.className = n.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? r(e) : t(e);
      }function o(e) {
        return 1 === e.lineCount() && "" === e.getLine(0);
      }e.defineOption("placeholder", "", function (r, o, a) {
        var l = a && a != e.Init;if (o && !l) r.on("blur", n), r.on("change", i), r.on("swapDoc", i), i(r);else if (!o && l) {
          r.off("blur", n), r.off("change", i), r.off("swapDoc", i), t(r);var s = r.getWrapperElement();s.className = s.className.replace(" CodeMirror-empty", "");
        }o && !r.hasFocus() && n(r);
      });
    });
  }, bWRU: function bWRU(e, t, r) {
    !function (e) {
      e(r("8U58"), r("f6fj"), r("jz+E"));
    }(function (e) {
      "use strict";

      var t = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;e.defineMode("gfm", function (r, n) {
        function i(e) {
          return e.code = !1, null;
        }var o = 0,
            a = { startState: function startState() {
            return { code: !1, codeBlock: !1, ateSpace: !1 };
          }, copyState: function copyState(e) {
            return { code: e.code, codeBlock: e.codeBlock, ateSpace: e.ateSpace };
          }, token: function token(e, r) {
            if (r.combineTokens = null, r.codeBlock) return e.match(/^```+/) ? (r.codeBlock = !1, null) : (e.skipToEnd(), null);if (e.sol() && (r.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), r.codeBlock = !0, null;if ("`" === e.peek()) {
              e.next();var i = e.pos;e.eatWhile("`");var a = 1 + e.pos - i;return r.code ? a === o && (r.code = !1) : (o = a, r.code = !0), null;
            }if (r.code) return e.next(), null;if (e.eatSpace()) return r.ateSpace = !0, null;if ((e.sol() || r.ateSpace) && (r.ateSpace = !1, !1 !== n.gitHubSpice)) {
              if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) return r.combineTokens = !0, "link";if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return r.combineTokens = !0, "link";
            }return e.match(t) && "](" != e.string.slice(e.start - 2, e.start) && (0 == e.start || /\W/.test(e.string.charAt(e.start - 1))) ? (r.combineTokens = !0, "link") : (e.next(), null);
          }, blankLine: i },
            l = { taskLists: !0, fencedCodeBlocks: "```", strikethrough: !0 };for (var s in n) {
          l[s] = n[s];
        }return l.name = "markdown", e.overlayMode(e.getMode(r, l), a);
      }, "markdown"), e.defineMIME("text/x-gfm", "gfm");
    });
  }, ezqs: function ezqs(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";

      var t = { autoSelfClosers: { area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, frame: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0, menuitem: !0 }, implicitlyClosed: { dd: !0, li: !0, optgroup: !0, option: !0, p: !0, rp: !0, rt: !0, tbody: !0, td: !0, tfoot: !0, th: !0, tr: !0 }, contextGrabbers: { dd: { dd: !0, dt: !0 }, dt: { dd: !0, dt: !0 }, li: { li: !0 }, option: { option: !0, optgroup: !0 }, optgroup: { optgroup: !0 }, p: { address: !0, article: !0, aside: !0, blockquote: !0, dir: !0, div: !0, dl: !0, fieldset: !0, footer: !0, form: !0, h1: !0, h2: !0, h3: !0, h4: !0, h5: !0, h6: !0, header: !0, hgroup: !0, hr: !0, menu: !0, nav: !0, ol: !0, p: !0, pre: !0, section: !0, table: !0, ul: !0 }, rp: { rp: !0, rt: !0 }, rt: { rp: !0, rt: !0 }, tbody: { tbody: !0, tfoot: !0 }, td: { td: !0, th: !0 }, tfoot: { tbody: !0 }, th: { td: !0, th: !0 }, thead: { tbody: !0, tfoot: !0 }, tr: { tr: !0 } }, doNotIndent: { pre: !0 }, allowUnquoted: !0, allowMissing: !0, caseFold: !0 },
          r = { autoSelfClosers: {}, implicitlyClosed: {}, contextGrabbers: {}, doNotIndent: {}, allowUnquoted: !1, allowMissing: !1, caseFold: !1 };e.defineMode("xml", function (n, i) {
        function o(e, t) {
          function r(r) {
            return t.tokenize = r, r(e, t);
          }var n = e.next();if ("<" == n) return e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? r(s("atom", "]]>")) : null : e.match("--") ? r(s("comment", "--\x3e")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), r(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = s("meta", "?>"), "meta") : (L = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket");if ("&" == n) {
            var i;return i = e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";"), i ? "atom" : "error";
          }return e.eatWhile(/[^&<]/), null;
        }function a(e, t) {
          var r = e.next();if (">" == r || "/" == r && e.eat(">")) return t.tokenize = o, L = ">" == r ? "endTag" : "selfcloseTag", "tag bracket";if ("=" == r) return L = "equals", null;if ("<" == r) {
            t.tokenize = o, t.state = h, t.tagName = t.tagStart = null;var n = t.tokenize(e, t);return n ? n + " tag error" : "tag error";
          }return (/[\'\"]/.test(r) ? (t.tokenize = l(r), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
          );
        }function l(e) {
          var t = function t(_t2, r) {
            for (; !_t2.eol();) {
              if (_t2.next() == e) {
                r.tokenize = a;break;
              }
            }return "string";
          };return t.isInAttribute = !0, t;
        }function s(e, t) {
          return function (r, n) {
            for (; !r.eol();) {
              if (r.match(t)) {
                n.tokenize = o;break;
              }r.next();
            }return e;
          };
        }function c(e) {
          return function (t, r) {
            for (var n; null != (n = t.next());) {
              if ("<" == n) return r.tokenize = c(e + 1), r.tokenize(t, r);if (">" == n) {
                if (1 == e) {
                  r.tokenize = o;break;
                }return r.tokenize = c(e - 1), r.tokenize(t, r);
              }
            }return "meta";
          };
        }function u(e, t, r) {
          this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = r, (C.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0);
        }function d(e) {
          e.context && (e.context = e.context.prev);
        }function f(e, t) {
          for (var r;;) {
            if (!e.context) return;if (r = e.context.tagName, !C.contextGrabbers.hasOwnProperty(r) || !C.contextGrabbers[r].hasOwnProperty(t)) return;d(e);
          }
        }function h(e, t, r) {
          return "openTag" == e ? (r.tagStart = t.column(), p) : "closeTag" == e ? m : h;
        }function p(e, t, r) {
          return "word" == e ? (r.tagName = t.current(), T = "tag", y) : (T = "error", p);
        }function m(e, t, r) {
          if ("word" == e) {
            var n = t.current();return r.context && r.context.tagName != n && C.implicitlyClosed.hasOwnProperty(r.context.tagName) && d(r), r.context && r.context.tagName == n || !1 === C.matchClosing ? (T = "tag", g) : (T = "tag error", v);
          }return T = "error", v;
        }function g(e, t, r) {
          return "endTag" != e ? (T = "error", g) : (d(r), h);
        }function v(e, t, r) {
          return T = "error", g(e, t, r);
        }function y(e, t, r) {
          if ("word" == e) return T = "attribute", x;if ("endTag" == e || "selfcloseTag" == e) {
            var n = r.tagName,
                i = r.tagStart;return r.tagName = r.tagStart = null, "selfcloseTag" == e || C.autoSelfClosers.hasOwnProperty(n) ? f(r, n) : (f(r, n), r.context = new u(r, n, i == r.indented)), h;
          }return T = "error", y;
        }function x(e, t, r) {
          return "equals" == e ? b : (C.allowMissing || (T = "error"), y(e, t, r));
        }function b(e, t, r) {
          return "string" == e ? w : "word" == e && C.allowUnquoted ? (T = "string", y) : (T = "error", y(e, t, r));
        }function w(e, t, r) {
          return "string" == e ? w : y(e, t, r);
        }var k = n.indentUnit,
            C = {},
            S = i.htmlMode ? t : r;for (var M in S) {
          C[M] = S[M];
        }for (var M in i) {
          C[M] = i[M];
        }var L, T;return o.isInText = !0, { startState: function startState(e) {
            var t = { tokenize: o, state: h, indented: e || 0, tagName: null, tagStart: null, context: null };return null != e && (t.baseIndent = e), t;
          }, token: function token(e, t) {
            if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;L = null;var r = t.tokenize(e, t);return (r || L) && "comment" != r && (T = null, t.state = t.state(L || r, e, t), T && (r = "error" == T ? r + " error" : T)), r;
          }, indent: function indent(t, r, n) {
            var i = t.context;if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + k;if (i && i.noIndent) return e.Pass;if (t.tokenize != a && t.tokenize != o) return n ? n.match(/^(\s*)/)[0].length : 0;if (t.tagName) return !1 !== C.multilineTagIndentPastTag ? t.tagStart + t.tagName.length + 2 : t.tagStart + k * (C.multilineTagIndentFactor || 1);if (C.alignCDATA && /<!\[CDATA\[/.test(r)) return 0;var l = r && /^<(\/)?([\w_:\.-]*)/.exec(r);if (l && l[1]) for (; i;) {
              if (i.tagName == l[2]) {
                i = i.prev;break;
              }if (!C.implicitlyClosed.hasOwnProperty(i.tagName)) break;i = i.prev;
            } else if (l) for (; i;) {
              var s = C.contextGrabbers[i.tagName];if (!s || !s.hasOwnProperty(l[2])) break;i = i.prev;
            }for (; i && i.prev && !i.startOfLine;) {
              i = i.prev;
            }return i ? i.indent + k : t.baseIndent || 0;
          }, electricInput: /<\/[\s\w:]+>$/, blockCommentStart: "\x3c!--", blockCommentEnd: "--\x3e", configuration: C.htmlMode ? "html" : "xml", helperType: C.htmlMode ? "html" : "xml", skipAttribute: function skipAttribute(e) {
            e.state == b && (e.state = y);
          } };
      }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", { name: "xml", htmlMode: !0 });
    });
  }, f6fj: function f6fj(e, t, r) {
    !function (e) {
      e(r("8U58"), r("ezqs"), r("+fCR"));
    }(function (e) {
      "use strict";

      e.defineMode("markdown", function (t, r) {
        function n(r) {
          if (e.findModeByName) {
            var n = e.findModeByName(r);n && (r = n.mime || n.mimes[0]);
          }var i = e.getMode(t, r);return "null" == i.name ? null : i;
        }function i(e, t, r) {
          return t.f = t.inline = r, r(e, t);
        }function o(e, t, r) {
          return t.f = t.block = r, r(e, t);
        }function a(e) {
          return !e || !/\S/.test(e.string);
        }function l(e) {
          return e.linkTitle = !1, e.em = !1, e.strong = !1, e.strikethrough = !1, e.quote = 0, e.indentedCode = !1, e.f == c && (e.f = h, e.block = s), e.trailingSpace = 0, e.trailingSpaceNewLine = !1, e.prevLine = e.thisLine, e.thisLine = null, null;
        }function s(t, o) {
          var l = t.sol(),
              s = !1 !== o.list,
              c = o.indentedCode;o.indentedCode = !1, s && (o.indentationDiff >= 0 ? (o.indentationDiff < 4 && (o.indentation -= o.indentationDiff), o.list = null) : o.indentation > 0 ? o.list = null : o.list = !1);var f = null;if (o.indentationDiff >= 4) return t.skipToEnd(), c || a(o.prevLine) ? (o.indentation -= 4, o.indentedCode = !0, k.code) : null;if (t.eatSpace()) return null;if ((f = t.match(T)) && f[1].length <= 6) return o.header = f[1].length, r.highlightFormatting && (o.formatting = "header"), o.f = o.inline, d(o);if (!(a(o.prevLine) || o.quote || s || c) && (f = t.match(N))) return o.header = "=" == f[0].charAt(0) ? 1 : 2, r.highlightFormatting && (o.formatting = "header"), o.f = o.inline, d(o);if (t.eat(">")) return o.quote = l ? 1 : o.quote + 1, r.highlightFormatting && (o.formatting = "quote"), t.eatSpace(), d(o);if ("[" === t.peek()) return i(t, o, v);if (t.match(S, !0)) return o.hr = !0, k.hr;if (f = t.match(M)) {
            var h = f[1] ? "ol" : "ul";for (o.indentation = t.column() + t.current().length, o.list = !0; o.listStack && t.column() < o.listStack[o.listStack.length - 1];) {
              o.listStack.pop();
            }return o.listStack.push(o.indentation), r.taskLists && t.match(L, !1) && (o.taskList = !0), o.f = o.inline, r.highlightFormatting && (o.formatting = ["list", "list-" + h]), d(o);
          }return r.fencedCodeBlocks && (f = t.match(E, !0)) ? (o.fencedChars = f[1], o.localMode = n(f[2]), o.localMode && (o.localState = e.startState(o.localMode)), o.f = o.block = u, r.highlightFormatting && (o.formatting = "code-block"), o.code = -1, d(o)) : i(t, o, o.inline);
        }function c(t, r) {
          var n = b.token(t, r.htmlState);if (!w) {
            var i = e.innerMode(b, r.htmlState);("xml" == i.mode.name && null === i.state.tagStart && !i.state.context && i.state.tokenize.isInText || r.md_inside && t.current().indexOf(">") > -1) && (r.f = h, r.block = s, r.htmlState = null);
          }return n;
        }function u(e, t) {
          if (t.fencedChars && e.match(t.fencedChars)) {
            r.highlightFormatting && (t.formatting = "code-block");var n = d(t);return t.localMode = t.localState = null, t.block = s, t.f = h, t.fencedChars = null, t.code = 0, n;
          }return t.fencedChars && e.skipTo(t.fencedChars) ? "comment" : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), k.code);
        }function d(e) {
          var t = [];if (e.formatting) {
            t.push(k.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);for (var n = 0; n < e.formatting.length; n++) {
              t.push(k.formatting + "-" + e.formatting[n]), "header" === e.formatting[n] && t.push(k.formatting + "-" + e.formatting[n] + "-" + e.header), "quote" === e.formatting[n] && (!r.maxBlockquoteDepth || r.maxBlockquoteDepth >= e.quote ? t.push(k.formatting + "-" + e.formatting[n] + "-" + e.quote) : t.push("error"));
            }
          }if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;if (e.linkHref ? t.push(k.linkHref, "url") : (e.strong && t.push(k.strong), e.em && t.push(k.em), e.strikethrough && t.push(k.strikethrough), e.linkText && t.push(k.linkText), e.code && t.push(k.code), e.image && t.push(k.image), e.imageAltText && t.push(k.imageAltText, "link"), e.imageMarker && t.push(k.imageMarker)), e.header && t.push(k.header, k.header + "-" + e.header), e.quote && (t.push(k.quote), !r.maxBlockquoteDepth || r.maxBlockquoteDepth >= e.quote ? t.push(k.quote + "-" + e.quote) : t.push(k.quote + "-" + r.maxBlockquoteDepth)), !1 !== e.list) {
            var i = (e.listStack.length - 1) % 3;i ? 1 === i ? t.push(k.list2) : t.push(k.list3) : t.push(k.list1);
          }return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null;
        }function f(e, t) {
          if (e.match(A, !0)) return d(t);
        }function h(t, n) {
          var i = n.text(t, n);if (void 0 !== i) return i;if (n.list) return n.list = null, d(n);if (n.taskList) {
            return "x" !== t.match(L, !0)[1] ? n.taskOpen = !0 : n.taskClosed = !0, r.highlightFormatting && (n.formatting = "task"), n.taskList = !1, d(n);
          }if (n.taskOpen = !1, n.taskClosed = !1, n.header && t.match(/^#+$/, !0)) return r.highlightFormatting && (n.formatting = "header"), d(n);var a = t.next();if (n.linkTitle) {
            n.linkTitle = !1;var l = a;"(" === a && (l = ")"), l = (l + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1");var s = "^\\s*(?:[^" + l + "\\\\]+|\\\\\\\\|\\\\.)" + l;if (t.match(new RegExp(s), !0)) return k.linkHref;
          }if ("`" === a) {
            var u = n.formatting;r.highlightFormatting && (n.formatting = "code"), t.eatWhile("`");var f = t.current().length;if (0 == n.code) return n.code = f, d(n);if (f == n.code) {
              var g = d(n);return n.code = 0, g;
            }return n.formatting = u, d(n);
          }if (n.code) return d(n);if ("\\" === a && (t.next(), r.highlightFormatting)) {
            var v = d(n),
                y = k.formatting + "-escape";return v ? v + " " + y : y;
          }if ("!" === a && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return n.imageMarker = !0, n.image = !0, r.highlightFormatting && (n.formatting = "image"), d(n);if ("[" === a && n.imageMarker && t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return n.imageMarker = !1, n.imageAltText = !0, r.highlightFormatting && (n.formatting = "image"), d(n);if ("]" === a && n.imageAltText) {
            r.highlightFormatting && (n.formatting = "image");var v = d(n);return n.imageAltText = !1, n.image = !1, n.inline = n.f = m, v;
          }if ("[" === a && !n.image) return n.linkText = !0, r.highlightFormatting && (n.formatting = "link"), d(n);if ("]" === a && n.linkText) {
            r.highlightFormatting && (n.formatting = "link");var v = d(n);return n.linkText = !1, n.inline = n.f = t.match(/\(.*?\)| ?\[.*?\]/, !1) ? m : h, v;
          }if ("<" === a && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
            n.f = n.inline = p, r.highlightFormatting && (n.formatting = "link");var v = d(n);return v ? v += " " : v = "", v + k.linkInline;
          }if ("<" === a && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
            n.f = n.inline = p, r.highlightFormatting && (n.formatting = "link");var v = d(n);return v ? v += " " : v = "", v + k.linkEmail;
          }if ("<" === a && t.match(/^(!--|[a-z]+(?:\s+[a-z_:.\-]+(?:\s*=\s*[^ >]+)?)*\s*>)/i, !1)) {
            var x = t.string.indexOf(">", t.pos);if (-1 != x) {
              /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(t.string.substring(t.start, x)) && (n.md_inside = !0);
            }return t.backUp(1), n.htmlState = e.startState(b), o(t, n, c);
          }if ("<" === a && t.match(/^\/\w*?>/)) return n.md_inside = !1, "tag";if ("*" === a || "_" === a) {
            for (var w = 1, C = 1 == t.pos ? " " : t.string.charAt(t.pos - 2); w < 3 && t.eat(a);) {
              w++;
            }var S = t.peek() || " ",
                M = !/\s/.test(S) && (!O.test(S) || /\s/.test(C) || O.test(C)),
                T = !/\s/.test(C) && (!O.test(C) || /\s/.test(S) || O.test(S)),
                N = null,
                A = null;if (w % 2 && (n.em || !M || "*" !== a && T && !O.test(C) ? n.em != a || !T || "*" !== a && M && !O.test(S) || (N = !1) : N = !0), w > 1 && (n.strong || !M || "*" !== a && T && !O.test(C) ? n.strong != a || !T || "*" !== a && M && !O.test(S) || (A = !1) : A = !0), null != A || null != N) {
              r.highlightFormatting && (n.formatting = null == N ? "strong" : null == A ? "em" : "strong em"), !0 === N && (n.em = a), !0 === A && (n.strong = a);var g = d(n);return !1 === N && (n.em = !1), !1 === A && (n.strong = !1), g;
            }
          } else if (" " === a && (t.eat("*") || t.eat("_"))) {
            if (" " === t.peek()) return d(n);t.backUp(1);
          }if (r.strikethrough) if ("~" === a && t.eatWhile(a)) {
            if (n.strikethrough) {
              r.highlightFormatting && (n.formatting = "strikethrough");var g = d(n);return n.strikethrough = !1, g;
            }if (t.match(/^[^\s]/, !1)) return n.strikethrough = !0, r.highlightFormatting && (n.formatting = "strikethrough"), d(n);
          } else if (" " === a && t.match(/^~~/, !0)) {
            if (" " === t.peek()) return d(n);t.backUp(2);
          }return " " === a && (t.match(/ +$/, !1) ? n.trailingSpace++ : n.trailingSpace && (n.trailingSpaceNewLine = !0)), d(n);
        }function p(e, t) {
          if (">" === e.next()) {
            t.f = t.inline = h, r.highlightFormatting && (t.formatting = "link");var n = d(t);return n ? n += " " : n = "", n + k.linkInline;
          }return e.match(/^[^>]+/, !0), k.linkInline;
        }function m(e, t) {
          if (e.eatSpace()) return null;var n = e.next();return "(" === n || "[" === n ? (t.f = t.inline = g("(" === n ? ")" : "]"), r.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, d(t)) : "error";
        }function g(e) {
          return function (t, n) {
            if (t.next() === e) {
              n.f = n.inline = h, r.highlightFormatting && (n.formatting = "link-string");var i = d(n);return n.linkHref = !1, i;
            }return t.match(I[e]), n.linkHref = !0, d(n);
          };
        }function v(e, t) {
          return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = y, e.next(), r.highlightFormatting && (t.formatting = "link"), t.linkText = !0, d(t)) : i(e, t, h);
        }function y(e, t) {
          if (e.match(/^\]:/, !0)) {
            t.f = t.inline = x, r.highlightFormatting && (t.formatting = "link");var n = d(t);return t.linkText = !1, n;
          }return e.match(/^([^\]\\]|\\.)+/, !0), k.linkText;
        }function x(e, t) {
          return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = h, k.linkHref + " url");
        }var b = e.getMode(t, "text/html"),
            w = "null" == b.name;void 0 === r.highlightFormatting && (r.highlightFormatting = !1), void 0 === r.maxBlockquoteDepth && (r.maxBlockquoteDepth = 0), void 0 === r.taskLists && (r.taskLists = !1), void 0 === r.strikethrough && (r.strikethrough = !1), void 0 === r.tokenTypeOverrides && (r.tokenTypeOverrides = {});var k = { header: "header", code: "comment", quote: "quote", list1: "variable-2", list2: "variable-3", list3: "keyword", hr: "hr", image: "image", imageAltText: "image-alt-text", imageMarker: "image-marker", formatting: "formatting", linkInline: "link", linkEmail: "link", linkText: "link", linkHref: "string", em: "em", strong: "strong", strikethrough: "strikethrough" };for (var C in k) {
          k.hasOwnProperty(C) && r.tokenTypeOverrides[C] && (k[C] = r.tokenTypeOverrides[C]);
        }var S = /^([*\-_])(?:\s*\1){2,}\s*$/,
            M = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
            L = /^\[(x| )\](?=\s)/,
            T = r.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
            N = /^ *(?:\={1,}|-{1,})\s*$/,
            A = /^[^#!\[\]*_\\<>` "'(~]+/,
            E = new RegExp("^(" + (!0 === r.fencedCodeBlocks ? "~~~+|```+" : r.fencedCodeBlocks) + ")[ \\t]*([\\w+#-]*)"),
            O = /[!\"#$%&\'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~—]/,
            I = { ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/, "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/ },
            R = { startState: function startState() {
            return { f: s, prevLine: null, thisLine: null, block: s, htmlState: null, indentation: 0, inline: h, text: f, formatting: !1, linkText: !1, linkHref: !1, linkTitle: !1, code: 0, em: !1, strong: !1, header: 0, hr: !1, taskList: !1, list: !1, listStack: [], quote: 0, trailingSpace: 0, trailingSpaceNewLine: !1, strikethrough: !1, fencedChars: null };
          }, copyState: function copyState(t) {
            return { f: t.f, prevLine: t.prevLine, thisLine: t.thisLine, block: t.block, htmlState: t.htmlState && e.copyState(b, t.htmlState), indentation: t.indentation, localMode: t.localMode, localState: t.localMode ? e.copyState(t.localMode, t.localState) : null, inline: t.inline, text: t.text, formatting: !1, linkText: t.linkText, linkTitle: t.linkTitle, code: t.code, em: t.em, strong: t.strong, strikethrough: t.strikethrough, header: t.header, hr: t.hr, taskList: t.taskList, list: t.list, listStack: t.listStack.slice(0), quote: t.quote, indentedCode: t.indentedCode, trailingSpace: t.trailingSpace, trailingSpaceNewLine: t.trailingSpaceNewLine, md_inside: t.md_inside, fencedChars: t.fencedChars };
          }, token: function token(e, t) {
            if (t.formatting = !1, e != t.thisLine) {
              var r = t.header || t.hr;if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0) || r) {
                if (l(t), !r) return null;t.prevLine = null;
              }t.prevLine = t.thisLine, t.thisLine = e, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.f = t.block;var n = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;if (t.indentationDiff = Math.min(n - t.indentation, 4), t.indentation = t.indentation + t.indentationDiff, n > 0) return null;
            }return t.f(e, t);
          }, innerMode: function innerMode(e) {
            return e.block == c ? { state: e.htmlState, mode: b } : e.localState ? { state: e.localState, mode: e.localMode } : { state: e, mode: R };
          }, blankLine: l, getType: d, closeBrackets: "()[]{}''\"\"``", fold: "markdown" };return R;
      }, "xml"), e.defineMIME("text/x-markdown", "markdown");
    });
  }, gQQn: function gQQn(e, t, r) {
    "use strict";

    var n = r("xUBe"),
        i = (r.n(n), r("5x2J")),
        o = r.n(i);t.a = { name: "simplemde-md", props: { value: String, id: { type: String, default: "markdown-editor" }, autofocus: { type: Boolean, default: !1 }, placeholder: { type: String, default: "" }, height: { type: Number, default: 150 }, zIndex: { type: Number, default: 10 }, toolbar: { type: Array } }, data: function data() {
        return { simplemde: null, hasChange: !1 };
      }, watch: { value: function value(e) {
          (e !== this.simplemde.value() || this.hasChange) && this.simplemde.value(e);
        } }, mounted: function mounted() {
        var e = this;this.simplemde = new o.a({ element: document.getElementById(this.id), autofocus: this.autofocus, toolbar: this.toolbar, spellChecker: !1, insertTexts: { link: ["[", "]( )"] }, placeholder: this.placeholder }), this.value && this.simplemde.value(this.value), this.simplemde.codemirror.on("change", function () {
          e.hasChange && (e.hasChange = !0), e.$emit("input", e.simplemde.value());
        });
      }, destroyed: function destroyed() {
        this.simplemde = null;
      } };
  }, h6VQ: function h6VQ(e, t, r) {
    "use strict";

    function n(e) {
      if (e = e || {}, "function" != typeof e.codeMirrorInstance || "function" != typeof e.codeMirrorInstance.defineMode) return void console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`");String.prototype.includes || (String.prototype.includes = function () {
        return -1 !== String.prototype.indexOf.apply(this, arguments);
      }), e.codeMirrorInstance.defineMode("spell-checker", function (t) {
        if (!n.aff_loading) {
          n.aff_loading = !0;var r = new XMLHttpRequest();r.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff", !0), r.onload = function () {
            4 === r.readyState && 200 === r.status && (n.aff_data = r.responseText, 2 == ++n.num_loaded && (n.typo = new i("en_US", n.aff_data, n.dic_data, { platform: "any" })));
          }, r.send(null);
        }if (!n.dic_loading) {
          n.dic_loading = !0;var o = new XMLHttpRequest();o.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic", !0), o.onload = function () {
            4 === o.readyState && 200 === o.status && (n.dic_data = o.responseText, 2 == ++n.num_loaded && (n.typo = new i("en_US", n.aff_data, n.dic_data, { platform: "any" })));
          }, o.send(null);
        }var a = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',
            l = { token: function token(e) {
            var t = e.peek(),
                r = "";if (a.includes(t)) return e.next(), null;for (; null != (t = e.peek()) && !a.includes(t);) {
              r += t, e.next();
            }return n.typo && !n.typo.check(r) ? "spell-error" : null;
          } },
            s = e.codeMirrorInstance.getMode(t, t.backdrop || "text/plain");return e.codeMirrorInstance.overlayMode(s, l, !0);
      });
    }var i = r("45G4");n.num_loaded = 0, n.aff_loading = !1, n.dic_loading = !1, n.aff_data = "", n.dic_data = "", n.typo, e.exports = n;
  }, "jz+E": function jzE(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";

      e.overlayMode = function (t, r, n) {
        return { startState: function startState() {
            return { base: e.startState(t), overlay: e.startState(r), basePos: 0, baseCur: null, overlayPos: 0, overlayCur: null, streamSeen: null };
          }, copyState: function copyState(n) {
            return { base: e.copyState(t, n.base), overlay: e.copyState(r, n.overlay), basePos: n.basePos, baseCur: null, overlayPos: n.overlayPos, overlayCur: null };
          }, token: function token(e, i) {
            return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = r.token(e, i.overlay), i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || n && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur;
          }, indent: t.indent && function (e, r) {
            return t.indent(e.base, r);
          }, electricChars: t.electricChars, innerMode: function innerMode(e) {
            return { state: e.base, mode: t };
          }, blankLine: function blankLine(e) {
            var i, o;return t.blankLine && (i = t.blankLine(e.base)), r.blankLine && (o = r.blankLine(e.overlay)), null == o ? i : n && null != i ? i + " " + o : o;
          } };
      };
    });
  }, oiJh: function oiJh(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, '.CodeMirror{color:#000}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink{50%{background-color:transparent}}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-ruler{border-left:1px solid #ccc;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0f0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#f22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:0;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:0 0!important;border:none!important;-webkit-user-select:none;-moz-user-select:none;user-select:none}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:0 0;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:none;font-variant-ligatures:none}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-code{outline:0}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected,.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background:#ffa;background:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:""}span.CodeMirror-selectedtext{background:0 0}.CodeMirror{height:auto;border:1px solid #ddd;border-bottom-left-radius:4px;border-bottom-right-radius:4px;padding:10px;font:inherit;z-index:1}.CodeMirror,.CodeMirror-scroll{min-height:300px}.CodeMirror-fullscreen{background:#fff;position:fixed!important;top:50px;left:0;right:0;bottom:0;height:auto;z-index:9}.CodeMirror-sided{width:50%!important}.editor-toolbar{position:relative;opacity:.6;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;padding:0 10px;border-top:1px solid #bbb;border-left:1px solid #bbb;border-right:1px solid #bbb;border-top-left-radius:4px;border-top-right-radius:4px}.editor-toolbar:after,.editor-toolbar:before{display:block;content:" ";height:1px}.editor-toolbar:before{margin-bottom:8px}.editor-toolbar:after{margin-top:8px}.editor-toolbar:hover,.editor-wrapper input.title:focus,.editor-wrapper input.title:hover{opacity:.8}.editor-toolbar.fullscreen{width:100%;height:50px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;padding-top:10px;padding-bottom:10px;box-sizing:border-box;background:#fff;border:0;position:fixed;top:0;left:0;opacity:1;z-index:9}.editor-toolbar.fullscreen:before{width:20px;height:50px;background:-moz-linear-gradient(left,#fff 0,hsla(0,0%,100%,0) 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0,#fff),color-stop(100%,hsla(0,0%,100%,0)));background:-webkit-linear-gradient(left,#fff,hsla(0,0%,100%,0));background:-o-linear-gradient(left,#fff 0,hsla(0,0%,100%,0) 100%);background:-ms-linear-gradient(left,#fff 0,hsla(0,0%,100%,0) 100%);background:linear-gradient(90deg,#fff 0,hsla(0,0%,100%,0));position:fixed;top:0;left:0;margin:0;padding:0}.editor-toolbar.fullscreen:after{width:20px;height:50px;background:-moz-linear-gradient(left,hsla(0,0%,100%,0) 0,#fff 100%);background:-webkit-gradient(linear,left top,right top,color-stop(0,hsla(0,0%,100%,0)),color-stop(100%,#fff));background:-webkit-linear-gradient(left,hsla(0,0%,100%,0),#fff);background:-o-linear-gradient(left,hsla(0,0%,100%,0) 0,#fff 100%);background:-ms-linear-gradient(left,hsla(0,0%,100%,0) 0,#fff 100%);background:linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff);position:fixed;top:0;right:0;margin:0;padding:0}.editor-toolbar a{display:inline-block;text-align:center;text-decoration:none!important;color:#2c3e50!important;width:30px;height:30px;margin:0;border:1px solid transparent;border-radius:3px;cursor:pointer}.editor-toolbar a.active,.editor-toolbar a:hover{background:#fcfcfc;border-color:#95a5a6}.editor-toolbar a:before{line-height:30px}.editor-toolbar i.separator{display:inline-block;width:0;border-left:1px solid #d9d9d9;border-right:1px solid #fff;color:transparent;text-indent:-10px;margin:0 6px}.editor-toolbar a.fa-header-x:after{font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:65%;vertical-align:text-bottom;position:relative;top:2px}.editor-toolbar a.fa-header-1:after{content:"1"}.editor-toolbar a.fa-header-2:after{content:"2"}.editor-toolbar a.fa-header-3:after{content:"3"}.editor-toolbar a.fa-header-bigger:after{content:"\\25B2"}.editor-toolbar a.fa-header-smaller:after{content:"\\25BC"}.editor-toolbar.disabled-for-preview a:not(.no-disable){pointer-events:none;background:#fff;border-color:transparent;text-shadow:inherit}@media only screen and (max-width:700px){.editor-toolbar a.no-mobile{display:none}}.editor-statusbar{padding:8px 10px;font-size:12px;color:#959694;text-align:right}.editor-statusbar span{display:inline-block;min-width:4em;margin-left:1em}.editor-preview,.editor-preview-side{padding:10px;background:#fafafa;overflow:auto;display:none;box-sizing:border-box}.editor-statusbar .lines:before{content:"lines: "}.editor-statusbar .words:before{content:"words: "}.editor-statusbar .characters:before{content:"characters: "}.editor-preview{position:absolute;width:100%;height:100%;top:0;left:0;z-index:7}.editor-preview-side{position:fixed;bottom:0;width:50%;top:50px;right:0;z-index:9;border:1px solid #ddd}.editor-preview-active,.editor-preview-active-side{display:block}.editor-preview-side>p,.editor-preview>p{margin-top:0}.editor-preview-side pre,.editor-preview pre{background:#eee;margin-bottom:10px}.editor-preview-side table td,.editor-preview-side table th,.editor-preview table td,.editor-preview table th{border:1px solid #ddd;padding:5px}.CodeMirror .CodeMirror-code .cm-tag{color:#63a35c}.CodeMirror .CodeMirror-code .cm-attribute{color:#795da3}.CodeMirror .CodeMirror-code .cm-string{color:#183691}.CodeMirror .CodeMirror-selected{background:#d9d9d9}.CodeMirror .CodeMirror-code .cm-header-1{font-size:200%;line-height:200%}.CodeMirror .CodeMirror-code .cm-header-2{font-size:160%;line-height:160%}.CodeMirror .CodeMirror-code .cm-header-3{font-size:125%;line-height:125%}.CodeMirror .CodeMirror-code .cm-header-4{font-size:110%;line-height:110%}.CodeMirror .CodeMirror-code .cm-comment{background:rgba(0,0,0,.05);border-radius:2px}.CodeMirror .CodeMirror-code .cm-link{color:#7f8c8d}.CodeMirror .CodeMirror-code .cm-url{color:#aab2b3}.CodeMirror .CodeMirror-code .cm-strikethrough{text-decoration:line-through}.CodeMirror .CodeMirror-placeholder{opacity:.5}.CodeMirror .cm-spell-error:not(.cm-url):not(.cm-comment):not(.cm-tag):not(.cm-word){background:rgba(255,0,0,.15)}', ""]);
  }, sOR5: function sOR5(e, t) {
    var r = {}.toString;e.exports = Array.isArray || function (e) {
      return "[object Array]" == r.call(e);
    };
  }, ujcs: function ujcs(e, t) {
    t.read = function (e, t, r, n, i) {
      var o,
          a,
          l = 8 * i - n - 1,
          s = (1 << l) - 1,
          c = s >> 1,
          u = -7,
          d = r ? i - 1 : 0,
          f = r ? -1 : 1,
          h = e[t + d];for (d += f, o = h & (1 << -u) - 1, h >>= -u, u += l; u > 0; o = 256 * o + e[t + d], d += f, u -= 8) {}for (a = o & (1 << -u) - 1, o >>= -u, u += n; u > 0; a = 256 * a + e[t + d], d += f, u -= 8) {}if (0 === o) o = 1 - c;else {
        if (o === s) return a ? NaN : 1 / 0 * (h ? -1 : 1);a += Math.pow(2, n), o -= c;
      }return (h ? -1 : 1) * a * Math.pow(2, o - n);
    }, t.write = function (e, t, r, n, i, o) {
      var a,
          l,
          s,
          c = 8 * o - i - 1,
          u = (1 << c) - 1,
          d = u >> 1,
          f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          h = n ? 0 : o - 1,
          p = n ? 1 : -1,
          m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0, a = u) : (a = Math.floor(Math.log(t) / Math.LN2), t * (s = Math.pow(2, -a)) < 1 && (a--, s *= 2), t += a + d >= 1 ? f / s : f * Math.pow(2, 1 - d), t * s >= 2 && (a++, s /= 2), a + d >= u ? (l = 0, a = u) : a + d >= 1 ? (l = (t * s - 1) * Math.pow(2, i), a += d) : (l = t * Math.pow(2, d - 1) * Math.pow(2, i), a = 0)); i >= 8; e[r + h] = 255 & l, h += p, l /= 256, i -= 8) {}for (a = a << i | l, c += i; c > 0; e[r + h] = 255 & a, h += p, a /= 256, c -= 8) {}e[r + h - p] |= 128 * m;
    };
  }, xUBe: function xUBe(e, t, r) {
    var n = r("oiJh");"string" == typeof n && (n = [[e.i, n, ""]]), n.locals && (e.exports = n.locals);r("rjj0")("04afb7fc", n, !0);
  }, xxKP: function xxKP(e, t, r) {
    t = e.exports = r("FZ+f")(!1), t.push([e.i, ".simplemde-container .CodeMirror,.simplemde-container .CodeMirror-scroll{min-height:150px}.simplemde-container .CodeMirror-code{padding-bottom:40px}.simplemde-container .editor-statusbar{display:none}.simplemde-container .CodeMirror .CodeMirror-code .cm-link{color:#1482f0}.simplemde-container .CodeMirror .CodeMirror-code .cm-string.cm-url{color:#2d3b4d;font-weight:700}.simplemde-container .CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url{padding:0 2px;font-weight:700;color:#e61e1e}", ""]);
  }, zdrL: function zdrL(e, t, r) {
    !function (e) {
      e(r("8U58"));
    }(function (e) {
      "use strict";

      function t(e) {
        var t = e.getWrapperElement();e.state.fullScreenRestore = { scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset, width: t.style.width, height: t.style.height }, t.style.width = "", t.style.height = "auto", t.className += " CodeMirror-fullscreen", document.documentElement.style.overflow = "hidden", e.refresh();
      }function r(e) {
        var t = e.getWrapperElement();t.className = t.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";var r = e.state.fullScreenRestore;t.style.width = r.width, t.style.height = r.height, window.scrollTo(r.scrollLeft, r.scrollTop), e.refresh();
      }e.defineOption("fullScreen", !1, function (n, i, o) {
        o == e.Init && (o = !1), !o != !i && (i ? t(n) : r(n));
      });
    });
  } });
//# sourceMappingURL=3.d90607af8b5977d4ea74.js.map