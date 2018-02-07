import { FormulaFunction } from './formula_function';
import { isArray, map } from 'lodash';

export default new FormulaFunction('coalesce', {
  help: 'Coalesce a serie or a value.',
  fn: function (arg, defaultValue = 0) {
    const impl = (x) => isNaN(x) ? defaultValue : x;

    if (isArray(arg)) {
      return map(arg, r => impl(r));
    } else {
      return impl(arg);
    }
  }
});