import {c as createCommonjsModule, a as commonjsGlobal} from "../common/_commonjsHelpers-eb5a497e.js";
var instr = createCommonjsModule(function(module, exports) {
  var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __spreadArrays = commonjsGlobal && commonjsGlobal.__spreadArrays || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  var _a;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.parseExpr = exports.evalExpr = exports.evalAST = exports.validate = void 0;
  var Token;
  (function(Token2) {
    Token2[Token2["Operator"] = 0] = "Operator";
    Token2[Token2["Value"] = 1] = "Value";
    Token2[Token2["InfixOp"] = 2] = "InfixOp";
    Token2[Token2["Expr"] = 3] = "Expr";
  })(Token || (Token = {}));
  var Op;
  (function(Op2) {
    Op2[Op2["ExprStart"] = 0] = "ExprStart";
    Op2[Op2["NumCont"] = 1] = "NumCont";
    Op2[Op2["VarDecl"] = 2] = "VarDecl";
    Op2[Op2["Op"] = 3] = "Op";
    Op2["Get"] = "get";
    Op2["Seperator"] = " ";
    Op2["Or"] = "||";
    Op2["And"] = "&&";
    Op2["Eq"] = "==";
    Op2["LT"] = "<";
    Op2["LTE"] = "<=";
    Op2["GT"] = ">";
    Op2["GTE"] = ">=";
    Op2["Not"] = "!";
    Op2["NotEq"] = "!=";
    Op2["GetStart"] = "{";
    Op2["GetEnd"] = "}";
    Op2["Prop"] = ".";
    Op2["BracketStart"] = "(";
    Op2["BracketEnd"] = ")";
  })(Op || (Op = {}));
  function cleanAndSplit(expr) {
    var cleanedStr = expr.replace(/\s+/gi, Op.Seperator);
    return cleanedStr.split("");
  }
  function isTwoCharOp(op) {
    return [Op.Or, Op.And, Op.Eq, Op.LTE, Op.GTE, Op.NotEq].includes(op);
  }
  function isOneCharOp(op) {
    return [Op.LT, Op.GT].includes(op);
  }
  function isOp(op) {
    return isTwoCharOp(op.op) || isOneCharOp(op.op);
  }
  function isValue(op) {
    return typeof op === "number" || op.id !== void 0;
  }
  function isInfix(op) {
    return op === Op.Not;
  }
  function isExpr(op) {
    return Array.isArray(op);
  }
  function isVarStart(op) {
    return [Op.GetStart].includes(op);
  }
  function isVarEnd(op) {
    return [Op.GetEnd].includes(op);
  }
  function isSubExprStart(op) {
    return [Op.BracketStart].includes(op);
  }
  function isSubExprEnd(op) {
    return [Op.BracketEnd].includes(op);
  }
  function isNum(op) {
    return /[0-9]/.test(op);
  }
  function findSubExprEndIndex(arr) {
    var i = 0;
    var level = 0;
    while (i < arr.length) {
      if (isSubExprEnd(arr[i]) && level === 0) {
        return i;
      } else if (isSubExprStart(arr[i])) {
        level++;
      } else if (isSubExprEnd(arr[i])) {
        level--;
      }
      i++;
    }
    throw new Error("Unbalanced brackets in: " + arr);
  }
  function evalNot(notSwitch) {
    return notSwitch ? [] : [Op.Not];
  }
  function tokenizer(_a2, rest) {
    var op = _a2.op, partial = _a2.partial;
    var car = rest[0], cdr = rest.slice(1);
    if (rest.length === 0) {
      switch (op) {
        case Op.NumCont:
          return [parseInt(partial)];
        case Op.ExprStart:
          return [];
        default: {
          throw new Error("Unexpected character encountered at end while in state: " + op);
        }
      }
    }
    switch (op) {
      case Op.ExprStart: {
        var twoStr = car + (cdr[0] !== void 0 ? cdr[0] : "");
        if (isNum(car)) {
          return tokenizer({op: Op.NumCont, partial: car}, cdr);
        } else if (car === Op.Seperator) {
          return tokenizer({op: Op.ExprStart, partial: ""}, cdr);
        } else if (isTwoCharOp(twoStr)) {
          return __spreadArrays([
            {op: twoStr}
          ], tokenizer({op: Op.ExprStart, partial: ""}, cdr.slice(1)));
        } else if (isOneCharOp(car)) {
          return __spreadArrays([
            {op: car}
          ], tokenizer({op: Op.ExprStart, partial: ""}, cdr));
        } else if (isVarStart(car)) {
          return tokenizer({op: Op.VarDecl, partial: ""}, cdr);
        } else if (isSubExprStart(car)) {
          var endIndex = findSubExprEndIndex(cdr);
          return __spreadArrays([
            tokenizer({op: Op.ExprStart, partial: ""}, cdr.slice(0, endIndex))
          ], tokenizer({op: Op.ExprStart, partial: ""}, cdr.slice(endIndex + 1)));
        } else if (car === Op.Not) {
          return tokenizer({op: Op.Not, partial: false}, cdr);
        } else {
          throw new Error("Unexpected character encountered in expr decl: " + car);
        }
      }
      case Op.Not: {
        if (isNum(car)) {
          return __spreadArrays(evalNot(partial), tokenizer({op: Op.NumCont, partial: car}, cdr));
        } else if (isVarStart(car)) {
          return __spreadArrays(evalNot(partial), tokenizer({op: Op.VarDecl, partial: ""}, cdr));
        } else if (isSubExprStart(car)) {
          var endIndex = findSubExprEndIndex(cdr);
          return __spreadArrays(evalNot(partial), __spreadArrays([
            tokenizer({op: Op.ExprStart, partial: ""}, cdr.slice(0, endIndex))
          ], tokenizer({op: Op.ExprStart, partial: ""}, cdr.slice(endIndex + 1))));
        } else if (car === Op.Not) {
          return tokenizer({op: Op.Not, partial: !partial}, cdr);
        } else {
          throw new Error("Unexpected character encountered after !: " + car);
        }
      }
      case Op.VarDecl: {
        if (/[0-9a-zA-Z_-]/.test(car)) {
          return tokenizer({op: Op.VarDecl, partial: partial + car}, cdr);
        } else if (car === Op.Prop) {
          return tokenizer({op: Op.Prop, partial: {id: partial, prop: ""}}, cdr);
        } else if (isVarEnd(car)) {
          return __spreadArrays([
            {id: partial}
          ], tokenizer({op: Op.ExprStart, partial: ""}, cdr));
        } else {
          throw new Error("Unexpected character encountered in var decl: " + car);
        }
      }
      case Op.Prop: {
        if (isNum(car)) {
          return tokenizer({
            op: Op.Prop,
            partial: __assign(__assign({}, partial), {prop: partial.prop + car})
          }, cdr);
        } else if (isVarEnd(car)) {
          return __spreadArrays([
            __assign(__assign({}, partial), {prop: parseInt(partial.prop)})
          ], tokenizer({op: Op.ExprStart, partial: ""}, cdr));
        } else {
          throw new Error("Unexpected character encountered in var decl: " + car);
        }
      }
      case Op.NumCont: {
        if (/[0-9]/.test(car)) {
          return tokenizer({op: Op.NumCont, partial: partial + car}, cdr);
        } else {
          return __spreadArrays([
            parseInt(partial, 10)
          ], tokenizer({op: Op.ExprStart, partial: ""}, rest));
        }
      }
    }
  }
  function validate(prevToken, parseTree) {
    var car = parseTree[0], cdr = parseTree.slice(1);
    if (parseTree.length === 0) {
      if (prevToken === Token.Value) {
        return [];
      }
      throw new Error("Unexpected token at end of expr: " + prevToken);
    }
    switch (prevToken) {
      case Token.InfixOp:
      case Token.Operator:
      case Token.Expr: {
        if (isInfix(car)) {
          return __spreadArrays([
            {mod: Op.Not, val: validate(Token.InfixOp, [cdr[0]])}
          ], validate(Token.Value, cdr.slice(1)));
        } else if (isExpr(car)) {
          return __spreadArrays([validate(Token.Expr, car)], validate(Token.Value, cdr));
        } else if (isValue(car)) {
          return __spreadArrays([car], validate(Token.Value, cdr));
        } else {
          throw new Error("Unexpected start of expr: " + car);
        }
      }
      case Token.Value: {
        if (isOp(car)) {
          return __spreadArrays([car], validate(Token.Operator, cdr));
        } else {
          throw new Error("Unexpected token following Value: " + car);
        }
      }
    }
    throw new Error("unreachable");
  }
  exports.validate = validate;
  function findSplitOp(arr) {
    var opPrecedence = [
      Op.Or,
      Op.And,
      Op.NotEq,
      Op.Eq,
      Op.GTE,
      Op.GT,
      Op.LTE,
      Op.LT
    ];
    var chosenOp = opPrecedence.findIndex(function(op) {
      return arr.some(function(token) {
        return token.op === op;
      });
    });
    return chosenOp === -1 ? -1 : arr.findIndex(function(token) {
      return token.op === opPrecedence[chosenOp];
    });
  }
  function mergeWithMax(state1, state2) {
    return Object.keys(state2).reduce(function(p, n) {
      p[n] = Math.max(0, p[n], state2[n]);
      return p;
    }, __assign({}, state1));
  }
  function buildAST(expr, state) {
    var _a2;
    if (state === void 0) {
      state = {};
    }
    if (Array.isArray(expr)) {
      var opIndex = findSplitOp(expr);
      if (opIndex === -1) {
        if (expr.length === 1) {
          return buildAST(expr[0], state);
        } else {
          throw new Error("Expression has multiple entries but no operators");
        }
      } else {
        var arg1 = buildAST(expr.slice(0, opIndex), state);
        var arg2 = buildAST(expr.slice(opIndex + 1), state);
        return {
          ast: {
            op: expr[opIndex].op,
            arg: [arg1.ast, arg2.ast]
          },
          state: mergeWithMax(arg1.state, arg2.state)
        };
      }
    } else if (typeof expr === "number") {
      return {ast: expr, state};
    } else if (typeof expr.id === "string") {
      return {
        ast: {op: Op.Get, arg: [expr.id, expr.prop ? expr.prop : 0]},
        state: __assign(__assign({}, state), (_a2 = {}, _a2[expr.id] = Math.max(0, expr.prop), _a2))
      };
    } else if (expr.mod === Op.Not) {
      var arg = buildAST(expr.val, state);
      return {
        ast: {op: Op.Not, arg: [arg.ast]},
        state: __assign(__assign({}, state), arg.state)
      };
    } else {
      throw new Error("Error building AST while encountering: " + JSON.stringify(expr));
    }
  }
  var opGet = function(state, arg1, arg2) {
    return state[arg1][arg2];
  };
  var opOr = function(_, arg1, arg2) {
    return arg1 || arg2;
  };
  var opAnd = function(_, arg1, arg2) {
    return arg1 && arg2;
  };
  var opNot = function(_, arg1) {
    return !arg1;
  };
  var opNotEq = function(_, arg1, arg2) {
    return arg1 != arg2;
  };
  var opEq = function(_, arg1, arg2) {
    return arg1 == arg2;
  };
  var opLT = function(_, arg1, arg2) {
    return arg1 < arg2;
  };
  var opLTE = function(_, arg1, arg2) {
    return arg1 <= arg2;
  };
  var opGT = function(_, arg1, arg2) {
    return arg1 > arg2;
  };
  var opGTE = function(_, arg1, arg2) {
    return arg1 >= arg2;
  };
  var OpMap = (_a = {}, _a[Op.Get] = opGet, _a[Op.Or] = opOr, _a[Op.And] = opAnd, _a[Op.Not] = opNot, _a[Op.NotEq] = opNotEq, _a[Op.Eq] = opEq, _a[Op.GT] = opGT, _a[Op.GTE] = opGTE, _a[Op.LT] = opLT, _a[Op.LTE] = opLTE, _a);
  function evalOp(ast, state) {
    var op = ast.op, arg = ast.arg;
    var fn = OpMap[op];
    if (fn) {
      return fn.apply(void 0, __spreadArrays([state], arg.map(function(ast2) {
        return evalAST(ast2, state);
      })));
    }
    throw new Error("Op lookup failed: " + op);
  }
  function evalAST(ast, state) {
    if (ast.op !== void 0) {
      return evalOp(ast, state);
    } else if (typeof ast === "number" || typeof ast === "boolean" || typeof ast === "string") {
      return ast;
    }
  }
  exports.evalAST = evalAST;
  function evalExpr2(expr, state) {
    return evalAST(parseExpr(expr).ast, state);
  }
  exports.evalExpr = evalExpr2;
  function parseExpr(expr) {
    var charStream = cleanAndSplit(expr);
    var tokenizedStream = tokenizer({op: Op.ExprStart, partial: ""}, charStream);
    return buildAST(validate(Token.Expr, tokenizedStream));
  }
  exports.parseExpr = parseExpr;
});
var dist = createCommonjsModule(function(module, exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
      return m[k];
    }});
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !exports2.hasOwnProperty(p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  __exportStar(instr, exports);
});
var evalExpr = dist.evalExpr;
export {evalExpr};
