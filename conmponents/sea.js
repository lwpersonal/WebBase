!function(e, r) {
  function t(e) {
      return function(r) {
          return {}.toString.call(r) == "[object " + e + "]"
      }
  }
  function n() {
      return T++
  }
  function a(e) {
      return e.match(O)[0]
  }
  function i(e) {
      for (e = e.replace(w, "/"),
      e = e.replace(U, "$1/"); e.match(S); )
          e = e.replace(S, "/");
      return e
  }
  function s(e) {
      var r = e.length - 1
        , t = e.charAt(r);
      return "#" === t ? e.substring(0, r) : ".js" === e.substring(r - 2) || e.indexOf("?") > 0 || "/" === t ? e : e + ".js"
  }
  function o(e) {
      var r = b.alias;
      return r && _(r[e]) ? r[e] : e
  }
  function u(e) {
      var r, t = b.paths;
      return t && (r = e.match(C)) && _(t[r[1]]) && (e = t[r[1]] + r[2]),
      e
  }
  function c(e) {
      var r = b.vars;
      return r && e.indexOf("{") > -1 && (e = e.replace(I, function(e, t) {
          return _(r[t]) ? r[t] : e
      })),
      e
  }
  function f(e) {
      var r = b.map
        , t = e;
      if (r)
          for (var n = 0, a = r.length; a > n; n++) {
              var i = r[n];
              if (t = D(i) ? i(e) || e : e.replace(i[0], i[1]),
              t !== e)
                  break
          }
      return t
  }
  function l(e, r) {
      var t, n = e.charAt(0);
      if (G.test(e))
          t = e;
      else if ("." === n)
          t = i((r ? a(r) : b.cwd) + e);
      else if ("/" === n) {
          var s = b.cwd.match(j);
          t = s ? s[0] + e.substring(1) : e
      } else
          t = b.base + e;
      return 0 === t.indexOf("//") && (t = location.protocol + t),
      t
  }
  function v(e, r) {
      if (!e)
          return "";
      e = o(e),
      e = u(e),
      e = c(e),
      e = s(e);
      var t = l(e, r);
      return t = f(t)
  }
  function d(e) {
      return e.hasAttribute ? e.src : e.getAttribute("src", 4)
  }
  function h(e, r, t) {
      var n = L.createElement("script");
      if (t) {
          var a = D(t) ? t(e) : t;
          a && (n.charset = a)
      }
      g(n, r, e),
      n.async = !0,
      n.src = e,
      V = n,
      P ? $.insertBefore(n, P) : $.appendChild(n),
      V = null
  }
  function g(e, r, t) {
      function n() {
          e.onload = e.onerror = e.onreadystatechange = null,
          b.debug || $.removeChild(e),
          e = null,
          r()
      }
      var a = "onload"in e;
      a ? (e.onload = n,
      e.onerror = function() {
          N("error", {
              uri: t,
              node: e
          }),
          n()
      }
      ) : e.onreadystatechange = function() {
          /loaded|complete/.test(e.readyState) && n()
      }
  }
  function p() {
      if (V)
          return V;
      if (H && "interactive" === H.readyState)
          return H;
      for (var e = $.getElementsByTagName("script"), r = e.length - 1; r >= 0; r--) {
          var t = e[r];
          if ("interactive" === t.readyState)
              return H = t
      }
  }
  function E(e) {
      var r = [];
      return e.replace(z, "").replace(M, function(e, t, n) {
          n && r.push(n)
      }),
      r
  }
  function m(e, r) {
      this.uri = e,
      this.dependencies = r || [],
      this.exports = null,
      this.status = 0,
      this._waitings = {},
      this._remain = 0
  }
  if (!e.seajs) {
      var y = e.seajs = {
          version: "2.3.0"
      }
        , b = y.data = {}
        , A = t("Object")
        , _ = t("String")
        , x = Array.isArray || t("Array")
        , D = t("Function")
        , T = 0
        , q = b.events = {};
      y.on = function(e, r) {
          var t = q[e] || (q[e] = []);
          return t.push(r),
          y
      }
      ,
      y.off = function(e, r) {
          if (!e && !r)
              return q = b.events = {},
              y;
          var t = q[e];
          if (t)
              if (r)
                  for (var n = t.length - 1; n >= 0; n--)
                      t[n] === r && t.splice(n, 1);
              else
                  delete q[e];
          return y
      }
      ;
      var N = y.emit = function(e, r) {
          var t = q[e];
          if (t) {
              t = t.slice();
              for (var n = 0, a = t.length; a > n; n++)
                  t[n](r)
          }
          return y
      }
        , O = /[^?#]*\//
        , w = /\/\.\//g
        , S = /\/[^\/]+\/\.\.\//
        , U = /([^:\/])\/+\//g
        , C = /^([^\/:]+)(\/.+)$/
        , I = /{([^{]+)}/g
        , G = /^\/\/.|:\//
        , j = /^.*?\/\/.*?\//
        , L = document
        , X = location.href && 0 !== location.href.indexOf("about:") ? a(location.href) : ""
        , k = L.scripts
        , B = L.getElementById("seajsnode") || k[k.length - 1]
        , F = a(d(B) || X);
      y.resolve = v;
      var V, H, $ = L.head || L.getElementsByTagName("head")[0] || L.documentElement, P = $.getElementsByTagName("base")[0];
      y.request = h;
      var R, M = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, z = /\\\\/g, J = y.cache = {}, K = {}, Q = {}, W = {}, Y = m.STATUS = {
          FETCHING: 1,
          SAVED: 2,
          LOADING: 3,
          LOADED: 4,
          EXECUTING: 5,
          EXECUTED: 6
      };
      m.prototype.resolve = function() {
          for (var e = this, r = e.dependencies, t = [], n = 0, a = r.length; a > n; n++)
              t[n] = m.resolve(r[n], e.uri);
          return t
      }
      ,
      m.prototype.load = function() {
          var e = this;
          if (!(e.status >= Y.LOADING)) {
              e.status = Y.LOADING;
              var t = e.resolve();
              N("load", t);
              for (var n, a = e._remain = t.length, i = 0; a > i; i++)
                  n = m.get(t[i]),
                  n.status < Y.LOADED ? n._waitings[e.uri] = (n._waitings[e.uri] || 0) + 1 : e._remain--;
              if (0 === e._remain)
                  return e.onload(),
                  r;
              var s = {};
              for (i = 0; a > i; i++)
                  n = J[t[i]],
                  n.status < Y.FETCHING ? n.fetch(s) : n.status === Y.SAVED && n.load();
              for (var o in s)
                  s.hasOwnProperty(o) && s[o]()
          }
      }
      ,
      m.prototype.onload = function() {
          var e = this;
          e.status = Y.LOADED,
          e.callback && e.callback();
          var r, t, n = e._waitings;
          for (r in n)
              n.hasOwnProperty(r) && (t = J[r],
              t._remain -= n[r],
              0 === t._remain && t.onload());
          delete e._waitings,
          delete e._remain
      }
      ,
      m.prototype.fetch = function(e) {
          function t() {
              y.request(s.requestUri, s.onRequest, s.charset)
          }
          function n() {
              delete K[o],
              Q[o] = !0,
              R && (m.save(i, R),
              R = null);
              var e, r = W[o];
              for (delete W[o]; e = r.shift(); )
                  e.load()
          }
          var a = this
            , i = a.uri;
          a.status = Y.FETCHING;
          var s = {
              uri: i
          };
          N("fetch", s);
          var o = s.requestUri || i;
          return !o || Q[o] ? (a.load(),
          r) : K[o] ? (W[o].push(a),
          r) : (K[o] = !0,
          W[o] = [a],
          N("request", s = {
              uri: i,
              requestUri: o,
              onRequest: n,
              charset: b.charset
          }),
          s.requested || (e ? e[s.requestUri] = t : t()),
          r)
      }
      ,
      m.prototype.exec = function() {
          function e(r) {
              return m.get(e.resolve(r)).exec()
          }
          var t = this;
          if (t.status >= Y.EXECUTING)
              return t.exports;
          t.status = Y.EXECUTING;
          var a = t.uri;
          e.resolve = function(e) {
              return m.resolve(e, a)
          }
          ,
          e.async = function(r, t) {
              return m.use(r, t, a + "_async_" + n()),
              e
          }
          ;
          var i = t.factory
            , s = D(i) ? i(e, t.exports = {}, t) : i;
          return s === r && (s = t.exports),
          delete t.factory,
          t.exports = s,
          t.status = Y.EXECUTED,
          N("exec", t),
          s
      }
      ,
      m.resolve = function(e, r) {
          var t = {
              id: e,
              refUri: r
          };
          return N("resolve", t),
          t.uri || y.resolve(t.id, r)
      }
      ,
      m.define = function(e, t, n) {
          var a = arguments.length;
          1 === a ? (n = e,
          e = r) : 2 === a && (n = t,
          x(e) ? (t = e,
          e = r) : t = r),
          !x(t) && D(n) && (t = E("" + n));
          var i = {
              id: e,
              uri: m.resolve(e),
              deps: t,
              factory: n
          };
          if (!i.uri && L.attachEvent) {
              var s = p();
              s && (i.uri = s.src)
          }
          N("define", i),
          i.uri ? m.save(i.uri, i) : R = i
      }
      ,
      m.save = function(e, r) {
          var t = m.get(e);
          t.status < Y.SAVED && (t.id = r.id || e,
          t.dependencies = r.deps || [],
          t.factory = r.factory,
          t.status = Y.SAVED,
          N("save", t))
      }
      ,
      m.get = function(e, r) {
          return J[e] || (J[e] = new m(e,r))
      }
      ,
      m.use = function(r, t, n) {
          var a = m.get(n, x(r) ? r : [r]);
          a.callback = function() {
              for (var r = [], n = a.resolve(), i = 0, s = n.length; s > i; i++)
                  r[i] = J[n[i]].exec();
              t && t.apply(e, r),
              delete a.callback
          }
          ,
          a.load()
      }
      ,
      y.use = function(e, r) {
          return m.use(e, r, b.cwd + "_use_" + n()),
          y
      }
      ,
      m.define.cmd = {},
      e.define = m.define,
      y.Module = m,
      b.fetchedList = Q,
      b.cid = n,
      y.require = function(e) {
          var r = m.get(m.resolve(e));
          return r.status < Y.EXECUTING && (r.onload(),
          r.exec()),
          r.exports
      }
      ,
      b.base = F,
      b.dir = F,
      b.cwd = X,
      b.charset = "utf-8",
      y.config = function(e) {
          for (var r in e) {
              var t = e[r]
                , n = b[r];
              if (n && A(n))
                  for (var a in t)
                      n[a] = t[a];
              else
                  x(n) ? t = n.concat(t) : "base" === r && ("/" !== t.slice(-1) && (t += "/"),
                  t = l(t)),
                  b[r] = t
          }
          return N("config", e),
          y
      }
  }
}(this);
