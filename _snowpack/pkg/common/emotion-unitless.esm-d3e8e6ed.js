var e = "-ms-";
var r = "-moz-";
var a = "-webkit-";
var n = "comm";
var c = "rule";
var s = "decl";
var i = "@import";
var h = "@keyframes";
var $ = Math.abs;
var k = String.fromCharCode;
var g = Object.assign;
function m(e2, r2) {
  return C(e2, 0) ^ 45 ? (((r2 << 2 ^ C(e2, 0)) << 2 ^ C(e2, 1)) << 2 ^ C(e2, 2)) << 2 ^ C(e2, 3) : 0;
}
function x(e2) {
  return e2.trim();
}
function y(e2, r2) {
  return (e2 = r2.exec(e2)) ? e2[0] : e2;
}
function j(e2, r2, a2) {
  return e2.replace(r2, a2);
}
function z(e2, r2) {
  return e2.indexOf(r2);
}
function C(e2, r2) {
  return e2.charCodeAt(r2) | 0;
}
function O(e2, r2, a2) {
  return e2.slice(r2, a2);
}
function A(e2) {
  return e2.length;
}
function M(e2) {
  return e2.length;
}
function S(e2, r2) {
  return r2.push(e2), e2;
}
function q(e2, r2) {
  return e2.map(r2).join("");
}
var B = 1;
var D = 1;
var E = 0;
var F = 0;
var G = 0;
var H = "";
function I(e2, r2, a2, n2, c2, s2, t2) {
  return {value: e2, root: r2, parent: a2, type: n2, props: c2, children: s2, line: B, column: D, length: t2, return: ""};
}
function J(e2, r2) {
  return g(I("", null, null, "", null, null, 0), e2, {length: -e2.length}, r2);
}
function K() {
  return G;
}
function L() {
  G = F > 0 ? C(H, --F) : 0;
  if (D--, G === 10)
    D = 1, B--;
  return G;
}
function N() {
  G = F < E ? C(H, F++) : 0;
  if (D++, G === 10)
    D = 1, B++;
  return G;
}
function P() {
  return C(H, F);
}
function Q() {
  return F;
}
function R(e2, r2) {
  return O(H, e2, r2);
}
function T(e2) {
  switch (e2) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function U(e2) {
  return B = D = 1, E = A(H = e2), F = 0, [];
}
function V(e2) {
  return H = "", e2;
}
function W(e2) {
  return x(R(F - 1, ee(e2 === 91 ? e2 + 2 : e2 === 40 ? e2 + 1 : e2)));
}
function Y(e2) {
  while (G = P())
    if (G < 33)
      N();
    else
      break;
  return T(e2) > 2 || T(G) > 3 ? "" : " ";
}
function _(e2, r2) {
  while (--r2 && N())
    if (G < 48 || G > 102 || G > 57 && G < 65 || G > 70 && G < 97)
      break;
  return R(e2, Q() + (r2 < 6 && P() == 32 && N() == 32));
}
function ee(e2) {
  while (N())
    switch (G) {
      case e2:
        return F;
      case 34:
      case 39:
        if (e2 !== 34 && e2 !== 39)
          ee(G);
        break;
      case 40:
        if (e2 === 41)
          ee(e2);
        break;
      case 92:
        N();
        break;
    }
  return F;
}
function re(e2, r2) {
  while (N())
    if (e2 + G === 47 + 10)
      break;
    else if (e2 + G === 42 + 42 && P() === 47)
      break;
  return "/*" + R(r2, F - 1) + "*" + k(e2 === 47 ? e2 : N());
}
function ae(e2) {
  while (!T(P()))
    N();
  return R(e2, F);
}
function ne(e2) {
  return V(ce("", null, null, null, [""], e2 = U(e2), 0, [0], e2));
}
function ce(e2, r2, a2, n2, c2, s2, t2, u2, i2) {
  var f2 = 0;
  var o2 = 0;
  var l2 = t2;
  var v2 = 0;
  var p2 = 0;
  var h2 = 0;
  var b2 = 1;
  var w2 = 1;
  var d2 = 1;
  var $2 = 0;
  var g2 = "";
  var m2 = c2;
  var x2 = s2;
  var y2 = n2;
  var O2 = g2;
  while (w2)
    switch (h2 = $2, $2 = N()) {
      case 40:
        if (h2 != 108 && C(O2, l2 - 1) == 58) {
          if (z(O2 += j(W($2), "&", "&\f"), "&\f") != -1)
            d2 = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        O2 += W($2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        O2 += Y(h2);
        break;
      case 92:
        O2 += _(Q() - 1, 7);
        continue;
      case 47:
        switch (P()) {
          case 42:
          case 47:
            S(te(re(N(), Q()), r2, a2), i2);
            break;
          default:
            O2 += "/";
        }
        break;
      case 123 * b2:
        u2[f2++] = A(O2) * d2;
      case 125 * b2:
      case 59:
      case 0:
        switch ($2) {
          case 0:
          case 125:
            w2 = 0;
          case 59 + o2:
            if (p2 > 0 && A(O2) - l2)
              S(p2 > 32 ? ue(O2 + ";", n2, a2, l2 - 1) : ue(j(O2, " ", "") + ";", n2, a2, l2 - 2), i2);
            break;
          case 59:
            O2 += ";";
          default:
            S(y2 = se(O2, r2, a2, f2, o2, c2, u2, g2, m2 = [], x2 = [], l2), s2);
            if ($2 === 123)
              if (o2 === 0)
                ce(O2, r2, y2, y2, m2, s2, l2, u2, x2);
              else
                switch (v2 === 99 && C(O2, 3) === 110 ? 100 : v2) {
                  case 100:
                  case 109:
                  case 115:
                    ce(e2, y2, y2, n2 && S(se(e2, y2, y2, 0, 0, c2, u2, g2, c2, m2 = [], l2), x2), c2, x2, l2, u2, n2 ? m2 : x2);
                    break;
                  default:
                    ce(O2, y2, y2, y2, [""], x2, 0, u2, x2);
                }
        }
        f2 = o2 = p2 = 0, b2 = d2 = 1, g2 = O2 = "", l2 = t2;
        break;
      case 58:
        l2 = 1 + A(O2), p2 = h2;
      default:
        if (b2 < 1) {
          if ($2 == 123)
            --b2;
          else if ($2 == 125 && b2++ == 0 && L() == 125)
            continue;
        }
        switch (O2 += k($2), $2 * b2) {
          case 38:
            d2 = o2 > 0 ? 1 : (O2 += "\f", -1);
            break;
          case 44:
            u2[f2++] = (A(O2) - 1) * d2, d2 = 1;
            break;
          case 64:
            if (P() === 45)
              O2 += W(N());
            v2 = P(), o2 = l2 = A(g2 = O2 += ae(Q())), $2++;
            break;
          case 45:
            if (h2 === 45 && A(O2) == 2)
              b2 = 0;
        }
    }
  return s2;
}
function se(e2, r2, a2, n2, s2, t2, u2, i2, f2, o2, l2) {
  var v2 = s2 - 1;
  var p2 = s2 === 0 ? t2 : [""];
  var h2 = M(p2);
  for (var b2 = 0, w2 = 0, d2 = 0; b2 < n2; ++b2)
    for (var k2 = 0, g2 = O(e2, v2 + 1, v2 = $(w2 = u2[b2])), m2 = e2; k2 < h2; ++k2)
      if (m2 = x(w2 > 0 ? p2[k2] + " " + g2 : j(g2, /&\f/g, p2[k2])))
        f2[d2++] = m2;
  return I(e2, r2, a2, s2 === 0 ? c : i2, f2, o2, l2);
}
function te(e2, r2, a2) {
  return I(e2, r2, a2, n, k(K()), O(e2, 2, -2), 0);
}
function ue(e2, r2, a2, n2) {
  return I(e2, r2, a2, s, O(e2, 0, n2), O(e2, n2 + 1, -1), n2);
}
function ie(n2, c2, s2) {
  switch (m(n2, c2)) {
    case 5103:
      return a + "print-" + n2 + n2;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a + n2 + n2;
    case 4789:
      return r + n2 + n2;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a + n2 + r + n2 + e + n2 + n2;
    case 5936:
      switch (C(n2, c2 + 11)) {
        case 114:
          return a + n2 + e + j(n2, /[svh]\w+-[tblr]{2}/, "tb") + n2;
        case 108:
          return a + n2 + e + j(n2, /[svh]\w+-[tblr]{2}/, "tb-rl") + n2;
        case 45:
          return a + n2 + e + j(n2, /[svh]\w+-[tblr]{2}/, "lr") + n2;
      }
    case 6828:
    case 4268:
    case 2903:
      return a + n2 + e + n2 + n2;
    case 6165:
      return a + n2 + e + "flex-" + n2 + n2;
    case 5187:
      return a + n2 + j(n2, /(\w+).+(:[^]+)/, a + "box-$1$2" + e + "flex-$1$2") + n2;
    case 5443:
      return a + n2 + e + "flex-item-" + j(n2, /flex-|-self/g, "") + (!y(n2, /flex-|baseline/) ? e + "grid-row-" + j(n2, /flex-|-self/g, "") : "") + n2;
    case 4675:
      return a + n2 + e + "flex-line-pack" + j(n2, /align-content|flex-|-self/g, "") + n2;
    case 5548:
      return a + n2 + e + j(n2, "shrink", "negative") + n2;
    case 5292:
      return a + n2 + e + j(n2, "basis", "preferred-size") + n2;
    case 6060:
      return a + "box-" + j(n2, "-grow", "") + a + n2 + e + j(n2, "grow", "positive") + n2;
    case 4554:
      return a + j(n2, /([^-])(transform)/g, "$1" + a + "$2") + n2;
    case 6187:
      return j(j(j(n2, /(zoom-|grab)/, a + "$1"), /(image-set)/, a + "$1"), n2, "") + n2;
    case 5495:
    case 3959:
      return j(n2, /(image-set\([^]*)/, a + "$1$`$1");
    case 4968:
      return j(j(n2, /(.+:)(flex-)?(.*)/, a + "box-pack:$3" + e + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a + n2 + n2;
    case 4200:
      if (!y(n2, /flex-|baseline/))
        return e + "grid-column-align" + O(n2, c2) + n2;
      break;
    case 2592:
    case 3360:
      return e + j(n2, "template-", "") + n2;
    case 4384:
    case 3616:
      if (s2 && s2.some(function(e2, r2) {
        return c2 = r2, y(e2.props, /grid-\w+-end/);
      })) {
        return ~z(n2 + (s2 = s2[c2].value), "span") ? n2 : e + j(n2, "-start", "") + n2 + e + "grid-row-span:" + (~z(s2, "span") ? y(s2, /\d+/) : +y(s2, /\d+/) - +y(n2, /\d+/)) + ";";
      }
      return e + j(n2, "-start", "") + n2;
    case 4896:
    case 4128:
      return s2 && s2.some(function(e2) {
        return y(e2.props, /grid-\w+-start/);
      }) ? n2 : e + j(j(n2, "-end", "-span"), "span ", "") + n2;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return j(n2, /(.+)-inline(.+)/, a + "$1$2") + n2;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (A(n2) - 1 - c2 > 6)
        switch (C(n2, c2 + 1)) {
          case 109:
            if (C(n2, c2 + 4) !== 45)
              break;
          case 102:
            return j(n2, /(.+:)(.+)-([^]+)/, "$1" + a + "$2-$3$1" + r + (C(n2, c2 + 3) == 108 ? "$3" : "$2-$3")) + n2;
          case 115:
            return ~z(n2, "stretch") ? ie(j(n2, "stretch", "fill-available"), c2, s2) + n2 : n2;
        }
      break;
    case 5152:
    case 5920:
      return j(n2, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r2, a2, c3, s3, t2, u2, i2) {
        return e + a2 + ":" + c3 + i2 + (s3 ? e + a2 + "-span:" + (t2 ? u2 : +u2 - +c3) + i2 : "") + n2;
      });
    case 4949:
      if (C(n2, c2 + 6) === 121)
        return j(n2, ":", ":" + a) + n2;
      break;
    case 6444:
      switch (C(n2, C(n2, 14) === 45 ? 18 : 11)) {
        case 120:
          return j(n2, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + a + (C(n2, 14) === 45 ? "inline-" : "") + "box$3$1" + a + "$2$3$1" + e + "$2box$3") + n2;
        case 100:
          return j(n2, ":", ":" + e) + n2;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return j(n2, "scroll-", "scroll-snap-") + n2;
  }
  return n2;
}
function fe(e2, r2) {
  var a2 = "";
  var n2 = M(e2);
  for (var c2 = 0; c2 < n2; c2++)
    a2 += r2(e2[c2], c2, e2, r2) || "";
  return a2;
}
function oe(e2, r2, a2, t2) {
  switch (e2.type) {
    case i:
    case s:
      return e2.return = e2.return || e2.value;
    case n:
      return "";
    case h:
      return e2.return = e2.value + "{" + fe(e2.children, t2) + "}";
    case c:
      e2.value = e2.props.join(",");
  }
  return A(a2 = fe(e2.children, t2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
}
function le(e2) {
  var r2 = M(e2);
  return function(a2, n2, c2, s2) {
    var t2 = "";
    for (var u2 = 0; u2 < r2; u2++)
      t2 += e2[u2](a2, n2, c2, s2) || "";
    return t2;
  };
}
function ve(e2) {
  return function(r2) {
    if (!r2.root) {
      if (r2 = r2.return)
        e2(r2);
    }
  };
}
function pe(n2, t2, u2, i2) {
  if (n2.length > -1) {
    if (!n2.return)
      switch (n2.type) {
        case s:
          n2.return = ie(n2.value, n2.length, u2);
          return;
        case h:
          return fe([J(n2, {value: j(n2.value, "@", "@" + a)})], i2);
        case c:
          if (n2.length)
            return q(n2.props, function(c2) {
              switch (y(c2, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return fe([J(n2, {props: [j(c2, /:(read-\w+)/, ":" + r + "$1")]})], i2);
                case "::placeholder":
                  return fe([J(n2, {props: [j(c2, /:(plac\w+)/, ":" + a + "input-$1")]}), J(n2, {props: [j(c2, /:(plac\w+)/, ":" + r + "$1")]}), J(n2, {props: [j(c2, /:(plac\w+)/, e + "input-$1")]})], i2);
              }
              return "";
            });
      }
  }
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
export {A, C, F, J, N, P, R, T, U, V, W, a, c, e, fe as f, h, j, k, le as l, m, ne as n, oe as o, pe as p, q, r, s, unitlessKeys as u, ve as v, y, z};
