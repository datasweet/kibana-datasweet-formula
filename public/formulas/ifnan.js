import { FormulaFunction } from './formula_function';
import { isArray, map } from 'lodash';

export default new FormulaFunction('ifnan', {
  help: 'Returns an alternative value if an expression is nan.',
  fn: function (arg, defaultValue = 0) {
    const impl = (x) => isNaN(x) ? defaultValue : x;

    if (isArray(arg)) {
      return map(arg, r => impl(r));
    } else {
      return impl(arg);
    }
  }
});