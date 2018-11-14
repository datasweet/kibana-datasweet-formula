import math from 'expr-eval';
import { each, isArray, map } from 'lodash';
import * as formulas from '../../formulas';

createLegacyClass(FormulaParser);
function FormulaParser() {
  this.parser = new math.Parser({
    operators: {
      conditional: false
    }
  });

  const parser = this.parser;

  // Redefine unary operators to work with series.
  each(parser.unaryOps, (func, funcName) => {
    const fn = func;
    parser.unaryOps[funcName] = (x) => {
      if (isArray(x)) {
        return map(x, r => fn.call(undefined, Number(r)));
      } else {
        return fn.call(undefined, Number(x));
      }
    };
  });

    // Redefine binary operators to work with series.
    each(parser.binaryOps, (func, funcName) => {
      let fn = func;

      if (funcName === '/') {
        fn = (a, b) => {
          // Javascript have some weird behaviour concerning division.
          // - 0/0 => NaN
          // - x/0 | x <> 0 => -/+Infinity
          // We want null for both, so they are ignored.
          if(b === 0) {
            notify.warning('Divide by 0 occured. Please ensure the denominator is non-zero.');
            return null;
          }

          // Default behaviour.
          return func.call(undefined, a, b);
        };
      }

      parser.binaryOps[funcName] = (a, b) => {
        const ia = isArray(a);
        const ib = isArray(b);

      if (ia && ib) {
        const c = new Array();
        const len = Math.max(a.length, b.length);
        for (var i = 0; i < len; i++) {
          c.push(fn.call(undefined, a[i] || 0, b[i] || 0));
        }
        return c;
      }

      if (ia) {
        return map(a, r => fn.call(undefined, r, b));
      }

      if (ib) {
        return map(b, r => fn.call(undefined, a, r));
      }

      return fn.call(undefined, a, b);
    };
  });

  // remove default functions
  parser.functions = {};
  this.addDefautFunctions();
};

FormulaParser.prototype.parse = function (expr) {
  return this.parser.parse(expr);
};

FormulaParser.prototype.evaluate = function (expr, vars) {
  return this.parser.evaluate(expr, vars);
};

FormulaParser.prototype.addFunc = function (func) {
  this.parser.functions[func.name] = func.fn;
};

FormulaParser.prototype.addDefautFunctions = function () {
  const self = this;
  self.parser.functions = {};
  each(formulas, f => self.addFunc(f));
};

export const formulaParser = new FormulaParser();
